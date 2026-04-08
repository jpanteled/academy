// src/app/kyliana/music/lesson-2/page.tsx
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

type SectionTag = "intro" | "verse" | "chorus" | "bridge" | "outro" | "instrumental";

type SongMap = {
  sections: SectionTag[];
  standout: string;
  pattern: string;
};

type CompareAnswers = {
  oddOne: number | null;
  oddReason: string;
  shallowTheme: string;
  deepTheme: string;
};

// ══════════════════════════════════════════════════════════════
// SECTION DEFINITIONS
// ══════════════════════════════════════════════════════════════
const SECTION_DEFS: Record<SectionTag, { label: string; color: string; desc: string }> = {
  intro:        { label: "Intro",        color: "#ffd166", desc: "The opening — sets the mood before singing starts" },
  verse:        { label: "Verse",        color: "#a8dadc", desc: "Tells the story — lyrics change each time" },
  chorus:       { label: "Chorus",       color: "#c77dff", desc: "The big repeated hook — same words every time" },
  bridge:       { label: "Bridge",       color: "#ff9f43", desc: "A surprise section — breaks the pattern" },
  outro:        { label: "Outro",        color: "#95d5b2", desc: "The ending — winds the song down" },
  instrumental: { label: "Instrumental", color: "#ff6b6b", desc: "Music only — no vocals" },
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
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/embercliff/bg3.png')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #08000899 0%, #080008bb 40%, #080008cc 100%)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M0 200 Q 80 180 60 350 Q 40 500 120 600 Q 160 650 80 800" stroke="#ffd16688" strokeWidth="1.5" fill="none" filter="url(#glow2)" />
        <path d="M0 400 Q 100 420 70 550 Q 50 650 140 700" stroke="#c77dff66" strokeWidth="1" fill="none" />
        <path d="M1100 150 Q 980 200 1000 380 Q 1020 520 920 650 Q 880 700 960 850" stroke="#ffd16677" strokeWidth="1.5" fill="none" filter="url(#glow2)" />
        <path d="M400 0 Q 420 100 380 200 Q 340 300 440 400 Q 500 450 460 600" stroke="#c77dff44" strokeWidth="1" fill="none" />
      </svg>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={`vein-${i}`} className="absolute rounded-full"
          style={{ width: 6 + (i % 3) * 2, height: 6 + (i % 3) * 2, left: [`8%`,`5%`,`15%`,`88%`,`92%`,`82%`,`45%`,`68%`][i], top: [`20%`,`45%`,`70%`,`10%`,`38%`,`65%`,`5%`,`85%`][i], background: ENERGY_COLORS[i % ENERGY_COLORS.length], filter: "blur(4px)", boxShadow: `0 0 12px 4px ${ENERGY_COLORS[i % ENERGY_COLORS.length]}88` }}
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
        <span className="text-xs tracking-widest text-[#ffd16699] uppercase font-bold">Archive Progress</span>
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
// STRUCTURE MAP BUILDER
// ══════════════════════════════════════════════════════════════
const SECTION_OPTIONS: SectionTag[] = ["intro","verse","chorus","bridge","outro","instrumental"];

function StructureMapBuilder({ map, onChange, accentColor, maxSections = 10 }: {
  map: Partial<SongMap>; onChange: (m: Partial<SongMap>) => void; accentColor: string; maxSections?: number;
}) {
  const sections = map.sections ?? [];

  const addSection = (tag: SectionTag) => {
    if (sections.length >= maxSections) return;
    onChange({ ...map, sections: [...sections, tag] });
  };

  const removeSection = (idx: number) => {
    onChange({ ...map, sections: sections.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Reference */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>📖 Section Reference</p>
        <div className="grid grid-cols-1 gap-2">
          {SECTION_OPTIONS.map((tag) => {
            const def = SECTION_DEFS[tag];
            return (
              <div key={tag} className="flex items-center gap-3 bg-[#0d0500] border border-[#ffffff0a] rounded-xl px-4 py-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: def.color }} />
                <span className="text-xs font-black" style={{ color: def.color }}>{def.label}</span>
                <span className="text-[#ffffff44] text-xs">{def.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Builder */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>🗺️ Build the Song Map — tap sections in order</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {SECTION_OPTIONS.map((tag) => {
            const def = SECTION_DEFS[tag];
            return (
              <motion.button key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => addSection(tag)} disabled={sections.length >= maxSections}
                className="px-3 py-1.5 rounded-full text-xs font-black border transition-all cursor-pointer disabled:opacity-30"
                style={{ background: def.color+"22", borderColor: def.color, color: def.color }}
              >
                + {def.label}
              </motion.button>
            );
          })}
        </div>
        <div className="bg-[#0d0500] border border-[#ffffff0a] rounded-2xl p-4 min-h-[80px]">
          {sections.length === 0 ? (
            <p className="text-[#ffffff33] text-xs text-center py-4">Tap sections above to start mapping…</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sections.map((tag, idx) => {
                const def = SECTION_DEFS[tag];
                return (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border cursor-pointer"
                    style={{ background: def.color+"22", borderColor: def.color, color: def.color }}
                    onClick={() => removeSection(idx)} title="Tap to remove"
                  >
                    {def.label}<span className="opacity-50 text-[10px]">✕</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        <p className="text-[#ffffff33] text-xs mt-2">Tap any section in your map to remove it</p>
      </div>

      {/* Standout */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>⭐ What section stood out most? Why?</p>
        <textarea value={map.standout ?? ""} onChange={(e) => onChange({ ...map, standout: e.target.value })}
          placeholder="Describe the moment that grabbed your attention…" rows={3}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>

      {/* Pattern */}
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>🔁 Did you notice a repeating pattern?</p>
        <textarea value={map.pattern ?? ""} onChange={(e) => onChange({ ...map, pattern: e.target.value })}
          placeholder="e.g. verse → chorus → verse → chorus, or something unusual…" rows={2}
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
  id: string; title: string; artist: string; youtubeId: string; genre: string;
  accentColor: string;
  dragon: React.ReactNode;
  correct: React.ReactNode;
  hints: { solara: string; pip: string; ember: string; zephyr: string };
  maxSections?: number;
};

const SONGS: SongConfig[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    artist: "Traditional / Classical",
    youtubeId: "PYadlIf01Ww",
    genre: "Classical",
    accentColor: "#ffd166",
    dragon: <Solara mood="warm" message="We start simple on purpose. This is one of the oldest melodies you know. Map the structure carefully — it will be your reference point for everything that comes next. Simple isn't easy. Simple is precise." />,
    correct: <Solara mood="proud" message="Clean, clear, simple. Verse after verse, same structure, same feeling. Hold onto that map. When the next songs get complicated, you'll know exactly what 'simple' looks like by comparison." />,
    hints: {
      solara: "This song is almost entirely verses — the same melody repeating. Listen for where it feels like a natural pause or ending. That's your structure.",
      pip: "It's SO SHORT and SO SIMPLE!! But that's the whole point!! We need a simple one so the others feel BIG by comparison!!",
      ember: "Don't overthink it. Verse. Verse. Maybe an outro. Done. Save your energy — the next songs earn it.",
      zephyr: "The simplest structures are often the oldest. This melody is over two hundred years old. It has survived because its bones are perfect.",
    },
  },
  {
    id: "we-will-rock-you",
    title: "We Will Rock You / We Are The Champions",
    artist: "Queen",
    youtubeId: "VNWvNEPsilI",
    genre: "Rock / Anthem",
    accentColor: "#ff6b6b",
    dragon: <Ember mood="fired_up" message="Two songs in one. We Will Rock You flows straight into We Are The Champions — together they tell one complete story. A fighter who refuses to quit. Map each song separately if you can, or map the whole thing as one. Either way — listen to what they're actually saying." />,
    correct: <Ember mood="satisfied" message="'I've paid my dues, time after time. I've done my sentence but committed no crime.' That's not a sports anthem. That's someone who's been knocked down refusing to stay there. Queen wrote two songs about that feeling and the world made them into stadium chants. Good." />,
    hints: {
      solara: "Listen for where We Will Rock You ends and We Are The Champions begins. That transition is a structural choice — two songs designed to work as one. Why do you think they flow together?",
      pip: "STOMP STOMP CLAP!! And then the PIANO!! It's like a one-two punch!! First you stomp, then you soar!! That's STRUCTURE serving EMOTION!!",
      ember: "Freddie Mercury wrote We Are The Champions after Queen was booed off stage early in their career. He wrote it directly to the crowd that doubted them. Listen with that in mind.",
      zephyr: "Notice the shift in perspective. We Will Rock You addresses someone else — 'we will rock YOU.' We Are The Champions speaks for itself — 'I.' The structure mirrors the emotional journey from defiance to triumph.",
    },
  },
  {
    id: "wildflowers",
    title: "Wildflowers",
    artist: "Dolly Parton",
    youtubeId: "4HMw1eV2Qcs",
    genre: "Country",
    accentColor: "#95d5b2",
    dragon: <Zephyr mood="mysterious" message="Dolly Parton is a more careful writer than people give her credit for. Listen to the words. Who is this song about? What does she want for them? Map the structure — and this time, also notice what she's actually saying." />,
    correct: <Zephyr mood="approving" message="Wildflowers don't belong in a cage. They belong where the wild wind blows. That's not just about flowers. That's about people who don't fit the box they've been put in. Dolly wrote it about herself — and everyone who ever felt the same." />,
    hints: {
      solara: "Country songs are clear storytellers. When the story moves forward, you're in a verse. When it returns to the central feeling — the image of wildflowers — you're in the chorus.",
      pip: "WILDFLOWERS!! Growing wherever they want!! Not in a vase!! Not in a box!! FREE!! Is she maybe talking about… people?? 👀",
      ember: "Simple structure, deep feeling. The bones are clean — verse, chorus, verse, chorus. What makes it powerful is what she puts inside the bones.",
      zephyr: "Notice the chorus uses the word 'wildflowers' as both a literal image and a metaphor. That double meaning is intentional. Great songwriters never waste a word.",
    },
  },
  {
    id: "wallflower",
    title: "Wallflower",
    artist: "Bob Dylan",
    youtubeId: "smD0CLvVt-A",
    genre: "Folk",
    accentColor: "#c77dff",
    dragon: <Pip mood="hyper" message="Okay okay okay — this one is QUIETER than the others. Way quieter. But listen REALLY carefully to what Dylan is saying. Who is he singing to? What does that person feel like? And… does this remind you of ANY other song we've heard today??" />,
    correct: <Pip mood="delighted" message="A wallflower!! Someone who stands alone at the edge of the room, watching everyone else!! Dylan wrote this to that person — saying hey, I see you, dance with me!! It's about being unseen and someone finally seeing you!! FLOWERS AGAIN!! DID YOU CATCH IT??" />,
    hints: {
      solara: "This song is very simple structurally — almost entirely verses with a gentle repeating refrain. But the simplicity serves the feeling. A quiet song for a quiet person who's been overlooked.",
      pip: "WALLFLOWER!! Like a flower on the wall!! Quiet!! Unseen!! But still there!! Still growing!! FLOWER THEME!! FLOWER THEME!!",
      ember: "Dylan wrote this for someone who felt invisible. Simple chords, simple structure, gentle voice. The restraint IS the message — this isn't a stadium anthem. It's a whisper to one person.",
      zephyr: "A wallflower is someone who stays at the edges of a social situation, unnoticed. Dylan is singing directly to that person. Compare that to Dolly's wildflowers — both use a flower as a symbol for a person who doesn't quite fit. Is that a coincidence?",
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
          📜
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16655" }}>
          The Archive Mission
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed max-w-md mx-auto">
          Embercliff&apos;s Song Archive needs its structural maps restored.
          But there&apos;s a second mystery hidden in today&apos;s four songs.
          Can you find it?
        </p>
      </motion.div>

      <Solara mood="curious" message="You proved yourself in Lesson 1, Kyliana. You know how to hear a song. Today you'll learn how songs are built — and you'll find something hidden across three of the four songs. I won't tell you what it is. You'll know it when you find it." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-4">📐 The Building Blocks of Song Structure</p>
        <div className="grid grid-cols-1 gap-3">
          {(["intro","verse","chorus","bridge","outro","instrumental"] as SectionTag[]).map((tag) => {
            const def = SECTION_DEFS[tag];
            return (
              <div key={tag} className="flex items-start gap-3 bg-[#0d0500] border border-[#ffffff0a] rounded-xl p-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: def.color }} />
                <div>
                  <p className="text-sm font-black mb-1" style={{ color: def.color }}>{def.label}</p>
                  <p className="text-[#f8edeb55] text-xs leading-relaxed">{def.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CliffCard>

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">🕵️ Your Double Mission</p>
        <div className="space-y-3 text-[#f8edeb77] text-sm leading-relaxed">
          <p>1. <span className="text-[#ffd166] font-black">Map the structure</span> of each song — intro, verse, chorus, bridge, outro.</p>
          <p>2. <span className="text-[#c77dff] font-black">Find the hidden thread</span> — three of the four songs share something in common. One doesn&apos;t. Can you figure out which is the odd one out and why?</p>
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={onNext}>📜 Begin the Archive Mission →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG SCENE
// ══════════════════════════════════════════════════════════════
function SongScene({ song, songIndex, totalSongs, map, onChange, onNext, isLast }: {
  song: SongConfig; songIndex: number; totalSongs: number;
  map: Partial<SongMap>; onChange: (m: Partial<SongMap>) => void;
  onNext: () => void; isLast: boolean;
}) {
  const [activeHint, setActiveHint] = useState<"solara"|"pip"|"ember"|"zephyr"|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = (map.sections?.length ?? 0) >= 2 && !!map.standout;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="inline-block rounded-full px-4 py-1 text-xs font-black tracking-widest uppercase border"
          style={{ borderColor: song.accentColor+"55", color: song.accentColor, background: song.accentColor+"11" }}
        >
          Song {songIndex+1} of {totalSongs} · {song.genre}
        </div>
        {songIndex === 0 && (
          <div className="inline-block rounded-full px-3 py-1 text-xs font-black border border-[#ffd16655] text-[#ffd166] bg-[#ffd16611]">
            📐 Structural Anchor
          </div>
        )}
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
            🗺️ Map This Song — Song {songIndex+1}
          </p>
          <StructureMapBuilder map={map} onChange={onChange} accentColor={song.accentColor} maxSections={song.maxSections} />

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
              📜 Submit Map →
            </GoldBtn>
            {!isComplete && (
              <p className="text-[#ffffff33] text-xs mt-3">Add at least 2 sections and describe your standout moment</p>
            )}
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
// COMPARE / MYSTERY SCENE
// ══════════════════════════════════════════════════════════════
function SceneCompare({ onNext }: { onNext: (a: CompareAnswers) => void }) {
  const [answers, setAnswers] = useState<CompareAnswers>({
    oddOne: null, oddReason: "", shallowTheme: "", deepTheme: "",
  });

  const isComplete =
    answers.oddOne !== null &&
    answers.oddReason.trim().length > 0 &&
    answers.shallowTheme.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-[#120a1a] border-2 border-[#c77dff33] rounded-3xl p-8 mb-6"
      >
        <div className="text-5xl mb-3">🕵️</div>
        <h2 className="text-2xl font-black tracking-wide mb-2" style={{ color: "#c77dff", textShadow: "0 0 20px #c77dff44" }}>
          The Hidden Mystery
        </h2>
        <p className="text-[#f8edeb77] text-sm leading-relaxed max-w-sm mx-auto">
          You&apos;ve mapped all four songs. Now solve it — what do three of them share that the fourth doesn&apos;t?
        </p>
      </motion.div>

      <Zephyr mood="mysterious" message="You've heard all four. You've mapped them. Now think carefully — not about the structure. About what they're saying. Three of these songs share something. One stands apart. Which one — and why?" />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#c77dff] mb-5">🕵️ Crack the Mystery</p>

        {/* Odd one out */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">
            Which song is the odd one out?
          </p>
          <div className="flex flex-wrap gap-2">
            {SONGS.map((s, i) => (
              <motion.button key={s.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setAnswers((a) => ({ ...a, oddOne: i }))}
                className="px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer"
                style={answers.oddOne === i
                  ? { background: s.accentColor+"22", borderColor: s.accentColor, color: s.accentColor }
                  : { background: "transparent", borderColor: "#ffffff22", color: "#ffffff55" }
                }
              >
                {s.title.split(" ").slice(0,3).join(" ")}…
              </motion.button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">
            Why is it different?
          </p>
          <textarea value={answers.oddReason} onChange={(e) => setAnswers((a) => ({ ...a, oddReason: e.target.value }))}
            placeholder="What does it lack that the others have? Or what does it have that the others don't?" rows={3}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#c77dff88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>

        {/* Shallow theme */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-3">
            🌸 What do the other three songs have in common? (surface level — what do you notice first?)
          </p>
          <textarea value={answers.shallowTheme} onChange={(e) => setAnswers((a) => ({ ...a, shallowTheme: e.target.value }))}
            placeholder="Look at the titles. Listen to the words. What word or image keeps appearing?" rows={2}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#c77dff88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>

        {/* Deep theme — optional */}
        <div className="mb-2">
          <p className="text-xs font-black tracking-widest uppercase text-[#ffd16699] mb-1">
            💜 Bonus: Is there a deeper meaning? What are they really about?
          </p>
          <p className="text-[#ffffff33] text-xs mb-3">Optional — but Zephyr will be impressed if you find it.</p>
          <textarea value={answers.deepTheme} onChange={(e) => setAnswers((a) => ({ ...a, deepTheme: e.target.value }))}
            placeholder="Think about the people in these songs. How do they feel? What do they want?" rows={2}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#c77dff88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={() => onNext(answers)} disabled={!isComplete}>
          🏅 Reveal the Answer →
        </GoldBtn>
        {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Pick the odd one out and explain why</p>}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// WIN SCENE
// ══════════════════════════════════════════════════════════════
function SceneWin({ maps, compareAnswers, onRestart }: {
  maps: Partial<SongMap>[]; compareAnswers: CompareAnswers; onRestart: () => void;
}) {
  const totalSections = maps.reduce((acc, m) => acc+(m.sections?.length ?? 0), 0);
  const gotOddOne = compareAnswers.oddOne === 0; // Twinkle is correct
  const foundDeepTheme = compareAnswers.deepTheme.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="text-center bg-[#120a1a] border-2 border-[#ffd16655] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ rotate: [0,8,-8,0], scale: [1,1.1,1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-4">
          📜
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#ffd166", textShadow: "0 0 30px #ffd16677" }}>
          Archive Restored!
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed">
          Four songs mapped. The mystery {gotOddOne ? "solved" : "investigated"}. The dragons are impressed.
        </p>
      </motion.div>

      {/* Mystery reveal */}
      <CliffCard className="border-[#c77dff33]">
        <p className="text-xs font-black tracking-widest uppercase text-[#c77dff] mb-4">🕵️ The Mystery — Revealed</p>

        <div className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4 mb-4">
          <p className="text-[#ffd166] text-xs font-black uppercase tracking-widest mb-2">The Odd One Out</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            <span className="font-black">Twinkle Twinkle Little Star</span> — it&apos;s about wonder and innocence.
            The other three are all about people who don&apos;t quite fit — and finding strength in that.
            {gotOddOne ? " You got it." : ` You said ${SONGS[compareAnswers.oddOne ?? 0]?.title ?? "another song"} — close look at the themes and you'll see Twinkle is the one that stands apart.`}
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#95d5b233] rounded-xl p-4 mb-4">
          <p className="text-[#95d5b2] text-xs font-black uppercase tracking-widest mb-2">🌸 The Surface Theme</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            <span className="font-black">Flowers.</span> Wildflowers (Dolly). Wallflower (Dylan). And Queen&apos;s Champions — &ldquo;no bed of roses.&rdquo; Three songs, three flower references. One of them hiding in plain sight.
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#c77dff33] rounded-xl p-4">
          <p className="text-[#c77dff] text-xs font-black uppercase tracking-widest mb-2">💜 The Deeper Theme</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            People who don&apos;t fit the box they&apos;ve been given — and refuse to stay there. Dolly&apos;s wildflowers belong in the wind, not a vase. Dylan&apos;s wallflower stands unseen at the edge of the room. Queen fought their way from being booed off stage to stadiums full of people screaming their name.
            {foundDeepTheme ? " You found it. That's real literary thinking." : " That's the hidden thread. See it now?"}
          </p>
        </div>
      </CliffCard>

      <Solara mood="proud" message="You mapped four songs and found a hidden theme across three of them. That's not just music analysis — that's reading. You're finding meaning across different texts. That skill works on books, poems, films, everything." />
      <Pip mood="delighted" message={`${gotOddOne ? "YOU GOT THE ODD ONE OUT!!" : "SO CLOSE!!"} AND THE FLOWERS!! WILDFLOWERS!! WALLFLOWER!! NO BED OF ROSES!! THEY'RE ALL FLOWERS AND THEY'RE ALL ABOUT BEING FREE!! I'M LOSING MY MIND!!`} />
      {foundDeepTheme && <Zephyr mood="approving" message="You found the deeper theme. People who don't fit — and find their strength anyway. That's what those three songs are really about. I'm genuinely impressed. Don't let it go to your head." />}
      <Ember mood="satisfied" message="Queen. Again. Obviously." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#ffd166] mb-5">📚 What You Discovered Today</p>
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {[
            { val: "4", lbl: "Songs Mapped" },
            { val: totalSections.toString(), lbl: "Sections Identified" },
            { val: gotOddOne ? "✅" : "🔍", lbl: "Odd One Out" },
            { val: foundDeepTheme ? "✅" : "—", lbl: "Deep Theme Found" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#0d0500] border border-[#ffd16633] rounded-2xl px-5 py-4 text-center">
              <p className="text-[#ffd166] text-2xl font-black">{val}</p>
              <p className="text-[#ffd16699] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
        <Divider />
        {[
          "Song structure — intro, verse, chorus, bridge, outro — is the skeleton every song is built on.",
          "Simple structure isn't weak. Twinkle Twinkle has survived 200 years because its bones are perfect.",
          "Songs can share themes across genres, decades, and artists. Finding those threads is literary analysis.",
          "A surface theme (flowers) can hide a deeper one (people who don't belong, finding their strength).",
          "The odd one out teaches you what the pattern is — by showing you what breaks it.",
        ].map((fact, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3+i*0.1 }} className="text-[#f8edeb77] text-sm leading-relaxed mb-2"
          >
            ✦ {fact}
          </motion.p>
        ))}
      </CliffCard>

      <div className="text-center">
        <GhostBtn onClick={onRestart}>↺ Map Again</GhostBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
type SceneId = "intro" | `song-${number}` | "compare" | "win";

export default function MusicLesson2() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [maps, setMaps] = useState<Partial<SongMap>[]>(SONGS.map(() => ({})));
  const [compareAnswers, setCompareAnswers] = useState<CompareAnswers>({ oddOne: null, oddReason: "", shallowTheme: "", deepTheme: "" });

  const TOTAL_SCENES = 1 + SONGS.length + 2;
  const sceneIndex = (): number => {
    if (scene === "intro") return 1;
    if (scene === "compare") return SONGS.length + 2;
    if (scene === "win") return TOTAL_SCENES;
    return parseInt(scene.split("-")[1]) + 2;
  };

  const updateMap = (i: number, m: Partial<SongMap>) => {
    setMaps((prev) => { const next = [...prev]; next[i] = m; return next; });
  };

  const handleCompare = (a: CompareAnswers) => {
    setCompareAnswers(a);
    setScene("win");
  };

  const restart = useCallback(() => {
    setScene("intro");
    setMaps(SONGS.map(() => ({})));
    setCompareAnswers({ oddOne: null, oddReason: "", shallowTheme: "", deepTheme: "" });
  }, []);

  return (
    <main className="min-h-screen text-[#f8edeb] overflow-x-hidden" style={{ background: "#080008" }}>
      <EmbercliffAtmosphere />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#ffd16655] uppercase font-bold mb-1">Dracos Academy · Music · Lesson 2</p>
          <h1 className="text-2xl font-black text-[#ffd166] mb-1 tracking-wide" style={{ textShadow: "0 0 24px #ffd16666" }}>
            🏰 Embercliff — The Archive Mission
          </h1>
          <p className="text-[#f8edeb44] text-sm italic">Song Structure · Hidden Themes · The Odd One Out</p>
        </div>

        <ProgressBar scene={sceneIndex()} total={TOTAL_SCENES} />

        <AnimatePresence mode="wait">
          <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {scene === "intro" && <SceneIntro onNext={() => setScene("song-0")} />}

            {SONGS.map((song, i) =>
              scene === `song-${i}` ? (
                <SongScene key={song.id} song={song} songIndex={i} totalSongs={SONGS.length}
                  map={maps[i]} onChange={(m) => updateMap(i, m)}
                  onNext={() => setScene(i < SONGS.length-1 ? `song-${i+1}` : "compare")}
                  isLast={i === SONGS.length-1}
                />
              ) : null
            )}

            {scene === "compare" && <SceneCompare onNext={handleCompare} />}
            {scene === "win" && <SceneWin maps={maps} compareAnswers={compareAnswers} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ffd166] to-transparent relative z-10 mt-8" />
    </main>
  );
}