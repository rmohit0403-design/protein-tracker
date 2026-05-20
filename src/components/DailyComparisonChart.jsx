import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
Legend,
} from "recharts";

export default function DailyComparisonChart({
allEntries,
}) {
const today = new Date().toDateString();

let mohitProtein = 0;
let rajatProtein = 0;

allEntries.forEach((item) => {
const itemDate = new Date(
item.date
).toDateString();


if (itemDate === today) {
  if (item.user === "Mohit") {
    mohitProtein += item.protein;
  }

  if (item.user === "Rajat") {
    rajatProtein += item.protein;
  }
}


});

const data = [
{
name: "Mohit",
protein: mohitProtein,
},
{
name: "Rajat",
protein: rajatProtein,
},
];

return ( <div className="bg-slate-800 p-6 rounded-3xl shadow-lg h-[400px]"> <h2 className="text-2xl font-bold mb-6">
Daily Protein Comparison </h2>

```
  <ResponsiveContainer width="100%" height="85%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="protein"
        fill="#3B82F6"
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>


);
}
