"use client";

import { useState, useEffect, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { contactCta } from "@/lib/content";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const isFormConfigured = Boolean(FORMSPREE_ENDPOINT);

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function ContactCTA() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    console.log("Endpoint:", FORMSPREE_ENDPOINT);
  }, []);

  function validate(name: string, email: string, message: string) {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
    if (!message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setFormState({ status: "error", message: "Contact form is not configured yet." });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";

    if (!validate(name, email, message)) return;

    setFormState({ status: "loading" });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState({ status: "success" });
        form.reset();
        setErrors({});
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn("[Contact form] Non-OK response:", res.status, res.statusText);
        }
        const data = (await res.json().catch(() => null)) as {
          error?: string;
          errors?: Array<{ message?: string }>;
        } | null;
        const errorMessage =
          data?.error ?? data?.errors?.[0]?.message ?? "Something went wrong. Please try again.";
        setFormState({ status: "error", message: errorMessage });
      }
    } catch {
      setFormState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  if (formState.status === "success") {
    return (
      <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] py-28">
        <Container className="max-w-4xl text-center">
          <FadeInUp useViewport>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              {contactCta.headline}
            </h2>
            <p className="mt-6 text-lg text-[var(--accent)]">
              {contactCta.successMessage}
            </p>
            <p className="mt-16 text-xs text-[var(--muted)]">
              {contactCta.footerLine}
            </p>
          </FadeInUp>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container className="max-w-4xl">
        <FadeInUp useViewport>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          {contactCta.headline}
        </h2>
        <p className="mt-6 text-lg text-[var(--muted)]">
          {contactCta.formSubtext}
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              disabled={formState.status === "loading"}
              className="w-full rounded-sm border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              disabled={formState.status === "loading"}
              className="w-full rounded-sm border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              disabled={formState.status === "loading"}
              className="w-full resize-y rounded-sm border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
              placeholder="Tell us about your project..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {!isFormConfigured && (
            <p className="text-sm text-[var(--muted)]">
              Contact form is not configured yet.
            </p>
          )}

          {formState.status === "error" && formState.message && (
            <p className="text-sm text-red-400">{formState.message}</p>
          )}

          <button
            type="submit"
            disabled={formState.status === "loading" || !isFormConfigured}
            className="rounded-sm border border-[var(--accent)] bg-[var(--accent)]/10 px-8 py-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {formState.status === "loading" ? "Sending…" : contactCta.submitLabel}
          </button>
        </form>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 text-xs text-[var(--muted)]">
            Debug endpoint loaded: {FORMSPREE_ENDPOINT ? "YES" : "NO"}
          </p>
        )}

        <p className="mt-16 text-xs text-[var(--muted)]">
          {contactCta.footerLine}
        </p>
        </FadeInUp>
      </Container>
    </section>
  );
}
