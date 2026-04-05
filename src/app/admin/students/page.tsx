// src/app/admin/students/page.tsx
"use client";

import { motion } from "framer-motion";

const students = [
  {
    name: "Kyliana",
    initial: "K",
    grade: "4th Grade",
    subjects: [
      { name: "Science", unit: "Life Science — Plants", lessons: 10, completed: 0 },
      { name: "Mathematics", unit: "—", lessons: 0, completed: 0 },
      { name: "Language Arts", unit: "—", lessons: 0, completed: 0 },
      { name: "Social Studies", unit: "—", lessons: 0, completed: 0 },
      { name: "Theater Arts", unit: "—", lessons: 0, completed: 0 },
      { name: "Electives", unit: "—", lessons: 0, completed: 0 },
    ],
  },
  {
    name: "Jameson",
    initial: "J",
    grade: "1st Grade",
    subjects: [
      { name: "Science", unit: "—", lessons: 0, completed: 0 },
      { name: "Mathematics", unit: "—", lessons: 0, completed: 0 },
      { name: "Language Arts", unit: "—", lessons: 0, completed: 0 },
      { name: "Social Studies", unit: "—", lessons: 0, completed: 0 },
      { name: "Theater Arts", unit: "—", lessons: 0, completed: 0 },
      { name: "Electives", unit: "—", lessons: 0, completed: 0 },
    ],
  },
];

export default function StudentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
          style={{ textShadow: "0 0 20px #c9a84c66" }}>
          ✦ Scholars
        </h1>
        <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
          Manage your students, subjects, and progress.
        </p>
      </div>

      <div className="space-y-8">
        {students.map((student, i) => (
          <motion.div
            key={student.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl overflow-hidden"
          >
            {/* Student header */}
            <div className="flex items-center gap-4 p-6 border-b border-[#c9a84c22]">
              <div className="w-14 h-14 rounded-full border-2 border-[#c9a84c] bg-[#1a0d45] flex items-center justify-center font-[family-name:var(--font-cinzel)] font-bold text-xl text-[#f5e199]">
                {student.initial}
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-[#f5e199]">{student.name}</h2>
                <p className="text-[#c9a84c99] text-xs font-[family-name:var(--font-cinzel)] tracking-wider">{student.grade}</p>
              </div>
            </div>

            {/* Subjects table */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#c9a84c22]">
                    <th className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#c9a84c] text-left pb-3 uppercase">Subject</th>
                    <th className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#c9a84c] text-left pb-3 uppercase">Current Unit</th>
                    <th className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#c9a84c] text-left pb-3 uppercase">Progress</th>
                    <th className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#c9a84c] text-left pb-3 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {student.subjects.map((subject, j) => {
                    const pct = subject.lessons > 0
                      ? Math.round((subject.completed / subject.lessons) * 100)
                      : 0;
                    return (
                      <tr key={subject.name} className="border-b border-[#c9a84c11] last:border-0">
                        <td className="py-3 font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199]">{subject.name}</td>
                        <td className="py-3 text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)]">{subject.unit}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-[#1a0d45] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${pct}%`,
                                  background: "linear-gradient(90deg, #b8922a, #f5e199)",
                                }}
                              />
                            </div>
                            <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c]">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <button className="px-4 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-wider border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent">
                            Assign Lesson
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}