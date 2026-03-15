"use client";

import { useState } from "react";
import Link from "next/link";

export default function FlashyPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            One platform, endless integrations
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            A web developer who's passionate about performance, security, and great user experience. From concept to clean code
          </p>

          {/* Integration Hub - Central Orb with Connected Services */}
          <div className="relative h-96 w-full flex items-center justify-center my-20">
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "rgba(168,85,247,0.5)" }} />
                  <stop offset="50%" style={{ stopColor: "rgba(168,85,247,0.8)" }} />
                  <stop offset="100%" style={{ stopColor: "rgba(168,85,247,0.5)" }} />
                </linearGradient>
              </defs>
              {/* Left connections */}
              <line x1="100" y1="80" x2="250" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
              <line x1="100" y1="150" x2="250" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
              <line x1="100" y1="220" x2="250" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
              {/* Right connections */}
              <line x1="500" y1="80" x2="350" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
              <line x1="500" y1="150" x2="350" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
              <line x1="500" y1="220" x2="350" y2="150" stroke="url(#lineGrad)" strokeWidth="2" />
            </svg>

            {/* Left Integration Badges */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">◆</span>
                <span className="text-sm font-medium">Overlay</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">▤</span>
                <span className="text-sm font-medium">DataStack</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">◎</span>
                <span className="text-sm font-medium">NeuroLink</span>
              </div>
            </div>

            {/* Central Orb */}
            <div className="absolute flex items-center justify-center">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl shadow-purple-500/50 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>

            {/* Right Integration Badges */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">⚙</span>
                <span className="text-sm font-medium">PixelGrid</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">☀</span>
                <span className="text-sm font-medium">Brightly</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xl">◈</span>
                <span className="text-sm font-medium">StratoLink</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 text-sm mb-8">Join product and engineering leaders on the cutting edge</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-white/40 text-sm font-medium">
                Logoipsum Brand {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Where Innovation Meets the Written Word</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Powerful tools designed to help you create, collaborate, and bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "AI-Powered", desc: "Harness the power of artificial intelligence" },
              { title: "Real-time Collab", desc: "Work together seamlessly in real-time" },
              { title: "Analytics", desc: "Track performance with detailed insights" },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition bg-white/5 hover:bg-white/10">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How We Make It Happen</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Discover & Define", desc: "We learn your goals and shape a clear direction" },
              { num: "02", title: "Design & Build", desc: "We craft every pixel with precision" },
              { num: "03", title: "Launch & Scale", desc: "We ship and grow with you" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold text-purple-500 mb-4">{step.num}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Real Stories. Real Results.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Transformed our workflow completely.", author: "Sarah Chen", role: "CEO, Lumina" },
              { quote: "Exceptional quality and service.", author: "James Holt", role: "Founder, Northgate" },
              { quote: "Highly recommend to everyone.", author: "Elena Rossi", role: "Director, Atlas" },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-xl border border-white/10 bg-white/5">
                <p className="text-white/80 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400">40%</div>
              <p className="text-white/60 mt-2">Performance Improvement</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">10K+</div>
              <p className="text-white/60 mt-2">Happy Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">50+</div>
              <p className="text-white/60 mt-2">Integrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Simple Pricing</h2>

          <div className="max-w-md mx-auto p-8 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <div className="text-5xl font-bold text-purple-400 mb-8">$299<span className="text-lg text-white/60">/mo</span></div>

            <ul className="text-left space-y-4 mb-8">
              {["Unlimited projects", "AI-powered tools", "Real-time collaboration", "Advanced analytics", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <span className="text-purple-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              { q: "How do I get started?", a: "Sign up for an account and start building right away." },
              { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial for all plans." },
              { q: "Can I cancel anytime?", a: "Of course, no contracts or hidden fees." },
              { q: "What about support?", a: "We offer 24/7 support via email and live chat." },
            ].map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-white/10 transition"
                >
                  {faq.q}
                  <span>{activeAccordion === i ? "−" : "+"}</span>
                </button>
                {activeAccordion === i && (
                  <div className="px-6 py-4 border-t border-white/10 text-white/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Latest from our blog</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Future of Web Development", date: "March 15, 2025" },
              { title: "Building Better User Experiences", date: "March 10, 2025" },
              { title: "Performance Tips and Tricks", date: "March 5, 2025" },
            ].map((post, i) => (
              <Link key={i} href="#" className="group">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                  <p className="text-white/60 text-sm mb-3">{post.date}</p>
                  <h3 className="text-xl font-semibold group-hover:text-purple-400 transition">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Boost creativity. Maximize efficiency.</h2>
          <p className="text-xl text-white/60 mb-8">Join thousands of professionals building amazing things</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition">
              Start for Free
            </button>
            <button className="px-8 py-3 rounded-lg border border-white/30 text-white font-semibold hover:border-white/60 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#">Features</Link></li>
                <li><Link href="#">Pricing</Link></li>
                <li><Link href="#">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#">Docs</Link></li>
                <li><Link href="#">API</Link></li>
                <li><Link href="#">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
            <p>&copy; 2025 Gilberto. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
