import { Fragment, useEffect, useRef, useState } from "react";
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  Handshake,
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
} from "lucide-react";

import aboutImage from "../assets/about-office.png";

// Tip: download this photo and keep it in /assets so it never breaks.
const WHY_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85";

const reasons = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "We provide clear guidance and dependable support.",
  },
  {
    number: "02",
    icon: Users,
    title: "Client First",
    description: "We understand your needs and offer the right solutions.",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "Complete Support",
    description: "From business setup to visas, we handle the process.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Trusted Partner",
    description: "We build lasting relationships through honest service.",
  },
];

const highlights = [
  { label: "Speciality", value: "Business Setup" },
  { label: "Services", value: "PRO & Visa Services" },
  { label: "Location", value: "Dubai, UAE" },
];

const marqueeItems = [
  "Business Setup",
  "Trade Licensing",
  "Visa Processing",
  "PRO Services",
  "Government Approvals",
];

/* ---------- helpers ---------- */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mouse effects only on devices with a real cursor and no reduced-motion
const canHover = () =>
  !prefersReduced() && window.matchMedia("(hover: hover)").matches;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReduced()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
}

// Image moves slightly slower than the page while scrolling
function useParallax(boxRef, imgRef, amount = 24) {
  useEffect(() => {
    if (prefersReduced()) return;
    let raf;

    const update = () => {
      const box = boxRef.current;
      const img = imgRef.current;
      if (!box || !img) return;
      const rect = box.getBoundingClientRect();
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      img.style.transform = `translate3d(0, ${
        clamp(progress, -1, 1) * -amount
      }px, 0) scale(1.12)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [boxRef, imgRef, amount]);
}

const hiddenFrom = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
};

// Fade and slide in when scrolled into view
function Reveal({ children, delay = 0, from = "up", className = "" }) {
  const [ref, shown] = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hiddenFrom[from]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Heading where every word rises in one by one, accent words shimmer in gold,
// and each word lifts when you hover over it
function DynamicHeading({
  as: Tag = "h2",
  lines,
  accent = [],
  tone = "light",
  className = "",
  delay = 0,
}) {
  const [ref, shown] = useInView(0.25);
  let index = 0;

  const accentClass =
    tone === "dark"
      ? "az-shimmer bg-gradient-to-r from-[#C6A15B] via-[#F0D9A0] to-[#C6A15B] bg-clip-text text-transparent"
      : "az-shimmer bg-gradient-to-r from-[#A67C2E] via-[#D9B56A] to-[#A67C2E] bg-clip-text text-transparent";

  return (
    <Tag ref={ref} aria-label={lines.join(" ")} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex) => {
            const i = index++;
            const isAccent = accent.includes(word);

            return (
              <Fragment key={`${lineIndex}-${wordIndex}`}>
                {wordIndex > 0 && " "}
                <span
                  aria-hidden="true"
                  style={{ transitionDelay: `${delay + i * 70}ms` }}
                  className={`inline-block transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                  }`}
                >
                  <span
                    className={`inline-block transition-transform duration-300 hover:-translate-y-1 ${
                      isAccent ? accentClass : ""
                    }`}
                  >
                    {word}
                  </span>
                </span>
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

// Brand name highlighted inside a sentence
function Brand({ tone = "light" }) {
  return (
    <span
      className={`bg-[linear-gradient(transparent_62%,rgba(198,161,91,0.35)_62%)] font-extrabold ${
        tone === "dark" ? "text-[#E5C985]" : "text-[#8A6420]"
      }`}
    >
      AL ZAJ
    </span>
  );
}

// Card with a soft light that follows the cursor
function SpotlightCard({
  children,
  className = "",
  glow = "rgba(198,161,91,0.16)",
  accentBar = false,
}) {
  const handleMove = (event) => {
    if (!canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 70%)`,
        }}
      />
      {accentBar && (
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-500 group-hover:scale-x-100" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

// Thin gold reading-progress line at the very top of the page
function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={ref}
        className="h-full origin-left bg-[#C6A15B]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

// Round gold badge with spinning "AL ZAJ" text
function RotatingBadge({ className = "" }) {
  return (
    <div
      className={`group relative rounded-full bg-[#C6A15B] shadow-2xl shadow-black/30 ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="az-spin absolute inset-0 h-full w-full group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id="az-badge-circle"
            d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          fontSize="7.8"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#0B1D30"
        >
          <textPath href="#az-badge-circle">
            AL ZAJ • CORPORATE SERVICES • DUBAI • UAE •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-[#0B1D30] text-[#C6A15B] transition-transform duration-300 group-hover:scale-110">
        <Building2 size={26} />
      </div>
    </div>
  );
}

// Gold band with the brand name scrolling past, repeating the services
function Marquee() {
  const Row = ({ duplicate }) => (
    <div
      aria-hidden={duplicate ? "true" : undefined}
      className={`flex shrink-0 items-center ${duplicate ? "az-marquee-dup" : ""}`}
    >
      {marqueeItems.map((item) => (
        <div key={item} className="flex items-center">
          <span className="px-6 text-xl font-black tracking-wide text-[#0B1D30] sm:text-3xl">
            AL ZAJ
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B1D30]/60" />
          <span className="px-6 text-xs font-bold uppercase tracking-[0.22em] text-[#0B1D30]/80 sm:text-sm">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B1D30]/60" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="group relative overflow-hidden bg-[#C6A15B] py-4 sm:py-5">
      <div className="az-marquee flex w-max group-hover:[animation-play-state:paused]">
        <Row />
        <Row duplicate />
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function AboutPage() {
  // Section 1 refs
  const heroGlowRef = useRef(null);
  const watermarkRef = useRef(null);
  const tiltRef = useRef(null);
  const frameRef = useRef(null);
  const glareRef = useRef(null);
  const heroBoxRef = useRef(null);
  const heroImgRef = useRef(null);

  // Section 3 refs
  const whyBoxRef = useRef(null);
  const whyImgRef = useRef(null);

  useParallax(heroBoxRef, heroImgRef, 24);
  useParallax(whyBoxRef, whyImgRef, 24);

  // Big outlined "AL ZAJ" behind the hero slides sideways while scrolling
  useEffect(() => {
    if (prefersReduced()) return;
    let raf;

    const update = () => {
      if (watermarkRef.current)
        watermarkRef.current.style.transform = `translate3d(${
          window.scrollY * -0.18
        }px, 0, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Section 1: gold light that follows the cursor
  const handleHeroMove = (event) => {
    if (!heroGlowRef.current || !canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    heroGlowRef.current.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(198,161,91,0.12), transparent 65%)`;
  };

  // Section 1 image: 3D tilt, glare, frame drifts the other way
  const handleImageMove = (event) => {
    if (!canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1000px) rotateY(${
        x * 6
      }deg) rotateX(${-y * 6}deg)`;
    if (frameRef.current)
      frameRef.current.style.transform = `translate3d(${x * -16}px, ${
        y * -16
      }px, 0)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${
        (x + 0.5) * 100
      }% ${(y + 0.5) * 100}%, rgba(255,255,255,0.22), transparent 55%)`;
    }
  };

  const handleImageLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    if (frameRef.current)
      frameRef.current.style.transform = "translate3d(0, 0, 0)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <main className="overflow-hidden bg-white text-[#1E293B] antialiased selection:bg-[#C6A15B] selection:text-[#0B1D30]">
      <style>{`
        @keyframes az-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes az-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes az-shimmer { to { background-position: 200% center; } }
        @keyframes az-spin { to { transform: rotate(360deg); } }
        @keyframes az-marquee { to { transform: translateX(-50%); } }
        @keyframes az-drift { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(36px, -28px, 0); } }
        .az-rise { opacity: 0; animation: az-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; }
        .az-float { animation: az-float 5s ease-in-out infinite; }
        .az-shimmer { background-size: 200% auto; animation: az-shimmer 5s linear infinite; }
        .az-spin { animation: az-spin 18s linear infinite; }
        .az-marquee { animation: az-marquee 34s linear infinite; }
        .az-drift { animation: az-drift 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .az-rise, .az-float, .az-shimmer, .az-spin, .az-drift { animation: none !important; opacity: 1 !important; transform: none !important; }
          .az-marquee { animation: none !important; width: auto; flex-wrap: wrap; justify-content: center; }
          .az-marquee-dup { display: none; }
        }
      `}</style>

      <ScrollProgress />

      {/* SECTION 1 - ABOUT US */}
      <section
        onMouseMove={handleHeroMove}
        className="relative overflow-hidden bg-[#0B1D30] px-6 pb-24 pt-28 lg:pb-32 lg:pt-36"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#C6A15B]/10 blur-3xl" />
        <div ref={heroGlowRef} className="pointer-events-none absolute inset-0" />

        {/* Giant outlined brand name that slides while you scroll */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 left-0 select-none whitespace-nowrap text-[24vw] font-black leading-none text-transparent will-change-transform"
          style={{ WebkitTextStroke: "1px rgba(198,161,91,0.2)" }}
        >
          AL ZAJ
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="az-rise mb-12 flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-slate-400"
          >
            <a href="/" className="transition hover:text-[#C6A15B]">
              Home
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-[#C6A15B]">About Us</span>
          </nav>

          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* LEFT CONTENT */}
            <div className="text-white lg:col-span-7">
              <div
                className="az-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 px-4 py-1.5"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6A15B] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[2.5px] text-[#E2C275]">
                  About AL ZAJ
                </span>
              </div>

              <DynamicHeading
                as="h1"
                tone="dark"
                lines={["Your Business,", "Our Support."]}
                accent={["Our", "Support."]}
                delay={150}
                className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
              />

              <p
                className="az-rise mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
                style={{ animationDelay: "0.55s" }}
              >
                <Brand tone="dark" /> Corporate Services helps individuals and
                businesses start and manage their companies in Dubai.
              </p>

              <p
                className="az-rise mt-4 max-w-xl text-base leading-relaxed text-slate-400"
                style={{ animationDelay: "0.65s" }}
              >
                We offer business setup, licensing, visa processing, PRO
                services, and government approvals.
              </p>

              {/* BUTTONS */}
              <div
                className="az-rise mt-10 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "0.75s" }}
              >
                <a
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#C6A15B] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1D30] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C6A15B]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {/* shine sweep */}
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
                  <span className="relative">Contact Us</span>
                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="/services"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C6A15B]/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
                >
                  Our Services
                  <ArrowUpRight
                    size={18}
                    className="text-[#C6A15B] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              {/* HIGHLIGHTS */}
              <div
                className="az-rise mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
                style={{ animationDelay: "0.9s" }}
              >
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="border-l-2 border-[#C6A15B]/60 pl-4 transition-all duration-300 hover:border-[#E5C985] hover:pl-5"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="az-rise relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none"
              style={{ animationDelay: "0.35s" }}
              onMouseMove={handleImageMove}
              onMouseLeave={handleImageLeave}
            >
              <div
                ref={frameRef}
                className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-[#C6A15B]/40 transition-transform duration-300 ease-out"
              />

              <div
                ref={tiltRef}
                className="relative transition-transform duration-300 ease-out"
              >
                <div
                  ref={heroBoxRef}
                  className="group relative overflow-hidden rounded-3xl bg-[#102A43] shadow-2xl"
                >
                  <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                    <img
                      ref={heroImgRef}
                      src={aboutImage}
                      alt="AL ZAJ Corporate Services Office"
                      style={{ transform: "scale(1.12)" }}
                      className="h-[420px] w-full object-cover will-change-transform sm:h-[520px]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D30] via-[#0B1D30]/25 to-transparent" />
                  <div
                    ref={glareRef}
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                  />

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="az-float rounded-2xl border border-white/15 bg-[#0B1D30]/85 p-5 backdrop-blur-md">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C6A15B] text-[#0B1D30]">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">
                            AL ZAJ Corporate Services
                          </h3>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-300">
                            <MapPin size={13} className="text-[#C6A15B]" />
                            Dubai, United Arab Emirates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spinning brand badge on the image corner */}
              <RotatingBadge className="absolute -left-4 -top-7 z-10 h-28 w-28 sm:-left-10 sm:-top-10 sm:h-36 sm:w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND BAND */}
      <Marquee />

      {/* SECTION 2 - MISSION & VISION */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        {/* Soft dot pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(11,29,48,0.09) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#A67C2E]">
                Our Purpose
              </span>
            </Reveal>

            <DynamicHeading
              lines={["Mission & Vision"]}
              accent={["Vision"]}
              className="mt-3 text-3xl font-bold tracking-tight text-[#0B1D30] sm:text-4xl lg:text-5xl"
            />

            <Reveal delay={300}>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                What <Brand /> does and where we are headed.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* MISSION */}
            <Reveal from="left">
              <SpotlightCard className="h-full rounded-3xl bg-[#0B1D30] p-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-12">
                <span className="pointer-events-none absolute -bottom-10 right-0 text-9xl font-black text-white/[0.04] transition-transform duration-500 group-hover:-translate-y-2">
                  01
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6A15B] text-[#0B1D30] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Target size={28} />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
                    What We Do
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold sm:text-3xl">
                  Our Mission
                </h3>

                <p className="mt-4 text-base leading-8 text-slate-300">
                  At <Brand tone="dark" />, our mission is to make business
                  setup simple with reliable services and clear guidance for
                  every client.
                </p>

                <div className="mt-8 flex items-center gap-2">
                  <span className="h-1 w-12 rounded-full bg-[#C6A15B] transition-all duration-500 group-hover:w-24" />
                  <span className="h-1 w-2 rounded-full bg-[#C6A15B]/40" />
                </div>
              </SpotlightCard>
            </Reveal>

            {/* VISION */}
            <Reveal from="right" delay={120}>
              <SpotlightCard
                glow="rgba(198,161,91,0.14)"
                className="h-full rounded-3xl border border-slate-200/80 bg-white/90 p-10 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C6A15B]/50 hover:shadow-2xl sm:p-12"
              >
                <span className="pointer-events-none absolute -bottom-10 right-0 text-9xl font-black text-[#0B1D30]/[0.04] transition-transform duration-500 group-hover:-translate-y-2">
                  02
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1D30] text-[#C6A15B] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Eye size={28} />
                  </div>

                  <span className="rounded-full border border-[#0B1D30]/10 bg-slate-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#0B1D30]">
                    Where We&rsquo;re Going
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#0B1D30] sm:text-3xl">
                  Our Vision
                </h3>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  Our vision is for <Brand /> to become a trusted name in
                  corporate services across the UAE.
                </p>

                <div className="mt-8 flex items-center gap-2">
                  <span className="h-1 w-12 rounded-full bg-[#0B1D30] transition-all duration-500 group-hover:w-24 group-hover:bg-[#C6A15B]" />
                  <span className="h-1 w-2 rounded-full bg-slate-300" />
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHY CHOOSE AL ZAJ */}
      <section className="border-t border-slate-100 bg-[#F8FAFC] px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* LEFT IMAGE */}
            <Reveal from="left" className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-32 w-32 rounded-tl-3xl border-l-2 border-t-2 border-[#C6A15B]" />
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-br-3xl border-b-2 border-r-2 border-[#0B1D30]" />

                <div
                  ref={whyBoxRef}
                  className="group relative overflow-hidden rounded-2xl shadow-xl"
                >
                  <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                    <img
                      ref={whyImgRef}
                      src={WHY_IMAGE}
                      alt="Business professionals in a meeting"
                      style={{ transform: "scale(1.12)" }}
                      className="h-[420px] w-full object-cover will-change-transform sm:h-[540px]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D30]/70 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="az-float rounded-xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md">
                    <p className="az-shimmer bg-gradient-to-r from-[#A67C2E] via-[#D9B56A] to-[#A67C2E] bg-clip-text text-3xl font-black tracking-tight text-transparent">
                      AL ZAJ
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B1D30]">
                      Your trusted business support team in Dubai.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[3px] text-[#A67C2E]">
                  Why Choose Us
                </span>
              </Reveal>

              <DynamicHeading
                lines={["Why Choose AL ZAJ?"]}
                accent={["AL", "ZAJ?"]}
                className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0B1D30] sm:text-5xl lg:text-6xl"
              />

              <Reveal delay={400}>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  <Brand /> makes business services easier with simple
                  guidance, quick support, and solutions you can trust.
                </p>
              </Reveal>

              {/* REASONS */}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {reasons.map((reason, i) => {
                  const Icon = reason.icon;

                  return (
                    <Reveal key={reason.number} delay={i * 100}>
                      <SpotlightCard
                        accentBar
                        glow="rgba(198,161,91,0.15)"
                        className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1D30]/5 text-[#0B1D30] transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#0B1D30] group-hover:text-[#C6A15B]">
                            <Icon size={22} />
                          </div>

                          <span className="text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-[#C6A15B]">
                            {reason.number}
                          </span>
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0B1D30]">
                          {reason.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {reason.description}
                        </p>
                      </SpotlightCard>
                    </Reveal>
                  );
                })}
              </div>

              {/* CONTACT BUTTON */}
              <Reveal delay={450}>
                <div className="mt-10">
                  <a
                    href="/contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#0B1D30] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0B1D30] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
                  >
                    {/* gold fill sweeps in from the left */}
                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <span className="relative">Contact Us</span>
                    <ArrowRight
                      size={18}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING BRAND CTA */}
      <section className="relative overflow-hidden bg-[#0B1D30] px-6 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="az-drift pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#C6A15B]/15 blur-3xl" />
        <div
          className="az-drift pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#486581]/30 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[26vw] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(198,161,91,0.14)" }}
        >
          AL ZAJ
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[2.5px] text-[#E2C275]">
              Start with AL ZAJ
            </span>
          </Reveal>

          <DynamicHeading
            tone="dark"
            lines={["Ready to Build Your", "Business with AL ZAJ?"]}
            accent={["AL", "ZAJ?"]}
            className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl"
          />

          <Reveal delay={500}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Tell us what you need and our team will guide you through every
              step.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#C6A15B] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1D30] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C6A15B]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
                <span className="relative">Contact Us</span>
                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="/services"
                className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C6A15B]/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
              >
                Our Services
                <ArrowUpRight
                  size={18}
                  className="text-[#C6A15B] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
