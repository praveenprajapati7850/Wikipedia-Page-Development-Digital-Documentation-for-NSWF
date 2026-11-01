import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  BookOpen,
  Code2,
  Columns,
  FileText,
  RotateCcw,
} from 'lucide-react';
import {
  RAW_MEDIAWIKI_WIKITEXT,
  READABLE_MARKDOWN_DRAFT,
  WIKI_CITATIONS,
} from '../data/nswfDossierData';
import {
  validateWikitextSyntax,
  toggleAfcBannerInWikitext,
} from '../utils/wikiCompliance';

type DraftViewMode = 'encyclopedic' | 'wikitext' | 'markdown' | 'side-by-side';

export const WikipediaDraftWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<DraftViewMode>('encyclopedic');
  const [wikitext, setWikitext] = useState<string>(RAW_MEDIAWIKI_WIKITEXT);
  const [includeAfcBanner, setIncludeAfcBanner] = useState<boolean>(false);
  const [markdownText, setMarkdownText] = useState<string>(READABLE_MARKDOWN_DRAFT);
  const [highlightedRefId, setHighlightedRefId] = useState<number | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<'wikitext' | 'markdown' | null>(null);

  const diagnostics = useMemo(() => validateWikitextSyntax(wikitext), [wikitext]);

  const handleToggleAfcBanner = () => {
    const nextState = !includeAfcBanner;
    setIncludeAfcBanner(nextState);
    setWikitext((prev) => toggleAfcBannerInWikitext(prev, nextState));
  };

  const handleCopy = async (content: string, format: 'wikitext' | 'markdown') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch {
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    }
  };

  const handleDownloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCitationClick = (refNumber: number) => {
    setHighlightedRefId(refNumber);
    const refElement = document.getElementById(`wiki-ref-${refNumber}`);
    if (refElement) {
      refElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderCiteSup = (nums: number[]) => (
    <sup className="ml-0.5 font-mono text-[11px] text-blue-900 select-none">
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => handleCitationClick(n)}
          aria-label={`Jump to reference ${n}`}
          className="hover:underline focus:outline-none focus:underline px-0.5 text-blue-800 cursor-pointer"
        >
          [{n}]
        </button>
      ))}
    </sup>
  );

  return (
    <section id="draft" className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="pb-6 border-b border-stone-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                01 · Pillar Two Deliverable · Articles for Creation (AfC) Ready
              </p>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-stone-900 mt-2">
                Publication-Ready Wikipedia Article &amp; MediaWiki Sandbox
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                Neutralized third-person encyclopedic profile of Nisarg Srishti Welfare Foundation
                (CIN: <span className="font-mono text-stone-800">U85300PN2023NPL217884</span>) with
                verified inline citations, Wikipedia Infobox template, and raw MediaWiki Wikitext.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleCopy(wikitext, 'wikitext')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedFormat === 'wikitext' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Copied Wikitext
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Wikitext
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDownloadFile(
                    wikitext,
                    'Nisarg_Srishti_Welfare_Foundation_Wikipedia_Draft.wiki',
                    'text/plain;charset=utf-8'
                  )
                }
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download .wiki
              </button>
            </div>
          </div>

          {/* Interactive View Switcher Row */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Article format view switcher"
              className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'encyclopedic'}
                onClick={() => setViewMode('encyclopedic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'encyclopedic'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Encyclopedic View
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'wikitext'}
                onClick={() => setViewMode('wikitext')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'wikitext'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Raw MediaWiki Code
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'markdown'}
                onClick={() => setViewMode('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'markdown'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Markdown Draft
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'side-by-side'}
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                Side-by-Side
              </button>
            </div>
            <span className="text-xs text-stone-500">
              Standards: WP:NPOV · WP:NORG · WP:RS · WP:CITE
            </span>
          </div>
        </div>

        {/* Live Wikitext Syntax & Policy Telemetry Strip (Unboxed text with typographic separators) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-stone-200 text-xs text-stone-600">
          <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
            <span className="font-sans font-medium text-stone-900">
              Syntax Status: {diagnostics.isValid ? '100% AfC Compliant' : 'Needs Attention'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Short Description: {diagnostics.hasShortDescription ? 'Present' : 'Missing'}</span>
            <span aria-hidden="true">·</span>
            <span>Infobox Organization: {diagnostics.hasInfobox ? 'Valid' : 'Missing'}</span>
            <span aria-hidden="true">·</span>
            <span>Cite Web Refs: {diagnostics.citationCount}</span>
            <span aria-hidden="true">·</span>
            <span>Sections: {diagnostics.headingCount}</span>
            <span aria-hidden="true">·</span>
            <span>Categories: {diagnostics.categoryCount}</span>
          </div>
          <div className="text-stone-500">
            <span>Standards: WP:NPOV · WP:NORG · WP:RS · WP:CITE</span>
          </div>
        </div>

        {/* Main Workspace Viewport */}
        {viewMode === 'encyclopedic' && (
          <div className="mt-8 bg-white border border-stone-200 p-6 sm:p-10">
            {/* Wikipedia Article Header */}
            <div className="border-b border-stone-300 pb-3 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-950">
                  Nisarg Srishti Welfare Foundation
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  From Wikipedia, the free encyclopedia · Draft namespace preview · Indian
                  environmental non-governmental organization
                </p>
              </div>
              <div className="text-xs font-mono text-stone-500 tabular-nums">
                Use dmy dates · Use Indian English
              </div>
            </div>

            {/* Two-Column Wikipedia Layout: Article Prose Left + Infobox Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 8 Columns: Article Body */}
              <div className="lg:col-span-8 space-y-6 text-[15px] leading-relaxed text-stone-800">
                {/* Lead Section */}
                <p>
                  <strong className="font-semibold text-stone-950">
                    Nisarg Srishti Welfare Foundation
                  </strong>{' '}
                  (<strong className="font-semibold text-stone-950">NSWF</strong>) is an Indian
                  non-profit environmental non-governmental organization headquartered in Pune,
                  Maharashtra.{renderCiteSup([1])} Incorporated on 11 January 2023 as a non-profit
                  entity under the Ministry of Corporate Affairs, the organization focuses on urban
                  noise pollution mitigation, acoustic mapping, water conservation, e-waste
                  awareness, and community-based sustainability education.{renderCiteSup([2, 3])}
                </p>

                {/* Table of Contents */}
                <nav
                  aria-label="Wikipedia Article Table of Contents"
                  className="bg-[#F8F9FA] border border-stone-200 p-4 max-w-md text-xs space-y-1.5"
                >
                  <p className="font-semibold text-stone-900 pb-1 border-b border-stone-200">
                    Contents
                  </p>
                  <ol className="space-y-1 text-blue-900 pt-1">
                    <li>
                      <a href="#wiki-sec-background" className="hover:underline">
                        1 Background
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-mission" className="hover:underline">
                        2 Mission and vision
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-programs" className="hover:underline">
                        3 Programs and initiatives
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-outreach" className="hover:underline">
                        4 Outreach activities
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-collaborations" className="hover:underline">
                        5 Collaborations
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-impact" className="hover:underline">
                        6 Impact and recognition
                      </a>
                    </li>
                    <li>
                      <a href="#wiki-sec-references" className="hover:underline">
                        7 References
                      </a>
                    </li>
                  </ol>
                </nav>

                {/* 1. Background */}
                <div id="wiki-sec-background" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    1. Background
                  </h2>
                  <p className="mb-3">
                    Nisarg Srishti Welfare Foundation was formally registered on 11 January 2023
                    with the Registrar of Companies (RoC) in Pune under Corporate Identification
                    Number (CIN){' '}
                    <code className="font-mono text-xs bg-stone-100 px-1.5 py-0.5 text-stone-900">
                      U85300PN2023NPL217884
                    </code>
                    .{renderCiteSup([1])} The organization was founded by Garima Gaurav Kavathekar,
                    who serves as its Managing Director, alongside Director Deepali Kavathekar and
                    Additional Director Nagesh Alkunthe.{renderCiteSup([1, 4])} Operating from
                    Manjari BK in Pune, the foundation holds an ISO 14001:2015 certification for
                    environmental management practices.{renderCiteSup([4])}
                  </p>
                  <p>
                    To support its technical initiatives in acoustic monitoring and sustainability,
                    the foundation established a multidisciplinary advisory board comprising
                    specialists in aeroacoustics engineering, Internet of Things (IoT) telemetry,
                    hydroponics, corporate social responsibility (CSR), and documentary filmmaking,
                    including Dr. Dipali Ghodake (aeroacoustics researcher), Kunal Jagdale (IoT and
                    audience measurement specialist), Kashyap Bhatt (hydroponics technologist), and
                    Ninad Joshi (aerospace professional).{renderCiteSup([5])}
                  </p>
                </div>

                {/* 2. Mission and Vision */}
                <div id="wiki-sec-mission" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    2. Mission and vision
                  </h2>
                  <p>
                    Operating under the Marathi and English motto{' '}
                    <em className="italic">
                      &ldquo;Nisarg Srishti Sanrakshan – Together for a Sustainable Tomorrow,&rdquo;
                    </em>{' '}
                    the organization&apos;s stated mandate is to address neglected environmental
                    hazards—primarily urban and festive noise pollution—alongside broader ecological
                    conservation, water resource management, renewable energy advocacy, and
                    grassroots environmental literacy among school students and urban residents.
                    {renderCiteSup([3, 6])}
                  </p>
                </div>

                {/* 3. Programs and Initiatives */}
                <div id="wiki-sec-programs" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    3. Programs and initiatives
                  </h2>
                  <p className="mb-3">
                    NSWF structures its operational work around three core technical and
                    environmental verticals:
                  </p>
                  <ul className="list-disc pl-6 space-y-2.5">
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Acoustic Monitoring and Citizen Science:
                      </strong>{' '}
                      The foundation operates digital monitoring interfaces on its portal, including
                      a <em className="italic">Live Noise Monitoring</em> dashboard, the{' '}
                      <em className="italic">NoiseAware</em> citizen noise-reporting system, and a{' '}
                      <em className="italic">Citizen Noise Heat Map</em>.{renderCiteSup([4])} Through
                      IoT guidance from its technical advisors and acoustic specialists such as Dr.
                      Venkatesh Maled, the organization conducts decibel (dB) mapping across urban
                      zones to document noise pollution trends.{renderCiteSup([7])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Festive Noise Assessment:
                      </strong>{' '}
                      During major public festivals such as Ganeshotsav in Pune, NSWF organizes
                      field measurement drives with university student volunteers to record ambient
                      decibel levels across high-traffic intersections and promote compliance with
                      statutory noise limits.{renderCiteSup([7])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Resource Conservation and E-Waste Management:
                      </strong>{' '}
                      Beyond acoustic ecology, the foundation runs community programs focused on
                      water conservation, sustainable agricultural practices (including hydroponics
                      advisory), and electronic waste (e-waste) recycling drives.
                      {renderCiteSup([2, 8])}
                    </li>
                  </ul>
                </div>

                {/* 4. Outreach Activities */}
                <div id="wiki-sec-outreach" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    4. Outreach activities
                  </h2>
                  <p className="mb-3">
                    A primary pillar of NSWF’s field operations involves structured educational
                    workshops across municipal and private schools in Maharashtra to sensitize
                    students to the physiological and cognitive impacts of prolonged noise exposure:
                  </p>
                  <ul className="list-disc pl-6 space-y-2.5">
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Kalawati Dattatray Kotwal High School, Pune (July 2025):
                      </strong>{' '}
                      Interactive student demonstrations on urban decibel reduction and eco-friendly
                      practices.{renderCiteSup([7])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        PMC&apos;s Late Ramchandra Bankar School &amp; Sports Complex, Pune (August
                        2025):
                      </strong>{' '}
                      Inauguration of an annual student noise pollution awareness programme
                      addressing the health and cognitive impacts of urban noise.
                      {renderCiteSup([3, 7])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Nutan Madhyamik Vidyalay, Vadki (September 2025):
                      </strong>{' '}
                      Peri-urban grassroots student workshops focusing on youth-led preventive
                      measures against community noise hazards.{renderCiteSup([7])}
                    </li>
                  </ul>
                </div>

                {/* 5. Collaborations */}
                <div id="wiki-sec-collaborations" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    5. Collaborations
                  </h2>
                  <p className="mb-3">
                    NSWF partners with academic institutions and environmental enterprises to
                    execute field research and awareness campaigns:
                  </p>
                  <ul className="list-disc pl-6 space-y-2.5">
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Indian Institute of Technology (IIT) Bombay (June 2026):
                      </strong>{' '}
                      Collaborative initiative with IIT Bombay to advance joint environmental
                      conservation and sustainability awareness programs.{renderCiteSup([3])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Gokhale Institute of Politics and Economics (GIPE), Pune (August 2025):
                      </strong>{' '}
                      Second-year students from GIPE engaged in academic field exposure with NSWF
                      and collaborated on empirical noise-level data collection across Pune during
                      the Ganesh Utsav 2025 celebrations.{renderCiteSup([7])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        IIEBM Indus Business School, Pune (February 2025):
                      </strong>{' '}
                      Memorandum of Understanding (MoU) signed to integrate management students into
                      community empowerment and sustainable development projects.
                      {renderCiteSup([9])}
                    </li>
                    <li>
                      <strong className="font-semibold text-stone-900">
                        Electrofine Recycling Pvt. Ltd. (November 2025):
                      </strong>{' '}
                      Partnership to conduct joint environmental awareness and e-waste management
                      campaigns.{renderCiteSup([8])}
                    </li>
                  </ul>
                </div>

                {/* 6. Impact and Recognition */}
                <div id="wiki-sec-impact" className="pt-2">
                  <h2 className="text-xl font-editorial font-medium text-stone-950 border-b border-stone-200 pb-1.5 mb-3">
                    6. Impact and recognition
                  </h2>
                  <p>
                    Through its combined school outreach and institutional partnerships, NSWF has
                    documented awareness sessions reaching thousands of students across the Pune
                    metropolitan region.{renderCiteSup([3])} During the 2024–2025 financial year,
                    the organization recorded a 166% compound annual growth rate in operational
                    turnover under its social work mandate.{renderCiteSup([1])} In February 2026,
                    the foundation&apos;s grassroots urban noise pollution campaign was featured in
                    an international documentary report by French public broadcaster{' '}
                    <em className="italic">France 24</em>, examining civic responses to acoustic
                    pollution in Indian cities.{renderCiteSup([10])}
                  </p>
                </div>
              </div>

              {/* Right 4 Columns: Wikipedia Infobox Organization */}
              <aside
                aria-label="Wikipedia Infobox organization"
                className="lg:col-span-4 bg-[#F8F9FA] border border-stone-300 p-4 text-xs"
              >
                <div className="text-center border-b border-stone-300 pb-3 mb-3">
                  <h3 className="text-sm font-bold text-stone-950">
                    Nisarg Srishti Welfare Foundation
                  </h3>
                  <p className="text-stone-600 mt-0.5 font-medium">
                    निसर्ग सृष्टी वेलफेअर फाउंडेशन
                  </p>
                  <p className="text-[11px] italic text-stone-600 mt-1">
                    &ldquo;Nisarg Srishti Sanrakshan – Together for a Sustainable Tomorrow&rdquo;
                  </p>
                </div>

                <dl className="divide-y divide-stone-200/80 text-[12px]">
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Abbreviation</dt>
                    <dd className="col-span-7 text-stone-900 font-mono">NSWF</dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Formation</dt>
                    <dd className="col-span-7 text-stone-900 tabular-nums">
                      11 January 2023 (3 years ago)
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Type</dt>
                    <dd className="col-span-7 text-stone-900">
                      Non-governmental organization (Section 8 Non-Profit)
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Registration ID</dt>
                    <dd className="col-span-7 text-stone-900 font-mono text-[11px] break-all">
                      U85300PN2023NPL217884 (MCA)
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Certifications</dt>
                    <dd className="col-span-7 text-stone-900 font-mono">ISO 14001:2015</dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Status</dt>
                    <dd className="col-span-7 text-stone-900">Active</dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Headquarters</dt>
                    <dd className="col-span-7 text-stone-900">
                      Manjari BK, Pune, Maharashtra – 412307, India
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Key people</dt>
                    <dd className="col-span-7 text-stone-900 space-y-1">
                      <div>Garima Gaurav Kavathekar (Founder &amp; MD)</div>
                      <div>Deepali Kavathekar (Director)</div>
                      <div>Nagesh Alkunthe (Additional Director)</div>
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Operational heads</dt>
                    <dd className="col-span-7 text-stone-900 space-y-1">
                      <div>Rajendra Kulkarni (Manager)</div>
                      <div>Ganpati Khot (Event Co-ordinator)</div>
                      <div>Neena Singh (Env. Head – MH)</div>
                      <div>Sashikala Kumbhar (Edu. Head – Pune)</div>
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Focus</dt>
                    <dd className="col-span-7 text-stone-900">
                      Noise pollution mitigation, acoustic mapping, water conservation,
                      sustainability education
                    </dd>
                  </div>
                  <div className="py-2 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 font-semibold text-stone-700">Website</dt>
                    <dd className="col-span-7">
                      <a
                        href="https://www.nisargsrishti.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900 hover:underline inline-flex items-center gap-1 break-all"
                      >
                        nisargsrishti.org
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>

            {/* 7. References ({{Reflist}}) */}
            <div id="wiki-sec-references" className="mt-10 pt-6 border-t border-stone-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-editorial font-medium text-stone-950">
                  7. References
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  Click any inline [n] superscript above to highlight its source record
                </span>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs text-stone-700 list-decimal pl-5">
                {WIKI_CITATIONS.map((cite) => {
                  const isHighlighted = highlightedRefId === cite.id;
                  return (
                    <li
                      key={cite.id}
                      id={`wiki-ref-${cite.id}`}
                      className={`p-2 transition-colors ${
                        isHighlighted
                          ? 'bg-amber-50/90 border border-amber-300 text-stone-950'
                          : 'border-b border-stone-100'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-[11px] text-stone-500">
                          ref name=&quot;{cite.refName}&quot; · {cite.sourceType}
                        </span>
                        <span className="font-mono text-[11px] text-stone-500 tabular-nums">
                          {cite.date}
                        </span>
                      </div>
                      <a
                        href={cite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-900 hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        &ldquo;{cite.title}&rdquo;
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <span className="text-stone-600">
                        {' '}
                        — <em>{cite.publisher}</em>. Retrieved {cite.accessDate}.
                      </span>
                      <p className="text-[11px] text-stone-500 mt-1">{cite.usageScope}</p>
                    </li>
                  );
                })}
              </ol>

              {/* Categories Bar */}
              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-600 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-800">Categories:</span>
                <span>Environmental organizations based in India</span>
                <span aria-hidden="true">·</span>
                <span>Non-profit organisations based in Pune</span>
                <span aria-hidden="true">·</span>
                <span>Organisations established in 2023</span>
                <span aria-hidden="true">·</span>
                <span>Noise pollution</span>
              </div>
            </div>
          </div>
        )}

        {/* Raw MediaWiki Wikitext View / Live Sandbox Editor */}
        {viewMode === 'wikitext' && (
          <div className="mt-8 bg-white border border-stone-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Raw MediaWiki Wikitext Code (Ready for Wikipedia Sandbox)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Uses standard templates: &#123;&#123;Short description&#125;&#125;,
                  &#123;&#123;Infobox organization&#125;&#125;, &lt;ref&gt;&#123;&#123;cite
                  web&#125;&#125;&lt;/ref&gt;, and &#123;&#123;Reflist&#125;&#125;. Edit below to
                  test live syntax validation.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleAfcBanner}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors cursor-pointer ${
                    includeAfcBanner
                      ? 'bg-emerald-900 text-white border-emerald-900'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {includeAfcBanner
                    ? '{{AfC submission}} Prepended'
                    : 'Prepend {{AfC submission}} Header'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIncludeAfcBanner(false);
                    setWikitext(RAW_MEDIAWIKI_WIKITEXT);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Wikitext
                </button>
              </div>
            </div>

            {diagnostics.issues.length > 0 && (
              <div className="my-4 p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-semibold">Wikitext Syntax Warnings:</p>
                <ul className="list-disc pl-5">
                  {diagnostics.issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <label htmlFor="wikitext-sandbox-editor" className="sr-only">
              MediaWiki Wikitext Editor
            </label>
            <textarea
              id="wikitext-sandbox-editor"
              value={wikitext}
              onChange={(e) => setWikitext(e.target.value)}
              rows={28}
              className="w-full mt-4 p-4 font-mono text-xs leading-relaxed text-stone-900 bg-[#F8F7F4] border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>
        )}

        {/* Markdown Source View */}
        {viewMode === 'markdown' && (
          <div className="mt-8 bg-white border border-stone-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Clean Readable Markdown Draft
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Formatted with numbered inline citations [1]–[10] matching the MediaWiki Reflist.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(markdownText, 'markdown')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  {copiedFormat === 'markdown' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      Copied Markdown
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Markdown
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadFile(
                      markdownText,
                      'Nisarg_Srishti_Welfare_Foundation_Wikipedia_Draft.md',
                      'text/markdown;charset=utf-8'
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .md
                </button>
              </div>
            </div>

            <label htmlFor="markdown-draft-editor" className="sr-only">
              Markdown Draft Editor
            </label>
            <textarea
              id="markdown-draft-editor"
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              rows={26}
              className="w-full mt-4 p-4 font-mono text-xs leading-relaxed text-stone-900 bg-[#F8F7F4] border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>
        )}

        {/* Side-by-Side Dual-Format View */}
        {viewMode === 'side-by-side' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-semibold text-stone-900">
                  Readable Markdown (Inline Citations)
                </h3>
                <span className="text-xs text-stone-500 font-mono">Part 4 Output</span>
              </div>
              <pre className="mt-4 p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800 max-h-[600px] overflow-y-auto">
                {markdownText}
              </pre>
            </div>

            <div className="bg-white border border-stone-200 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-semibold text-stone-900">
                  Raw MediaWiki Markup (Wikipedia Sandbox)
                </h3>
                <span className="text-xs text-stone-500 font-mono">Part 5 Output</span>
              </div>
              <pre className="mt-4 p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800 max-h-[600px] overflow-y-auto">
                {wikitext}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
