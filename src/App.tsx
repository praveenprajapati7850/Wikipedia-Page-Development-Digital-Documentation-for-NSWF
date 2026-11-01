/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowDownRight, FileCheck, PackageCheck } from 'lucide-react';
import { WikipediaDraftWorkspace } from './components/WikipediaDraftWorkspace';
import { WikiArchitectEngine } from './components/WikiArchitectEngine';
import { ResearchLedgerSection } from './components/ResearchLedgerSection';
import { MediaCurationSection } from './components/MediaCurationSection';
import { AfcAuditAndRedlineSection } from './components/AfcAuditAndRedlineSection';
import { SubmissionPackageModal } from './components/SubmissionPackageModal';

export default function App() {
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-stone-200">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-editorial font-semibold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
          >
            NSWF WikiArchitect
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Dossier Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#draft"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Article &amp; Wikitext
            </a>
            <a
              href="#engine"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Compliance Engine
            </a>
            <a
              href="#dossier"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Research Dossier
            </a>
            <a
              href="#media"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Media &amp; VRTS
            </a>
            <a
              href="#audit"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Redline Audit
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsPackageModalOpen(true)}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Export Submission Package
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Institutional Hero Section */}
        <section className="py-12 sm:py-16 border-b border-stone-200 bg-[#F7F4EE]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Columns: Editorial Headline & Mission */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-medium">
                    Wikipedia Articles for Creation (AfC) · Digital Documentation &amp; Compliance
                    Dossier
                  </p>
                  <h1
                    className="text-3xl sm:text-5xl font-editorial font-semibold text-stone-950 tracking-tight mt-3 leading-[1.12]"
                    style={{ textWrap: 'balance' }}
                  >
                    Nisarg Srishti Welfare Foundation Encyclopedic Architecture
                  </h1>
                  <p className="text-base text-stone-700 mt-4 max-w-2xl leading-relaxed">
                    A dual-pillar documentation system combining the{' '}
                    <strong className="font-semibold text-stone-950">
                      NSWF WikiArchitect AI Compliance Engine
                    </strong>{' '}
                    (<code className="font-mono text-xs">WP:NPOV</code>,{' '}
                    <code className="font-mono text-xs">WP:RS</code>,{' '}
                    <code className="font-mono text-xs">WP:CITE</code>,{' '}
                    <code className="font-mono text-xs">WP:COM</code>) with a publication-ready
                    MediaWiki draft grounded in verified Ministry of Corporate Affairs filings,
                    academic collaborations, and international broadcast records.
                  </p>
                </div>

                {/* Single Dominant Hero CTA + Secondary Jump Link */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#draft"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    Inspect Wikipedia Draft &amp; Wikitext
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#engine"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    Open WP:NPOV Compliance Engine
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Institutional Registration & AfC Readiness Summary */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-stone-200">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Corporate &amp; Editorial Verification Card
                    </span>
                    <span className="text-xs font-mono text-emerald-800 font-medium whitespace-nowrap shrink-0">
                      AfC Pre-Flight Verified
                    </span>
                  </div>

                  <dl className="divide-y divide-stone-200 text-xs mt-2">
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">Legal Entity (RoC-Pune)</dt>
                      <dd className="font-semibold text-stone-950 text-right">
                        Nisarg Srishti Welfare Foundation
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">Corporate Identity Number</dt>
                      <dd className="font-mono font-semibold text-stone-950 tabular-nums">
                        U85300PN2023NPL217884
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">Date of Incorporation</dt>
                      <dd className="font-mono text-stone-900 tabular-nums">11 January 2023</dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">Environmental Standard</dt>
                      <dd className="font-mono text-stone-900">ISO 14001:2015 Certified</dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">Institutional Partners Verified</dt>
                      <dd className="text-stone-900 text-right">
                        IIT Bombay · GIPE Pune · IIEBM · Electrofine
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-4">
                      <dt className="text-stone-600">International Broadcast Record</dt>
                      <dd className="text-stone-900 text-right">
                        France 24 Documentary (Feb 2026)
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="pt-4 mt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span className="inline-flex items-center gap-1.5 font-medium text-stone-800">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-800" />
                    10 Inline &#123;&#123;cite web&#125;&#125; References
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPackageModalOpen(true)}
                    className="text-blue-900 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    View 3-Part Portfolio
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Operational Summary Strip Below Hero Split */}
            <div className="mt-8 pt-6 border-t border-stone-300/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div>
                <p className="text-stone-500 uppercase tracking-wider font-medium">
                  Pillar 01 · AI Compliance Engine
                </p>
                <p className="text-stone-900 font-semibold mt-1">
                  WP:NPOV &amp; Peacock Term Sanitizer
                </p>
                <p className="text-stone-600 mt-0.5">
                  Strips promotional hyperbole at Temp 0.15 with Google Search grounding.
                </p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider font-medium">
                  Pillar 02 · Dual-Format Article
                </p>
                <p className="text-stone-900 font-semibold mt-1">
                  Markdown + Raw MediaWiki Wikitext
                </p>
                <p className="text-stone-600 mt-0.5">
                  Includes &#123;&#123;Infobox organization&#125;&#125;, 6 sections, and
                  &#123;&#123;Reflist&#125;&#125;.
                </p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider font-medium">
                  Source Audit · WP:RS vs WP:PRIMARY
                </p>
                <p className="text-stone-900 font-semibold mt-1 tabular-nums">
                  12 Fact-Checked Dossier Records
                </p>
                <p className="text-stone-600 mt-0.5">
                  Separates MCA filings from secondary news coverage.
                </p>
              </div>
              <div>
                <p className="text-stone-500 uppercase tracking-wider font-medium">
                  Media Licensing · WP:COM &amp; VRTS
                </p>
                <p className="text-stone-900 font-semibold mt-1 tabular-nums">
                  4 Curated Field Media Assets
                </p>
                <p className="text-stone-600 mt-0.5">
                  Automated CC BY-SA 4.0 VRTS release generator for Wikimedia Commons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Publication-Ready Wikipedia Draft & MediaWiki Sandbox */}
        <WikipediaDraftWorkspace />

        {/* Section 2: NSWF WikiArchitect AI Editorial & Compliance Engine */}
        <WikiArchitectEngine />

        {/* Section 3: Verified Research Dossier & Source Classification Ledger */}
        <ResearchLedgerSection />

        {/* Section 4: Supporting Media Curation & Licensing Matrix */}
        <MediaCurationSection />

        {/* Section 5: Press-Release Redline Diffs, Section Audit & WP:NORG Builder */}
        <AfcAuditAndRedlineSection />
      </main>

      {/* Clean Institutional Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 text-xs text-stone-600">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-stone-900">
              NSWF WikiArchitect &amp; Encyclopedic Dossier
            </span>{' '}
            · Prepared for Nisarg Srishti Welfare Foundation (CIN: U85300PN2023NPL217884, Manjari
            BK, Pune)
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.nisargsrishti.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-950 hover:underline"
            >
              Official NSWF Portal
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsPackageModalOpen(true)}
              className="hover:text-stone-950 hover:underline cursor-pointer"
            >
              Download 3-Part Evaluation Portfolio
            </button>
          </div>
        </div>
      </footer>

      {/* 3-Part Submission Package Modal */}
      <SubmissionPackageModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
      />
    </div>
  );
}
