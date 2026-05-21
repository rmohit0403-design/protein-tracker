
export default function MotivationBar({
  name,
  protein,
}) {
  const goal = 100;

  const percentage = Math.min(
    (protein / goal) * 100,
    100
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 shadow-lg">

      {/* Top */}
      <div className="flex justify-between items-center mb-2">

        <h2 className="font-semibold text-sm md:text-base">
          {name}
        </h2>

        <p className="text-sm text-slate-300">
          {protein}g
        </p>

      </div>

      {/* Mini Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full transition-all duration-500 ${
            protein >= goal
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {/* Bottom */}
      <p className="text-[11px] text-slate-400 mt-2">

        {protein >= goal
          ? "🔥 Goal reached"
          : `${goal - protein}g left`}

      </p>

    </div>
  );
}

