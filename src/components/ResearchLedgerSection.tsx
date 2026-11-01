import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Plus, CheckCircle2 } from 'lucide-react';
import { INITIAL_RESEARCH_LEDGER } from '../data/nswfDossierData';
import { filterResearchLedger, type LedgerEntry } from '../utils/wikiCompliance';

export const ResearchLedgerSection: React.FC = () => {
  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_RESEARCH_LEDGER);
  const [sourceFilter, setSourceFilter] = useState<'All' | 'Primary' | 'Secondary'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form state to add a new verified source (e.g. Regional Newspaper or France 24 timestamp)
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newFact, setNewFact] = useState<string>('');
  const [newSourceRef, setNewSourceRef] = useState<string>('');
  const [newSourceUrl, setNewSourceUrl] = useState<string>('');
  const [newSourceType, setNewSourceType] = useState<'Primary' | 'Secondary'>('Secondary');
  const [formError, setFormError] = useState<string>('');

  const filteredEntries = useMemo(
    () => filterResearchLedger(entries, sourceFilter, searchQuery),
    [entries, sourceFilter, searchQuery]
  );

  const primaryCount = useMemo(
    () => entries.filter((e) => e.sourceType === 'Primary').length,
    [entries]
  );
  const secondaryCount = useMemo(
    () => entries.filter((e) => e.sourceType === 'Secondary').length,
    [entries]
  );

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !newFact.trim() || !newSourceRef.trim()) {
      setFormError('Category, Verified Fact, and Source Reference are required fields.');
      return;
    }
    setFormError('');

    const created: LedgerEntry = {
      id: `LEDGER-${String(entries.length + 1).padStart(2, '0')}`,
      category: newCategory.trim(),
      verifiedFact: newFact.trim(),
      sourceReference: newSourceRef.trim(),
      sourceUrl: newSourceUrl.trim() || 'https://www.nisargsrishti.org/',
      sourceType: newSourceType,
      wpPolicy:
        newSourceType === 'Secondary'
          ? 'WP:RS & WP:NORG (Secondary Coverage)'
          : 'WP:PRIMARY (Administrative Record)',
      dateVerified: '01 Nov 2026',
    };

    setEntries((prev) => [created, ...prev]);
    setNewCategory('');
    setNewFact('');
    setNewSourceRef('');
    setNewSourceUrl('');
    setShowAddForm(false);
  };

  return (
    <section id="dossier" className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              03 · Part 3 Ground-Truth Dataset · Fact-Checked Knowledge Base
            </p>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-stone-900 mt-2">
              Verified Research Dossier &amp; Source Classification Ledger
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Every claim in the NSWF Wikipedia draft is mapped to an explicit Primary corporate
              filing (<code className="font-mono text-xs text-stone-800">WP:PRIMARY</code>) or
              independent Secondary publication (
              <code className="font-mono text-xs text-stone-800">WP:RS</code>) to satisfy{' '}
              <code className="font-mono text-xs text-stone-800">WP:NORG</code> review criteria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {showAddForm ? 'Cancel New Record' : 'Add Verified Source Record'}
            </button>
          </div>
        </div>

        {/* Add New Source Record Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddEntry}
            className="mt-6 bg-white border border-stone-300 p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-sm font-semibold text-stone-900">
                Append Verified Citation to Research Ledger
              </h3>
              <span className="text-xs text-stone-500">
                e.g., France 24 Broadcast Timestamp or Regional Print Clipping (Sakal / Lokmat)
              </span>
            </div>

            {formError && (
              <p role="alert" className="text-xs text-red-700 font-medium">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="ledger-category-input"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Category
                </label>
                <input
                  id="ledger-category-input"
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Regional Print Coverage"
                  className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label
                  htmlFor="ledger-source-ref-input"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Source Reference &amp; Publication
                </label>
                <input
                  id="ledger-source-ref-input"
                  type="text"
                  value={newSourceRef}
                  onChange={(e) => setNewSourceRef(e.target.value)}
                  placeholder="e.g., The Indian Express Pune / France 24"
                  className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label
                  htmlFor="ledger-source-type-select"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Wikipedia Source Classification
                </label>
                <select
                  id="ledger-source-type-select"
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value as 'Primary' | 'Secondary')}
                  className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                >
                  <option value="Secondary">Secondary Source (WP:RS – Notability)</option>
                  <option value="Primary">Primary Source (WP:PRIMARY – Administrative)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ledger-fact-input"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Verified Fact / Empirical Data Point
                </label>
                <input
                  id="ledger-fact-input"
                  type="text"
                  value={newFact}
                  onChange={(e) => setNewFact(e.target.value)}
                  placeholder="Enter clinical, verifiable statement..."
                  className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900"
                />
              </div>
              <div>
                <label
                  htmlFor="ledger-url-input"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Verification URL (Optional)
                </label>
                <input
                  id="ledger-url-input"
                  type="url"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-stone-300 text-stone-900 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Save Verified Entry
              </button>
            </div>
          </form>
        )}

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter research ledger by source classification"
            className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg w-fit"
          >
            <button
              type="button"
              onClick={() => setSourceFilter('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                sourceFilter === 'All'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Records ({entries.length})
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('Primary')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                sourceFilter === 'Primary'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Primary Sources · WP:PRIMARY ({primaryCount})
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('Secondary')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                sourceFilter === 'Secondary'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Secondary Sources · WP:RS ({secondaryCount})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <label htmlFor="dossier-search-input" className="sr-only">
              Search verified research ledger
            </label>
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="dossier-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by CIN, IIT Bombay, GIPE, advisor..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* High-Density Data Table */}
        <div className="mt-4 bg-white border border-stone-200 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-[#F8F7F4] text-stone-600 font-semibold">
                <th className="py-3 px-4 w-48">Category</th>
                <th className="py-3 px-4">Verified Fact / Empirical Data Point</th>
                <th className="py-3 px-4 w-64">Source Type &amp; Reference</th>
                <th className="py-3 px-4 w-36 text-right">Verified Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-stone-500">
                    No verified ledger records match &ldquo;{searchQuery}&rdquo;.{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSourceFilter('All');
                      }}
                      className="text-stone-900 underline ml-1 cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-semibold text-stone-900">{item.category}</div>
                      <div className="font-mono text-[11px] text-stone-500 mt-0.5">{item.id}</div>
                    </td>
                    <td className="py-3.5 px-4 align-top leading-relaxed text-stone-800">
                      {item.verifiedFact}
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-900 hover:underline inline-flex items-center gap-1"
                      >
                        {item.sourceReference}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.sourceType} · {item.wpPolicy}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top text-right font-mono tabular-nums text-stone-600">
                      {item.dateVerified}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
