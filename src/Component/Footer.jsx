import React from "react";

function Footer() {
  return (
    <footer className="bg-[#c5aa6a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / About */}
        <div>
          <h1 className="text-2xl font-bold mb-3">Stich</h1>
          <p className="text-sm">
            Stich is a modern fashion platform designed to bring style and
            comfort together. Explore trending collections with a seamless
            shopping experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Shop</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p className="text-sm">Email: support@stich.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <div className="flex gap-4 mt-3">
            <span className="cursor-pointer hover:text-black">Facebook</span>
            <span className="cursor-pointer hover:text-black">Instagram</span>
            <span className="cursor-pointer hover:text-black">Twitter</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center border-t border-white/30 py-4 text-sm">
        © {new Date().getFullYear()} Stich. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;