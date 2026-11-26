import {
  MessageCircle,
  ClipboardList,
  FileCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

function Process() {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Initial Consultation",
      description:
        "Contact our team and share your business requirements. We will understand your needs and discuss suitable solutions.",
    },
    {
      number: "02",
      icon: ClipboardList,
      title: "Planning & Documentation",
      description:
        "We help identify the required documents, business activities and procedures for your requirements.",
    },
    {
      number: "03",
      icon: FileCheck,
      title: "Application & Processing",
      description:
        "Get assistance with applications, documentation and coordination with the relevant authorities.",
    },
    {
      number: "04",
      icon: Building2,
      title: "Business Support",
      description:
        "Receive assistance with your corporate service requirements and ongoing administrative procedures.",
    },
  ];

  return (
    <section className="py-24 bg-[#F5F7FA]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="text-[#C6A15B] font-semibold tracking-widest uppercase text-sm">
            How We Work
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#102A43] mt-4">
            Our Simple
            <span className="text-[#C6A15B]"> Process</span>
          </h2>

          <p className="text-gray-600 leading-8 mt-5">
            We follow a structured approach to help simplify
            your business setup and corporate service journey
            in the UAE.
          </p>

        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >

                {/* Number */}
                <div className="flex justify-between items-center">

                  <span className="text-4xl font-bold text-[#C6A15B]/40">
                    {step.number}
                  </span>

                  <div className="w-14 h-14 bg-[#102A43] rounded-lg flex items-center justify-center">
                    <Icon size={27} className="text-[#C6A15B]" />
                  </div>

                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#102A43] mt-8">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm leading-7 mt-4">
                  {step.description}
                </p>

                <div className="w-12 h-1 bg-[#C6A15B] mt-7"></div>

              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">

          <p className="text-gray-600 mb-5">
            Ready to start your business journey in Dubai?
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#102A43] text-white px-8 py-4 font-semibold hover:bg-[#C6A15B] transition duration-300"
          >
            Get Started Today
            <ArrowRight size={19} />
          </a>

        </div>

      </div>

    </section>
  );
}

export default Process;