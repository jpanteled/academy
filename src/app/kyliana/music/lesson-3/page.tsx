// src/app/kyliana/music/lesson-3/page.tsx
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

type KeyType = "major" | "minor" | "unsure";

type SongResponse = {
  keyType: KeyType;
  bodyFeel: string;
  colorMatch: string;
  whyFeel: string;
};

type CompareAnswers = {
  brightestSong: number | null;
  darkestSong: number | null;
  outlier: number | null;
  outlierReason: string;
  deepTheme: string;
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
  return <CharacterBubble img={imgMap[mood]} name="✨ Solara" location="Solara's Sanctum" nameColor="text-[#ffd166]" borderColor="border-[#ffd16644]" bg="bg-[#1a1200]" message={message} />;
}

function Pip({ mood, message }: { mood: PipMood; message: string }) {
  const imgMap: Record<PipMood, string> = {
    neutral:    "/images/embercliff/pip-neutral.png",
    hyper:      "/images/embercliff/pip-hyper.png",
    distracted: "/images/embercliff/pip-distracted.png",
    delighted:  "/images/embercliff/pip-delighted.png",
  };
  return <CharacterBubble img={imgMap[mood]} name="🦎 Pip" location="Pip's Perch" nameColor="text-[#a8dadc]" borderColor="border-[#a8dadc44]" bg="bg-[#001a1c]" message={message} />;
}

function Ember({ mood, message }: { mood: EmberMood; message: string }) {
  const imgMap: Record<EmberMood, string> = {
    neutral:   "/images/embercliff/ember-neutral.png",
    dramatic:  "/images/embercliff/ember-dramatic.png",
    fired_up:  "/images/embercliff/ember-fired-up.png",
    satisfied: "/images/embercliff/ember-satisfied.png",
  };
  return <CharacterBubble img={imgMap[mood]} name="🔥 Ember" location="Ember's Forge" nameColor="text-[#ff6b6b]" borderColor="border-[#ff6b6b44]" bg="bg-[#1a0505]" message={message} />;
}

function Zephyr({ mood, message }: { mood: ZephyrMood; message: string }) {
  const imgMap: Record<ZephyrMood, string> = {
    neutral:    "/images/embercliff/zephyr-neutral.png",
    mysterious: "/images/embercliff/zephyr-mysterious.png",
    approving:  "/images/embercliff/zephyr-approving.png",
    snooty:     "/images/embercliff/zephyr-snooty.png",
  };
  return <CharacterBubble img={imgMap[mood]} name="💜 Zephyr" location="Zephyr's Hollow" nameColor="text-[#c77dff]" borderColor="border-[#c77dff44]" bg="bg-[#0d0020]" message={message} />;
}

function CharacterBubble({ img, name, location, nameColor, borderColor, bg, message }: {
  img: string; name: string; location: string; nameColor: string;
  borderColor: string; bg: string; message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
      className={`flex items-start gap-4 ${bg} border ${borderColor} rounded-2xl p-5 mb-5`}
    >
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex-shrink-0">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#ffffff0a] border border-[#ffffff11] flex items-center justify-center">
          <img src={img} alt={name} className="w-full h-full object-contain"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) el.parentElement.innerHTML = `<span style="font-size:2.8rem">${name.split(" ")[0]}</span>`;
            }}
          />
        </div>
      </motion.div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <p className={`text-xs font-black tracking-widest uppercase ${nameColor}`}>{name}</p>
          <p className="text-[#ffffff33] text-xs italic">{location}</p>
        </div>
        <motion.p key={message} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="text-[#f8edeb] text-base leading-relaxed">
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// ATMOSPHERE
// ══════════════════════════════════════════════════════════════
const RUNE_PATHS = [
  "M12 2 L22 12 L12 22 L2 12 Z",
  "M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19",
  "M4 4 L20 4 L20 20 L4 20 Z M4 4 L20 20 M20 4 L4 20",
  "M12 2 L20 20 L4 20 Z M12 8 L17 18 L7 18 Z",
  "M2 12 L12 2 L22 12 L12 22 Z M7 12 L12 7 L17 12 L12 17 Z",
  "M12 2 L14 10 L22 10 L16 15 L18 22 L12 17 L6 22 L8 15 L2 10 L10 10 Z",
];
const RUNE_POSITIONS = [
  { x: "8%", y: "12%" }, { x: "88%", y: "8%" }, { x: "5%", y: "45%" },
  { x: "92%", y: "38%" }, { x: "15%", y: "72%" }, { x: "82%", y: "65%" },
  { x: "48%", y: "5%" }, { x: "55%", y: "88%" }, { x: "28%", y: "30%" },
  { x: "70%", y: "25%" }, { x: "20%", y: "90%" }, { x: "75%", y: "80%" },
];
const ENERGY_COLORS = ["#ffd166", "#ff6b6b", "#c77dff", "#a8dadc", "#ff9f43", "#ee5a24"];

function EmbercliffAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/embercliff/bg.png')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #08000899 0%, #080008bb 40%, #080008cc 100%)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <filter id="glow3">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M0 200 Q 80 180 60 350 Q 40 500 120 600 Q 160 650 80 800" stroke="#ffd16688" strokeWidth="1.5" fill="none" filter="url(#glow3)" />
        <path d="M0 400 Q 100 420 70 550 Q 50 650 140 700" stroke="#c77dff66" strokeWidth="1" fill="none" />
        <path d="M1100 150 Q 980 200 1000 380 Q 1020 520 920 650 Q 880 700 960 850" stroke="#ffd16677" strokeWidth="1.5" fill="none" filter="url(#glow3)" />
        <path d="M400 0 Q 420 100 380 200 Q 340 300 440 400 Q 500 450 460 600" stroke="#c77dff44" strokeWidth="1" fill="none" />
      </svg>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={`vein-${i}`} className="absolute rounded-full"
          style={{ width: 6+(i%3)*2, height: 6+(i%3)*2, left: [`8%`,`5%`,`15%`,`88%`,`92%`,`82%`,`45%`,`68%`][i], top: [`20%`,`45%`,`70%`,`10%`,`38%`,`65%`,`5%`,`85%`][i], background: ENERGY_COLORS[i%ENERGY_COLORS.length], filter: "blur(4px)", boxShadow: `0 0 12px 4px ${ENERGY_COLORS[i%ENERGY_COLORS.length]}88` }}
          animate={{ opacity: [0,1,0.6,1,0], scale: [0.5,1.4,1,1.6,0.5], x: [0,i%2===0?30:-30,0], y: [0,i%3===0?-40:40,0] }}
          transition={{ duration: 4+i*0.8, repeat: Infinity, delay: i*0.9, ease: "easeInOut" }}
        />
      ))}
      {RUNE_POSITIONS.map((pos, i) => (
        <motion.div key={`rune-${i}`} className="absolute" style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}
          animate={{ opacity: [0.04,0.35,0.08,0.4,0.04], scale: [0.9,1.05,0.95,1.1,0.9], rotate: [0,i%2===0?15:-15,0] }}
          transition={{ duration: 5+(i*1.1)%4, repeat: Infinity, delay: i*0.6, ease: "easeInOut" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d={RUNE_PATHS[i%RUNE_PATHS.length]} stroke={ENERGY_COLORS[i%ENERGY_COLORS.length]} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <motion.div className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle, ${ENERGY_COLORS[i%ENERGY_COLORS.length]}33, transparent 70%)`, filter: "blur(8px)", transform: "scale(2)" }}
            animate={{ opacity: [0,0.8,0] }} transition={{ duration: 5+(i*1.1)%4, repeat: Infinity, delay: i*0.6, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div key={`ember-${i}`} className="absolute rounded-full"
          style={{ width: 1.5+(i%4)*0.8, height: 1.5+(i%4)*0.8, left: `${(i*17+3)%97}%`, bottom: "-10px", background: ["#ffd166","#ff6b6b","#c77dff","#ff9f43","#a8dadc"][i%5], filter: "blur(0.3px)", boxShadow: `0 0 4px 1px ${["#ffd16688","#ff6b6b88","#c77dff88","#ff9f4388","#a8dadc88"][i%5]}` }}
          animate={{ y: [0,-(500+i*30)], x: [0,Math.sin(i*1.3)*40], opacity: [0,0.9,0.7,0], scale: [1,0.8,0.4,0] }}
          transition={{ duration: 7+(i%6), repeat: Infinity, delay: i*0.5, ease: "easeOut" }}
        />
      ))}
      {[{x:"15%",y:"25%",color:"#ffd16618",size:280},{x:"85%",y:"20%",color:"#c77dff18",size:320},{x:"10%",y:"70%",color:"#ff6b6b14",size:240},{x:"80%",y:"75%",color:"#a8dadc14",size:260},{x:"50%",y:"50%",color:"#ff9f4310",size:400}].map((orb,i) => (
        <motion.div key={`orb-${i}`} className="absolute rounded-full"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, transform: "translate(-50%,-50%)", background: `radial-gradient(circle, ${orb.color}, transparent 70%)`, filter: "blur(30px)" }}
          animate={{ opacity: [0.4,1,0.4], scale: [0.9,1.1,0.9] }} transition={{ duration: 6+i*1.5, repeat: Infinity, delay: i*1.2, ease: "easeInOut" }}
        />
      ))}
      {[0,1,2].map((i) => (
        <motion.div key={`wave-${i}`} className="absolute left-0 right-0"
          style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${ENERGY_COLORS[i*2]}66, transparent)`, filter: "blur(1px)", top: 0 }}
          animate={{ y: ["0vh","100vh"], opacity: [0,0.6,0] }} transition={{ duration: 8+i*3, repeat: Infinity, delay: i*4, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════════════════════════════
function ProgressBar({ scene, total }: { scene: number; total: number }) {
  const pct = Math.round(((scene-1)/(total-1))*100);
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-1">
        <span className="text-xs tracking-widest text-[#ffd16699] uppercase font-bold">Lesson Progress</span>
        <span className="text-xs text-[#ffd166] font-bold">{pct}%</span>
      </div>
      <div className="h-2 bg-[#0d0500] rounded-full overflow-hidden border border-[#ffd16622]">
        <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#ff6b6b,#ffd166,#c77dff,#a8dadc)" }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CliffCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className={`bg-[#120a1a] border border-[#ffffff11] rounded-2xl p-6 mb-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function HintBubble({ who, text }: { who: string; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4 mt-3 text-[#f8edeb88] text-sm leading-relaxed"
    >
      <span className="font-black text-[#ffd166]">{who}:</span> &ldquo;{text}&rdquo;
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

function GoldBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <motion.button whileHover={{ scale: disabled ? 1 : 1.03 }} whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick} disabled={disabled}
      className="px-8 py-3 rounded-full font-black text-sm tracking-widest text-[#0d0500] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ background: "linear-gradient(135deg,#ffd166,#f4a261,#ffd166)" }}
    >
      {children}
    </motion.button>
  );
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick}
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
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
      style={selected ? { background: color+"22", borderColor: color, color } : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }}
    >
      {label}
    </motion.button>
  );
}

function YouTubePlayer({ videoId, color }: { videoId: string; color: string }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-5 border-2" style={{ borderColor: color+"55" }}>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen title="Music player"
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// KEY RESPONSE FORM
// ══════════════════════════════════════════════════════════════
const BODY_FEELS = ["Heavy", "Light", "Sad", "Hopeful", "Tense", "Peaceful", "Uneasy", "Warm", "Cold", "Empty", "Full", "Restless"];
const COLOR_MATCHES = ["The color fits perfectly", "The color feels too bright", "The color feels too dark", "The color is surprising", "I never thought about it that way"];

function KeyResponseForm({ response, onChange, accentColor }: {
  response: Partial<SongResponse>;
  onChange: (r: Partial<SongResponse>) => void;
  accentColor: string;
}) {
  return (
    <div className="space-y-6">

      {/* Major or minor */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎹 Does this song feel major or minor to you?
        </p>
        <p className="text-[#ffffff44] text-xs mb-3">Major = bright, open, resolved. Minor = dark, tense, unresolved.</p>
        <div className="flex gap-3 flex-wrap">
          {([["major", "☀️", "Major — feels bright or open"], ["minor", "🌑", "Minor — feels dark or heavy"], ["unsure", "🤷", "Not sure"]] as const).map(([v, emoji, label]) => (
            <motion.button key={v} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...response, keyType: v })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer"
              style={response.keyType === v
                ? { background: accentColor+"22", borderColor: accentColor, color: accentColor }
                : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
              }
            >
              {emoji} {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Body feel */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🫀 How does it feel in your body? (pick all that apply)
        </p>
        <div className="flex flex-wrap gap-2">
          {BODY_FEELS.map((feel) => (
            <Chip key={feel} label={feel} color={accentColor}
              selected={(response.bodyFeel ?? "").split(",").filter(Boolean).includes(feel)}
              onClick={() => {
                const current = (response.bodyFeel ?? "").split(",").filter(Boolean);
                const next = current.includes(feel) ? current.filter((f) => f !== feel) : [...current, feel];
                onChange({ ...response, bodyFeel: next.join(",") });
              }}
            />
          ))}
        </div>
      </div>

      {/* Color match */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎨 Does the color in the title match how the song feels?
        </p>
        <div className="flex flex-wrap gap-2">
          {COLOR_MATCHES.map((m) => (
            <Chip key={m} label={m} color={accentColor}
              selected={response.colorMatch === m}
              onClick={() => onChange({ ...response, colorMatch: m })}
            />
          ))}
        </div>
      </div>

      {/* Why does it feel this way */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          💭 Why do you think it feels this way? What in the music creates that feeling?
        </p>
        <textarea value={response.whyFeel ?? ""} onChange={(e) => onChange({ ...response, whyFeel: e.target.value })}
          placeholder="Think about the instruments, the speed, the singer's voice, the melody…" rows={3}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG DATA
// ══════════════════════════════════════════════════════════════
type SongConfig = {
  id: string; title: string; artist: string; youtubeId: string;
  keyType: KeyType; colorWord: string; accentColor: string;
  dragon: React.ReactNode;
  correct: React.ReactNode;
  hints: { solara: string; pip: string; ember: string; zephyr: string };
};

const SONGS: SongConfig[] = [
  {
    id: "yellow-ledbetter",
    title: "Yellow Ledbetter",
    artist: "Pearl Jam",
    youtubeId: "VhJ65v_C-eI",
    keyType: "major",
    colorWord: "Yellow",
    accentColor: "#ffd166",
    dragon: <Solara mood="curious" message="Yellow. Sunlight. Warmth. That's what yellow usually means. Now listen to this Pearl Jam song — and pay close attention to how it makes you feel. Does it match what you'd expect from the color yellow?" />,
    correct: <Solara mood="curious" message="Here's the thing — Yellow Ledbetter is in a major key. Major keys are supposed to feel bright and open. But Eddie Vedder mumbles the lyrics deliberately, the guitar has a mournful quality, and the whole thing feels like something slipping away. Major key. Melancholy feeling. The rule already has an exception." />,
    hints: {
      solara: "Don't think too hard about the words — Eddie Vedder intentionally makes them hard to understand. Focus on the guitar. Does it feel like it's rising or falling? Opening up or closing down?",
      pip: "It's so PRETTY but also so SAD?? How is that possible?? Major key is supposed to be HAPPY!! Pearl Jam is breaking the rules already!!",
      ember: "That guitar tone. Listen to it. It's clean, not distorted. But there's a weight to it. The key is major but the feeling isn't simple. Music is allowed to be complicated.",
      zephyr: "Yellow Ledbetter was written about a friend of Eddie Vedder's whose brother died in the Gulf War. The major key creates an aching openness — like a door left ajar. Not sad exactly. Unresolved.",
    },
  },
  {
    id: "blue",
    title: "Blue",
    artist: "LeAnn Rimes",
    youtubeId: "GozdIQx1Wow",
    keyType: "minor",
    colorWord: "Blue",
    accentColor: "#a8dadc",
    dragon: <Pip mood="hyper" message="BLUE!! Blue is already a sad color right?? Like 'feeling blue' means feeling sad!! So does the song SOUND blue too?? Listen and tell me — does the music match the word??" />,
    correct: <Pip mood="delighted" message="Minor key!! Dark, lonely, longing!! And LeAnn Rimes was THIRTEEN when she recorded this!! THIRTEEN!! Her voice is doing things most adults can't do!! The minor key wraps around her voice like a cold wind. Blue sounds blue. It MATCHES!!" />,
    hints: {
      solara: "Listen to the spaces between the notes. Minor keys often feel like something is missing — like there's an empty space the music is aching to fill. Can you feel that in this song?",
      pip: "Her voice goes SO HIGH and it still sounds SAD!! That's the minor key doing that!! A major key would make the high notes feel triumphant!! Minor makes them feel like a cry!!",
      ember: "Country music uses minor keys differently than rock. It's not heavy — it's lonesome. There's a difference. Heavy is weight. Lonesome is distance.",
      zephyr: "Blue was written by Bill Mack and recorded by LeAnn Rimes at age thirteen. The minor key was chosen deliberately to match the lyrical theme of loneliness and waiting. Color, key, and lyric in perfect alignment.",
    },
  },
  {
    id: "something-in-the-orange",
    title: "Something in the Orange",
    artist: "Zach Bryan",
    youtubeId: "sDOxeU02NUM",
    keyType: "minor",
    colorWord: "Orange",
    accentColor: "#ff9f43",
    dragon: <Zephyr mood="mysterious" message="Orange. The color of sunset. The last light before dark. Zach Bryan wrote this about watching someone leave — and seeing the orange light of evening as a symbol of what's ending. Listen for how the key makes that feeling land." />,
    correct: <Zephyr mood="approving" message="Minor key. And you can feel exactly why. The orange in the title isn't warmth — it's the specific orange of fading light. Of something beautiful that's almost gone. The minor key doesn't let you settle. It keeps you in that ache. That's precise emotional craft." />,
    hints: {
      solara: "Think about what orange means in this context — not the fruit, not energy. The orange of a sunset. The last light. Does the music feel like something ending or something beginning?",
      pip: "It's so QUIET and so HEAVY at the same time!! How does he do that?? The guitar is simple but every note feels like it costs something!!",
      ember: "Zach Bryan strips everything back — simple guitar, raw voice, minimal production. In minor key that restraint amplifies the emotion. Less sound, more feeling. Counterintuitive but it works.",
      zephyr: "Notice how Bryan's voice cracks slightly in places. That's not imperfection — it's a choice. Or rather, it's what happens when you sing something true. The minor key creates the frame. The voice fills it.",
    },
  },
  {
    id: "paint-it-black",
    title: "Paint It Black",
    artist: "The Rolling Stones",
    youtubeId: "O4irXQhgMqg",
    keyType: "minor",
    colorWord: "Black",
    accentColor: "#ff6b6b",
    dragon: <Ember mood="dramatic" message="Black. The absence of all color. The Rolling Stones wrote this about grief so consuming you want the entire world to match how you feel on the inside. Listen to that sitar. Listen to the drive of it. This is minor key as FORCE — not sadness. Rage." />,
    correct: <Ember mood="fired_up" message="Minor key — but not melancholy. FURIOUS. There's a sitar, which gives it an Eastern sound that made it unlike anything else in 1966. The minor key here isn't aching or lonesome. It's relentless. It wants to paint everything black because the world feels wrong. That's what minor key can do when you push it." />,
    hints: {
      solara: "Compare this to Blue — both minor key, completely different feeling. Blue is still and lonesome. Paint It Black is driving and relentless. Same tool, completely different use. What's creating that difference?",
      pip: "THE SITAR!! What even IS that sound?? It's like a guitar but more!! And it makes the minor key feel EXOTIC and DARK and URGENT all at once!! I love it!!",
      ember: "The tempo is what separates this from the other minor key songs. Fast minor key creates urgency. Slow minor key creates grief. Paint It Black is fast. It doesn't want to sit with the feeling — it wants to do something about it.",
      zephyr: "Brian Jones insisted on the sitar after hearing the Beatles experiment with Indian instruments. The Eastern tonality combined with Western minor key creates a disorientation that perfectly serves the lyric — a mind so deep in grief it can't find its footing.",
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
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180 }}
        className="text-center bg-[#120a1a] border-2 border-[#ffd16633] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="text-6xl mb-4">
          🎹
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16655" }}>
          The Color of Sound
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed max-w-md mx-auto">
          Four songs. Four colors. One hidden lesson about how music creates emotion — and one song that breaks the rule entirely.
        </p>
      </motion.div>

      <Solara mood="warm" message="Today's lesson is about keys. Not the kind you open doors with — the musical key a song is written in. Keys are one of the most powerful tools a songwriter has. They can make a song feel bright, dark, heavy, urgent, lonesome, or joyful before a single word is sung." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-4">🎹 Major vs Minor — The Basics</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4">
            <p className="text-[#ffd166] font-black text-sm mb-2">☀️ Major Key</p>
            <p className="text-[#f8edeb77] text-xs leading-relaxed">Bright, open, resolved. Major keys tend to feel stable — like something has been figured out. Happy songs, triumphant songs, and anthems are often in major keys. But not always.</p>
          </div>
          <div className="bg-[#0d0500] border border-[#c77dff33] rounded-xl p-4">
            <p className="text-[#c77dff] font-black text-sm mb-2">🌑 Minor Key</p>
            <p className="text-[#f8edeb77] text-xs leading-relaxed">Dark, tense, unresolved. Minor keys tend to feel like something is missing or wrong. Sad songs, tense songs, and angry songs are often in minor keys. But minor isn't just sadness — it can be rage, longing, grief, urgency, or dread.</p>
          </div>
          <div className="bg-[#0d0500] border border-[#ff6b6b33] rounded-xl p-4">
            <p className="text-[#ff6b6b] font-black text-sm mb-2">⚠️ The Catch</p>
            <p className="text-[#f8edeb77] text-xs leading-relaxed">Major doesn&apos;t always mean happy. Minor doesn&apos;t always mean sad. Today you&apos;ll find a song that proves it — a major key song that doesn&apos;t feel bright at all. Your job is to figure out which one and why.</p>
          </div>
        </div>
      </CliffCard>

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">🎨 Your Double Mission</p>
        <div className="space-y-3 text-[#f8edeb77] text-sm leading-relaxed">
          <p>1. <span className="text-[#ffd166] font-black">Listen for the key</span> — does each song feel major (bright/open) or minor (dark/heavy)?</p>
          <p>2. <span className="text-[#c77dff] font-black">Find the rule-breaker</span> — one song is in a major key but doesn&apos;t feel bright. Which one — and why?</p>
          <p>3. <span className="text-[#95d5b2] font-black">Surface theme</span> — what do all four songs have in common that you can see immediately?</p>
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={onNext}>🎹 Begin The Color of Sound →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG SCENE
// ══════════════════════════════════════════════════════════════
function SongScene({ song, songIndex, totalSongs, response, onChange, onNext, isLast }: {
  song: SongConfig; songIndex: number; totalSongs: number;
  response: Partial<SongResponse>; onChange: (r: Partial<SongResponse>) => void;
  onNext: () => void; isLast: boolean;
}) {
  const [activeHint, setActiveHint] = useState<"solara"|"pip"|"ember"|"zephyr"|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = !!response.keyType && (response.bodyFeel ?? "").trim().length > 0 && !!response.colorMatch;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="inline-block rounded-full px-4 py-1 text-xs font-black tracking-widest uppercase border"
          style={{ borderColor: song.accentColor+"55", color: song.accentColor, background: song.accentColor+"11" }}
        >
          Song {songIndex+1} of {totalSongs}
        </div>
        <div className="inline-block rounded-full px-3 py-1 text-xs font-black border"
          style={{ borderColor: song.accentColor+"44", color: song.accentColor+"99", background: "transparent" }}
        >
          🎨 Color: {song.colorWord}
        </div>
      </div>

      {song.dragon}

      <CliffCard>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: song.accentColor+"22", border: `2px solid ${song.accentColor}44` }}
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
            🎹 Your Response — Song {songIndex+1}
          </p>
          <KeyResponseForm response={response} onChange={onChange} accentColor={song.accentColor} />

          <Divider />

          <div>
            <p className="text-[#ffffff33] text-xs font-bold tracking-widest uppercase mb-3">🆘 Need a hint? Ask a dragon</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {(["solara","pip","ember","zephyr"] as const).map((who) => {
                const labels = { solara: "✨ Solara", pip: "🦎 Pip", ember: "🔥 Ember", zephyr: "💜 Zephyr" };
                return (
                  <button key={who} onClick={() => setActiveHint((prev) => prev === who ? null : who)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
                    style={activeHint === who
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
              🎹 Submit Response →
            </GoldBtn>
            {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Answer all three questions to continue</p>}
          </div>
        </CliffCard>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-2">
            <GoldBtn onClick={onNext}>
              {isLast ? "🕵️ Solve the Mystery →" : "Next Song →"}
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
function SceneCompare({ onNext }: { onNext: (a: CompareAnswers) => void }) {
  const [answers, setAnswers] = useState<CompareAnswers>({
    brightestSong: null, darkestSong: null, outlier: null, outlierReason: "", deepTheme: "",
  });

  const isComplete = answers.brightestSong !== null && answers.darkestSong !== null && answers.outlier !== null && answers.outlierReason.trim().length > 0;

  const SongPicker = ({ label, value, onChange }: { label: string; value: number | null; onChange: (i: number) => void }) => (
    <div className="mb-5">
      <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {SONGS.map((s, i) => (
          <motion.button key={s.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => onChange(i)}
            className="px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer"
            style={value === i
              ? { background: s.accentColor+"22", borderColor: s.accentColor, color: s.accentColor }
              : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
            }
          >
            {s.colorWord} — {s.artist}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-[#120a1a] border-2 border-[#c77dff33] rounded-3xl p-8 mb-6"
      >
        <div className="text-5xl mb-3">🕵️</div>
        <h2 className="text-2xl font-black tracking-wide mb-2" style={{ color: "#c77dff", textShadow: "0 0 20px #c77dff44" }}>
          The Rule-Breaker
        </h2>
        <p className="text-[#f8edeb77] text-sm leading-relaxed max-w-sm mx-auto">
          You&apos;ve heard all four. Now find the one that doesn&apos;t follow the major/minor rule.
        </p>
      </motion.div>

      <Zephyr mood="mysterious" message="One of these songs is in a major key — but it doesn't feel bright or happy. The other three are in minor keys. Can you identify the outlier? And more importantly — can you explain why a major key song still feels heavy?" />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#c77dff] mb-5">🕵️ Crack the Code</p>

        <SongPicker label="☀️ Which song felt the brightest?" value={answers.brightestSong} onChange={(i) => setAnswers((a) => ({ ...a, brightestSong: i }))} />
        <SongPicker label="🌑 Which song felt the darkest?" value={answers.darkestSong} onChange={(i) => setAnswers((a) => ({ ...a, darkestSong: i }))} />
        <SongPicker label="⚠️ Which song breaks the major/minor rule?" value={answers.outlier} onChange={(i) => setAnswers((a) => ({ ...a, outlier: i }))} />

        <div className="mb-6">
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">Why does it break the rule?</p>
          <textarea value={answers.outlierReason} onChange={(e) => setAnswers((a) => ({ ...a, outlierReason: e.target.value }))}
            placeholder="It's in a major key but still feels heavy/sad because…" rows={3}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#c77dff88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>

        <div>
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-1">🎨 Bonus: What do all four songs have in common on the surface?</p>
          <p className="text-[#ffffff33] text-xs mb-3">Optional — but look at the titles.</p>
          <textarea value={answers.deepTheme} onChange={(e) => setAnswers((a) => ({ ...a, deepTheme: e.target.value }))}
            placeholder="Look at the song titles. What do you notice?" rows={2}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#c77dff88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={() => onNext(answers)} disabled={!isComplete}>
          🏅 See the Reveal →
        </GoldBtn>
        {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Answer all questions to continue</p>}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// WIN SCENE
// ══════════════════════════════════════════════════════════════
function SceneWin({ responses, compareAnswers, onRestart }: {
  responses: Partial<SongResponse>[]; compareAnswers: CompareAnswers; onRestart: () => void;
}) {
  const gotOutlier = compareAnswers.outlier === 0; // Yellow Ledbetter
  const foundColorTheme = compareAnswers.deepTheme.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="text-center bg-[#120a1a] border-2 border-[#ffd16655] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ rotate: [0,8,-8,0], scale: [1,1.1,1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-4">
          🎹
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16677" }}>
          The Color of Sound — Complete!
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed">
          Four color songs. Four emotional keys. One rule that isn&apos;t really a rule.
        </p>
      </motion.div>

      {/* Reveal */}
      <CliffCard className="border-[#c77dff33]">
        <p className="text-xs font-black tracking-widest uppercase text-[#c77dff] mb-4">🕵️ The Reveal</p>

        <div className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4 mb-4">
          <p className="text-[#ffd166] text-xs font-black uppercase tracking-widest mb-2">The Rule-Breaker</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            <span className="font-black">Yellow Ledbetter</span> is the only major key song — but it doesn&apos;t feel bright.
            {gotOutlier ? " You identified it correctly." : " The answer was Yellow Ledbetter."}
            {" "}A major key creates openness, but Pearl Jam fills that openness with a mournful guitar tone, mumbled unresolvable lyrics, and a tempo that never quite arrives anywhere. Major key. Melancholy feeling. The key is a tool, not a guarantee.
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#a8dadc33] rounded-xl p-4 mb-4">
          <p className="text-[#a8dadc] text-xs font-black uppercase tracking-widest mb-2">Minor Key — Three Different Emotions</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            Blue is <span className="text-[#a8dadc] font-black">lonesome</span>. Something in the Orange is <span className="text-[#ff9f43] font-black">aching</span>. Paint It Black is <span className="text-[#ff6b6b] font-black">furious</span>. All three are minor key — completely different feelings. Minor isn&apos;t one emotion. It&apos;s a palette.
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#95d5b233] rounded-xl p-4">
          <p className="text-[#95d5b2] text-xs font-black uppercase tracking-widest mb-2">🎨 The Surface Theme</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            Colors. Yellow, Blue, Orange, Black. Every title is a color — and in each case, the color carries the emotional meaning of the song.
            {foundColorTheme ? " You spotted it." : " That's the thread connecting all four."}
          </p>
        </div>
      </CliffCard>

      <Solara mood="proud" message="You just did something musicians spend years learning — you listened past the surface and heard how the key creates the emotional world of a song. Major and minor aren't labels. They're choices." />
      <Pip mood="delighted" message="YELLOW LEDBETTER BROKE THE RULES!! MAJOR KEY!! SAD SONG!! THE WHOLE TIME!! I love Pearl Jam so much!!" />
      <Zephyr mood="approving" message="Three minor key songs. Three completely different emotions. Lonesome, aching, furious. You felt the difference. That's real musical literacy." />
      <Ember mood="satisfied" message="Paint It Black. Minor key as rage. Not sadness. Not grief. Rage. You get it now." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd166] mb-5">📚 What You Discovered Today</p>
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {[
            { val: "4", lbl: "Songs Analyzed" },
            { val: "2", lbl: "Key Types" },
            { val: gotOutlier ? "✅" : "🔍", lbl: "Rule-Breaker Found" },
            { val: foundColorTheme ? "✅" : "—", lbl: "Color Theme Found" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#0d0500] border border-[#ffd16633] rounded-2xl px-5 py-4 text-center">
              <p className="text-[#ffd166] text-2xl font-black">{val}</p>
              <p className="text-[#ffd16699] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
        <Divider />
        {[
          "Major keys tend to feel bright and open. Minor keys tend to feel dark or tense. But neither is a guarantee.",
          "Minor key is not one emotion — it can be grief, longing, rage, urgency, or dread depending on the song.",
          "A major key song can still feel melancholy if the other elements — tempo, tone, lyrics — pull it there.",
          "Color in a song title is often a deliberate emotional signal. Yellow, Blue, Orange, Black all carry meaning.",
          "The key is a tool. What the songwriter does with it determines the feeling.",
        ].map((fact, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3+i*0.1 }} className="text-[#f8edeb77] text-sm leading-relaxed mb-2"
          >
            ✦ {fact}
          </motion.p>
        ))}
      </CliffCard>

      <div className="text-center">
        <GhostBtn onClick={onRestart}>↺ Listen Again</GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
type SceneId = "intro" | `song-${number}` | "compare" | "win";

export default function MusicLesson3() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [responses, setResponses] = useState<Partial<SongResponse>[]>(SONGS.map(() => ({})));
  const [compareAnswers, setCompareAnswers] = useState<CompareAnswers>({ brightestSong: null, darkestSong: null, outlier: null, outlierReason: "", deepTheme: "" });

  const TOTAL_SCENES = 1 + SONGS.length + 2;
  const sceneIndex = (): number => {
    if (scene === "intro") return 1;
    if (scene === "compare") return SONGS.length + 2;
    if (scene === "win") return TOTAL_SCENES;
    return parseInt(scene.split("-")[1]) + 2;
  };

  const updateResponse = (i: number, r: Partial<SongResponse>) => {
    setResponses((prev) => { const next = [...prev]; next[i] = r; return next; });
  };

  const handleCompare = (a: CompareAnswers) => {
    setCompareAnswers(a);
    setScene("win");
  };

  const restart = useCallback(() => {
    setScene("intro");
    setResponses(SONGS.map(() => ({})));
    setCompareAnswers({ brightestSong: null, darkestSong: null, outlier: null, outlierReason: "", deepTheme: "" });
  }, []);

  return (
    <main className="min-h-screen text-[#f8edeb] overflow-x-hidden" style={{ background: "#080008" }}>
      <EmbercliffAtmosphere />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#ffd16655] uppercase font-bold mb-1">Dracos Academy · Music · Lesson 3</p>
          <h1 className="text-2xl font-black text-[#ffd166] mb-1 tracking-wide" style={{ textShadow: "0 0 24px #ffd16666" }}>
            🏰 Embercliff — The Color of Sound
          </h1>
          <p className="text-[#f8edeb44] text-sm italic">Keys &amp; Emotion · Major vs Minor · The Rule-Breaker</p>
        </div>

        <ProgressBar scene={sceneIndex()} total={TOTAL_SCENES} />

        <AnimatePresence mode="wait">
          <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {scene === "intro" && <SceneIntro onNext={() => setScene("song-0")} />}

            {SONGS.map((song, i) =>
              scene === `song-${i}` ? (
                <SongScene key={song.id} song={song} songIndex={i} totalSongs={SONGS.length}
                  response={responses[i]} onChange={(r) => updateResponse(i, r)}
                  onNext={() => setScene(i < SONGS.length-1 ? `song-${i+1}` : "compare")}
                  isLast={i === SONGS.length-1}
                />
              ) : null
            )}

            {scene === "compare" && <SceneCompare onNext={handleCompare} />}
            {scene === "win" && <SceneWin responses={responses} compareAnswers={compareAnswers} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10 mt-8" />
    </main>
  );
}