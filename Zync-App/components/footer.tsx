import { Github, Globe, Instagram, Twitter, Youtube } from "lucide-react";

import { ArrowRight } from "lucide-react";

export function Footer() {
    return (
      <footer className="bg-[#1a1b1e] text-white py-20 px-6">
        <footer className="bg-[#1a1b1e] text-white py-20 px-6">
                  <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                      <div>
                        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">
                          Connect with us
                        </h3>
                        <div className="flex space-x-4">
                          {[Twitter, Instagram, Github, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-[#5865F2] transition">
                              <Icon className="h-6 w-6" />
                            </a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">
                          Product
                        </h3>
                        <ul className="space-y-2 text-gray-300">
                          {["Download", "Nitro", "Status", "App Directory"].map((item, i) => (
                            <li key={i}>
                              <a href="#" className="hover:text-white transition">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">
                          Company
                        </h3>
                        <ul className="space-y-2 text-gray-300">
                          {["About", "Jobs", "Brand", "News"].map((item, i) => (
                            <li key={i}>
                              <a href="#" className="hover:text-white transition">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#5865F2] font-bold text-base mb-4 tracking-widest uppercase">
                          Stay Updated
                        </h3>
                        <div className="flex w-full">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-[#2F3136] text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                          />
                          <button className="bg-[#5865F2] px-4 py-2 rounded-r-lg hover:bg-[#4752C4] transition">
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Subscribe to our newsletter for updates
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#40444B]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#5865F2]" />
                        <span>English, US</span>
                      </div>
                      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Cookie Settings</a>
                        <a href="#" className="hover:text-white transition">Guidelines</a>
                      </div>
                      <div className="text-center sm:text-right w-full sm:w-auto">
                        © 2025 Zync
                      </div>
                    </div>
                  </div>
                </footer>
      </footer>
    );
  }
  