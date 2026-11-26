import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, Building2 } from "lucide-react";

// Replace this with an actual AL ZAJ office/team image when available.
const IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85";

/* ---------- helpers ---------- */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mouse effects only on devices with a real cursor and no reduced-motion
const canHover = () =>
  !prefersReduced() && window.matchMedia("(hover: hover)").matches;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Returns a ref and whether the element has scrolled into view
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
function DynamicHeading({ lines, accent = [], delay = 0, className = "" }) {
  const [ref, shown] = useInView(0.3);
  let index = 0;

  return (
    <h2 ref={ref} aria-label={lines.join(" ")} className={className}>
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
                      isAccent
                        ? "about-shimmer bg-gradient-to-r from-[#A67C2E] via-[#D9B56A] to-[#A67C2E] bg-clip-text text-transparent"
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
    </h2>
  );
}

// Brand name highlighted inside a sentence
function Brand() {
  return (
    <span className="bg-[linear-gradient(transparent_62%,rgba(198,161,91,0.35)_62%)] font-extrabold text-[#8A6420]">
      AL ZAJ
    </span>
  );
}

// Round gold badge with spinning brand text
function RotatingBadge({ className = "" }) {
  return (
    <div
      className={`group relative rounded-full bg-[#C6A15B] shadow-2xl shadow-[#102A43]/30 ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="about-spin absolute inset-0 h-full w-full group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id="about-badge-circle"
            d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          fontSize="7.8"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#102A43"
        >
          <textPath href="#about-badge-circle">
            AL ZAJ • CORPORATE SERVICES • DUBAI • UAE •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-[#102A43] text-[#C6A15B] transition-transform duration-300 group-hover:scale-110">
        <Building2 size={26} />
      </div>
    </div>
  );
}

/* ---------- section ---------- */

function About() {
  const [imageBoxRef, imageShown] = useInView(0.2);

  const sectionRef = useRef(null);
  const sectionGlowRef = useRef(null);
  const watermarkRef = useRef(null);
  const tiltRef = useRef(null);
  const frameRef = useRef(null);
  const badgeRef = useRef(null);
  const glareRef = useRef(null);
  const parallaxRef = useRef(null);

  // Gold light that follows the cursor across the section
  const handleSectionMove = (event) => {
    if (!sectionGlowRef.current || !canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sectionGlowRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(198,161,91,0.12), transparent 65%)`;
  };

  // Image: 3D tilt, moving glare, and depth shift of the frame and badge
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
      frameRef.current.style.transform = `translate3d(${x * -18}px, ${
        y * -18
      }px, 0)`;
    if (badgeRef.current)
      badgeRef.current.style.transform = `translate3d(${x * 26}px, ${
        y * 26
      }px, 0)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${
        (x + 0.5) * 100
      }% ${(y + 0.5) * 100}%, rgba(255,255,255,0.25), transparent 55%)`;
    }
  };

  const handleImageLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    if (frameRef.current)
      frameRef.current.style.transform = "translate3d(0, 0, 0)";
    if (badgeRef.current)
      badgeRef.current.style.transform = "translate3d(0, 0, 0)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
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

  // Scroll: image floats slower than the page, big brand text slides sideways
  useEffect(() => {
    if (prefersReduced()) return;
    let raf;

    const update = () => {
      const vh = window.innerHeight;

      const image = parallaxRef.current;
      const box = imageBoxRef.current;
      if (image && box) {
        const rect = box.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        image.style.transform = `translate3d(0, ${
          clamp(progress, -1, 1) * -18
        }px, 0) scale(1.12)`;
      }

      const section = sectionRef.current;
      if (section && watermarkRef.current) {
        const rect = section.getBoundingClientRect();
        const progress = clamp((vh - rect.top) / (vh + rect.height));
        watermarkRef.current.style.transform = `translate3d(${
          (0.5 - progress) * 220
        }px, 0, 0)`;
      }
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
  }, [imageBoxRef]);

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-28"
    >
      <style>{`
        @keyframes about-shimmer { to { background-position: 200% center; } }
        @keyframes about-spin { to { transform: rotate(360deg); } }
        .about-shimmer { background-size: 200% auto; animation: about-shimmer 5s linear infinite; }
        .about-spin { animation: about-spin 18s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .about-shimmer, .about-spin { animation: none !important; }
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
            "linear-gradient(135deg, #000, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(135deg, #000, transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#C6A15B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#102A43]/5 blur-3xl" />
      <div ref={sectionGlowRef} className="pointer-events-none absolute inset-0" />

      {/* Giant outlined brand name that slides while you scroll */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap text-[22vw] font-black leading-none text-transparent will-change-transform"
        style={{ WebkitTextStroke: "1px rgba(198,161,91,0.28)" }}
      >
        AL ZAJ
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: welcome */}
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#C6A15B]" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C2E] sm:text-sm">
                  Welcome to AL ZAJ
                </span>
              </div>
            </Reveal>

            <DynamicHeading
              lines={["Your Trusted Partner for", "Business Success in the UAE"]}
              accent={["Business", "Success"]}
              className="text-[1.65rem] font-bold leading-[1.25] tracking-tight text-[#102A43] sm:text-4xl lg:text-[1.75rem] xl:text-[2.125rem]"
            />

            <Reveal delay={500}>
              <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
                <Brand /> is a Dubai-based business setup and consultancy firm,
                helping entrepreneurs and companies with licensing, visas and
                government approvals.
              </p>
            </Reveal>

            <Reveal delay={650}>
              <a
                href="#services"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-md bg-[#102A43] px-7 py-4 font-semibold text-white shadow-lg shadow-[#102A43]/15 transition-[transform,color,box-shadow] duration-200 ease-out hover:text-[#102A43] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
              >
                {/* gold fill sweeps in from the left */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative">Discover Our Services</span>
                <ArrowRight
                  size={19}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>

          {/* Right: image */}
          <div
            ref={imageBoxRef}
            className="relative mx-3 sm:mx-6 lg:mx-0"
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
          >
            {/* Decorative frame (shifts opposite to the cursor) */}
            <div
              className={`absolute -right-4 -top-4 h-full w-full transition-opacity duration-700 delay-500 motion-reduce:transition-none ${
                imageShown ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                ref={frameRef}
                className="h-full w-full rounded-2xl border-2 border-[#C6A15B]/70 transition-transform duration-300 ease-out"
              />
            </div>

            <div
              ref={tiltRef}
              className="relative transition-transform duration-300 ease-out"
            >
              {/* Shadow box fades in, the photo wipes in from the left */}
              <div
                className={`rounded-2xl shadow-2xl shadow-[#102A43]/20 transition-opacity duration-500 motion-reduce:transition-none ${
                  imageShown ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl"
                  style={{
                    clipPath: imageShown
                      ? "inset(0 0 0 0 round 1rem)"
                      : "inset(0 100% 0 0 round 1rem)",
                    transition: "clip-path 1100ms cubic-bezier(0.7, 0, 0.2, 1)",
                  }}
                >
                  <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                    <img
                      ref={parallaxRef}
                      src={IMAGE}
                      alt="AL ZAJ Corporate Services"
                      style={{ transform: "scale(1.12)" }}
                      className="h-[350px] w-full object-cover will-change-transform sm:h-[430px] lg:h-[500px]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102A43]/50 via-transparent to-transparent" />
                  <div
                    ref={glareRef}
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Floating brand card (fades in last, drifts with the cursor) */}
              <div
                className={`absolute -bottom-7 -left-4 transition-opacity duration-700 delay-[900ms] motion-reduce:transition-none sm:-left-8 ${
                  imageShown ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  ref={badgeRef}
                  className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-xl transition-transform duration-300 ease-out"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#102A43] text-[#C6A15B]">
                    <Building2 size={30} />
                  </div>
                  <div>
                    <p className="about-shimmer bg-gradient-to-r from-[#A67C2E] via-[#D9B56A] to-[#A67C2E] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                      AL ZAJ
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Corporate Services
                    </p>
                  </div>
                </div>
              </div>

              {/* Spinning brand badge on the image corner */}
              <div
                className={`absolute -right-3 -top-8 transition-opacity duration-700 delay-[1100ms] motion-reduce:transition-none sm:-right-8 sm:-top-10 ${
                  imageShown ? "opacity-100" : "opacity-0"
                }`}
              >
                <RotatingBadge className="h-24 w-24 sm:h-32 sm:w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
