// src/app/kyliana/science/lesson-5/page.tsx
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

function ImageModal({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="cursor-zoom-in rounded-xl overflow-hidden border border-[#c9a84c22] relative"
      >
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
        <div className="absolute bottom-2 right-2 bg-[#1a0d4599] border border-[#c9a84c33] rounded-full px-2 py-0.5">
          <span className="text-[#c9a84c] text-xs font-[family-name:var(--font-cinzel)]">🔍 Tap to enlarge</span>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[#0a0620ee] z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full rounded-2xl border border-[#c9a84c44]"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#c9a84c] font-[family-name:var(--font-cinzel)] text-sm border border-[#c9a84c55] rounded-full px-3 py-1 bg-[#1a0d45]"
            >
              ✕ Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    q: "From Lesson 4 — which organelle inside a plant cell is where photosynthesis happens?",
    options: ["Nucleus", "Vacuole", "Chloroplast", "Cell wall"],
    correct: 2,
  },
  {
    q: "From Lesson 3 — what is it called when a plant's stem grows toward light?",
    options: ["Gravitropism", "Hydrotropism", "Transpiration", "Phototropism"],
    correct: 3,
  },
  {
    q: "From Lesson 2 — which vascular tube carries water UP from the roots to the leaves?",
    options: ["Phloem", "Stomata", "Xylem", "Petiole"],
    correct: 2,
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
        message="Detective! We've been on quite a journey together — roots, stems, leaves, internal cells, and tropisms! 🌿<br/><br/>Before today's BIG lesson, let's make sure everything from our last few lessons is locked in. Three warm-up questions!"
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
                      onClick={() => { if (checked) return; setAnswers(prev => { const next = [...prev]; next[qi] = oi; return next; }); }}
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
            {score === 3 ? "✦ Perfect! Your plant knowledge is solid — let's go deeper!" :
             score === 2 ? "✦ Good recall! Check the ones you missed before we continue." :
             "Review the highlighted answers — then let's build on what you know!"}
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
// SCENE 2 — EXPERIMENT FOLLOW-UP + HOOK
// ══════════════════════════════════════════════════════════════
function Scene2({ onNext }: { onNext: () => void }) {
  const [observation, setObservation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Before we start — did you try the celery xylem experiment from Lesson 4? 🥬<br/><br/>You put celery in colored water and waited 24 hours. Tell me what you saw — or if you didn't get to try it, make a prediction!"
      />
      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔬 Field Observation Report
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">The Experiment</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            You placed celery in colored water for 24 hours, then cut it crosswise. What did the cross-section look like? Where did the color travel?
          </p>
        </div>
        <textarea
          value={observation}
          onChange={e => setObservation(e.target.value)}
          disabled={submitted}
          placeholder="What did you see? Did the color travel up? Where did you see it in the cross-section?"
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
              You should have seen colored dots in the cross-section — those are the xylem tubes! The color traveled UP through xylem exactly the way water and minerals do in a real plant. Science you can see! 🌿
            </p>
          </motion.div>
        )}
      </Card>

      <Axo
        mood="surprised"
        message="Now here's the big question that connects EVERYTHING we've learned so far 🤯<br/><br/>We know water travels up through xylem to the leaves. We know chloroplasts are in the leaf cells. We know plants don't eat food like animals do...<br/><br/>So HOW do plants get their energy? How do they actually make their own food?<br/><br/>The answer is one of the most important processes on Earth — <strong>photosynthesis!</strong>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          ☀️ The Big Picture
        </h2>
        <p className="text-[#f5e199cc] text-sm leading-relaxed mb-4">
          Before we dive in, look at this diagram. Don't worry about understanding everything yet — just notice the inputs going IN and the outputs coming OUT.
        </p>
        <ImageModal src="/images/science/plants/photosynthesis-overview.webp" alt="Photosynthesis overview diagram" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-3">
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">⬇️ Goes IN</p>
            <p className="text-[#f5e199cc] text-sm">☀️ Sunlight</p>
            <p className="text-[#f5e199cc] text-sm">💧 Water (H₂O)</p>
            <p className="text-[#f5e199cc] text-sm">💨 Carbon Dioxide (CO₂)</p>
          </div>
          <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-3">
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#4caf7d] mb-2">⬆️ Comes OUT</p>
            <p className="text-[#f5e199cc] text-sm">🍬 Glucose (food/sugar)</p>
            <p className="text-[#f5e199cc] text-sm">🫁 Oxygen (O₂)</p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!submitted}>
          {submitted ? "Watch the Video! 🎬" : "Submit your observation first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 3 — VIDEO
// ══════════════════════════════════════════════════════════════
function VideoQuiz({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [checked, setChecked] = useState(false);

  const questions = [
    {
      q: "According to the video, what four things does a plant need for photosynthesis?",
      options: [
        "Sunlight, oxygen, water, and soil",
        "Sunlight, carbon dioxide, water, and chlorophyll",
        "Glucose, oxygen, sunlight, and minerals",
        "Carbon dioxide, glucose, water, and roots",
      ],
      correct: 1,
    },
    {
      q: "What is the green substance in plants that makes photosynthesis possible?",
      options: ["Glucose", "Oxygen", "Chlorophyll", "Carbon dioxide"],
      correct: 2,
    },
    {
      q: "According to the video, what do plants produce during photosynthesis that humans need to breathe?",
      options: ["Carbon dioxide", "Glucose", "Water vapor", "Oxygen"],
      correct: 3,
    },
    {
      q: "The video mentions a curious fact about plants at night. What happens?",
      options: [
        "Plants photosynthesize faster at night",
        "Plants take in oxygen and release carbon dioxide — like humans breathe",
        "Plants stop all processes at night",
        "Plants absorb more water at night",
      ],
      correct: 1,
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
                    onClick={() => { if (checked) return; setAnswers(prev => { const next = [...prev]; next[qi] = oi; return next; }); }}
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
        message="I found a perfect video that explains photosynthesis step by step! 🎬<br/><br/>It's only 4 minutes and it's going to connect everything we've learned — roots, xylem, leaves, chlorophyll — into one amazing process!<br/><br/><em style='color:#c9a84c'>Listen for: chlorophyll, stomata, raw sap, and what happens to plants at night!</em>"
      />
      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎬 Axo's Science Lab: <span className="inline-flex items-center gap-1">Photosynthesis <Pronounce word="photosynthesis" /></span>
        </h2>
        <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/UPBMG5EYydo"
            title="Photosynthesis for Kids"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-[#c9a84c99] text-xs font-[family-name:var(--font-cinzel)] text-center tracking-wider mb-2">
          Watch the full video then answer the questions below
        </p>
      </Card>

      <Axo
        mood="thinking"
        message="Great watching! Now let's check what you caught — 4 questions this time because there was a lot of great information in that video!"
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
// SCENE 4 — PHOTOSYNTHESIS DEEP DIVE
// ══════════════════════════════════════════════════════════════
function Scene4({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [orderAnswers, setOrderAnswers] = useState<string[]>([]);
  const [orderChecked, setOrderChecked] = useState(false);

  const steps = [
    { id: "roots", icon: "🌱", title: "Roots absorb water", desc: "The roots absorb water and minerals from the soil. This water travels up through xylem to the leaves." },
    { id: "stomata", icon: "💨", title: "Stomata absorb CO₂", desc: "Tiny pores on the underside of leaves called stomata open up and absorb carbon dioxide from the air." },
    { id: "chlorophyll", icon: "🟢", title: "Chlorophyll captures sunlight", desc: "Chlorophyll molecules inside the chloroplasts capture energy from sunlight. This is what makes leaves green!" },
    { id: "reaction", icon: "⚗️", title: "The reaction happens", desc: "Inside the chloroplasts, sunlight energy is used to combine water and carbon dioxide together — like a recipe being cooked!" },
    { id: "output", icon: "✨", title: "Glucose and oxygen are produced", desc: "The reaction produces glucose (the plant's food/energy) and oxygen — which is released through the stomata into the air we breathe!" },
  ];

  const orderOptions = ["Stomata absorb CO₂", "Chlorophyll captures sunlight", "Roots absorb water", "Glucose and oxygen are produced", "The reaction happens in chloroplasts"];
  const correctOrder = ["Roots absorb water", "Stomata absorb CO₂", "Chlorophyll captures sunlight", "The reaction happens in chloroplasts", "Glucose and oxygen are produced"];

  const toggleOrder = (step: string) => {
    if (orderChecked) return;
    setOrderAnswers(prev =>
      prev.includes(step) ? prev.filter(s => s !== step) : prev.length < 5 ? [...prev, step] : prev
    );
  };

  const checkOrder = () => setOrderChecked(true);
  const orderCorrect = orderAnswers.join(",") === correctOrder.join(",");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Now let's break photosynthesis down step by step — like a recipe! 🧪<br/><br/>Every step connects to something you already know. Tap each step to explore it, then I'll test you on the order!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-2 pb-3 border-b border-[#c9a84c22]">
          ☀️ How <span className="inline-flex items-center gap-1">Photosynthesis <Pronounce word="photosynthesis" /></span> Works
        </h2>

        <div className="mb-4 mt-4">
          <ImageModal src="/images/science/plants/photosynthesis-chlorophyll.webp" alt="Photosynthesis and chlorophyll diagram" />
        </div>

        <div className="space-y-3 mt-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setRevealed(prev => { const next = new Set(prev); next.has(s.id) ? next.delete(s.id) : next.add(s.id); return next; })}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(s.id) ? "border-[#4caf7d55] bg-[#4caf7d0a]" : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c22] border border-[#c9a84c44] flex items-center justify-center font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199]">{s.icon} {s.title}</p>
                </div>
                <span className="text-[#c9a84c55] text-xs">{revealed.has(s.id) ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {revealed.has(s.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="text-[#f5e199cc] text-xs leading-relaxed">{s.desc}</p>
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
        message="Now let's see if you can put the steps in order! Tap the steps in the correct sequence — from first to last. Think carefully!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔢 Put It in Order
        </h2>
        <p className="text-[#f5e199cc] text-sm mb-4 font-[family-name:var(--font-crimson)]">
          Tap the steps in the correct order from FIRST to LAST. Your selections will appear numbered below.
        </p>

        <div className="space-y-2 mb-4">
          {orderOptions.map(opt => {
            const pos = orderAnswers.indexOf(opt);
            const isSelected = pos !== -1;
            const isCorrectPos = orderChecked && correctOrder[pos] === opt;
            const isWrongPos = orderChecked && isSelected && !isCorrectPos;
            return (
              <motion.button
                key={opt}
                whileHover={{ scale: orderChecked ? 1 : 1.01 }}
                onClick={() => toggleOrder(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-pointer flex items-center gap-3 ${
                  orderChecked
                    ? isCorrectPos ? "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]"
                    : isWrongPos ? "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]"
                    : "border-[#c9a84c22] text-[#f5e199cc]"
                    : isSelected ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]"
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${
                  isSelected ? "border-[#f5e199] bg-[#f5e19922] text-[#f5e199]" : "border-[#c9a84c33]"
                }`}>
                  {isSelected ? pos + 1 : ""}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {!orderChecked ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: orderAnswers.length === 5 ? 1.02 : 1 }}
              onClick={checkOrder}
              disabled={orderAnswers.length < 5}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check My Order ✦
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-sm text-center font-[family-name:var(--font-cinzel)] ${
              orderCorrect
                ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                : "bg-[#c9a84c11] border border-[#c9a84c33] text-[#c9a84c]"
            }`}
          >
            {orderCorrect
              ? "✦ Perfect order! You know the photosynthesis recipe by heart!"
              : "Not quite — the correct order is: Roots absorb water → Stomata absorb CO₂ → Chlorophyll captures sunlight → Reaction in chloroplasts → Glucose and oxygen produced!"}
          </motion.div>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Chlorophyll & Stomata →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — CHLOROPHYLL & STOMATA DEEP DIVE
// ══════════════════════════════════════════════════════════════
function Scene5({ onNext }: { onNext: () => void }) {
  const [stomataAnswer, setStomataAnswer] = useState<string | null>(null);
  const [chloroChecked, setChloroChecked] = useState(false);

  const chloroQuestions = [
    {
      id: "c1",
      q: "Why are most plants green?",
      options: ["Because the soil is brown and they need contrast", "Because chlorophyll is a green pigment that absorbs sunlight", "Because green is the color of glucose", "Because water is blue and mixes with yellow roots"],
      correct: 1,
    },
    {
      id: "c2",
      q: "What would happen to a plant kept in total darkness?",
      options: ["It would grow faster", "It would make more glucose", "It would eventually die because it couldn't photosynthesize", "Nothing — plants don't need light"],
      correct: 2,
    },
  ];

  const [chloroAnswers, setChloroAnswers] = useState<Record<string, number>>({});
  const allChloroAnswered = chloroQuestions.every(q => chloroAnswers[q.id] !== undefined);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Two of the most important players in photosynthesis are <strong>chlorophyll</strong> and <strong>stomata</strong> — and you already know both of them from earlier lessons! 🌿<br/><br/>Today we're going to see exactly HOW they work in photosynthesis!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🟢 <span className="inline-flex items-center gap-1">Chlorophyll <Pronounce word="chlorophyll" /></span> — The Light Catcher
        </h2>

        <div className="space-y-3 mb-4">
          {[
            { icon: "🎨", title: "It's a pigment", desc: "Chlorophyll is a green pigment — a colored chemical — found inside chloroplasts in leaf cells. The green color comes from the way it absorbs light." },
            { icon: "☀️", title: "It captures sunlight", desc: "Chlorophyll absorbs red and blue light from the sun but reflects green light back — that's why we see plants as green!" },
            { icon: "⚡", title: "It powers the reaction", desc: "The light energy captured by chlorophyll is what powers the photosynthesis reaction — converting water and CO₂ into glucose and oxygen." },
            { icon: "🍂", title: "Why leaves change color in fall", desc: "In autumn, plants stop making chlorophyll. Without the green pigment, the other colors (red, orange, yellow) that were always there become visible!" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">
                  {item.icon} <strong>{item.title}</strong> — {item.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          ⚡ Quick Check: Chlorophyll
        </h3>
        {chloroQuestions.map((q, qi) => {
          const chosen = chloroAnswers[q.id];
          const isCorrect = chosen === q.correct;
          return (
            <div key={q.id} className="mb-4">
              <p className="text-[#f5e199] text-sm font-[family-name:var(--font-crimson)] mb-2">{qi + 1}. {q.q}</p>
              <div className="space-y-1">
                {q.options.map((opt, oi) => {
                  let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                  if (chloroChecked) {
                    if (oi === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                    else if (oi === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                    else style = "border-[#c9a84c22] text-[#f5e199cc]";
                  } else if (chosen === oi) {
                    style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => { if (chloroChecked) return; setChloroAnswers(prev => ({ ...prev, [q.id]: oi })); }}
                      disabled={chloroChecked}
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
        {!chloroChecked && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: allChloroAnswered ? 1.02 : 1 }}
              onClick={() => setChloroChecked(true)}
              disabled={!allChloroAnswered}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check Answers ✦
            </motion.button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          💨 <span className="inline-flex items-center gap-1">Stomata <Pronounce word="stomata" /></span> — The Gas Gates
        </h2>

        <p className="text-[#f5e199cc] text-sm leading-relaxed mb-4">
          You learned about stomata in Lesson 2. Now let's see exactly how they work during photosynthesis!
        </p>

        <ImageModal src="/images/science/plants/stoma.avif" alt="Stomata open and closed diagram" />

        <div className="space-y-3 mt-4">
          {[
            { icon: "🔓", title: "Open stomata", desc: "During the day when there's sunlight, stomata OPEN to let CO₂ in from the air. This is the raw material the plant needs for photosynthesis." },
            { icon: "🔒", title: "Closed stomata", desc: "At night or when it's dry, stomata CLOSE to prevent water loss. The plant pauses photosynthesis since there's no sunlight anyway." },
            { icon: "💧", title: "Transpiration", desc: "When stomata are open, water vapor also escapes — this is called transpiration. It's why plants need a constant water supply through their roots!" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">
                  {item.icon} <strong>{item.title}</strong> — {item.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          🔍 Quick Check: Stomata
        </h3>
        <p className="text-[#f5e199cc] text-sm mb-3 font-[family-name:var(--font-crimson)]">
          A plant is in the middle of a hot, dry afternoon. It has been photosynthesizing all day. What will its stomata most likely do and why?
        </p>
        <div className="space-y-2">
          {[
            { label: "Stay open to keep absorbing CO₂ for photosynthesis", correct: false },
            { label: "Close to prevent too much water loss through transpiration", correct: true },
            { label: "Open wider to absorb more sunlight", correct: false },
            { label: "Close permanently for the rest of the day", correct: false },
          ].map((opt, i) => {
            const isSelected = stomataAnswer === opt.label;
            const showResult = stomataAnswer !== null;
            let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
            if (showResult) {
              if (opt.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
              else if (isSelected && !opt.correct) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
              else style = "border-[#c9a84c22] text-[#f5e199cc]";
            } else if (isSelected) {
              style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
            }
            return (
              <button
                key={i}
                onClick={() => { if (!stomataAnswer) setStomataAnswer(opt.label); }}
                disabled={!!stomataAnswer}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {stomataAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
              stomataAnswer === "Close to prevent too much water loss through transpiration"
                ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                : "bg-[#e24b4a11] border border-[#e24b4a33] text-[#e24b4acc]"
            }`}
          >
            {stomataAnswer === "Close to prevent too much water loss through transpiration"
              ? "✦ Correct! On hot dry days stomata close to conserve water — the plant sacrifices some photosynthesis to survive!"
              : "The stomata would close — on hot dry days the plant needs to conserve water more than it needs to photosynthesize. Survival first!"}
          </motion.div>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!stomataAnswer || !chloroChecked}>
          {stomataAnswer && chloroChecked ? "Next: Bonus Scientist View! 🔬" : "Complete both activities first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 6 — BONUS SCIENTIST + WHY IT MATTERS + FIELD JOURNAL
// ══════════════════════════════════════════════════════════════
function Scene6({ onNext }: { onNext: () => void }) {
  const [journal, setJournal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="proud"
        message="You've earned the Bonus Scientist View today! 🔬<br/><br/>This next diagram shows what's happening INSIDE a chloroplast during photosynthesis. Scientists spend years studying this. You don't need to memorize any of these details — just appreciate how incredibly complex and beautiful this process is!<br/><br/>The stacks you see are called <strong>thylakoids</strong> — that's where the light reactions happen. The fluid around them is the <strong>stroma</strong> — where glucose is made."
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-2 pb-3 border-b border-[#c9a84c22]">
          🔬 Bonus Scientist View: Inside a <span className="inline-flex items-center gap-1">Chloroplast <Pronounce word="chloroplast" /></span>
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-3 mb-4 mt-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">⭐ Bonus Knowledge — Beyond 4th Grade!</p>
          <p className="text-[#f5e199cc] text-xs">This is what real plant scientists study. You're looking at it early — just enjoy the detail!</p>
        </div>
        <ImageModal src="/images/science/plants/chloroplast-anatomy.png" alt="Chloroplast anatomy diagram" />
        <div className="mt-4 space-y-2">
          {[
            { term: "Thylakoid", pronounce: "thylakoid", desc: "The flat disc-shaped structures stacked like pancakes. Light reactions happen here." },
            { term: "Grana", pronounce: "grana", desc: "A stack of thylakoids. Each chloroplast has many grana." },
            { term: "Stroma", pronounce: "stroma", desc: "The fluid surrounding the thylakoids. This is where glucose (sugar) is made." },
          ].map(item => (
            <div key={item.term} className="bg-[#1a0d45] border border-[#c9a84c22] rounded-xl p-3 flex items-start gap-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199]">{item.term}</p>
                  <Pronounce word={item.pronounce} />
                </div>
                <p className="text-[#c9a84c99] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌍 Why Photosynthesis Matters to Everyone
        </h2>
        <div className="space-y-3">
          {[
            { icon: "🫁", title: "Every breath you take", desc: "The oxygen in Earth's atmosphere comes from photosynthesis. Every time you breathe in, you're breathing plant-made oxygen." },
            { icon: "🍎", title: "All the food you eat", desc: "Whether you eat plants directly (vegetables, fruit, grains) or animals (which ate plants), ALL food energy on Earth traces back to photosynthesis." },
            { icon: "🌡️", title: "Climate regulation", desc: "Plants absorb CO₂ — one of the gases causing climate change — and convert it to oxygen. Forests are Earth's lungs." },
            { icon: "⛽", title: "The fuel in cars", desc: "Fossil fuels (coal, oil, gas) are ancient plant matter — photosynthesis energy stored underground for millions of years!" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">
                  {item.icon} <strong>{item.title}</strong> — {item.desc}
                </p>
              </Highlight>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="That's the scale of what we've been studying, Detective. A process happening in a microscopic organelle — inside a leaf cell — is literally keeping every living thing on Earth alive. 🌍<br/><br/>Now write about it in your Field Journal. This is a big one!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📓 Field Journal — Lesson 5
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">Today's Prompt</p>
          <p className="text-[#f5e199] text-base leading-relaxed">
            Explain photosynthesis in your own words — what goes in, what comes out, and where it happens. Then explain why photosynthesis is important to YOU personally.
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
            <p className="text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm">✦ Journal entry saved! Outstanding scientific thinking!</p>
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
    q: "Which of the following correctly lists all the ingredients a plant needs for photosynthesis?",
    options: [
      "Glucose, oxygen, and sunlight",
      "Sunlight, water, and carbon dioxide",
      "Chlorophyll, oxygen, and water",
      "Carbon dioxide, glucose, and minerals",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! Sunlight + water + CO₂ are the three ingredients. Chlorophyll is the tool, not an ingredient!",
      wrong: "The three ingredients are sunlight, water (H₂O), and carbon dioxide (CO₂). Chlorophyll is the pigment that captures the sunlight.",
    },
  },
  {
    q: "Where exactly does photosynthesis take place inside a plant cell?",
    options: ["In the nucleus", "In the vacuole", "In the chloroplast", "In the cell wall"],
    correct: 2,
    feedback: {
      right: "✦ Right! Chloroplasts are the organelles where photosynthesis happens — that's their whole job!",
      wrong: "Photosynthesis happens in the chloroplasts — the green organelles that contain chlorophyll.",
    },
  },
  {
    q: "What is the main product of photosynthesis that the plant uses as food?",
    options: ["Oxygen", "Carbon dioxide", "Water", "Glucose"],
    correct: 3,
    feedback: {
      right: "✦ Excellent! Glucose is the sugar/food the plant makes. Oxygen is the byproduct released into the air!",
      wrong: "Glucose (sugar) is the food the plant makes through photosynthesis. Oxygen is released as a byproduct.",
    },
  },
  {
    q: "Why are most plant leaves green?",
    options: [
      "Because they absorb green light and reflect all other colors",
      "Because chlorophyll is a green pigment that reflects green light",
      "Because glucose is green in color",
      "Because water makes plants appear green",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! Chlorophyll absorbs red and blue light but reflects green — that reflected green is what we see!",
      wrong: "Chlorophyll is a green pigment that absorbs red and blue light but reflects green light back to our eyes.",
    },
  },
  {
    q: "A student covers all the leaves of a plant with black paper for two weeks so no light can reach them. What will most likely happen?",
    options: [
      "The plant will grow faster because it's protected",
      "Nothing will change — plants don't need light",
      "The plant will eventually die because it can't photosynthesize to make food",
      "The plant will switch to absorbing food through its roots instead",
    ],
    correct: 2,
    feedback: {
      right: "✦ Correct! No light = no photosynthesis = no glucose = plant starves. Light is essential!",
      wrong: "Without light, the plant can't photosynthesize, so it can't make glucose (food). It will eventually use up its stored energy and die.",
    },
  },
  {
    q: "Stomata open during the day to let carbon dioxide in. What is the trade-off of having open stomata?",
    options: [
      "The plant absorbs too much sunlight",
      "The plant loses water vapor through transpiration",
      "The plant takes in too much oxygen",
      "The plant produces too much glucose",
    ],
    correct: 1,
    feedback: {
      right: "✦ Right! Open stomata let CO₂ in but also let water vapor out — that's the transpiration trade-off!",
      wrong: "When stomata open to let CO₂ in, water vapor also escapes — this is called transpiration. That's why plants close their stomata in hot, dry conditions.",
    },
  },
  {
    q: "According to the video, what happens to plants at night when there is no sunlight?",
    options: [
      "They photosynthesize faster to catch up",
      "They take in oxygen and release carbon dioxide — like humans breathe",
      "They absorb moonlight instead of sunlight",
      "They shut down completely and stop all processes",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! At night plants respire like animals — taking in O₂ and releasing CO₂. Quite the opposite of daytime!",
      wrong: "At night, without sunlight to photosynthesize, plants breathe like animals — taking in oxygen and releasing carbon dioxide.",
    },
  },
  {
    q: "A scientist discovers a new plant species that has white leaves instead of green. What can she conclude about this plant's ability to photosynthesize?",
    options: [
      "It photosynthesize more efficiently because white reflects more sunlight",
      "It likely cannot photosynthesize effectively because it lacks chlorophyll",
      "It produces more oxygen because white is purer than green",
      "It uses a different gas instead of carbon dioxide",
    ],
    correct: 1,
    feedback: {
      right: "✦ Outstanding scientific reasoning! White leaves = no chlorophyll = no photosynthesis. This plant would need another food source!",
      wrong: "Green color comes from chlorophyll. White leaves suggest no chlorophyll, which means the plant can't capture sunlight for photosynthesis.",
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
        message="You've connected roots, xylem, chloroplasts, stomata, chlorophyll — and now photosynthesis! That's 5 lessons of knowledge all coming together! 🌿<br/><br/>8 questions — your biggest quiz yet. I know you're ready. Let's go! 💪"
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
    ? { mood: "proud" as AxoMood, msg: "PERFECT SCORE! 🎉 You just aced a lesson that most students don't see until middle school! You are an absolute science superstar! I am SO proud of you, Detective!", scoreMsg: "🌟 Perfect Score! Every question correct — you are a plant science expert!" }
    : pct >= 80
    ? { mood: "excited" as AxoMood, msg: "Outstanding work! 🌿 Photosynthesis is one of the most important concepts in all of biology and you nailed it! Check the ones you missed and get ready for Lesson 6!", scoreMsg: "🌿 Excellent! Strong understanding of photosynthesis — well done!" }
    : pct >= 60
    ? { mood: "neutral" as AxoMood, msg: "Good effort! 🌱 Photosynthesis has a lot of moving parts — review the inputs, outputs, and where it happens before Lesson 6. You've got this!", scoreMsg: "🌱 Good work! Review the key inputs/outputs before moving on." }
    : { mood: "encouraging" as AxoMood, msg: "Don't give up! 🔬 Photosynthesis takes time to really sink in. Let's go back through the lesson together — you'll get it!", scoreMsg: "🔬 Keep going! Review the lesson carefully and try again." };

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
          Lesson 5 Complete · TEKS 4.13A
        </p>
        <p className="text-[#f5e199cc] text-lg font-[family-name:var(--font-crimson)] leading-relaxed">{config.scoreMsg}</p>
      </motion.div>

      <Axo mood={config.mood} message={config.msg} />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📚 What You Learned Today
        </h2>
        {[
          "Photosynthesis is the process plants use to make their own food using sunlight, water, and carbon dioxide.",
          "It happens inside chloroplasts — specifically where chlorophyll captures sunlight.",
          "The outputs are glucose (food for the plant) and oxygen (released into the air we breathe).",
          "Stomata open to let CO₂ in but also release water vapor — this is called transpiration.",
          "Chlorophyll is green because it absorbs red and blue light but reflects green light.",
          "At night, plants respire like animals — taking in oxygen and releasing carbon dioxide.",
          "Photosynthesis is the foundation of ALL life on Earth — every food chain starts here.",
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
            {["photosynthesis", "chlorophyll", "chloroplast", "stomata", "glucose", "transpiration", "thylakoid", "stroma"].map(w => (
              <div key={w} className="flex items-center gap-1 bg-[#1a0d45] border border-[#c9a84c22] rounded-full px-3 py-1">
                <span className="text-[#f5e199cc] text-xs font-[family-name:var(--font-crimson)]">{w}</span>
                <Pronounce word={w} />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-3">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">🏠 Try This at Home!</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed mb-2">
            <strong className="text-[#f5e199]">Leaf Disk Experiment:</strong> Cut small disks from a spinach leaf using a straw. Use a syringe to remove air from the disks (they'll sink). Place them in a clear cup of water with a little baking soda near a lamp. Watch the disks slowly float to the surface as they produce oxygen through photosynthesis!
          </p>
          <p className="text-[#c9a84c] text-xs italic">Predict: Will the disks float faster in bright light or dim light?</p>
        </div>

        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.1em] text-[#c9a84c] mt-2">
          Next Lesson: Chlorophyll & Color — Why Do Leaves Change? 🍂
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <Link href="/kyliana/science/lesson-4">
          <GhostBtn onClick={() => {}}>← Lesson 4</GhostBtn>
        </Link>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson5() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 8;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(8);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-5",
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
            ☀️ Photosynthesis — How Plants Make Food
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 5 of 10 · TEKS 4.13A
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