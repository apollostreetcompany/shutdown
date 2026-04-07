import { useState } from 'react';

interface ChecklistItem {
  id: string;
  phase: string;
  text: string;
  required: boolean;
  stateSpecific?: string;
}

interface Props {
  stateName: string;
  stateCode: string;
  items: ChecklistItem[];
}

export default function ShutdownChecklist({ stateName, stateCode, items }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };

  const phases = [...new Set(items.map(i => i.phase))];
  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Shutdown Progress</span>
          <span className="text-slate-500">{checked.size}/{items.length} steps ({progress}%)</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-red-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Phases */}
      {phases.map(phase => {
        const phaseItems = items.filter(i => i.phase === phase);
        const phaseComplete = phaseItems.every(i => checked.has(i.id));

        return (
          <div key={phase} className="rounded-xl border border-slate-200 bg-white">
            <div className={`flex items-center justify-between border-b px-4 py-3 ${phaseComplete ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
              <h3 className="font-bold text-slate-900">{phase}</h3>
              {phaseComplete && (
                <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">Complete</span>
              )}
            </div>
            <div className="divide-y divide-slate-100 p-2">
              {phaseItems.map(item => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <div>
                    <span className={`text-sm ${checked.has(item.id) ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.text}
                    </span>
                    {item.stateSpecific && (
                      <p className="mt-0.5 text-xs text-blue-600">{item.stateSpecific}</p>
                    )}
                    {item.required && !checked.has(item.id) && (
                      <span className="mt-0.5 inline-block rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">Required</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {progress === 100 && (
        <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-green-800">Shutdown Complete!</h3>
          <p className="text-sm text-green-600">
            You've completed all steps to shut down your business in {stateName}.
            Make sure to keep all dissolution documents for at least 7 years.
          </p>
        </div>
      )}
    </div>
  );
}
