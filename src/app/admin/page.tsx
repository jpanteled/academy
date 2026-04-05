// src/app/admin/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "Students", value: "2", icon: "🎓", href: "/admin/students" },
  { label: "Lessons", value: "0", icon: "📜", href: "/admin/lessons" },
  { label: "Units", value: "0", icon: "📚", href: "/admin/units" },
  { label: "Standards", value: "0", icon: "⚜️", href: "/admin/standards" },
];

const students = [
  { name: "Kyliana", initial: "K", subject: "Science", unit: "Life Science — Plants", progress: 0 },
  { name: "Jameson", initial: "J", subject: "—", unit: "No lessons assigned", progress: 0 },
];

const quickLinks = [
  { label: "Create New Lesson", href: "/admin/lessons", icon: "📜" },
  { label: "Build a Unit", href: "/admin/units", icon: "📚" },
  { label: "Manage Standards", href: "/admin/standards", icon: "⚜️" },
  { label: "Question Bank", href: "/admin/questions", icon: "❓" },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-2"
          style={{ textShadow: "0 0 20px #c9a84c66" }}>
          ✦ Command Center
        </h1>
        <p className="text-[#c9a84c99] font-[family-name:var(--font-crimson)] text-sm tracking-wider">
          Welcome back, Magister. Here's your academy at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={s.href}>
              <div className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl p-5 hover:border-[#c9a84c] transition-all cursor-pointer">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <p className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-[#f5e199] mb-1">{s.value}</p>
                <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#c9a84c99] uppercase">{s.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Students */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c33]" />
          <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c]">✦ Scholars ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c33]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {students.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl p-5 hover:border-[#c9a84c] transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] bg-[#1a0d45] flex items-center justify-center font-[family-name:var(--font-cinzel)] font-bold text-lg text-[#f5e199]">
                  {s.initial}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#f5e199] text-base">{s.name}</h3>
                  <p className="text-[#c9a84c99] text-xs">{s.subject} · {s.unit}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c99]">Progress</span>
                  <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c]">{s.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#1a0d45] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.progress}%`,
                      background: "linear-gradient(90deg, #b8922a, #f5e199)",
                    }}
                  />
                </div>
              </div>
              <Link href={`/admin/students`}>
                <button className="mt-3 w-full py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent">
                  View Profile
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c33]" />
          <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c]">✦ Quick Actions ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c33]" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <Link href={l.href}>
                <div className="bg-[#2a1660] border border-[#c9a84c33] rounded-xl p-4 text-center hover:border-[#c9a84c] hover:bg-[#331870] transition-all cursor-pointer">
                  <span className="text-2xl mb-2 block">{l.icon}</span>
                  <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-wider text-[#f5e199]">{l.label}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}