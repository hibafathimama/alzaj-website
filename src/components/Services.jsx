import { Fragment, useEffect, useRef, useState } from "react";
import {
  Building2,
  FileCheck,
  Users,
  Stamp,
  Home,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const ROTATE_MS = 4500;

const services = [
  {
    icon: Building2,
    title: "Business Setup & Licensing",
    description:
      "Company formation, business activity selection, and trade license applications and renewals in Dubai.",
  },
  {
    icon: Users,
    title: "PRO & Visa Services",
    description:
      "Government documentation, residency visas and employee visa procedures, handled by our corporate support team.",
  },
  {
    icon: FileCheck,
    title: "Document Clearing",
    description:
      "Document processing, certificate attestation and MOFA-related documentation for personal and business needs.",
  },
  {
    icon: Stamp,
    title: "Document Attestation",
    description:
      "Educational, marriage and commercial certificate attestation procedures in the UAE.",
  },
  {
    icon: Home,
    title: "Ejari Registration",
    description:
      "Tenancy contract registration and Ejari documentation required for business licensing.",
  },
  {
    icon: ShieldCheck,
    title: "Government Approvals",
    description:
      "Coordinating required approvals with the relevant UAE government authorities and departments.",
  },
];

/* ---------- helpers ---------- */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mouse effects only on devices with a real cursor and no reduced-motion
const canHover = () =>
  !prefersReduced() && window.matchMedia("(hover: hover)").matches;

// Whether the element has scrolled into view (once)
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

// Whether the element is on screen right now (updates both ways)
function useVisible(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// Fade and slide up when scrolled into view
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
  delay = 0,
  className = "",
}) {
  const [ref, shown] = useInView(0.3);
  let index = 0;

  const accentClass =
    tone === "dark"
      ? "svc-shimmer bg-gradient-to-r from-[#C6A15B] via-[#F0D9A0] to-[#C6A15B] bg-clip-text text-transparent"
      : "svc-shimmer bg-gradient-to-r from-[#A67C2E] via-[#D9B56A] to-[#A67C2E] bg-clip-text text-transparent";

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

// Sets the cursor position as CSS variables on the element (for glow effects)
const trackCursor = (event) => {
  if (!canHover()) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

/* ---------- desktop: expanding panels ---------- */

function ServicePanel({ service, index, active, paused, onActivate }) {
  const Icon = service.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      tabIndex={0}
      aria-label={service.title}
      aria-current={active ? "true" : undefined}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onMouseMove={trackCursor}
      style={{
        flex: `${active ? 4 : 1} 1 0%`,
        transition: "flex-grow 700ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
      className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-2xl border outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${
        active
          ? "border-[#C6A15B]/60 bg-[#12304B]"
          : "border-white/10 bg-[#0B1D30] hover:bg-[#102A43]"
      }`}
    >
      {/* Cursor-following gold light */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(198,161,91,0.18), transparent 70%)",
        }}
      />

      {/* Big faint number */}
      <span className="pointer-events-none absolute -bottom-8 -right-3 select-none text-[9rem] font-black leading-none text-white/[0.04]">
        {number}
      </span>

      {/* Icon (always visible) */}
      <span
        className={`absolute left-5 top-6 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ${
          active
            ? "scale-110 bg-[#C6A15B] text-[#0B1D30]"
            : "bg-white/10 text-[#C6A15B] group-hover:bg-white/15"
        }`}
      >
        <Icon size={24} />
      </span>

      {/* Number (open panel) */}
      <span
        className={`absolute right-6 top-8 text-sm font-bold tracking-widest text-[#C6A15B] transition-opacity duration-500 ${
          active ? "opacity-100 delay-300" : "opacity-0"
        }`}
      >
        {number}
      </span>

      {/* Closed panel: vertical title */}
      <span
        className={`absolute bottom-6 left-[1.35rem] whitespace-nowrap text-sm font-semibold tracking-wide text-white/80 transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${
          active ? "opacity-0" : "opacity-100 delay-300"
        }`}
      >
        {service.title}
      </span>

      {/* Open panel: full details */}
      <div
        className={`absolute bottom-0 left-0 w-[360px] p-8 transition-all duration-500 ${
          active
            ? "translate-y-0 opacity-100 delay-300"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <h3 className="text-2xl font-bold leading-snug text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {service.description}
        </p>
        <a
          href="#contact"
          tabIndex={active ? 0 : -1}
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E4C78B] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
        >
          Enquire Now
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </a>
      </div>

      {/* Auto-play progress line */}
      {active && (
        <span
          key={`bar-${index}`}
          className="svc-progress absolute inset-x-0 bottom-0 h-0.5 bg-[#C6A15B]"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />
      )}
    </article>
  );
}

/* ---------- mobile and tablet: tap-to-open list ---------- */

function MobileServiceItem({ service, index, open, onToggle }) {
  const Icon = service.icon;
  const number = String(index + 1).padStart(2, "0");
  const itemRef = useRef(null);
  const contentId = `service-details-${index}`;

  const handleToggle = () => {
    onToggle(index);

    // After the list has finished moving, keep the opened item in view
    if (!open) {
      setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: prefersReduced() ? "auto" : "smooth",
          block: "nearest",
        });
      }, 380);
    }
  };

  return (
    <article
      ref={itemRef}
      className={`relative scroll-mt-24 overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open
          ? "border-[#C6A15B]/60 bg-[#12304B]"
          : "border-white/10 bg-[#0B1D30]"
      }`}
    >
      {/* Big faint number */}
      <span className="pointer-events-none absolute -bottom-6 right-2 select-none text-[6rem] font-black leading-none text-white/[0.04]">
        {number}
      </span>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={handleToggle}
        className="relative flex min-h-[76px] w-full items-center gap-4 p-4 text-left transition-colors active:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C6A15B]"
      >
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            open
              ? "scale-105 bg-[#C6A15B] text-[#0B1D30]"
              : "bg-white/10 text-[#C6A15B]"
          }`}
        >
          <Icon size={24} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold tracking-widest text-[#C6A15B]">
            {number}
          </span>
          <span className="mt-0.5 block text-base font-semibold leading-snug text-white">
            {service.title}
          </span>
        </span>

        <ChevronDown
          size={22}
          className={`shrink-0 text-[#C6A15B] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={contentId}
        aria-hidden={!open}
        className={`relative grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-1">
            <p className="text-sm leading-7 text-slate-300">
              {service.description}
            </p>

            <a
              href="#contact"
              tabIndex={open ? 0 : -1}
              className="group/link mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#E4C78B] transition active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
            >
              Enquire Now
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- section ---------- */

function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openMobile, setOpenMobile] = useState(0);
  const [panelsRef, panelsVisible] = useVisible(0.3);

  const sectionGlowRef = useRef(null);

  // Auto-play: moves to the next service while the panels are on screen
  useEffect(() => {
    if (!panelsVisible || paused) return;
    if (prefersReduced()) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const id = setTimeout(
      () => setActive((i) => (i + 1) % services.length),
      ROTATE_MS
    );
    return () => clearTimeout(id);
  }, [active, paused, panelsVisible]);

  const activate = (index) => {
    setActive(index);
    setPaused(true);
  };

  // Mobile list: one open at a time, tap again to close
  const toggleMobile = (index) =>
    setOpenMobile((current) => (current === index ? -1 : index));

  // Gold light that follows the cursor across the section
  const handleSectionMove = (event) => {
    if (!sectionGlowRef.current || !canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sectionGlowRef.current.style.background = `radial-gradient(440px circle at ${x}px ${y}px, rgba(198,161,91,0.1), transparent 65%)`;
  };

  // Magnetic button: leans toward the cursor
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
      id="services"
      onMouseMove={handleSectionMove}
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-24 lg:py-28"
    >
      <style>{`
        @keyframes svc-shimmer { to { background-position: 200% center; } }
        @keyframes svc-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes svc-drift { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(36px, -28px, 0); } }
        .svc-shimmer { background-size: 200% auto; animation: svc-shimmer 5s linear infinite; }
        .svc-progress { transform-origin: left; animation: svc-progress ${ROTATE_MS}ms linear forwards; }
        .svc-drift { animation: svc-drift 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .svc-shimmer, .svc-progress, .svc-drift { animation: none !important; }
        }
      `}</style>

      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,29,48,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, #000, transparent 45%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000, transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#C6A15B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-[#102A43]/5 blur-3xl" />
      <div ref={sectionGlowRef} className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <Reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 bg-[#C6A15B]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C2E] sm:text-sm">
                What We Offer
              </span>
              <span className="h-[2px] w-10 bg-[#C6A15B]" />
            </div>
          </Reveal>

          <DynamicHeading
            lines={["Our Professional Services"]}
            accent={["Services"]}
            className="text-[1.9rem] font-bold leading-tight tracking-tight text-[#102A43] sm:text-4xl md:text-5xl"
          />

          <Reveal delay={400}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              <Brand /> provides business setup and corporate support to help
              entrepreneurs and companies manage essential procedures in the
              UAE.
            </p>
          </Reveal>
        </div>

        {/* Desktop: panels that open on hover */}
        <Reveal delay={150}>
          <div
            ref={panelsRef}
            role="list"
            className="hidden h-[460px] gap-3 lg:flex"
            onMouseLeave={() => setPaused(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setPaused(false);
              }
            }}
          >
            {services.map((service, index) => (
              <ServicePanel
                key={service.title}
                service={service}
                index={index}
                active={index === active}
                paused={paused}
                onActivate={activate}
              />
            ))}
          </div>
        </Reveal>

        {/* Mobile and tablet: tap-to-open list */}
        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4 lg:hidden">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 2) * 100}>
              <MobileServiceItem
                service={service}
                index={index}
                open={openMobile === index}
                onToggle={toggleMobile}
              />
            </Reveal>
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal className="mt-14 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#0B1D30] px-6 py-10 sm:px-8 sm:py-14 md:px-14 md:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            <div className="svc-drift pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#C6A15B]/15 blur-3xl" />
            <div
              className="svc-drift pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-[#486581]/30 blur-3xl"
              style={{ animationDelay: "-6s" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 right-0 select-none whitespace-nowrap text-[8rem] font-black leading-none text-transparent sm:text-[12rem] md:text-[16rem]"
              style={{ WebkitTextStroke: "1px rgba(198,161,91,0.16)" }}
            >
              AL ZAJ
            </div>

            <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <DynamicHeading
                  as="h3"
                  tone="dark"
                  lines={["Need Help With Your", "Business Setup?"]}
                  accent={["Business", "Setup?"]}
                  className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
                />
                <p className="mx-auto mt-4 max-w-md text-slate-300 md:mx-0">
                  Talk to the <Brand tone="dark" /> team about your corporate
                  service requirements.
                </p>
              </div>

              <a
                href="#contact"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="group relative inline-flex w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-md bg-[#C6A15B] px-8 py-4 md:w-auto font-semibold text-[#0B1D30] shadow-lg shadow-black/20 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-xl hover:shadow-[#C6A15B]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {/* shine sweep */}
                <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/45 transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
                <span className="relative">Contact Us</span>
                <ArrowRight
                  size={19}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Services;
