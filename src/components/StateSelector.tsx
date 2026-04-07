import { useState, useMemo } from 'react';

interface StateInfo {
  code: string;
  name: string;
  slug: string;
  agency: string;
  entities?: {
    llc?: { fee: number; onlineFiling: boolean };
    corporation?: { fee: number };
  };
  tax?: { clearanceRequired: boolean };
  timeline?: { standardProcessingDays: string };
}

interface Props {
  states: StateInfo[];
}

export default function StateSelector({ states }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'no-tax-clearance' | 'free'>('all');

  const filtered = useMemo(() => {
    let result = states;

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
      );
    }

    // Category filter
    switch (filter) {
      case 'online':
        result = result.filter(s => s.entities?.llc?.onlineFiling);
        break;
      case 'no-tax-clearance':
        result = result.filter(s => !s.tax?.clearanceRequired);
        break;
      case 'free':
        result = result.filter(s => (s.entities?.llc?.fee || 0) === 0);
        break;
    }

    return result;
  }, [states, search, filter]);

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All States' },
            { key: 'online', label: 'Online Filing' },
            { key: 'no-tax-clearance', label: 'No Tax Clearance' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                filter === f.key
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-slate-500">
        Showing {filtered.length} of {states.length} states
      </p>

      {/* State Grid */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(s => (
          <a
            key={s.code}
            href={`/states/${s.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-red-300 hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg font-bold text-slate-800 group-hover:text-red-600">
                {s.code}
              </span>
              <div className="flex gap-1">
                {s.tax?.clearanceRequired && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                    TAX
                  </span>
                )}
                {s.entities?.llc?.onlineFiling && (
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                    ONLINE
                  </span>
                )}
              </div>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">{s.name}</h3>
            <div className="flex gap-3 text-xs text-slate-500">
              <span>LLC: ${s.entities?.llc?.fee ?? '—'}</span>
              <span>Corp: ${s.entities?.corporation?.fee ?? '—'}</span>
            </div>
            {s.timeline?.standardProcessingDays && (
              <div className="mt-1 text-xs text-slate-400">
                {s.timeline.standardProcessingDays}
              </div>
            )}
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">No states match your search.</p>
          <button
            onClick={() => { setSearch(''); setFilter('all'); }}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
