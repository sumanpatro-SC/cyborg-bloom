import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Cpu, Network, Eye, Zap } from "lucide-react";

import DigitalRain from "@/components/DigitalRain";
import ParticleField from "@/components/ParticleField";
import CyberCursor from "@/components/CyberCursor";
import cyborgHero from "@/assets/cyborg-hero.png";
import eventSynapse from "@/assets/event-synapse.jpg";
import eventCore from "@/assets/event-core.jpg";
import eventUplink from "@/assets/event-uplink.jpg";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Techfest 2025 | Cyborg Ascent — IIT Bombay" },
      { name: "description", content: "Witness the convergence of biological impulse and synthetic logic at Asia's largest technology festival." },
      { property: "og:title", content: "Techfest 2025 | Cyborg Ascent — IIT Bombay" },
      { property: "og:description", content: "Asia's largest technology festival. Where humanity meets machine." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}

function ScanlineOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.07]">
      <div
        className="w-full h-2 bg-white/30 animate-scanline"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

function EnergyCore() {
  return (
    <div className="relative flex items-center justify-center w-[420px] h-[420px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.32_330/0.25),transparent_60%)] blur-2xl animate-pulse-glow" />
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="hexStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.91 0.15 195)" />
            <stop offset="100%" stopColor="oklch(0.72 0.32 330)" />
          </linearGradient>
        </defs>
        {[90, 75, 60].map((r, i) => (
          <polygon
            key={i}
            points={Array.from({ length: 6 }, (_, k) => {
              const a = (Math.PI / 3) * k - Math.PI / 2;
              return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
            }).join(" ")}
            fill="none"
            stroke="url(#hexStroke)"
            strokeWidth={i === 0 ? 0.6 : 0.9}
            strokeDasharray={i === 1 ? "4 6" : i === 2 ? "2 3" : "none"}
            opacity={0.7}
            style={{
              transformOrigin: "center",
              animation: `spin ${12 + i * 6}s linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (Math.PI / 12) * i;
          const x1 = Math.cos(a) * 95;
          const y1 = Math.sin(a) * 95;
          const x2 = Math.cos(a) * (i % 3 === 0 ? 86 : 91);
          const y2 = Math.sin(a) * (i % 3 === 0 ? 86 : 91);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="oklch(0.91 0.15 195)" strokeWidth={0.6}
              opacity={i % 3 === 0 ? 0.9 : 0.4} />
          );
        })}
        <line x1="-100" y1="0" x2="-50" y2="0" stroke="oklch(0.72 0.32 330)" strokeWidth="0.4" opacity="0.5" />
        <line x1="50" y1="0" x2="100" y2="0" stroke="oklch(0.72 0.32 330)" strokeWidth="0.4" opacity="0.5" />
        <line x1="0" y1="-100" x2="0" y2="-50" stroke="oklch(0.72 0.32 330)" strokeWidth="0.4" opacity="0.5" />
        <line x1="0" y1="50" x2="0" y2="100" stroke="oklch(0.72 0.32 330)" strokeWidth="0.4" opacity="0.5" />
        <polygon
          points={Array.from({ length: 6 }, (_, k) => {
            const a = (Math.PI / 3) * k - Math.PI / 2;
            return `${(Math.cos(a) * 28).toFixed(2)},${(Math.sin(a) * 28).toFixed(2)}`;
          }).join(" ")}
          fill="oklch(0.72 0.32 330 / 0.25)"
          stroke="oklch(0.91 0.15 195)"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.91 0.15 195))" }}
        />
        <circle cx="0" cy="0" r="10" fill="oklch(0.91 0.15 195)">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="4" fill="white" />
      </svg>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[oklch(0.91_0.15_195)]"
          style={{
            boxShadow: "0 0 8px oklch(0.91 0.15 195)",
            transform: `rotate(${i * 60}deg) translateY(-130px)`,
            animation: `pulse-glow ${1.5 + i * 0.2}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CyberNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
        scrolled ? "border-b border-[oklch(0.15_0.01_260/0.3)] bg-[oklch(0.02_0_0/0.9)] backdrop-blur-md" : ""
      }`}
    >
      <div className="font-[Anton] text-2xl tracking-tighter flex items-center gap-2 text-foreground">
        <div className="w-3 h-3 bg-[oklch(0.72_0.32_330)] rounded-full animate-pulse" />
        TECHFEST.25
      </div>
      <div className="hidden md:flex gap-8 font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <a href="#nexus" className="hover:text-[oklch(0.91_0.15_195)] transition-colors">01. Nexus</a>
        <a href="#nodes" className="hover:text-[oklch(0.91_0.15_195)] transition-colors">02. Nodes</a>
        <a href="#matrix" className="hover:text-[oklch(0.91_0.15_195)] transition-colors">03. Matrix</a>
      </div>
      <button className="px-4 py-1.5 border border-[oklch(0.72_0.32_330)] text-[oklch(0.72_0.32_330)] font-[JetBrains_Mono] text-xs hover:bg-[oklch(0.72_0.32_330)] hover:text-[oklch(0.02_0_0)] transition-all duration-300">
        [ REGISTER_CORE ]
      </button>
    </motion.nav>
  );
}

function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block font-[JetBrains_Mono] text-[9px] text-muted-foreground leading-relaxed space-y-4">
        <div className="border-l border-[oklch(0.72_0.32_330/0.4)] pl-3">
          <p>SYSTEM_STATUS: ONLINE</p>
          <p>NEURAL_LOAD: 84.2%</p>
          <p>LATENCY: 4MS</p>
        </div>
        <div className="border-l border-[oklch(0.91_0.15_195/0.4)] pl-3">
          <p>COORDS: 19.1334° N</p>
          <p>LOC: IIT_BOMBAY</p>
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-block px-3 py-1 border border-[oklch(0.91_0.15_195/0.3)] bg-[oklch(0.91_0.15_195/0.05)] mb-6"
        >
          <span className="font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.3em] text-[oklch(0.91_0.15_195)]">
            Techfest 2025 // IIT Bombay
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`font-[Anton] text-7xl md:text-9xl leading-[0.85] tracking-tighter mb-8 select-none uppercase ${
            hovered ? "animate-glitch" : ""
          }`}
        >
          <span className="block">Cyborg</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "1px oklch(0.98 0.005 255)" }}
          >
            Ascent
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-pretty font-light">
            Where humanity meets machine. Step into Asia's largest science &amp; technology festival — engineered for the next evolution of intelligence.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
          className="w-[140%] md:w-[80%] aspect-square rounded-full border border-[oklch(0.72_0.32_330/0.2)] bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden"
        >
          <img
            src={cyborgHero}
            alt="Cyborg neural visualization"
            className="w-full h-full object-cover opacity-80"
            width={1024}
            height={1024}
          />
        </motion.div>
      </div>
    </section>
  );
}

function EventHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      code: "0x01",
      title: "The Synapse",
      desc: "International robotics challenge pushing the limits of autonomous decision making.",
      img: eventSynapse,
      color: "oklch(0.72 0.32 330)",
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      code: "0x02",
      title: "The Core",
      desc: "Competitive programming arena where the fastest logic survives the matrix.",
      img: eventCore,
      color: "oklch(0.91 0.15 195)",
      icon: <Network className="w-5 h-5" />,
    },
    {
      code: "0x03",
      title: "The Uplink",
      desc: "Global keynote summit featuring visionaries at the edge of the singularity.",
      img: eventUplink,
      color: "oklch(0.98 0.005 255)",
      icon: <Eye className="w-5 h-5" />,
    },
  ];

  return (
    <section id="nodes" ref={ref} className="px-6 py-24 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
        >
          <h2 className="font-[Anton] text-5xl uppercase tracking-tighter text-foreground">
            Event_Nodes
          </h2>
          <p className="font-[JetBrains_Mono] text-[10px] text-muted-foreground uppercase tracking-widest max-w-xs">
            [ Sequential Data Transmission: Sector 7 ]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {events.map((event, i) => (
            <motion.div
              key={event.code}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative p-8 border border-border hover:border-[oklch(0.72_0.32_330/0.5)] transition-colors bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 font-[JetBrains_Mono] text-xs" style={{ color: event.color }}>
                {event.code}
              </div>
              <div className="mb-4" style={{ color: event.color }}>
                {event.icon}
              </div>
              <h3 className="font-[Anton] text-2xl uppercase mb-4 group-hover:text-[oklch(0.72_0.32_330)] transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {event.desc}
              </p>
              <div className="w-full aspect-video bg-black/50 overflow-hidden">
                <img
                  src={event.img}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  width={800}
                  height={600}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakersGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const speakers = [
    { name: "Aris Thorne", role: "Neuro-Architect", img: speaker1, color: "oklch(0.72 0.32 330)" },
    { name: "Sarah Chen", role: "Quantum Lead", img: speaker2, color: "oklch(0.91 0.15 195)" },
    { name: "Marcus Vane", role: "Bio-Hacker", img: speaker3, color: "oklch(0.98 0.005 255)" },
    { name: "Elena Voss", role: "Synapse Dev", img: speaker4, color: "oklch(0.72 0.32 330)" },
  ];

  return (
    <section id="nexus" ref={ref} className="px-6 py-24 bg-black border-y border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-[Anton] text-5xl uppercase tracking-tighter mb-2 text-foreground">
            The_Architects
          </h2>
          <p className="font-[JetBrains_Mono] text-[10px] text-muted-foreground uppercase tracking-widest">
            Global visionaries leading the charge into the cybernetic era
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`space-y-4 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
            >
              <div className="aspect-square relative overflow-hidden border" style={{ borderColor: `${speaker.color}33` }}>
                <img
                  src={speaker.img}
                  alt={speaker.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  width={512}
                  height={512}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3">
                  <p className="font-[Anton] text-lg uppercase text-foreground">{speaker.name}</p>
                  <p className="font-[JetBrains_Mono] text-[9px] uppercase tracking-widest" style={{ color: speaker.color }}>
                    {speaker.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnergyCoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="matrix" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-[oklch(0.72_0.32_330/0.3)] animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[oklch(0.91_0.15_195/0.2)] animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <EnergyCore />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="font-[Anton] text-6xl md:text-8xl uppercase mb-8 cursor-default hover:animate-glitch transition-all">
            Ready to Evolve?
          </h2>
          <p className="font-[JetBrains_Mono] text-xs text-muted-foreground mb-12 tracking-widest uppercase">
            Initialization sequence ready. Await input.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-[oklch(0.72_0.32_330)] text-[oklch(0.02_0_0)] font-[Anton] text-xl uppercase tracking-tighter overflow-hidden inline-flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Join the Matrix
              </span>
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </motion.a>
            <a
              href="#"
              className="px-10 py-4 border border-white/20 hover:border-[oklch(0.91_0.15_195)] transition-colors font-[JetBrains_Mono] text-xs flex items-center justify-center uppercase"
            >
              View Schedule
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-[Anton] text-xl tracking-tighter text-foreground">
          IIT BOMBAY // TECHFEST
        </div>
        <div className="flex gap-8 font-[JetBrains_Mono] text-[10px] text-muted-foreground uppercase tracking-widest">
          <span>EST. 1998</span>
          <span>PRIVACY_PROTOCOL</span>
          <span>NODE_MAP</span>
        </div>
        <div className="flex gap-4">
          {["X", "IG", "IN"].map((label) => (
            <div
              key={label}
              className="w-8 h-8 border border-border grid place-items-center hover:border-[oklch(0.72_0.32_330)] transition-colors cursor-pointer font-[JetBrains_Mono] text-xs"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12 font-[JetBrains_Mono] text-[8px] text-muted-foreground/30 uppercase tracking-[0.5em]">
        Designed for the Next Evolution of Intelligence
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground overflow-x-hidden cursor-none">
      <CyberCursor />
      <DigitalRain />
      <ParticleField />
      <ScanlineOverlay />
      <CyberNav />
      <HeroSection />
      <EventHighlights />
      <SpeakersGrid />
      <EnergyCoreSection />
      <Footer />
    </div>
  );
}
