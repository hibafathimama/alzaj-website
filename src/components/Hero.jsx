import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, ChevronDown } from "lucide-react";

const IMAGE =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85";

/* ---------- helpers ---------- */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mouse effects only on devices with a real cursor and no reduced-motion
const canHover = () =>
  !prefersReduced() && window.matchMedia("(hover: hover)").matches;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Heading where every word rises in one by one, accent words shimmer in gold,
// and each word lifts when you hover over it
function DynamicHeading({ lines, accent = [], delay = 0, className = "" }) {
  const [shown, setShown] = useState(false);
  let index = 0;

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1 aria-label={lines.join(" ")} className={className}>
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
                  style={{ transitionDelay: `${delay + i * 80}ms` }}
                  className={`inline-block transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  <span
                    className={`inline-block transition-transform duration-300 hover:-translate-y-1 ${
                      isAccent
                        ? "hero-shimmer bg-gradient-to-r from-[#C6A15B] via-[#F0D9A0] to-[#C6A15B] bg-clip-text text-transparent"
                        : ""
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
    </h1>
  );
}

// Brand name highlighted inside a sentence
function Brand() {
  return (
    <span className="bg-[linear-gradient(transparent_62%,rgba(198,161,91,0.4)_62%)] font-extrabold text-[#F0D9A0]">
      AL ZAJ
    </span>
  );
}

// Round gold badge with spinning brand text; links to the About section
function RotatingBadge({ className = "" }) {
  return (
    <a
      href="#about"
      aria-label="About AL ZAJ Corporate Services"
      className={`group relative rounded-full bg-[#C6A15B] shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="hero-spin absolute inset-0 h-full w-full group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id="hero-badge-circle"
            d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          fontSize="7.8"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#102A43"
        >
          <textPath href="#hero-badge-circle">
            AL ZAJ • CORPORATE SERVICES • DUBAI • UAE •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-[#102A43] text-[#C6A15B]">
        <Building2 size={26} />
      </div>
    </a>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const watermarkRef = useRef(null);
  const glowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  // One place that positions everything that reacts to scroll or mouse
  const apply = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;

    if (bgRef.current)
      bgRef.current.style.transform = `translate3d(${mouse.current.x * -16}px, ${
        mouse.current.y * -16 + y * 0.3
      }px, 0)`;

    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      contentRef.current.style.opacity = String(clamp(1 - y / (vh * 0.75)));
    }

    if (watermarkRef.current)
      watermarkRef.current.style.transform = `translate3d(${y * -0.2}px, 0, 0)`;
  };

  const schedule = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(apply);
  };

  // Scroll: background and big brand text move at different speeds,
  // and the content fades away as you leave the hero
  useEffect(() => {
    if (prefersReduced()) return;
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse: photo drifts opposite to the cursor, gold light follows it
  const handleMouseMove = (event) => {
    if (!canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    mouse.current = { x: px / rect.width - 0.5, y: py / rect.height - 0.5 };

    if (glowRef.current)
      glowRef.current.style.background = `radial-gradient(520px circle at ${px}px ${py}px, rgba(198,161,91,0.16), transparent 65%)`;

    schedule();
  };

  // Magnetic primary button
  const handleMagnet = (event) => {
    if (!canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    event.currentTarget.style.transform = `translate(${dx * 0.18}px, ${
      dy * 0.28
    }px)`;
  };
  const resetMagnet = (event) => {
    event.currentTarget.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#102A43] pt-20"
    >
      <style>{`
        @keyframes hero-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes hero-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes hero-shimmer { to { background-position: 200% center; } }
        @keyframes hero-spin { to { transform: rotate(360deg); } }
        .hero-rise { opacity: 0; animation: hero-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; }
        .hero-zoom { animation: hero-zoom 22s ease-in-out infinite alternate; }
        .hero-bounce { animation: hero-bounce 1.8s ease-in-out infinite; }
        .hero-shimmer { background-size: 200% auto; animation: hero-shimmer 5s linear infinite; }
        .hero-spin { animation: hero-spin 18s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-zoom, .hero-bounce, .hero-shimmer, .hero-spin { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Background photo: scroll + mouse parallax wrapper, slow zoom inside */}
      <div
        ref={bgRef}
        className="absolute -inset-[4%] will-change-transform"
      >
        <div
          className="hero-zoom h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${IMAGE}')` }}
        />
      </div>

      {/* Overlays: dark on the text side, clear on the right so the photo shows */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/90 via-[#102A43]/60 to-[#102A43]/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#102A43]/70 to-transparent" />
      <div ref={glowRef} className="pointer-events-none absolute inset-0" />

      {/* Giant outlined brand name that slides while you scroll */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap text-[24vw] font-black leading-none text-transparent will-change-transform"
        style={{ WebkitTextStroke: "1px rgba(198,161,91,0.28)" }}
      >
        AL ZAJ
      </div>

      {/* Content: brand pill, headline, one line, two actions */}
      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-7xl px-6 will-change-transform lg:px-10"
      >
        <div className="max-w-3xl">
          <div
            className="hero-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C6A15B]/40 bg-[#102A43]/50 px-4 py-1.5 backdrop-blur-sm"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6A15B] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C6A15B]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F0D9A0] sm:text-sm">
              AL ZAJ Corporate Services
            </span>
          </div>

          <DynamicHeading
            lines={["Build Your Business", "Dreams in Dubai"]}
            accent={["Dubai"]}
            delay={150}
            className="text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-[4.25rem]"
          />

          <p
            className="hero-rise mt-6 text-lg text-gray-200 md:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            <Brand />, your trusted corporate partner in the UAE.
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "0.85s" }}
          >
            <a
              href="#services"
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md bg-[#C6A15B] px-7 py-4 font-semibold text-[#102A43] shadow-lg shadow-black/20 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-xl hover:shadow-[#C6A15B]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {/* shine sweep */}
              <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/45 transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
              <span className="relative">Explore Our Services</span>
              <ArrowRight
                size={20}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="group relative py-1 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
            >
              Contact Us
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-white/40" />
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>

      {/* Spinning brand badge (desktop) */}
      <div className="hero-rise absolute bottom-10 right-6 hidden md:block lg:right-10" style={{ animationDelay: "1s" }}>
        <RotatingBadge className="h-32 w-32 lg:h-36 lg:w-36" />
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 transition hover:text-[#C6A15B] md:block"
      >
        <ChevronDown size={28} className="hero-bounce" />
      </a>
    </section>
  );
}

export default Hero;
