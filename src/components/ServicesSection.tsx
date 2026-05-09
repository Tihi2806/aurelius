const SERVICES = [
  {
    num: "01",
    name: "Counsel",
    description: "Strategy, audit, positioning. Before we design, we understand.",
    duration: "1 week",
  },
  {
    num: "02",
    name: "Form",
    description: "Wireframes → Figma mockups. Two rounds. No surprises.",
    duration: "2 weeks",
  },
  {
    num: "03",
    name: "Craft",
    description: "Development. Next.js or Webflow. Tested. Fast. Accessible.",
    duration: "2–3 weeks",
  },
  {
    num: "04",
    name: "Care",
    description: "Post-launch stewardship. Monthly. Cancelable.",
    duration: "From £150/mo",
  },
];

export function ServicesSection() {
  return (
    <section
      className="services-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      data-animated="false"
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="text-left">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            SERVICES
          </p>
          <h2
            className="mt-3 text-[36px] font-normal leading-tight text-white md:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
              fontWeight: 400,
            }}
          >
            What we do.
          </h2>
        </header>

        <div className="mt-20 border-b border-[#262626]">
          {SERVICES.map((service) => (
            <article
              key={service.num}
              className="service-block grid grid-cols-1 gap-y-3 border-t border-[#262626] py-10 md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:py-14"
            >
              <span
                className="font-mono text-[12px] tracking-[0.18em] text-[#B8935A] md:col-span-2 md:pt-3"
              >
                {service.num}
              </span>
              <h3
                className="text-[36px] font-normal leading-[1.05] text-white md:col-span-5 md:text-[44px]"
                style={{
                  fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                  fontWeight: 400,
                }}
              >
                {service.name}
              </h3>
              <div className="md:col-span-5 md:pt-4">
                <p
                  className="max-w-md text-[15px] leading-relaxed text-[#a3a3a3]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {service.description}
                </p>
                <p
                  className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {service.duration}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-[#262626] pt-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              Selected clients available on request.
            </p>
            <a
              href="#work"
              className="text-[13px] text-white no-underline hover:underline"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              → See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
