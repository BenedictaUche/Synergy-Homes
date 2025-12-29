"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
// import { teamMembers } from "@/lib/data"
import { Target, Eye, Heart, Award, Users, Building } from "lucide-react"
import { TeamMember } from "@/sanity/sanity.types"

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We conduct our business with the highest ethical standards, ensuring transparency in every transaction.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from property selection to client service.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Our clients' needs are at the heart of every decision we make.",
  },
  {
    icon: Building,
    title: "Innovation",
    description: "We embrace innovation to deliver cutting-edge solutions in real estate.",
  },
]

const milestones = [
  { year: "2005", event: "Founded in Lagos with a vision to transform luxury real estate" },
  { year: "2010", event: "Expanded operations to Abuja and Port Harcourt" },
  { year: "2015", event: "Launched investment advisory services" },
  { year: "2018", event: "Celebrated ₦25 billion in total transactions" },
  { year: "2021", event: "Opened new flagship office in Victoria Island" },
  { year: "2024", event: "Reached ₦50 billion milestone in property transactions" },
]

export function AboutContent({ teamMembers }: { teamMembers: TeamMember[] }) {

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR STORY</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              A Legacy of
              <span className="text-primary font-medium"> Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For nearly two decades, Synergy Homes Limited has been the premier destination for luxury real estate in
              Nigeria, setting the standard for excellence in property services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="/luxury-real-estate-office-interior-with-elegant-de.jpg"
                  alt="Synergy Homes Limited Office"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Our
                <span className="text-primary font-medium"> Journey</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Synergy Homes Limited was founded in 2020 with a singular vision: to redefine the luxury real estate
                  experience in Nigeria. What began as a small team of passionate professionals has grown into the
                  nation's most trusted name in premium property services.
                </p>
                <p>
                  Our founder, Mr. Alexander Ekwueme Onyekwere, recognized a gap in the market for truly world-class real estate
                  services that could meet the sophisticated needs of high-net-worth individuals and families. With
                  decades of industry experience, he assembled a team of experts dedicated to delivering exceptional
                  results.
                </p>
                <p>
                  Today, we manage a portfolio of over ₦50 million in property transactions and serve an exclusive
                  clientele across Nigeria and beyond. Our success is built on unwavering commitment to integrity,
                  excellence, and personalized service.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-12 bg-background border border-border"
            >
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-light mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide exceptional real estate services that exceed client expectations, delivering unparalleled
                value through expertise, integrity, and personalized attention. We are committed to helping our clients
                find their perfect property and make informed investment decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 lg:p-12 bg-background border border-border"
            >
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-light mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be Africa's most trusted luxury real estate company, setting the standard for excellence in property
                services. We envision a future where every client experiences the highest level of professionalism and
                achieves their real estate aspirations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-light">
              What We
              <span className="text-primary font-medium"> Stand For</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-card border border-border"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center border border-primary/30 text-primary mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-light">
              Key
              <span className="text-primary font-medium"> Milestones</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-2xl font-light text-primary">{milestone.year}</span>
                </div>
                <div className="relative flex-1 pb-8 border-l border-border pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 -translate-x-[7px] bg-primary" />
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] mb-4 block">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-light">
              Meet The
              <span className="text-primary font-medium"> Leadership</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Our experienced leadership team brings together decades of expertise in real estate, finance, and business
              management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {(teamMembers as TeamMember[]).map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-4">
                  <img
                    src={(member as any)?.imageUrl || "/placeholder.svg"}
                    alt={member.name || "Team member"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.position}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
