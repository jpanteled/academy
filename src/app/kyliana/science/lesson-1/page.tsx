// src/app/kyliana/science/lesson-1/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLessonProgress } from "@/lib/progress";

// ── Types ──────────────────────────────────────────────────────
type AxoMood = "neutral" | "excited" | "thinking" | "surprised" | "proud" | "encouraging";

// ── Axo Character ──────────────────────────────────────────────
function Axo({ mood, message }: { mood: AxoMood; message: string }) {
  const imgMap: Record<AxoMood, string> = {
    neutral:      "/images/axo-neutral.png",
    excited:      "/images/axo-excited.png",
    thinking:     "/images/axo-thinking.png",
    surprised:    "/images/axo-surprised.png",
    proud:        "/images/axo-proud.png",
    encouraging:  "/images/axo-encouraging.png",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 bg-[#2a1660] border border-[#c9a84c44] rounded-2xl p-5 mb-6"
    >
      <motion.img
        key={mood}
        src={imgMap[mood]}
        alt="Axo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-24 h-24 object-contain flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/kyliescience.png";
        }}
      />
      <div className="flex-1">
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] text-[#c9a84c] uppercase mb-2">
          ✦ Axo the Explorer
        </p>
        <motion.p
          key={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[#f5e199] text-lg leading-relaxed font-[family-name:var(--font-crimson)]"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </motion.div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────
function ProgressBar({ scene, total }: { scene: number; total: number }) {
  const pct = Math.round(((scene - 1) / (total - 1)) * 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-1">
        <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] text-[#c9a84c99] uppercase">Progress</span>
        <span className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c]">{pct}%</span>
      </div>
      <div className="h-2 bg-[#2a1660] rounded-full overflow-hidden border border-[#c9a84c22]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #b8922a, #f5e199)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── Content Card ───────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-[#2a1660] border border-[#c9a84c33] rounded-2xl p-6 mb-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Highlight Box ──────────────────────────────────────────────
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a0d45] border border-[#c9a84c55] rounded-xl p-4 my-3">
      {children}
    </div>
  );
}

// ── Gold Button ────────────────────────────────────────────────
function GoldBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="px-8 py-3 rounded-full font-[family-name:var(--font-cinzel)] font-bold text-sm tracking-widest text-[#1a0d45] cursor-pointer disabled:opacity-50"
      style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
    >
      {children}
    </motion.button>
  );
}

// ── Ghost Button ───────────────────────────────────────────────
function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="px-8 py-3 rounded-full font-[family-name:var(--font-cinzel)] text-sm tracking-widest border border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] hover:text-[#f5e199] transition-all cursor-pointer bg-transparent"
    >
      {children}
    </motion.button>
  );
}

// ── Divider ────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c33]" />
      <div className="w-2 h-2 bg-[#c9a84c44] rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c33]" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 1 — INTRO
// ══════════════════════════════════════════════════════════════
function Scene1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="surprised"
        message="Psst! <strong>Kyliana!</strong> Over here! 🌿<br/><br/>Something mysterious is growing in the Dracos Academy garden. I found it this morning and I have NO idea what it is. Is it alive? Is it a plant? Is it something magical? 🐉<br/><br/>I need your help to solve this mystery. Are you ready to become a <strong>Plant Detective?</strong>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔍 The Mystery Begins
        </h2>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-3">
          Before we can figure out what's growing in the garden, we need to ask an important scientific question:
        </p>
        <Highlight>
          <p className="text-center font-[family-name:var(--font-cinzel)] text-base text-[#f5e199]">
            "What exactly IS a plant — and what makes it different from everything else?"
          </p>
        </Highlight>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-3">In this lesson, we'll investigate three big clues:</p>
        {["🌟 Clue 1: Is it a living thing?", "🌟 Clue 2: What makes plants unique?", "🌟 Clue 3: What kind of plant could it be?"].map((clue, i) => (
          <motion.p
            key={clue}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="text-[#f5e199] text-base font-[family-name:var(--font-crimson)] mb-1"
          >
            {clue}
          </motion.p>
        ))}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Let's Investigate! 🔬</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 2 — LIVING vs NON-LIVING
// ══════════════════════════════════════════════════════════════
const SORT_ITEMS = [
  { id: "cactus",      label: "🌵 Cactus",      answer: "living" },
  { id: "rock",        label: "🪨 Rock",         answer: "nonliving" },
  { id: "caterpillar", label: "🐛 Caterpillar",  answer: "living" },
  { id: "water",       label: "💧 Water",        answer: "nonliving" },
  { id: "mushroom",    label: "🍄 Mushroom",     answer: "living" },
  { id: "sunlight",    label: "☀️ Sunlight",     answer: "nonliving" },
  { id: "oak",         label: "🌳 Oak Tree",     answer: "living" },
  { id: "log",         label: "🪵 Dead Log",     answer: "nonliving" },
];

function Scene2({ onNext }: { onNext: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [bank, setBank] = useState(SORT_ITEMS.map(i => i.id));
  const [living, setLiving] = useState<string[]>([]);
  const [nonliving, setNonliving] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [sortResult, setSortResult] = useState<{ msg: string; good: boolean } | null>(null);
  const [allChecked, setAllChecked] = useState(false);

  const toggleCheck = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      if (next.size === 6) setAllChecked(true);
      return next;
    });
  };

  const [dragOver, setDragOver] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string, from: "bank" | "living" | "nonliving") => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("from", from);
  };

  const onDragOver = (e: React.DragEvent, bucket: string) => {
    e.preventDefault();
    setDragOver(bucket);
  };

  const onDrop = (e: React.DragEvent, to: "living" | "nonliving") => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("id");
    const from = e.dataTransfer.getData("from") as "bank" | "living" | "nonliving";
    if (from === to) return;
    if (from === "bank") setBank(prev => prev.filter(i => i !== id));
    if (from === "living") setLiving(prev => prev.filter(i => i !== id));
    if (from === "nonliving") setNonliving(prev => prev.filter(i => i !== id));
    if (to === "living") setLiving(prev => [...prev, id]);
    if (to === "nonliving") setNonliving(prev => [...prev, id]);
    setSortResult(null);
  };

  const returnToBank = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("id");
    const from = e.dataTransfer.getData("from") as "living" | "nonliving";
    if (from === "living") setLiving(prev => prev.filter(i => i !== id));
    if (from === "nonliving") setNonliving(prev => prev.filter(i => i !== id));
    setBank(prev => [...prev, id]);
    setSortResult(null);
  };

  const selectItem = (id: string) => {
    setSelected(prev => prev === id ? null : id);
  };

  const dropToBucket = (bucket: "living" | "nonliving") => {
    if (!selected) return;
    setBank(prev => prev.filter(i => i !== selected));
    if (bucket === "living") setLiving(prev => [...prev, selected]);
    else setNonliving(prev => [...prev, selected]);
    setSelected(null);
    setSortResult(null);
  };

  const returnItem = (id: string, from: "living" | "nonliving") => {
    if (from === "living") setLiving(prev => prev.filter(i => i !== id));
    else setNonliving(prev => prev.filter(i => i !== id));
    setBank(prev => [...prev, id]);
    setSortResult(null);
  };

  const checkSort = () => {
    let correct = 0;
    living.forEach(id => { if (SORT_ITEMS.find(i => i.id === id)?.answer === "living") correct++; });
    nonliving.forEach(id => { if (SORT_ITEMS.find(i => i.id === id)?.answer === "nonliving") correct++; });
    const total = living.length + nonliving.length;
    if (correct === 8 && total === 8) {
      setSortResult({ msg: "✦ Perfect! You sorted all 8 correctly! Plants, animals, and fungi are living — rocks, water, and sunlight are not!", good: true });
    } else {
      setSortResult({ msg: `You got ${correct} out of ${total} sorted correctly. Hint: Living things grow, respond, and reproduce. Tap items in a bucket to return them and try again!`, good: false });
    }
  };

  const characteristics = [
    { title: "Made of cells", desc: "All living things are made of at least one cell — the tiny building blocks of life!" },
    { title: "Grow and develop", desc: "Living things change over time. A tiny seed can grow into a giant tree!" },
    { title: "Respond to their environment", desc: "A plant turns its leaves toward sunlight. That's a response!" },
    { title: "Need energy", desc: "Animals eat food. Plants make their own food from sunlight!" },
    { title: "Reproduce", desc: "Living things make more of themselves through seeds, spores, or other ways." },
    { title: "Made of organized parts", desc: "Everything has a job. Roots absorb water. Leaves make food. Nothing is random!" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Okay, first things first. Before we can call something a plant, we have to prove it's <em style='color:#c9a84c'>alive</em>. Scientists use a checklist called the <strong>Characteristics of Living Things</strong> to figure this out.<br/><br/>Tap each one to check it off!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📋 What Makes Something Alive?
        </h2>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-4">
          All <strong className="text-[#f5e199]">living things</strong> share these six characteristics. Tap each one to check it off!
        </p>
        <ul className="space-y-2">
          {characteristics.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggleCheck(i)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                checked.has(i)
                  ? "bg-[#4caf7d11] border-[#4caf7d44]"
                  : "border-[#c9a84c22] hover:bg-[#2a1660] hover:border-[#c9a84c44]"
              }`}
            >
              <motion.div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  checked.has(i) ? "bg-[#4caf7d] border-[#4caf7d]" : "border-[#c9a84c55]"
                }`}
                animate={{ scale: checked.has(i) ? [1, 1.2, 1] : 1 }}
              >
                {checked.has(i) && <span className="text-white text-sm">✓</span>}
              </motion.div>
              <div>
                <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-0.5">{c.title}</p>
                <p className="text-[#c9a84c99] text-sm leading-relaxed">{c.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        {allChecked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center font-[family-name:var(--font-cinzel)] text-sm text-[#4caf7d]"
          >
            ✦ You found all 6 characteristics!
          </motion.p>
        )}
      </Card>

      <Axo
        mood="excited"
        message="Now that you know the characteristics of living things — let's <em style='color:#c9a84c'>test your knowledge!</em> 🧪<br/><br/>Tap an item to select it, then tap a bucket to sort it!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎯 Sort It Out: Living or Non-Living?
        </h2>

        {/* Item bank */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-4 min-h-[60px] p-3 bg-[#1a0d45] border border-dashed border-[#c9a84c33] rounded-xl transition-all"
          onDragOver={(e) => { e.preventDefault(); setDragOver("bank"); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={returnToBank}
        >
          <AnimatePresence>
            {bank.map(id => {
              const item = SORT_ITEMS.find(i => i.id === id)!;
              return (
                <motion.button
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  draggable
                  onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, id, "bank")}
                  onClick={() => selectItem(id)}
                  className={`px-4 py-2 rounded-full text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-grab active:cursor-grabbing ${
                    selected === id
                      ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                      : "border-[#c9a84c55] bg-[#2a1660] text-[#f5e199] hover:border-[#c9a84c]"
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </AnimatePresence>
          {bank.length === 0 && (
            <p className="text-[#c9a84c55] text-sm font-[family-name:var(--font-cinzel)] self-center">All items sorted!</p>
          )}
        </div>

        {/* Buckets */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {(["living", "nonliving"] as const).map(bucket => (
            <motion.div
              key={bucket}
              onClick={() => dropToBucket(bucket)}
              onDragOver={(e) => onDragOver(e, bucket)}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => onDrop(e, bucket)}
              whileHover={{ scale: selected ? 1.02 : 1 }}
              className={`min-h-[120px] rounded-xl p-3 border-2 border-dashed cursor-pointer transition-all ${
                bucket === "living"
                  ? dragOver === "living"
                    ? "border-[#4caf7d] bg-[#4caf7d22]"
                    : "border-[#4caf7d44] bg-[#4caf7d0a]"
                  : dragOver === "nonliving"
                    ? "border-[#c9a84c] bg-[#c9a84c22]"
                    : "border-[#c9a84c44] bg-[#c9a84c0a]"
              }`}
            >
              <p className={`font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-center mb-3 ${
                bucket === "living" ? "text-[#4caf7d]" : "text-[#c9a84c]"
              }`}>
                {bucket === "living" ? "✅ Living" : "❌ Non-Living"}
              </p>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence>
                  {(bucket === "living" ? living : nonliving).map(id => {
                    const item = SORT_ITEMS.find(i => i.id === id)!;
                    return (
                      <motion.button
                        key={id}
                        layout
                        draggable
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, id, bucket)}
                        onClick={(e) => { e.stopPropagation(); returnItem(id, bucket); }}
                        className="px-3 py-1 rounded-full text-xs bg-[#2a1660] border border-[#c9a84c33] text-[#f5e199] cursor-grab active:cursor-grabbing hover:border-[#c9a84c]"
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkSort}
            className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
          >
            Check My Answers ✦
          </motion.button>
        </div>

        <AnimatePresence>
          {sortResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${
                sortResult.good
                  ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                  : "bg-[#c9a84c11] border border-[#c9a84c33] text-[#c9a84c]"
              }`}
            >
              {sortResult.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next Clue →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 3 — WHAT MAKES PLANTS UNIQUE
// ══════════════════════════════════════════════════════════════
const MATCH_PAIRS = [
  { id: "chlorophyll",    term: "Chlorophyll",     def: "The green pigment in plants that captures sunlight" },
  { id: "photosynthesis", term: "Photosynthesis",  def: "The process plants use to make their own food using sunlight" },
  { id: "cellwall",       term: "Cell Wall",       def: "A stiff outer layer that gives plant cells their shape" },
  { id: "co2",            term: "Carbon Dioxide",  def: "A gas in the air that plants take in to make food" },
];

function Scene3({ onNext }: { onNext: () => void }) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [allMatched, setAllMatched] = useState(false);

  const shuffledDefs = [MATCH_PAIRS[2], MATCH_PAIRS[0], MATCH_PAIRS[3], MATCH_PAIRS[1]];

  const selectTerm = (id: string) => {
    if (matched.has(id)) return;
    setSelectedTerm(prev => prev === id ? null : id);
  };

  const selectDef = (id: string) => {
    if (matched.has(id) || !selectedTerm) return;
    if (selectedTerm === id) {
      const next = new Set([...matched, id]);
      setMatched(next);
      setSelectedTerm(null);
      if (next.size === MATCH_PAIRS.length) setAllMatched(true);
    } else {
      setWrongPair(id);
      setTimeout(() => { setWrongPair(null); setSelectedTerm(null); }, 800);
    }
  };

  const superpowers = [
    { icon: "🌞", title: "Plants make their own food", desc: "Using sunlight, water, and carbon dioxide through photosynthesis. No other kingdom does this quite like plants!" },
    { icon: "🟢", title: "Plants contain chlorophyll", desc: "A special green pigment inside their cells that captures sunlight — that's why most plants are green!" },
    { icon: "🌱", title: "Plants have specific structures", desc: "Most plants have roots, stems, and leaves — each with a specific job to help the plant survive." },
    { icon: "🧱", title: "Plant cells have cell walls", desc: "A stiff outer layer that gives plants their structure and helps them stand upright." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Excellent work, Detective! 🎉 We know the mysterious thing is <em style='color:#c9a84c'>alive</em>. But so are animals, fungi, and bacteria! We need to figure out what makes it specifically a <strong>plant</strong>.<br/><br/>Plants have some amazing superpowers that no other living things have!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌿 Plant Superpowers
        </h2>
        <div className="space-y-3">
          {superpowers.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-base leading-relaxed">
                  {s.icon} <strong>{s.title}</strong> — {s.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>

        <Divider />

        <p className="text-[#f5e199cc] text-base mb-3">Plants also need four things to survive:</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "☀️", word: "Sunlight", def: "Used to make food through photosynthesis" },
            { icon: "💧", word: "Water", def: "Absorbed through roots, used in photosynthesis" },
            { icon: "🌬️", word: "Carbon Dioxide", def: "A gas from the air that plants use to make food" },
            { icon: "🌱", word: "Nutrients", def: "Minerals absorbed from the soil through roots" },
          ].map((v, i) => (
            <motion.div
              key={v.word}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-3"
            >
              <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-1">{v.icon} {v.word}</p>
              <p className="text-[#c9a84c99] text-xs leading-relaxed">{v.def}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Now let me quiz you on those vocabulary words! Tap a <strong>term</strong> on the left, then tap its matching <strong>definition</strong> on the right!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔗 Match the Vocabulary
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c] text-center mb-3">Terms</p>
            {MATCH_PAIRS.map(p => (
              <motion.button
                key={p.id}
                whileHover={{ scale: matched.has(p.id) ? 1 : 1.02 }}
                onClick={() => selectTerm(p.id)}
                className={`w-full text-center p-3 rounded-xl mb-2 text-sm font-[family-name:var(--font-cinzel)] border transition-all cursor-pointer ${
                  matched.has(p.id)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : selectedTerm === p.id
                    ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199] hover:border-[#c9a84c]"
                }`}
              >
                {p.term}
              </motion.button>
            ))}
          </div>
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c] text-center mb-3">Definitions</p>
            {shuffledDefs.map(p => (
              <motion.button
                key={p.id}
                whileHover={{ scale: matched.has(p.id) ? 1 : 1.02 }}
                onClick={() => selectDef(p.id)}
                className={`w-full text-left p-3 rounded-xl mb-2 text-xs font-[family-name:var(--font-crimson)] border transition-all cursor-pointer leading-snug ${
                  matched.has(p.id)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : wrongPair === p.id
                    ? "border-[#e24b4a55] bg-[#e24b4a11] text-[#e24b4a]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]"
                }`}
              >
                {p.def}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {allMatched && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm"
            >
              ✦ Excellent! You matched all four vocabulary words correctly!
            </motion.p>
          )}
        </AnimatePresence>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next Clue →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 4 — TYPES OF PLANTS + THE REVEAL
// ══════════════════════════════════════════════════════════════
const PLANT_TYPES = [
  { icon: "🌸", name: "Flowering Plants", example: "roses, sunflowers, apple trees", desc: "The largest group of plants! They produce flowers that become fruits or seeds. Most of the food we eat comes from flowering plants." },
  { icon: "🌲", name: "Conifers", example: "pine, spruce, cedar", desc: "These plants produce cones instead of flowers. They usually have needle-like leaves and stay green all year — that's why we call them evergreens!" },
  { icon: "🌿", name: "Ferns", example: "Boston fern, bracken fern", desc: "Ferns don't make flowers or seeds. Instead, they reproduce using tiny spores on the underside of their leaves. They love shady, moist environments." },
  { icon: "🍃", name: "Mosses", example: "peat moss, cushion moss", desc: "Mosses are the simplest plants. They have no roots or stems — they absorb water directly through their leaves. Found on rocks or tree bark in damp places." },
];

function Scene4({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [revealAnswer, setRevealAnswer] = useState<boolean | null>(null);

  const toggle = (i: number) => setRevealed(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="We're getting close! 🌟 We know the mystery thing is <em style='color:#c9a84c'>alive</em> and it has <em style='color:#c9a84c'>plant characteristics</em>. But there are SO many different kinds of plants in the world!<br/><br/>Scientists organize plants into groups. Tap each card to reveal more!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌍 Types of Plants
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {PLANT_TYPES.map((p, i) => (
            <motion.div
              key={p.name}
              onClick={() => toggle(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl p-4 cursor-pointer border-l-4 border border-[#c9a84c22] transition-all ${
                revealed.has(i)
                  ? "border-l-[#4caf7d] bg-[#4caf7d0a]"
                  : "border-l-[#c9a84c55] bg-[#1a0d45] hover:border-l-[#c9a84c]"
              }`}
            >
              <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-1">{p.icon} {p.name}</p>
              <p className="text-[#c9a84c99] text-xs mb-2">e.g. {p.example}</p>
              <AnimatePresence>
                {revealed.has(i) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[#f5e199cc] text-xs leading-relaxed"
                  >
                    {p.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="surprised"
        message="And now... <em style='color:#c9a84c'>the moment you've been waiting for!</em> 🥁<br/><br/>I checked the mystery plant in the garden. It has <strong>green leaves, deep roots, a strong stem</strong>, and I even spotted a <strong>flower bud</strong> forming!<br/><br/>Based on what you just learned — what kind of plant do you think it is?"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔍 The Big Reveal
        </h2>
        <p className="text-[#f5e199cc] text-base mb-4">Based on your investigation, which type of plant is growing in the Dracos Academy garden?</p>
        <div className="space-y-2">
          {[
            { label: "🌸 A Flowering Plant — it has roots, stems, leaves, and is forming a flower!", correct: true },
            { label: "🌲 A Conifer — it probably makes cones", correct: false },
            { label: "🌿 A Fern — it reproduces with spores", correct: false },
            { label: "🍃 A Moss — it has no roots or stems", correct: false },
          ].map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: revealAnswer !== null ? 1 : 1.01 }}
              whileTap={{ scale: revealAnswer !== null ? 1 : 0.99 }}
              onClick={() => { if (revealAnswer === null) setRevealAnswer(opt.correct); }}
              disabled={revealAnswer !== null}
              className={`w-full text-left p-4 rounded-xl text-base font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${
                revealAnswer !== null
                  ? opt.correct
                    ? "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]"
                    : "border-[#c9a84c22] text-[#f5e199cc]"
                  : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c] hover:text-[#f5e199]"
              }`}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {revealAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${
                revealAnswer
                  ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                  : "bg-[#c9a84c11] border border-[#c9a84c33] text-[#c9a84c]"
              }`}
            >
              {revealAnswer
                ? "🌸 That's right! The mystery plant is a flowering plant! It has roots, stems, leaves, and a developing flower — all the key features!"
                : "Not quite — look at the clues again. It has roots, stems, leaves, AND a flower forming. That makes it a flowering plant!"}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>On to the Quiz! 🏆</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — QUIZ
// ══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "Which of the following is a characteristic of ALL living things?",
    options: ["They can move from place to place", "They are made of cells and can grow", "They need to eat other organisms for food", "They only live in warm environments"],
    correct: 1,
    feedback: { right: "✦ Excellent! All living things share these characteristics — even plants!", wrong: "The correct answer is: they are made of cells and can grow. All living things share this characteristic." },
  },
  {
    q: "What makes plants different from animals when it comes to getting energy?",
    options: ["Plants hunt for their food like animals do", "Plants absorb energy directly from the soil", "Plants make their own food using sunlight through photosynthesis", "Plants get energy by drinking water only"],
    correct: 2,
    feedback: { right: "✦ Correct! Photosynthesis is the superpower that makes plants unique!", wrong: "Plants make their own food using sunlight through photosynthesis — animals must eat other organisms." },
  },
  {
    q: "Chlorophyll is important to plants because it —",
    options: ["Helps plants absorb water from the soil", "Captures sunlight so the plant can make food", "Protects the plant from animals", "Carries water from roots to leaves"],
    correct: 1,
    feedback: { right: "✦ Right! Chlorophyll captures sunlight so the plant can perform photosynthesis!", wrong: "Chlorophyll captures sunlight so the plant can perform photosynthesis and make its own food." },
  },
  {
    q: "A student finds a plant with needle-like leaves and cones. Which group does this plant most likely belong to?",
    options: ["Flowering plants", "Mosses", "Conifers", "Ferns"],
    correct: 2,
    feedback: { right: "✦ Correct! Conifers are known for their needle leaves and cones!", wrong: "Conifers produce cones and have needle-like leaves — that's the key clue!" },
  },
  {
    q: "A scientist observes something in a pond. It has no roots or stems, absorbs water through its leaves, and reproduces with spores. Which type of plant is it most likely?",
    options: ["A conifer", "A flowering plant", "A fern", "A moss"],
    correct: 3,
    feedback: { right: "✦ Outstanding! Mosses are the simplest plants — no roots, no stems, just spores!", wrong: "Mosses have no roots or stems and reproduce with spores. Ferns also use spores but they do have leaves." },
  },
];

function Scene5({ onFinish }: { onFinish: (score: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const answer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    setAnswers(prev => { const next = [...prev]; next[qIdx] = optIdx; return next; });
  };

  const allAnswered = answers.every(a => a !== null);

  const handleSubmit = () => {
    setSubmitted(true);
    const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
    onFinish(score);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Amazing detective work today, Kyliana! 🎉 You helped me solve the mystery AND learned so much along the way.<br/><br/>Now it's time for your <strong>final challenge</strong> — a 5-question quiz to show what you know. You've got this! 🌟"
      />

      {QUIZ_QUESTIONS.map((q, qi) => {
        const chosen = answers[qi];
        const isCorrect = chosen === q.correct;

        return (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.1 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-2xl p-6 mb-4"
          >
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-2">
              Question {qi + 1} of 5
            </p>
            <p className="text-[#f5e199] text-lg leading-relaxed mb-4 font-[family-name:var(--font-crimson)]">{q.q}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c] hover:text-[#f5e199]";
                if (chosen !== null) {
                  if (oi === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                  else if (oi === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                  else style = "border-[#c9a84c22] text-[#f5e199cc]";
                }
                return (
                  <motion.button
                    key={oi}
                    whileHover={{ scale: chosen !== null ? 1 : 1.01 }}
                    whileTap={{ scale: chosen !== null ? 1 : 0.99 }}
                    onClick={() => answer(qi, oi)}
                    disabled={chosen !== null}
                    className={`w-full text-left p-4 rounded-xl text-base font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {chosen !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 p-3 rounded-xl text-sm ${
                    isCorrect
                      ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                      : "bg-[#e24b4a11] border border-[#e24b4a33] text-[#e24b4acc]"
                  }`}
                >
                  {isCorrect ? q.feedback.right : q.feedback.wrong}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <div className="text-center mt-2">
        <GoldBtn onClick={handleSubmit} disabled={!allAnswered || submitted}>
          {allAnswered ? "See My Score ✦" : `Answer all questions (${answers.filter(a => a !== null).length}/5)`}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 6 — SCORE
// ══════════════════════════════════════════════════════════════
function Scene6({ score, onRestart }: { score: number; onRestart: () => void }) {
  const pct = (score / 5) * 100;

  const config = pct === 100
    ? { mood: "proud" as AxoMood, msg: "PERFECT SCORE! I knew you could do it, Detective! 🎉 You are officially a Plant Expert! I couldn't have solved the garden mystery without you. See you in Lesson 2 — we're going to explore roots, stems, and leaves up close!", scoreMsg: "🌟 Perfect Score! You are a true Plant Detective! Every answer was correct!" }
    : pct >= 80
    ? { mood: "excited" as AxoMood, msg: "Wow, great job Detective! 🌿 You really know your plants! Take a quick look at the questions you missed, then get ready for Lesson 2!", scoreMsg: "🌿 Excellent work! You have a strong understanding of what makes plants unique." }
    : pct >= 60
    ? { mood: "neutral" as AxoMood, msg: "You're getting there, Detective! 🌱 Some of those questions were tricky. I'd recommend reviewing the lesson before moving on.", scoreMsg: "🌱 Good effort! You're on the right track. Review the lesson and try again!" }
    : { mood: "encouraging" as AxoMood, msg: "Don't worry — even I get things wrong sometimes! 🔬 Let's go back through the lesson together before we move on. Science takes practice!", scoreMsg: "🔬 Keep investigating! Review the lesson carefully and give it another try." };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center bg-[#2a1660] border-2 border-[#c9a84c55] rounded-2xl p-10 mb-6"
      >
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="font-[family-name:var(--font-cinzel)] text-7xl font-bold text-[#f5e199] mb-2"
          style={{ textShadow: "0 0 30px #c9a84caa" }}
        >
          {score}/5
        </motion.p>
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-4">
          Lesson 1 Complete · TEKS 4.13A
        </p>
        <p className="text-[#f5e199cc] text-lg font-[family-name:var(--font-crimson)] leading-relaxed">
          {config.scoreMsg}
        </p>
      </motion.div>

      <Axo mood={config.mood} message={config.msg} />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📚 What You Learned Today
        </h2>
        {[
          "Living things share six characteristics: made of cells, grow, respond, need energy, reproduce, and have organized parts.",
          "Plants are unique because they make their own food through photosynthesis using sunlight, water, and carbon dioxide.",
          "Chlorophyll is the green pigment that captures sunlight for photosynthesis.",
          "The four main plant groups are: flowering plants, conifers, ferns, and mosses.",
        ].map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="text-[#f5e199cc] text-base leading-relaxed mb-2"
          >
            ✦ {item}
          </motion.p>
        ))}
        <Divider />
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.1em] text-[#c9a84c] mt-2">
          Next Lesson: External Plant Structures — Roots, Stems &amp; Leaves 🌱
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <GhostBtn onClick={() => {}}>Next Lesson →</GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson1() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 6;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(6);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-1",
      subject: "Science",
      unit: "Life Science — Plants",
      teks: "4.13A",
      score: s,
      totalQuestions: 5,
    }).catch(err => console.error("Progress save failed:", err));
  };

  const restart = () => {
    setScene(1);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-[#1a0d45] text-[#f5e199] overflow-x-hidden">
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#f5e199]"
            style={{
              width: i % 3 === 0 ? 5 : 3,
              height: i % 3 === 0 ? 5 : 3,
              top: `${(i * 7 + 4) % 95}%`,
              left: `${(i * 13 + 3) % 95}%`,
              opacity: i % 2 === 0 ? 0.5 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Scale texture */}
      <div
        className="fixed top-0 right-0 w-24 h-full opacity-8 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(ellipse 18px 10px at 50% 0%, #c9a84c 0%, transparent 100%)",
          backgroundSize: "36px 20px",
        }}
      />

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c99] mb-1">
            Dracos Academy · Science · Life Science: Plants
          </p>
          <h1
            className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#f5e199] mb-1"
            style={{ textShadow: "0 0 20px #c9a84c88" }}
          >
            🌱 What Makes a Plant a Plant?
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 1 of 10 · TEKS 4.13A
          </p>
        </div>

        <ProgressBar scene={scene} total={TOTAL} />

        <AnimatePresence mode="wait">
          <motion.div key={scene}>
            {scene === 1 && <Scene1 onNext={next} />}
            {scene === 2 && <Scene2 onNext={next} />}
            {scene === 3 && <Scene3 onNext={next} />}
            {scene === 4 && <Scene4 onNext={next} />}
            {scene === 5 && <Scene5 onFinish={handleFinish} />}
            {scene === 6 && <Scene6 score={score} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent relative z-10 mt-8" />
    </main>
  );
}