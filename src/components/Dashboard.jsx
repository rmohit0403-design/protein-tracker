
import { useEffect, useState } from "react";

import ProteinForm from "./ProteinForm";
import ProteinPieChart from "./ProteinPieChart";
// import DailyComparisonChart from "./DailyComparisonChart";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Dashboard({ user }) {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

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

    setAllEntries(data);

    const today = new Date().toDateString();

    const filteredData = data.filter((item) => {
      const itemDate = new Date(
        item.date
      ).toDateString();

      return (
        item.user === user &&
        itemDate === today
      );
    });

    setEntries(filteredData);
  };

  const deleteEntry = async (id) => {
    await deleteDoc(doc(db, "entries", id));

    fetchData();
  };

  const totalProtein = entries.reduce(
    (acc, item) => acc + item.protein,
    0
  );

  
return (
  <div className="min-h-screen bg-slate-900 text-white p-6">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        Welcome, {user}
      </h1>

      <p className="text-slate-400 mt-2">
        Daily Protein Tracker
      </p>
    </div>

    {/* Daily Comparison Chart */}
    {/* <div className="mb-8">
      <DailyComparisonChart
        allEntries={allEntries}
      />
    </div> */}

    {/* Main Grid */}
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Left Side */}
      <div>

        {/* Total Protein Card */}
        <div className="bg-slate-800 p-6 rounded-3xl shadow-lg mb-6">
          <h2 className="text-xl text-slate-300">
            Today's Protein
          </h2>

          <p className="text-6xl font-bold mt-4">
            {totalProtein}g
          </p>
        </div>

        {/* Form */}
        <ProteinForm
          user={user}
          fetchData={fetchData}
        />
      </div>

      {/* Right Side */}
      <div>
        <ProteinPieChart data={entries} />
      </div>
    </div>

    {/* Food History */}
    <div className="bg-slate-800 p-6 rounded-3xl mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Today's Food History
      </h2>

      <div className="space-y-4">
        {entries.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-slate-700 p-4 rounded-2xl"
          >
            <div>
              <p className="font-semibold text-lg">
                {item.food}
              </p>

              <p className="text-slate-300 text-sm">
                {new Date(
                  item.date
                ).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-400">
                {item.protein}g
              </div>

              <button
                onClick={() =>
                  deleteEntry(item.id)
                }
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <p className="text-slate-400">
            No entries added today.
          </p>
        )}
      </div>
    </div>
  </div>
);

}