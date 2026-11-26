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

const processSteps = [
  {
    number: "01",
    title: "Understand Your Needs",
    description:
      "We learn about your requirements and guide you towards the right service.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Handle the Process",
    description:
      "Our team assists with documentation, applications, and required procedures.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Provide Support",
    description:
      "We keep you informed and assist you throughout the process.",
    icon: CheckCircle2,
  },
];

function Services() {
  const [activeService, setActiveService] = useState(0);

  const selectedService = services[activeService];
  const ActiveIcon = selectedService.icon;

  return (
    <main className="overflow-hidden bg-white text-[#0B1D30]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1D30] px-5 py-16 sm:px-8 sm:py-20 lg:py-28">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#C6A15B]/20" />
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-[#C6A15B]/20" />

        <div className="relative mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Hero Content */}
            <div>
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B] sm:text-sm sm:tracking-[4px]">
                <span className="h-px w-8 bg-[#C6A15B] sm:w-10" />
                What We Offer
              </p>

              <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Complete Solutions
                <span className="mt-2 block text-[#C6A15B]">
                  For Your Business
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:mt-7 sm:text-base sm:leading-8">
                From business setup to government services, AL ZAJ provides
                reliable support to help you manage your business in Dubai.
              </p>

              <a
                href="#our-services"
                className="mt-7 inline-flex items-center gap-3 bg-[#C6A15B] px-6 py-3.5 text-sm font-semibold text-[#0B1D30] transition duration-300 hover:bg-white sm:mt-9 sm:px-7 sm:py-4"
              >
                Explore Our Services
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

              <div className="absolute -bottom-3 -left-3 h-full w-full border border-[#C6A15B]/50 sm:-bottom-5 sm:-left-5" />

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                alt="Modern corporate office"
                className="relative h-[230px] w-full object-cover sm:h-[350px] lg:h-[420px]"
              />

              <div className="absolute bottom-0 left-0 bg-[#C6A15B] px-5 py-3 sm:px-7 sm:py-5">
                <p className="text-xl font-semibold text-[#0B1D30] sm:text-2xl">
                  AL ZAJ
                </p>
                <p className="text-[9px] font-medium tracking-[2px] text-[#0B1D30]/80 sm:text-xs">
                  CORPORATE SERVICES
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE SERVICES */}
      <section
        id="our-services"
        className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-6 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B] sm:text-sm">
              Our Expertise
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Services Designed Around Your Business Needs
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:mt-5 sm:text-base">
              Explore our corporate services and find the right support for
              your business requirements.
            </p>
          </div>

          {/* Service Layout */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">

            {/* Service Navigation */}
            <div>

              <div className="mb-3 flex items-center justify-between lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Select a service
                </p>

                <span className="text-xs text-gray-400">
                  Scroll →
                </span>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-gray-200 lg:pb-0">

                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = activeService === index;

                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(index)}
                      aria-pressed={isActive}
                      className={`group flex min-w-[235px] flex-1 items-center gap-3 border px-4 py-4 text-left transition-all duration-300 sm:min-w-[270px] lg:min-w-0 lg:gap-5 lg:border-x-0 lg:border-b lg:border-t-0 lg:py-6 ${
                        isActive
                          ? "border-[#C6A15B] bg-[#0B1D30] text-white lg:border-l-4 lg:border-l-[#C6A15B]"
                          : "border-gray-200 bg-white text-[#0B1D30] hover:bg-[#F8F6F1] lg:border-l-4 lg:border-l-transparent"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          isActive ? "text-[#C6A15B]" : "text-gray-400"
                        }`}
                      >
                        {service.id}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold sm:text-base lg:text-lg">
                          {service.title}
                        </h3>

                        <p
                          className={`mt-1 text-[11px] sm:text-xs ${
                            isActive ? "text-white/60" : "text-gray-400"
                          }`}
                        >
                          {service.subtitle}
                        </p>
                      </div>

                      <Icon
                        size={20}
                        className={`shrink-0 ${
                          isActive
                            ? "text-[#C6A15B]"
                            : "text-gray-400 transition group-hover:text-[#C6A15B]"
                        }`}
                      />
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Service Details */}
            <div
              key={selectedService.id}
              className="overflow-hidden bg-[#F7F6F2] animate-[fadeIn_0.4s_ease-in-out]"
            >

              {/* Service Image */}
              <div className="relative h-[220px] overflow-hidden sm:h-[300px] md:h-[350px]">

                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D30]/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-7 sm:left-7">

                  <div className="flex h-10 w-10 items-center justify-center bg-[#C6A15B] text-[#0B1D30] sm:h-12 sm:w-12">
                    <ActiveIcon size={22} />
                  </div>

                  <span className="text-xs font-medium uppercase tracking-widest text-white sm:text-sm">
                    Service {selectedService.id}
                  </span>

                </div>
              </div>

              {/* Service Information */}
              <div className="p-5 sm:p-8 md:p-10">

                <h3 className="text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
                  {selectedService.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:mt-4 sm:text-base">
                  {selectedService.description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                  {selectedService.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#C6A15B]"
                      />

                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                <a
                  href="/#contact"
                  className="mt-7 inline-flex items-center gap-3 border-b border-[#C6A15B] pb-2 text-sm font-semibold text-[#0B1D30] transition hover:gap-5 sm:mt-9"
                >
                  Enquire About This Service
                  <ArrowRight size={18} className="text-[#C6A15B]" />
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-[#F7F6F2] px-5 py-16 sm:px-8 sm:py-20 lg:px-6 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B] sm:text-sm">
              How We Work
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Simple Steps. Reliable Support.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:mt-5 sm:text-base">
              We make your business service experience simple and clear.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

            {processSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-4xl font-semibold text-[#C6A15B]/50">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center bg-[#0B1D30] text-[#C6A15B] sm:h-12 sm:w-12">
                      <Icon size={22} />
                    </div>

                  </div>

                  <h3 className="mt-7 text-lg font-semibold sm:mt-8 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#0B1D30] px-5 py-16 sm:px-8 sm:py-20 lg:px-6 lg:py-24">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">

          <div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B] sm:text-sm">
              Let's Get Started
            </p>

            <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
              Need Support With Your Business in Dubai?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Our team is ready to help you with the right corporate services.
            </p>

          </div>

          <a
            href="/#contact"
            className="inline-flex w-full items-center justify-center gap-3 bg-[#C6A15B] px-7 py-4 text-sm font-semibold text-[#0B1D30] transition hover:bg-white sm:w-auto sm:px-8"
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