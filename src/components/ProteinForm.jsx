
import { useState } from "react";
import { db } from "../firebase";

import { collection, addDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function ProteinForm({
  user,
  fetchData,
}) {
  const [food, setFood] = useState("");
  const [protein, setProtein] = useState("");

  const addEntry = async () => {
    if (!food || !protein) {
      toast.error("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "entries"), {
      user,
      food,
      protein: Number(protein),
      date: new Date().toISOString(),
    });

    setFood("");
    setProtein("");

    toast.success("Protein entry added!");

    fetchData();
  };

  return (
    <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
      <h2 className="text-2xl mb-4 font-bold">
        Add Food
      </h2>

      <input
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        className="w-full p-3 rounded-xl mb-4 bg-slate-700 outline-none"
      />

      <input
        placeholder="Protein (g)"
        type="number"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        className="w-full p-3 rounded-xl mb-4 bg-slate-700 outline-none"
      />

      <button
        onClick={addEntry}
        className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold"
      >
        Submit
      </button>
    </div>
  );
}

