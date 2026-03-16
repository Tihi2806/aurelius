"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

const PAIN_POINTS = [
  "Not enough traffic",
  "Low conversions",
  "Outdated design",
  "No leads from site",
] as const;

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [painPoint, setPainPoint] = useState<string | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const hasLogged = useRef(false);

  const handleYes = () => setCurrentStep(1);
  const handleMaybeLater = () => setIsOpen(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) setCurrentStep(2);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setCurrentStep(3);
  };

  const handlePainPointSelect = (point: string) => {
    setPainPoint(point);
    setCurrentStep(4);
    setLoadingComplete(false);
    setTimeout(() => setLoadingComplete(true), 3000);
  };

  useEffect(() => {
    if (currentStep === 4 && loadingComplete && !hasLogged.current) {
      hasLogged.current = true;
      const data = {
        url: url.trim(),
        email: email.trim(),
        painPoint: painPoint ?? "",
        timestamp: new Date().toISOString(),
      };
      console.log(data);
    }
  }, [currentStep, loadingComplete, url, email, painPoint]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-sm rounded-xl border border-white/10 bg-[#111111]/95 shadow-[0_0_30px_rgba(255,255,255,0.07)] backdrop-blur-sm md:bottom-24 md:right-6"
            style={{ maxHeight: "calc(100vh - 6rem)" }}
          >
            <div className="flex flex-col overflow-hidden rounded-xl">
              <div className="border-b border-white/10 px-4 py-3">
                <h3 className="text-sm font-medium text-white">
                  Aurelius AI
                </h3>
                <p className="text-xs text-gray-400">30-second website audit</p>
              </div>
              <div className="flex min-h-[200px] flex-1 flex-col overflow-y-auto p-4">
                {/* Step 0 */}
                {currentStep === 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">
                      Hi! I&apos;m the Aurelius AI. Want to see a 30-second
                      audit of your current website?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleYes}
                        className="min-h-[44px] rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                      >
                        Yes, let&apos;s go
                      </button>
                      <button
                        type="button"
                        onClick={handleMaybeLater}
                        className="min-h-[44px] rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 1 — URL */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">
                      Great! What&apos;s your website URL?
                    </p>
                    <form onSubmit={handleUrlSubmit} className="flex flex-col gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="min-h-[44px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-white/20 focus:outline-none"
                        required
                        autoComplete="url"
                      />
                      <button
                        type="submit"
                        className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                      >
                        Send <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 2 — Email */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">
                      Perfect. What&apos;s your email so I can send you the full
                      report?
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aureliusweb.contact@gmail.com"
                        className="min-h-[44px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-white/20 focus:outline-none"
                        required
                        autoComplete="email"
                      />
                      <button
                        type="submit"
                        className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                      >
                        Send <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 3 — Pain point chips */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">
                      Last one — what&apos;s your biggest challenge right now?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PAIN_POINTS.map((point) => (
                        <button
                          key={point}
                          type="button"
                          onClick={() => handlePainPointSelect(point)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-white/25 hover:text-white md:min-h-[44px] md:text-sm"
                        >
                          {point}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 — Loading then success */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">
                      Got it. I&apos;m preparing your audit now. We&apos;ll be in
                      touch within 24 hours.
                    </p>
                    {!loadingComplete ? (
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-white/80"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "linear" }}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-white">
                        ✓ Audit request received. Check your inbox soon.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 md:bottom-6 md:right-6"
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
}
