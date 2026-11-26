import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Website Enquiry - AL ZAJ");
    const body = encodeURIComponent(
      `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}

Message:
${formData.message}`
    );

    window.location.href = `mailto:info@alzaj.com?subject=${subject}&body=${body}`;
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Office",
      details:
        "Office 20, Royal Future, Madina Mall, Muhaisina 4, Dubai, UAE",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: "+971 54 401 5056",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "info@alzaj.com",
    },
    {
      icon: Clock,
      title: "Location",
      details: "Dubai, United Arab Emirates",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#F5F7FA]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="text-[#C6A15B] uppercase tracking-widest font-semibold text-sm">
            Contact Us
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#102A43] mt-4">
            Let's Start Your
            <span className="text-[#C6A15B]"> Business Journey</span>
          </h2>

          <p className="text-gray-600 leading-8 mt-5">
            Have questions about business setup or corporate services
            in Dubai? Contact our team and tell us how we can help.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <h3 className="text-2xl font-bold text-[#102A43] mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6">

              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-5 bg-white p-6 rounded-lg shadow-sm"
                  >

                    <div className="w-14 h-14 shrink-0 bg-[#102A43] rounded-lg flex items-center justify-center">
                      <Icon size={25} className="text-[#C6A15B]" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#102A43]">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-sm leading-7 mt-2">
                        {item.details}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971544015056"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 mt-8 bg-green-600 text-white py-4 font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle size={22} />
              Chat With Us on WhatsApp
            </a>

          </div>

          {/* Contact Form */}
          <div className="bg-white p-7 md:p-10 rounded-lg shadow-md">

            <h3 className="text-2xl font-bold text-[#102A43]">
              Send Us an Enquiry
            </h3>

            <p className="text-gray-500 text-sm mt-3 mb-8">
              Fill out the form below. Our team will be happy to assist you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C6A15B]"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Service
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C6A15B]"
                >
                  <option value="">Choose a service</option>
                  <option>Business Setup & Licensing</option>
                  <option>PRO Services</option>
                  <option>Visa Services</option>
                  <option>Document Clearing & Attestation</option>
                  <option>Ejari Registration</option>
                  <option>Government Approvals</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your requirements..."
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C6A15B] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#102A43] text-white py-4 font-semibold hover:bg-[#C6A15B] transition duration-300"
              >
                Send Enquiry
                <Send size={19} />
              </button>

            </form>

          </div>

        </div>

        {/* Google Map */}
        <div className="mt-16">

          <h3 className="text-2xl font-bold text-[#102A43] mb-6">
            Find Our Office
          </h3>

          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">

            <iframe
              title="AL ZAJ Corporate Services Location"
              src="https://maps.google.com/maps?q=Madina%20Mall%2C%20Muhaisnah%204%2C%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;