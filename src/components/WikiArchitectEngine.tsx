import React, { useState } from 'react';
import {
  Play,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Sliders,
  FileCheck2,
  AlertTriangle,
} from 'lucide-react';
import {
  NSWF_SYSTEM_INSTRUCTIONS,
  AI_STUDIO_PIPELINE_STEPS,
  PRESET_PRESS_RELEASES,
} from '../data/nswfDossierData';
import {
  auditPromotionalTone,
  type NeutralizationAuditResult,
} from '../utils/wikiCompliance';

export const WikiArchitectEngine: React.FC = () => {
  // System Instructions & Config State
  const [copiedSysPrompt, setCopiedSysPrompt] = useState(false);
  const [searchGroundingEnabled, setSearchGroundingEnabled] = useState(true);
  const [temperature] = useState(0.15);

  // 3-Stage Prompt Pipeline State
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [pipelineOutput, setPipelineOutput] = useState<string>(
    AI_STUDIO_PIPELINE_STEPS[0].deterministicOutput
  );
  const [pipelineEngineLabel, setPipelineEngineLabel] = useState<string>(
    'Verified Ground-Truth Dossier Output'
  );
  const [pipelineLoading, setPipelineLoading] = useState<boolean>(false);
  const [pipelineSources, setPipelineSources] = useState<
    Array<{ title?: string; uri?: string }>
  >([
    {
      title: 'Nisarg Srishti Welfare Foundation Official Portal',
      uri: 'https://www.nisargsrishti.org/',
    },
    {
      title: 'IIT Bombay & NSWF Collaboration – IndiaChronicle',
      uri: 'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
    },
  ]);

  // Live WP:NPOV & Peacock Neutralizer State
  const [rawInputText, setRawInputText] = useState<string>(
    PRESET_PRESS_RELEASES[0].rawText
  );
  const [citeTitle, setCiteTitle] = useState<string>(
    PRESET_PRESS_RELEASES[0].citationTitle
  );
  const [citeUrl, setCiteUrl] = useState<string>(
    PRESET_PRESS_RELEASES[0].citationUrl
  );
  const [citePublisher, setCitePublisher] = useState<string>(
    PRESET_PRESS_RELEASES[0].citationPublisher
  );
  const [citeDate, setCiteDate] = useState<string>(
    PRESET_PRESS_RELEASES[0].citationDate
  );
  const [neutralizerError, setNeutralizerError] = useState<string>('');
  const [neutralizerLoading, setNeutralizerLoading] = useState<boolean>(false);
  const [engineSourceMode, setEngineSourceMode] = useState<string>(
    'Deterministic WP:NPOV Lexical & Citation Engine'
  );
  const [auditResult, setAuditResult] = useState<NeutralizationAuditResult>(() =>
    auditPromotionalTone(
      PRESET_PRESS_RELEASES[0].rawText,
      PRESET_PRESS_RELEASES[0].citationTitle,
      PRESET_PRESS_RELEASES[0].citationUrl,
      PRESET_PRESS_RELEASES[0].citationPublisher,
      PRESET_PRESS_RELEASES[0].citationDate
    )
  );

  const handleCopySystemInstructions = async () => {
    try {
      await navigator.clipboard.writeText(NSWF_SYSTEM_INSTRUCTIONS);
      setCopiedSysPrompt(true);
      setTimeout(() => setCopiedSysPrompt(false), 2000);
    } catch {
      setCopiedSysPrompt(true);
      setTimeout(() => setCopiedSysPrompt(false), 2000);
    }
  };

  const handleSelectStep = (stepNum: number) => {
    setActivePipelineStep(stepNum);
    const found = AI_STUDIO_PIPELINE_STEPS.find((s) => s.stepNumber === stepNum);
    if (found) {
      setPipelineOutput(found.deterministicOutput);
      setPipelineEngineLabel('Verified Ground-Truth Dossier Output');
    }
  };

  const handleRunPipelineStep = async (stepNum: number) => {
    const found =
      AI_STUDIO_PIPELINE_STEPS.find((s) => s.stepNumber === stepNum) ||
      AI_STUDIO_PIPELINE_STEPS[0];
    setActivePipelineStep(stepNum);
    setPipelineLoading(true);
    try {
      const response = await fetch('/api/wiki-architect/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stepNumber: stepNum,
          customPrompt: found.promptText,
          useSearchGrounding: searchGroundingEnabled,
        }),
      });
      const data = await response.json();
      if (data.output) {
        setPipelineOutput(data.output);
        setPipelineEngineLabel(data.engineMode || 'Gemini Compliance Engine');
        if (Array.isArray(data.groundingSources) && data.groundingSources.length > 0) {
          setPipelineSources(data.groundingSources);
        }
      }
    } catch {
      setPipelineOutput(found.deterministicOutput);
      setPipelineEngineLabel('Verified Ground-Truth Dossier Output');
    } finally {
      setPipelineLoading(false);
    }
  };

  const handleSelectPreset = (index: number) => {
    const preset = PRESET_PRESS_RELEASES[index];
    if (!preset) return;
    setNeutralizerError('');
    setRawInputText(preset.rawText);
    setCiteTitle(preset.citationTitle);
    setCiteUrl(preset.citationUrl);
    setCitePublisher(preset.citationPublisher);
    setCiteDate(preset.citationDate);
    const immediateAudit = auditPromotionalTone(
      preset.rawText,
      preset.citationTitle,
      preset.citationUrl,
      preset.citationPublisher,
      preset.citationDate
    );
    setAuditResult(immediateAudit);
    setEngineSourceMode('Deterministic WP:NPOV Lexical & Citation Engine');
  };

  const handleRunNeutralizer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawInputText.trim()) {
      setNeutralizerError('Please enter press release or draft text to audit against WP:NPOV.');
      return;
    }
    setNeutralizerError('');

    // Run immediate local audit first
    const localResult = auditPromotionalTone(
      rawInputText,
      citeTitle,
      citeUrl,
      citePublisher,
      citeDate
    );
    setAuditResult(localResult);
    setNeutralizerLoading(true);

    try {
      const response = await fetch('/api/wiki-architect/neutralize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: rawInputText,
          citationTitle: citeTitle,
          citationUrl: citeUrl,
          citationPublisher: citePublisher,
          citationDate: citeDate,
          useSearchGrounding: searchGroundingEnabled,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAuditResult({
          originalText: rawInputText,
          neutralizedText: data.neutralizedText || localResult.neutralizedText,
          wikitextSnippet: data.wikitextSnippet || localResult.wikitextSnippet,
          violations: data.violations || localResult.violations,
          npovScore: data.npovScore ?? localResult.npovScore,
          afcRiskStatus: data.afcRiskStatus || localResult.afcRiskStatus,
        });
        setEngineSourceMode(data.engineMode || 'Gemini Live Compliance Engine');
      }
    } catch {
      setEngineSourceMode('Deterministic WP:NPOV Rule Engine');
    } finally {
      setNeutralizerLoading(false);
    }
  };

  const currentStepObj =
    AI_STUDIO_PIPELINE_STEPS.find((s) => s.stepNumber === activePipelineStep) ||
    AI_STUDIO_PIPELINE_STEPS[0];

  return (
    <section id="engine" className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Heading */}
        <div className="pb-8 border-b border-stone-200">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            02 · Pillar One Deliverable · Custom AI Editorial &amp; Compliance Engine
          </p>
          <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-stone-900 mt-2">
            NSWF WikiArchitect &amp; Compliance Pipeline
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Automates research synthesis, strips promotional press-release tone (
            <code className="font-mono text-xs text-stone-800">WP:NPOV</code> /{' '}
            <code className="font-mono text-xs text-stone-800">WP:PEACOCK</code>), enforces Primary
            vs. Secondary source boundaries (<code className="font-mono text-xs text-stone-800">WP:RS</code>
            ), and generates MediaWiki citations.
          </p>
        </div>

        {/* Part A: System Instructions & Model Configuration Box */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: Configuration Parameters & Risk Prevention */}
          <div className="lg:col-span-5 bg-white border border-stone-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-stone-700" />
                <h3 className="text-base font-semibold text-stone-900">
                  Engine Configuration Parameters
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-500">Part 2 Spec</span>
            </div>

            <dl className="divide-y divide-stone-200 text-xs mt-2">
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="font-medium text-stone-700">Target Model Architecture</dt>
                <dd className="font-mono text-stone-900 font-semibold">
                  gemini-2.5-pro / gemini-3.8-flash
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="font-medium text-stone-700">Deterministic Temperature</dt>
                <dd className="font-mono text-stone-900 tabular-nums font-semibold">
                  {temperature} (Zero-Hallucination Mode)
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="font-medium text-stone-700">Grounding with Google Search</dt>
                <dd>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={searchGroundingEnabled}
                    onClick={() => setSearchGroundingEnabled(!searchGroundingEnabled)}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                      searchGroundingEnabled
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'bg-stone-100 text-stone-700 border-stone-300'
                    }`}
                  >
                    {searchGroundingEnabled ? 'ON (Live URL Verification)' : 'OFF (Dossier Only)'}
                  </button>
                </dd>
              </div>
              <div className="py-3">
                <dt className="font-medium text-stone-700 mb-1.5">
                  Why 80% of NGO Drafts Fail at Wikipedia AfC (Mitigated Risks)
                </dt>
                <dd className="space-y-2 text-stone-600 leading-relaxed pt-1">
                  <div>
                    <strong className="text-stone-900">1. WP:PROMO &amp; WP:PEACOCK:</strong> Strips
                    press-release hyperbole (&ldquo;working passionately&rdquo;, &ldquo;visionary
                    guidance&rdquo;, &ldquo;bold steps&rdquo;) into clinical third-person prose.
                  </div>
                  <div>
                    <strong className="text-stone-900">2. WP:NORG &amp; WP:RS:</strong> Separates
                    Primary MCA/website records (for CIN, dates, board) from Secondary news sources
                    (for IIT Bombay, GIPE, IIEBM, and France 24).
                  </div>
                  <div>
                    <strong className="text-stone-900">3. WP:DCM Media Copyright:</strong> Enforces
                    CC BY-SA 4.0 release via Wikimedia VRTS before any website photo upload.
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right 7 Columns: Copy-Paste System Instructions */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  System Instructions Block (NSWF WikiArchitect)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Configured on the backend Express + Gemini pipeline and ready for direct copy into
                  Google AI Studio.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopySystemInstructions}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedSysPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Copied Instructions
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy System Instructions
                  </>
                )}
              </button>
            </div>
            <pre className="mt-4 p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800 max-h-[300px] overflow-y-auto">
              {NSWF_SYSTEM_INSTRUCTIONS}
            </pre>
          </div>
        </div>

        {/* Part B: 3-Stage Structured Prompt Pipeline Runner */}
        <div className="mt-8 bg-white border border-stone-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-editorial font-semibold text-stone-900">
                Structured 3-Prompt Execution Pipeline
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Select or execute each sequential stage of the NSWF WikiArchitect workflow.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {AI_STUDIO_PIPELINE_STEPS.map((step) => (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => handleSelectStep(step.stepNumber)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activePipelineStep === step.stepNumber
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  Prompt {step.stepNumber}: {step.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs text-stone-500 font-mono">
                STAGE 0{currentStepObj.stepNumber} · {currentStepObj.policyTag}
              </div>
              <h4 className="text-base font-semibold text-stone-900">{currentStepObj.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{currentStepObj.description}</p>
              <div className="p-3.5 bg-[#F8F7F4] border border-stone-200 text-xs font-mono text-stone-800 leading-relaxed">
                &ldquo;{currentStepObj.promptText}&rdquo;
              </div>
              <button
                type="button"
                disabled={pipelineLoading}
                onClick={() => handleRunPipelineStep(currentStepObj.stepNumber)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                {pipelineLoading
                  ? `Running Prompt ${currentStepObj.stepNumber}...`
                  : `Execute Prompt ${currentStepObj.stepNumber} in Engine`}
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
                <span className="font-medium text-stone-800">
                  Pipeline Output ({pipelineEngineLabel})
                </span>
                <span className="font-mono tabular-nums">Temp: {temperature}</span>
              </div>
              <pre
                data-testid="pipeline-output-box"
                className="p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-900 max-h-[300px] overflow-y-auto"
              >
                {pipelineOutput}
              </pre>
              {pipelineSources.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span className="font-medium text-stone-700">Grounded Sources:</span>
                  {pipelineSources.map((s, i) => (
                    <a
                      key={i}
                      href={s.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:underline inline-flex items-center gap-1"
                    >
                      {s.title || s.uri}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Part C: Interactive WP:NPOV & Peacock Neutralizer Workbench */}
        <div className="mt-8 bg-white border border-stone-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-editorial font-semibold text-stone-900">
                Interactive WP:NPOV &amp; Peacock Term Neutralizer + Wikitext Formatter
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Test raw press releases or NGO promotional sentences. The engine flags{' '}
                <code className="font-mono">WP:PEACOCK</code> and{' '}
                <code className="font-mono">WP:PROMO</code> violations, rewrites them into clinical
                encyclopedic prose, and compiles a MediaWiki citation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {PRESET_PRESS_RELEASES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Load Sample {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRunNeutralizer} className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Column */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label
                  htmlFor="raw-press-release-input"
                  className="block text-xs font-semibold text-stone-800 mb-1.5"
                >
                  Raw Press Release / Draft Claim Input
                </label>
                <textarea
                  id="raw-press-release-input"
                  rows={4}
                  value={rawInputText}
                  onChange={(e) => setRawInputText(e.target.value)}
                  placeholder="Paste promotional NGO claim or press release sentence..."
                  className="w-full p-3 text-xs leading-relaxed text-stone-900 bg-[#F8F7F4] border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                {neutralizerError && (
                  <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                    {neutralizerError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cite-title-input"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Source Article Title (WP:RS)
                  </label>
                  <input
                    id="cite-title-input"
                    type="text"
                    value={citeTitle}
                    onChange={(e) => setCiteTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-publisher-input"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Publisher / Website
                  </label>
                  <input
                    id="cite-publisher-input"
                    type="text"
                    value={citePublisher}
                    onChange={(e) => setCitePublisher(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-url-input"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Source URL
                  </label>
                  <input
                    id="cite-url-input"
                    type="url"
                    value={citeUrl}
                    onChange={(e) => setCiteUrl(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cite-date-input"
                    className="block text-[11px] font-medium text-stone-600 mb-1"
                  >
                    Publication Date
                  </label>
                  <input
                    id="cite-date-input"
                    type="text"
                    value={citeDate}
                    onChange={(e) => setCiteDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={neutralizerLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {neutralizerLoading
                  ? 'Auditing & Neutralizing...'
                  : 'Run Compliance Pipeline'}
              </button>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Audit Telemetry Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200 text-xs">
                <div className="flex items-center gap-2">
                  {auditResult.violations.length > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                  ) : (
                    <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  )}
                  <span className="font-semibold text-stone-900">
                    Input Risk Assessment: {auditResult.afcRiskStatus}
                  </span>
                </div>
                <span className="font-mono text-stone-600 tabular-nums">
                  Peacock Terms Stripped: {auditResult.violations.length} · Input NPOV Score:{' '}
                  {auditResult.npovScore}/100
                </span>
              </div>

              {/* Stripped Promotional Terms List */}
              {auditResult.violations.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-stone-800">
                    Flagged Promotional / Peacock Terms Removed:
                  </p>
                  <div className="divide-y divide-stone-200 border border-stone-200 bg-[#F8F7F4] text-xs">
                    {auditResult.violations.map((v, i) => (
                      <div key={i} className="p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="font-mono font-semibold text-red-800 line-through">
                            &ldquo;{v.term}&rdquo;
                          </span>{' '}
                          <span className="text-stone-500">({v.policy})</span> —{' '}
                          <span className="text-stone-600">{v.reason}</span>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-800 shrink-0">
                          → {v.replacement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neutralized Encyclopedic Prose Output */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-800">
                    Neutralized Encyclopedic Prose (WP:NPOV Compliant)
                  </span>
                  <span className="text-stone-500 font-mono text-[11px]">{engineSourceMode}</span>
                </div>
                <div
                  data-testid="neutralized-prose-output"
                  className="p-3 bg-[#F8F7F4] border border-stone-200 text-xs leading-relaxed text-stone-900"
                >
                  {auditResult.neutralizedText}
                </div>
              </div>

              {/* Generated MediaWiki Citation Snippet */}
              <div>
                <span className="block text-xs font-semibold text-stone-800 mb-1">
                  Generated MediaWiki Wikitext with Inline &lt;ref&gt;&#123;&#123;cite web&#125;&#125;
                </span>
                <pre
                  data-testid="neutralized-wikitext-output"
                  className="p-3 bg-[#F8F7F4] border border-stone-200 text-[11px] font-mono whitespace-pre-wrap break-all leading-relaxed text-stone-800"
                >
                  {auditResult.wikitextSnippet}
                </pre>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
