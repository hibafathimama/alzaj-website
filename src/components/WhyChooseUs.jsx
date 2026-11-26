import {
  Award,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: "Client-Focused Approach",
      description:
        "We focus on understanding your business requirements and providing suitable corporate service solutions.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Support",
      description:
        "Get assistance with essential business documentation and government-related procedures.",
    },
    {
      icon: Clock,
      title: "Simplified Process",
      description:
        "We help make complex administrative procedures easier to understand and manage.",
    },
    {
      icon: Award,
      title: "Comprehensive Services",
      description:
        "Access business setup, PRO, visa, attestation and other corporate services in one place.",
    },
  ];

  return (
    <section className="py-24 bg-[#102A43]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="text-[#C6A15B] uppercase tracking-widest text-sm font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            Your Business Deserves
            <span className="block text-[#C6A15B] mt-2">
              The Right Support
            </span>
          </h2>

          <p className="text-gray-300 leading-8 mt-6">
            At AL ZAJ Corporate Services, we aim to make your
            business journey in the UAE simpler through
            professional assistance and comprehensive
            corporate solutions.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">

          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-8 rounded-lg hover:bg-white/10 hover:border-[#C6A15B] transition duration-300 group"
              >

                <div className="w-16 h-16 flex items-center justify-center bg-[#C6A15B]/10 rounded-lg group-hover:bg-[#C6A15B] transition duration-300">

                  <Icon
                    size={32}
                    className="text-[#C6A15B] group-hover:text-[#102A43] transition"
                  />

                </div>

                <h3 className="text-xl font-bold text-white mt-7">
                  {reason.title}
                </h3>

                <p className="text-gray-300 text-sm leading-7 mt-4">
                  {reason.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom Information */}
        <div className="mt-16 border-t border-white/20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <CheckCircle2
              size={35}
              className="text-[#C6A15B]"
            />

            <div>
              <h3 className="text-white font-semibold text-lg">
                Looking for Business Support in Dubai?
              </h3>

              <p className="text-gray-300 text-sm mt-1">
                Let us help you with your corporate requirements.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="bg-[#C6A15B] text-[#102A43] px-8 py-4 font-semibold hover:bg-white transition duration-300"
          >
            Talk to Our Team
          </a>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;