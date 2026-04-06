// src/app/kyliana/science/lesson-4/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLessonProgress } from "@/lib/progress";
import Link from "next/link";

type AxoMood = "neutral" | "excited" | "thinking" | "surprised" | "proud" | "encouraging";

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
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] text-[#c9a84c] uppercase mb-2">✦ Axo the Explorer</p>
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

function Pronounce({ word }: { word: string }) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = { current: null as HTMLAudioElement | null };

  const speak = async () => {
    if (speaking || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/pronounce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current && audioRef.current.pause();
      setSpeaking(true);
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => setSpeaking(false);
      audio.play();
    } catch (err) {
      console.error("Pronounce error:", err);
      setSpeaking(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={speak}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-[family-name:var(--font-cinzel)] border transition-all cursor-pointer ml-1 align-middle ${
        speaking ? "border-[#4caf7d] text-[#4caf7d] bg-[#4caf7d11]"
        : loading ? "border-[#c9a84c33] text-[#c9a84c55] bg-transparent"
        : "border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] bg-transparent"
      }`}
    >
      {loading ? "⏳" : speaking ? "🔊" : "🔉"}
    </motion.button>
  );
}

function VocabTerm({ word, children }: { word: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-0.5 flex-wrap">
      <strong className="text-[#f5e199]">{children}</strong>
      <Pronounce word={word} />
    </span>
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
// SCENE 1 — WARM UP
// ══════════════════════════════════════════════════════════════
const WARMUP_QUESTIONS = [
  {
    q: "In Lesson 3, we learned that a plant's stem grows toward light. What is this called?",
    options: ["Gravitropism", "Hydrotropism", "Phototropism", "Transpiration"],
    correct: 2,
  },
  {
    q: "Which plant hormone controls tropisms by making cells grow longer?",
    options: ["Chlorophyll", "Glucose", "Stomata", "Auxin"],
    correct: 3,
  },
  {
    q: "From Lesson 2 — which tube carries water UP from the roots to the leaves?",
    options: ["Phloem", "Stomata", "Petiole", "Xylem"],
    correct: 3,
  },
];

function Scene1({ onNext }: { onNext: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(3).fill(null));
  const [checked, setChecked] = useState(false);

  const allAnswered = answers.every(a => a !== null);
  const score = answers.filter((a, i) => a === WARMUP_QUESTIONS[i].correct).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Good morning, Detective! 🌿 Before we dive into today's mystery, let's make sure our science knowledge is still sharp!<br/><br/>Three quick warm-up questions from our last lessons. No pressure — this is just to get your brain warmed up!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔥 Warm-Up: What Do You Remember?
        </h2>
        {WARMUP_QUESTIONS.map((q, qi) => {
          const chosen = answers[qi];
          const isCorrect = chosen === q.correct;
          return (
            <div key={qi} className="mb-5 pb-5 border-b border-[#c9a84c11] last:border-0 last:mb-0 last:pb-0">
              <p className="text-[#f5e199] text-base font-[family-name:var(--font-crimson)] mb-2">{qi + 1}. {q.q}</p>
              <div className="space-y-1">
                {q.options.map((opt, oi) => {
                  let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                  if (checked) {
                    if (oi === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                    else if (oi === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                    else style = "border-[#c9a84c22] text-[#f5e199cc]";
                  } else if (chosen === oi) {
                    style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => {
                        if (checked) return;
                        setAnswers(prev => { const next = [...prev]; next[qi] = oi; return next; });
                      }}
                      disabled={checked}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!checked ? (
          <div className="text-center mt-4">
            <motion.button
              whileHover={{ scale: allAnswered ? 1.02 : 1 }}
              onClick={() => setChecked(true)}
              disabled={!allAnswered}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check Answers ✦
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-xl text-sm text-center font-[family-name:var(--font-cinzel)] ${
              score === 3 ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
              : score >= 2 ? "bg-[#c9a84c11] border border-[#c9a84c33] text-[#c9a84c]"
              : "bg-[#e24b4a11] border border-[#e24b4a33] text-[#e24b4acc]"
            }`}
          >
            {score === 3 ? "✦ Perfect warm-up! Your science knowledge is locked in!" :
             score === 2 ? "✦ Good recall! Review any you missed before we continue." :
             "Take a quick look at the highlighted answers — review helps them stick!"}
          </motion.div>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!checked}>
          {checked ? "Let's Begin! →" : "Answer all questions first"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 2 — EXPERIMENT FOLLOW-UP + INTRO
// ══════════════════════════════════════════════════════════════
function Scene2({ onNext }: { onNext: () => void }) {
  const [observation, setObservation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Wait — before we go further! In Lesson 3 I gave you two experiments to try at home. Did you try the phototropism plant experiment? 🌱<br/><br/>Tell me what you observed — even if you didn't get to try it, make a prediction about what you think would have happened!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔬 Field Observation Report
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">The Experiment</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            You placed a plant near a window for 3-5 days, then rotated it 180°. What happened to the plant's direction of growth?
          </p>
        </div>
        <textarea
          value={observation}
          onChange={e => setObservation(e.target.value)}
          disabled={submitted}
          placeholder="What did you observe or predict? Did the plant lean toward the window? What happened when you rotated it?"
          rows={4}
          className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-xl px-4 py-3 text-[#f5e199] text-base font-[family-name:var(--font-crimson)] leading-relaxed focus:outline-none focus:border-[#c9a84c] resize-none mb-4 placeholder-[#c9a84c44]"
        />
        {!submitted ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: observation.length > 10 ? 1.02 : 1 }}
              onClick={() => setSubmitted(true)}
              disabled={observation.length < 10}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Submit Observation ✦
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#4caf7d11] border border-[#4caf7d33] rounded-xl p-4"
          >
            <p className="text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm mb-2">✦ Observation logged!</p>
            <p className="text-[#f5e199cc] text-sm font-[family-name:var(--font-crimson)] leading-relaxed">
              What you likely saw: the plant leaned toward the window (phototropism!). After rotating, the plant would slowly begin leaning back toward the light — auxin redistributing on the new shaded side. Science in action! 🌱
            </p>
          </motion.div>
        )}
      </Card>

      <Axo
        mood="surprised"
        message="Today we're going even DEEPER into our mystery plant — not just looking at its outside parts, but going <strong>inside</strong> the plant itself! 🔬<br/><br/>We already know about xylem and phloem from Lesson 2. Today we're going to understand HOW they actually work at the cellular level — and discover the other incredible structures inside plant cells!<br/><br/>Grab your microscope — we're going in!"
      />

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!submitted}>
          {submitted ? "Go Inside the Plant! 🔬" : "Submit your observation first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 3 — VIDEO
// ══════════════════════════════════════════════════════════════
function VideoQuiz({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [checked, setChecked] = useState(false);

  const questions = [
    {
      q: "According to the video, what two substances does xylem transport?",
      options: ["Sugar and oxygen", "Water and minerals", "Food and carbon dioxide", "Glucose and protein"],
      correct: 1,
    },
    {
      q: "What is the process called when phloem moves food from leaves to other parts of the plant?",
      options: ["Transpiration", "Photosynthesis", "Translocation", "Germination"],
      correct: 2,
    },
    {
      q: "In the video, where are the xylem and phloem located in a stem?",
      options: ["In the center of the stem", "Scattered randomly", "Clustered near the edge of the stem", "Only in the roots"],
      correct: 2,
    },
  ];

  const allAnswered = answers.every(a => a !== null);

  return (
    <Card>
      <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
        📺 Video Check-In
      </h2>
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const isCorrect = chosen === q.correct;
        return (
          <div key={qi} className="mb-4">
            <p className="text-[#f5e199] text-base font-[family-name:var(--font-crimson)] mb-2">{qi + 1}. {q.q}</p>
            <div className="space-y-1">
              {q.options.map((opt, oi) => {
                let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                if (checked) {
                  if (oi === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                  else if (oi === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                  else style = "border-[#c9a84c22] text-[#f5e199cc]";
                } else if (chosen === oi) {
                  style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                }
                return (
                  <button
                    key={oi}
                    onClick={() => {
                      if (checked) return;
                      setAnswers(prev => { const next = [...prev]; next[qi] = oi; return next; });
                    }}
                    disabled={checked}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      {!checked ? (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: allAnswered ? 1.02 : 1 }}
            onClick={() => { setChecked(true); onComplete(); }}
            disabled={!allAnswered}
            className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
          >
            Check Answers ✦
          </motion.button>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm mt-3"
        >
          ✦ Great watching! Now let's go even deeper!
        </motion.p>
      )}
    </Card>
  );
}

function Scene3({ onNext }: { onNext: () => void }) {
  const [videoChecked, setVideoChecked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="I found an incredible video that shows exactly what's happening INSIDE the plant when water and food travel through it! 🎬<br/><br/>Remember xylem and phloem from Lesson 2? This video shows you what they actually look like at the cellular level. Watch carefully — I'll ask you about it afterward!<br/><br/><em style='color:#c9a84c'>Listen for: vascular tissue, xylem, phloem, and translocation!</em>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎬 Axo's Science Lab: <span className="inline-flex items-center gap-1">Vascular <Pronounce word="vascular" /></span> Transport
        </h2>
        <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/DhyYtT1K844"
            title="Xylem and Phloem Transport in Plants"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-[#c9a84c99] text-xs font-[family-name:var(--font-cinzel)] text-center tracking-wider mb-2">
          Watch the full video then answer the questions below — listen for <span className="inline-flex items-center gap-1">translocation <Pronounce word="translocation" /></span>!
        </p>
      </Card>

      <Axo
        mood="thinking"
        message="Great watching! The video goes into some really advanced science — like tracheids and lignin. Those are <em style='color:#c9a84c'>bonus scientist knowledge</em> — you don't need to memorize them. Focus on xylem, phloem, and translocation. Now let's check what you caught!"
      />

      <VideoQuiz onComplete={() => setVideoChecked(true)} />

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!videoChecked}>
          {videoChecked ? "Continue →" : "Complete the video quiz first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 4 — VASCULAR TISSUE DEEP DIVE
// ══════════════════════════════════════════════════════════════
function Scene4({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});
  const [matchChecked, setMatchChecked] = useState(false);

  const toggle = (id: string) => setRevealed(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const vessels = [
    {
      id: "xylem",
      name: "Xylem",
      word: "xylem",
      color: "text-[#7d9fc9]",
      border: "border-[#7d9fc955]",
      bg: "bg-[#7d9fc911]",
      carries: "Water and minerals",
      direction: "UP — from roots to leaves",
      cells: "Dead hollow tube cells — no living contents, just empty tubes for water to flow through",
      analogy: "Like water pipes in your house — hollow tubes that carry water from one place to another",
      fact: "The wood in trees is mostly made of old xylem cells!",
    },
    {
      id: "phloem",
      name: "Phloem",
      word: "phloem",
      color: "text-[#c9a84c]",
      border: "border-[#c9a84c55]",
      bg: "bg-[#c9a84c11]",
      carries: "Sugar (glucose) and food",
      direction: "DOWN — from leaves to roots and other parts",
      cells: "Living cells with small holes (like a sieve) that allow food to pass through",
      analogy: "Like a food delivery system — taking the food made in the leaves to wherever the plant needs it",
      fact: "The sweet sap in maple trees that we make maple syrup from travels through phloem!",
    },
  ];

  const matchItems = [
    { id: "x1", structure: "Xylem", answer: "Carries water and minerals upward" },
    { id: "p1", structure: "Phloem", answer: "Carries sugar made in leaves downward" },
    { id: "x2", structure: "Xylem", answer: "Made of dead hollow tube cells" },
    { id: "p2", structure: "Phloem", answer: "The process it uses is called translocation" },
  ];

  const shuffledAnswers = [
    "Carries sugar made in leaves downward",
    "Made of dead hollow tube cells",
    "The process it uses is called translocation",
    "Carries water and minerals upward",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Now let's really understand what's happening inside those vascular tubes! 🔬<br/><br/>We know xylem carries water UP and phloem carries food DOWN. But HOW do they work? And what makes them different from each other?<br/><br/>Tap each one to investigate!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔬 Inside the <span className="inline-flex items-center gap-1">Vascular <Pronounce word="vascular" /></span> System
        </h2>
        <div className="space-y-3">
          {vessels.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              onClick={() => toggle(v.id)}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(v.id) ? `${v.border} ${v.bg}` : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className={`font-[family-name:var(--font-cinzel)] text-sm font-bold ${v.color}`}>{v.name}</p>
                    <Pronounce word={v.word} />
                  </div>
                  <p className="text-[#c9a84c99] text-xs">Carries: {v.carries} · Direction: {v.direction}</p>
                </div>
                <span className="text-[#c9a84c55] text-xs font-[family-name:var(--font-cinzel)]">
                  {revealed.has(v.id) ? "▲" : "▼ Tap"}
                </span>
              </div>
              <AnimatePresence>
                {revealed.has(v.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-2"
                  >
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🔬 Cell Structure</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed">{v.cells}</p>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🧠 Think of it like...</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed italic">{v.analogy}</p>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">💡 Cool Fact</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed italic">{v.fact}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          🔗 Match It: Xylem or Phloem?
        </h3>
        <p className="text-[#f5e199cc] text-xs mb-4 font-[family-name:var(--font-crimson)]">
          Tap a structure on the left, then tap its matching description on the right.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] text-center mb-2 tracking-wider uppercase">Structure</p>
            {matchItems.map(m => (
              <motion.button
                key={m.id}
                onClick={() => {
                  if (matchChecked) return;
                  setMatchAnswers(prev => ({ ...prev, selected: m.id }));
                }}
                className={`w-full text-center p-2 rounded-xl mb-2 text-xs font-[family-name:var(--font-cinzel)] border transition-all cursor-pointer ${
                  matchAnswers[m.id]
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : matchAnswers.selected === m.id
                    ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199] hover:border-[#c9a84c]"
                }`}
              >
                {m.structure}
              </motion.button>
            ))}
          </div>
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] text-center mb-2 tracking-wider uppercase">Description</p>
            {shuffledAnswers.map(ans => (
              <motion.button
                key={ans}
                onClick={() => {
                  if (matchChecked || !matchAnswers.selected) return;
                  const selectedId = matchAnswers.selected;
                  const correct = matchItems.find(m => m.id === selectedId)?.answer === ans;
                  if (correct) {
                    setMatchAnswers(prev => ({ ...prev, [selectedId]: ans, selected: "" }));
                  } else {
                    setMatchAnswers(prev => ({ ...prev, selected: "" }));
                  }
                }}
                className={`w-full text-left p-2 rounded-xl mb-2 text-xs font-[family-name:var(--font-crimson)] border transition-all cursor-pointer leading-snug ${
                  Object.values(matchAnswers).includes(ans)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]"
                }`}
              >
                {ans}
              </motion.button>
            ))}
          </div>
        </div>
        {Object.keys(matchAnswers).filter(k => k !== "selected").length === 4 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm"
          >
            ✦ All matched correctly! You know your vascular tissue!
          </motion.p>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Plant Cell Structures →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — PLANT CELL STRUCTURES
// ══════════════════════════════════════════════════════════════
function Scene5({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState(false);

  const cellParts = [
    {
      id: "cellwall",
      name: "Cell Wall",
      word: "cell wall",
      icon: "🧱",
      color: "text-[#c9a84c]",
      desc: "A stiff outer layer made of cellulose that surrounds the cell membrane. Gives the plant cell its rigid shape and protects it. Only plant cells have this — animal cells do not!",
      analogy: "Like the brick walls of a house — provides structure and protection.",
      function: "Support, protection, and shape",
    },
    {
      id: "cellmembrane",
      name: "Cell Membrane",
      word: "cell membrane",
      icon: "🫧",
      color: "text-[#7d9fc9]",
      desc: "A thin, flexible layer just inside the cell wall. Controls what goes in and out of the cell — like a security guard for the cell.",
      analogy: "Like the door of the house — controls who comes in and who goes out.",
      function: "Controls what enters and exits the cell",
    },
    {
      id: "chloroplast",
      name: "Chloroplast",
      word: "chloroplast",
      icon: "🟢",
      color: "text-[#4caf7d]",
      desc: "The green organelle where photosynthesis happens. Contains chlorophyll which captures sunlight. Only found in plant cells and algae — this is what makes plants unique!",
      analogy: "Like the kitchen of the house — where all the food is made.",
      function: "Photosynthesis — makes food using sunlight",
    },
    {
      id: "vacuole",
      name: "Central Vacuole",
      word: "vacuole",
      icon: "💧",
      color: "text-[#7d9fc9]",
      desc: "A large storage compartment filled with water and other substances. Takes up most of the space in a mature plant cell. When full of water, it keeps the plant firm and upright — when empty, the plant wilts!",
      analogy: "Like the water tank of the house — stores water and helps maintain pressure.",
      function: "Water storage, maintains cell pressure (turgor)",
    },
    {
      id: "nucleus",
      name: "Nucleus",
      word: "nucleus",
      icon: "🧠",
      color: "text-[#c9a84c]",
      desc: "The control center of the cell. Contains DNA — the instructions for everything the cell does. Found in both plant and animal cells.",
      analogy: "Like the brain of the house — controls all operations.",
      function: "Controls cell activities, contains DNA",
    },
  ];

  const quickQuestions = [
    {
      id: "q1",
      q: "Which organelle is ONLY found in plant cells and is where photosynthesis happens?",
      options: ["Nucleus", "Cell membrane", "Chloroplast", "Vacuole"],
      correct: "Chloroplast",
    },
    {
      id: "q2",
      q: "When a plant wilts, which organelle has lost water?",
      options: ["Nucleus", "Central Vacuole", "Cell Wall", "Chloroplast"],
      correct: "Central Vacuole",
    },
    {
      id: "q3",
      q: "What makes a plant cell different from an animal cell?",
      options: [
        "Plant cells have a nucleus, animal cells do not",
        "Plant cells have a cell wall and chloroplasts, animal cells do not",
        "Animal cells have a cell membrane, plant cells do not",
        "They are exactly the same",
      ],
      correct: "Plant cells have a cell wall and chloroplasts, animal cells do not",
    },
  ];

  const allAnswered = quickQuestions.every(q => quizAnswers[q.id]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Now we zoom in to the microscopic level — inside a single plant cell! 🔬<br/><br/>Every plant cell has specialized structures called <strong>organelles</strong> — each one has a specific job. This is structure and function at the CELLULAR level!<br/><br/>Tap each organelle to learn what it does!"
      />
        <div className="flex items-center gap-2 -mt-4 mb-6 px-5">
        <p className="text-[#c9a84c99] text-xs font-[family-name:var(--font-cinzel)]">Tap to hear:</p>
        <span className="text-[#f5e199] text-xs font-[family-name:var(--font-crimson)]">organelle</span>
        <Pronounce word="organelle" />
        </div>


      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔬 Inside a Plant Cell
        </h2>

        {/* Simple SVG cell diagram */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 280 220" className="w-full max-w-xs" style={{ filter: "drop-shadow(0 0 12px #c9a84c22)" }}>
            {/* Cell wall */}
            <rect x="10" y="10" width="260" height="200" rx="20" fill="#c9a84c11" stroke="#c9a84c" strokeWidth="4" />
            {/* Cell membrane */}
            <rect x="18" y="18" width="244" height="184" rx="16" fill="none" stroke="#7d9fc9" strokeWidth="2" strokeDasharray="4,3" />
            {/* Vacuole */}
            <ellipse cx="140" cy="115" rx="70" ry="60" fill="#7d9fc911" stroke="#7d9fc9" strokeWidth="1.5" />
            <text x="140" y="112" textAnchor="middle" fill="#7d9fc9" fontSize="9" fontFamily="Georgia,serif">Central</text>
            <text x="140" y="124" textAnchor="middle" fill="#7d9fc9" fontSize="9" fontFamily="Georgia,serif">Vacuole</text>
            {/* Chloroplasts */}
            <ellipse cx="50" cy="80" rx="18" ry="10" fill="#4caf7d44" stroke="#4caf7d" strokeWidth="1.5" />
            <text x="50" y="83" textAnchor="middle" fill="#4caf7d" fontSize="7" fontFamily="Georgia,serif">Chloro</text>
            <ellipse cx="55" cy="150" rx="18" ry="10" fill="#4caf7d44" stroke="#4caf7d" strokeWidth="1.5" />
            <text x="55" y="153" textAnchor="middle" fill="#4caf7d" fontSize="7" fontFamily="Georgia,serif">Chloro</text>
            <ellipse cx="230" cy="75" rx="18" ry="10" fill="#4caf7d44" stroke="#4caf7d" strokeWidth="1.5" />
            <text x="230" y="78" textAnchor="middle" fill="#4caf7d" fontSize="7" fontFamily="Georgia,serif">Chloro</text>
            {/* Nucleus */}
            <circle cx="220" cy="155" r="22" fill="#c9a84c22" stroke="#c9a84c" strokeWidth="2" />
            <text x="220" y="153" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="Georgia,serif">Nu-</text>
            <text x="220" y="163" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="Georgia,serif">cleus</text>
            {/* Labels */}
            <text x="140" y="8" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="Georgia,serif">Cell Wall</text>
            <text x="25" y="35" fill="#7d9fc9" fontSize="7" fontFamily="Georgia,serif">Cell Membrane</text>
          </svg>
        </div>

        <div className="space-y-3">
          {cellParts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setRevealed(prev => {
                const next = new Set(prev);
                next.has(p.id) ? next.delete(p.id) : next.add(p.id);
                return next;
              })}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(p.id)
                  ? "border-[#4caf7d55] bg-[#4caf7d0a]"
                  : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{p.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className={`font-[family-name:var(--font-cinzel)] text-sm font-bold ${p.color}`}>{p.name}</p>
                    <Pronounce word={p.word} />
                  </div>
                  <p className="text-[#c9a84c99] text-xs">Function: {p.function}</p>
                </div>
                <span className="text-[#c9a84c55] text-xs">{revealed.has(p.id) ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {revealed.has(p.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-2"
                  >
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="text-[#f5e199cc] text-xs leading-relaxed">{p.desc}</p>
                      {p.id === "cellwall" && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-[#c9a84c99] text-xs">hear:</span>
                          <span className="text-[#f5e199cc] text-xs">cellulose</span>
                          <Pronounce word="cellulose" />
                        </div>
                      )}
                      {p.id === "vacuole" && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-[#c9a84c99] text-xs">hear:</span>
                          <span className="text-[#f5e199cc] text-xs">turgor</span>
                          <Pronounce word="turgor" />
                        </div>
                      )}
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">🧠 Think of it like...</p>
                      <p className="text-[#f5e199cc] text-xs italic leading-relaxed">{p.analogy}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Quick check before we move on! Three questions about plant cell structures — let's see what stuck!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          ⚡ Quick Check: Plant Cell Structures
        </h2>
        {quickQuestions.map((q, qi) => {
          const chosen = quizAnswers[q.id];
          const isCorrect = chosen === q.correct;
          return (
            <div key={q.id} className="mb-4 pb-4 border-b border-[#c9a84c11] last:border-0">
              <p className="text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] mb-2">{qi + 1}. {q.q}</p>
              <div className="space-y-1">
                {q.options.map(opt => {
                  let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                  if (quizChecked) {
                    if (opt === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                    else if (opt === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                    else style = "border-[#c9a84c22] text-[#f5e199cc]";
                  } else if (chosen === opt) {
                    style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (quizChecked) return;
                        setQuizAnswers(prev => ({ ...prev, [q.id]: opt }));
                      }}
                      disabled={quizChecked}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {!quizChecked && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: allAnswered ? 1.02 : 1 }}
              onClick={() => setQuizChecked(true)}
              disabled={!allAnswered}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check Answers ✦
            </motion.button>
          </div>
        )}
        {quizChecked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm mt-3"
          >
            ✦ Great work! Now let's connect it all together!
          </motion.p>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!quizChecked}>
          {quizChecked ? "Next: Connect It All →" : "Complete the quick check first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 6 — CONNECTING IT ALL + FIELD JOURNAL
// ══════════════════════════════════════════════════════════════
function Scene6({ onNext }: { onNext: () => void }) {
  const [journal, setJournal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const connections = [
    {
      from: "Roots absorb water",
      arrow: "→",
      to: "Xylem carries it UP through the stem",
      then: "→ Water reaches leaf cells",
    },
    {
      from: "Chloroplasts in leaf cells",
      arrow: "→",
      to: "Use water + sunlight + CO₂ to make glucose",
      then: "→ Photosynthesis!",
    },
    {
      from: "Glucose (food) is made",
      arrow: "→",
      to: "Phloem carries it DOWN through the stem",
      then: "→ Feeds roots, stems, flowers",
    },
    {
      from: "Central vacuole fills with water",
      arrow: "→",
      to: "Creates pressure that keeps plant firm",
      then: "→ Plant stands upright!",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="proud"
        message="Detective — you've just learned something incredible. Let me show you how ALL of this connects together into one beautiful system! 🌿<br/><br/>Every structure we've studied — from the roots all the way to the tiny chloroplasts inside leaf cells — they all work together. This is what scientists call a <strong>system!</strong>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔗 How It All Connects
        </h2>
        <div className="space-y-3">
          {connections.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#1a0d45] border border-[#c9a84c22] rounded-xl p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm font-[family-name:var(--font-crimson)]">
                <span className="text-[#f5e199] font-semibold">{c.from}</span>
                <span className="text-[#c9a84c]">{c.arrow}</span>
                <span className="text-[#f5e199cc]">{c.to}</span>
                <span className="text-[#4caf7d]">{c.then}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Divider />

        <div className="bg-[#1a0d45] border border-[#c9a84c55] rounded-xl p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">🌟 The Big Picture</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            Every internal structure of a plant exists for a reason. The <VocabTerm word="cell wall">cell wall</VocabTerm> gives it shape, the <VocabTerm word="chloroplast">chloroplasts</VocabTerm> make food, the <VocabTerm word="vacuole">vacuole</VocabTerm> stores water, and the <VocabTerm word="vascular">vascular</VocabTerm> system moves everything where it needs to go. Structure always serves function!
          </p>
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Before the quiz, time for your Field Journal! 📓 This is one of the most important parts of being a scientist — writing down what you've learned in your own words helps it move from short-term to long-term memory.<br/><br/>Take your time with this one!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📓 Field Journal — Lesson 4
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">Today's Prompt</p>
          <p className="text-[#f5e199] text-base leading-relaxed">
            Choose ONE internal plant structure (xylem, phloem, chloroplast, vacuole, or cell wall) and explain: what does it look like, what does it do, and why would the plant die without it?
          </p>
        </div>
        <textarea
          value={journal}
          onChange={e => setJournal(e.target.value)}
          disabled={submitted}
          placeholder="Write your answer here... (at least 3 sentences)"
          rows={5}
          className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-xl px-4 py-3 text-[#f5e199] text-base font-[family-name:var(--font-crimson)] leading-relaxed focus:outline-none focus:border-[#c9a84c] resize-none mb-4 placeholder-[#c9a84c44]"
        />
        {!submitted ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: journal.length > 30 ? 1.02 : 1 }}
              onClick={() => setSubmitted(true)}
              disabled={journal.length < 30}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Submit Journal Entry ✦
            </motion.button>
            {journal.length < 30 && journal.length > 0 && (
              <p className="text-[#c9a84c55] text-xs mt-2 font-[family-name:var(--font-cinzel)]">Keep writing! ({journal.length} characters)</p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#4caf7d11] border border-[#4caf7d33] rounded-xl p-4 text-center"
          >
            <p className="text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm">✦ Journal entry saved! Excellent scientific writing!</p>
          </motion.div>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!submitted}>
          {submitted ? "On to the Quiz! 🏆" : "Submit your journal first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 7 — QUIZ
// ══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "What is the main job of xylem in a plant?",
    options: [
      "To carry sugar made in leaves down to the roots",
      "To carry water and minerals up from roots to leaves",
      "To control what enters and exits the cell",
      "To make food through photosynthesis",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! Xylem carries water and minerals UP — remember, X for eXit from roots going up!",
      wrong: "Xylem carries water and minerals UP from roots to leaves. Phloem carries food DOWN.",
    },
  },
  {
    q: "What is the process called when phloem moves sugar from the leaves to other parts of the plant?",
    options: ["Transpiration", "Photosynthesis", "Translocation", "Germination"],
    correct: 2,
    feedback: {
      right: "✦ Excellent! Translocation — the movement of food through phloem!",
      wrong: "The movement of food through phloem is called translocation. Transpiration is water loss through leaves.",
    },
  },
  {
    q: "Which plant cell organelle is responsible for photosynthesis?",
    options: ["Cell wall", "Vacuole", "Nucleus", "Chloroplast"],
    correct: 3,
    feedback: {
      right: "✦ Right! Chloroplasts contain chlorophyll and are where photosynthesis happens!",
      wrong: "Chloroplasts are the green organelles where photosynthesis happens. They contain chlorophyll.",
    },
  },
  {
    q: "A plant has been without water for several days and starts to wilt. Which organelle has lost water causing this?",
    options: ["Chloroplast", "Nucleus", "Central Vacuole", "Cell Wall"],
    correct: 2,
    feedback: {
      right: "✦ Correct! The central vacuole stores water — when it loses water, the plant loses pressure and wilts!",
      wrong: "The central vacuole stores water and maintains turgor pressure. When empty, the plant wilts.",
    },
  },
  {
    q: "Which of the following is found in plant cells but NOT in animal cells?",
    options: ["Nucleus", "Cell membrane", "Cell wall and chloroplasts", "DNA"],
    correct: 2,
    feedback: {
      right: "✦ Perfect! Cell walls and chloroplasts are unique to plant cells — this is what makes plants special!",
      wrong: "Plant cells have cell walls (for structure) and chloroplasts (for photosynthesis) that animal cells lack.",
    },
  },
  {
    q: "Maple syrup comes from the sap of maple trees. Based on what you learned, which vascular tissue does this sap travel through?",
    options: ["Xylem, because it carries water upward", "Phloem, because it carries sugar made in the leaves", "The cell wall, because it provides structure", "The vacuole, because it stores liquids"],
    correct: 1,
    feedback: {
      right: "✦ Outstanding! Maple sap is sugar solution traveling through phloem — that's translocation in action!",
      wrong: "Maple sap is sugary — it's food made in the leaves traveling through phloem (translocation)!",
    },
  },
  {
    q: "A student examines two cells under a microscope. Cell A has a cell wall, chloroplasts, and a large vacuole. Cell B has none of these. What can the student conclude?",
    options: [
      "Cell A is a plant cell and Cell B is an animal cell",
      "Cell A is an animal cell and Cell B is a plant cell",
      "Both cells are plant cells",
      "Both cells are animal cells",
    ],
    correct: 0,
    feedback: {
      right: "✦ Correct! Cell wall + chloroplasts + large vacuole = plant cell. Cell B is an animal cell!",
      wrong: "Cell wall, chloroplasts, and large vacuole are all unique to plant cells. So Cell A is a plant cell and Cell B is an animal cell.",
    },
  },
  {
    q: "Why is the cell wall important to a plant? Choose the BEST answer.",
    options: [
      "It makes food for the plant using sunlight",
      "It controls what substances enter and exit the cell",
      "It provides rigid structure and support, helping the plant stand upright",
      "It stores water to prevent wilting",
    ],
    correct: 2,
    feedback: {
      right: "✦ Excellent! The cell wall gives plant cells their rigid shape and supports the plant's structure!",
      wrong: "The cell wall provides rigid structure and support. The cell membrane controls what enters/exits. Chloroplasts make food. The vacuole stores water.",
    },
  },
];

function Scene7({ onFinish }: { onFinish: (score: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(8).fill(null));
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
        message="You've gone from the roots all the way down to the inside of a single cell — that's incredible science! 🔬<br/><br/>Now it's time for your <strong>final quiz</strong> — 8 questions this time because you've learned a LOT today! I believe in you, Detective! 💪"
      />

      {QUIZ_QUESTIONS.map((q, qi) => {
        const chosen = answers[qi];
        const isCorrect = chosen === q.correct;
        return (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.07 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-2xl p-6 mb-4"
          >
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-2">
              Question {qi + 1} of 8
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
          {allAnswered ? "See My Score ✦" : `Answer all questions (${answers.filter(a => a !== null).length}/8)`}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 8 — SCORE
// ══════════════════════════════════════════════════════════════
function Scene8({ score, onRestart }: { score: number; onRestart: () => void }) {
  const pct = Math.round((score / 8) * 100);

  const config = pct === 100
    ? { mood: "proud" as AxoMood, msg: "PERFECT SCORE on an 8-question quiz! 🎉 You went from roots to cells and aced every question! You are a true plant scientist! See you in Lesson 5 — photosynthesis!", scoreMsg: "🌟 Perfect Score! Every question correct — incredible!" }
    : pct >= 80
    ? { mood: "excited" as AxoMood, msg: "Outstanding work Detective! 🌿 You really understand plant internal structures. Review the ones you missed and you'll be unstoppable in Lesson 5!", scoreMsg: "🌿 Excellent! Strong understanding of internal plant structures." }
    : pct >= 60
    ? { mood: "neutral" as AxoMood, msg: "Good effort! 🌱 Some of those cell organelles can be tricky. Review xylem, phloem, and chloroplasts before Lesson 5 — you've got this!", scoreMsg: "🌱 Good work! Review organelles before moving on." }
    : { mood: "encouraging" as AxoMood, msg: "Don't give up — internal structures are challenging! 🔬 Let's go back through the lesson together. You'll get it!", scoreMsg: "🔬 Keep going! Review the lesson and try again." };

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
          {score}/8
        </motion.p>
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-4">
          Lesson 4 Complete · TEKS 4.13A
        </p>
        <p className="text-[#f5e199cc] text-lg font-[family-name:var(--font-crimson)] leading-relaxed">{config.scoreMsg}</p>
      </motion.div>

      <Axo mood={config.mood} message={config.msg} />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📚 What You Learned Today
        </h2>
        {[
          "Xylem carries water and minerals UP from roots to leaves. It's made of dead hollow tube cells.",
          "Phloem carries sugar DOWN from leaves to the rest of the plant through translocation.",
          "Chloroplasts are the organelles where photosynthesis happens — only found in plant cells.",
          "The central vacuole stores water and creates turgor pressure that keeps the plant firm.",
          "The cell wall gives plant cells their rigid shape — plant cells have this, animal cells do not.",
          "All internal structures work together as a system — structure always serves function!",
        ].map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="text-[#f5e199cc] text-base leading-relaxed mb-2"
          >
            ✦ {item}
          </motion.p>
        ))}
        <Divider />

        <div className="mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2 tracking-wider">🔉 Lesson Vocabulary</p>
          <div className="flex flex-wrap gap-3">
            {["xylem", "phloem", "translocation", "vascular", "chloroplast", "vacuole", "turgor", "cellulose", "organelle", "nucleus"].map(w => (
              <div key={w} className="flex items-center gap-1 bg-[#1a0d45] border border-[#c9a84c22] rounded-full px-3 py-1">
                <span className="text-[#f5e199cc] text-xs font-[family-name:var(--font-crimson)]">{w}</span>
                <Pronounce word={w} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-3">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">🏠 Try This at Home!</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed mb-2">
            <strong className="text-[#f5e199]">Celery Xylem Experiment:</strong> Place a stalk of celery (with leaves) in a glass of water with a few drops of food coloring. Wait 24 hours. Cut the stalk crosswise and look at the cross-section — you'll see colored dots where the xylem carried the colored water up!
          </p>
          <p className="text-[#c9a84c] text-xs italic">Predict: Which color will travel the fastest — red or blue food coloring?</p>
        </div>

        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.1em] text-[#c9a84c] mt-2">
          Next Lesson: Photosynthesis — How Plants Make Food ☀️
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <Link href="/kyliana/science/lesson-3">
          <GhostBtn onClick={() => {}}>← Lesson 3</GhostBtn>
        </Link>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson4() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 8;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(8);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-4",
      subject: "Science",
      unit: "Life Science — Plants",
      teks: "4.13A",
      score: s,
      totalQuestions: 8,
    }).catch(err => console.error("Progress save failed:", err));
  };

  const restart = () => {
    setScene(1);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-[#1a0d45] text-[#f5e199] overflow-x-hidden">
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
        <div className="text-center mb-6">
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase text-[#c9a84c99] mb-1">
            Dracos Academy · Science · Life Science: Plants
          </p>
          <h1
            className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-[#f5e199] mb-1"
            style={{ textShadow: "0 0 20px #c9a84c88" }}
          >
            🔬 Internal Plant Structures
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 4 of 10 · TEKS 4.13A
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
            {scene === 6 && <Scene6 onNext={next} />}
            {scene === 7 && <Scene7 onFinish={handleFinish} />}
            {scene === 8 && <Scene8 score={score} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f5e199] to-transparent relative z-10 mt-8" />
    </main>
  );
}