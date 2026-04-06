// src/app/kyliana/science/lesson-3/page.tsx
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

// ── Pronounce Button ───────────────────────────────────────────
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
      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
      };
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
        speaking
          ? "border-[#4caf7d] text-[#4caf7d] bg-[#4caf7d11]"
          : loading
          ? "border-[#c9a84c33] text-[#c9a84c55] bg-transparent"
          : "border-[#c9a84c55] text-[#c9a84c] hover:border-[#c9a84c] bg-transparent"
      }`}
    >
      {loading ? "⏳" : speaking ? "🔊" : "🔉"}
    </motion.button>
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

// ── Vocab Term ─────────────────────────────────────────────────
function VocabTerm({ word, children }: { word: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-0.5 flex-wrap">
      <strong className="text-[#f5e199]">{children}</strong>
      <Pronounce word={word} />
    </span>
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
        message="Kyliana! Something STRANGE happened overnight! 😱<br/><br/>I left our mystery plant on the windowsill and when I came back this morning — it had <strong>moved!</strong> Well, not walked anywhere... but it's definitely <strong>leaning toward the window!</strong><br/><br/>How does a plant with no brain, no muscles, and no eyes know which direction to grow? That's what we're investigating today!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌱 Today's Big Question
        </h2>
        <Highlight>
          <p className="text-center font-[family-name:var(--font-cinzel)] text-base text-[#f5e199]">
            "How do plant structures respond to their environment?"
          </p>
        </Highlight>
        <p className="text-[#f5e199cc] text-base leading-relaxed mb-4">
          In Lesson 1 we learned that living things <strong className="text-[#f5e199]">respond to their environment</strong>. Today we discover exactly HOW plants do that — using a secret superpower called <VocabTerm word="tropism">tropisms</VocabTerm>!
        </p>
        {[
          { text: "🌞 Phototropism — responding to light", word: "phototropism" },
          { text: "⬇️ Gravitropism — responding to gravity", word: "gravitropism" },
          { text: "💧 Hydrotropism — responding to water", word: "hydrotropism" },
          { text: "🧪 Auxin — the hormone that controls it all", word: "auxin" },
        ].map((item, i) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-2 mb-2"
          >
            <p className="text-[#f5e199] text-base font-[family-name:var(--font-crimson)]">{item.text}</p>
            <Pronounce word={item.word} />
          </motion.div>
        ))}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Start Investigating! 🔬</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 2 — VIDEO
// ══════════════════════════════════════════════════════════════
function VideoQuiz({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [checked, setChecked] = useState(false);

  const questions = [
    {
      q: "What is the name for a plant's growth response to a stimulus?",
      options: ["Photosynthesis", "Tropism", "Transpiration", "Germination"],
      correct: 1,
    },
    {
      q: "What is the plant hormone that controls growth responses?",
      options: ["Chlorophyll", "Glucose", "Auxin", "Stomata"],
      correct: 2,
    },
    {
      q: "In the video, which side of the stem did more auxin accumulate on?",
      options: ["The sunny side", "The shaded side", "The bottom", "The top"],
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
          ✦ Nice work! Now let's go deeper!
        </motion.p>
      )}
    </Card>
  );
}

function Scene2({ onNext }: { onNext: () => void }) {
  const [videoChecked, setVideoChecked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Before we go further, I want to show you something from my science lab! 🎬<br/><br/>I recorded this video about plant <strong>tropisms</strong> — it's only about 3 minutes long. Watch it carefully because I'm going to ask you some questions about it afterward!<br/><br/><em style='color:#c9a84c'>Tip: Listen for phototropism, gravitropism, hydrotropism, and auxin!</em>"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🎬 Axo's Science Lab: Plant <span className="inline-flex items-center gap-1">Tropisms <Pronounce word="tropisms" /></span>
        </h2>
        <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/pCFstSMvAMI"
            title="Plant Tropisms"
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
        message="Great! Now let's check what you learned from the video. Answer these three questions before we move on!"
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
// SCENE 3 — TROPISMS DEEP DIVE
// ══════════════════════════════════════════════════════════════
function Scene3({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const tropisms = [
    {
      id: "photo",
      name: "Phototropism",
      word: "phototropism",
      stimulus: "Light ☀️",
      icon: "🌞",
      color: "text-[#f5e199]",
      border: "border-[#f5e19955]",
      bg: "bg-[#f5e19911]",
      stemResponse: "Grows TOWARD light (positive phototropism)",
      rootResponse: "Grows AWAY from light (negative phototropism)",
      why: "Leaves need sunlight to perform photosynthesis. Growing toward light means more food!",
      example: "A sunflower tracks the sun across the sky all day long.",
    },
    {
      id: "gravi",
      name: "Gravitropism",
      word: "gravitropism",
      stimulus: "Gravity ⬇️",
      icon: "🌍",
      color: "text-[#7d9fc9]",
      border: "border-[#7d9fc955]",
      bg: "bg-[#7d9fc911]",
      stemResponse: "Grows UP, against gravity (negative gravitropism)",
      rootResponse: "Grows DOWN, with gravity (positive gravitropism)",
      why: "Roots need to anchor deep in soil and find water. Stems need to rise above ground toward light.",
      example: "If you turn a plant sideways, the roots curve back down and the stem curves back up within days.",
    },
    {
      id: "hydro",
      name: "Hydrotropism",
      word: "hydrotropism",
      stimulus: "Water 💧",
      icon: "💧",
      color: "text-[#4caf7d]",
      border: "border-[#4caf7d55]",
      bg: "bg-[#4caf7d11]",
      stemResponse: "Minimal response",
      rootResponse: "Grows TOWARD water sources (positive hydrotropism)",
      why: "Roots need water to survive. Growing toward moisture ensures the plant stays hydrated.",
      example: "Tree roots grow toward underground pipes and water sources — sometimes even cracking them!",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="thinking"
        message="Now let's really dig into each type of tropism. The video gave you the overview — now we go deeper! 🔬<br/><br/>Remember: tropisms can be <strong>positive</strong> (growing TOWARD a stimulus) or <strong>negative</strong> (growing AWAY from it).<br/><br/>Tap each tropism to explore it!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🌱 The Three Major Tropisms
        </h2>
        <div className="space-y-3">
          {tropisms.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              onClick={() => setRevealed(prev => {
                const next = new Set(prev);
                next.has(t.id) ? next.delete(t.id) : next.add(t.id);
                return next;
              })}
              className={`rounded-xl p-4 cursor-pointer border transition-all ${
                revealed.has(t.id) ? `${t.border} ${t.bg}` : "border-[#c9a84c33] bg-[#1a0d45] hover:border-[#c9a84c]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className={`font-[family-name:var(--font-cinzel)] text-sm font-bold ${t.color}`}>{t.name}</p>
                    <Pronounce word={t.word} />
                  </div>
                  <p className="text-[#c9a84c99] text-xs">Stimulus: {t.stimulus}</p>
                </div>
                <span className="text-[#c9a84c55] text-xs font-[family-name:var(--font-cinzel)]">
                  {revealed.has(t.id) ? "▲" : "▼ Tap"}
                </span>
              </div>
              <AnimatePresence>
                {revealed.has(t.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                        <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🌿 Stem</p>
                        <p className="text-[#f5e199cc] text-xs leading-relaxed">{t.stemResponse}</p>
                      </div>
                      <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                        <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">🌱 Root</p>
                        <p className="text-[#f5e199cc] text-xs leading-relaxed">{t.rootResponse}</p>
                      </div>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#f5e199] mb-1">❓ Why?</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed">{t.why}</p>
                    </div>
                    <div className="bg-[#1a0d45] rounded-lg p-3 border border-[#c9a84c22]">
                      <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">💡 Real World Example</p>
                      <p className="text-[#f5e199cc] text-xs leading-relaxed italic">{t.example}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>

      <Axo
        mood="proud"
        message="Here's a memory trick for keeping these straight:<br/><br/>📸 <strong>Photo</strong>tropism = <strong>Photo</strong>graph = LIGHT<br/>🌍 <strong>Gravi</strong>tropism = <strong>Gravi</strong>ty = DOWN<br/>🚿 <strong>Hydro</strong>tropism = <strong>Hydro</strong>gen = WATER<br/><br/>Say them three times fast — photo, gravi, hydro!"
      />

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Auxin! →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 4 — AUXIN + PREDICTIONS
// ══════════════════════════════════════════════════════════════
function Scene4({ onNext }: { onNext: () => void }) {
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const scenarios = [
    {
      id: "s1",
      scenario: "A seedling is placed in a dark box with a small hole on the LEFT side letting in light.",
      question: "Which direction will the stem grow?",
      options: ["Toward the left (toward the light)", "Toward the right (away from light)", "Straight up", "Straight down"],
      correct: "Toward the left (toward the light)",
      explanation: "Phototropism! Auxin accumulates on the shaded right side, making it grow faster and bending the stem LEFT toward the light.",
    },
    {
      id: "s2",
      scenario: "A seed is planted UPSIDE DOWN so the root tip is pointing up.",
      question: "Which direction will the root grow after germination?",
      options: ["It will grow upward", "It will curve and grow downward", "It will grow sideways", "It won't grow at all"],
      correct: "It will curve and grow downward",
      explanation: "Gravitropism! Roots always respond positively to gravity — they'll curve back DOWN no matter which way they start.",
    },
    {
      id: "s3",
      scenario: "A plant's roots detect a water source 10cm to the right deep in the soil.",
      question: "What will the roots most likely do?",
      options: ["Grow straight down regardless", "Grow upward toward the surface", "Curve and grow toward the water source", "Stop growing"],
      correct: "Curve and grow toward the water source",
      explanation: "Hydrotropism! Roots respond positively to water — they'll change direction to reach that water source.",
    },
    {
      id: "s4",
      scenario: "A plant is placed on its side. Both the stem and roots are now horizontal.",
      question: "After a few days, what will happen?",
      options: [
        "Nothing — the plant stays sideways",
        "The stem curves upward and the roots curve downward",
        "Both the stem and roots grow downward",
        "The plant dies",
      ],
      correct: "The stem curves upward and the roots curve downward",
      explanation: "Both phototropism AND gravitropism at work! The stem grows up (negative gravitropism) and roots grow down (positive gravitropism).",
    },
  ];

  const allAnswered = Object.keys(predictions).length === scenarios.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="excited"
        message="Now let's talk about the secret behind ALL tropisms — <span style='display:inline-flex;align-items:center;gap:4px'><strong>auxin!</strong></span> 🧪<br/><br/>Auxin is a plant <strong>hormone</strong> made at the tips of stems and roots. Here's the key: <em style='color:#c9a84c'>auxin makes cells grow longer.</em><br/><br/>When light hits a stem unevenly, more auxin moves to the <strong>shaded side</strong> — making those cells grow longer — which bends the stem TOWARD the light!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-2 pb-3 border-b border-[#c9a84c22]">
          🧪 How <span className="inline-flex items-center gap-1">Auxin <Pronounce word="auxin" /></span> Works
        </h2>
        <div className="space-y-2 mt-4">
          {[
            { icon: "1️⃣", text: "Auxin is produced at the tip of a stem or root." },
            { icon: "2️⃣", text: "A stimulus (light, gravity, water) causes auxin to distribute unevenly." },
            { icon: "3️⃣", text: "The side with MORE auxin grows LONGER." },
            { icon: "4️⃣", text: "The plant bends toward or away from the stimulus." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Highlight>
                <p className="text-[#f5e199] text-sm leading-relaxed">{step.icon} {step.text}</p>
              </Highlight>
            </motion.div>
          ))}
        </div>

        <Divider />

        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">🌍 Real World Use</p>
          <p className="text-[#f5e199cc] text-sm leading-relaxed">
            Farmers use synthetic auxins in <strong className="text-[#f5e199]">rooting powder</strong> — dip a plant cutting in it and it stimulates root growth, letting you grow a new plant from a cutting!
          </p>
        </div>
      </Card>

      <Axo
        mood="thinking"
        message="Now it's YOUR turn to think like a scientist! 🔬<br/><br/>I'm going to describe some scenarios and you predict what the plant will do. Use what you know about <strong>phototropism</strong>, <strong>gravitropism</strong>, <strong>hydrotropism</strong>, and <strong>auxin</strong>!<br/><br/>This is higher level thinking — take your time!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🔮 Predict the Plant's Response
        </h2>
        {scenarios.map((s, i) => {
          const chosen = predictions[s.id];
          const isCorrect = chosen === s.correct;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-6 pb-6 border-b border-[#c9a84c22] last:border-0 last:mb-0 last:pb-0"
            >
              <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-3">
                <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-1">Scenario {i + 1}</p>
                <p className="text-[#f5e199] text-sm leading-relaxed">{s.scenario}</p>
              </div>
              <p className="text-[#c9a84c] text-xs mb-2 font-[family-name:var(--font-cinzel)] tracking-wider">{s.question}</p>
              <div className="space-y-1">
                {s.options.map(opt => {
                  let style = "border-[#c9a84c33] bg-[#1a0d45] text-[#f5e199cc] hover:border-[#c9a84c]";
                  if (checked) {
                    if (opt === s.correct) style = "border-[#4caf7d] bg-[#4caf7d22] text-[#4caf7d]";
                    else if (opt === chosen && !isCorrect) style = "border-[#e24b4a] bg-[#e24b4a11] text-[#e24b4a]";
                    else style = "border-[#c9a84c22] text-[#f5e199cc]";
                  } else if (chosen === opt) {
                    style = "border-[#f5e199] bg-[#331870] text-[#f5e199]";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => { if (checked) return; setPredictions(prev => ({ ...prev, [s.id]: opt })); }}
                      disabled={checked}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-[family-name:var(--font-crimson)] border transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {checked && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                      isCorrect
                        ? "bg-[#4caf7d11] border border-[#4caf7d33] text-[#4caf7d]"
                        : "bg-[#e24b4a11] border border-[#e24b4a33] text-[#e24b4acc]"
                    }`}
                  >
                    <strong>{isCorrect ? "✦ Correct! " : "Not quite — "}</strong>{s.explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {!checked && (
          <div className="text-center mt-4">
            <motion.button
              whileHover={{ scale: allAnswered ? 1.02 : 1 }}
              onClick={() => setChecked(true)}
              disabled={!allAnswered}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Check My Predictions ✦
            </motion.button>
          </div>
        )}
      </Card>

      <div className="text-center">
        <GoldBtn onClick={onNext}>Next: Field Journal →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — FIELD JOURNAL + TRY AT HOME
// ══════════════════════════════════════════════════════════════
function Scene5({ onNext }: { onNext: () => void }) {
  const [journal, setJournal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Axo
        mood="proud"
        message="You've learned so much today! Before the quiz, I want you to write in our <strong>Field Journal</strong> — just like real scientists do! 📓<br/><br/>Writing about what you've learned helps it stick in your brain. Take your time and use your own words!"
      />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📓 Axo's Field Journal
        </h2>
        <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4 mb-4">
          <p className="font-[family-name:var(--font-cinzel)] text-xs text-[#c9a84c] mb-2">Today's Prompt</p>
          <p className="text-[#f5e199] text-base leading-relaxed">
            Explain what a <span className="inline-flex items-center gap-1">tropism <Pronounce word="tropism" /></span> is and describe ONE example you find most interesting. Why did you choose it?
          </p>
        </div>
        <textarea
          value={journal}
          onChange={e => setJournal(e.target.value)}
          disabled={submitted}
          placeholder="Write your answer here... (at least 2-3 sentences)"
          rows={5}
          className="w-full bg-[#1a0d45] border border-[#c9a84c33] rounded-xl px-4 py-3 text-[#f5e199] text-base font-[family-name:var(--font-crimson)] leading-relaxed focus:outline-none focus:border-[#c9a84c] resize-none mb-4 placeholder-[#c9a84c44]"
        />
        {!submitted ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: journal.length > 20 ? 1.02 : 1 }}
              onClick={() => setSubmitted(true)}
              disabled={journal.length < 20}
              className="px-6 py-2 rounded-full font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-[#1a0d45] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #b8922a, #f5e199, #b8922a)" }}
            >
              Submit Journal Entry ✦
            </motion.button>
            {journal.length < 20 && journal.length > 0 && (
              <p className="text-[#c9a84c55] text-xs mt-2 font-[family-name:var(--font-cinzel)]">Keep writing! ({journal.length} characters)</p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#4caf7d11] border border-[#4caf7d33] rounded-xl p-4 text-center"
          >
            <p className="text-[#4caf7d] font-[family-name:var(--font-cinzel)] text-sm">✦ Journal entry saved! Great scientific thinking!</p>
          </motion.div>
        )}
      </Card>

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          🏠 Try This at Home!
        </h2>
        <div className="space-y-3">
          <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4">
            <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-2">🌱 Experiment 1: <span className="inline-flex items-center gap-1">Phototropism <Pronounce word="phototropism" /></span> in Action</p>
            <p className="text-[#f5e199cc] text-xs leading-relaxed mb-2">
              Place a small potted plant near a window. Over 3-5 days, observe which direction it leans. Then rotate the pot 180° and observe again!
            </p>
            <p className="text-[#c9a84c] text-xs italic">What do you predict will happen after you rotate it?</p>
          </div>
          <div className="bg-[#1a0d45] border border-[#c9a84c33] rounded-xl p-4">
            <p className="font-[family-name:var(--font-cinzel)] text-sm text-[#f5e199] mb-2">🥕 Experiment 2: <span className="inline-flex items-center gap-1">Gravitropism <Pronounce word="gravitropism" /></span> with a Carrot</p>
            <p className="text-[#f5e199cc] text-xs leading-relaxed mb-2">
              Place a carrot top (with a bit of carrot attached) in a shallow dish of water. Watch where the new green shoots grow over the next week!
            </p>
            <p className="text-[#c9a84c] text-xs italic">Which direction will the shoots grow — up or down?</p>
          </div>
        </div>
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
// SCENE 6 — QUIZ
// ══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "A plant's stem grows toward a light source. What is this growth response called?",
    options: ["Gravitropism", "Hydrotropism", "Phototropism", "Transpiration"],
    correct: 2,
    feedback: {
      right: "✦ Correct! Phototropism — photo means light. The stem grows TOWARD the light!",
      wrong: "Phototropism is the growth response to light. Photo = light. The stem grows toward light.",
    },
  },
  {
    q: "Which plant hormone is responsible for controlling tropisms by making cells grow longer?",
    options: ["Chlorophyll", "Auxin", "Glucose", "Stomatin"],
    correct: 1,
    feedback: {
      right: "✦ Excellent! Auxin is the plant hormone that controls growth responses by making cells elongate!",
      wrong: "Auxin is the plant hormone that controls tropisms. It accumulates unevenly and causes cells to grow longer on one side.",
    },
  },
  {
    q: "A farmer plants seeds upside down by mistake. What will happen to the roots when they germinate?",
    options: [
      "The roots will grow upward since that's where they started",
      "The roots will not grow at all",
      "The roots will curve and grow downward due to gravitropism",
      "The roots will grow sideways",
    ],
    correct: 2,
    feedback: {
      right: "✦ Right! Gravitropism ensures roots ALWAYS grow downward regardless of which way they start!",
      wrong: "Gravitropism (positive in roots) means roots always grow downward — even if planted upside down!",
    },
  },
  {
    q: "In phototropism, auxin accumulates on the SHADED side of a stem. What does this cause?",
    options: [
      "The shaded side grows slower, bending the stem away from light",
      "The shaded side grows faster, bending the stem toward light",
      "The sunny side grows faster, bending the stem toward light",
      "Both sides grow at the same rate",
    ],
    correct: 1,
    feedback: {
      right: "✦ Perfect! More auxin on the shaded side = faster growth on that side = stem bends TOWARD the light!",
      wrong: "Auxin makes cells grow longer. More auxin on the shaded side makes that side grow faster, bending the stem TOWARD the light.",
    },
  },
  {
    q: "Tree roots are found growing toward an underground water pipe and have cracked it. Which tropism explains this?",
    options: ["Phototropism", "Gravitropism", "Hydrotropism", "Thermotropism"],
    correct: 2,
    feedback: {
      right: "✦ Correct! Hydrotropism — roots grow TOWARD water sources. This is why tree roots can damage pipes!",
      wrong: "Hydrotropism is the growth response to water. Roots grow toward water sources — including underground pipes!",
    },
  },
  {
    q: "A scientist rotates a plant 90° so it's lying on its side. After one week, what would she MOST LIKELY observe?",
    options: [
      "The plant stays sideways with no change",
      "The stem grows downward and roots grow upward",
      "The stem curves upward and roots curve downward",
      "The plant dies from confusion",
    ],
    correct: 2,
    feedback: {
      right: "✦ Outstanding! Both tropisms at work — stem curves UP (negative gravitropism) and roots curve DOWN (positive gravitropism)!",
      wrong: "Gravitropism: stems grow UP (against gravity) and roots grow DOWN (with gravity) — regardless of starting position.",
    },
  },
];

function Scene6({ onFinish }: { onFinish: (score: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
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
        message="You've investigated tropisms, auxin, made predictions, and written in your field journal — just like a real botanist! 🌿<br/><br/>Now it's time for your <strong>final quiz</strong> — 6 questions because you're ready for the challenge! 💪"
      />

      {QUIZ_QUESTIONS.map((q, qi) => {
        const chosen = answers[qi];
        const isCorrect = chosen === q.correct;
        return (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.08 }}
            className="bg-[#2a1660] border border-[#c9a84c33] rounded-2xl p-6 mb-4"
          >
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-2">
              Question {qi + 1} of 6
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
          {allAnswered ? "See My Score ✦" : `Answer all questions (${answers.filter(a => a !== null).length}/6)`}
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 7 — SCORE
// ══════════════════════════════════════════════════════════════
function Scene7({ score, onRestart }: { score: number; onRestart: () => void }) {
  const pct = Math.round((score / 6) * 100);

  const config = pct === 100
    ? { mood: "proud" as AxoMood, msg: "PERFECT SCORE on a 6-question quiz! 🎉 You are an absolute MASTER of plant tropisms! I'm adding 'Tropism Expert' to your field notebook. See you in Lesson 4!", scoreMsg: "🌟 Perfect Score! You nailed every single question!" }
    : pct >= 80
    ? { mood: "excited" as AxoMood, msg: "Fantastic work Detective! 🌿 You really understand how plants respond to their environment. Check the ones you missed and you'll be ready for Lesson 4!", scoreMsg: "🌿 Excellent! Strong understanding of tropisms and auxin." }
    : pct >= 60
    ? { mood: "neutral" as AxoMood, msg: "Good effort! 🌱 Tropisms can be tricky — especially the positive vs. negative part. Review and you've got this!", scoreMsg: "🌱 Good work! Review positive vs negative tropisms before moving on." }
    : { mood: "encouraging" as AxoMood, msg: "Don't worry — this was a harder lesson! 🔬 Let's go back through tropisms and auxin together. You'll get it!", scoreMsg: "🔬 Keep going! Review the lesson — tropisms take practice!" };

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
          {score}/6
        </motion.p>
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] uppercase text-[#c9a84c99] mb-4">
          Lesson 3 Complete · TEKS 4.13A
        </p>
        <p className="text-[#f5e199cc] text-lg font-[family-name:var(--font-crimson)] leading-relaxed">{config.scoreMsg}</p>
      </motion.div>

      <Axo mood={config.mood} message={config.msg} />

      <Card>
        <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#f5e199] mb-4 pb-3 border-b border-[#c9a84c22]">
          📚 What You Learned Today
        </h2>
        {[
          "Tropisms are plant growth responses to stimuli — positive (toward) or negative (away from) the stimulus.",
          "Phototropism = response to light. Stems grow toward light, roots grow away.",
          "Gravitropism = response to gravity. Roots grow down, stems grow up.",
          "Hydrotropism = response to water. Roots grow toward water sources.",
          "Auxin is the plant hormone that controls tropisms by making cells grow longer on one side.",
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
          Next Lesson: Internal Plant Structures — Inside the Cell 🔬
        </p>
      </Card>

      <div className="text-center flex gap-4 justify-center flex-wrap">
        <GoldBtn onClick={onRestart}>Review Lesson ↺</GoldBtn>
        <Link href="/kyliana/science/lesson-2">
          <GhostBtn onClick={() => {}}>← Lesson 2</GhostBtn>
        </Link>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function Lesson3() {
  const [scene, setScene] = useState(1);
  const [score, setScore] = useState(0);
  const TOTAL = 7;

  const next = () => setScene(s => s + 1);

  const handleFinish = (s: number) => {
    setScore(s);
    setScene(7);
    saveLessonProgress({
      studentId: "kyliana",
      lessonId: "science-lesson-3",
      subject: "Science",
      unit: "Life Science — Plants",
      teks: "4.13A",
      score: s,
      totalQuestions: 6,
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
            🌿 How Plants Respond to Their World
          </h1>
          <p className="text-[#c9a84c99] text-sm font-[family-name:var(--font-crimson)] italic">
            Lesson 3 of 10 · TEKS 4.13A
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