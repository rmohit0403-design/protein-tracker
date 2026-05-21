
import { useEffect, useState } from "react";

import Calendar from "react-calendar";

import "../calendar.css";

import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function MonthlyCalendar({
  setShowCalendar,
}) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const snapshot = await getDocs(
      collection(db, "entries")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEntries(data);
  };

  const getProteinForDate = (date) => {
    const dateString =
      new Date(date).toDateString();

    return entries
      .filter(
        (item) =>
          new Date(
            item.date
          ).toDateString() === dateString
      )
      .reduce(
        (acc, item) => acc + item.protein,
        0
      );
  };

  // Monthly graph data
  const monthlyData = [];

  for (let i = 1; i <= 31; i++) {
    const currentDate = new Date();

    currentDate.setDate(i);

    const dateString =
      currentDate.toDateString();

    const mohitProtein = entries
      .filter(
        (item) =>
          item.user === "Mohit" &&
          new Date(
            item.date
          ).toDateString() === dateString
      )
      .reduce(
        (acc, item) => acc + item.protein,
        0
      );

    const rajatProtein = entries
      .filter(
        (item) =>
          item.user === "Rajat" &&
          new Date(
            item.date
          ).toDateString() === dateString
      )
      .reduce(
        (acc, item) => acc + item.protein,
        0
      );

    monthlyData.push({
      day: i,
      Mohit: mohitProtein,
      Rajat: rajatProtein,
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() =>
            setShowCalendar(false)
          }
          className="mb-8 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all duration-300 px-5 py-3 rounded-2xl"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl md:text-6xl font-bold">
            Monthly Analytics
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Track your monthly protein intake
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Calendar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Calendar
            </h2>

            <Calendar
              className="custom-calendar"
              tileContent={({ date }) => {
                const protein =
                  getProteinForDate(date);

                return protein > 0 ? (
                  <div className="text-[10px] md:text-xs text-center text-green-400 font-bold mt-1">
                    {protein}g
                  </div>
                ) : null;
              }}
            />
          </div>

          {/* Graph */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl h-[500px]">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Protein Graph
            </h2>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <BarChart data={monthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Mohit"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                />

                <Bar
                  dataKey="Rajat"
                  fill="#10B981"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>
    </div>
  );
}

