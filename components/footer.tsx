"use client"
import { motion } from "motion/react"
import { ArrowUp, Github, Twitter, DiscIcon as Discord } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-black py-16 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 font-sans">Zeyo</h3>
            <p className="text-orange-200/80 mb-6 max-w-md font-sans">
              The future of private DeFi trading. Trade with confidence while keeping your data secure with
              zero-knowledge proofs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors font-sans">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors font-sans">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors font-sans">
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-sans">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-sans">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-200/80 hover:text-orange-200 transition-colors font-sans">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-orange-500/20">
          <p className="text-orange-200/60 text-sm mb-4 md:mb-0 font-sans">© 2024 Zeyo. All rights reserved.</p>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-full text-orange-200 transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-sm font-sans">Back to Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
