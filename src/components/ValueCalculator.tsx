"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const DEFAULT_TRAFFIC = 50000;
const DEFAULT_CONVERSION = 2.5;
const DEFAULT_AOV = 120;

function generateChartData(traffic: number, conversion: number, aov: number) {
  const data = [];
  const baseLeads = (traffic * (conversion / 100)) / 12;
  for (let i = 0; i <= 12; i++) {
    const growth = 1 + (i * 0.08);
    data.push({
      month: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i % 12] ?? "J",
      value: Math.round(baseLeads * growth * (aov / 100)),
      full: Math.round(baseLeads * growth),
    });
  }
  return data;
}

export function ValueCalculator() {
  const [traffic, setTraffic] = useState(DEFAULT_TRAFFIC);
  const [conversion, setConversion] = useState(DEFAULT_CONVERSION);
  const [aov, setAov] = useState(DEFAULT_AOV);

  const chartData = useMemo(
    () => generateChartData(traffic, conversion, aov),
    [traffic, conversion, aov]
  );

  const monthlyLeads = Math.round((traffic * (conversion / 100)) / 12);
  const estimatedRevenue = Math.round(monthlyLeads * aov);
  const uplift = Math.round(((conversion - 1.5) / 1.5) * 100);

  const formatTraffic = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
  const formatPct = (v: number) => `${v.toFixed(1)}%`;

  return (
    <section
      className="value-calculator-section flex min-h-screen w-full flex-col items-center justify-center bg-[#080808] px-4 py-12 md:py-16"
      aria-labelledby="calculator-heading"
    >
      <div className="flex w-full max-w-4xl flex-col gap-8 md:gap-10">
        <header className="text-center">
          <span className="mb-2 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-xs text-gray-400">
            ROI Calculator
          </span>
          <h2
            id="calculator-heading"
            className="text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            Estimate your growth potential
          </h2>
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Adjust the sliders to see projected impact.
          </p>
        </header>

        <div className="flex flex-col gap-8 md:gap-10">
          {/* Sliders — top on mobile */}
          <div className="flex flex-col gap-6 rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
            <div className="flex flex-col gap-2">
              <label className="flex min-h-[44px] items-center justify-between gap-2">
                <span className="truncate text-xs text-gray-400 md:text-sm">
                  Monthly traffic
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums text-white md:text-base">
                  {formatTraffic(traffic)}
                </span>
              </label>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="h-2 w-full min-w-0 appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                aria-valuemin={5000}
                aria-valuemax={200000}
                aria-valuenow={traffic}
                aria-valuetext={`${formatTraffic(traffic)} visitors`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex min-h-[44px] items-center justify-between gap-2">
                <span className="truncate text-xs text-gray-400 md:text-sm">
                  Conversion rate
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums text-white md:text-base">
                  {formatPct(conversion)}
                </span>
              </label>
              <input
                type="range"
                min={0.5}
                max={8}
                step={0.1}
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="h-2 w-full min-w-0 appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                aria-valuemin={0.5}
                aria-valuemax={8}
                aria-valuenow={conversion}
                aria-valuetext={formatPct(conversion)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex min-h-[44px] items-center justify-between gap-2">
                <span className="truncate text-xs text-gray-400 md:text-sm">
                  Avg. order value
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums text-white md:text-base">
                  ${aov}
                </span>
              </label>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="h-2 w-full min-w-0 appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                aria-valuemin={20}
                aria-valuemax={500}
                aria-valuenow={aov}
                aria-valuetext={`$${aov}`}
              />
            </div>
          </div>

          {/* KPIs + Chart — below sliders, single column */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <motion.div
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-center md:p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-gray-400 md:text-sm">Leads/mo</p>
                <p className="mt-1 text-sm font-bold tabular-nums text-white md:text-xl">
                  {monthlyLeads.toLocaleString()}
                </p>
              </motion.div>
              <motion.div
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-center md:p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <p className="text-xs text-gray-400 md:text-sm">Est. revenue</p>
                <p className="mt-1 text-sm font-bold tabular-nums text-white md:text-xl">
                  ${(estimatedRevenue / 1000).toFixed(1)}k
                </p>
              </motion.div>
              <motion.div
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-center md:p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="text-xs text-gray-400 md:text-sm">Uplift</p>
                <p className="mt-1 text-sm font-bold tabular-nums text-white md:text-xl">
                  {uplift > 0 ? `+${uplift}%` : `${uplift}%`}
                </p>
              </motion.div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
              <p className="mb-3 text-xs text-gray-400 md:text-sm">
                Projected value (12 months)
              </p>
              <div className="h-[160px] w-full min-w-0 md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="valueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgba(255,255,255,0.4)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(255,255,255,0.06)"
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#9ca3af", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#9ca3af", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#0d0d0d",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8,
                        color: "#fff",
                        fontSize: 12,
                      }}
                      formatter={(value) => [
                        `$${(Number(value) / 1000).toFixed(1)}k`,
                        "Value",
                      ]}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                      fill="url(#valueGradient)"
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
