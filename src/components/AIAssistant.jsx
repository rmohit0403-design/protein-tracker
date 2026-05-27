import { useState } from "react";

import { FaRobot } from "react-icons/fa";

export default function AIAssistant() {
const [open, setOpen] =
useState(false);

const [prompt, setPrompt] =
useState("");

const [loading, setLoading] =
useState(false);

const [result, setResult] =
useState("");

const analyzeFood = async () => {
if (!prompt) return;


setLoading(true);

try {
  console.log(
    "🚀 Sending request..."
  );

  const response =
    await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${
            import.meta.env
              .VITE_GROQ_API_KEY
          }`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",

              content:
                "You are a fitness nutrition AI.",
            },

            {
              role: "user",

              content: `
User ate:

${prompt}

Tell:

Estimated calories
Estimated protein
Small health suggestion

Keep answer short and aesthetic.
`,
},
],
}),
}
);


  console.log(
    "📡 Status:",
    response.status
  );

  const data =
    await response.json();

  console.log(
    "📦 FULL RESPONSE:",
    data
  );

  if (data.error) {
    setResult(
      data.error.message
    );

    setLoading(false);

    return;
  }

  const text =
    data?.choices?.[0]
      ?.message?.content;

  console.log(
    "🤖 RESULT:",
    text
  );

  setResult(
    text ||
      "No response found"
  );
} catch (error) {
  console.log(
    "❌ ERROR:",
    error
  );

  setResult(
    "Failed to analyze"
  );
}

setLoading(false);


};

return (
<>
{/* Floating Button */}
<button
onClick={() =>
setOpen(!open)
}
className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-2xl flex items-center justify-center text-2xl z-50"
> <FaRobot /> </button>


  {/* Popup */}
  {open && (
    <div className="fixed bottom-24 right-5 w-[350px] max-w-[90vw] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-5 z-50">

      <h2 className="text-2xl font-bold text-white mb-1">
        AI Nutrition Coach
      </h2>

      <p className="text-slate-400 text-sm mb-4">
        Ask what you ate 🍗
      </p>

      <textarea
        value={prompt}
        onChange={(e) =>
          setPrompt(
            e.target.value
          )
        }
        placeholder="Example: 4 eggs, chicken breast, rice, whey protein..."
        className="w-full h-32 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none resize-none"
      />

      <button
        onClick={analyzeFood}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-3 rounded-2xl font-semibold text-white"
      >
        {loading
          ? "Analyzing..."
          : "Calculate Protein"}
      </button>

      {result && (
        <div className="mt-5 bg-slate-800 p-4 rounded-2xl text-sm text-slate-200 whitespace-pre-wrap border border-slate-700">
          {result}
        </div>
      )}
    </div>
  )}
</>


);
}
