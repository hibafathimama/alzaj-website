import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/alzaj.jpeg";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "Contact Us", link: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape or desktop resize
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (link) => location.pathname === link;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled || isOpen
          ? "border-gray-200 shadow-[0_2px_20px_rgba(16,42,67,0.08)]"
          : "border-transparent shadow-none"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Company Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
        >
          <img
            src={logo}
            alt="AL ZAJ Corporate Services"
            className={`w-auto max-w-[200px] object-contain transition-all duration-300 ${
              scrolled ? "h-12" : "h-16 md:h-20"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((item) => {
              const active = isActive(item.link);

              return (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B] ${
                      active
                        ? "text-[#102A43]"
                        : "text-[#486581] hover:text-[#102A43]"
                    }`}
                  >
                    {item.name}

                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[#C6A15B] transition-transform duration-300 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to="/contact"
            className="rounded-md bg-[#102A43] px-6 py-2.5 text-[15px] font-semibold text-white shadow-sm transition duration-300 hover:bg-[#C6A15B] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-md p-2 text-[#102A43] transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A15B] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" aria-hidden={!isOpen}>
          <ul className="mx-6 flex flex-col border-t border-gray-100 pb-2 pt-2">
            {navLinks.map((item) => {
              const active = isActive(item.link);

              return (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-gray-100 py-4 text-base font-medium transition-colors ${
                      active
                        ? "text-[#102A43]"
                        : "text-[#486581] hover:text-[#102A43]"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <span className="h-2 w-2 rounded-full bg-[#C6A15B]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-6 pb-6 pt-4">
            <Link
              to="/contact"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="block rounded-md bg-[#102A43] px-6 py-3.5 text-center font-semibold text-white transition hover:bg-[#C6A15B]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;