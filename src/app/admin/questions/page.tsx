// src/app/admin/questions/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const questions = [
  // Multiple Choice — Roots
  {
    id: 1,
    question: "What is the main function of a plant's roots?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["To absorb water and nutrients", "To make food for the plant", "To attract pollinators", "To release oxygen"],
    answer: "To absorb water and nutrients",
  },
  {
    id: 2,
    question: "Which type of root system has one main large root that grows deep into the soil?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Fibrous root system", "Taproot system", "Aerial root system", "Prop root system"],
    answer: "Taproot system",
  },
  {
    id: 3,
    question: "A cactus has very deep roots that spread wide. This adaptation helps the plant to —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Collect as much rainwater as possible", "Store food for winter", "Attract insects for pollination", "Grow taller than other plants"],
    answer: "Collect as much rainwater as possible",
  },

  // Multiple Choice — Stems
  {
    id: 4,
    question: "What is the main job of a plant's stem?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["To produce seeds", "To transport water and nutrients through the plant", "To absorb sunlight", "To attract pollinators"],
    answer: "To transport water and nutrients through the plant",
  },
  {
    id: 5,
    question: "Which plant structure carries water from the roots up to the leaves?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Phloem", "Chlorophyll", "Xylem", "Stomata"],
    answer: "Xylem",
  },
  {
    id: 6,
    question: "A cactus stores water in its thick stem. This is an example of —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Photosynthesis", "A plant adaptation", "Pollination", "Germination"],
    answer: "A plant adaptation",
  },

  // Multiple Choice — Leaves
  {
    id: 7,
    question: "What is the primary function of a plant's leaves?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["To absorb water from the soil", "To produce food through photosynthesis", "To anchor the plant in the ground", "To carry seeds to new locations"],
    answer: "To produce food through photosynthesis",
  },
  {
    id: 8,
    question: "Tiny openings on the underside of leaves that allow gases to pass in and out are called —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Xylem", "Phloem", "Stomata", "Chloroplasts"],
    answer: "Stomata",
  },
  {
    id: 9,
    question: "A plant in a dry desert has waxy leaves. What is the purpose of this adaptation?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["To absorb more sunlight", "To reduce water loss", "To attract more insects", "To grow faster"],
    answer: "To reduce water loss",
  },

  // Multiple Choice — Photosynthesis & Chlorophyll
  {
    id: 10,
    question: "Plants make their own food through a process called —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Respiration", "Photosynthesis", "Germination", "Pollination"],
    answer: "Photosynthesis",
  },
  {
    id: 11,
    question: "Which three things does a plant need to perform photosynthesis?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Soil, wind, and water", "Sunlight, water, and carbon dioxide", "Oxygen, sugar, and sunlight", "Nutrients, oxygen, and carbon dioxide"],
    answer: "Sunlight, water, and carbon dioxide",
  },
  {
    id: 12,
    question: "What gas do plants release as a result of photosynthesis?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    answer: "Oxygen",
  },
  {
    id: 13,
    question: "What gives plants their green color?",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Xylem", "Chlorophyll", "Phloem", "Stomata"],
    answer: "Chlorophyll",
  },

  // Multiple Choice — Adaptations
  {
    id: 14,
    question: "A Venus flytrap catches and digests insects. This adaptation most likely helps the plant —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Attract pollinators", "Get nutrients that the soil cannot provide", "Store extra water", "Grow in cold climates"],
    answer: "Get nutrients that the soil cannot provide",
  },
  {
    id: 15,
    question: "Rose bushes have sharp thorns. These thorns most likely help the plant by —",
    type: "multiple-choice",
    standard: "4.13A",
    subject: "Science",
    options: ["Helping the plant absorb more water", "Protecting it from animals that might eat it", "Allowing it to climb toward sunlight", "Helping it reproduce"],
    answer: "Protecting it from animals that might eat it",
  },

  // True / False
  {
    id: 16,
    question: "Chlorophyll gives plants their green color.",
    type: "true-false",
    standard: "4.13A",
    subject: "Science",
    options: ["True", "False"],
    answer: "True",
  },
  {
    id: 17,
    question: "Roots absorb sunlight to help the plant make food.",
    type: "true-false",
    standard: "4.13A",
    subject: "Science",
    options: ["True", "False"],
    answer: "False",
  },
  {
    id: 18,
    question: "Phloem carries food made in the leaves to the rest of the plant.",
    type: "true-false",
    standard: "4.13A",
    subject: "Science",
    options: ["True", "False"],
    answer: "True",
  },
  {
    id: 19,
    question: "All plants have the same structures and adaptations regardless of where they live.",
    type: "true-false",
    standard: "4.13A",
    subject: "Science",
    options: ["True", "False"],
    answer: "False",
  },
  {
    id: 20,
    question: "Plants produce oxygen during photosynthesis.",
    type: "true-false",
    standard: "4.13A",
    subject: "Science",
    options: ["True", "False"],
    answer: "True",
  },

  // Short Answer
  {
    id: 21,
    question: "Explain how the structure of a leaf helps a plant survive.",
    type: "short-answer",
    standard: "4.13A",
    subject: "Science",
    options: [],
    answer: "Leaves are flat and wide to absorb sunlight. They contain chlorophyll to make food through photosynthesis. Stomata on the underside allow gases to enter and exit the leaf.",
  },
  {
    id: 22,
    question: "Describe one plant adaptation and explain how it helps the plant survive in its environment.",
    type: "short-answer",
    standard: "4.13A",
    subject: "Science",
    options: [],
    answer: "Answers will vary. Example: A cactus has a thick waxy stem that stores water, which helps it survive in dry desert environments where water is scarce.",
  },
  {
    id: 23,
    question: "In your own words, explain what photosynthesis is and why it is important to plants.",
    type: "short-answer",
    standard: "4.13A",
    subject: "Science",
    options: [],
    answer: "Photosynthesis is the process plants use to make their own food. Plants use sunlight, water, and carbon dioxide to produce sugar (food) and release oxygen. It is important because it is how plants get the energy they need to grow and survive.",
  },
  {
    id: 24,
    question: "Compare the function of xylem and phloem in a plant.",
    type: "short-answer",
    standard: "4.13A",
    subject: "Science",
    options: [],
    answer: "Xylem carries water and minerals from the roots up to the leaves. Phloem carries the food (sugar) made in the leaves down to the rest of the plant.",
  },
];

const types = ["All", "multiple-choice", "true-false", "short-answer"];
const subjects = ["All", "Science", "Mathematics", "Language Arts", "Social Studies", "Theater Arts", "Electives"];

const typeLabel: Record<string, string> = {
  "multiple-choice": "Multiple Choice",
  "true-false": "True / False",
  "short-answer": "Short Answer",
};

const typeColor: Record<string, string> = {
  "multiple-choice": "text-[#c9a84c] border-[#c9a84c55]",
  "true-false": "text-[#4caf7d] border-[#4caf7d55]",
  "short-answer": "text-[#7d9fc9] border-[#7d9fc955]",
};

export default function QuestionsPage() {
  const [activeType, setActiveType] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [questionType, setQuestionType] = useState("multiple-choice");

  const filtered = questions.filter(q => {
    const typeMatch = activeType === "All" || q.type === activeType;
    const subjectMatch = activeSubject === "All" || q.subject === activeSubject;
    return typeMatch && subjectMatch;
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
            style={{ textShadow: "0 0 20px #c9a84c66" }}>
            ✦ Question Bank
          </h1>
          <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
            Build and manage questions tied to standards.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
          style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
          + New Question
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2a1660] border border-[#c9a84c55] rounded-xl p-6 mb-6"
        >
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-[#f5e199] mb-4 tracking-wider">New Question</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Question Type</label>
              <select
                value={questionType}
                onChange={e => setQuestionType(e.target.value)}
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]">
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True / False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Subject</label>
              <select className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]">
                {subjects.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Standard</label>
              <input type="text" placeholder="e.g. 4.13A"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Question</label>
            <textarea placeholder="Enter your question..."
              rows={2}
              className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c] resize-none" />
          </div>
          {questionType === "multiple-choice" && (
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["A", "B", "C", "D"].map(letter => (
                <div key={letter}>
                  <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Option {letter}</label>
                  <input type="text" placeholder={`Option ${letter}`}
                    className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Correct Answer</label>
            <input type="text" placeholder="Enter correct answer..."
              className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
              Save Question
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider transition-all cursor-pointer ${
                activeType === t
                  ? "text-[#1a0d45]"
                  : "border border-[#c9a84c33] text-[#c9a84c99] hover:border-[#c9a84c] hover:text-[#f5e199] bg-transparent"
              }`}
              style={activeType === t ? { background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" } : {}}>
              {t === "All" ? "All Types" : typeLabel[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filtered.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl p-6 hover:border-[#c9a84c] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`font-[family-name:var(--font-cinzel)] text-xs border px-3 py-0.5 rounded-full ${typeColor[q.type]}`}>
                  {typeLabel[q.type]}
                </span>
                <span className="font-[family-name:var(--font-cinzel)] text-xs border border-[#c9a84c33] text-[#c9a84c99] px-3 py-0.5 rounded-full">{q.subject}</span>
                <span className="font-[family-name:var(--font-cinzel)] text-xs border border-[#c9a84c33] text-[#c9a84c99] px-3 py-0.5 rounded-full">TEKS {q.standard}</span>
              </div>
              <button className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] hover:text-[#f5e199] transition-colors cursor-pointer">Edit</button>
            </div>
            <p className="font-[family-name:var(--font-crimson)] text-base text-[#f5e199] mb-4">{q.question}</p>
            {q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {q.options.map(opt => (
                  <div
                    key={opt}
                    className={`px-4 py-2 rounded-lg text-sm font-[family-name:var(--font-crimson)] border ${
                      opt === q.answer
                        ? "border-[#4caf7d55] text-[#4caf7d] bg-[#4caf7d11]"
                        : "border-[#c9a84c22] text-[#f5e199cc]"
                    }`}>
                    {opt === q.answer && <span className="mr-2">✓</span>}{opt}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#c9a84c55] font-[family-name:var(--font-cinzel)] text-sm tracking-wider">
            No questions found. Add one above.
          </div>
        )}
      </div>
    </div>
  );
}