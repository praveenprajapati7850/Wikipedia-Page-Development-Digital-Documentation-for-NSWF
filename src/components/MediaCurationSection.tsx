import React, { useState, useMemo } from 'react';
import { Copy, Check, Mail, FileCode2 } from 'lucide-react';
import { MEDIA_ASSETS_MATRIX } from '../data/nswfDossierData';
import { generateVrtsReleaseEmail, type MediaAssetItem } from '../utils/wikiCompliance';

export const MediaCurationSection: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetItem>(MEDIA_ASSETS_MATRIX[0]);
  const [declarantName, setDeclarantName] = useState<string>('Dr. (HC) Garima Gaurav Kavathekar');
  const [declarantRole, setDeclarantRole] = useState<string>(
    'Founder & Managing Director, Nisarg Srishti Welfare Foundation'
  );
  const [copiedType, setCopiedType] = useState<'vrts' | 'commons' | null>(null);

  const generated = useMemo(
    () => generateVrtsReleaseEmail(selectedAsset, declarantName, declarantRole),
    [selectedAsset, declarantName, declarantRole]
  );

  const handleCopy = async (text: string, type: 'vrts' | 'commons') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <section id="media" className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Heading */}
        <div className="pb-8 border-b border-stone-200">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            04 · Part 6 Deliverable · Supporting Media Asset Curation &amp; Licensing Plan (WP:COM)
          </p>
          <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-stone-900 mt-2">
            Wikimedia Commons Copyright Matrix &amp; VRTS Release Generator
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Photographs published on <code className="font-mono text-xs">nisargsrishti.org/photo-gallery</code>{' '}
            cannot be uploaded directly to Wikipedia without an explicit{' '}
            <strong className="font-semibold text-stone-900">CC BY-SA 4.0</strong> declaration sent
            to Wikimedia VRTS (<code className="font-mono text-xs">permissions-commons@wikimedia.org</code>)
            to prevent speedy deletion under <code className="font-mono text-xs">WP:DCM</code>.
          </p>
        </div>

        {/* Media Asset Matrix Table */}
        <div className="mt-8 bg-white border border-stone-200 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-[#F8F7F4] text-stone-600 font-semibold">
                <th className="py-3 px-4 w-24">Asset ID</th>
                <th className="py-3 px-4 w-72">Proposed Wikimedia Filename</th>
                <th className="py-3 px-4">Visual Subject &amp; Source Event</th>
                <th className="py-3 px-4 w-44">Target Section</th>
                <th className="py-3 px-4 w-48 text-right">VRTS Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {MEDIA_ASSETS_MATRIX.map((asset) => {
                const isSelected = selectedAsset.id === asset.id;
                return (
                  <tr
                    key={asset.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-stone-100/90' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    <td className="py-3.5 px-4 align-top font-mono font-semibold text-stone-900">
                      {asset.id}
                    </td>
                    <td className="py-3.5 px-4 align-top font-mono text-[11px] text-stone-900 break-all">
                      {asset.filename}
                    </td>
                    <td className="py-3.5 px-4 align-top leading-relaxed">
                      <div>{asset.visualSubject}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{asset.protocol}</div>
                    </td>
                    <td className="py-3.5 px-4 align-top font-medium text-stone-800">
                      {asset.targetSection}
                    </td>
                    <td className="py-3.5 px-4 align-top text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedAsset(asset)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected ? 'Selected in Generator' : 'Generate VRTS Release'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Interactive VRTS Permission Email & Wikimedia Commons {{Information}} Generator */}
        <div className="mt-8 bg-white border border-stone-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-editorial font-semibold text-stone-900">
                Wikimedia VRTS Permission Letter &amp; Commons File Page Generator
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Active Asset:{' '}
                <code className="font-mono font-semibold text-stone-900">
                  {selectedAsset.filename}
                </code>{' '}
                · Target Section: {selectedAsset.targetSection}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="vrts-declarant-name"
                  className="block text-[11px] font-medium text-stone-600 mb-0.5"
                >
                  Authorized Signatory Name
                </label>
                <input
                  id="vrts-declarant-name"
                  type="text"
                  value={declarantName}
                  onChange={(e) => setDeclarantName(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900 w-full sm:w-56"
                />
              </div>
              <div>
                <label
                  htmlFor="vrts-declarant-role"
                  className="block text-[11px] font-medium text-stone-600 mb-0.5"
                >
                  Official Designation
                </label>
                <input
                  id="vrts-declarant-role"
                  type="text"
                  value={declarantRole}
                  onChange={(e) => setDeclarantRole(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
            {/* Left: VRTS Release Declaration Email */}
            <div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <Mail className="w-3.5 h-3.5 text-stone-700" />
                  <span>VRTS CC BY-SA 4.0 Release Email (permissions-commons@wikimedia.org)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(generated.vrtsEmail, 'vrts')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  {copiedType === 'vrts' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      Copied Email
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy VRTS Email
                    </>
                  )}
                </button>
              </div>
              <pre
                data-testid="vrts-email-preview"
                className="p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800 max-h-[320px] overflow-y-auto"
              >
                {generated.vrtsEmail}
              </pre>
            </div>

            {/* Right: Wikimedia Commons {{Information}} Wikitext */}
            <div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <FileCode2 className="w-3.5 h-3.5 text-stone-700" />
                  <span>Wikimedia Commons Upload Summary (&#123;&#123;Information&#125;&#125;)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(generated.commonsTemplate, 'commons')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-800 bg-stone-100 border border-stone-300 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  {copiedType === 'commons' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      Copied Wikitext
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Commons Markup
                    </>
                  )}
                </button>
              </div>
              <pre
                data-testid="commons-template-preview"
                className="p-4 bg-[#F8F7F4] border border-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-800 max-h-[320px] overflow-y-auto"
              >
                {generated.commonsTemplate}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
