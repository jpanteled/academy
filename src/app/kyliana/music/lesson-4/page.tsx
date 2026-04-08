// src/app/kyliana/music/lesson-4/page.tsx
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

type GenreResponse = {
  originGenre: string;
  crossGenre: string;
  whyCross: string;
  worksOrNot: "yes" | "no" | "complicated";
  worksReason: string;
};

type CompareAnswers = {
  boldestCross: number | null;
  mostNatural: number | null;
  outsiderTheme: string;
  ownTake: string;
};

// ══════════════════════════════════════════════════════════════
// CHARACTER COMPONENTS
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
          <filter id="glow4">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M0 200 Q 80 180 60 350 Q 40 500 120 600 Q 160 650 80 800" stroke="#ffd16688" strokeWidth="1.5" fill="none" filter="url(#glow4)" />
        <path d="M1100 150 Q 980 200 1000 380 Q 1020 520 920 650" stroke="#b5838d77" strokeWidth="1.5" fill="none" filter="url(#glow4)" />
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
        <span className="text-xs tracking-widest text-[#b5838d99] uppercase font-bold">Lesson Progress</span>
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

function Chip({ label, selected, onClick, color = "#b5838d" }: {
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

function YouTubePlayer({ videoId, watchUrl, color }: { videoId: string; watchUrl: string; color: string }) {
  const [embedFailed, setEmbedFailed] = useState(false);

  return (
    <div className="mb-5">
      {!embedFailed ? (
        <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: color+"55" }}>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title="Music player"
              onError={() => setEmbedFailed(true)}
            />
          </div>
        </div>
      ) : null}
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
// GENRE RESPONSE FORM
// ══════════════════════════════════════════════════════════════
const GENRE_OPTIONS = ["Folk / Traditional", "Country", "Rock", "Pop", "Rap / Hip-Hop", "R&B / Soul", "Electronic", "Classical", "Sea Shanty", "Other"];

function GenreResponseForm({ response, onChange, accentColor }: {
  response: Partial<GenreResponse>;
  onChange: (r: Partial<GenreResponse>) => void;
  accentColor: string;
}) {
  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎸 What genre does this artist originally come from?
        </p>
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((g) => (
            <Chip key={g} label={g} color={accentColor} selected={response.originGenre === g} onClick={() => onChange({ ...response, originGenre: g })} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🔀 What genre is this song crossing into?
        </p>
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((g) => (
            <Chip key={g} label={g} color={accentColor} selected={response.crossGenre === g} onClick={() => onChange({ ...response, crossGenre: g })} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🤔 Does the genre cross work? Does it feel natural or forced?
        </p>
        <div className="flex gap-3 flex-wrap">
          {([["yes","✅","Yes — it works"], ["no","❌","No — it feels off"], ["complicated","🤷","It's complicated"]] as const).map(([v, emoji, label]) => (
            <motion.button key={v} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...response, worksOrNot: v })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer"
              style={response.worksOrNot === v
                ? { background: accentColor+"22", borderColor: accentColor, color: accentColor }
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
          💭 Why do you think this artist crossed genres? What were they going for?
        </p>
        <textarea value={response.whyCross ?? ""} onChange={(e) => onChange({ ...response, whyCross: e.target.value })}
          placeholder="Think about what the artist was trying to say or do with this song…" rows={3}
          className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
          onFocus={(e) => (e.target.style.borderColor = accentColor+"88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
        />
      </div>

      <div>
        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: accentColor }}>
          🎯 What specific moment in the song made you feel the genre cross most clearly?
        </p>
        <textarea value={response.worksReason ?? ""} onChange={(e) => onChange({ ...response, worksReason: e.target.value })}
          placeholder="Describe the moment — a lyric, an instrument, a beat drop, a melody…" rows={2}
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
  id: string; title: string; artist: string; youtubeId: string; watchUrl: string;
  accentColor: string; originGenre: string; crossGenre: string;
  dragons: React.ReactNode[];
  correct: React.ReactNode;
  hints: { solara: string; pip: string; ember: string; zephyr: string; coda: string };
};

const SONGS: SongConfig[] = [
  {
    id: "wellerman",
    title: "Wellerman",
    artist: "Nathan Evans",
    youtubeId: "bNQSMTNSnUw",
    watchUrl: "https://www.youtube.com/watch?v=bNQSMTNSnUw",
    accentColor: "#a8dadc",
    originGenre: "Folk / Traditional",
    crossGenre: "Pop",
    dragons: [
      <Solara key="s" mood="warm" message="Nathan Evans is a postman from Scotland. In 2021 he posted a sea shanty on TikTok — a song sailors sang together on ships 200 years ago — and suddenly millions of people were singing along. This is folk music crossing into the internet age. Listen for what makes it feel ancient and modern at the same time." />,
      <Zephyr key="z" mood="mysterious" message="Sea shanties were work songs. Sailors sang them to coordinate rowing, pulling ropes, hauling cargo. The call-and-response structure — one voice calls, the group responds — is built into the genre. Notice if you can feel that structure even when only one person is singing." />,
    ],
    correct: <Solara mood="proud" message="A 200-year-old sailor song went viral on TikTok because Nathan Evans understood something important — the call-and-response structure of a shanty is the same as a chorus hook in pop music. Same instinct. Different century. That's what cross-genre does when it works — it finds what's universal." />,
    hints: {
      solara: "Imagine you're on a ship hauling a heavy rope. The song has a rhythm built for physical work — that's why it feels so satisfying to clap or stomp along. That's not pop music. That's something older.",
      pip: "WELLERMAN!! SOON MAY THE WELLERMAN COME!! I can't stop singing it!! That's what a GOOD HOOK does!! It gets stuck in your head whether it's from 1820 or 2021!!",
      ember: "Sea shanties don't have guitar solos or drum kits. They're just voice and rhythm. Strip a pop song down to just voice and rhythm and you'd have something similar. The bones are the same.",
      zephyr: "The Wellerman was a supply ship. The song is literally about waiting for provisions. But Evans sings it like an anthem. That recontextualization — taking something mundane and making it feel epic — is a cross-genre move.",
      coda: "I've heard a lot of songs come and go. This one surprised me. Not because it's new — it's ancient. Because it reminded everyone that some things don't need to be reinvented to feel fresh. They just need to be found again.",
    },
  },
  {
    id: "wagon-wheel",
    title: "Wagon Wheel",
    artist: "Darius Rucker",
    youtubeId: "wjzYh36uMds",
    watchUrl: "https://www.youtube.com/watch?v=wjzYh36uMds",
    accentColor: "#ff9f43",
    originGenre: "Rock",
    crossGenre: "Country",
    dragons: [
      <Ember key="e" mood="dramatic" message="Darius Rucker was the frontman of Hootie and the Blowfish. A rock band. A successful rock band. Then he walked into a Nashville recording studio and made a country album. The rock world was confused. The country world was suspicious. And then Wagon Wheel became one of the biggest country hits of the decade." />,
      <Zephyr key="z" mood="snooty" message="I will say this — he didn't pretend to be something he wasn't. He brought his voice, which is unmistakably soulful and rooted in R&B, into a country song. The cross-genre wasn't a costume. It was genuine. That's the difference between a successful genre cross and a calculated one." />,
    ],
    correct: <Ember mood="satisfied" message="Darius Rucker didn't abandon rock. He expanded. His voice carries decades of soul and R&B — you can hear it in every note of Wagon Wheel. Country gave him a new frame. His voice filled it with something it didn't quite have before. That's what the best genre crosses do — they give both genres something." />,
    hints: {
      solara: "Listen to his voice specifically. Does it sound like a typical country singer? What's different about it? Where does that difference come from?",
      pip: "It sounds like country but his VOICE sounds like SOUL!! Like R&B!! Like something warmer and deeper than you usually hear in country!! That's Hootie coming through!!",
      ember: "The instrumentation is pure country — acoustic guitar, fiddle, that open road feeling. But the soul in his voice turns it into something that neither genre owns completely. It belongs to both.",
      zephyr: "Originally written by OCMS — Old Crow Medicine Show — with a fragment from Bob Dylan. Rucker's version outsold the original by orders of magnitude. Not because it was better necessarily. Because his voice gave it a new emotional register.",
      coda: "I remember when Nashville didn't know what to do with him. Didn't fit the mold. Too soulful. Too rock. Ended up winning a CMA. Genre gatekeeping is almost always wrong in the end.",
    },
  },
  {
    id: "rockstar",
    title: "Rockstar",
    artist: "Post Malone ft. 21 Savage",
    youtubeId: "LLKbtcwS6Ys",
    watchUrl: "https://www.youtube.com/watch?v=LLKbtcwS6Ys",
    accentColor: "#c77dff",
    dragons: [
      <Ember key="e" mood="fired_up" message="Post Malone named this song Rockstar. A rap song. Called Rockstar. That's not an accident — he's telling you exactly what he's doing. He's taking the attitude, the identity, the mythology of rock stardom and putting it inside a rap song. Listen for where you hear rock and where you hear rap." />,
      <Pip key="p" mood="hyper" message="POST MALONE IS DOING EVERYTHING AT ONCE!! Rap lyrics!! Rock attitude!! Pop melody in the chorus!! Country influences elsewhere!! He doesn't pick a lane!! He just drives wherever he wants!! THAT'S THE WHOLE POINT!!" />,
    ],
    correct: <Pip mood="delighted" message="Post Malone is one of the most genre-fluid artists alive right now. Rockstar works because he's not pretending to be a rock star — he actually IS one, just one who came up through rap. The genre cross isn't a costume. It's his actual identity. When it's real, you can hear it." />,
    hints: {
      solara: "Listen to the chorus — does it sound like rap or something else? Then listen to the verses. How do they feel different from the chorus? That switch IS the genre cross.",
      pip: "The GUITAR in the background!! A rock guitar riff underneath a rap song!! That's the cross!! That's what makes it feel different from regular rap!!",
      ember: "He called it Rockstar because he means it literally. Rock music is an attitude as much as a genre. Post Malone took the attitude and put it in a rap song. Attitude crosses genres easier than instrumentation does.",
      zephyr: "Notice how the production sits — the beat has hip-hop timing but the guitar tones are rock. Two rhythmic worlds coexisting. Neither one compromises. That's sophisticated production.",
      coda: "I've watched genres fight each other for centuries. Rock versus jazz. Country versus rock. Rap versus everything. Post Malone just… ignored all of it. Sometimes that's the only sane response.",
    },
    originGenre: "Rap / Hip-Hop",
    crossGenre: "Rock",
  },
  {
    id: "old-town-road",
    title: "Old Town Road",
    artist: "Lil Nas X",
    youtubeId: "r7qovpFAGrQ",
    watchUrl: "https://www.youtube.com/watch?v=r7qovpFAGrQ",
    accentColor: "#ffd166",
    originGenre: "Rap / Hip-Hop",
    crossGenre: "Country",
    dragons: [
      <Coda key="c" mood="amused" message="I want to tell you something about this song before you listen. Billboard removed it from the country charts in 2019 because they said it wasn't country enough. It then went on to break the record for longest-running number one on the Hot 100. The gatekeepers were wrong. They often are." />,
      <Solara key="s" mood="curious" message="Listen carefully. You'll hear banjo — a country instrument. You'll hear trap beats — a rap production style. You'll hear cowboy imagery in the lyrics. Lil Nas X didn't accidentally make a country-rap song. He did it on purpose, knowing exactly what both genres sound like and what would happen when you mixed them." />,
      <Ember key="e" mood="dramatic" message="Billy Ray Cyrus joined this song after Lil Nas X was removed from the country charts. A country legend stepping in to say — this belongs here too. That collaboration is a statement. When genre gatekeepers say no, sometimes the artists answer by teaming up." />,
      <Zephyr key="z" mood="approving" message="What Lil Nas X understood is that country and rap have more in common than either fanbase wanted to admit. Both are rooted in storytelling. Both emerged from working-class experience. Both use imagery of place and identity. The genre cross wasn't random — it was historically informed." />,
    ],
    correct: <Coda mood="proud" message="Old Town Road broke the genre classification system — and that was the point. Lil Nas X knew exactly what he was doing. He found the overlap between country and rap that had always been there, made it undeniable, and let the industry argue about it while he sat at number one for nineteen weeks. Sometimes the best genre cross is the one that makes the argument for you." />,
    hints: {
      solara: "Count the genre elements — list everything you hear that sounds country, and everything that sounds like rap or hip-hop. The song works because both lists are long.",
      pip: "BANJO!! TRAP BEAT!! COWBOY HAT!! HORSES!! It's ALL OF THEM AT ONCE!! How is that possible!! It shouldn't work and it COMPLETELY WORKS!!",
      ember: "Billy Ray Cyrus on a Lil Nas X song is the most unlikely collaboration of the decade. And it's perfect. Because both of them are outsiders in their own way. Outsiders recognize each other.",
      zephyr: "The banjo sample comes from a Nine Inch Nails adjacent producer. So there's also industrial rock in the DNA. Country, rap, and industrial rock. Lil Nas X didn't just cross two genres. He triangulated three.",
      coda: "Billboard said it wasn't country enough. I've been listening to music for a very long time. The things that get called 'not real' are usually just new. New always makes the old uncomfortable.",
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
          🎸
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#b5838d", textShadow: "0 0 30px #b5838d55" }}>
          No Genre Is An Island
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed max-w-md mx-auto">
          Four artists. Four genre crossings. One question: what happens when a musician refuses to stay in their lane?
        </p>
      </motion.div>

      <Coda mood="warm" message="I'm Coda. I live in the oldest part of Embercliff — the Ancient Stage, where dragons have been playing music since before any of these genres had names. I've watched folk become rock, rock become pop, rap become everything. Today I'm going to show you four artists who crossed genre lines — and what happened when they did." />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-4">🎸 What Is a Genre Cross?</p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: "🗺️", label: "Genre as Territory", desc: "Every genre has its own sounds, instruments, rhythms, and history. Country has steel guitars and storytelling. Rap has beats and bars. Rock has electric guitars and attitude." },
            { icon: "🚪", label: "Crossing the Line", desc: "A genre cross happens when an artist takes elements from one genre and puts them into another. Sometimes it's deliberate. Sometimes it's just who they are." },
            { icon: "⚠️", label: "The Risk", desc: "Genre crosses make people uncomfortable. Fans of both genres may reject the artist. Critics may say it doesn't belong. It takes courage — or stubbornness." },
            { icon: "✨", label: "When It Works", desc: "The best genre crosses find what two genres secretly have in common. They don't force genres together — they reveal that the border was never real to begin with." },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 bg-[#0d0500] border border-[#ffffff0a] rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-black mb-1" style={{ color: "#b5838d" }}>{label}</p>
                <p className="text-[#f8edeb55] text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CliffCard>

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-3">🐉 Today&apos;s Dragon Team-Ups</p>
        <div className="space-y-2 text-[#f8edeb66] text-sm">
          <p>🎵 <span className="text-[#a8dadc] font-black">Wellerman</span> — Solara + Zephyr debate folk vs pop</p>
          <p>🎵 <span className="text-[#ff9f43] font-black">Wagon Wheel</span> — Ember + Zephyr argue about rock crossing into country</p>
          <p>🎵 <span className="text-[#c77dff] font-black">Rockstar</span> — Ember + Pip lose their minds over Post Malone</p>
          <p>🎵 <span className="text-[#ffd166] font-black">Old Town Road</span> — All four dragons plus Coda weigh in</p>
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={onNext}>🎸 Begin No Genre Is An Island →</GoldBtn>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// SONG SCENE
// ══════════════════════════════════════════════════════════════
function SongScene({ song, songIndex, totalSongs, response, onChange, onNext, isLast }: {
  song: SongConfig; songIndex: number; totalSongs: number;
  response: Partial<GenreResponse>; onChange: (r: Partial<GenreResponse>) => void;
  onNext: () => void; isLast: boolean;
}) {
  const [activeHint, setActiveHint] = useState<"solara"|"pip"|"ember"|"zephyr"|"coda"|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = !!response.originGenre && !!response.crossGenre && !!response.worksOrNot && (response.whyCross ?? "").trim().length > 0;

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
          🔀 {song.originGenre} → {song.crossGenre}
        </div>
      </div>

      {song.dragons.map((d, i) => <div key={i}>{d}</div>)}

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
        <YouTubePlayer videoId={song.youtubeId} watchUrl={song.watchUrl} color={song.accentColor} />
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
            🔀 Your Genre Analysis — Song {songIndex+1}
          </p>
          <GenreResponseForm response={response} onChange={onChange} accentColor={song.accentColor} />

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
              🔀 Submit Analysis →
            </GoldBtn>
            {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Answer all questions to continue</p>}
          </div>
        </CliffCard>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-2">
            <GoldBtn onClick={onNext}>
              {isLast ? "🕵️ The Big Question →" : "Next Song →"}
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
    boldestCross: null, mostNatural: null, outsiderTheme: "", ownTake: "",
  });

  const isComplete = answers.boldestCross !== null && answers.mostNatural !== null && answers.outsiderTheme.trim().length > 0;

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
            {s.artist}
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
        <div className="text-5xl mb-3">🔀</div>
        <h2 className="text-2xl font-black tracking-wide mb-2" style={{ color: "#b5838d", textShadow: "0 0 20px #b5838d44" }}>
          The Big Question
        </h2>
        <p className="text-[#f8edeb77] text-sm leading-relaxed max-w-sm mx-auto">
          Four artists crossed genre lines. Now you decide what it means.
        </p>
      </motion.div>

      <Coda mood="amused" message="You've heard all four. Now I want your opinion — not the right answer, YOUR answer. Which cross was the boldest? Which felt most natural? And what do these four artists have in common that made them willing to cross in the first place?" />

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-5">🔀 Your Verdict</p>

        <SongPicker label="💥 Which genre cross was the boldest?" value={answers.boldestCross} onChange={(i) => setAnswers((a) => ({ ...a, boldestCross: i }))} />
        <SongPicker label="🌊 Which genre cross felt the most natural?" value={answers.mostNatural} onChange={(i) => setAnswers((a) => ({ ...a, mostNatural: i }))} />

        <div className="mb-6">
          <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-3">
            🕵️ What do all four artists have in common? What made them willing to cross genre lines?
          </p>
          <textarea value={answers.outsiderTheme} onChange={(e) => setAnswers((a) => ({ ...a, outsiderTheme: e.target.value }))}
            placeholder="Think about who they are, where they came from, what they were trying to do…" rows={3}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#b5838d88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>

        <div>
          <p className="text-xs font-black tracking-widest uppercase text-[#b5838d99] mb-1">
            💭 Bonus: Do YOU think genre labels are useful or do they get in the way?
          </p>
          <p className="text-[#ffffff33] text-xs mb-3">Optional — but Coda wants to know what you think.</p>
          <textarea value={answers.ownTake} onChange={(e) => setAnswers((a) => ({ ...a, ownTake: e.target.value }))}
            placeholder="Your honest opinion…" rows={2}
            className="w-full bg-[#0d0500] border border-[#ffffff22] rounded-xl px-4 py-3 text-[#f8edeb] text-sm leading-relaxed outline-none resize-none placeholder-[#ffffff33] transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "#b5838d88")} onBlur={(e) => (e.target.style.borderColor = "#ffffff22")}
          />
        </div>
      </CliffCard>

      <div className="text-center">
        <GoldBtn onClick={() => onNext(answers)} disabled={!isComplete}>
          🏅 See What the Dragons Think →
        </GoldBtn>
        {!isComplete && <p className="text-[#ffffff33] text-xs mt-3">Pick your answers and explain the common thread</p>}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// WIN SCENE
// ══════════════════════════════════════════════════════════════
function SceneWin({ compareAnswers, onRestart }: { compareAnswers: CompareAnswers; onRestart: () => void }) {
  const sharedOpinion = compareAnswers.ownTake.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="text-center bg-[#120a1a] border-2 border-[#b5838d55] rounded-3xl p-10 mb-6"
      >
        <motion.div animate={{ rotate: [0,8,-8,0], scale: [1,1.1,1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-4">
          🎸
        </motion.div>
        <h2 className="text-3xl font-black tracking-wide mb-3" style={{ color: "#b5838d", textShadow: "0 0 30px #b5838d77" }}>
          No Genre Is An Island — Complete!
        </h2>
        <p className="text-[#f8edeb88] text-base leading-relaxed">
          Four artists. Four crossings. One lesson about where music actually lives.
        </p>
      </motion.div>

      <CliffCard className="border-[#b5838d33]">
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-4">🔀 The Hidden Thread</p>
        <div className="bg-[#0d0500] border border-[#b5838d33] rounded-xl p-4 mb-4">
          <p className="text-[#b5838d] text-xs font-black uppercase tracking-widest mb-2">What They All Have In Common</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            All four artists were outsiders to the genre they crossed into. Nathan Evans was a postman, not a pop star. Darius Rucker was a rock musician walking into Nashville. Post Malone brought rap identity into rock mythology. Lil Nas X was a Black artist entering a genre with a complicated racial history. None of them had permission. They did it anyway.
          </p>
        </div>
        <div className="bg-[#0d0500] border border-[#ffd16633] rounded-xl p-4">
          <p className="text-[#ffd166] text-xs font-black uppercase tracking-widest mb-2">Why It Worked</p>
          <p className="text-[#f8edeb] text-sm leading-relaxed">
            Because they were genuine. The cross came from who they actually are, not what they thought would sell. Authenticity travels across genre lines. Calculation usually doesn&apos;t.
          </p>
        </div>
      </CliffCard>

      <Coda mood="proud" message="You listened to a 200-year-old sea shanty, a rock musician's country record, a rap song called Rockstar, and a song that broke Billboard. What they share isn't genre — it's courage. The courage to be exactly who you are in a room that wasn't built for you." />
      <Solara mood="proud" message="Nathan Evans found something universal in something ancient. That's what folk music has always done — carry old truth into new hands." />
      <Ember mood="satisfied" message="Darius Rucker walked into Nashville as a rock singer and walked out a country star. He didn't change. The room expanded. That's the right way for it to go." />
      <Pip mood="delighted" message="POST MALONE!! LIL NAS X!! THEY JUST DID WHAT THEY WANTED AND IT WORKED!! Genre is fake!! Music is real!! I've learned so much today!!" />
      <Zephyr mood="approving" message="Lil Nas X understood something most critics missed — country and rap were never that different. Both are rooted in place, identity, and working-class experience. The border was always artificial." />
      {sharedOpinion && <Coda mood="amused" message="You shared your opinion on genre labels. Good. Keep that opinion. Revise it as you hear more music. That's how a music mind develops — not by finding the right answer, but by keeping the question alive." />}

      <CliffCard>
        <p className="text-xs font-black tracking-widest uppercase text-[#b5838d] mb-5">📚 What You Discovered Today</p>
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {[
            { val: "4", lbl: "Genre Crosses Analyzed" },
            { val: "5", lbl: "Dragons Consulted" },
            { val: "8+", lbl: "Genres Encountered" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-[#0d0500] border border-[#b5838d33] rounded-2xl px-5 py-4 text-center">
              <p className="text-[#b5838d] text-2xl font-black">{val}</p>
              <p className="text-[#b5838d99] text-xs font-bold tracking-wide mt-1">{lbl}</p>
            </div>
          ))}
        </div>
        <Divider />
        {[
          "Genre is a useful map, but the music exists before the map does.",
          "The best genre crosses aren't calculated — they're authentic. They reveal what two genres secretly share.",
          "Outsiders often make the most interesting genre crosses because they have nothing to protect.",
          "Authenticity travels across genre lines. Calculation usually doesn't.",
          "Every genre that exists today was once a genre cross that someone said didn't belong.",
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

export default function MusicLesson4() {
  const [scene, setScene] = useState<SceneId>("intro");
  const [responses, setResponses] = useState<Partial<GenreResponse>[]>(SONGS.map(() => ({})));
  const [compareAnswers, setCompareAnswers] = useState<CompareAnswers>({ boldestCross: null, mostNatural: null, outsiderTheme: "", ownTake: "" });

  const TOTAL_SCENES = 1 + SONGS.length + 2;
  const sceneIndex = (): number => {
    if (scene === "intro") return 1;
    if (scene === "compare") return SONGS.length + 2;
    if (scene === "win") return TOTAL_SCENES;
    return parseInt(scene.split("-")[1]) + 2;
  };

  const updateResponse = (i: number, r: Partial<GenreResponse>) => {
    setResponses((prev) => { const next = [...prev]; next[i] = r; return next; });
  };

  const handleCompare = (a: CompareAnswers) => {
    setCompareAnswers(a);
    setScene("win");
  };

  const restart = useCallback(() => {
    setScene("intro");
    setResponses(SONGS.map(() => ({})));
    setCompareAnswers({ boldestCross: null, mostNatural: null, outsiderTheme: "", ownTake: "" });
  }, []);

  return (
    <main className="min-h-screen text-[#f8edeb] overflow-x-hidden" style={{ background: "#080008" }}>
      <EmbercliffAtmosphere />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b5838d] to-transparent relative z-10" />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-xs tracking-widest text-[#b5838d55] uppercase font-bold mb-1">Dracos Academy · Music · Lesson 4</p>
          <h1 className="text-2xl font-black text-[#b5838d] mb-1 tracking-wide" style={{ textShadow: "0 0 24px #b5838d66" }}>
            🏰 Embercliff — No Genre Is An Island
          </h1>
          <p className="text-[#f8edeb44] text-sm italic">Cross-Genre · Artist Identity · When Rules Break Down</p>
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