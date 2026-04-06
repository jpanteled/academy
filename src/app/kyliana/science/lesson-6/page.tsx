// src/app/kyliana/science/lesson-6/page.tsx
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
    q: "From Lesson 5 — what are the three ingredients a plant needs for photosynthesis?",
    options: [
      "Glucose, oxygen, and chlorophyll",
      "Sunlight, water, and carbon dioxide",
      "Chlorophyll, minerals, and sunlight",
      "Water, oxygen, and glucose",
    ],
    correct: 1,
  },
  {
    q: "From Lesson 5 — what green pigment inside chloroplasts captures sunlight?",
    options: ["Glucose", "Auxin", "Chlorophyll", "Stomata"],
    correct: 2,
  },
  {
    q: "From Lesson 4 — what organelle is where photosynthesis takes place?",
    options: ["Nucleus", "Vacuole", "Cell wall", "Chloroplast"],
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
        message="Kyliana! 🍂 Something amazing is happening outside — have you noticed? The leaves on trees are starting to change color!<br/><br/>Today's lesson is all about WHY that happens — and it connects directly to everything we learned about chlorophyll and photosynthesis. But first — warm-up time!"
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
            {score === 3 ? "✦ Perfect! Photosynthesis knowledge locked in — let's build on it!" :
             score >= 2 ? "✦ Good recall! Review the highlighted answers then let's go!" :
             "Review the highlighted answers — today's lesson connects directly to these!"}
          </motion.div>
        )}
      </Card>
      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!checked}>
          {checked ? "Let's Investigate! →" : "Answer all questions first"}
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
        message="Before we start — did you try the leaf disk experiment from Lesson 5? 🌿<br/><br/>You put spinach disks in water near a lamp and watched for oxygen bubbles. Tell me what happened — or predict what you think would have happened!"
      />
      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔬 Field Observation Report
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">The Experiment</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            You placed spinach leaf disks (with air removed) in water with baking soda near a bright lamp. Did the disks float? How long did it take?
          </p>
        </div>
        <textarea
          value={observation}
          onChange={e => setObservation(e.target.value)}
          disabled={submitted}
          placeholder="What did you observe? Did the disks float? Did bright light make a difference compared to dim light?"
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
              The disks should have floated as they produced oxygen through photosynthesis — and brighter light should have made them float faster! That's photosynthesis you could watch in real time. 🌿
            </p>
          </motion.div>
        )}
      </Card>

      <Axo
        mood="surprised"
        message="Now here's something that's been bugging me, Detective. 🍂<br/><br/>I was walking through the garden this morning and I noticed something strange — some of the leaves on our mystery plant are starting to turn yellow at the edges!<br/><br/>I thought leaves were green because of chlorophyll. So WHY are they turning yellow? Is the plant sick? Is it dying? Or is something else going on?<br/><br/>Today we solve the mystery of <strong>color!</strong>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🍂 The Hidden Colors Mystery
        </h2>
        <p className="text-[#f5e199cc] text-sm leading-relaxed mb-4">
          Here's a mind-bending fact before we watch the video:
        </p>
        <Highlight>
          <p className="text-center font-[family-name:var(--font-cinzel)] text-base text-[#f5e199]">
            "The red, orange, and yellow colors in autumn leaves were there ALL ALONG — hidden under the green!"
          </p>
        </Highlight>
        <p className="text-[#f5e199cc] text-sm leading-relaxed mt-3">
          Look at this diagram — every leaf contains multiple pigments. In spring and summer, chlorophyll is so abundant it covers everything else up. In autumn, that changes.
        </p>
        <div className="mt-4">
          <ImageModal src="/images/science/plants/leaf-colors.png" alt="Why leaves change color in fall" />
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
      q: "According to the video, why are most leaves green in spring and summer?",
      options: [
        "Because the soil makes them green",
        "Because chlorophyll is so abundant it covers up all other colors",
        "Because they absorb green light from the sun",
        "Because water inside leaves appears green",
      ],
      correct: 1,
    },
    {
      q: "What causes trees to start making less chlorophyll in autumn?",
      options: [
        "The temperature drops below freezing",
        "The tree runs out of water",
        "The days get shorter so less sunlight hits the leaves",
        "Animals eat the chlorophyll",
      ],
      correct: 2,
    },
    {
      q: "According to the video, where have you already seen leaf pigments — other than in leaves?",
      options: [
        "In the sky during sunset",
        "In carrots, cabbage, and cherries",
        "In the color of soil",
        "In the color of water",
      ],
      correct: 1,
    },
    {
      q: "Why do leaves eventually fall off the tree in winter?",
      options: [
        "The wind blows them off",
        "They freeze and break",
        "Without chlorophyll they can't make energy, so the tree releases them",
        "The tree pushes them off to make room for new ones",
      ],
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
          ✦ Great watching! Now let's go deeper into the pigments!
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
        message="I found a perfect SciShow Kids video that explains exactly why leaves change color! 🎬<br/><br/>It's only 3 minutes and it has a quote at the end that I think is going to blow your mind. Listen carefully!<br/><br/><em style='color:#c9a84c'>Listen for: chlorophyll, pigments, and what happens to the energy before the leaves fall!</em>"
      />
      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎬 Axo's Science Lab: Why Leaves Change Color
        </h2>
        <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/Xk4-6II8l5Q"
            title="Why Do Leaves Change Color?"
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
        message="Did you catch the ending? <em style='color:#c9a84c'>'Those colors were there all along — autumn is just their time to shine!'</em> 🍂<br/><br/>That's one of the most beautiful things about science — sometimes the most spectacular things were hidden right in front of us the whole time. Now let's check what you learned!"
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
// SCENE 4 — PIGMENTS DEEP DIVE
// ══════════════════════════════════════════════════════════════
function Scene4({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});

  const pigments = [
    {
      id: "chlorophyll",
      name: "Chlorophyll",
      word: "chlorophyll",
      color: "text-[#4caf7d]",
      border: "border-[#4caf7d55]",
      bg: "bg-[#4caf7d0a]",
      leafColor: "🟢 Green",
      season: "Spring & Summer",
      job: "Captures sunlight for photosynthesis — the most important pigment!",
      food: "Spinach, kale, broccoli",
      fact: "There's so much chlorophyll in summer leaves that it hides ALL the other colors completely.",
    },
    {
      id: "carotenoids",
      name: "Carotenoids",
      word: "carotenoids",
      color: "text-[#f5a623]",
      border: "border-[#f5a62355]",
      bg: "bg-[#f5a6230a]",
      leafColor: "🟡 Yellow & Orange",
      season: "Always present, visible in Autumn",
      job: "Help capture additional light energy and protect the leaf from too much sun",
      food: "Carrots (orange), corn (yellow), bananas (yellow)",
      fact: "Carotenoids are always in the leaf — they just get covered up by chlorophyll in summer!",
    },
    {
      id: "anthocyanins",
      name: "Anthocyanins",
      word: "anthocyanins",
      color: "text-[#c9a84c]",
      border: "border-[#c9a84c55]",
      bg: "bg-[#c9a84c0a]",
      leafColor: "🔴 Red & Purple",
      season: "Made in Autumn",
      job: "Actually made NEW in autumn as sugars get trapped in the leaf — act as sunscreen for the leaf",
      food: "Cherries, red cabbage, blueberries, red apples",
      fact: "Unlike carotenoids, anthocyanins are NOT always there — the tree actually makes them fresh in autumn!",
    },
    {
      id: "tannins",
      name: "Tannins",
      word: "tannins",
      color: "text-[#9e7c4a]",
      border: "border-[#9e7c4a55]",
      bg: "bg-[#9e7c4a0a]",
      leafColor: "🟤 Brown",
      season: "Late Autumn — dead leaves",
      job: "Waste products left behind as the leaf dies — not a true pigment, just what's left over",
      food: "Tea, red wine, dark chocolate (that bitter taste!)",
      fact: "Brown leaves are dead leaves — the tannins are all that's left after everything useful has been taken back into the tree.",
    },
  ];

  const matchItems = [
    { id: "m1", pigment: "Chlorophyll", color: "Green" },
    { id: "m2", pigment: "Carotenoids", color: "Yellow & Orange" },
    { id: "m3", pigment: "Anthocyanins", color: "Red & Purple" },
    { id: "m4", pigment: "Tannins", color: "Brown (dead leaf)" },
  ];

  const shuffledColors = ["Red & Purple", "Brown (dead leaf)", "Green", "Yellow & Orange"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Now let's meet the cast of characters — the four pigments that give leaves their colors! 🎨<br/><br/>Each one has a different job, appears at a different time of year, and you've probably already eaten most of them without knowing it!<br/><br/>Tap each pigment to investigate!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎨 The Four Leaf <span className="inline-flex items-center gap-1">Pigments <Pronounce word="pigments" /></span>
        </h2>
        <div className="space-y-3">
          {pigments.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setRevealed(prev => { const next = new Set(prev); next.has(p.id) ? next.delete(p.id) : next.add(p.id); return next; })}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(p.id) ? `${p.border} ${p.bg}` : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className={`font-[family-name:var(--font-cinzel)] text-sm font-bold ${p.color}`}>{p.name}</p>
                    <Pronounce word={p.word} />
                  </div>
                  <p className="text-[#c9a84c99] text-xs">{p.leafColor} · {p.season}</p>
                </div>
                <span className="text-[#c9a84c55] text-xs">{revealed.has(p.id) ? "▲" : "▼ Tap"}</span>
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
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🔬 Job</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed">{p.job}</p>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🍎 You've eaten it in...</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed italic">{p.food}</p>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">💡 Cool Fact</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed italic">{p.fact}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <Divider />

        <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-[#f5e199] mb-3">
          🔗 Match: Pigment to Color
        </h3>
        <p className="text-[#f5e199cc] text-xs mb-4 font-[family-name:var(--font-crimson)]">
          Tap a pigment on the left, then tap its leaf color on the right.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] text-center mb-2 tracking-wider uppercase">Pigment</p>
            {matchItems.map(m => (
              <motion.button
                key={m.id}
                onClick={() => { if (matchAnswers[m.id]) return; setMatchAnswers(prev => ({ ...prev, selected: m.id })); }}
                className={`w-full text-center p-2 rounded-xl mb-2 text-xs font-[family-name:var(--font-cinzel)] border transition-all cursor-pointer ${
                  matchAnswers[m.id]
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : matchAnswers.selected === m.id
                    ? "border-[#f5e199] bg-[#331870] text-[#f5e199]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199] hover:border-[#c9a84c]"
                }`}
              >
                {m.pigment}
              </motion.button>
            ))}
          </div>
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] text-center mb-2 tracking-wider uppercase">Color</p>
            {shuffledColors.map(color => (
              <motion.button
                key={color}
                onClick={() => {
                  if (!matchAnswers.selected) return;
                  const selectedId = matchAnswers.selected;
                  const correct = matchItems.find(m => m.id === selectedId)?.color === color;
                  if (correct) {
                    setMatchAnswers(prev => ({ ...prev, [selectedId]: color, selected: "" }));
                  } else {
                    setMatchAnswers(prev => ({ ...prev, selected: "" }));
                  }
                }}
                className={`w-full text-left p-2 rounded-xl mb-2 text-xs font-[family-name:var(--font-crimson)] border transition-all cursor-pointer leading-snug ${
                  Object.values(matchAnswers).includes(color)
                    ? "border-[#4caf7d55] bg-[#4caf7d11] text-[#4caf7d]"
                    : "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]"
                }`}
              >
                {color}
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
            ✦ Perfect! You know all four leaf pigments!
          </motion.p>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Chromatography! →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — CHROMATOGRAPHY + SEASONAL CYCLE
// ══════════════════════════════════════════════════════════════
function Scene5({ onNext }: { onNext: () => void }) {
  const [cycleAnswers, setCycleAnswers] = useState<Record<string, string>>({});
  const [cycleChecked, setCycleChecked] = useState(false);

  const cycleQuestions = [
    {
      id: "c1",
      q: "In spring, a tree grows new leaves. They are bright green. Which pigment is most responsible?",
      options: ["Tannins", "Anthocyanins", "Chlorophyll", "Carotenoids"],
      correct: "Chlorophyll",
    },
    {
      id: "c2",
      q: "As days get shorter in autumn, the tree makes less chlorophyll. What colors become visible?",
      options: ["Blue and purple only", "Yellow and orange from carotenoids", "Brown from tannins", "Red from new chlorophyll"],
      correct: "Yellow and orange from carotenoids",
    },
    {
      id: "c3",
      q: "Trapped sugars in autumn leaves cause the tree to produce a new pigment. What color does this create?",
      options: ["Green", "Yellow", "Red and purple from anthocyanins", "Brown"],
      correct: "Red and purple from anthocyanins",
    },
    {
      id: "c4",
      q: "Finally, the leaf dies and falls. What color is it, and why?",
      options: [
        "Green — chlorophyll returns",
        "Red — anthocyanins increase",
        "Brown — only tannins (waste products) remain",
        "Yellow — carotenoids dominate",
      ],
      correct: "Brown — only tannins (waste products) remain",
    },
  ];

  const allAnswered = cycleQuestions.every(q => cycleAnswers[q.id]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Here's something incredible — scientists can actually SEPARATE the hidden pigments in a leaf using a simple experiment called <strong>chromatography!</strong> 🔬<br/><br/>Look at this photo — these aren't colored with dye. Those are the REAL pigments from markers being separated by water traveling up the paper. We can do the exact same thing with a leaf!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🧪 <span className="inline-flex items-center gap-1">Chromatography <Pronounce word="chromatography" /></span> — Separating Hidden Colors
        </h2>
        <ImageModal src="/images/science/plants/chromatography.jpg" alt="Paper chromatography separating pigments" />
        <div className="mt-4 space-y-2">
          {[
            { icon: "1️⃣", text: "A pigment mixture is placed at the bottom of a strip of paper." },
            { icon: "2️⃣", text: "The paper is dipped in water or solvent (a liquid that dissolves things)." },
            { icon: "3️⃣", text: "The liquid travels up the paper, carrying the pigments with it." },
            { icon: "4️⃣", text: "Lighter pigments travel further up — heavier ones stay lower." },
            { icon: "5️⃣", text: "Each pigment separates into its own band of color — the hidden colors are revealed!" },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm">{step.icon} {step.text}</p>
              </Highlight>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">🌿 With a real leaf...</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            If you crush a green leaf and do chromatography on it, you'd see bands of green (chlorophyll), yellow (xanthophyll), and orange (carotene) — all hidden inside what looked like a plain green leaf!
          </p>
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Now let's trace the full seasonal cycle of a leaf — from brand new spring green all the way to falling brown. Think carefully about which pigment is responsible at each stage!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔄 The Seasonal Color Cycle
        </h2>
        <p className="text-[#f5e199cc] text-sm mb-4 font-[family-name:var(--font-crimson)]">
          Trace a leaf through the seasons — which pigment is responsible at each stage?
        </p>
        {cycleQuestions.map((q, qi) => {
          const chosen = cycleAnswers[q.id];
          const isCorrect = chosen === q.correct;
          return (
            <div key={q.id} className="mb-5 pb-5 border-b border-[#c9a84c11] last:border-0 last:mb-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#c9a84c22] border border-[#c9a84c44] flex items-center justify-center text-xs text-[#c9a84c] font-[family-name:var(--font-cinzel)] flex-shrink-0">{qi + 1}</span>
                <p className="text-[#f5e199] text-sm font-[family-name:var(--font-crimson)]">{q.q}</p>
              </div>
              <div className="space-y-1">
                {q.options.map(opt => {
                  let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                  if (cycleChecked) {
                    if (opt === q.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                    else if (opt === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                    else style = "border-[#c9a84c22] text-[#f5e199cc]";
                  } else if (chosen === opt) {
                    style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => { if (cycleChecked) return; setCycleAnswers(prev => ({ ...prev, [q.id]: opt })); }}
                      disabled={cycleChecked}
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
        {!cycleChecked && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: allAnswered ? 1.02 : 1 }}
              onClick={() => setCycleChecked(true)}
              disabled={!allAnswered}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check My Answers ✦
            </motion.button>
          </div>
        )}
        {cycleChecked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm mt-3"
          >
            ✦ You traced the full seasonal cycle — now on to the field journal!
          </motion.p>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!cycleChecked}>
          {cycleChecked ? "Next: Field Journal →" : "Complete the cycle activity first!"}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 6 — FIELD JOURNAL
// ══════════════════════════════════════════════════════════════
function Scene6({ onNext }: { onNext: () => void }) {
  const [journal, setJournal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="proud"
        message="Detective — you just learned something that most adults don't know! 🍂<br/><br/>The next time someone says 'Oh look, the leaves are changing color!' — you can explain exactly WHY. The colors were always there. Chlorophyll was just covering them up.<br/><br/>That's the kind of knowledge that changes how you see the world. Write about it!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📓 Field Journal — Lesson 6
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">Today's Prompt</p>
          <p className="text-[#f5e199] text-base leading-relaxed">
            Imagine you're explaining autumn leaves to a younger kid who has never thought about it before. In your own words, explain why leaves change color — and tell them something surprising that most people don't know about it.
          </p>
        </div>
        <textarea
          value={journal}
          onChange={e => setJournal(e.target.value)}
          disabled={submitted}
          placeholder="Write your explanation here... (at least 3 sentences)"
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
            <p className="text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm">✦ Journal entry saved! You're thinking like a real scientist!</p>
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
    q: "Why are most leaves green in spring and summer?",
    options: [
      "Because trees absorb green light from the sun",
      "Because chlorophyll is so abundant it covers up all other pigments",
      "Because the soil makes them green",
      "Because water inside cells appears green",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! Chlorophyll dominates in spring and summer — hiding every other color completely!",
      wrong: "Chlorophyll is a green pigment that is so abundant in summer that it covers up all other colors in the leaf.",
    },
  },
  {
    q: "Which pigments produce the yellow and orange colors in autumn leaves?",
    options: ["Chlorophyll", "Anthocyanins", "Carotenoids", "Tannins"],
    correct: 2,
    feedback: {
      right: "✦ Right! Carotenoids are always in the leaf — they just get revealed when chlorophyll fades!",
      wrong: "Carotenoids produce yellow and orange. They're always present in the leaf but hidden by chlorophyll in summer.",
    },
  },
  {
    q: "What causes the red and purple colors in some autumn leaves?",
    options: [
      "Carotenoids breaking down",
      "Chlorophyll turning red in cold weather",
      "Anthocyanins produced from trapped sugars in autumn",
      "Tannins accumulating in the leaf",
    ],
    correct: 2,
    feedback: {
      right: "✦ Excellent! Anthocyanins are actually MADE in autumn from trapped sugars — they're not hidden like carotenoids!",
      wrong: "Anthocyanins create red and purple. Unlike carotenoids, they are newly produced in autumn from sugars trapped in the leaf.",
    },
  },
  {
    q: "A student notices that leaves in a shady forest turn yellow in autumn but NOT red. What is the most likely explanation?",
    options: [
      "Shady trees have more chlorophyll",
      "Less sunlight means less sugar production, so fewer anthocyanins are made",
      "Shade prevents carotenoids from forming",
      "Red pigments require more water than shady areas provide",
    ],
    correct: 1,
    feedback: {
      right: "✦ Outstanding reasoning! Anthocyanins need trapped sugars — less sun means less photosynthesis means less sugar means less red!",
      wrong: "Anthocyanins (red) are made from trapped sugars. Less sunlight = less photosynthesis = less sugar = fewer anthocyanins = no red color.",
    },
  },
  {
    q: "What does chromatography reveal about a green leaf?",
    options: [
      "That leaves contain only chlorophyll",
      "That leaves have multiple hidden pigments including yellow and orange",
      "That green leaves have no other colors",
      "That chlorophyll is the heaviest pigment",
    ],
    correct: 1,
    feedback: {
      right: "✦ Correct! Chromatography separates the hidden pigments — revealing yellow and orange that were always there!",
      wrong: "Chromatography separates leaf pigments, revealing that even green leaves contain yellow and orange pigments hidden by chlorophyll.",
    },
  },
  {
    q: "Why do leaves eventually turn brown and fall?",
    options: [
      "The tree pushes them off to make room for new leaves",
      "Frost freezes and kills them",
      "Without chlorophyll the leaves can't make energy, so the tree reclaims nutrients and releases them",
      "Rain washes the color out of them",
    ],
    correct: 2,
    feedback: {
      right: "✦ Right! The tree is efficient — it reclaims all the useful stuff before dropping the leaf!",
      wrong: "When chlorophyll breaks down, leaves can't make energy. The tree reclaims useful nutrients, then releases the leaf. Brown tannins are all that's left.",
    },
  },
  {
    q: "You've eaten pigments from autumn leaves without knowing it! Which food contains anthocyanins — the red/purple pigment?",
    options: ["Carrots", "Corn", "Blueberries", "Bananas"],
    correct: 2,
    feedback: {
      right: "✦ Correct! Blueberries get their deep purple-blue color from anthocyanins — same pigment as red autumn leaves!",
      wrong: "Blueberries contain anthocyanins — the same red/purple pigment in autumn leaves. Carrots and corn contain carotenoids (yellow/orange).",
    },
  },
  {
    q: "The video said 'those colors were there all along — autumn is just their time to shine.' Which pigments does this BEST describe?",
    options: [
      "Anthocyanins — because they are newly made in autumn",
      "Tannins — because they appear when leaves die",
      "Carotenoids — because they are always present but hidden by chlorophyll",
      "Chlorophyll — because it is always the dominant pigment",
    ],
    correct: 2,
    feedback: {
      right: "✦ Perfect! Carotenoids (yellow/orange) are always there — hidden all spring and summer, finally revealed in autumn!",
      wrong: "The quote refers to carotenoids — the yellow and orange pigments that are always present in leaves but hidden by chlorophyll until autumn.",
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
        message="You've learned the secret behind one of nature's most beautiful displays! 🍂<br/><br/>8 questions — let's see how well you know your pigments, Detective! 💪"
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
    ? { mood: "proud" as AxoMood, msg: "PERFECT SCORE! 🍂 You just proved you know more about autumn leaves than most adults! Every single question correct. I am SO proud of you, Detective! See you in Lesson 7!", scoreMsg: "🌟 Perfect Score! You are a leaf pigment expert!" }
    : pct >= 80
    ? { mood: "excited" as AxoMood, msg: "Fantastic work! 🍁 You really understand pigments and why leaves change color. Check the ones you missed and get ready for Lesson 7!", scoreMsg: "🍁 Excellent! Strong understanding of leaf pigments and the seasonal cycle." }
    : pct >= 60
    ? { mood: "neutral" as AxoMood, msg: "Good effort! 🌱 Chlorophyll vs carotenoids vs anthocyanins can be tricky to keep straight. Review before Lesson 7 — you've got this!", scoreMsg: "🌱 Good work! Review the four pigments before moving on." }
    : { mood: "encouraging" as AxoMood, msg: "Don't worry — there were a lot of new words today! 🔬 Let's go back through the pigments together. You'll get it!", scoreMsg: "🔬 Keep going! Review the lesson and try again." };

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
          Lesson 6 Complete · TEKS 4.13A
        </p>
        <p className="text-[#f5e199cc] text-lg font-[family-name:var(--font-crimson)] leading-relaxed">{config.scoreMsg}</p>
      </motion.div>

      <Axo mood={config.mood} message={config.msg} />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📚 What You Learned Today
        </h2>
        {[
          "Leaves contain four pigments: chlorophyll (green), carotenoids (yellow/orange), anthocyanins (red/purple), and tannins (brown).",
          "In spring and summer, chlorophyll dominates — hiding all other colors.",
          "In autumn, shorter days cause the tree to stop making chlorophyll — revealing hidden carotenoids.",
          "Anthocyanins are newly made in autumn from trapped sugars — they're not hidden, they're brand new!",
          "Brown leaves are dead — only tannins (waste products) remain after everything useful is reclaimed.",
          "Chromatography can separate and reveal the hidden pigments inside a green leaf.",
          "You've eaten leaf pigments — carotenoids in carrots and corn, anthocyanins in blueberries and cherries!",
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
            {["chlorophyll", "carotenoids", "anthocyanins", "tannins", "pigment", "chromatography"].map(w => (
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
            <strong className="text-[#f5e199]">Leaf Chromatography:</strong> Tear a green leaf into small pieces and place in a jar with a small amount of rubbing alcohol. Let it sit for an hour. Then dip a strip of coffee filter paper into the liquid and watch the pigments separate as the liquid travels up the paper — you'll see the hidden colors!
          </p>
          <p className="text-[#c9a84c] text-xs italic">Predict: How many different color bands do you think you'll see?</p>
        </div>

        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.1em] text-[#c9a84c] mt-2">
          Next Lesson: Plant Adaptations — How Plants Survive Anywhere 🌵
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <Link href="/kyliana/science/lesson-5">
          <GhostBtn onClick={() => {}}>← Lesson 5</GhostBtn>
        </Link>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson6() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 8;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(8);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-6",
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
            🍂 Chlorophyll & Color — Why Leaves Change
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 6 of 10 · TEKS 4.13A
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