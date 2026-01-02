interface ProcessStep {
  number: number;
  label: string;
}

interface ProcessStepsProps {
  steps?: ProcessStep[];
}

export default function ProcessSteps({ 
  steps = [
    { number: 1, label: 'CYB' },
    { number: 2, label: 'DESIGN' },
    { number: 3, label: 'CUSTOMIZE' },
    { number: 4, label: 'SHIP DTC' }
  ]
}: ProcessStepsProps) {
  return (
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-12 text-center">
          WHAT WE DO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <p className="text-sm font-medium text-black dark:text-white mb-4">
                STEP {step.number}.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8 min-h-[200px] flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                <p className="text-xl font-bold text-black dark:text-white">
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

