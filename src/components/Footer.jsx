import { MapPin, Phone, Mail, Camera } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#102A43] text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">

        {/* Company Information */}
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-wide">
            AL <span className="text-[#C6A15B]">ZAJ</span>
          </h2>

          <p className="mb-6 leading-7 text-gray-300">
            Your trusted partner for business setup and corporate services
            in Dubai, UAE. We make your business journey simple, smooth,
            and hassle-free.
          </p>

          <a
            href="https://www.instagram.com/alzajgroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C6A15B] transition hover:text-white"
          >
            <Camera size={20} />
            Follow us on Instagram
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-[#C6A15B]">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="#home" className="transition hover:text-[#C6A15B]">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="transition hover:text-[#C6A15B]">
                About Us
              </a>
            </li>

            <li>
              <a href="#services" className="transition hover:text-[#C6A15B]">
                Our Services
              </a>
            </li>

            <li>
              <a href="#contact" className="transition hover:text-[#C6A15B]">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-[#C6A15B]">
            Contact Information
          </h3>

          <div className="space-y-5 text-gray-300">

            <p className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-1 shrink-0 text-[#C6A15B]"
              />
              <span>
                Office 20, Royal Future, Madina Mall,
                Muhaisina 4, Dubai, UAE.
              </span>
            </p>

            <a
              href="tel:+971544015056"
              className="flex items-center gap-3 transition hover:text-[#C6A15B]"
            >
              <Phone size={20} className="text-[#C6A15B]" />
              +971 54 401 5056
            </a>

            <a
              href="mailto:info@alzaj.com"
              className="flex items-center gap-3 transition hover:text-[#C6A15B]"
            >
              <Mail size={20} className="text-[#C6A15B]" />
              info@alzaj.com
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 px-6 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AL ZAJ Corporate Services.
        All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
