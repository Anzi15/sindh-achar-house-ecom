"use client";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Wholesale", href: "/wholesale" },
  ];

  const collections = [
    { name: "Traditional Achars", href: "/collection/achar" },
    { name: "Premium Chutneys", href: "/collection/chutney" },
    { name: "Sweet Murabbas", href: "/collection/murabba" },
    { name: "Seasonal Specials", href: "/collection/seasonal" },
  ];

  const businessInfo = [
    { icon: FaPhone, text: "+92 305 3820015", href: "tel:+923047210222" },
    {
      icon: FaEnvelope,
      text: "info@sindhacahr.com",
      href: "mailto:info@sindhacahr.com",
    },
    { icon: FaMapMarkerAlt, text: "Main Clocktower Shikarpur Sindh", href: "#" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-red-500 mb-2">
                  Sindh Achar
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Authentic Pakistani flavors crafted with love and tradition.
                  Experience the taste of home with our premium achars,
                  chutneys, and murabbas.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {businessInfo.map((info, index) => (
                  <Link
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors duration-300 group"
                  >
                    <info.icon className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{info.text}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-red-400">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-red-400">
                Our Collections
              </h4>
              <ul className="space-y-3">
                {collections.map((collection, index) => (
                  <li key={index}>
                    <Link
                      href={collection.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-red-400">
                Stay Connected
              </h4>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe for exclusive offers and new product updates!
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-r-lg transition-colors duration-300 text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-gray-300 text-sm mb-4">
                  Follow us on social media
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="https://wa.me/923047210222?text=AOA"
                    target="_blank"
                    className="text-green-500 hover:text-green-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaWhatsappSquare className="text-2xl" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/share/18uaKEJMZR/"
                    target="_blank"
                    className="text-blue-500 hover:text-blue-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaFacebookSquare className="text-2xl" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/sindh_achar_house?igsh=MWhxZ3Zwemlxa200dQ=="
                    target="_blank"
                    className="text-pink-500 hover:text-pink-400 hover:scale-110 transition-all duration-300"
                  >
                    <FaInstagramSquare className="text-2xl" />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@sindh.achar.house?_t=ZS-8vzs76Kmx5b&_r=1"
                    target="_blank"
                    className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300"
                  >
                    <AiFillTikTok className="text-2xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale CTA Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 py-8">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-xl font-bold mb-2">Interested in Wholesale?</h3>
            <p className="text-red-100 mb-4 text-sm">
              Contact us for bulk orders and special wholesale pricing
            </p>
            <Link
              href="https://wa.me/923047210222?text=I'm interested in wholesale orders"
              className="inline-flex items-center px-6 py-3 bg-white text-red-800 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <FaWhatsappSquare className="mr-2" />
              Contact for Wholesale
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Sindh Achar. All rights reserved.
                </p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">
                  Made with ❤️ by{" "}
                  <Link
                    href="https://anziandco.com?ref=sindhachar"
                    target="_blank"
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300"
                  >
                    Anzi & Co
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
