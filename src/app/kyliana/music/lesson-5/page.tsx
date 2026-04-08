// src/app/kyliana/music/lesson-5/page.tsx
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
type CodaMood = "neutral" | "warm" | "amused" | "proud";

type SongResponse = {
  flowObservation: string;
  productionNotes: string;
  eraFeel: string;
  snoop: string;
};

type CompareAnswers = {
  biggestShift: number | null;
  mostSnoop: number | null;
  reinventionTheme: string;
  poetryMoment: string;
};

// ══════════════════════════════════════════════════════════════
// CHARACTERS
// ══════════════════════════════════════════════════════════════
function Coda({ mood, message }: { mood: CodaMood; message: string }) {
  const imgMap: Record<CodaMood, string> = {
    neutral: "/images/embercliff/coda-neutral.png",
    warm:    "/images/embercliff/coda-warm.png",
    amused:  "/images/embercliff/coda-amused.png",
    proud:   "/images/embercliff/coda-proud.png",
  };
  return <CharacterBubble img={imgMap[mood]} name="🪨 Coda" location="The Ancient Stage" nameColor="text-[#b5838d]" borderColor="border-[#b5838d44]" bg="bg-[#1a0d10]" message={message} />;
}

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
      className={`flex items-start gap-4 ${bg} border ${borderColor} rounded-2xl p-5 mb-4`}
    >
      <motion.div animate={{ y: [0,-4,0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex-shrink-0">
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
  { x: "8%", y: "12%" },{ x: "88%", y: "8%" },{ x: "5%", y: "45%" },
  { x: "92%", y: "38%" },{ x: "15%", y: "72%" },{ x: "82%", y: "65%" },
  { x: "48%", y: "5%" },{ x: "55%", y: "88%" },{ x: "28%", y: "30%" },
  { x: "70%", y: "25%" },{ x: "20%", y: "90%" },{ x: "75%", y: "80%" },
];
const ENERGY_COLORS = ["#ffd166","#ff6b6b","#c77dff","#a8dadc","#ff9f43","#b5838d"];

function EmbercliffAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/embercliff/bg.png')", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #08000899 0%, #080008bb 40%, #080008cc 100%)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <filter id="glow5">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M0 200 Q 80 180 60 350 Q 40 500 120 600 Q 160 650 80 800" stroke="#ffd16688" strokeWidth="1.5" fill="none" filter="url(#glow5)" />
        <path d="M1100 150 Q 980 200 1000 380 Q 1020 520 920 650" stroke="#b5838d77" strokeWidth="1.5" fill="none" filter="url(#glow5)" />
        <path d="M400 0 Q 420 100 380 200 Q 340 300 440 400" stroke="#c77dff44" strokeWidth="1" fill="none" />
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
          style={{ width: 1.5+(i%4)*0.8, height: 1.5+(i%4)*0.8, left: `${(i*17+3)%97}%`, bottom: "-10px", background: ["#ffd166","#ff6b6b","#c77dff","#ff9f43","#b5838d"][i%5], filter: "blur(0.3px)", boxShadow: `0 0 4px 1px ${["#ffd16688","#ff6b6b88","#c77dff88","#ff9f4388","#b5838d88"][i%5]}` }}
          animate={{ y: [0,-(500+i*30)], x: [0,Math.sin(i*1.3)*40], opacity: [0,0.9,0.7,0], scale: [1,0.8,0.4,0] }}
          transition={{ duration: 7+(i%6), repeat: Infinity, delay: i*0.5, ease: "easeOut" }}
        />
      ))}
      {[{x:"15%",y:"25%",color:"#ffd16618",size:280},{x:"85%",y:"20%",color:"#b5838d18",size:320},{x:"10%",y:"70%",color:"#ff6b6b14",size:240},{x:"80%",y:"75%",color:"#a8dadc14",size:260},{x:"50%",y:"50%",color:"#c77dff10",size:400}].map((orb,i) => (
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
        <span className="text-xs tracking-widest text-[#b5838d99] uppercase font-bold">The Long Game</span>
        <span className="text-xs text-[#b5838d] font-bold">{pct}%</span>
      </div>
      <div className="h-2 bg-[#0d0500] rounded-full overflow-hidden border border-[#b5838d22]">
        <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#ff6b6b,#ffd166,#b5838d,#a8dadc)" }}
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
      className="bg-[#0d0500] border border-[#b5838d33] rounded-xl p-4 mt-3 text-[#f8edeb88] text-sm leading-relaxed"
    >
      <span className="font-black text-[#b5838d]">{who}:</span> &ldquo;{text}&rdquo;
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b5838d22]" />
      <div className="w-2 h-2 rounded-full bg-[#b5838d44]" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b5838d22]" />
    </div>
  );
}

function GoldBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <motion.button whileHover={{ scale: disabled ? 1 : 1.03 }} whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick} disabled={disabled}
      className="px-8 py-3 rounded-full font-black text-sm tracking-widest text-[#0d0500] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ background: "linear-gradient(135deg,#b5838d,#ffd166,#b5838d)" }}
    >
      {children}
    </motion.button>
  );
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className="px-8 py-3 rounded-full text-sm tracking-widest border border-[#b5838d33] text-[#b5838d99] hover:border-[#b5838d] hover:text-[#b5838d] transition-all cursor-pointer bg-transparent font-bold"
    >
      {children}
    </motion.button>
  );
}

function YouTubePlayer({ videoId, watchUrl, color }: { videoId: string; watchUrl: string; color: string }) {
  return (
    <div className="mb-5">
      <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: color+"55" }}>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title="Music player"
          />
        </div>
      </div>
      <a href={watchUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all"
        style={{ borderColor: color+"44", color, background: color+"11" }}
      >
        ▶ Open on YouTube
      </a>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LYRIC SPOTLIGHT
// ══════════════════════════════════════════════════════════════
function LyricSpotlight({ lines, annotation, color }: { lines: string[]; annotation: string; color: string }) {
  return (
    <div className="bg-[#0d0500] border-l-4 rounded-xl p-4 mb-4" style={{ borderColor: color }}>
      <div className="mb-3">
        {lines.map((line, i) => (
          <p key={i} className="text-[#f8edeb] font-black text-base leading-relaxed italic">&ldquo;{line}&rdquo;</p>
        ))}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: color+"cc" }}>{annotation}</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG RESPONSE FORM
// ══════════════════════════════════════════════════════════════
function SongResponseForm({ response, onChange, accentColor, prompts }: {
  response: Partial<SongResponse>;
  onChange: (r: Partial<SongResponse>) => void;
  accentColor: string;
  prompts: { flow: string; production: string; era: string; snoop: string };
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: accentColor }}>🎤 Flow & Poetry</p>
        <p className="text-[#ffffff44] text-xs mb-2">{prompts.flow}</p>
        <textarea value={response.flowObservation ?? ""} onChange={(e) => onChange({ ...response, flowObservation: e.target.value })}
          placeholder="What did you notice about the way the words were delivered?" rows={2}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: accentColor }}>🎛️ Production & Sound</p>
        <p className="text-[#ffffff44] text-xs mb-2">{prompts.production}</p>
        <textarea value={response.productionNotes ?? ""} onChange={(e) => onChange({ ...response, productionNotes: e.target.value })}
          placeholder="What did the beat, instruments, or sounds feel like?" rows={2}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: accentColor }}>📅 Era & Vibe</p>
        <p className="text-[#ffffff44] text-xs mb-2">{prompts.era}</p>
        <textarea value={response.eraFeel ?? ""} onChange={(e) => onChange({ ...response, eraFeel: e.target.value })}
          placeholder="When does this feel like it was made? What does it remind you of?" rows={2}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>
      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: accentColor }}>🐕 Still Snoop?</p>
        <p className="text-[#ffffff44] text-xs mb-2">{prompts.snoop}</p>
        <textarea value={response.snoop ?? ""} onChange={(e) => onChange({ ...response, snoop: e.target.value })}
          placeholder="Even though it sounds different — what makes it unmistakably Snoop?" rows={2}
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
type LyricSpot = { lines: string[]; annotation: string };

type SongConfig = {
  id: string; title: string; artist: string; year: number;
  youtubeId: string; watchUrl: string; accentColor: string;
  era: string; producer: string;
  dragons: React.ReactNode[];
  correct: React.ReactNode;
  lyricSpotlight: LyricSpot;
  prompts: { flow: string; production: string; era: string; snoop: string };
  hints: { solara: string; pip: string; ember: string; zephyr: string; coda: string };
};

const SONGS: SongConfig[] = [
  {
    id: "gin-and-juice",
    title: "Gin and Juice",
    artist: "Snoop Dogg",
    year: 1993,
    youtubeId: "fWCZse1iwE0",
    watchUrl: "https://www.youtube.com/watch?v=fWCZse1iwE0",
    accentColor: "#95d5b2",
    era: "Doggystyle Era — 1993",
    producer: "Dr. Dre",
    dragons: [
      <Coda key="c" mood="warm" message="1993. Snoop Dogg is 21 years old. Dr. Dre has just built the sonic blueprint for West Coast rap — slow, syrupy, built on funk samples and deep bass. This is the beginning. Listen to how Snoop sounds comfortable in a way that most artists never achieve. He's not performing. He's just… there." />,
      <Zephyr key="z" mood="mysterious" message="G-funk — the genre Dr. Dre created — is built on samples from 1970s funk records. Parliament, Bootsy Collins, Roger Troutman. Dre took that warm analog sound and slowed it down, added 808 drums, and created something completely new out of something very old. Listen for the warmth underneath everything." />,
    ],
    correct: <Solara mood="proud" message="'With so much drama in the LBC, it's kinda hard being Snoop D-O-Double-G.' Eight words to establish place. His own name as a rhyme device. The spelling of D-O-G as a rhythmic beat. That's not a coincidence — that's a poet who knows exactly what he's doing." />,
    lyricSpotlight: {
      lines: ["With so much drama in the LBC", "It's kinda hard being Snoop D-O-Double-G"],
      annotation: "LBC = Long Beach, California. Place established in 6 words. His own name becomes a percussion instrument — the spelling D-O-G lands on the beat. This is rap as poetry: economy, rhythm, identity, all in two lines."
    },
    prompts: {
      flow: "Snoop's delivery is famously relaxed — almost like he's talking, not rapping. Does it feel effortless or deliberate to you?",
      production: "Listen for the bass line underneath everything. And the synth — that wavy, warm sound. That's G-funk. What does it feel like compared to music you've heard before?",
      era: "This was made in 1993 — before you were born, before your mom was your age now. Does it feel old? Why or why not?",
      snoop: "This is Snoop at 21. What's already there that you'll hear in every Snoop song after this?",
    },
    hints: {
      solara: "Listen to the opening lines as if they're a poem, not a song. Where does he put the weight? What words land hardest? That's called cadence — and Snoop's cadence is one of the most distinctive in rap history.",
      pip: "THE D-O-DOUBLE-G!! He's SPELLING HIS OWN NAME!! And it LANDS ON THE BEAT!! That's not just cool — that's RHYTHMIC GENIUS!! Every letter is a percussion hit!!",
      ember: "Dr. Dre produced this. That means Dre chose every sound, every sample, every drum hit. Snoop wrote the words. They built this together. Production and writing as collaboration — that's how the best rap works.",
      zephyr: "G-funk samples George Clinton's Parliament-Funkadelic recordings from the 1970s. Dre slowed the tempo, deepened the bass, added synthesizers. Musical lineage — this song has grandparents in 1970s Black American funk music.",
      coda: "I was there when G-funk happened. The music world didn't know what to make of it at first. Too slow. Too laid back. Too West Coast. Then everyone tried to copy it for a decade. That's how you know it was real.",
    },
  },
  {
    id: "drop-it-like-its-hot",
    title: "Drop It Like It's Hot",
    artist: "Snoop Dogg ft. Pharrell",
    year: 2004,
    youtubeId: "GtUVQei3nX4",
    watchUrl: "https://www.youtube.com/watch?v=GtUVQei3nX4",
    accentColor: "#ffd166",
    era: "R&G Era — 2004",
    producer: "Pharrell Williams",
    dragons: [
      <Pip key="p" mood="hyper" message="OKAY. OKAY. LISTEN. Do you hear that?? That click sound?? That's not a drum machine. That's not a synth. That's PHARRELL CLICKING HIS TONGUE. He built an entire beat out of mouth sounds and silence. SILENCE IS A PERCUSSION INSTRUMENT IN THIS SONG!! I cannot handle it!!" />,
      <Ember key="e" mood="neutral" message="Eleven years after Gin and Juice. Different producer. Completely different sound. No warm G-funk bass. No funk samples. Just sparse clicks, minimal melody, and space. Lots of space. Pharrell understood something — Snoop's voice is so distinctive that you don't need much around it. The beat serves the voice." />,
    ],
    correct: <Pip mood="delighted" message="The tongue click IS the snare drum. The silence between clicks IS the rhythm. Pharrell stripped the beat down to almost nothing and somehow made it one of the catchiest songs of 2004. And Snoop sounds exactly like Snoop — 11 years later, different producer, completely different sonic world. Still unmistakably him." />,
    lyricSpotlight: {
      lines: ["When the pimp's in the crib ma", "Drop it like it's hot, drop it like it's hot"],
      annotation: "The repetition of 'drop it like it's hot' is a classic hook device — simple, rhythmic, impossible to forget. Snoop understood early that the hook is the architecture. Everything else is decoration."
    },
    prompts: {
      flow: "Compare Snoop's delivery here to Gin and Juice. Same artist, 11 years later. What's the same? What's different?",
      production: "The beat is almost empty — mostly clicks and silence. How does that change how you hear Snoop's voice?",
      era: "This is 2004 — a completely different era of rap. Does it sound different from 1993? In what way?",
      snoop: "Same voice. Same laid-back energy. Different everything else. What makes it still feel like Snoop?",
    },
    hints: {
      solara: "Count the sounds in the beat. There aren't many. Pharrell made a hit record with almost nothing. That restraint is a choice — what does the empty space make you focus on?",
      pip: "CLICK. CLICK CLICK. CLICK. That's IT. That's the WHOLE BEAT basically!! And it's NUMBER ONE!! How is that possible!! Pharrell is a GENIUS!!",
      ember: "Pharrell Williams produced this, not Dre. Two completely different producers, two completely different sounds, same Snoop. That's what a great artist does — they're themselves in any sonic environment.",
      zephyr: "The minimalism here is intentional. In music theory this is called negative space — the silence is as important as the sound. Jazz musicians understood this first. Pharrell applied it to rap in 2004.",
      coda: "Pharrell came to me once — metaphorically speaking — asking about making beats. I told him less is more. He took it further than I expected. Drop It Like It's Hot is proof that a great voice needs room, not decoration.",
    },
  },
  {
    id: "beautiful",
    title: "Beautiful",
    artist: "Snoop Dogg ft. Pharrell",
    year: 2003,
    youtubeId: "_FE194VN6c4",
    watchUrl: "https://www.youtube.com/watch?v=_FE194VN6c4",
    accentColor: "#c77dff",
    era: "R&G Era — 2003",
    producer: "Pharrell Williams",
    dragons: [
      <Zephyr key="z" mood="mysterious" message="Most people only know the party version of Snoop. This is the other version. Slower. More melodic. Minor key — you should recognize that feeling by now. Listen for how his delivery changes when the subject matter changes. The flow adapts to the emotion. That's craft." />,
      <Solara key="s" mood="curious" message="This came out a year before Drop It Like It's Hot — same producer, completely different tone. Pharrell gave Snoop two completely different sonic worlds in one year. And Snoop inhabited both of them perfectly. That's range. Listen for where the melody is — it's more present here than in almost any other Snoop song." />,
    ],
    correct: <Zephyr mood="approving" message="Minor key. Slower tempo. Melodic hook. Snoop leaning into something quieter and more vulnerable than his usual delivery. This is the song that surprised people who thought they knew what Snoop Dogg was. He was always more than one thing. The best artists usually are." />,
    lyricSpotlight: {
      lines: ["I love your smile when you see me comin'", "Your eyes light up, the whole room's humming"],
      annotation: "Snoop shifts from street narrator to romantic observer. The imagery is visual and warm — eyes lighting up, a room humming. This is the same poet who opened Gin and Juice with eight words about Long Beach. Same skills, completely different subject."
    },
    prompts: {
      flow: "Snoop sounds different here — softer, more melodic. Does it surprise you? Does it still sound like him?",
      production: "This is also Pharrell — same producer as Drop It Like It's Hot but a completely different sound. What did Pharrell change?",
      era: "This is the side of Snoop most people don't know. Did you expect this from him based on the other songs?",
      snoop: "Even in a slower, more emotional song — what's still distinctly Snoop about his delivery?",
    },
    hints: {
      solara: "Listen to the key — does it feel major or bright, or minor and bittersweet? You know how to hear this now. What emotion does the key create before a single word is sung?",
      pip: "He's being SO SWEET!! This is SNOOP!! The same guy from Gin and Juice!! He contains MULTITUDES!! I love multitudes!!",
      ember: "The best rappers can do both — hard and soft, loud and quiet, street and vulnerable. This is Snoop proving he's not just one thing. That's what makes a long career. Range.",
      zephyr: "Notice how Pharrell uses more melody here — the instrumental has a melodic line, not just rhythm. That creates space for Snoop to be more melodic himself. Producer and artist in conversation.",
      coda: "This is the song I play when someone tells me rap is just noise. Thirty seconds in and they go quiet. Every genre has its Beautiful. This is Snoop's.",
    },
  },
  {
    id: "young-wild-free",
    title: "Young, Wild & Free",
    artist: "Snoop Dogg & Wiz Khalifa",
    year: 2012,
    youtubeId: "Wa5B22KAkEk",
    watchUrl: "https://www.youtube.com/watch?v=Wa5B22KAkEk",
    accentColor: "#a8dadc",
    era: "Legacy Era — 2012",
    producer: "StarGate / DJ Mustard",
    dragons: [
      <Coda key="c" mood="amused" message="2012. Snoop Dogg is 40 years old. Wiz Khalifa is 24. Watch what happens when a legend collaborates with someone from the next generation — Snoop doesn't try to sound like Wiz, and Wiz doesn't try to sound like Snoop. They each sound completely like themselves, in the same song. That's how generational handoffs work in music." />,
      <Pip key="p" mood="hyper" message="SNOOP AND WIZ!! It's like passing the torch!! Wiz was influenced BY Snoop!! And now they're ON THE SAME SONG!! And Snoop still sounds EXACTLY like Snoop even though everything around him has changed!! The production!! The era!! The slang!! But that VOICE!! Still him!!" />,
    ],
    correct: <Coda mood="proud" message="Nineteen years after Gin and Juice. Four completely different producers. Different eras, different sounds, different collaborators. And through all of it — the same voice. The same laid-back delivery. The same sense that he's exactly where he belongs. That's the long game. Not reinventing yourself. Knowing yourself well enough to survive every reinvention around you." />,
    lyricSpotlight: {
      lines: ["So what we get drunk, so what we smoke weed", "We're just having fun, we don't care who sees"],
      annotation: "Simple, direct, conversational. The hook is built for singing along — short lines, repetition, universal feeling. By 2012 Snoop understood that accessibility IS craft. A hook everyone can sing is harder to write than it looks."
    },
    prompts: {
      flow: "Listen to Snoop, then listen to Wiz. Two different generations of rap. What sounds similar? What sounds different?",
      production: "This is 2012 — almost 20 years after Gin and Juice. How has the production changed? What era does THIS sound like?",
      era: "Snoop is 40 here. Does he sound out of place next to a 24-year-old Wiz Khalifa? Why or why not?",
      snoop: "After four songs across 19 years — what is the one thing that has NEVER changed about Snoop?",
    },
    hints: {
      solara: "Listen for where the melody sits. 2012 rap production had a lighter, more melodic quality than 1993 G-funk. How does Snoop adapt his delivery to fit the new sound without losing himself?",
      pip: "Wiz Khalifa is basically the next generation of Snoop!! Same laid-back energy!! Same California vibe!! You can HEAR the influence!! Snoop inspired Wiz who now stands NEXT to Snoop!! It's a LINEAGE!!",
      ember: "40 years old on a track with a 24-year-old and he doesn't sound out of place. That's not luck — that's decades of knowing exactly who you are. Identity is the longest game in music.",
      zephyr: "The production here is lighter, more melodic than G-funk. But Snoop's cadence — the rhythm of how he places words — is identical to 1993. Cadence is deeper than style. It's identity.",
      coda: "I've watched so many artists try to stay relevant by chasing the sound of whoever is younger and hotter. Most of them disappear. Snoop stayed Snoop. Twenty years later he's still here. That's your lesson.",
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
        className="text-center bg-[#120a1a] border-2 border-[#b5838d33] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="text-6xl mb-4">
          🎤
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#b5838d", textShadow: "0 0 30px #b5838d55" }}>
          The Long Game
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed max-w-md mx-auto">
          One artist. Four songs. Thirty years. Today you&apos;re going to hear how Snoop Dogg stayed Snoop Dogg through every era of rap — and what that teaches us about poetry, production, and identity in music.
        </p>
      </motion.div>

      <Coda mood="warm" message="I want to tell you something before we start. Snoop Dogg is not just a rapper. He's a case study in longevity. Most artists get one era — one sound, one moment. Snoop has had four. Maybe five. Today we're going to listen to why." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-4">🎤 Three Things to Listen For</p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: "📝", color: "#ffd166", label: "Rap as Poetry", desc: "Flow, rhyme schemes, cadence, wordplay. Every line is a choice. Listen for where the words land on the beat — that's called cadence, and Snoop's is one of the most distinctive in history." },
            { icon: "🎛️", color: "#a8dadc", label: "Production", desc: "The beat, the sounds, the instruments. Four songs, four different producers. Listen for how the sound changes around Snoop while his voice stays the same." },
            { icon: "📅", color: "#c77dff", label: "Hip-Hop History", desc: "1993 to 2012. West Coast to everywhere. These four songs are a timeline of how rap evolved — and how one artist navigated all of it." },
          ].map(({ icon, color, label, desc }) => (
            <div key={label} className="flex items-start gap-3 bg-[#0d0500] border border-[#ffffff0a] rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-black mb-1" style={{ color }}>{label}</p>
                <p className="text-[#f8edeb55] text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CliffCard>

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-3">📅 The Timeline</p>
        <div className="space-y-2">
          {SONGS.map((s) => (
            <div key={s.id} className="flex items-center gap-3 bg-[#0d0500] rounded-xl px-4 py-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.accentColor }} />
              <span className="font-black text-xs" style={{ color: s.accentColor }}>{s.year}</span>
              <span className="text-[#f8edeb88] text-xs">{s.title}</span>
              <span className="text-[#ffffff33] text-xs ml-auto">Prod. {s.producer}</span>
            </div>
          ))}
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={onNext}>🎤 Begin The Long Game →</GoldBtn>
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
  const [activeHint, setActiveHint] = useState<"solara"|"pip"|"ember"|"zephyr"|"coda"|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = (response.flowObservation ?? "").trim().length > 0 && (response.productionNotes ?? "").trim().length > 0 && (response.snoop ?? "").trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="inline-block rounded-full px-4 py-1 text-xs font-black tracking-widest uppercase border"
          style={{ borderColor: song.accentColor+"55", color: song.accentColor, background: song.accentColor+"11" }}
        >
          Song {songIndex+1} of {totalSongs}
        </div>
        <div className="inline-block rounded-full px-3 py-1 text-xs font-black border"
          style={{ borderColor: song.accentColor+"44", color: song.accentColor+"99" }}
        >
          📅 {song.era}
        </div>
      </div>

      {song.dragons.map((d, i) => <div key={i}>{d}</div>)}

      <CliffCard>
        <div className="flex items-start gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: song.accentColor+"22", border: `2px solid ${song.accentColor}44` }}
          >
            🎤
          </div>
          <div>
            <p className="text-[#f8edeb] font-black text-lg leading-tight">{song.title}</p>
            <p className="text-sm mt-0.5" style={{ color: song.accentColor }}>{song.artist} · {song.year} · Prod. {song.producer}</p>
          </div>
        </div>
        <div className="mt-4">
          <YouTubePlayer videoId={song.youtubeId} watchUrl={song.watchUrl} color={song.accentColor} />
        </div>
      </CliffCard>

      {/* Lyric spotlight */}
      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: song.accentColor }}>
          📝 Lyric Spotlight
        </p>
        <LyricSpotlight lines={song.lyricSpotlight.lines} annotation={song.lyricSpotlight.annotation} color={song.accentColor} />
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
            🎤 Your Observations — Song {songIndex+1}
          </p>
          <SongResponseForm response={response} onChange={onChange} accentColor={song.accentColor} prompts={song.prompts} />

          <Divider />

          <div>
            <p className="text-[#ffffff33] text-xs font-bold tracking-widest uppercase mb-3">🆘 Ask a dragon</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {(["solara","pip","ember","zephyr","coda"] as const).map((who) => {
                const labels = { solara: "✨ Solara", pip: "🦎 Pip", ember: "🔥 Ember", zephyr: "💜 Zephyr", coda: "🪨 Coda" };
                return (
                  <button key={who} onClick={() => setActiveHint((prev) => prev === who ? null : who)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
                    style={activeHint === who
                      ? { background: "#b5838d22", borderColor: "#b5838d", color: "#b5838d" }
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
                  who={{ solara: "✨ Solara", pip: "🦎 Pip", ember: "🔥 Ember", zephyr: "💜 Zephyr", coda: "🪨 Coda" }[activeHint]}
                  text={song.hints[activeHint]}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mt-6">
            <GoldBtn onClick={() => setSubmitted(true)} disabled={!isComplete}>
              🎤 Submit Observations →
            </GoldBtn>
            {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Answer the flow, production, and Still Snoop? questions to continue</p>}
          </div>
        </CliffCard>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-2">
            <GoldBtn onClick={onNext}>
              {isLast ? "🏆 The Final Question →" : "Next Era →"}
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
    biggestShift: null, mostSnoop: null, reinventionTheme: "", poetryMoment: "",
  });

  const isComplete = answers.biggestShift !== null && answers.mostSnoop !== null && answers.reinventionTheme.trim().length > 0;

  const SongPicker = ({ label, value, onChange }: { label: string; value: number | null; onChange: (i: number) => void }) => (
    <div className="mb-5">
      <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-3">{label}</p>
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
            {s.year} — {s.title}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-[#120a1a] border-2 border-[#b5838d33] rounded-3xl p-8 mb-6"
      >
        <div className="text-5xl mb-3">🎤</div>
        <h2 className="text-2xl font-black tracking-wide mb-2" style={{ color: "#b5838d", textShadow: "0 0 20px #b5838d44" }}>
          The Long Game — Final Question
        </h2>
        <p className="text-[#f8edeb77] text-sm leading-relaxed max-w-sm mx-auto">
          Four songs. Thirty years. One artist. What did you learn?
        </p>
      </motion.div>

      <Coda mood="amused" message="You've now heard Snoop at 21, 31, 32, and 40. Same person. Different worlds. I want to know what YOU think — not what I think. You've been listening carefully. What did you find?" />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-5">🎤 Your Verdict</p>

        <SongPicker label="🔀 Which song sounded most different from the others?" value={answers.biggestShift} onChange={(i) => setAnswers((a) => ({ ...a, biggestShift: i }))} />
        <SongPicker label="🐕 Which song felt most like the Snoop you now know?" value={answers.mostSnoop} onChange={(i) => setAnswers((a) => ({ ...a, mostSnoop: i }))} />

        <div className="mb-5">
          <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-3">
            🔑 Snoop stayed relevant for 30 years. What do you think his secret is?
          </p>
          <textarea value={answers.reinventionTheme} onChange={(e) => setAnswers((a) => ({ ...a, reinventionTheme: e.target.value }))}
            placeholder="Think about what changed and what never changed across all four songs…" rows={3}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#b5838d88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>

        <div>
          <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-1">
            📝 Bonus: Pick your favorite lyric or line from any of the four songs. Why does it work?
          </p>
          <p className="text-[#ffffff33] text-xs mb-3">Optional — but this is the poetry question.</p>
          <textarea value={answers.poetryMoment} onChange={(e) => setAnswers((a) => ({ ...a, poetryMoment: e.target.value }))}
            placeholder="Write the line and tell me why it's good…" rows={2}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#b5838d88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={() => onNext(answers)} disabled={!isComplete}>
          🏅 See What the Dragons Think →
        </GoldBtn>
        {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Answer the first three questions to continue</p>}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// WIN SCENE
// ══════════════════════════════════════════════════════════════
function SceneWin({ compareAnswers, onRestart }: { compareAnswers: CompareAnswers; onRestart: () => void }) {
  const foundPoetry = compareAnswers.poetryMoment.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="text-center bg-[#120a1a] border-2 border-[#b5838d55] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ rotate: [0,8,-8,0], scale: [1,1.1,1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-4">
          🎤
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#b5838d", textShadow: "0 0 30px #b5838d77" }}>
          The Long Game — Complete!
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed">
          1993 to 2012. Four producers. Four eras. One voice.
        </p>
      </motion.div>

      <CliffCard className="border-[#b5838d33]">
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-4">🎤 What You Just Learned</p>

        <div className="bg-[#0d0500] border border-[#95d5b233] rounded-xl p-4 mb-4">
          <p className="text-[#95d5b2] text-xs font-black uppercase tracking-widest mb-2">Rap as Poetry</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            &ldquo;With so much drama in the LBC, it&apos;s kinda hard being Snoop D-O-Double-G.&rdquo; Eight words establish place, identity, and rhythm simultaneously. The spelling of his name is a percussion instrument. Every word placement is a choice. That&apos;s not just writing — that&apos;s poetry.
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4 mb-4">
          <p className="text-[#ffd166] text-xs font-black uppercase tracking-widest mb-2">Production Across Eras</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            Dr. Dre&apos;s G-funk in 1993. Pharrell&apos;s tongue-click minimalism in 2003-2004. The lighter melodic production of 2012. Four completely different sonic worlds — and Snoop inhabited every one of them without losing himself.
          </p>
        </div>

        <div className="bg-[#0d0500] border border-[#c77dff33] rounded-xl p-4">
          <p className="text-[#c77dff] text-xs font-black uppercase tracking-widest mb-2">The Secret to the Long Game</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            He never chased the sound. He let the sound come to him. His voice, his cadence, his laid-back delivery — those never changed. Everything else did. Identity is the foundation. Style is what you build on top of it.
          </p>
        </div>
      </CliffCard>

      <Coda mood="proud" message="You just listened to thirty years of one man's career and found the thread that connects all of it. That thread is his voice — not just the sound of it, but the personality in it. That never changed. That's the long game." />
      <Solara mood="proud" message="You analyzed rap as poetry today. The cadence, the word placement, the way meaning and rhythm work together. That skill works on every kind of writing — not just songs." />
      <Pip mood="delighted" message="THE TONGUE CLICK!! I will never get over the tongue click!! Pharrell built a NUMBER ONE HIT out of MOUTH SOUNDS!! Music is UNBELIEVABLE!!" />
      <Ember mood="satisfied" message="Beautiful surprised you. Good. That's what the best artists do — they show you a side you didn't expect. Never put an artist in a box." />
      <Zephyr mood="approving" message="G-funk to minimalism to melody to collaboration. Four producers. Four sounds. One cadence. You heard it. That's real listening." />
      {foundPoetry && <Coda mood="amused" message="You picked a favorite lyric and explained why it works. That's literary analysis. You just did English class inside a rap lesson. Snoop would appreciate the irony." />}

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-5">📚 What You Discovered Today</p>
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {[
            { val: "4", lbl: "Songs Analyzed" },
            { val: "30", lbl: "Years Covered" },
            { val: "4", lbl: "Producers Studied" },
            { val: foundPoetry ? "✅" : "—", lbl: "Poetry Analysis" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#0d0500] border border-[#b5838d33] rounded-2xl px-5 py-4 text-center">
              <p className="text-[#b5838d] text-2xl font-black">{val}</p>
              <p className="text-[#b5838d99] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
        <Divider />
        {[
          "Rap is poetry — cadence, word placement, and rhythm are as deliberate as in any other poetic form.",
          "Production shapes emotion. G-funk feels different from minimalism feels different from melodic pop rap.",
          "A great artist's identity survives every change in sound around them. The voice is the constant.",
          "Hip-hop evolved dramatically from 1993 to 2012 — in production, in subject matter, in collaboration.",
          "The long game in music isn't reinvention. It's knowing yourself well enough to stay yourself through every reinvention around you.",
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

export default function MusicLesson5() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [responses, setResponses] = useState<Partial<SongResponse>[]>(SONGS.map(() => ({})));
  const [compareAnswers, setCompareAnswers] = useState<CompareAnswers>({ biggestShift: null, mostSnoop: null, reinventionTheme: "", poetryMoment: "" });

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
    setCompareAnswers({ biggestShift: null, mostSnoop: null, reinventionTheme: "", poetryMoment: "" });
  }, []);

  return (
    <main className="min-h-screen text-[#f8edeb] overflow-x-hidden" style={{ background: "#080008" }}>
      <EmbercliffAtmosphere />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b5838d] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#b5838d55] uppercase font-bold mb-1">Dracos Academy · Music · Lesson 5</p>
          <h1 className="text-2xl font-black text-[#b5838d] mb-1 tracking-wide" style={{ textShadow: "0 0 24px #b5838d66" }}>
            🏰 Embercliff — The Long Game
          </h1>
          <p className="text-[#f8edeb44] text-sm italic">Snoop Dogg · Rap as Poetry · Production · Hip-Hop History</p>
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
            {scene === "win" && <SceneWin compareAnswers={compareAnswers} onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b5838d] to-transparent relative z-10 mt-8" />
    </main>
  );
}