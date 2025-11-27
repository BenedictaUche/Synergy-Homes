"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "6", suffix: "+", label: "Years of Excellence" },
  { value: "200", suffix: "+", label: "Plots Sold" },
  { value: "98", suffix: "%", label: "Client Satisfaction" },
  { value: "50", suffix: "M+", label: "Transaction Value" },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-light mb-2">
                {stat.value}
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-xs md:text-sm tracking-wider opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
