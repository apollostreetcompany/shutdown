import { useState } from 'react';

interface StateData {
  code: string;
  name: string;
  slug: string;
  agency: string;
  website: string;
  phone: string;
  entities: {
    llc?: {
      formName: string;
      fee: number;
      onlineFiling: boolean;
      steps: string[];
    };
    corporation?: {
      formName: string;
      fee: number;
      onlineFiling: boolean;
      steps: string[];
    };
  };
  tax: {
    clearanceRequired: boolean;
    taxAgency: string;
    taxAgencyUrl: string;
    notes: string;
  };
  timeline: {
    standardProcessingDays: string;
    expeditedAvailable: boolean;
  };
  requirements: {
    publicationRequired: boolean;
    creditorNotification: string;
    employeeNotification: string;
  };
}

interface Props {
  states: Record<string, StateData>;
}

type Step = 'state' | 'entity' | 'details' | 'plan';

export default function ShutdownWizard({ states }: Props) {
  const [step, setStep] = useState<Step>('state');
  const [selectedState, setSelectedState] = useState<string>('');
  const [entityType, setEntityType] = useState<'llc' | 'corporation'>('llc');
  const [hasEmployees, setHasEmployees] = useState(false);
  const [hasDebts, setHasDebts] = useState(false);
  const [otherStates, setOtherStates] = useState<string[]>([]);

  const stateList = Object.values(states).sort((a, b) => a.name.localeCompare(b.name));
  const stateData = selectedState ? states[selectedState] : null;
  const entityData = stateData?.entities?.[entityType];

  const totalFee = entityData ? entityData.fee + otherStates.length * 100 : 0;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {(['state', 'entity', 'details', 'plan'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
              step === s ? 'bg-red-600 text-white' :
              (['state', 'entity', 'details', 'plan'].indexOf(step) > i) ? 'bg-green-500 text-white' :
              'bg-slate-200 text-slate-500'
            }`}>
              {['state', 'entity', 'details', 'plan'].indexOf(step) > i ? '✓' : i + 1}
            </div>
            {i < 3 && <div className="h-px w-8 bg-slate-200" />}
          </div>
        ))}
      </div>

      {/* Step 1: State */}
      {step === 'state' && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">Where is your business registered?</h2>
          <p className="mb-4 text-sm text-slate-500">Select your state of incorporation or formation.</p>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
          >
            <option value="">Select a state...</option>
            {stateList.map(s => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
          <button
            onClick={() => step === 'state' && selectedState && setStep('entity')}
            disabled={!selectedState}
            className="w-full rounded-lg bg-red-600 py-3 text-sm font-bold text-white disabled:bg-slate-300"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Entity Type */}
      {step === 'entity' && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">What type of business entity?</h2>
          <p className="mb-4 text-sm text-slate-500">The dissolution process differs by entity type.</p>
          <div className="mb-4 space-y-3">
            {(['llc', 'corporation'] as const).map(type => (
              <label
                key={type}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                  entityType === type ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="entity"
                  value={type}
                  checked={entityType === type}
                  onChange={() => setEntityType(type)}
                  className="text-red-600"
                />
                <div>
                  <div className="font-medium text-slate-900">{type === 'llc' ? 'LLC' : 'Corporation'}</div>
                  <div className="text-xs text-slate-500">
                    {type === 'llc' ? 'Limited Liability Company' : 'C-Corp or S-Corp'}
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('state')} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-medium">Back</button>
            <button onClick={() => setStep('details')} className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-bold text-white">Continue</button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 'details' && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">A few more details</h2>
          <p className="mb-4 text-sm text-slate-500">This helps us customize your shutdown plan.</p>
          <div className="mb-4 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={hasEmployees} onChange={e => setHasEmployees(e.target.checked)} className="rounded text-red-600" />
              <span className="text-sm text-slate-700">Business currently has employees</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={hasDebts} onChange={e => setHasDebts(e.target.checked)} className="rounded text-red-600" />
              <span className="text-sm text-slate-700">Business has outstanding debts or liabilities</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('entity')} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-medium">Back</button>
            <button onClick={() => setStep('plan')} className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-bold text-white">Generate Plan</button>
          </div>
        </div>
      )}

      {/* Step 4: Plan */}
      {step === 'plan' && stateData && entityData && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            Your {stateData.name} {entityType === 'llc' ? 'LLC' : 'Corporation'} Shutdown Plan
          </h2>

          {/* Summary Card */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-500">Form Required</div>
                <div className="font-bold text-slate-900">{entityData.formName}</div>
              </div>
              <div>
                <div className="text-slate-500">Filing Fee</div>
                <div className="font-bold text-slate-900">${entityData.fee}</div>
              </div>
              <div>
                <div className="text-slate-500">Tax Clearance</div>
                <div className={`font-bold ${stateData.tax.clearanceRequired ? 'text-amber-600' : 'text-green-600'}`}>
                  {stateData.tax.clearanceRequired ? 'Required' : 'Not Required'}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Processing Time</div>
                <div className="font-bold text-slate-900">{stateData.timeline.standardProcessingDays}</div>
              </div>
              <div>
                <div className="text-slate-500">Online Filing</div>
                <div className="font-bold text-slate-900">{entityData.onlineFiling ? 'Available' : 'Mail Only'}</div>
              </div>
              <div>
                <div className="text-slate-500">Filing Agency</div>
                <div className="font-bold text-slate-900">{stateData.agency}</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-6 space-y-3">
            <h3 className="font-bold text-slate-900">Your Steps:</h3>
            {entityData.steps.map((s, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">{i + 1}</span>
                <span className="text-sm text-slate-700">{s}</span>
              </div>
            ))}
            {stateData.tax.clearanceRequired && (
              <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">!</span>
                <span className="text-sm text-amber-800">Tax clearance required from {stateData.tax.taxAgency}. {stateData.tax.notes}</span>
              </div>
            )}
            {hasEmployees && (
              <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-700">i</span>
                <span className="text-sm text-blue-800">{stateData.requirements.employeeNotification}</span>
              </div>
            )}
            {hasDebts && (
              <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-700">i</span>
                <span className="text-sm text-blue-800">{stateData.requirements.creditorNotification}</span>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-sm font-bold text-slate-700">Contact</h3>
            <p className="text-sm text-slate-600">{stateData.agency}: {stateData.phone}</p>
            <a href={stateData.website} className="text-sm text-red-600 hover:underline" target="_blank" rel="noopener">{stateData.website}</a>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 p-6 text-center text-white">
            <h3 className="mb-2 font-bold">Want us to handle all of this?</h3>
            <p className="mb-4 text-sm text-red-100">Our Shutdown Agent handles every filing, deadline, and notification.</p>
            <a href="/shutdown-agent" className="inline-block rounded-lg bg-white px-6 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
              Shutdown Agent — $1,000
            </a>
          </div>

          <button onClick={() => { setStep('state'); setSelectedState(''); }} className="mt-4 w-full rounded-lg border border-slate-300 py-3 text-sm font-medium">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
