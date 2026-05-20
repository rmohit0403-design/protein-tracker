import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

export default function ProteinPieChart({
  data,
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-3xl shadow-lg h-[450px]">
      <h2 className="text-2xl mb-6 font-bold">
        Food Protein Composition
      </h2>

      {data.length === 0 ? (
        <p className="text-slate-400">
          No data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="protein"
              nameKey="food"
              outerRadius={120}
              label={({ food }) => food}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}