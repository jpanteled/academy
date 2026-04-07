// src/app/kyliana/music/lesson-1/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════
type SolaraMood = "neutral" | "warm" | "proud" | "curious";
type PipMood = "neutral" | "hyper" | "distracted" | "delighted";
type EmberMood = "neutral" | "dramatic" | "fired_up" | "satisfied";
type ZephyrMood = "neutral" | "mysterious" | "approving" | "snooty";

type SongAnalysis = {
  instruments: string[];
  tempo: "slow" | "medium" | "fast";
  style: string;
  mood: string;
  favorite: string;
};

// ══════════════════════════════════════════════════════════════
// CHARACTER COMPONENTS
// ══════════════════════════════════════════════════════════════
function Solara({ mood, message }: { mood: SolaraMood; message: string }) {
  const imgMap: Record<SolaraMood, string> = {
    neutral: "/images/embercliff/solara-neutral.png",
    warm:    "/images/embercliff/solara-warm.png",
    proud:   "/images/embercliff/solara-proud.png",
    curious: "/images/embercliff/solara-curious.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]} name="✨ Solara" location="Solara's Sanctum"
      nameColor="text-[#ffd166]" borderColor="border-[#ffd16644]" bg="bg-[#1a1200]"
      message={message}
    />
  );
}

function Pip({ mood, message }: { mood: PipMood; message: string }) {
  const imgMap: Record<PipMood, string> = {
    neutral:    "/images/embercliff/pip-neutral.png",
    hyper:      "/images/embercliff/pip-hyper.png",
    distracted: "/images/embercliff/pip-distracted.png",
    delighted:  "/images/embercliff/pip-delighted.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]} name="🦎 Pip" location="Pip's Perch"
      nameColor="text-[#a8dadc]" borderColor="border-[#a8dadc44]" bg="bg-[#001a1c]"
      message={message}
    />
  );
}

function Ember({ mood, message }: { mood: EmberMood; message: string }) {
  const imgMap: Record<EmberMood, string> = {
    neutral:   "/images/embercliff/ember-neutral.png",
    dramatic:  "/images/embercliff/ember-dramatic.png",
    fired_up:  "/images/embercliff/ember-fired-up.png",
    satisfied: "/images/embercliff/ember-satisfied.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]} name="🔥 Ember" location="Ember's Forge"
      nameColor="text-[#ff6b6b]" borderColor="border-[#ff6b6b44]" bg="bg-[#1a0505]"
      message={message}
    />
  );
}

function Zephyr({ mood, message }: { mood: ZephyrMood; message: string }) {
  const imgMap: Record<ZephyrMood, string> = {
    neutral:    "/images/embercliff/zephyr-neutral.png",
    mysterious: "/images/embercliff/zephyr-mysterious.png",
    approving:  "/images/embercliff/zephyr-approving.png",
    snooty:     "/images/embercliff/zephyr-snooty.png",
  };
  return (
    <CharacterBubble
      img={imgMap[mood]} name="💜 Zephyr" location="Zephyr's Hollow"
      nameColor="text-[#c77dff]" borderColor="border-[#c77dff44]" bg="bg-[#0d0020]"
      message={message}
    />
  );
}

function CharacterBubble({
  img, name, location, nameColor, borderColor, bg, message,
}: {
  img: string; name: string; location: string; nameColor: string;
  borderColor: string; bg: string; message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`flex items-start gap-4 ${bg} border ${borderColor} rounded-2xl p-5 mb-5`}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex-shrink-0"
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#ffffff0a] border border-[#ffffff11] flex items-center justify-center">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.innerHTML = `<span style="font-size:2.8rem">${name.split(" ")[0]}</span>`;
              }
            }}
          />
        </div>
      </motion.div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <p className={`text-xs font-black tracking-widest uppercase ${nameColor}`}>{name}</p>
          <p className="text-[#ffffff33] text-xs italic">{location}</p>
        </div>
        <motion.p
          key={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-[#f8edeb] text-base leading-relaxed"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// CLIFF PARTICLES BG
// ══════════════════════════════════════════════════════════════
// Rune shapes as SVG paths
const RUNE_PATHS = [
  "M12 2 L22 12 L12 22 L2 12 Z",                          // diamond
  "M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19",   // asterisk
  "M4 4 L20 4 L20 20 L4 20 Z M4 4 L20 20 M20 4 L4 20",   // crossed square
  "M12 2 L20 20 L4 20 Z M12 8 L17 18 L7 18 Z",            // nested triangle
  "M2 12 L12 2 L22 12 L12 22 Z M7 12 L12 7 L17 12 L12 17 Z", // double diamond
  "M12 2 L14 10 L22 10 L16 15 L18 22 L12 17 L6 22 L8 15 L2 10 L10 10 Z", // star
];

const RUNE_POSITIONS = [
  { x: "8%",  y: "12%" }, { x: "88%", y: "8%"  }, { x: "5%",  y: "45%" },
  { x: "92%", y: "38%" }, { x: "15%", y: "72%" }, { x: "82%", y: "65%" },
  { x: "48%", y: "5%"  }, { x: "55%", y: "88%" }, { x: "28%", y: "30%" },
  { x: "70%", y: "25%" }, { x: "20%", y: "90%" }, { x: "75%", y: "80%" },
];

const ENERGY_COLORS = ["#ffd166", "#ff6b6b", "#c77dff", "#a8dadc", "#ff9f43", "#ee5a24"];

function EmbercliffAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── Base: Embercliff background image ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/embercliff/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* ── Overlay: darken so UI cards stay readable ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #08000899 0%, #080008bb 40%, #080008cc 100%)",
        }}
      />



      {/* ── Cracked stone veins (static SVG) ── */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Left-side crack veins */}
        <path d="M0 200 Q 80 180 60 350 Q 40 500 120 600 Q 160 650 80 800" stroke="#ffd16688" strokeWidth="1.5" fill="none" filter="url(#glow)" />
        <path d="M0 400 Q 100 420 70 550 Q 50 650 140 700" stroke="#c77dff66" strokeWidth="1" fill="none" />
        <path d="M60 350 Q 140 370 200 300 Q 260 230 180 150" stroke="#ff6b6b55" strokeWidth="1" fill="none" />
        {/* Right-side crack veins */}
        <path d="M1100 150 Q 980 200 1000 380 Q 1020 520 920 650 Q 880 700 960 850" stroke="#ffd16677" strokeWidth="1.5" fill="none" filter="url(#glow)" />
        <path d="M1100 500 Q 950 480 980 620 Q 1000 720 880 780" stroke="#a8dadc55" strokeWidth="1" fill="none" />
        <path d="M1000 380 Q 880 360 820 280 Q 760 200 840 100" stroke="#ff9f4355" strokeWidth="1" fill="none" />
        {/* Center cracks */}
        <path d="M400 0 Q 420 100 380 200 Q 340 300 440 400 Q 500 450 460 600" stroke="#c77dff44" strokeWidth="1" fill="none" />
        <path d="M700 900 Q 680 750 720 650 Q 760 550 660 400 Q 620 350 680 200" stroke="#ffd16644" strokeWidth="1" fill="none" />
      </svg>

      {/* ── Animated energy pulses along veins ── */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`vein-pulse-${i}`}
          className="absolute rounded-full"
          style={{
            width: 6 + (i % 3) * 2,
            height: 6 + (i % 3) * 2,
            left: [`8%`, `5%`, `15%`, `88%`, `92%`, `82%`, `45%`, `68%`][i],
            top: [`20%`, `45%`, `70%`, `10%`, `38%`, `65%`, `5%`, `85%`][i],
            background: ENERGY_COLORS[i % ENERGY_COLORS.length],
            filter: `blur(4px)`,
            boxShadow: `0 0 12px 4px ${ENERGY_COLORS[i % ENERGY_COLORS.length]}88`,
          }}
          animate={{
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0.5, 1.4, 1, 1.6, 0.5],
            x: [0, (i % 2 === 0 ? 30 : -30), 0],
            y: [0, (i % 3 === 0 ? -40 : 40), 0],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Animated runes ── */}
      {RUNE_POSITIONS.map((pos, i) => (
        <motion.div
          key={`rune-${i}`}
          className="absolute"
          style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
          animate={{
            opacity: [0.04, 0.35, 0.08, 0.4, 0.04],
            scale: [0.9, 1.05, 0.95, 1.1, 0.9],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{
            duration: 5 + (i * 1.1) % 4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d={RUNE_PATHS[i % RUNE_PATHS.length]}
              stroke={ENERGY_COLORS[i % ENERGY_COLORS.length]}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Rune glow halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${ENERGY_COLORS[i % ENERGY_COLORS.length]}33, transparent 70%)`,
              filter: "blur(8px)",
              transform: "scale(2)",
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: 5 + (i * 1.1) % 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* ── Drifting ember sparks ── */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute rounded-full"
          style={{
            width: 1.5 + (i % 4) * 0.8,
            height: 1.5 + (i % 4) * 0.8,
            left: `${(i * 17 + 3) % 97}%`,
            bottom: "-10px",
            background: ["#ffd166", "#ff6b6b", "#c77dff", "#ff9f43", "#a8dadc"][i % 5],
            filter: "blur(0.3px)",
            boxShadow: `0 0 4px 1px ${["#ffd16688", "#ff6b6b88", "#c77dff88", "#ff9f4388", "#a8dadc88"][i % 5]}`,
          }}
          animate={{
            y: [0, -(500 + i * 30)],
            x: [0, Math.sin(i * 1.3) * 40],
            opacity: [0, 0.9, 0.7, 0],
            scale: [1, 0.8, 0.4, 0],
          }}
          transition={{
            duration: 7 + (i % 6),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── Large ambient glow orbs (slow pulse) ── */}
      {[
        { x: "15%", y: "25%", color: "#ffd16618", size: 280 },
        { x: "85%", y: "20%", color: "#c77dff18", size: 320 },
        { x: "10%", y: "70%", color: "#ff6b6b14", size: 240 },
        { x: "80%", y: "75%", color: "#a8dadc14", size: 260 },
        { x: "50%", y: "50%", color: "#ff9f4310", size: 400 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Energy wave sweeps (top to bottom) ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute left-0 right-0"
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${ENERGY_COLORS[i * 2]}66, transparent)`,
            filter: "blur(1px)",
            top: 0,
          }}
          animate={{ y: ["0vh", "100vh"], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            delay: i * 4,
            ease: "linear",
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
        <span className="text-xs tracking-widest text-[#ffd16699] uppercase font-bold">Embercliff Progress</span>
        <span className="text-xs text-[#ffd166] font-bold">{pct}%</span>
      </div>
      <div className="h-2 bg-[#0d0500] rounded-full overflow-hidden border border-[#ffd16622]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#ff6b6b,#ffd166,#c77dff,#a8dadc)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════════════════════════════
function CliffCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-[#120a1a] border border-[#ffffff11] rounded-2xl p-6 mb-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function LocationBanner({ name, icon, color, description }: {
  name: string; icon: string; color: string; description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-5 mb-5 border-2 text-center"
      style={{ borderColor: color + "55", background: color + "0a" }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="font-black text-lg tracking-wide mb-1" style={{ color }}>{name}</p>
      <p className="text-[#f8edeb66] text-sm italic">{description}</p>
    </motion.div>
  );
}

function HintBubble({ who, text }: { who: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4 mt-3 text-[#f8edeb88] text-sm leading-relaxed"
    >
      <span className="font-black text-[#ffd166]">{who}:</span>{" "}
      &ldquo;{text}&rdquo;
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd16622]" />
      <div className="w-2 h-2 rounded-full bg-[#ffd16644]" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd16622]" />
    </div>
  );
}

function GoldBtn({ onClick, children, disabled = false }: {
  onClick: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="px-8 py-3 rounded-full font-black text-sm tracking-widest text-[#0d0500] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ background: "linear-gradient(135deg,#ffd166,#f4a261,#ffd166)" }}
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
      className="px-8 py-3 rounded-full text-sm tracking-widest border border-[#ffd16633] text-[#ffd16699] hover:border-[#ffd166] hover:text-[#ffd166] transition-all cursor-pointer bg-transparent font-bold"
    >
      {children}
    </motion.button>
  );
}

function Chip({ label, selected, onClick, color = "#ffd166" }: {
  label: string; selected: boolean; onClick: () => void; color?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
      style={
        selected
          ? { background: color + "22", borderColor: color, color }
          : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
      }
    >
      {label}
    </motion.button>
  );
}

function YouTubePlayer({ videoId, color }: { videoId: string; color: string }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-5 border-2" style={{ borderColor: color + "55" }}>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Music player"
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ANALYSIS FORM
// ══════════════════════════════════════════════════════════════
const INSTRUMENT_OPTIONS = [
  "Drums / Percussion", "Electric Guitar", "Acoustic Guitar", "Piano",
  "Violin / Strings", "Trumpet / Brass", "Flute / Woodwinds", "Bass Guitar",
  "Voice / Singing", "Clapping", "Synthesizer", "Full Orchestra",
];
const STYLE_OPTIONS = ["Classical", "Pop", "Rock", "Jazz / Swing", "Country", "Electronic", "Other"];
const MOOD_OPTIONS = ["Happy", "Calm", "Excited", "Mysterious", "Powerful", "Playful", "Sad"];

function AnalysisForm({ analysis, onChange, accentColor }: {
  analysis: Partial<SongAnalysis>;
  onChange: (a: Partial<SongAnalysis>) => void;
  accentColor: string;
}) {
  const toggleInstrument = (instr: string) => {
    const cur = analysis.instruments ?? [];
    onChange({
      ...analysis,
      instruments: cur.includes(instr) ? cur.filter((i) => i !== instr) : [...cur, instr],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎵 What instruments do you hear? (pick all that apply)
        </p>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENT_OPTIONS.map((instr) => (
            <Chip key={instr} label={instr} color={accentColor}
              selected={(analysis.instruments ?? []).includes(instr)}
              onClick={() => toggleInstrument(instr)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🐢 How fast is the tempo?
        </p>
        <div className="flex gap-3 flex-wrap">
          {([["slow", "🐢", "Slow"], ["medium", "🦊", "Medium"], ["fast", "⚡", "Fast"]] as const).map(([v, emoji, label]) => (
            <motion.button
              key={v}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...analysis, tempo: v })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer"
              style={
                analysis.tempo === v
                  ? { background: accentColor + "22", borderColor: accentColor, color: accentColor }
                  : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
              }
            >
              {emoji} {label}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎼 What style is it?
        </p>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((s) => (
            <Chip key={s} label={s} color={accentColor}
              selected={analysis.style === s}
              onClick={() => onChange({ ...analysis, style: s })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          💭 What mood does it give you?
        </p>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((m) => (
            <Chip key={m} label={m} color={accentColor}
              selected={analysis.mood === m}
              onClick={() => onChange({ ...analysis, mood: m })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          ⭐ What was your favorite part? Why?
        </p>
        <textarea
          value={analysis.favorite ?? ""}
          onChange={(e) => onChange({ ...analysis, favorite: e.target.value })}
          placeholder="Write anything you noticed or loved…"
          rows={3}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor + "88")}
          onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG DATA
// ══════════════════════════════════════════════════════════════
type SongConfig = {
  id: string; title: string; artist: string; youtubeId: string; genre: string;
  accentColor: string;
  location: { name: string; icon: string; description: string };
  intro: React.ReactNode;
  correct: React.ReactNode;
  hints: { solara: string; pip: string; ember: string; zephyr: string };
};

const SONGS: SongConfig[] = [
  {
    id: "mountain-king",
    title: "In the Hall of the Mountain King",
    artist: "Edvard Grieg",
    youtubeId: "hnUs4SFOGbE",
    genre: "Classical / Orchestra",
    accentColor: "#ffd166",
    location: {
      name: "Solara's Sanctum",
      icon: "✨",
      description: "Golden halls where classical music echoes off ancient stone",
    },
    intro: (
      <Solara mood="warm" message="Welcome to my Sanctum, Kyliana! Classical music is the oldest kind we dragons know. This piece starts sneaky and quiet — then builds into something enormous. Listen for what changes as it goes." />
    ),
    correct: (
      <Solara mood="proud" message="Beautifully observed! You caught the orchestra building — more instruments joining, faster and faster. That's called a crescendo. You have a musician's ear already." />
    ),
    hints: {
      solara: "Close your eyes. Listen for the very beginning — just a few quiet instruments. Then count how many seem to join in as it gets louder. What's the LAST instrument family you hear crash in?",
      pip: "Ooooh ooh ooh! There's a sneaky tiptoe part! Like someone creeping around! Then BOOM it explodes! Did you catch that??",
      ember: "That build-up at the end? That's what ALL music is trying to do — create tension, then release it. Listen for the exact moment it releases.",
      zephyr: "This was written in 1875 for a play. Grieg actually hated it — thought it was too simple. Ironic that it became one of the most recognizable melodies ever composed.",
    },
  },
  {
    id: "happy",
    title: "Happy",
    artist: "Pharrell Williams",
    youtubeId: "ZbZSe6N_BXs",
    genre: "Pop / Soul",
    accentColor: "#a8dadc",
    location: {
      name: "Pip's Perch",
      icon: "🦎",
      description: "A chaotic, buzzing little nook near the very top of Embercliff",
    },
    intro: (
      <Pip mood="hyper" message="KYLIANA YOU'RE HERE! Okay okay okay this song — do you hear the clapping?? That's PERCUSSION! People's HANDS are instruments! Wild right?? Also there's a bass line at the bottom — can you feel it??" />
    ),
    correct: (
      <Pip mood="delighted" message="YES! The clapping is percussion, the bass is doing a groove underneath, and Pharrell's voice rides on TOP! It's like a sandwich! A MUSIC SANDWICH! Okay I need to calm down." />
    ),
    hints: {
      solara: "Try tapping your foot as you listen. Where does your foot naturally want to tap? That's the beat — which instruments are creating it?",
      pip: "LAYERS! Think layers! What's at the bottom keeping things steady? What's in the middle making it fun? What's on TOP that you'd sing along to?",
      ember: "Strip it down and you hear: kick drum, handclaps, bass, voice. That's it. Sometimes less is everything.",
      zephyr: "Notice the song barely changes — same groove the whole way through. Pop relies on the hook repeating rather than developing. Classical does the opposite.",
    },
  },
  {
    id: "bare-necessities",
    title: "The Bare Necessities",
    artist: "Phil Harris & Bruce Reitherman",
    youtubeId: "5dhSdnDb3tk",
    genre: "Jazz / Swing",
    accentColor: "#c77dff",
    location: {
      name: "Zephyr's Hollow",
      icon: "💜",
      description: "A cool cave with strange acoustics — jazz echoes differently here",
    },
    intro: (
      <Zephyr mood="mysterious" message="Ah. A visitor who wants to understand jazz. Interesting. Most don't bother. Listen for the swing rhythm — the beat is… leaning. Slightly late. On purpose. That's the entire secret of jazz in one sentence." />
    ),
    correct: (
      <Zephyr mood="approving" message="…I'm impressed. You heard the swing. Most people just think it sounds 'happy' and stop there. You went deeper. Zephyr approves. Don't let it go to your head." />
    ),
    hints: {
      solara: "Try counting: ONE two THREE four. In jazz and swing, the TWO and FOUR feel slightly accented. Can you clap on the two and four instead of the one and three?",
      pip: "It bounces!! Like a ball!! Boing boing boing!! The notes aren't perfectly even — they lean! That leaning IS the swing!!",
      ember: "The brass instruments — trumpet, trombone — give this its warmth. Same instruments as in a classical orchestra, but totally different personality. Context changes everything.",
      zephyr: "Jazz originated from African American musical traditions in New Orleans in the early 1900s. The swing feel is deeply intentional — it's what separates jazz from every other genre. Rhythm as art form.",
    },
  },
  {
    id: "immigrant-song",
    title: "Immigrant Song",
    artist: "Led Zeppelin",
    youtubeId: "y8OtzJtp-EM",
    genre: "Rock",
    accentColor: "#ff6b6b",
    location: {
      name: "Ember's Forge",
      icon: "🔥",
      description: "Deep in the cliff — loud, fiery, and the walls literally shake",
    },
    intro: (
      <Ember mood="dramatic" message="FINALLY. You made it to the Forge. This. THIS is what music can do. It should feel like something. Like fire. Like moving. If your foot isn't moving, you're not listening right. Now — LISTEN." />
    ),
    correct: (
      <Ember mood="satisfied" message="Yes. THAT is what it feels like when you really hear it. The electric guitar doing that riff over and over — that's the engine of rock music. Repetition with intensity. You felt it. Good." />
    ),
    hints: {
      solara: "Compare this to Hall of the Mountain King — both are powerful and building. But what's making the loud, driving sound here that wasn't in the classical piece?",
      pip: "THE WAILING!! At the beginning!! AHHHHH!! That's Robert Plant's VOICE doing that!! He's using his voice like an INSTRUMENT!! So different from Pharrell!!",
      ember: "That repeating pattern at the start — that's called a riff. Rock music is built on riffs. Lock in on it. It's the spine of the whole song.",
      zephyr: "Notice this creates tension through volume and distortion rather than melody. Classical builds tension harmonically. Rock builds it physically. Both valid. Very different tools.",
    },
  },
];

// ══════════════════════════════════════════════════════════════
// SCENE — INTRO
// ══════════════════════════════════════════════════════════════
function SceneIntro({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180 }}
        className="text-center bg-[#120a1a] border-2 border-[#ffd16633] rounded-3xl p-10 mb-6"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          🏰
        </motion.div>
        <h2
          className="text-3xl font-black tracking-wide mb-3"
          style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16655" }}
        >
          You&apos;ve Arrived at Embercliff
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed max-w-md mx-auto">
          Ancient dragon city, carved into a cliff face over ten thousand years ago.
          Four dragons live here — each in their own district, each obsessed with a
          different kind of music. You&apos;re the new apprentice.
        </p>
      </motion.div>

      <Solara mood="warm" message="Kyliana! Welcome to Embercliff. I'm Solara — keeper of the golden halls at the top. Today you'll visit all four districts and listen to a song in each one. Your job is to use your ears like a detective. Ready?" />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-4">
          🎓 Your Apprentice Training — What to Listen For
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: "🎺", label: "Instruments", desc: "What's making the sound? Drums, guitar, violin, voice — instruments are the vocabulary of music." },
            { icon: "🐢", label: "Tempo", desc: "Is it slow as a sleepy dragon? Medium as a trotting fox? Fast as lightning?" },
            { icon: "🎼", label: "Style / Genre", desc: "Classical? Pop? Rock? Jazz? Each genre has its own history, rules, and personality." },
            { icon: "💭", label: "Mood", desc: "How does it make you feel? There's no wrong answer — your reaction is real data." },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 bg-[#0d0500] border border-[#ffffff0a] rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-[#ffd166] text-sm font-black mb-1">{label}</p>
                <p className="text-[#f8edeb55] text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CliffCard>

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-4">
          🐉 Meet the Dragons of Embercliff
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Solara", emoji: "✨", color: "#ffd166", location: "Solara's Sanctum", vibe: "Warm, wise, genuinely excited when you notice something subtle" },
            { name: "Pip", emoji: "🦎", color: "#a8dadc", location: "Pip's Perch", vibe: "Tiny and chaotic. Extremely enthusiastic. Gets distracted by sounds mid-sentence" },
            { name: "Zephyr", emoji: "💜", color: "#c77dff", location: "Zephyr's Hollow", vibe: "Cool and mysterious. Speaks in riddles. Slightly snooty but not mean about it" },
            { name: "Ember", emoji: "🔥", color: "#ff6b6b", location: "Ember's Forge", vibe: "Dramatic. Treats every song like a life-or-death situation. Big feelings always" },
          ].map(({ name, emoji, color, location, vibe }) => (
            <div key={name} className="bg-[#0d0500] border border-[#ffffff0a] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{emoji}</span>
                <span className="font-black text-sm" style={{ color }}>{name}</span>
              </div>
              <p className="text-[#ffffff55] text-xs mb-1 italic">{location}</p>
              <p className="text-[#ffffff44] text-xs leading-relaxed">{vibe}</p>
            </div>
          ))}
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={onNext}>🏰 Enter Embercliff →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG SCENE
// ══════════════════════════════════════════════════════════════
function SongScene({
  song, songIndex, totalSongs, analysis, onChange, onNext, isLast,
}: {
  song: SongConfig; songIndex: number; totalSongs: number;
  analysis: Partial<SongAnalysis>; onChange: (a: Partial<SongAnalysis>) => void;
  onNext: () => void; isLast: boolean;
}) {
  const [activeHint, setActiveHint] = useState<"solara" | "pip" | "ember" | "zephyr" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isComplete =
    (analysis.instruments?.length ?? 0) > 0 &&
    analysis.tempo &&
    analysis.style &&
    analysis.mood;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="inline-block rounded-full px-4 py-1 text-xs font-black tracking-widest uppercase border"
          style={{ borderColor: song.accentColor + "55", color: song.accentColor, background: song.accentColor + "11" }}
        >
          District {songIndex + 1} of {totalSongs} · {song.genre}
        </div>
      </div>

      <LocationBanner
        name={song.location.name} icon={song.location.icon}
        color={song.accentColor} description={song.location.description}
      />

      {song.intro}

      <CliffCard>
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: song.accentColor + "22", border: `2px solid ${song.accentColor}44` }}
          >
            🎵
          </div>
          <div>
            <p className="text-[#f8edeb] font-black text-lg leading-tight">{song.title}</p>
            <p className="text-sm mt-0.5" style={{ color: song.accentColor }}>{song.artist}</p>
          </div>
        </div>
        <YouTubePlayer videoId={song.youtubeId} color={song.accentColor} />
      </CliffCard>

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {song.correct}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <CliffCard>
          <p className="text-xs font-black tracking-widest uppercase mb-5" style={{ color: song.accentColor }}>
            📋 Your Analysis — District {songIndex + 1}
          </p>
          <AnalysisForm analysis={analysis} onChange={onChange} accentColor={song.accentColor} />

          <Divider />

          <div>
            <p className="text-[#ffffff33] text-xs font-bold tracking-widest uppercase mb-3">
              🆘 Need a hint? Ask a dragon
            </p>
            <div className="flex gap-2 flex-wrap mb-3">
              {(["solara", "pip", "ember", "zephyr"] as const).map((who) => {
                const labels = { solara: "✨ Solara", pip: "🦎 Pip", ember: "🔥 Ember", zephyr: "💜 Zephyr" };
                return (
                  <button
                    key={who}
                    onClick={() => setActiveHint((prev) => prev === who ? null : who)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
                    style={
                      activeHint === who
                        ? { background: "#ffd16622", borderColor: "#ffd166", color: "#ffd166" }
                        : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
                    }
                  >
                    {labels[who]}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {activeHint && (
                <HintBubble
                  who={{ solara: "✨ Solara", pip: "🦎 Pip", ember: "🔥 Ember", zephyr: "💜 Zephyr" }[activeHint]}
                  text={song.hints[activeHint]}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mt-6">
            <GoldBtn onClick={() => setSubmitted(true)} disabled={!isComplete}>
              ✅ Submit My Analysis →
            </GoldBtn>
            {!isComplete && (
              <p className="text-[#ffffff33] text-xs mt-3">Fill in all sections to continue</p>
            )}
          </div>
        </CliffCard>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-2">
            <GoldBtn onClick={onNext}>
              {isLast ? "🏆 See My Report →" : "Next District →"}
            </GoldBtn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPARE SCENE
// ══════════════════════════════════════════════════════════════
function SceneCompare({ analyses, onNext }: { analyses: Partial<SongAnalysis>[]; onNext: () => void }) {
  const [fastest, setFastest] = useState<number | null>(null);
  const [calmest, setCalmest] = useState<number | null>(null);
  const [mostInstruments, setMostInstruments] = useState<number | null>(null);
  const [favorite, setFavorite] = useState<number | null>(null);

  const isComplete = fastest !== null && calmest !== null && mostInstruments !== null && favorite !== null;

  const SongPicker = ({ label, value, onChange }: {
    label: string; value: number | null; onChange: (i: number) => void;
  }) => (
    <div className="mb-5">
      <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {SONGS.map((s, i) => (
          <motion.button
            key={s.id}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => onChange(i)}
            className="px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer"
            style={
              value === i
                ? { background: s.accentColor + "22", borderColor: s.accentColor, color: s.accentColor }
                : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
            }
          >
            {s.location.icon} {s.title.split(" ").slice(0, 3).join(" ")}…
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Solara mood="proud" message="You've visited all four districts! Now let's compare what you discovered. These answers are based on YOUR ears — there's no single right answer here." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd166] mb-6">
          🔍 Compare All Four Songs
        </p>
        <SongPicker label="⚡ Which had the fastest tempo?" value={fastest} onChange={setFastest} />
        <SongPicker label="🌙 Which felt the calmest?" value={calmest} onChange={setCalmest} />
        <SongPicker label="🎺 Which had the most instruments?" value={mostInstruments} onChange={setMostInstruments} />
        <SongPicker label="⭐ Which was your favorite?" value={favorite} onChange={setFavorite} />
      </CliffCard>

      <AnimatePresence>
        {favorite !== null && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <Ember mood="dramatic" message={`${SONGS[favorite].title}? Bold choice. I respect it.`} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <GoldBtn onClick={onNext} disabled={!isComplete}>
          🏅 Claim My Apprentice Badge →
        </GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// WIN SCENE
// ══════════════════════════════════════════════════════════════
function SceneWin({ analyses, onRestart }: { analyses: Partial<SongAnalysis>[]; onRestart: () => void }) {
  const uniqueInstruments = new Set(analyses.flatMap((a) => a.instruments ?? [])).size;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="text-center bg-[#120a1a] border-2 border-[#ffd16655] rounded-3xl p-10 mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-4"
        >
          🏅
        </motion.div>
        <h2
          className="text-3xl font-black tracking-wide mb-3"
          style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16677" }}
        >
          Music Apprentice of Embercliff!
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed">
          All four districts visited. All four songs analyzed. The dragons are impressed.
        </p>
      </motion.div>

      <Solara mood="proud" message="Kyliana, you listened to a 150-year-old orchestra, a pop song, a jazz classic, and hard rock — and you found something real in each one. That's what musicians do." />
      <Pip mood="delighted" message="YOU DID IT! You heard the clapping percussion!! And the swing!! And the RIFF!! I'm so proud I might actually explode into confetti!!" />
      <Zephyr mood="approving" message="…You noticed the swing in Bare Necessities. Most people don't bother. I'll admit — you have potential. Don't waste it." />
      <Ember mood="satisfied" message="You felt Immigrant Song. I could tell. That's all I needed to see." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd166] mb-5">
          📚 What You Discovered Today
        </p>
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {[
            { val: "4", lbl: "Songs Analyzed" },
            { val: uniqueInstruments.toString(), lbl: "Instruments Spotted" },
            { val: "4", lbl: "Districts Visited" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#0d0500] border border-[#ffd16633] rounded-2xl px-6 py-4 text-center">
              <p className="text-[#ffd166] text-3xl font-black">{val}</p>
              <p className="text-[#ffd16699] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
        <Divider />
        {[
          "Instruments are the vocabulary of music — different ones have completely different personalities.",
          "Tempo controls energy and urgency. Slow doesn't mean boring. Fast doesn't mean better.",
          "Genre is a family of music with shared history and rules. Each one developed for different reasons.",
          "Mood is personal. Two people can feel differently about the same song. Both are right.",
          "Great listeners don't just hear — they ask WHY something sounds the way it does.",
        ].map((fact, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="text-[#f8edeb77] text-sm leading-relaxed mb-2"
          >
            ✦ {fact}
          </motion.p>
        ))}
      </CliffCard>

      <div className="text-center">
        <GhostBtn onClick={onRestart}>↺ Explore Embercliff Again</GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
type SceneId = "intro" | `song-${number}` | "compare" | "win";

export default function MusicLesson1() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [analyses, setAnalyses] = useState<Partial<SongAnalysis>[]>(SONGS.map(() => ({})));

  const TOTAL_SCENES = 2 + SONGS.length + 1;
  const sceneIndex = (): number => {
    if (scene === "intro") return 1;
    if (scene === "compare") return SONGS.length + 2;
    if (scene === "win") return TOTAL_SCENES;
    return parseInt(scene.split("-")[1]) + 2;
  };

  const updateAnalysis = (i: number, a: Partial<SongAnalysis>) => {
    setAnalyses((prev) => { const next = [...prev]; next[i] = a; return next; });
  };

  const restart = useCallback(() => {
    setScene("intro");
    setAnalyses(SONGS.map(() => ({})));
  }, []);

  return (
    <main
      className="min-h-screen text-[#f8edeb] overflow-x-hidden"
      style={{ background: "#080008" }}
    >
      <EmbercliffAtmosphere />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#ffd16655] uppercase font-bold mb-1">
            Dracos Academy · Music · Lesson 1
          </p>
          <h1
            className="text-2xl font-black text-[#ffd166] mb-1 tracking-wide"
            style={{ textShadow: "0 0 24px #ffd16666" }}
          >
            🏰 Embercliff
          </h1>
          <p className="text-[#f8edeb44] text-sm italic">
            Music Apprentice Training · Instruments, Tempo &amp; Style
          </p>
        </div>

        <ProgressBar scene={sceneIndex()} total={TOTAL_SCENES} />

        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {scene === "intro" && <SceneIntro onNext={() => setScene("song-0")} />}

            {SONGS.map((song, i) =>
              scene === `song-${i}` ? (
                <SongScene
                  key={song.id}
                  song={song} songIndex={i} totalSongs={SONGS.length}
                  analysis={analyses[i]}
                  onChange={(a) => updateAnalysis(i, a)}
                  onNext={() => setScene(i < SONGS.length - 1 ? `song-${i + 1}` : "compare")}
                  isLast={i === SONGS.length - 1}
                />
              ) : null
            )}

            {scene === "compare" && (
              <SceneCompare analyses={analyses} onNext={() => setScene("win")} />
            )}

            {scene === "win" && (
              <SceneWin analyses={analyses} onRestart={restart} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10 mt-8" />
    </main>
  );
}