import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  FileCheck,
  Users,
  Stamp,
  Home,
  ShieldCheck,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Business Setup & Licensing",
    subtitle: "Start your business in Dubai",
    description:
      "We help you establish your business in Dubai with the right company structure, business activities, and trade licensing support.",
    features: [
      "Company formation",
      "Business activity selection",
      "Trade license application",
      "License renewal support",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    icon: Building2,
  },
  {
    id: "02",
    title: "PRO & Visa Services",
    subtitle: "Simple and reliable visa support",
    description:
      "From visa applications to employee documentation, we help manage the important procedures required for your business.",
    features: [
      "Residence visa assistance",
      "Employee visa processing",
      "PRO services",
      "Visa renewal support",
    ],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    icon: Users,
  },
  {
    id: "03",
    title: "Document Clearing",
    subtitle: "Making documentation easier",
    description:
      "We assist with document preparation, submission, and clearing procedures to help you complete your business requirements.",
    features: [
      "Document preparation",
      "Application submission",
      "Government documentation",
      "Document follow-up",
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",
    icon: FileCheck,
  },
  {
    id: "04",
    title: "Document Attestation",
    subtitle: "Professional attestation assistance",
    description:
      "We support individuals and businesses with document attestation procedures, including MOFA attestation.",
    features: [
      "MOFA attestation",
      "Certificate attestation",
      "Document verification support",
      "Attestation guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=85",
    icon: Stamp,
  },
  {
    id: "05",
    title: "Ejari Registration",
    subtitle: "Property registration support",
    description:
      "We assist with Ejari registration and related documentation to help complete your property registration requirements.",
    features: [
      "New Ejari registration",
      "Ejari renewal",
      "Required document assistance",
      "Registration support",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    icon: Home,
  },
  {
    id: "06",
    title: "Government Approvals",
    subtitle: "Guidance through approval procedures",
    description:
      "We help businesses with the required government approvals and coordination for different business activities.",
    features: [
      "Dubai Municipality approvals",
      "Dubai Civil Defence approvals",
      "Dubai RTA approvals",
      "Trakhees approvals",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    icon: ShieldCheck,
  },
];

function Services() {
  const [activeService, setActiveService] = useState(0);

  const selectedService = services[activeService];
  const ActiveIcon = selectedService.icon;

  return (
    <main className="bg-white text-[#0B1D30]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1D30] px-6 py-24 md:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#C6A15B]/20" />
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#C6A15B]/20" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-[#C6A15B]">
            <span className="h-px w-10 bg-[#C6A15B]" />
            What We Offer
          </p>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Complete Solutions
                <span className="mt-2 block text-[#C6A15B]">
                  For Your Business
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-white/70">
                From business setup to government services, AL ZAJ provides
                reliable support to help you manage your business in Dubai.
              </p>

              <a
                href="#our-services"
                className="mt-9 inline-flex items-center gap-3 bg-[#C6A15B] px-7 py-4 text-sm font-semibold text-[#0B1D30] transition hover:bg-white"
              >
                Explore Our Services
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -bottom-5 -left-5 h-full w-full border border-[#C6A15B]/50" />

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                alt="Modern corporate office"
                className="relative h-[300px] w-full object-cover sm:h-[400px]"
              />

              <div className="absolute bottom-0 left-0 bg-[#C6A15B] px-6 py-5">
                <p className="text-2xl font-semibold text-[#0B1D30]">
                  AL ZAJ
                </p>
                <p className="text-xs font-medium tracking-widest text-[#0B1D30]/80">
                  CORPORATE SERVICES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SERVICES SECTION */}
      <section id="our-services" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#C6A15B]">
              Our Expertise
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Services Designed Around Your Business Needs
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Explore our corporate services and find the right support for
              your business requirements.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr]">

            {/* LEFT SERVICE LIST */}
            <div className="flex flex-col border-t border-gray-200">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeService === index;

                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className={`group flex items-center gap-5 border-b border-gray-200 px-4 py-6 text-left transition-all duration-300 ${
                      isActive
                        ? "border-l-4 border-l-[#C6A15B] bg-[#0B1D30] text-white"
                        : "border-l-4 border-l-transparent hover:bg-[#F8F6F1]"
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isActive ? "text-[#C6A15B]" : "text-gray-400"
                      }`}
                    >
                      {service.id}
                    </span>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold sm:text-lg">
                        {service.title}
                      </h3>

                      <p
                        className={`mt-1 text-xs ${
                          isActive ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                    </div>

                    <Icon
                      size={22}
                      className={
                        isActive
                          ? "text-[#C6A15B]"
                          : "text-gray-400 transition group-hover:text-[#C6A15B]"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SERVICE DETAILS */}
            <div
              key={selectedService.id}
              className="animate-[fadeIn_0.4s_ease-in-out] overflow-hidden bg-[#F7F6F2]"
            >
              <div className="relative h-[260px] overflow-hidden sm:h-[350px]">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D30]/70 to-transparent" />

                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#C6A15B] text-[#0B1D30]">
                    <ActiveIcon size={24} />
                  </div>

                  <span className="text-sm font-medium uppercase tracking-widest">
                    Service {selectedService.id}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-10">
                <h3 className="text-2xl font-semibold sm:text-3xl">
                  {selectedService.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {selectedService.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-[#C6A15B]"
                      />
                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="/#contact"
                  className="mt-9 inline-flex items-center gap-3 border-b border-[#C6A15B] pb-2 text-sm font-semibold text-[#0B1D30] transition hover:gap-5"
                >
                  Enquire About This Service
                  <ArrowRight size={18} className="text-[#C6A15B]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="bg-[#F7F6F2] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#C6A15B]">
              How We Work
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl">
              Simple Steps. Reliable Support.
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              We make your business service experience simple and clear.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Understand Your Needs",
                text: "We learn about your requirements and guide you towards the right service.",
                icon: MessageCircle,
              },
              {
                number: "02",
                title: "Handle the Process",
                text: "Our team assists with documentation, applications, and required procedures.",
                icon: ClipboardCheck,
              },
              {
                number: "03",
                title: "Provide Support",
                text: "We keep you informed and assist you throughout the process.",
                icon: CheckCircle2,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-semibold text-[#C6A15B]/50">
                      {item.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center bg-[#0B1D30] text-[#C6A15B]">
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#0B1D30] px-6 py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#C6A15B]">
              Let's Get Started
            </p>

            <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Need Support With Your Business in Dubai?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Our team is ready to help you with the right corporate services.
            </p>
          </div>

          <a
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-3 bg-[#C6A15B] px-8 py-4 text-sm font-semibold text-[#0B1D30] transition hover:bg-white"
          >
            Contact Us
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Services;