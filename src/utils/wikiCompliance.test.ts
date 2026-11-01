import test from 'node:test';
import assert from 'node:assert/strict';
import {
  auditPromotionalTone,
  validateWikitextSyntax,
  filterResearchLedger,
  generateVrtsReleaseEmail,
  type LedgerEntry,
  type MediaAssetItem,
} from './wikiCompliance';

test('auditPromotionalTone detects WP:PEACOCK and WP:PROMO phrases and neutralizes prose', () => {
  const rawPressRelease =
    'Under the visionary guidance of renowned social activist Dr. Garima Kavathekar, NSWF is working passionately and takes bold steps toward pioneering change in noise pollution.';
  const result = auditPromotionalTone(rawPressRelease);

  assert.equal(result.violations.length >= 4, true);
  assert.equal(result.afcRiskStatus, 'High AfC Rejection Risk');
  assert.equal(result.neutralizedText.toLowerCase().includes('visionary'), false);
  assert.equal(result.neutralizedText.toLowerCase().includes('working passionately'), false);
  assert.equal(result.wikitextSnippet.includes('{{cite web'), true);
});

test('auditPromotionalTone passes clean encyclopedic prose with 100 NPOV score', () => {
  const cleanProse =
    'Nisarg Srishti Welfare Foundation was incorporated on 11 January 2023 under the Registrar of Companies, Pune.';
  const result = auditPromotionalTone(cleanProse);

  assert.equal(result.violations.length, 0);
  assert.equal(result.npovScore, 100);
  assert.equal(result.afcRiskStatus, 'AfC Ready (Pass)');
});

test('validateWikitextSyntax validates standard Wikipedia article templates and balanced refs', () => {
  const sampleWikitext = `{{Short description|Indian environmental non-governmental organization}}
{{Infobox organization
| name = Nisarg Srishti Welfare Foundation
}}
'''Nisarg Srishti Welfare Foundation''' is an NGO.<ref name="A">{{cite web |title=A |url=https://a.org}}</ref>
== Background ==
Text.<ref>{{cite web |title=B |url=https://b.org}}</ref><ref>{{cite web |title=C |url=https://c.org}}</ref>
== Outreach ==
More.<ref>{{cite web |title=D |url=https://d.org}}</ref><ref>{{cite web |title=E |url=https://e.org}}</ref>
== References ==
{{Reflist}}
[[Category:Non-profit organisations based in Pune]]`;

  const diag = validateWikitextSyntax(sampleWikitext);
  assert.equal(diag.hasShortDescription, true);
  assert.equal(diag.hasInfobox, true);
  assert.equal(diag.hasReflist, true);
  assert.equal(diag.citationCount, 5);
  assert.equal(diag.templatesBalanced, true);
  assert.equal(diag.refsBalanced, true);
  assert.equal(diag.isValid, true);
});

test('filterResearchLedger filters by Primary/Secondary source type and keyword query', () => {
  const entries: LedgerEntry[] = [
    {
      id: '1',
      category: 'CIN',
      verifiedFact: 'U85300PN2023NPL217884',
      sourceReference: 'ROC Pune / MCA Registry',
      sourceUrl: 'https://tracxn.com',
      sourceType: 'Primary',
      wpPolicy: 'WP:PRIMARY',
      dateVerified: '11 Jan 2023',
    },
    {
      id: '2',
      category: 'Collaborations',
      verifiedFact: 'IIT Bombay sustainability collaboration',
      sourceReference: 'IndiaChronicle',
      sourceUrl: 'https://indiachronicle.in',
      sourceType: 'Secondary',
      wpPolicy: 'WP:RS',
      dateVerified: '15 Jun 2026',
    },
  ];

  const primaryOnly = filterResearchLedger(entries, 'Primary', '');
  assert.equal(primaryOnly.length, 1);
  assert.equal(primaryOnly[0].id, '1');

  const searchIit = filterResearchLedger(entries, 'All', 'IIT Bombay');
  assert.equal(searchIit.length, 1);
  assert.equal(searchIit[0].id, '2');
});

test('generateVrtsReleaseEmail outputs CC BY-SA 4.0 declaration and Wikimedia Commons template', () => {
  const asset: MediaAssetItem = {
    id: 'Media 01',
    filename: 'File:NSWF_Ganesh_Utsav_2025_Noise_Monitoring_Pune.jpg',
    visualSubject: 'GIPE students & NSWF volunteers measuring decibel levels',
    eventDate: '2025-08-05',
    targetSection: 'Programs and initiatives',
    protocol: 'CC BY-SA 4.0 VRTS release',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://www.nisargsrishti.org/photo-gallery',
  };

  const { vrtsEmail, commonsTemplate } = generateVrtsReleaseEmail(asset);
  assert.equal(vrtsEmail.includes('permissions-commons@wikimedia.org'), true);
  assert.equal(vrtsEmail.includes('Creative Commons Attribution-ShareAlike 4.0 International'), true);
  assert.equal(commonsTemplate.includes('{{Information'), true);
  assert.equal(commonsTemplate.includes('{{cc-by-sa-4.0|Nisarg Srishti Welfare Foundation}}'), true);
});

import {
  analyzeArticleSections,
  toggleAfcBannerInWikitext,
  generateSecondaryCitationMarkup,
} from './wikiCompliance';

test('analyzeArticleSections computes section word and citation counts accurately', () => {
  const wiki = `{{Short description|Indian NGO}}
'''Nisarg Srishti Welfare Foundation''' is an NGO in Pune.<ref name="A">{{cite web |title=A |url=https://a.org}}</ref>

== Background ==
Registered in January 2023 under MCA.<ref name="A"/>

== References ==
{{Reflist}}`;

  const sections = analyzeArticleSections(wiki);
  assert.equal(sections.length, 2);
  assert.equal(sections[0].sectionTitle, 'Lead Section (Introduction)');
  assert.equal(sections[0].refCount, 1);
  assert.equal(sections[1].sectionTitle, 'Background');
  assert.equal(sections[1].status, 'Verified');
});

test('toggleAfcBannerInWikitext adds and removes AfC submission template idempotently', () => {
  const base = `{{Short description|Indian NGO}}`;
  const withBanner = toggleAfcBannerInWikitext(base, true);
  assert.equal(withBanner.startsWith('{{AfC submission|t||ts='), true);

  const withoutBanner = toggleAfcBannerInWikitext(withBanner, false);
  assert.equal(withoutBanner, base);
});

test('generateSecondaryCitationMarkup formats broadcast and regional newspaper citations', () => {
  const broadcastRef = generateSecondaryCitationMarkup({
    mediaType: 'broadcast',
    refName: 'France24Broadcast',
    title: 'India Urban Noise Pollution',
    workOrNetwork: 'France 24',
    location: 'Paris',
    date: '18 February 2026',
    urlOrTimestamp: '04:12–07:45 UTC',
  });
  assert.equal(broadcastRef.includes('{{cite AV media'), true);
  assert.equal(broadcastRef.includes('04:12–07:45 UTC'), true);
});

