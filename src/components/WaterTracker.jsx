import {
useState,
useEffect,
} from "react";

import {
doc,
setDoc,
getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function WaterTracker({
user,
}) {
const [water, setWater] =
useState(0);

useEffect(() => {
fetchWater();
}, []);

const fetchWater = async () => {
try {
const today =
new Date().toDateString();


  const docRef = doc(
    db,
    "water",
    `${user}-${today}`
  );

  const snapshot =
    await getDoc(docRef);

  if (snapshot.exists()) {
    setWater(
      snapshot.data().amount
    );
  }
} catch (error) {
  console.log(
    "❌ Fetch Water Error:",
    error
  );
}


};

const updateWater = async (
amount
) => {
try {
setWater(amount);


  const today =
    new Date().toDateString();

  await setDoc(
    doc(
      db,
      "water",
      `${user}-${today}`
    ),
    {
      user,
      amount,
      date:
        new Date().toISOString(),
    }
  );

  console.log(
    "✅ Water Saved"
  );
} catch (error) {
  console.log(
    "❌ Save Water Error:",
    error
  );
}


};

const options = [1, 2, 3, 4];

return ( <div className="mt-4">


  {/* Header */}
  <div className="flex items-center justify-between mb-2">

    <h3 className="text-xs font-medium text-slate-300">
      💧 Water Intake
    </h3>

    <p className="text-[11px] text-slate-400">
      {water}L / 4L
    </p>

  </div>

  {/* Buttons */}
  <div className="flex gap-2">

    {options.map((litre) => (
      <button
        key={litre}
        onClick={() =>
          updateWater(litre)
        }
        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
          water >= litre
            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
        }`}
      >
        {litre}L
      </button>
    ))}

  </div>

</div>


);
}
