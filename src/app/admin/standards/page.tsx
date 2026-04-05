// src/app/admin/standards/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const standards = [
  {
    id: "4.13A",
    subject: "Science",
    grade: "4th Grade",
    category: "Organisms & Environments",
    description: "Explore plant structures and their functions, including how structures help plants survive in their environment.",
    keywords: ["plants", "structures", "functions", "adaptations"],
  },
];

const subjects = ["All", "Science", "Mathematics", "Language Arts", "Social Studies", "Theater Arts", "Electives"];

export default function StandardsPage() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = activeSubject === "All"
    ? standards
    : standards.filter(s => s.subject === activeSubject);

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
            style={{ textShadow: "0 0 20px #c9a84c66" }}>
            ✦ Standards Bank
          </h1>
          <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
            Define and tag academic standards to lessons and questions.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
          style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
          + New Standard
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2a1660] border border-[#c9a84c55] rounded-xl p-6 mb-6"
        >
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-[#f5e199] mb-4 tracking-wider">New Standard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Standard ID</label>
              <input type="text" placeholder="e.g. 4.13A"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Subject</label>
              <select className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]">
                {subjects.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Grade</label>
              <input type="text" placeholder="e.g. 4th Grade"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Category</label>
              <input type="text" placeholder="e.g. Organisms & Environments"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Description</label>
            <textarea placeholder="Standard description..."
              rows={3}
              className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c] resize-none" />
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
              Save Standard
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Subject filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => setActiveSubject(s)}
            className={`px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider transition-all cursor-pointer ${
              activeSubject === s
                ? "text-[#1a0d45]"
                : "border border-[#c9a84c33] text-[#c9a84c99] hover:border-[#c9a84c] hover:text-[#f5e199] bg-transparent"
            }`}
            style={activeSubject === s ? { background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" } : {}}>
            {s}
          </button>
        ))}
      </div>

      {/* Standards list */}
      <div className="space-y-4">
        {filtered.map((std, i) => (
          <motion.div
            key={std.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl p-6 hover:border-[#c9a84c] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#f5e199]">{std.id}</span>
                <span className="font-[family-name:var(--font-cinzel)] text-xs border border-[#c9a84c33] text-[#c9a84c99] px-3 py-0.5 rounded-full">{std.subject}</span>
                <span className="font-[family-name:var(--font-cinzel)] text-xs border border-[#c9a84c33] text-[#c9a84c99] px-3 py-0.5 rounded-full">{std.grade}</span>
              </div>
              <button className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] hover:text-[#f5e199] transition-colors cursor-pointer">Edit</button>
            </div>
            <p className="text-xs text-[#c9a84c] font-[family-name:var(--font-cinzel)] tracking-wider mb-2">{std.category}</p>
            <p className="font-[family-name:var(--font-crimson)] text-sm text-[#f5e199cc] leading-relaxed mb-3">{std.description}</p>
            <div className="flex gap-2 flex-wrap">
              {std.keywords.map(k => (
                <span key={k} className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c77] border border-[#c9a84c22] px-2 py-0.5 rounded-full">#{k}</span>
              ))}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#c9a84c55] font-[family-name:var(--font-cinzel)] text-sm tracking-wider">
            No standards found. Add one above.
          </div>
        )}
      </div>
    </div>
  );
}