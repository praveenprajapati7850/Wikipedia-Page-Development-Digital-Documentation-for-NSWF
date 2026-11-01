/**
 * Pure compliance, Wikitext validation, and editorial neutralization logic
 * for the NSWF WikiArchitect & Compliance Engine.
 */

export interface PeacockViolation {
  term: string;
  policy: 'WP:PEACOCK' | 'WP:PROMO' | 'WP:WEASEL';
  reason: string;
  replacement: string;
}

export interface NeutralizationAuditResult {
  originalText: string;
  neutralizedText: string;
  wikitextSnippet: string;
  violations: PeacockViolation[];
  npovScore: number;
  afcRiskStatus: 'AfC Ready (Pass)' | 'Minor Revision Needed' | 'High AfC Rejection Risk';
}

export interface WikitextDiagnostic {
  hasShortDescription: boolean;
  hasInfobox: boolean;
  hasReflist: boolean;
  citationCount: number;
  headingCount: number;
  categoryCount: number;
  templatesBalanced: boolean;
  refsBalanced: boolean;
  isValid: boolean;
  issues: string[];
}

export interface LedgerEntry {
  id: string;
  category: string;
  verifiedFact: string;
  sourceReference: string;
  sourceUrl: string;
  sourceType: 'Primary' | 'Secondary';
  wpPolicy: string;
  dateVerified: string;
}

export interface MediaAssetItem {
  id: string;
  filename: string;
  visualSubject: string;
  eventDate: string;
  targetSection: string;
  protocol: string;
  license: string;
  sourceUrl: string;
}

const PROMOTIONAL_LEXICON: Array<{
  pattern: RegExp;
  term: string;
  policy: 'WP:PEACOCK' | 'WP:PROMO' | 'WP:WEASEL';
  reason: string;
  replacement: string;
}> = [
  {
    pattern: /\bvisionary guidance of renowned social activist\b/gi,
    term: 'visionary guidance of renowned social activist',
    policy: 'WP:PEACOCK',
    reason: 'Unverifiable honorific framing that editorializes leadership status.',
    replacement: 'leadership of founder and managing director',
  },
  {
    pattern: /\bworking passionately\b/gi,
    term: 'working passionately',
    policy: 'WP:PROMO',
    reason: 'Subjective emotional adverbial phrase characteristic of press releases.',
    replacement: 'operating',
  },
  {
    pattern: /\btakes bold steps\b/gi,
    term: 'takes bold steps',
    policy: 'WP:PROMO',
    reason: 'Promotional headline rhetoric lacking neutral encyclopedic tone.',
    replacement: 'conducts initiatives',
  },
  {
    pattern: /\bpioneering change\b/gi,
    term: 'pioneering change',
    policy: 'WP:PEACOCK',
    reason: 'Peacock claim of primacy without independent secondary attribution.',
    replacement: 'implementing environmental programs',
  },
  {
    pattern: /\bvisionary\b/gi,
    term: 'visionary',
    policy: 'WP:PEACOCK',
    reason: 'Peacock adjective prohibited in encyclopedic biographies and org profiles.',
    replacement: '',
  },
  {
    pattern: /\brenowned\b/gi,
    term: 'renowned',
    policy: 'WP:PEACOCK',
    reason: 'Asserts prominence instead of demonstrating it through secondary coverage.',
    replacement: '',
  },
  {
    pattern: /\bpassionately\b/gi,
    term: 'passionately',
    policy: 'WP:PROMO',
    reason: 'Subjective emotional modifier unsuitable for neutral point of view.',
    replacement: '',
  },
  {
    pattern: /\btirelessly\b/gi,
    term: 'tirelessly',
    policy: 'WP:PROMO',
    reason: 'Promotional hyperbole common in NGO self-descriptions.',
    replacement: '',
  },
  {
    pattern: /\bworld-class\b/gi,
    term: 'world-class',
    policy: 'WP:PEACOCK',
    reason: 'Unquantified superlative claim violating WP:NPOV.',
    replacement: 'multidisciplinary',
  },
  {
    pattern: /\bleading\b/gi,
    term: 'leading',
    policy: 'WP:PEACOCK',
    reason: 'Comparative claim requiring market/sector proof.',
    replacement: 'established',
  },
  {
    pattern: /\bimpactful\b/gi,
    term: 'impactful',
    policy: 'WP:PROMO',
    reason: 'Vague promotional evaluation; replace with empirical metrics or dates.',
    replacement: 'structured',
  },
  {
    pattern: /\brevolutionary\b/gi,
    term: 'revolutionary',
    policy: 'WP:PEACOCK',
    reason: 'Exaggerated promotional adjective.',
    replacement: 'digital',
  },
  {
    pattern: /\bunparalleled\b/gi,
    term: 'unparalleled',
    policy: 'WP:PEACOCK',
    reason: 'Non-neutral superlative.',
    replacement: 'documented',
  },
];

export function auditPromotionalTone(
  inputText: string,
  citationTitle = 'Nisarg Srishti Welfare Foundation Activity & Media Record',
  citationUrl = 'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
  citationPublisher = 'IndiaChronicle',
  citationDate = '15 June 2026'
): NeutralizationAuditResult {
  const trimmed = inputText.trim();
  if (!trimmed) {
    return {
      originalText: '',
      neutralizedText: '',
      wikitextSnippet: '',
      violations: [],
      npovScore: 100,
      afcRiskStatus: 'AfC Ready (Pass)',
    };
  }

  let workingText = trimmed;
  const violations: PeacockViolation[] = [];

  for (const rule of PROMOTIONAL_LEXICON) {
    if (rule.pattern.test(workingText)) {
      violations.push({
        term: rule.term,
        policy: rule.policy,
        reason: rule.reason,
        replacement: rule.replacement || '[removed]',
      });
      workingText = workingText.replace(rule.pattern, rule.replacement);
    }
    rule.pattern.lastIndex = 0;
  }

  // Clean up double spaces, indefinite articles ('a' -> 'an' before vowel replacements), and punctuation artifacts
  const neutralizedText = workingText
    .replace(/\s{2,}/g, ' ')
    .replace(/\b(a)\s+(established|operational|independent|empirical|academic)\b/gi, (_, a, word) =>
      `${a === 'A' ? 'An' : 'an'} ${word}`
    )
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();

  const penalty = violations.length * 18;
  const npovScore = Math.max(15, 100 - penalty);

  let afcRiskStatus: NeutralizationAuditResult['afcRiskStatus'] = 'AfC Ready (Pass)';
  if (violations.length >= 2) {
    afcRiskStatus = 'High AfC Rejection Risk';
  } else if (violations.length === 1) {
    afcRiskStatus = 'Minor Revision Needed';
  }

  const wikitextSnippet = `${neutralizedText}<ref>{{cite web |title=${citationTitle} |url=${citationUrl} |website=${citationPublisher} |date=${citationDate} |access-date=1 November 2026}}</ref>`;

  return {
    originalText: trimmed,
    neutralizedText,
    wikitextSnippet,
    violations,
    npovScore,
    afcRiskStatus,
  };
}

export function validateWikitextSyntax(wikitext: string): WikitextDiagnostic {
  const hasShortDescription = /\{\{Short description\|[^}]+\}\}/i.test(wikitext);
  const hasInfobox = /\{\{Infobox organization/i.test(wikitext);
  const hasReflist = /\{\{Reflist\}\}/i.test(wikitext);

  const citationMatches = wikitext.match(/\{\{cite web/gi) || [];
  const citationCount = citationMatches.length;

  const headingMatches = wikitext.match(/^==+[^=]+==+/gm) || [];
  const headingCount = headingMatches.length;

  const categoryMatches = wikitext.match(/\[\[Category:[^\]]+\]\]/gi) || [];
  const categoryCount = categoryMatches.length;

  const openBraces = (wikitext.match(/\{\{/g) || []).length;
  const closeBraces = (wikitext.match(/\}\}/g) || []).length;
  const templatesBalanced = openBraces === closeBraces && openBraces > 0;

  const fullOpenRefs = (wikitext.match(/<ref(?:\s+name="[^"]+")?>/gi) || []).length;
  const closeRefs = (wikitext.match(/<\/ref>/gi) || []).length;
  const refsBalanced = fullOpenRefs === closeRefs && fullOpenRefs > 0;

  const issues: string[] = [];
  if (!hasShortDescription) issues.push('Missing {{Short description|...}} template at top of draft.');
  if (!hasInfobox) issues.push('Missing {{Infobox organization}} template.');
  if (!hasReflist) issues.push('Missing {{Reflist}} in References section.');
  if (!templatesBalanced) issues.push(`Unbalanced MediaWiki curly braces ({{ count: ${openBraces}, }} count: ${closeBraces}).`);
  if (!refsBalanced) issues.push(`Unbalanced <ref> tags (opening: ${fullOpenRefs}, closing: ${closeRefs}).`);
  if (citationCount < 5) issues.push('Fewer than 5 inline {{cite web}} citations detected.');

  return {
    hasShortDescription,
    hasInfobox,
    hasReflist,
    citationCount,
    headingCount,
    categoryCount,
    templatesBalanced,
    refsBalanced,
    isValid: issues.length === 0,
    issues,
  };
}

export function filterResearchLedger(
  entries: LedgerEntry[],
  sourceFilter: 'All' | 'Primary' | 'Secondary',
  searchQuery: string
): LedgerEntry[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesType = sourceFilter === 'All' || entry.sourceType === sourceFilter;
    if (!matchesType) return false;
    if (!normalizedQuery) return true;
    return (
      entry.category.toLowerCase().includes(normalizedQuery) ||
      entry.verifiedFact.toLowerCase().includes(normalizedQuery) ||
      entry.sourceReference.toLowerCase().includes(normalizedQuery) ||
      entry.wpPolicy.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function generateVrtsReleaseEmail(
  asset: MediaAssetItem,
  declarantName = 'Dr. (HC) Garima Gaurav Kavathekar',
  declarantTitle = 'Founder & Managing Director, Nisarg Srishti Welfare Foundation'
): { vrtsEmail: string; commonsTemplate: string } {
  const vrtsEmail = `To: permissions-commons@wikimedia.org
From: info@nisargsrishti.org
Subject: Creative Commons CC BY-SA 4.0 Release – ${asset.filename}

I hereby affirm that I, ${declarantName} (${declarantTitle}), am the creator and/or sole representative of the copyright holder (Nisarg Srishti Welfare Foundation, CIN: U85300PN2023NPL217884) of the media work depicted in:

* Wikimedia Commons Target Filename: ${asset.filename}
* Source URL / Archive Record: ${asset.sourceUrl}
* Subject Description: ${asset.visualSubject}

I agree to publish the above-mentioned work under the Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license (https://creativecommons.org/licenses/by-sa/4.0/legalcode).

I acknowledge that by doing so I grant anyone the right to use the work, including in a commercial product or otherwise, and to modify it according to their needs, provided that they abide by the terms of the license and any other applicable laws.

I am aware that this agreement is not limited to Wikipedia or related sites. I am aware that the copyright holder always retains ownership of the copyright as well as the right to be attributed in accordance with the license chosen. Modifications others make to the work will not be claimed to have been made by the copyright holder.

I acknowledge that I cannot withdraw this agreement, and that the content may or may not be kept permanently on a Wikimedia project.

Date: 1 November 2026
Name & Designation: ${declarantName}, ${declarantTitle}
Official Address: Shop No. 02, Vision Galaxy, S No. 143A/1, Kunjir Colony, Manjari BK, Pune – 412307, Maharashtra, India`;

  const commonsTemplate = `== {{int:filedesc}} ==
{{Information
|description={{en|1=${asset.visualSubject}}}
|date=${asset.eventDate}
|source=${asset.sourceUrl} (Released by Nisarg Srishti Welfare Foundation via VRTS)
|author=Nisarg Srishti Welfare Foundation (NSWF) Documentation Team
|permission={{PermissionTicket|id=PENDING_VRTS_TICKET}}
|other versions=
}}

== {{int:license-header}} ==
{{cc-by-sa-4.0|Nisarg Srishti Welfare Foundation}}

[[Category:Environmental organizations based in India]]
[[Category:Pune]]
[[Category:Noise pollution]]`;

  return { vrtsEmail, commonsTemplate };
}

export interface SectionAuditItem {
  sectionTitle: string;
  wordCount: number;
  refCount: number;
  peacockCount: number;
  status: 'Verified' | 'Needs Citation' | 'Tone Warning';
}

export function analyzeArticleSections(wikitext: string): SectionAuditItem[] {
  const cleanBody = wikitext
    .replace(/\{\{Infobox organization[\s\S]*?\n\}\}/i, '')
    .replace(/\{\{Short description\|[^}]+\}\}/gi, '')
    .replace(/\{\{Use [^}]+\}\}/gi, '');

  const parts = cleanBody.split(/^==\s*([^=]+?)\s*==$/gm);
  const results: SectionAuditItem[] = [];

  // Lead section is parts[0]
  if (parts[0] && parts[0].trim()) {
    const leadText = parts[0].trim();
    const leadRefs = (leadText.match(/<ref/gi) || []).length;
    const plainWords = leadText
      .replace(/<ref[\s\S]*?<\/ref>/gi, '')
      .replace(/<ref[^>]*\/>/gi, '')
      .split(/\s+/)
      .filter(Boolean).length;
    const toneCheck = auditPromotionalTone(leadText);
    results.push({
      sectionTitle: 'Lead Section (Introduction)',
      wordCount: plainWords,
      refCount: leadRefs,
      peacockCount: toneCheck.violations.length,
      status:
        toneCheck.violations.length > 0
          ? 'Tone Warning'
          : leadRefs > 0
          ? 'Verified'
          : 'Needs Citation',
    });
  }

  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const content = (parts[i + 1] || '').trim();
    if (/^(References|External links)$/i.test(title)) {
      continue;
    }
    const refCount = (content.match(/<ref/gi) || []).length;
    const plainWords = content
      .replace(/<ref[\s\S]*?<\/ref>/gi, '')
      .replace(/<ref[^>]*\/>/gi, '')
      .replace(/===+[^=]+===+/g, '')
      .split(/\s+/)
      .filter(Boolean).length;
    const toneCheck = auditPromotionalTone(content);
    results.push({
      sectionTitle: title,
      wordCount: plainWords,
      refCount,
      peacockCount: toneCheck.violations.length,
      status:
        toneCheck.violations.length > 0
          ? 'Tone Warning'
          : refCount > 0
          ? 'Verified'
          : 'Needs Citation',
    });
  }

  return results;
}

export const AFC_SUBMISSION_BANNER = `{{AfC submission|t||ts=20261101120000|u=NSWF_Documentation_Team|ns=118}}
<!-- Do not remove this line! -->`;

export function toggleAfcBannerInWikitext(wikitext: string, includeBanner: boolean): string {
  const stripped = wikitext
    .replace(/\{\{AfC submission\|[^}]+\}\}\n?(?:<!-- Do not remove this line! -->\n?)?\n?/gi, '')
    .trim();
  if (!includeBanner) {
    return stripped;
  }
  return `${AFC_SUBMISSION_BANNER}\n\n${stripped}`;
}

export interface SecondaryCitationInput {
  mediaType: 'broadcast' | 'newspaper';
  refName: string;
  title: string;
  workOrNetwork: string;
  location: string;
  date: string;
  urlOrTimestamp: string;
}

export function generateSecondaryCitationMarkup(input: SecondaryCitationInput): string {
  const safeRef = input.refName.replace(/[^a-zA-Z0-9_-]/g, '') || 'SecondarySource';
  if (input.mediaType === 'broadcast') {
    return `<ref name="${safeRef}">{{cite AV media |title=${input.title} |medium=Television documentary |publisher=${input.workOrNetwork} |location=${input.location} |date=${input.date} |time=${input.urlOrTimestamp} |access-date=1 November 2026}}</ref>`;
  }
  return `<ref name="${safeRef}">{{cite news |title=${input.title} |work=${input.workOrNetwork} |location=${input.location} |date=${input.date} |url=${input.urlOrTimestamp} |access-date=1 November 2026}}</ref>`;
}

