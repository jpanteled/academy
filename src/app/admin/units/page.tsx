// src/app/admin/units/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const units = [
  {
    id: 1,
    title: "Life Science — Plants",
    subject: "Science",
    grade: "4th Grade",
    student: "Kyliana",
    teks: "4.13A",
    lessons: [
      { id: 1, title: "What Makes a Plant a Plant?", status: "draft" },
      { id: 2, title: "External Plant Structures", status: "draft" },
      { id: 3, title: "What Do Plant Structures Do?", status: "draft" },
      { id: 4, title: "Internal Plant Structures", status: "draft" },
      { id: 5, title: "Photosynthesis", status: "draft" },
      { id: 6, title: "Chlorophyll & Color", status: "draft" },
      { id: 7, title: "Plant Adaptations", status: "draft" },
      { id: 8, title: "Plant Habitats", status: "draft" },
      { id: 9, title: "Plants & Their Environment", status: "draft" },
      { id: 10, title: "Unit Review & Assessment", status: "draft" },
    ],
  },
];

const statusColors: Record<string, string> = {
  draft: "text-[#c9a84c99] border-[#c9a84c33]",
  published: "text-[#4caf7d] border-[#4caf7d55]",
  assigned: "text-[#f5e199] border-[#f5e19955]",
};

export default function UnitsPage() {
  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
            style={{ textShadow: "0 0 20px #c9a84c66" }}>
            ✦ Units
          </h1>
          <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
            Organize lessons into units and assign them to students.
          </p>
        </div>
        <button className="px-6 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
          style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
          + New Unit
        </button>
      </div>

      <div className="space-y-6">
        {units.map((unit, i) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl overflow-hidden"
          >
            {/* Unit header */}
            <div className="p-6 border-b border-[#c9a84c22] flex items-start justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#f5e199] mb-1">{unit.title}</h2>
                <div className="flex gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] border border-[#c9a84c33] px-3 py-1 rounded-full">{unit.subject}</span>
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] border border-[#c9a84c33] px-3 py-1 rounded-full">{unit.grade}</span>
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] border border-[#c9a84c33] px-3 py-1 rounded-full">{unit.student}</span>
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] border border-[#c9a84c33] px-3 py-1 rounded-full">TEKS {unit.teks}</span>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent whitespace-nowrap">
                Assign to Student
              </button>
            </div>

            {/* Lessons list */}
            <div className="p-6">
              <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
                Lessons ({unit.lessons.length})
              </p>
              <div className="space-y-2">
                {unit.lessons.map((lesson, j) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-[#1a0d45] border border-[#c9a84c22] hover:border-[#c9a84c44] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c55] w-5">{j + 1}.</span>
                      <span className="font-[family-name:var(--font-crimson)] text-sm text-[#f5e199]">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-[family-name:var(--font-cinzel)] text-xs border px-3 py-0.5 rounded-full ${statusColors[lesson.status]}`}>
                        {lesson.status}
                      </span>
                      <button className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99] hover:text-[#f5e199] transition-colors cursor-pointer">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}