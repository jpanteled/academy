// src/app/kyliana/science/lesson-2/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLessonProgress } from "@/lib/progress";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────
type AxoMood = "neutral" | "excited" | "thinking" | "surprised" | "proud" | "encouraging";

// ── Axo Character ──────────────────────────────────────────────
function Axo({ mood, message }: { mood: AxoMood; message: string }) {
  const imgMap: Record<AxoMood, string> = {
    neutral:     "/images/axo-neutral.png",
    excited:     "/images/axo-excited.png",
    thinking:    "/images/axo-thinking.png",
    surprised:   "/images/axo-surprised.png",
    proud:       "/images/axo-proud.png",
    encouraging: "/images/axo-encouraging.png",
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
        onError={(e) => { (e.target as HTMLImageElement).src = "/images/kyliescience.png"; }}
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

// ── Shared Components ──────────────────────────────────────────
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

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a0d45] border border-[#c9a84c55] rounded-xl p-4 my-3">
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c33]" />
      <div className="w-2 h-2 bg-[#c9a84c44] rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c33]" />
    </div>
  );
}

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

// ══════════════════════════════════════════════════════════════
// SCENE 1 — INTRO
// ══════════════════════════════════════════════════════════════
function Scene1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Kyliana! You're back! 🌸 I've been in the garden all morning sketching the mystery plant in my field notebook.<br/><br/>In our last lesson we figured out it's a <strong>flowering plant</strong>. But today we're going even deeper — we're going to examine every single part of this plant like real <strong>botanists!</strong> 🔬<br/><br/>Ready? Grab your magnifying glass!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌿 Today's Investigation
        </h2>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-4">
          Plants have <strong className="text-[#f5e199]">external structures</strong> — parts you can see from the outside. Each one has a specific job that helps the plant survive.
        </p>
        <Highlight>
          <p className="text-center font-[family-name:var(--font-cinzel)] text-base text-[#f5e199]">
            "Structure and function — every part of a plant has a job!"
          </p>
        </Highlight>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-3">Today we'll investigate three major external structures:</p>
        {[
          "🌱 Roots — the hidden anchors underground",
          "🪵 Stems — the plant's highway system",
          "🍃 Leaves — the plant's food factories",
        ].map((item, i) => (
          <motion.p
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="text-[#f5e199] text-base font-[family-name:var(--font-crimson)] mb-2"
          >
            {item}
          </motion.p>
        ))}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Start Investigating! 🔬</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 2 — ROOTS
// ══════════════════════════════════════════════════════════════
function Scene2({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [rootSelected, setRootSelected] = useState<string | null>(null);
  const [rootAnswered, setRootAnswered] = useState(false);

  const toggle = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const rootTypes = [
    {
      id: "taproot",
      name: "Taproot System",
      icon: "⬇️",
      example: "carrots, dandelions, oak trees",
      desc: "One main large root grows deep into the soil. Smaller roots branch off from it. Taproots are great at reaching deep water and storing food!",
      fact: "The carrot you eat IS the taproot — it stores food for the plant!",
    },
    {
      id: "fibrous",
      name: "Fibrous Root System",
      icon: "🌾",
      example: "grass, wheat, corn",
      desc: "Many thin roots spread out in all directions near the surface. Fibrous roots are great at holding soil in place and absorbing water quickly after rain.",
      fact: "Grass has fibrous roots — that's why it's so good at preventing soil erosion!",
    },
  ];

  const rootFunctions = [
    { icon: "💧", title: "Absorb water and nutrients", desc: "Tiny root hairs on the tips of roots absorb water and dissolved minerals from the soil." },
    { icon: "⚓", title: "Anchor the plant", desc: "Roots hold the plant firmly in the ground so it doesn't blow away or fall over." },
    { icon: "🏪", title: "Store food", desc: "Some plants store extra food in their roots for later use. Think carrots and beets!" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Let's start at the very bottom — underground! 🌱<br/><br/>I carefully dug up our mystery plant to look at its roots. Most people never see roots because they're hidden, but they do some of the most important work in the whole plant!<br/><br/>Tap each root type to learn more!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌱 Types of Roots
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {rootTypes.map(r => (
            <motion.div
              key={r.id}
              onClick={() => toggle(r.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl p-4 cursor-pointer border-l-4 border border-[#c9a84c22] transition-all ${
                revealed.has(r.id)
                  ? "border-l-[#4caf7d] bg-[#4caf7d0a]"
                  : "border-l-[#c9a84c55] bg-[#1a0d45] hover:border-l-[#c9a84c]"
              }`}
            >
              <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-1">{r.icon} {r.name}</p>
              <p className="text-[#c9a84c99] text-xs mb-2">e.g. {r.example}</p>
              <AnimatePresence>
                {revealed.has(r.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-[#f5e199cc] text-xs leading-relaxed mb-2">{r.desc}</p>
                    <p className="text-[#c9a84c] text-xs italic">💡 {r.fact}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          What Do Roots Do?
        </h3>
        <div className="space-y-2">
          {rootFunctions.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">
                  {f.icon} <strong>{f.title}</strong> — {f.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Now for a quick check! Our mystery plant has one large main root that goes deep into the soil, with smaller roots branching off.<br/><br/>Which type of root system does our mystery plant have?"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔍 Quick Check: Which Root System?
        </h2>
        <div className="space-y-2">
          {[
            { label: "⬇️ Taproot system — one main deep root with smaller branches", correct: true },
            { label: "🌾 Fibrous root system — many thin roots spreading in all directions", correct: false },
          ].map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: rootAnswered ? 1 : 1.01 }}
              whileTap={{ scale: rootAnswered ? 1 : 0.99 }}
              onClick={() => { if (!rootAnswered) { setRootSelected(opt.label); setRootAnswered(true); } }}
              disabled={rootAnswered}
              className={`w-full text-left p-4 rounded-xl text-base font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${
                rootAnswered
                  ? opt.correct
                    ? "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]"
                    : rootSelected === opt.label
                    ? "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]"
                    : "border-[#c9a84c22] text-[#f5e199cc]"
                  : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c] hover:text-[#f5e199]"
              }`}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {rootAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${
                rootSelected?.includes("Taproot")
                  ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                  : "bg-[#e24b4a11] border border-[#e24b4a33] text-[#e24b4acc]"
              }`}
            >
              {rootSelected?.includes("Taproot")
                ? "✦ Correct! One main deep root with smaller branches = taproot system. Our mystery plant is well anchored!"
                : "Not quite! A fibrous system has many thin roots spreading out. Our plant has ONE main deep root — that's a taproot system!"}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Stems →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 3 — STEMS
// ══════════════════════════════════════════════════════════════
function Scene3({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const stemFacts = [
    {
      id: "support",
      icon: "🏗️",
      title: "Support",
      desc: "Stems hold the plant upright, keeping leaves in position to catch sunlight and flowers up high to attract pollinators.",
    },
    {
      id: "transport",
      icon: "🚚",
      title: "Transport",
      desc: "Stems contain two tube systems — xylem and phloem — that move water, nutrients, and food throughout the plant.",
    },
    {
      id: "storage",
      icon: "🏪",
      title: "Storage",
      desc: "Some stems store water and food. A cactus stem stores water. A potato is actually a swollen underground stem!",
    },
  ];

  const vesselInfo = [
    {
      id: "xylem",
      name: "Xylem",
      color: "text-[#7d9fc9]",
      border: "border-[#7d9fc955]",
      bg: "bg-[#7d9fc911]",
      desc: "Carries water and minerals UP from the roots to the leaves. Think of it as the water supply pipe.",
      memory: "X for eXit — water exits the roots going up!",
    },
    {
      id: "phloem",
      name: "Phloem",
      color: "text-[#c9a84c]",
      border: "border-[#c9a84c55]",
      bg: "bg-[#c9a84c11]",
      desc: "Carries food (sugar) made in the leaves DOWN to the rest of the plant. Think of it as the food delivery system.",
      memory: "Ph for PHood — phloem carries food!",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Now let's move up the plant to the <strong>stem!</strong> 🪵<br/><br/>I cut a tiny cross-section of our mystery plant's stem under my microscope and I could see these amazing tiny tubes inside. The stem is like the plant's <strong>highway system</strong> — everything travels through it!<br/><br/>Tap each function to learn more!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🪵 What Does a Stem Do?
        </h2>
        <div className="space-y-3 mb-4">
          {stemFacts.map((f, i) => (
            <motion.div
              key={f.id}
              onClick={() => setRevealed(prev => {
                const next = new Set(prev);
                next.has(f.id) ? next.delete(f.id) : next.add(f.id);
                return next;
              })}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(f.id)
                  ? "border-[#4caf7d55] bg-[#4caf7d0a]"
                  : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{f.icon}</span>
                <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199]">{f.title}</p>
                <span className="ml-auto text-[#c9a84c55] text-xs font-[family-name:var(--font-cinzel)]">
                  {revealed.has(f.id) ? "▲" : "▼"}
                </span>
              </div>
              <AnimatePresence>
                {revealed.has(f.id) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[#f5e199cc] text-sm leading-relaxed mt-3"
                  >
                    {f.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          🔬 Inside the Stem: Xylem & Phloem
        </h3>
        <p className="text-[#f5e199cc] text-sm leading-relaxed mb-4">
          Inside every stem are two types of special tubes called <strong className="text-[#f5e199]">vascular tissue</strong>. Tap each one to learn what it does!
        </p>
        <div className="grid grid-cols-2 gap-3">
          {vesselInfo.map(v => (
            <motion.div
              key={v.id}
              onClick={() => setRevealed(prev => {
                const next = new Set(prev);
                next.has(v.id) ? next.delete(v.id) : next.add(v.id);
                return next;
              })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(v.id) ? `${v.border} ${v.bg}` : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <p className={`font-[family-name:var(--font-cinzel)] text-sm font-bold mb-2 ${v.color}`}>{v.name}</p>
              <AnimatePresence>
                {revealed.has(v.id) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[#f5e199cc] text-xs leading-relaxed mb-2">{v.desc}</p>
                    <p className={`text-xs italic ${v.color}`}>💡 {v.memory}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {!revealed.has(v.id) && (
                <p className="text-[#c9a84c55] text-xs">Tap to reveal</p>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="proud"
        message="Xylem and Phloem — two of the most important words in plant science! Here's a trick I use to remember them:<br/><br/><strong>X</strong>ylem = e<strong>X</strong>it from roots going UP ⬆️<br/><strong>Ph</strong>loem = <strong>Ph</strong>ood going DOWN ⬇️<br/><br/>Try saying it out loud — it really works!"
      />

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Leaves →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 4 — LEAVES
// ══════════════════════════════════════════════════════════════
function Scene4({ onNext }: { onNext: () => void }) {
  const [labelAnswers, setLabelAnswers] = useState<Record<string, string>>({});
  const [labelChecked, setLabelChecked] = useState(false);
  const [labelResult, setLabelResult] = useState<{ correct: number; total: number } | null>(null);

  const leafParts = [
    { id: "blade", name: "Blade", desc: "The flat, wide part of the leaf where most photosynthesis happens. Its large surface area captures maximum sunlight." },
    { id: "veins", name: "Veins", desc: "The network of lines running through the leaf. Veins are actually xylem and phloem — they carry water in and food out." },
    { id: "petiole", name: "Petiole", desc: "The stalk that connects the leaf to the stem. It positions the leaf to catch the best sunlight." },
    { id: "stomata", name: "Stomata", desc: "Tiny pores (openings) on the underside of the leaf. They let carbon dioxide in and oxygen out during photosynthesis." },
  ];

  const labelOptions = ["Blade", "Veins", "Petiole", "Stomata"];

  const checkLabels = () => {
    setLabelChecked(true);
    let correct = 0;
    leafParts.forEach(p => {
      if (labelAnswers[p.id] === p.name) correct++;
    });
    setLabelResult({ correct, total: leafParts.length });
  };

  const leafFunctions = [
    { icon: "☀️", title: "Capture sunlight", desc: "Leaves are flat and wide to maximize the surface area exposed to sunlight." },
    { icon: "🏭", title: "Make food", desc: "Chlorophyll in leaf cells captures sunlight to power photosynthesis." },
    { icon: "💨", title: "Gas exchange", desc: "Stomata open and close to let CO₂ in and O₂ out — like tiny breathing holes!" },
    { icon: "💧", title: "Release water", desc: "Plants release excess water vapor through stomata in a process called transpiration." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="We made it to the leaves! 🍃 This is my favorite part — leaves are basically tiny <strong>solar-powered food factories!</strong><br/><br/>I've been sketching the leaf from our mystery plant all morning. Look at how perfectly designed it is — every part has a job!<br/><br/>Let's learn those parts and then I'll test you!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🍃 Parts of a Leaf
        </h2>
        <div className="space-y-3 mb-4">
          {leafParts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">
                  <strong className="font-[family-name:var(--font-cinzel)]">{p.name}</strong> — {p.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          What Do Leaves Do?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {leafFunctions.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-3"
            >
              <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">{f.icon} {f.title}</p>
              <p className="text-[#c9a84c99] text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Okay Detective — time to label the leaf! I drew a diagram of our mystery plant's leaf in my notebook. Can you match each label to the correct part?<br/><br/>Select an answer for each part of the leaf!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🏷️ Label the Leaf
        </h2>

        {/* Leaf diagram — SVG */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 300 280" className="w-full max-w-xs" style={{ filter: "drop-shadow(0 0 12px #c9a84c33)" }}>
            {/* Petiole */}
            <line x1="150" y1="260" x2="150" y2="200" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" />
            {/* Leaf blade */}
            <ellipse cx="150" cy="130" rx="90" ry="80" fill="#4caf7d22" stroke="#4caf7d" strokeWidth="2" />
            {/* Main vein */}
            <line x1="150" y1="200" x2="150" y2="60" stroke="#c9a84c88" strokeWidth="2" />
            {/* Side veins */}
            <line x1="150" y1="100" x2="100" y2="80" stroke="#c9a84c55" strokeWidth="1.5" />
            <line x1="150" y1="100" x2="200" y2="80" stroke="#c9a84c55" strokeWidth="1.5" />
            <line x1="150" y1="130" x2="85" y2="120" stroke="#c9a84c55" strokeWidth="1.5" />
            <line x1="150" y1="130" x2="215" y2="120" stroke="#c9a84c55" strokeWidth="1.5" />
            <line x1="150" y1="160" x2="100" y2="160" stroke="#c9a84c55" strokeWidth="1.5" />
            <line x1="150" y1="160" x2="200" y2="160" stroke="#c9a84c55" strokeWidth="1.5" />
            {/* Stomata dots */}
            <circle cx="120" cy="150" r="2" fill="#c9a84c88" />
            <circle cx="130" cy="160" r="2" fill="#c9a84c88" />
            <circle cx="170" cy="155" r="2" fill="#c9a84c88" />
            <circle cx="180" cy="145" r="2" fill="#c9a84c88" />
            {/* Labels */}
            <text x="220" y="75" fill="#f5e199" fontSize="11" fontFamily="Georgia,serif">A</text>
            <text x="245" y="130" fill="#f5e199" fontSize="11" fontFamily="Georgia,serif">B</text>
            <text x="160" y="255" fill="#f5e199" fontSize="11" fontFamily="Georgia,serif">C</text>
            <text x="85" y="165" fill="#f5e199" fontSize="11" fontFamily="Georgia,serif">D</text>
            {/* Pointer lines */}
            <line x1="218" y1="73" x2="195" y2="88" stroke="#f5e19966" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="243" y1="128" x2="215" y2="125" stroke="#f5e19966" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="160" y1="250" x2="153" y2="235" stroke="#f5e19966" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="95" y1="162" x2="115" y2="155" stroke="#f5e19966" strokeWidth="1" strokeDasharray="3,2" />
          </svg>
        </div>

        <div className="space-y-3">
          {[
            { id: "blade", label: "A", hint: "The flat, wide main body of the leaf" },
            { id: "veins", label: "B", hint: "The lines running through the leaf carrying water and food" },
            { id: "petiole", label: "C", hint: "The stalk connecting the leaf to the stem" },
            { id: "stomata", label: "D", hint: "Tiny pores on the underside for gas exchange" },
          ].map(item => {
            const isCorrect = labelAnswers[item.id] === leafParts.find(p => p.id === item.id)?.name;
            return (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#c9a84c55] flex items-center justify-center font-[family-name:var(--font-cinzel)] text-sm text-[#c9a84c] flex-shrink-0">
                  {item.label}
                </div>
                <div className="flex-1">
                  <p className="text-[#c9a84c99] text-xs mb-1 font-[family-name:var(--font-crimson)] italic">{item.hint}</p>
                  <select
                    value={labelAnswers[item.id] || ""}
                    onChange={e => setLabelAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                    disabled={labelChecked}
                    className={`w-full bg-[#1a0d45] border rounded-lg px-3 py-2 text-sm font-[family-name:var(--font-crimson)] focus:outline-none transition-all ${
                      labelChecked
                        ? isCorrect
                          ? "border-[#4caf7d] text-[#4caf7d]"
                          : "border-[#e24b4a] text-[#e24b4a]"
                        : "border-[#c9a84c33] text-[#f5e199] focus:border-[#c9a84c]"
                    }`}
                  >
                    <option value="">Select a label...</option>
                    {labelOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkLabels}
            disabled={labelChecked || Object.keys(labelAnswers).length < 4}
            className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] cursor-pointer disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
          >
            Check My Labels ✦
          </motion.button>
        </div>

        <AnimatePresence>
          {labelResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${
                labelResult.correct === labelResult.total
                  ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                  : "bg-[#c9a84c11] border border-[#c9a84c33] text-[#c9a84c]"
              }`}
            >
              {labelResult.correct === labelResult.total
                ? `✦ Perfect! All ${labelResult.total} labels correct! You know your leaf anatomy!`
                : `You got ${labelResult.correct} out of ${labelResult.total}. Check the highlighted answers and review the leaf parts above!`}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Match It Up! →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — DRAG & MATCH: STRUCTURE TO FUNCTION
// ══════════════════════════════════════════════════════════════
const MATCH_DATA = [
  { id: "roots",   structure: "Roots",  function: "Absorb water and nutrients from the soil" },
  { id: "stem",    structure: "Stem",   function: "Transport water and food through the plant" },
  { id: "leaves",  structure: "Leaves", function: "Make food for the plant through photosynthesis" },
  { id: "xylem",   structure: "Xylem",  function: "Carry water UP from roots to leaves" },
  { id: "phloem",  structure: "Phloem", function: "Carry food DOWN from leaves to the rest of the plant" },
];

function Scene5({ onNext }: { onNext: () => void }) {
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [allDone, setAllDone] = useState(false);

  const shuffledFunctions = [
    MATCH_DATA[2].function,
    MATCH_DATA[4].function,
    MATCH_DATA[0].function,
    MATCH_DATA[3].function,
    MATCH_DATA[1].function,
  ];

  const selectStructure = (id: string) => {
    if (Object.values(matched).includes(id) || Object.keys(matched).includes(id)) return;
    setSelectedStructure(prev => prev === id ? null : id);
  };

  const selectFunction = (fn: string) => {
    if (!selectedStructure) return;
    const correctMatch = MATCH_DATA.find(m => m.id === selectedStructure);
    if (correctMatch?.function === fn) {
      const next = { ...matched, [selectedStructure]: fn };
      setMatched(next);
      setSelectedStructure(null);
      if (Object.keys(next).length === MATCH_DATA.length) setAllDone(true);
    } else {
      setWrongFlash(fn);
      setTimeout(() => { setWrongFlash(null); setSelectedStructure(null); }, 800);
    }
  };

  const isStructureMatched = (id: string) => id in matched;
  const isFunctionMatched = (fn: string) => Object.values(matched).includes(fn);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Before the quiz, let's do one more activity to make sure everything sticks! 🧠<br/><br/>I'm going to give you the plant structures on the left and their functions on the right. Tap a <strong>structure</strong>, then tap its matching <strong>function!</strong><br/><br/>You've got this, Detective!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔗 Match Structure to Function
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c] text-center mb-3">Structures</p>
            {MATCH_DATA.map(m => (
              <motion.button
                key={m.id}
                whileHover={{ scale: isStructureMatched(m.id) ? 1 : 1.02 }}
                onClick={() => selectStructure(m.id)}
                className={`w-full text-center p-3 rounded-xl mb-2 text-sm font-[family-name:var(--font-cinzel)] border transition-all cursor-pointer ${
                  isStructureMatched(m.id)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : selectedStructure === m.id
                    ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199] hover:border-[#c9a84c]"
                }`}
              >
                {m.structure}
              </motion.button>
            ))}
          </div>
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c] text-center mb-3">Functions</p>
            {shuffledFunctions.map(fn => (
              <motion.button
                key={fn}
                whileHover={{ scale: isFunctionMatched(fn) ? 1 : 1.02 }}
                onClick={() => selectFunction(fn)}
                className={`w-full text-left p-3 rounded-xl mb-2 text-xs font-[family-name:var(--font-crimson)] border transition-all cursor-pointer leading-snug ${
                  isFunctionMatched(fn)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : wrongFlash === fn
                    ? "border-[#e24b4a55] bg-[#e24b4a11] text-[#e24b4a]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]"
                }`}
              >
                {fn}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm"
            >
              ✦ Perfect! You matched all five structures to their functions!
            </motion.p>
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
// SCENE 6 — QUIZ
// ══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "A plant growing in the desert has one large root that grows very deep into the soil. What type of root system does this plant have?",
    options: ["Fibrous root system", "Taproot system", "Aerial root system", "Surface root system"],
    correct: 1,
    feedback: {
      right: "✦ Correct! One main deep root = taproot system. Desert plants use taproots to reach deep underground water!",
      wrong: "A taproot system has one main large root going deep. Fibrous roots spread out in many thin roots near the surface.",
    },
  },
  {
    q: "Which part of a plant is responsible for transporting water from the roots up to the leaves?",
    options: ["Phloem", "Stomata", "Xylem", "Petiole"],
    correct: 2,
    feedback: {
      right: "✦ Excellent! Xylem carries water UP — remember, X for eXit from roots going up!",
      wrong: "Xylem carries water up from roots to leaves. Phloem carries food DOWN. Don't mix them up!",
    },
  },
  {
    q: "Tiny openings on the underside of leaves that allow gases to pass in and out are called —",
    options: ["Xylem", "Veins", "Petioles", "Stomata"],
    correct: 3,
    feedback: {
      right: "✦ Right! Stomata are the tiny pores that let CO₂ in and O₂ out. They're like tiny breathing holes!",
      wrong: "Stomata are the tiny pores on the underside of leaves for gas exchange. Veins carry water and food.",
    },
  },
  {
    q: "A student notices that a plant's leaves are large and flat. This structural feature most likely helps the plant —",
    options: ["Store more water in the stem", "Absorb more sunlight for photosynthesis", "Grow deeper roots", "Reproduce faster"],
    correct: 1,
    feedback: {
      right: "✦ Correct! Large flat leaves = more surface area = more sunlight captured for photosynthesis!",
      wrong: "Large flat leaves maximize surface area to capture more sunlight for photosynthesis — that's the key function!",
    },
  },
  {
    q: "Which statement BEST describes the function of phloem in a plant?",
    options: [
      "It absorbs water from the soil through root hairs",
      "It carries food made in the leaves to the rest of the plant",
      "It opens and closes to control gas exchange",
      "It anchors the plant firmly in the ground",
    ],
    correct: 1,
    feedback: {
      right: "✦ Outstanding! Phloem = PHood delivery — carries sugar from leaves to the rest of the plant!",
      wrong: "Phloem carries food (sugar) made in the leaves DOWN to the rest of the plant. Xylem carries water UP.",
    },
  },
];

function Scene6({ onFinish }: { onFinish: (score: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));

  const answer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    setAnswers(prev => { const next = [...prev]; next[qIdx] = optIdx; return next; });
  };

  const allAnswered = answers.every(a => a !== null);

  const handleSubmit = () => {
    const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
    onFinish(score);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="You've investigated roots, stems, and leaves like a true botanist! 🌿<br/><br/>Now it's time for your <strong>final quiz</strong> — 5 questions to show what you know. Remember: structure and function — every part has a job! 💪"
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
        <GoldBtn onClick={handleSubmit} disabled={!allAnswered}>
          {allAnswered ? "See My Score ✦" : `Answer all questions (${answers.filter(a => a !== null).length}/5)`}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 7 — SCORE
// ══════════════════════════════════════════════════════════════
function Scene7({ score, onRestart }: { score: number; onRestart: () => void }) {
  const pct = (score / 5) * 100;

  const config = pct === 100
    ? {
        mood: "proud" as AxoMood,
        msg: "PERFECT SCORE! You are officially a Plant Anatomy Expert! 🌿 I'm going to put your name in my field notebook as the best botanical detective I've ever worked with! Ready for Lesson 3?",
        scoreMsg: "🌟 Perfect Score! Every answer correct — you know your plant structures!",
      }
    : pct >= 80
    ? {
        mood: "excited" as AxoMood,
        msg: "Fantastic work, Detective! 🎉 You really know your roots, stems, and leaves. Review the ones you missed and you'll be ready for Lesson 3!",
        scoreMsg: "🌿 Excellent! You have a strong understanding of external plant structures.",
      }
    : pct >= 60
    ? {
        mood: "neutral" as AxoMood,
        msg: "Good effort! 🌱 Some of those were tricky — especially xylem vs. phloem. I'd review those before moving on. You've got this!",
        scoreMsg: "🌱 Good work! Review xylem, phloem, and stomata before moving on.",
      }
    : {
        mood: "encouraging" as AxoMood,
        msg: "Don't worry — plant anatomy takes practice! 🔬 Let's go back through the lesson and review roots, stems, and leaves again. I'll be right here with you!",
        scoreMsg: "🔬 Keep going! Review the lesson and try again — you'll get it!",
      };

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
          Lesson 2 Complete · TEKS 4.13A
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
          "Roots absorb water and nutrients, anchor the plant, and can store food. Taproot systems have one main root; fibrous systems have many.",
          "Stems support the plant and transport water and food through xylem (water up) and phloem (food down).",
          "Leaves are the plant's food factories — flat and wide to capture sunlight for photosynthesis.",
          "Stomata are tiny pores on leaves that allow gas exchange — CO₂ in, O₂ out.",
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
          Next Lesson: What Do Plant Structures Do? — Going Deeper 🔬
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <Link href="/kyliana/science/lesson-1">
          <GhostBtn onClick={() => {}}>← Lesson 1</GhostBtn>
        </Link>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson2() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 7;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(7);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-2",
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
        className="fixed top-0 right-0 w-24 h-full pointer-events-none z-0"
        style={{
          opacity: 0.08,
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
            🌿 External Plant Structures
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 2 of 10 · TEKS 4.13A
          </p>
        </div>

        <ProgressBar scene={scene} total={TOTAL} />

        <AnimatePresence mode="wait">
          <motion.div key={scene}>
            {scene === 1 && <Scene1 onNext={next} />}
            {scene === 2 && <Scene2 onNext={next} />}
            {scene === 3 && <Scene3 onNext={next} />}
            {scene === 4 && <Scene4 onNext={next} />}
            {scene === 5 && <Scene5 onNext={next} />}
            {scene === 6 && <Scene6 onFinish={handleFinish} />}
            {scene === 7 && <Scene7 score={score} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent relative z-10 mt-8" />
    </main>
  );
}