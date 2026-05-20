
import { useEffect, useState } from "react";

import DailyComparisonChart from "./DailyComparisonChart";

import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Login({ setUser }) {
  const [allEntries, setAllEntries] =
    useState([]);

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
  };

  const handleLogin = (name, pass) => {
    if (
      name === "Mohit" &&
      pass === "1234"
    ) {
      setUser("Mohit");
    } else if (
      name === "Rajat" &&
      pass === "5678"
    ) {
      setUser("Rajat");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Top Chart */}
      <div className="mb-8">
        <DailyComparisonChart
          allEntries={allEntries}
        />
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center">

        <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">

          <h1 className="text-4xl font-bold mb-2 text-center">
            Protein Tracker
          </h1>

          <p className="text-slate-400 text-center mb-8">
            Track daily protein intake
          </p>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-2xl mb-4 text-lg font-semibold"
            onClick={() =>
              handleLogin("Mohit", "1234")
            }
          >
            Login as Mohit
          </button>

          <button
            className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl text-lg font-semibold"
            onClick={() =>
              handleLogin("Rajat", "5678")
            }
          >
            Login as Rajat
          </button>
        </div>
      </div>
    </div>
  );
}

