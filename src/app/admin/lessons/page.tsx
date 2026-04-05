// src/app/admin/lessons/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const lessons = [
  { id: 1, title: "What Makes a Plant a Plant?", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 2, title: "External Plant Structures", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 3, title: "What Do Plant Structures Do?", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 4, title: "Internal Plant Structures", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 5, title: "Photosynthesis", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 6, title: "Chlorophyll & Color", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 7, title: "Plant Adaptations", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 8, title: "Plant Habitats", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 9, title: "Plants & Their Environment", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
  { id: 10, title: "Unit Review & Assessment", subject: "Science", unit: "Life Science — Plants", student: "Kyliana", teks: "4.13A", status: "draft" },
];

const statusColors: Record<string, string> = {
  draft: "text-[#c9a84c99] border-[#c9a84c33]",
  published: "text-[#4caf7d] border-[#4caf7d55]",
  assigned: "text-[#f5e199] border-[#f5e19955]",
};

const students = ["All", "Kyliana", "Jameson"];
const subjects = ["All", "Science", "Mathematics", "Language Arts", "Social Studies", "Theater Arts", "Electives"];
const statuses = ["All", "draft", "published", "assigned"];

export default function LessonsPage() {
  const [activeStudent, setActiveStudent] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = lessons.filter(l => {
    const studentMatch = activeStudent === "All" || l.student === activeStudent;
    const subjectMatch = activeSubject === "All" || l.subject === activeSubject;
    const statusMatch = activeStatus === "All" || l.status === activeStatus;
    return studentMatch && subjectMatch && statusMatch;
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
            style={{ textShadow: "0 0 20px #c9a84c66" }}>
            ✦ Lessons
          </h1>
          <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
            Create, manage, and assign lessons to your scholars.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
          style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
          + New Lesson
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2a1660] border border-[#c9a84c55] rounded-xl p-6 mb-6"
        >
          <h2 className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-[#f5e199] mb-4 tracking-wider">New Lesson</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Lesson Title</label>
              <input type="text" placeholder="e.g. What Makes a Plant a Plant?"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Subject</label>
              <select className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]">
                {subjects.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Assign To</label>
              <select className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]">
                {students.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Unit</label>
              <input type="text" placeholder="e.g. Life Science — Plants"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">TEKS Standard</label>
              <input type="text" placeholder="e.g. 4.13A"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
            <div>
              <label className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] tracking-wider block mb-2">Lesson URL</label>
              <input type="text" placeholder="e.g. /lessons/what-makes-a-plant"
                className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-lg px-4 py-2.5 text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] focus:outline-none focus:border-[#c9a84c]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
              Save Lesson
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
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c55] tracking-wider">Student:</span>
          {students.map(s => (
            <button
              key={s}
              onClick={() => setActiveStudent(s)}
              className={`px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider transition-all cursor-pointer ${
                activeStudent === s
                  ? "text-[#1a0d45]"
                  : "border border-[#c9a84c33] text-[#c9a84c99] hover:border-[#c9a84c] hover:text-[#f5e199] bg-transparent"
              }`}
              style={activeStudent === s ? { background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" } : {}}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c55] tracking-wider">Status:</span>
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider transition-all cursor-pointer ${
                activeStatus === s
                  ? "text-[#1a0d45]"
                  : "border border-[#c9a84c33] text-[#c9a84c99] hover:border-[#c9a84c] hover:text-[#f5e199] bg-transparent"
              }`}
              style={activeStatus === s ? { background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" } : {}}>
              {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {filtered.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl px-6 py-4 hover:border-[#c9a84c] transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c55] w-6 shrink-0">{lesson.id}.</span>
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-crimson)] text-base text-[#f5e199] truncate">{lesson.title}</p>
                <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] mt-0.5">{lesson.unit} · {lesson.student} · TEKS {lesson.teks}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`font-[family-name:var(--font-cinzel)] text-xs border px-3 py-0.5 rounded-full ${statusColors[lesson.status]}`}>
                {lesson.status}
              </span>
              <button className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] hover:text-[#f5e199] transition-colors cursor-pointer">
                Edit
              </button>
              <button className="px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent">
                Assign
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#c9a84c55] font-[family-name:var(--font-cinzel)] text-sm tracking-wider">
            No lessons found.
          </div>
        )}
      </div>
    </div>
  );
}