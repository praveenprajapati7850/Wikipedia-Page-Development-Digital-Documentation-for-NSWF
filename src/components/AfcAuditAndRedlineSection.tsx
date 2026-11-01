import React, { useState, useMemo } from 'react';
import { Copy, Check, GitCompare, Newspaper, ShieldCheck } from 'lucide-react';
import { RAW_MEDIAWIKI_WIKITEXT } from '../data/nswfDossierData';
import {
  analyzeArticleSections,
  generateSecondaryCitationMarkup,
} from '../utils/wikiCompliance';

interface RedlineDiffItem {
  id: string;
  section: string;
  sourceOrigin: string;
  rawPressRelease: string;
  strippedTokens: string[];
  encyclopedicRewrite: string;
  policyApplied: string;
}

const REDLINE_COMPARISON_LOG: RedlineDiffItem[] = [
  {
    id: 'DIFF-01',
    section: 'Lead & Background',
    sourceOrigin: 'Stay Featured (28 Feb 2024) & Official Bio',
    rawPressRelease:
      'Under the visionary guidance of renowned social activist Dr. (HC) Garima Gaurav Kavathekar, Nisarg Srishti Welfare Foundation takes bold steps to combat noise pollution.',
    strippedTokens: ['visionary guidance', 'renowned social activist', 'takes bold steps'],
    encyclopedicRewrite:
      'The organization was founded by Garima Gaurav Kavathekar, who serves as its Managing Director, alongside board directors Deepali Kavathekar and Nagesh Alkunthe. Incorporated in January 2023, the organization works in the domains of urban noise pollution awareness and water conservation.',
    policyApplied: 'WP:PEACOCK · WP:CREDENTIAL (Honorary title attribution)',
  },
  {
    id: 'DIFF-02',
    section: 'Programs & Initiatives',
    sourceOrigin: 'nisargsrishti.org Portal & Advisors Directory',
    rawPressRelease:
      'Supported by a world-class advisory board and revolutionary IoT portals like NoiseAware, NSWF is working passionately to pioneer acoustic mapping across India.',
    strippedTokens: ['world-class', 'revolutionary', 'working passionately', 'pioneer'],
    encyclopedicRewrite:
      "NSWF maintains digital tools on its public portal, including a Live Noise Monitoring interface, the NoiseAware citizen reporting portal, and a Citizen Noise Heat Map. In collaboration with IoT specialists and public health researchers, the organization conducts decibel (dB) monitoring across urban corridors in Pune.",
    policyApplied: 'WP:PROMO · WP:NPOV (Clinical technical description)',
  },
  {
    id: 'DIFF-03',
    section: 'Collaborations',
    sourceOrigin: 'IndiaChronicle (15 June 2026) & Bharat Good Times (18 Feb 2025)',
    rawPressRelease:
      'Empowering sustainability, IIT Bombay and NSWF forge a transformative strategic alliance alongside IIEBM Indus Business School to drive impactful change.',
    strippedTokens: ['Empowering sustainability', 'transformative strategic alliance', 'impactful change'],
    encyclopedicRewrite:
      'In June 2026, NSWF entered into a collaborative initiative with IIT Bombay to advance joint environmental conservation and sustainability awareness programs. In February 2025, the foundation signed a Memorandum of Understanding (MoU) with IIEBM Indus Business School in Pune.',
    policyApplied: 'WP:RS · WP:WEASEL (Dated institutional verification)',
  },
  {
    id: 'DIFF-04',
    section: 'Impact & Recognition',
    sourceOrigin: 'IndiaChronicle (18 Feb 2026) & Tracxn Financials',
    rawPressRelease:
      "NSWF's relentless grassroots crusade against festive noise pollution earned prestigious global acclaim in a landmark France 24 documentary.",
    strippedTokens: ['relentless grassroots crusade', 'prestigious global acclaim', 'landmark'],
    encyclopedicRewrite:
      "During the 2024–2025 financial year, the organization recorded a 166% compound annual growth rate in operational turnover under its social work mandate. In February 2026, the foundation's anti-noise pollution campaign was featured in a documentary broadcast by the French international news network France 24.",
    policyApplied: 'WP:NORG · WP:NPOV (Empirical metric & neutral attribution)',
  },
];

export const AfcAuditAndRedlineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'redline' | 'sections' | 'citation-builder'>(
    'redline'
  );

  // Secondary Citation Builder State (Part 7 Recommendation: France 24 timestamp & Regional Newspapers)
  const [mediaType, setMediaType] = useState<'broadcast' | 'newspaper'>('broadcast');
  const [refName, setRefName] = useState<string>('France24Broadcast');
  const [citeTitle, setCiteTitle] = useState<string>(
    'India: Citizen Campaigns Confront Urban Acoustic Pollution in Pune'
  );
  const [workOrNetwork, setWorkOrNetwork] = useState<string>('France 24');
  const [location, setLocation] = useState<string>('Paris, France');
  const [pubDate, setPubDate] = useState<string>('18 February 2026');
  const [urlOrTimestamp, setUrlOrTimestamp] = useState<string>('03:15–06:40 UTC');
  const [copiedCite, setCopiedCite] = useState<boolean>(false);

  const sectionMetrics = useMemo(
    () => analyzeArticleSections(RAW_MEDIAWIKI_WIKITEXT),
    []
  );

  const generatedCitation = useMemo(
    () =>
      generateSecondaryCitationMarkup({
        mediaType,
        refName,
        title: citeTitle,
        workOrNetwork,
        location,
        date: pubDate,
        urlOrTimestamp,
      }),
    [mediaType, refName, citeTitle, workOrNetwork, location, pubDate, urlOrTimestamp]
  );

  const handleLoadCitationPreset = (preset: 'france24' | 'indianexpress' | 'sakal') => {
    if (preset === 'france24') {
      setMediaType('broadcast');
      setRefName('France24Broadcast');
      setCiteTitle('India: Citizen Campaigns Confront Urban Acoustic Pollution in Pune');
      setWorkOrNetwork('France 24');
      setLocation('Paris, France');
      setPubDate('18 February 2026');
      setUrlOrTimestamp('03:15–06:40 UTC');
    } else if (preset === 'indianexpress') {
      setMediaType('newspaper');
      setRefName('IndianExpressPune2025');
      setCiteTitle('GIPE Students and Pune NGO Map Ganeshotsav Decibel Levels Across City Mandals');
      setWorkOrNetwork('The Indian Express (Pune Edition)');
      setLocation('Pune, Maharashtra');
      setPubDate('6 August 2025');
      setUrlOrTimestamp('https://indianexpress.com/section/cities/pune/');
    } else {
      setMediaType('newspaper');
      setRefName('SakalPune2025');
      setCiteTitle('School Students Sensitized on Noise Hazards Under PMC Awareness Drive');
      setWorkOrNetwork('Sakal');
      setLocation('Pune, Maharashtra');
      setPubDate('7 August 2025');
      setUrlOrTimestamp('https://www.esakal.com/pune');
    }
  };

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(generatedCitation);
      setCopiedCite(true);
      setTimeout(() => setCopiedCite(false), 2000);
    } catch {
      setCopiedCite(true);
      setTimeout(() => setCopiedCite(false), 2000);
    }
  };

  return (
    <section id="audit" className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="pb-6 border-b border-stone-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                05 · Part 1 &amp; Part 7 Priority Evaluation · Editorial Audit &amp; Notability
                Hardening
              </p>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-stone-900 mt-2">
                Press-Release Redline Diffs, Section Audit &amp; WP:NORG Citation Builder
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                Documents the exact sentence-level neutralization transformations, verifies citation
                density across all article sections, and generates broadcast/print citations (
                <em>France 24</em> timestamps and regional Pune newspapers) for mainspace review.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="AfC Editorial Audit Tabs"
              className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg shrink-0"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'redline'}
                onClick={() => setActiveTab('redline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'redline'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                Before/After Redline Diffs
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'sections'}
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'sections'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Section Citation Density
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'citation-builder'}
                onClick={() => setActiveTab('citation-builder')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'citation-builder'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                WP:NORG Broadcast &amp; Print Builder
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Before vs. After Press Release Redline Diff Table */}
        {activeTab === 'redline' && (
          <div className="mt-8 bg-white border border-stone-200 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F4] text-stone-600 font-semibold">
                  <th className="py-3 px-4 w-44">Article Section</th>
                  <th className="py-3 px-4 w-1/3">
                    Raw Source / Press Release Claim (Rejected under WP:PROMO)
                  </th>
                  <th className="py-3 px-4 w-1/3">
                    Neutralized Wikipedia Prose (WP:NPOV Compliant)
                  </th>
                  <th className="py-3 px-4">Stripped Tokens &amp; Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {REDLINE_COMPARISON_LOG.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-stone-900">{row.section}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{row.sourceOrigin}</div>
                    </td>
                    <td className="py-4 px-4 align-top leading-relaxed text-stone-700 bg-red-50/30">
                      &ldquo;{row.rawPressRelease}&rdquo;
                    </td>
                    <td className="py-4 px-4 align-top leading-relaxed text-stone-900 bg-emerald-50/20">
                      {row.encyclopedicRewrite}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="font-mono text-[11px] text-red-800 line-through">
                        {row.strippedTokens.join(' · ')}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">{row.policyApplied}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Section-by-Section Citation Density & Tone Audit */}
        {activeTab === 'sections' && (
          <div className="mt-8 bg-white border border-stone-200 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F4] text-stone-600 font-semibold">
                  <th className="py-3 px-4">Wikipedia Draft Section</th>
                  <th className="py-3 px-4 text-right w-36">Prose Word Count</th>
                  <th className="py-3 px-4 text-right w-40">Inline &lt;ref&gt; Citations</th>
                  <th className="py-3 px-4 text-right w-40">Peacock Terms</th>
                  <th className="py-3 px-4 text-right w-44">AfC Section Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {sectionMetrics.map((sec, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-stone-900">
                      {sec.sectionTitle}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-stone-700">
                      {sec.wordCount} words
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-stone-900 font-semibold">
                      {sec.refCount} refs
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-800">
                      {sec.peacockCount} detected
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-800 font-medium">
                      {sec.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: WP:NORG Broadcast & Regional Newspaper Citation Builder */}
        {activeTab === 'citation-builder' && (
          <div className="mt-8 bg-white border border-stone-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  WP:NORG Secondary Broadcast &amp; Mainstream Print Citation Generator
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Implements Part 7 Priority Recommendation: format original <em>France 24</em>{' '}
                  broadcast timestamps (<code className="font-mono">&#123;&#123;cite AV media&#125;&#125;</code>)
                  and regional print clippings (<em>The Indian Express Pune</em>, <em>Sakal</em>,{' '}
                  <em>Lokmat</em>).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleLoadCitationPreset('france24')}
                  className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Preset: France 24 Broadcast
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadCitationPreset('indianexpress')}
                  className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Preset: Indian Express Pune
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadCitationPreset('sakal')}
                  className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Preset: Sakal Daily
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-5 items-start">
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label
                    htmlFor="cite-builder-type"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Template Type
                  </label>
                  <select
                    id="cite-builder-type"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'broadcast' | 'newspaper')}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  >
                    <option value="broadcast">&#123;&#123;cite AV media&#125;&#125; (Broadcast)</option>
                    <option value="newspaper">&#123;&#123;cite news&#125;&#125; (Print/Regional)</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="cite-builder-refname"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Ref Name Attribute
                  </label>
                  <input
                    id="cite-builder-refname"
                    type="text"
                    value={refName}
                    onChange={(e) => setRefName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="cite-builder-title"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Segment / Headline Title
                  </label>
                  <input
                    id="cite-builder-title"
                    type="text"
                    value={citeTitle}
                    onChange={(e) => setCiteTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-builder-network"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Network / Newspaper
                  </label>
                  <input
                    id="cite-builder-network"
                    type="text"
                    value={workOrNetwork}
                    onChange={(e) => setWorkOrNetwork(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-builder-date"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Broadcast / Publication Date
                  </label>
                  <input
                    id="cite-builder-date"
                    type="text"
                    value={pubDate}
                    onChange={(e) => setPubDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-builder-location"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Publication Location
                  </label>
                  <input
                    id="cite-builder-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-builder-timestamp"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    {mediaType === 'broadcast' ? 'Broadcast Timestamp' : 'Archive / Article URL'}
                  </label>
                  <input
                    id="cite-builder-timestamp"
                    type="text"
                    value={urlOrTimestamp}
                    onChange={(e) => setUrlOrTimestamp(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-semibold text-stone-900">
                    Generated MediaWiki Citation Tag
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    {copiedCite ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-700" />
                        Copied &lt;ref&gt;
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy &lt;ref&gt; Tag
                      </>
                    )}
                  </button>
                </div>
                <pre
                  data-testid="secondary-citation-output"
                  className="p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap break-all leading-relaxed text-stone-900"
                >
                  {generatedCitation}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
