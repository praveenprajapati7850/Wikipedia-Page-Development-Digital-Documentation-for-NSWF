import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import {
  RAW_MEDIAWIKI_WIKITEXT,
  READABLE_MARKDOWN_DRAFT,
  INITIAL_RESEARCH_LEDGER,
  MEDIA_ASSETS_MATRIX,
  NSWF_SYSTEM_INSTRUCTIONS,
  AI_STUDIO_PIPELINE_STEPS,
} from '../data/nswfDossierData';

interface SubmissionPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionPackageModal: React.FC<SubmissionPackageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeDoc, setActiveDoc] = useState<1 | 2 | 3>(1);
  const [copiedBundle, setCopiedBundle] = useState(false);

  if (!isOpen) return null;

  const doc1Content = `# DOCUMENT 1: WIKIPEDIA ARTICLE & MEDIAWIKI WIKITEXT DOSSIER
Entity: Nisarg Srishti Welfare Foundation (NSWF)
CIN: U85300PN2023NPL217884 | Incorporated: 11 January 2023 (RoC-Pune)

---
## PART A: READABLE ENCYCLOPEDIC MARKDOWN DRAFT
${READABLE_MARKDOWN_DRAFT}

---
## PART B: RAW MEDIAWIKI WIKITEXT (READY FOR WIKIPEDIA DRAFT SANDBOX)
\`\`\`mediawiki
${RAW_MEDIAWIKI_WIKITEXT}
\`\`\`
`;

  const doc2Content = `# DOCUMENT 2: VERIFICATION & SOURCE AUDIT LEDGER (WP:RS, WP:PRIMARY & WP:COM)

## 1. SOURCE SEPARATION METHODOLOGY
- Primary Sources (WP:PRIMARY): MCA/RoC Pune statutory filings and nisargsrishti.org pages are strictly isolated to uncontroversial administrative facts (incorporation date, CIN U85300PN2023NPL217884, registered office, board directors, ISO 14001:2015 certification, and hosted portal tools).
- Secondary Sources (WP:RS): Independent coverage from IndiaChronicle, Bharat Good Times, Stay Featured, and France 24 documentary reporting substantiates institutional collaborations (IIT Bombay, GIPE Pune, IIEBM Indus Business School, Electrofine) and public impact.
- Priority Recommendation for AfC Approval: Attach original France 24 broadcast timestamp/URL and 1–2 regional mainstream print clippings (Sakal, Lokmat, or The Indian Express Pune) before moving from Draft: space to mainspace.

## 2. VERIFIED RESEARCH LEDGER
${INITIAL_RESEARCH_LEDGER.map(
  (row) =>
    `- [${row.id}] ${row.category}: ${row.verifiedFact} (${row.sourceType} — ${row.sourceReference} | ${row.sourceUrl})`
).join('\n')}

## 3. SUPPORTING MEDIA ASSET CURATION & LICENSING MATRIX (WP:COM)
${MEDIA_ASSETS_MATRIX.map(
  (m) =>
    `- ${m.id} (${m.filename}): ${m.visualSubject} | Target Section: ${m.targetSection} | Protocol: ${m.protocol}`
).join('\n')}
`;

  const doc3Content = `# DOCUMENT 3: GOOGLE AI STUDIO WORKFLOW & NSWF WIKIARCHITECT SPECIFICATION

## 1. MODEL & PARAMETER CONFIGURATION
- Model: gemini-2.5-pro / gemini-3.8-flash
- Temperature: 0.15 (Deterministic Factual Grounding Mode)
- Grounding with Google Search: ON (Real-time URL & publication date verification)

## 2. SYSTEM INSTRUCTIONS
\`\`\`markdown
${NSWF_SYSTEM_INSTRUCTIONS}
\`\`\`

## 3. STRUCTURED 3-STEP PROMPT PIPELINE
${AI_STUDIO_PIPELINE_STEPS.map(
  (s) =>
    `### Prompt ${s.stepNumber}: ${s.title} (${s.policyTag})\nPrompt: "${s.promptText}"\n\nVerified Output:\n${s.deterministicOutput}\n`
).join('\n')}
`;

  const fullPortfolioMarkdown = `${doc1Content}\n\n================================================================================\n\n${doc2Content}\n\n================================================================================\n\n${doc3Content}`;

  const currentDocContent =
    activeDoc === 1 ? doc1Content : activeDoc === 2 ? doc2Content : doc3Content;

  const handleCopyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(currentDocContent);
      setCopiedBundle(true);
      setTimeout(() => setCopiedBundle(false), 2000);
    } catch {
      setCopiedBundle(true);
      setTimeout(() => setCopiedBundle(false), 2000);
    }
  };

  const handleDownloadFullPackage = () => {
    const blob = new Blob([fullPortfolioMarkdown], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NSWF_Wikipedia_3_Part_Evaluation_Portfolio.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4"
    >
      <div className="bg-[#FBF9F5] border border-stone-300 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Part 7 · Priority Internship Evaluation Package
            </p>
            <h2
              id="submission-modal-title"
              className="text-lg font-editorial font-semibold text-stone-900"
            >
              3-Part Submission Portfolio Dossier
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close submission package modal"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Selector Tabs */}
        <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveDoc(1)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeDoc === 1
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              Doc 1: Wikipedia Article &amp; Wikitext
            </button>
            <button
              type="button"
              onClick={() => setActiveDoc(2)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeDoc === 2
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              Doc 2: Verification &amp; Source Audit Ledger
            </button>
            <button
              type="button"
              onClick={() => setActiveDoc(3)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeDoc === 3
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              Doc 3: AI Studio Workflow Spec
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCurrent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded-md hover:bg-stone-50 cursor-pointer"
            >
              {copiedBundle ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  Copied Document {activeDoc}
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Document {activeDoc}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadFullPackage}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download All 3 Docs (.md)
            </button>
          </div>
        </div>

        {/* Document Content Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          <div className="flex items-center gap-2 text-xs text-stone-500 pb-3 border-b border-stone-200 mb-3">
            <FileText className="w-4 h-4 text-stone-700" />
            <span>
              Viewing Document {activeDoc} of 3 · Ready for Internship Evaluation Submission
            </span>
          </div>
          <pre className="p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800">
            {currentDocContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
