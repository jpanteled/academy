// src/app/kyliana/math/lesson-1/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLessonProgress } from "@/lib/progress";

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════
type GloopleM = "neutral" | "excited" | "panicked" | "happy";
type FangsleyM = "neutral" | "tiny" | "restored" | "snarky";
type BloopM = "neutral" | "approving" | "explaining";

// ══════════════════════════════════════════════════════════════
// SPEAK — ElevenLabs via /api/speak
// ══════════════════════════════════════════════════════════════
async function speak(text: string, character: "gloople" | "fangsley" | "bloop") {
  try {
    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, character }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
  } catch (e) {
    console.error("TTS error:", e);
  }
}

// ══════════════════════════════════════════════════════════════
// SWAMP BUBBLES
// ══════════════════════════════════════════════════════════════
function SwampBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 16 + (i * 7) % 30,
            height: 16 + (i * 7) % 30,
            left: `${(i * 13 + 5) % 95}%`,
            bottom: "-60px",
            background: "radial-gradient(circle, #40916c33, transparent)",
            border: "1px solid #40916c22",
          }}
          animate={{ y: [0, -(700 + i * 50)], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PROGRESS BAR
// ══════════════════════════════════════════════════════════════
function ProgressBar({ scene, total }: { scene: number; total: number }) {
  const pct = Math.round(((scene - 1) / (total - 1)) * 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-1">
        <span className="text-xs tracking-widest text-[#74c69d99] uppercase font-bold">Progress</span>
        <span className="text-xs text-[#74c69d] font-bold">{pct}%</span>
      </div>
      <div className="h-2 bg-[#071510] rounded-full overflow-hidden border border-[#40916c33]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #2d6a4f, #95d5b2)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CHARACTER COMPONENTS
// ══════════════════════════════════════════════════════════════
function Gloople({ mood, message, voiced = false }: { mood: GloopleM; message: string; voiced?: boolean }) {
  const imgMap: Record<GloopleM, string> = {
    neutral:  "/images/swamp/gloople-neutral.png",
    excited:  "/images/swamp/gloople-excited.png",
    panicked: "/images/swamp/gloople-panicked.png",
    happy:    "/images/swamp/gloople-happy.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]}
      name="🟣 Gloople"
      nameColor="text-[#95d5b2]"
      borderColor="border-[#40916c44]"
      bg="bg-[#071a10]"
      message={message}
      voiced={voiced}
      onSpeak={() => speak(message.replace(/<[^>]*>/g, ""), "gloople")}
    />
  );
}

function Fangsley({ mood, message, voiced = false }: { mood: FangsleyM; message: string; voiced?: boolean }) {
  const imgMap: Record<FangsleyM, string> = {
    neutral:  "/images/swamp/fangsley-neutral.png",
    tiny:     "/images/swamp/fangsley-tiny.png",
    restored: "/images/swamp/fangsley-restored.png",
    snarky:   "/images/swamp/fangsley-snarky.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]}
      name="🦷 Fangsley"
      nameColor="text-[#b7e4c7]"
      borderColor="border-[#52b78833]"
      bg="bg-[#071510]"
      message={message}
      voiced={voiced}
      onSpeak={() => speak(message.replace(/<[^>]*>/g, ""), "fangsley")}
    />
  );
}

function Bloop({ mood, message, voiced = false }: { mood: BloopM; message: string; voiced?: boolean }) {
  const imgMap: Record<BloopM, string> = {
    neutral:    "/images/swamp/bloop-neutral.png",
    approving:  "/images/swamp/bloop-approving.png",
    explaining: "/images/swamp/bloop-explaining.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]}
      name="🟡 Bloop"
      nameColor="text-[#d8f3dc]"
      borderColor="border-[#74c69d33]"
      bg="bg-[#0d1f0a]"
      message={message}
      voiced={voiced}
      onSpeak={() => speak(message.replace(/<[^>]*>/g, ""), "bloop")}
    />
  );
}

function CharacterBubble({
  img, name, nameColor, borderColor, bg, message, voiced, onSpeak
}: {
  img: string; name: string; nameColor: string; borderColor: string;
  bg: string; message: string; voiced: boolean; onSpeak: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`flex items-start gap-4 ${bg} border ${borderColor} rounded-2xl p-5 mb-5`}
    >
      <motion.img
        src={img}
        alt={name}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="w-20 h-20 object-contain flex-shrink-0 rounded-xl"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className={`text-xs font-bold tracking-widest uppercase ${nameColor}`}>{name}</p>
          {voiced && (
            <button
              onClick={onSpeak}
              className="text-[#74c69d66] hover:text-[#74c69d] transition-colors text-sm"
              title="Hear this line"
            >
              🔊
            </button>
          )}
        </div>
        <motion.p
          key={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-[#d8f3dc] text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════════════════════════════
function SwampCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-[#0d2218] border border-[#40916c33] rounded-2xl p-6 mb-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MathBox({ label, equation }: { label: string; equation: string }) {
  return (
    <div className="bg-[#071a10] border-2 border-[#52b788] rounded-xl p-5 my-4 text-center">
      <p className="text-[#74c69d] text-xs font-bold tracking-widest uppercase mb-3">{label}</p>
      <p
        className="text-[#d8f3dc] font-mono font-black tracking-widest"
        style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
        dangerouslySetInnerHTML={{ __html: equation }}
      />
    </div>
  );
}

function RuleCard({ icon, title, rule, color }: { icon: string; title: string; rule: string; color: string }) {
  return (
    <div className={`bg-[#071510] border ${color} rounded-xl p-4`}>
      <p className="text-lg mb-1">{icon}</p>
      <p className="text-[#d8f3dc] text-sm font-bold mb-1">{title}</p>
      <p className="text-[#74c69d] text-xs leading-relaxed">{rule}</p>
    </div>
  );
}

function GreenBtn({ onClick, children, disabled = false }: {
  onClick: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="px-8 py-3 rounded-full font-bold text-sm tracking-widest text-[#071510] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ background: "linear-gradient(135deg, #2d6a4f, #95d5b2, #2d6a4f)" }}
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
      className="px-8 py-3 rounded-full text-sm tracking-widest border border-[#40916c55] text-[#74c69d] hover:border-[#74c69d] hover:text-[#95d5b2] transition-all cursor-pointer bg-transparent font-bold"
    >
      {children}
    </motion.button>
  );
}

function HintBubble({ who, text }: { who: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#071a10] border border-[#40916c55] rounded-xl p-4 mt-3 text-[#b7e4c7] text-sm leading-relaxed"
    >
      <span className="font-bold">{who}:</span> &ldquo;{text}&rdquo;
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#40916c33]" />
      <div className="w-2 h-2 bg-[#40916c44] rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#40916c33]" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PRINT WORKSHEET
// ══════════════════════════════════════════════════════════════
function printWorksheet() {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>The Shrinking Potion — Decoder Worksheet</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Nunito:wght@400;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Nunito',sans-serif;background:white;color:#111;padding:24px;max-width:800px;margin:0 auto;}
  h1{font-family:'Creepster',cursive;font-size:1.8rem;color:#1b4332;letter-spacing:1px;margin-bottom:4px;}
  .sub{font-size:0.85rem;color:#555;margin-bottom:6px;}
  .name-line{font-size:0.85rem;color:#333;margin-bottom:16px;}
  .rules{background:#f0faf4;border:1px solid #40916c;border-radius:8px;padding:14px;margin-bottom:20px;}
  .rules h2{font-size:0.8rem;font-weight:800;color:#1b4332;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;}
  .rule{font-size:0.82rem;color:#333;margin-bottom:6px;padding-left:4px;line-height:1.5;}
  .problems{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
  .problem{border:1px solid #ccc;border-radius:8px;padding:14px;background:#fafafa;}
  .prob-label{font-size:0.72rem;font-weight:800;color:#40916c;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;}
  .equation{font-size:1.2rem;font-weight:800;font-family:'Courier New',monospace;color:#111;margin-bottom:10px;}
  .work-area{border-bottom:1px solid #ddd;height:52px;margin-bottom:8px;}
  .answer-line{font-size:0.8rem;color:#666;}
  .answer-line span{display:inline-block;border-bottom:1px solid #333;min-width:44px;margin-left:4px;}
  .cipher-note{background:#fff8e7;border:2px solid #f4a261;border-radius:8px;padding:14px;text-align:center;font-size:0.85rem;line-height:1.7;}
  .seq-row{display:flex;gap:8px;justify-content:center;margin-top:10px;}
  .seq-box{border:1px solid #333;border-radius:4px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;font-weight:800;font-family:'Courier New',monospace;font-size:0.9rem;}
  .ans-row{display:flex;gap:8px;justify-content:center;margin-top:8px;}
  .ans-box{border-bottom:2px solid #333;width:38px;height:28px;}
</style>
</head>
<body>
<h1>🧪 The Shrinking Potion — Decoder Worksheet</h1>
<div class="sub">Gloomberry Swamp &nbsp;|&nbsp; Algebra + Order of Operations &nbsp;|&nbsp; Independent Practice</div>
<div class="name-line">Name: _________________________________ &nbsp;&nbsp; Date: _______________</div>
<div class="rules">
  <h2>📋 Remember Your Three Rules</h2>
  <div class="rule">🟣 <strong>Please Excuse My Dear Aunt Sally (PMDAS)</strong> — Parentheses first → Multiply/Divide → Add/Subtract. When SOLVING, undo operations in REVERSE order.</div>
  <div class="rule">🦷 <strong>Equal Rights</strong> — Whatever you do to one side of the equation, you MUST do to the other side. Always.</div>
  <div class="rule">🟡 <strong>Keep It Isolated</strong> — Get the variable ALONE on one side. Peel away operations one at a time, outermost first.</div>
</div>
<div class="problems">
  <div class="problem">
    <div class="prob-label">Problem 1 → Letter M</div>
    <div class="equation">2x + 1 = 9</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 2 → Letter O</div>
    <div class="equation">3x − 2 = 19</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 3 → Letter O</div>
    <div class="equation">(x + 3) × 2 = 20</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 4 → Letter N</div>
    <div class="equation">x + 15 = 17</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 5 → Letter R</div>
    <div class="equation">4x − 5 = 15</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 6 → Letter O</div>
    <div class="equation">2x + x = 21</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 7 → Letter O</div>
    <div class="equation">(x − 1) × 3 = 18</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  <div class="problem">
    <div class="prob-label">Problem 8 → Letter T</div>
    <div class="equation">x ÷ 3 + 1 = 4</div>
    <div class="work-area"></div>
    <div class="answer-line">x = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
</div>
<div class="cipher-note">
  <strong>📜 Write your 8 answers in order, then return to the game!</strong><br/>
  Gloople's Decoder Scroll will turn your numbers into symbols.<br/>
  Drag the symbols into the antidote lock in order to save Fangsley!
  <div class="seq-row">
    <div class="seq-box">M</div><div class="seq-box">O</div><div class="seq-box">O</div><div class="seq-box">N</div>
    <div class="seq-box">R</div><div class="seq-box">O</div><div class="seq-box">O</div><div class="seq-box">T</div>
  </div>
  <div class="ans-row">
    <div class="ans-box"></div><div class="ans-box"></div><div class="ans-box"></div><div class="ans-box"></div>
    <div class="ans-box"></div><div class="ans-box"></div><div class="ans-box"></div><div class="ans-box"></div>
  </div>
</div>
<script>window.print(); window.close();<\/script>
</body></html>`);
  win.document.close();
}

// ══════════════════════════════════════════════════════════════
// CIPHER
// ══════════════════════════════════════════════════════════════
const CIPHER: Record<number, { sym: string; letter: string }> = {
  4: { sym: "🌙", letter: "M" },
  7: { sym: "🍄", letter: "O" },
  2: { sym: "⭐", letter: "N" },
  5: { sym: "🌿", letter: "R" },
  9: { sym: "💀", letter: "T" },
};
// M O O N R O O T = 4 7 7 2 5 7 7 9
const ANSWER_SEQ = [4, 7, 7, 2, 5, 7, 7, 9];
const SYM_SEQ = ANSWER_SEQ.map((n) => CIPHER[n].sym);
const LETTERS = ["M", "O", "O", "N", "R", "O", "O", "T"];

// ══════════════════════════════════════════════════════════════
// HINTS DATA
// ══════════════════════════════════════════════════════════════
const HINTS = {
  p1: {
    gloople: "No parentheses here — so Aunt Sally says work in order! But we're UNDOING, so go backwards. The +3 came last, so undo it first. Subtract 3 from both sides!",
    fangsley: "Equal Rights! That +3 on the left? Subtract 3 from BOTH sides to cancel it. Then you have 2x by itself. One more step.",
    bloop: "Two things on x's side: the ×2 and the +3. Peel the outermost off first. +3 is outermost. Subtract 3 from both sides, then divide by 2.",
  },
  p2: {
    gloople: "Three-x minus two equals nineteen. No parentheses! Undo the −2 first — add 2 to both sides. Then divide both sides by 3. Aunt Sally would approve!",
    fangsley: "Equal Rights! Add 2 to BOTH sides to cancel the −2. Then divide BOTH sides by 3. Fairness always wins.",
    bloop: "Isolate in two steps. Step 1: eliminate the −2 by adding 2 to both sides. Step 2: eliminate the ×3 by dividing both sides by 3.",
  },
  p3: {
    gloople: "Parentheses! Aunt Sally says parentheses come FIRST normally — but we're SOLVING, so undo from outside in. The ×2 wraps the whole group. Undo that first!",
    fangsley: "Equal Rights — divide both sides by 2 first. That unwraps the parentheses. Now you have x + 1 = 5. Then subtract 1 from BOTH sides.",
    bloop: "(x+1) is one chunk multiplied by 2. Undo the ×2 first: divide both sides by 2. Then isolate x inside: subtract 1 from both sides.",
  },
  p4: {
    gloople: "Three operations! PMDAS backwards: undo addition/subtraction FIRST, then multiplication/division, then parentheses. Start by undoing the −1 on the outside!",
    fangsley: "Three steps, Equal Rights each time. Step 1: add 1 to both sides. Step 2: divide both sides by 3. Step 3: subtract 2 from both sides. Every step — both sides!",
    bloop: "Peel from outside in. Outer layer: −1. Add 1 both sides → 3×(x+2)=15. Next: ×3. Divide both sides by 3 → x+2=5. Last: subtract 2.",
  },
};

// ══════════════════════════════════════════════════════════════
// SCENE 1 — INTRO (voiced)
// ══════════════════════════════════════════════════════════════
function Scene1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Gloople
        mood="panicked"
        voiced
        message="HE DID IT AGAIN. Fangsley was experimenting with a new potion and mixed up the order of operations in the formula — the whole thing backfired and now—"
      />
      <Fangsley
        mood="tiny"
        voiced
        message="I am FINE. Completely fine. I just need someone to solve four algebra equations to rebuild the antidote formula. And possibly a ladder. Mostly the equations."
      />
      <Bloop
        mood="explaining"
        voiced
        message="The antidote has a secret final ingredient — MOONROOT. Its location is encoded. Solve the four guided problems first. Then you'll get a worksheet with eight decoder problems. Bring back your answers and we'll give you the cipher."
      />

      <SwampCard>
        <h2 className="text-[#95d5b2] text-lg font-bold mb-4 pb-3 border-b border-[#40916c22]">
          📋 Your Three Rules
        </h2>
        <p className="text-[#b7e4c7] text-sm mb-4 leading-relaxed">
          Gloople hands you three reference cards. <em>&ldquo;Use us if you get stuck. We&rsquo;re literally right here.&rdquo;</em>
        </p>
        <div className="grid grid-cols-1 gap-3">
          <RuleCard
            icon="🟣"
            title="Please Excuse My Dear Aunt Sally (PMDAS)"
            rule="Parentheses first → Multiply/Divide → Add/Subtract. When SOLVING an equation, undo operations in REVERSE order."
            color="border-[#95d5b233]"
          />
          <RuleCard
            icon="🦷"
            title="Equal Rights"
            rule="Whatever you do to one side of the equation, you MUST do to the other side. Always. Non-negotiable. Fangsley is very serious about this."
            color="border-[#52b78833]"
          />
          <RuleCard
            icon="🟡"
            title="Keep It Isolated"
            rule="Get the variable ALONE on one side. Peel away operations one at a time — outermost first."
            color="border-[#74c69d33]"
          />
        </div>
      </SwampCard>

      <div className="text-center">
        <GreenBtn onClick={onNext}>🧪 Let&apos;s Fix Fangsley →</GreenBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// GUIDED PROBLEM SCENE
// ══════════════════════════════════════════════════════════════
type ProblemConfig = {
  tag: string;
  eq: string;
  ans: number;
  next: string;
  intro: { char: "gloople" | "fangsley" | "bloop"; mood: GloopleM | FangsleyM | BloopM; text: string };
  correct: { char: "gloople" | "fangsley" | "bloop"; mood: GloopleM | FangsleyM | BloopM; text: string };
  wrong: { char: "gloople" | "fangsley" | "bloop"; mood: GloopleM | FangsleyM | BloopM; text: string };
};

const PROBLEMS: Record<string, ProblemConfig> = {
  p1: {
    tag: "Guided Problem 1 of 4",
    eq: "2x + 3 = 11",
    ans: 4,
    next: "p2",
    intro: { char: "bloop", mood: "explaining", text: "The quantity for the first antidote ingredient is encoded. Solve for x." },
    correct: { char: "gloople", mood: "excited", text: "x = 4! First ingredient measured! ONE VIAL FILLED!" },
    wrong: { char: "fangsley", mood: "snarky", text: "That's not right. Equal Rights — whatever you do to one side, do to the other. I have literally nothing to do down here except watch you think. Try again." },
  },
  p2: {
    tag: "Guided Problem 2 of 4",
    eq: "3x − 2 = 19",
    ans: 7,
    next: "p3",
    intro: { char: "bloop", mood: "explaining", text: "Two operations this time. Undo them in reverse order — last operation added is first to leave." },
    correct: { char: "gloople", mood: "excited", text: "SEVEN! The second vial fills! TWO DOWN! Fangsley, can you feel it building?" },
    wrong: { char: "gloople", mood: "panicked", text: "Aunt Sally, Aunt Sally, Aunt Sally! No parentheses here, so when UNDOING — go backwards! Undo the subtraction first, THEN the multiplication." },
  },
  p3: {
    tag: "Guided Problem 3 of 4",
    eq: "(x + 1) × 2 = 10",
    ans: 4,
    next: "p4",
    intro: { char: "fangsley", mood: "tiny", text: "PARENTHESES! Remember Aunt Sally! But when SOLVING — you undo from the OUTSIDE in! The times two is wrapping everything. Deal with it first!" },
    correct: { char: "bloop", mood: "approving", text: "Outside first, then inside. You have completely got it." },
    wrong: { char: "bloop", mood: "explaining", text: "The parentheses make (x+1) one chunk. Treat it as a unit. The ×2 is on the outside, wrapping the whole chunk. Undo that first: divide both sides by 2. Then look inside." },
  },
  p4: {
    tag: "Guided Problem 4 of 4 — The Big One",
    eq: "3 × (x + 2) − 1 = 14",
    ans: 3,
    next: "cliffhanger",
    intro: { char: "gloople", mood: "neutral", text: "Three operations. PMDAS. Equal Rights. Keep It Isolated. You have all three rules. You can absolutely do this." },
    correct: { char: "gloople", mood: "happy", text: "A crack of thunder shakes the swamp — all four vials ignite at once! The antidote glows brilliant green. Fangsley starts growing... four inches... six... eight... then stops cold at five inches tall." },
    wrong: { char: "bloop", mood: "explaining", text: "Three steps, outside in. Step 1: undo the −1 — add 1 to both sides. Step 2: undo the ×3 — divide both sides by 3. Step 3: undo the +2 — subtract 2 from both sides. Slow. Steady. Isolated." },
  },
};

function GuidedProblemScene({
  pid,
  onNext,
}: {
  pid: "p1" | "p2" | "p3" | "p4";
  onNext: () => void;
}) {
  const p = PROBLEMS[pid];
  const hints = HINTS[pid];
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [activeHint, setActiveHint] = useState<"gloople" | "fangsley" | "bloop" | null>(null);
  const [locked, setLocked] = useState(false);

  const checkAnswer = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;
    if (val === p.ans) {
      setFeedback("correct");
      setLocked(true);
    } else {
      setFeedback("wrong");
    }
  }, [inputVal, p.ans]);

  const IntroChar = p.intro.char === "gloople"
    ? <Gloople mood={p.intro.mood as GloopleM} message={p.intro.text} />
    : p.intro.char === "fangsley"
    ? <Fangsley mood={p.intro.mood as FangsleyM} message={p.intro.text} />
    : <Bloop mood={p.intro.mood as BloopM} message={p.intro.text} />;

  const CorrectChar = p.correct.char === "gloople"
    ? <Gloople mood={p.correct.mood as GloopleM} message={p.correct.text} />
    : p.correct.char === "fangsley"
    ? <Fangsley mood={p.correct.mood as FangsleyM} message={p.correct.text} />
    : <Bloop mood={p.correct.mood as BloopM} message={p.correct.text} />;

  const WrongChar = p.wrong.char === "gloople"
    ? <Gloople mood={p.wrong.mood as GloopleM} message={p.wrong.text} />
    : p.wrong.char === "fangsley"
    ? <Fangsley mood={p.wrong.mood as FangsleyM} message={p.wrong.text} />
    : <Bloop mood={p.wrong.mood as BloopM} message={p.wrong.text} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="inline-block bg-[#071510] border border-[#40916c55] rounded-full px-4 py-1 mb-4">
        <span className="text-[#74c69d] text-xs font-bold tracking-widest uppercase">{p.tag}</span>
      </div>

      {IntroChar}

      <MathBox label="🔬 Solve for x" equation={p.eq} />

      <SwampCard>
        <label className="text-[#74c69d] text-sm font-bold tracking-wider uppercase block mb-3">
          Your Answer: x =
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); setFeedback(null); }}
            onKeyDown={(e) => { if (e.key === "Enter") checkAnswer(); }}
            disabled={locked}
            placeholder="?"
            className="bg-[#071510] border-2 border-[#40916c] rounded-xl px-4 py-3 text-[#d8f3dc] font-mono font-black text-2xl w-28 text-center outline-none focus:border-[#95d5b2] transition-colors disabled:opacity-60"
          />
          {!locked && (
            <GreenBtn onClick={checkAnswer}>Check →</GreenBtn>
          )}
        </div>

        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              {CorrectChar}
              <div className="text-center mt-4">
                <GreenBtn onClick={onNext}>Continue →</GreenBtn>
              </div>
            </motion.div>
          )}
          {feedback === "wrong" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              {WrongChar}
            </motion.div>
          )}
        </AnimatePresence>
      </SwampCard>

      <Divider />

      <SwampCard>
        <p className="text-[#74c69d99] text-xs font-bold tracking-widest uppercase mb-3">
          🆘 Ask for a hint
        </p>
        <div className="flex gap-2 flex-wrap mb-3">
          {(["gloople", "fangsley", "bloop"] as const).map((who) => (
            <button
              key={who}
              onClick={() => setActiveHint((prev) => (prev === who ? null : who))}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                activeHint === who
                  ? "border-[#52b788] bg-[#0d2218] text-[#95d5b2]"
                  : "border-[#2d6a4f] bg-[#071510] text-[#74c69d] hover:border-[#52b788]"
              }`}
            >
              {who === "gloople" ? "🟣 Ask Gloople" : who === "fangsley" ? "🦷 Ask Fangsley" : "🟡 Ask Bloop"}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {activeHint && (
            <HintBubble
              who={activeHint === "gloople" ? "🟣 Gloople" : activeHint === "fangsley" ? "🦷 Fangsley" : "🟡 Bloop"}
              text={hints[activeHint]}
            />
          )}
        </AnimatePresence>
      </SwampCard>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE — CLIFFHANGER
// ══════════════════════════════════════════════════════════════
function SceneCliffhanger({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center bg-[#0d2218] border-2 border-[#ffd16644] rounded-2xl p-8 mb-5"
      >
        <div className="text-5xl mb-4">🦷⁉️</div>
        <h2
          className="text-2xl font-bold tracking-widest mb-4"
          style={{ color: "#ffd166", textShadow: "0 0 20px #ffd16655", fontFamily: "var(--font-creepster, cursive)" }}
        >
          THE ANTIDOTE STOPPED!
        </h2>
        <p className="text-[#d8f3dc] leading-relaxed text-base">
          Fangsley is stuck at five inches. All four practice vials are glowing — but the antidote is missing its final ingredient.
        </p>
      </motion.div>

      <Bloop
        mood="explaining"
        voiced
        message="The final ingredient is MOONROOT. But the harvest coordinates are encoded. They're hidden in eight algebra equations on the worksheet. Solve them on your own — no hints this time."
      />
      <Gloople
        mood="panicked"
        voiced
        message="Solve all eight problems. Each answer is a single number. Write them down. Then come back and I'll hand you the Decoder Scroll!"
      />
      <Fangsley
        mood="tiny"
        voiced
        message="I am waiting patiently. I am completely fine. Please hurry."
      />

      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          onClick={printWorksheet}
          className="px-8 py-4 rounded-full font-black text-sm tracking-widest text-[#071510] cursor-pointer transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ffd166, #f4a261)" }}
        >
          🖨️ Print the Decoder Worksheet
        </button>
        <GhostBtn onClick={onContinue}>
          🔢 I finished the worksheet — show me the decoder →
        </GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE — CODE ENTRY (drag & drop)
// ══════════════════════════════════════════════════════════════
function SceneCodeEntry({ onSuccess }: { onSuccess: () => void }) {
  const [slotContents, setSlotContents] = useState<(string | null)[]>(Array(8).fill(null));
  const [bankSyms, setBankSyms] = useState<string[]>([...new Set(Object.values(CIPHER).map((c) => c.sym))]);
  const [draggedSym, setDraggedSym] = useState<string | null>(null);
  const [dragFromSlot, setDragFromSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uniqueEntries = Object.entries(CIPHER);

  // Place sym into slot
  const placeInSlot = (idx: number, sym: string) => {
    setSlotContents((prev) => {
      const next = [...prev];
      // return old sym to bank if slot was filled
      if (next[idx]) {
        setBankSyms((b) => [...b, next[idx]!]);
      }
      next[idx] = sym;
      return next;
    });
    setBankSyms((b) => {
      const i = b.indexOf(sym);
      if (i === -1) return b;
      return [...b.slice(0, i), ...b.slice(i + 1)];
    });
    setError(null);
  };

  const clearSlot = (idx: number) => {
    const sym = slotContents[idx];
    if (!sym) return;
    setSlotContents((prev) => { const n = [...prev]; n[idx] = null; return n; });
    setBankSyms((b) => [...b, sym]);
    setError(null);
  };

  // Drag from bank
  const onBankDragStart = (sym: string) => {
    setDraggedSym(sym);
    setDragFromSlot(null);
  };

  // Drag from slot
  const onSlotDragStart = (idx: number) => {
    const sym = slotContents[idx];
    if (!sym) return;
    setDraggedSym(sym);
    setDragFromSlot(idx);
  };

  const onDropSlot = (idx: number) => {
    if (!draggedSym) return;
    if (dragFromSlot !== null) {
      // clear the source slot first
      setSlotContents((prev) => { const n = [...prev]; n[dragFromSlot] = null; return n; });
    }
    placeInSlot(idx, draggedSym);
    setDraggedSym(null);
    setDragFromSlot(null);
  };

  const onDropBank = () => {
    if (dragFromSlot !== null && draggedSym) {
      clearSlot(dragFromSlot);
    }
    setDraggedSym(null);
    setDragFromSlot(null);
  };

  const checkCode = () => {
    if (slotContents.includes(null)) {
      setError("Fill all 8 slots first!");
      return;
    }
    const correct = slotContents.every((sym, i) => sym === SYM_SEQ[i]);
    if (correct) {
      onSuccess();
    } else {
      setError("The antidote fizzled... something is off in the sequence. Check your worksheet answers and try again!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Gloople
        mood="excited"
        voiced
        message="You're back! Okay okay okay — here's the Decoder Scroll! Each answer number from your worksheet maps to a symbol. Find your symbols in the bank and drag them into the antidote lock in order!"
      />

      {/* Decoder Scroll */}
      <SwampCard className="border-[#ffd16644]">
        <h3 className="text-center font-bold text-[#ffd166] tracking-widest mb-4 text-sm uppercase">
          📜 Gloople&apos;s Decoder Scroll
        </h3>
        <div className="flex gap-3 flex-wrap justify-center">
          {uniqueEntries.map(([num, { sym }]) => (
            <div key={num} className="bg-[#071510] border border-[#40916c] rounded-xl p-3 text-center min-w-[60px]">
              <p className="font-mono font-black text-[#95d5b2] text-lg">{num}</p>
              <p className="text-[#74c69d66] text-xs my-1">↓</p>
              <p className="text-2xl">{sym}</p>
            </div>
          ))}
        </div>
      </SwampCard>

      {/* Symbol Bank */}
      <SwampCard>
        <p className="text-[#74c69d] text-xs font-bold tracking-widest uppercase mb-3 text-center">
          🧪 Symbol Bank — drag your symbols into the lock
        </p>
        <div
          className="flex gap-3 flex-wrap justify-center p-4 bg-[#071510] rounded-xl border border-[#2d6a4f44] min-h-[70px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropBank}
        >
          {bankSyms.map((sym, i) => (
            <motion.div
              key={`${sym}-${i}`}
              draggable
              onDragStart={() => onBankDragStart(sym)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0d2218] border-2 border-[#40916c] rounded-xl px-4 py-2 text-2xl cursor-grab active:cursor-grabbing select-none"
            >
              {sym}
            </motion.div>
          ))}
          {bankSyms.length === 0 && (
            <p className="text-[#40916c55] text-xs self-center">All symbols placed!</p>
          )}
        </div>
      </SwampCard>

      {/* Antidote Lock Slots */}
      <SwampCard>
        <p className="text-[#74c69d] text-xs font-bold tracking-widest uppercase mb-4 text-center">
          🔒 Antidote Lock — M · O · O · N · R · O · O · T
        </p>
        <div className="flex gap-2 justify-center flex-wrap mb-2">
          {LETTERS.map((letter, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDropSlot(i)}
                onClick={() => clearSlot(i)}
                whileHover={{ scale: 1.05 }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 cursor-pointer transition-all select-none ${
                  slotContents[i]
                    ? "border-[#52b788] bg-[#0d2218]"
                    : "border-dashed border-[#40916c55] bg-[#071510]"
                }`}
                title={slotContents[i] ? "Click to remove" : "Drop here"}
              >
                {slotContents[i] ? (
                  <span draggable onDragStart={() => onSlotDragStart(i)}>{slotContents[i]}</span>
                ) : (
                  <span className="text-[#40916c33] text-xs font-mono">?</span>
                )}
              </motion.div>
              <span className="text-[#52b78866] text-xs font-mono font-bold">{letter}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#40916c55] text-xs mt-2">Tap a filled slot to remove a symbol</p>
      </SwampCard>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#2a0d0d] border border-[#d6282855] rounded-xl p-4 mb-4 text-[#ffb3b3] text-sm text-center font-bold"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <button
          onClick={checkCode}
          className="px-8 py-4 rounded-full font-black text-sm tracking-widest text-[#071510] cursor-pointer transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ffd166, #f4a261)" }}
        >
          🧪 Pour the Antidote!
        </button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE — WIN
// ══════════════════════════════════════════════════════════════
function SceneWin({ correctCount, hintsUsed, onRestart }: {
  correctCount: number;
  hintsUsed: number;
  onRestart: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="text-center bg-[#0d2218] border-2 border-[#52b78855] rounded-2xl p-10 mb-5"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          🦷
        </motion.div>
        <h2
          className="text-3xl font-bold tracking-widest mb-4"
          style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16677" }}
        >
          FANGSLEY IS RESTORED!
        </h2>
        <p className="text-[#d8f3dc] text-base leading-relaxed">
          The antidote pours over Fangsley in a cascade of brilliant green light.
          Three inches... six... one foot... two feet... <em>full size.</em>
        </p>
      </motion.div>

      <Fangsley
        mood="restored"
        voiced
        message="I AM BACK. Full height. Full teeth. Full dignity. I was never worried."
      />
      <Gloople
        mood="happy"
        voiced
        message="You decoded MOONROOT AND solved all four guided equations. You're basically a swamp scientist at this point."
      />
      <Bloop
        mood="approving"
        message="PMDAS. Equal Rights. Keep It Isolated. Three rules. One restored monster. Excellent work."
      />

      <SwampCard>
        <h3 className="text-[#95d5b2] text-base font-bold mb-4 pb-3 border-b border-[#40916c22]">
          📚 What You Practiced Today
        </h3>
        {[
          "PMDAS — operations have an order, and undoing them means working in reverse.",
          "Equal Rights — every operation applied to one side must be applied to the other.",
          "Keep It Isolated — peel operations off the variable one at a time, outermost first.",
          "Two-step equations like 3×(x+2)−1=14 are just multiple Equal Rights moves stacked.",
        ].map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="text-[#b7e4c7] text-sm leading-relaxed mb-2"
          >
            ✦ {item}
          </motion.p>
        ))}

        <Divider />

        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { val: `${correctCount}/4`, lbl: "Guided Correct" },
            { val: hintsUsed, lbl: "Hints Used" },
            { val: "✅", lbl: "MOONROOT Decoded" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#071510] border border-[#40916c] rounded-xl px-5 py-3 text-center">
              <p className="text-[#95d5b2] text-xl font-black">{val}</p>
              <p className="text-[#52b788] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
      </SwampCard>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GhostBtn onClick={onRestart}>↺ Play Again</GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
type SceneId = "intro" | "p1" | "p2" | "p3" | "p4" | "cliffhanger" | "code" | "win";

export default function MathLesson1() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [correctCount, setCorrectCount] = useState(0);
  const [hintsUsed] = useState(0);
  const TOTAL_SCENES = 8;

  const sceneIndex: Record<SceneId, number> = {
    intro: 1, p1: 2, p2: 3, p3: 4, p4: 5, cliffhanger: 6, code: 7, win: 8,
  };

  const go = (s: SceneId) => setScene(s);

  const handleProblemCorrect = (nextScene: SceneId) => {
    setCorrectCount((c) => c + 1);
    go(nextScene);
  };

  const handleWin = useCallback(() => {
    go("win");
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "math-lesson-1",
      subject: "Math",
      unit: "Algebra Foundations",
      teks: "4.5A",
      score: correctCount,
      totalQuestions: 4,
    }).catch((err) => console.error("Progress save failed:", err));
  }, [correctCount]);

  const restart = () => {
    setScene("intro");
    setCorrectCount(0);
  };

  return (
    <main className="min-h-screen text-[#d8f3dc] overflow-x-hidden"
      style={{ background: "radial-gradient(ellipse at 20% 60%, #0a2a0a, transparent 55%), radial-gradient(ellipse at 80% 20%, #0a1a2e, transparent 50%), #0a1628" }}
    >
      <SwampBubbles />

      {/* Top rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#40916c] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#74c69d66] uppercase font-bold mb-1">
            Dracos Academy · Math · Algebra Foundations
          </p>
          <h1
            className="text-2xl font-black text-[#95d5b2] mb-1 tracking-wide"
            style={{ textShadow: "0 0 20px #40916c88" }}
          >
            🧪 The Shrinking Potion
          </h1>
          <p className="text-[#74c69d66] text-sm italic">
            Math Lesson 1 · TEKS 4.5A · Equations &amp; Order of Operations
          </p>
        </div>

        {/* Print Worksheet Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={printWorksheet}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest border border-[#ffd16644] text-[#ffd166] hover:border-[#ffd166] hover:bg-[#ffd16611] transition-all cursor-pointer bg-transparent"
          >
            🖨️ Print Worksheet
          </button>
        </div>

        <ProgressBar scene={sceneIndex[scene]} total={TOTAL_SCENES} />

        <AnimatePresence mode="wait">
          <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {scene === "intro" && <Scene1 onNext={() => go("p1")} />}
            {scene === "p1" && (
              <GuidedProblemScene pid="p1" onNext={() => handleProblemCorrect("p2")} />
            )}
            {scene === "p2" && (
              <GuidedProblemScene pid="p2" onNext={() => handleProblemCorrect("p3")} />
            )}
            {scene === "p3" && (
              <GuidedProblemScene pid="p3" onNext={() => handleProblemCorrect("p4")} />
            )}
            {scene === "p4" && (
              <GuidedProblemScene pid="p4" onNext={() => handleProblemCorrect("cliffhanger")} />
            )}
            {scene === "cliffhanger" && <SceneCliffhanger onContinue={() => go("code")} />}
            {scene === "code" && <SceneCodeEntry onSuccess={handleWin} />}
            {scene === "win" && <SceneWin correctCount={correctCount} hintsUsed={hintsUsed} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#40916c] to-transparent relative z-10 mt-8" />
    </main>
  );
}