// src/app/page.tsx
"use client";

import { motion } from "framer-motion";

const subjects = [
  { icon: "/images/kyliescience.png", name: "Science", desc: "Life, Earth & Physical", slug: "science" },
  { icon: "/images/kyliemath.png", name: "Mathematics", desc: "Numbers & Algebra", slug: "math" },
  { icon: "/images/kylieELAR.png", name: "Language Arts", desc: "Reading & Writing", slug: "language" },
  { icon: "/images/kyliehistory.png", name: "Social Studies", desc: "History & Geography", slug: "social" },
  { icon: "/images/kylietheater.png", name: "Theater Arts", desc: "Performance & Production", slug: "theater" },
  { icon: "/images/kylieelectives.png", name: "Electives", desc: "Art, Music & More", slug: "electives" },
];

const students = [
  { initial: "K", name: "Kyliana", lessons: "3 lessons assigned" },
  { initial: "J", name: "Jameson", lessons: "2 lessons assigned" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0d45] text-[#f5e199] font-[family-name:var(--font-crimson)] overflow-hidden relative">

      {/* Stars */}
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#f5e199] opacity-50"
          style={{
            width: i % 3 === 0 ? "5px" : "3px",
            height: i % 3 === 0 ? "5px" : "3px",
            top: `${(i * 7 + 4) % 95}%`,
            left: `${(i * 13 + 3) % 95}%`,
          }}
        />
      ))}

      {/* Scale texture */}
      <div
        className="absolute top-0 right-0 w-32 h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 18px 10px at 50% 0%, #c9a84c 0%, transparent 100%)",
          backgroundSize: "36px 20px",
        }}
      />

      {/* Top gold bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent" />

      {/* Hero */}
      <section className="text-center px-6 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Crest */}
          <img
            src="/images/crest.png"
            alt="Dracos Academy Crest"
            width={180}
            height={190}
            className="mx-auto mb-6 drop-shadow-[0_0_20px_#c9a84c88]"
          />

          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl font-bold tracking-widest mb-2"
            style={{ textShadow: "0 0 30px #c9a84caa" }}>
            ✦ DRACOS ACADEMY ✦
          </h1>
          <p className="text-[#c9a84c] tracking-[0.15em] uppercase text-sm mb-6 font-[family-name:var(--font-cinzel)]">
            Unleash the Magic Within
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <div className="w-2 h-2 bg-[#c9a84c] rotate-45" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-sm tracking-widest text-[#1a0d45] cursor-pointer"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
              Enter the Academy
            </button>
            <button className="px-8 py-3 rounded-full font-[family-name:var(--font-cinzel)] text-sm tracking-widest border border-[#c9a84c] text-[#f5e199] bg-transparent cursor-pointer">
              Admin Portal
            </button>
          </div>
        </motion.div>
      </section>

      {/* Scholars */}
      <section className="px-6 pb-8">
        <div className="flex items-center gap-4 justify-center mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c55]" />
          <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c]">✦ Scholars ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c55]" />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {students.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-[#2a1660] border border-[#c9a84c55] rounded-xl p-5 text-center cursor-pointer hover:border-[#c9a84c] transition-colors"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] bg-[#1a0d45] flex items-center justify-center mx-auto mb-3 font-[family-name:var(--font-cinzel)] font-bold text-lg text-[#f5e199]">
                {s.initial}
              </div>
              <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#f5e199] mb-1 text-base">{s.name}</h3>
              <p className="text-[#c9a84c99] text-sm">{s.lessons}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disciplines */}
      <section className="px-6 pb-10">
        <div className="flex items-center gap-4 justify-center mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c55]" />
          <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c]">✦ Disciplines ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c55]" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {subjects.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-[#2a1660] border border-[#c9a84c44] rounded-xl overflow-hidden cursor-pointer hover:border-[#c9a84c] hover:bg-[#331870] transition-all flex flex-col p-4"
            >
              <h3 className="font-[family-name:var(--font-cinzel)] text-[#f5e199] text-sm font-semibold mb-2 tracking-wide text-center">{s.name}</h3>
              <div className="h-24 w-full flex items-center justify-center mb-2">
                {s.icon.startsWith("/") ? (
                  <img src={s.icon} alt={s.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-5xl">{s.icon}</span>
                )}
              </div>
              <p className="text-[#c9a84c] text-sm leading-snug text-center mb-2">{s.desc}</p>
              <button className="mt-auto w-full py-2 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-xs tracking-widest text-[#1a0d45] cursor-pointer"
                style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}>
                Explore
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c33] to-transparent" />
      <footer className="text-center py-5 font-[family-name:var(--font-cinzel)] text-xs tracking-[0.15em] text-[#c9a84caa]">
        ✦ © 2026 Dracos Academy · Home of the Mythical Beasts ✦
      </footer>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent" />

    </main>
  );
}