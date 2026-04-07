import { useState } from 'react';

interface StateData {
  code: string;
  name: string;
  slug: string;
  entities?: {
    llc?: { fee: number; onlineFiling: boolean; formName: string };
    corporation?: { fee: number; onlineFiling: boolean; formName: string };
  };
  tax?: { clearanceRequired: boolean; taxAgency: string };
  timeline?: { standardProcessingDays: string; expeditedAvailable: boolean };
  requirements?: { publicationRequired: boolean };
}

interface Props {
  states: StateData[];
}

export default function StateComparisonTable({ states }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filteredStates = states.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  const toggleState = (code: string) => {
    if (selected.includes(code)) {
      setSelected(selected.filter(c => c !== code));
    } else if (selected.length < 5) {
      setSelected([...selected, code]);
    }
  };

  const comparedStates = states.filter(s => selected.includes(s.code));

  return (
    <div>
      {/* State Picker */}
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-slate-700">Select up to 5 states to compare:</p>
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filteredStates.slice(0, 20).map(s => (
            <button
              key={s.code}
              onClick={() => toggleState(s.code)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                selected.includes(s.code)
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.code} - {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {comparedStates.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-600">Feature</th>
                {comparedStates.map(s => (
                  <th key={s.code} className="px-4 py-3 text-center font-bold text-slate-900">
                    <a href={`/states/${s.slug}`} className="text-red-600 hover:underline">{s.name}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">LLC Dissolution Fee</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">${s.entities?.llc?.fee ?? '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Corp Dissolution Fee</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">${s.entities?.corporation?.fee ?? '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Online Filing</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">
                    {s.entities?.llc?.onlineFiling ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Tax Clearance Required</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">
                    {s.tax?.clearanceRequired ? (
                      <span className="text-amber-600">Yes</span>
                    ) : (
                      <span className="text-green-600">No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Processing Time</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">{s.timeline?.standardProcessingDays ?? '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Expedited Available</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">
                    {s.timeline?.expeditedAvailable ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">Publication Required</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center">
                    {s.requirements?.publicationRequired ? (
                      <span className="text-amber-600">Yes</span>
                    ) : (
                      <span className="text-green-600">No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-600">LLC Form</td>
                {comparedStates.map(s => (
                  <td key={s.code} className="px-4 py-3 text-center text-xs">{s.entities?.llc?.formName ?? '—'}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {comparedStates.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Select states above to compare dissolution requirements side by side.
        </div>
      )}
    </div>
  );
}
