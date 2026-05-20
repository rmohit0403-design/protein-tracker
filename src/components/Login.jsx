
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
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold">
            Protein Tracker
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Track daily protein intake
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Side */}
          <div className="bg-slate-900 rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-800">

            <DailyComparisonChart
              allEntries={allEntries}
            />

          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-3xl font-bold mb-2 text-center">
                Welcome Back
              </h2>

              <p className="text-slate-400 text-center mb-8">
                Choose your profile
              </p>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-4 rounded-2xl mb-4 text-lg font-semibold"
                onClick={() =>
                  handleLogin("Mohit", "1234")
                }
              >
                Continue as Mohit
              </button>

              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold"
                onClick={() =>
                  handleLogin("Rajat", "5678")
                }
              >
                Continue as Rajat
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

