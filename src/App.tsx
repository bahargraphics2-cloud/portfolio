/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Star, 
  ChevronDown,
  Layout,
  Palette,
  Share2,
  Box,
  ExternalLink,
  Globe
} from 'lucide-react';
import React, { useRef, useEffect, useState, ReactNode, MouseEvent } from 'react';

// --- Components ---

const MagneticButton = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-brand-yellow">
      {count}{suffix}
    </span>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <div className="h-[1px] w-12 bg-brand-yellow" />
      <span className="editorial-label text-brand-yellow">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-7xl text-luxury"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'glass-nav py-6' : 'py-10'}`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-display font-black text-brand-yellow tracking-tighter"
        >
          SB.
        </motion.div>
        
        <div className="hidden md:flex items-center gap-12">
          {['About', 'Work', 'Services', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="editorial-label hover:text-brand-yellow transition-colors opacity-100"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <MagneticButton>
            <a href="#contact" className="btn-pill btn-yellow">
              Hire Me
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <motion.div style={{ y }} className="container mx-auto px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            <span className="editorial-label opacity-100">Available for international projects</span>
          </div>
          
          <h1 className="text-7xl md:text-[120px] leading-[0.95] text-luxury mb-10 font-normal">
            I Design Brands<br />
            <span className="text-brand-yellow italic">That Sell.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-14 font-light leading-relaxed">
            Senior Graphic Designer with 4+ years of expertise in high-end branding, packaging, and social strategy for global markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <MagneticButton>
              <a href="#work" className="btn-pill btn-yellow flex items-center gap-3 group px-10 py-5">
                View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="btn-pill btn-outline px-10 py-5">
                Let's Talk &rarr;
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-10 flex flex-col items-center gap-4"
      >
        <span className="editorial-label opacity-40">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-4 h-4 text-brand-yellow" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: 50, suffix: "+", label: "Projects" },
    { value: 4, suffix: "+", label: "Years Exp" },
    { value: 30, suffix: "+", label: "Clients" },
    { value: 3, suffix: "", label: "Countries" },
  ];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 section-divider">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="editorial-label mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              <span className="editorial-label opacity-100">Available for work</span>
            </div>
            <h2 className="text-4xl md:text-7xl text-luxury mb-10 leading-tight">Crafting Visual Stories Since 2020.</h2>
            <div className="space-y-8 text-white/60 font-light leading-relaxed text-xl">
              <p>
                I'm Sajid Bahar, a Pakistan-based Graphic Designer with a passion for creating high-end visual identities that resonate with global audiences.
              </p>
              <p>
                With over 4 years of experience, I've helped businesses in the UK, USA, and UAE transform their presence through strategic branding, luxury packaging, and high-impact social media design.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] relative z-10 overflow-hidden border border-brand-yellow/20 p-1 bg-white/5">
              <img 
                src="https://picsum.photos/seed/designer/800/1000" 
                alt="Sajid Bahar" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full border border-brand-yellow/10 z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Logo Design",
      desc: "Distinctive marks for premium brands."
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Branding",
      desc: "Comprehensive identity systems."
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Media",
      desc: "High-conversion visual content."
    },
    {
      icon: <Box className="w-8 h-8" />,
      title: "Packaging",
      desc: "Visual storytelling on every shelf."
    }
  ];

  return (
    <section id="services" className="py-32 bg-white/[0.01]">
      <div className="container mx-auto px-10">
        <SectionTitle title="What I Do Best" subtitle="Expertise" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-editorial group"
            >
              <div className="text-brand-yellow mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="editorial-label opacity-100 text-sm mb-3">{service.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Al Latif Passenger Transport",
      category: "Brand Identity",
      desc: "Comprehensive visual identity and branding for a premium passenger transport service.",
      image: "https://storage.googleapis.com/static-assets-public/ais-pre-qfqnd32updw5vunzwad3yu-457071126319.asia-southeast1.run.app/attachments/67ff396d-888e-496e-827c-633119053805.png",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      title: "SAS Travel Agency",
      category: "Brand Identity",
      desc: "Modern brand system for a UK-based travel agency.",
      image: "https://picsum.photos/seed/travel/800/600",
      span: ""
    },
    {
      title: "Baryal Perfume",
      category: "Packaging Design",
      desc: "Luxury packaging for a high-end fragrance line.",
      image: "https://picsum.photos/seed/perfume/800/600",
      span: ""
    },
    {
      title: "FitCore Campaign",
      category: "Social Media",
      desc: "Instagram campaign for a fitness lifestyle brand.",
      image: "https://picsum.photos/seed/fitness/800/600",
      span: ""
    },
    {
      title: "NRG Energy Drink",
      category: "Branding + Packaging",
      desc: "Bold brand identity and can design.",
      image: "https://picsum.photos/seed/energy/800/1000",
      span: "md:row-span-2"
    }
  ];

  return (
    <section id="work" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-10">
        <SectionTitle title="Selected Work" subtitle="Portfolio" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden border border-white/10 bg-white/5 p-1 ${project.span}`}
            >
              <div className="w-full h-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="editorial-label text-brand-yellow mb-3">{project.category}</span>
                  <h3 className="text-3xl font-display mb-4 leading-tight">{project.title}</h3>
                  <p className="text-sm text-white/60 mb-8 line-clamp-2 font-light">{project.desc}</p>
                  <div className="flex items-center gap-3 text-brand-yellow text-xs font-bold uppercase tracking-widest">
                    View Project <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: "Photoshop", level: 95 },
    { name: "Illustrator", level: 92 },
    { name: "Brand Identity", level: 90 },
    { name: "Packaging Design", level: 88 },
    { name: "Social Media Design", level: 93 },
  ];

  return (
    <section className="py-32 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <SectionTitle title="Tools & Expertise" subtitle="Skills" />
        
        <div className="max-w-3xl space-y-12">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mb-4">
                <span className="text-sm uppercase tracking-widest font-medium">{skill.name}</span>
                <span className="text-brand-yellow font-display">{skill.level}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                  className="h-full bg-brand-yellow shadow-[0_0_10px_rgba(245,197,24,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "James Whitfield",
      location: "London, UK",
      role: "Founder, Verity Co.",
      quote: "Sajid transformed our brand completely. Our website traffic doubled and clients started taking us more seriously. Exceptional work."
    },
    {
      name: "Rachel Monroe",
      location: "New York, USA",
      role: "Marketing Director",
      quote: "One of the most talented designers I've worked with. Fast, professional, and truly understands what makes a brand stand out."
    },
    {
      name: "Ali Hassan",
      location: "Dubai, UAE",
      role: "E-commerce Entrepreneur",
      quote: "The packaging Sajid designed for our product line helped us secure retail shelf space. Worth every penny."
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <SectionTitle title="What Clients Say" subtitle="Testimonials" />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 rounded-3xl bg-white/[0.03] border border-white/5 relative"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />)}
              </div>
              <p className="text-xl font-display italic mb-12 leading-relaxed">"{t.quote}"</p>
              <div>
                <h4 className="font-bold text-brand-yellow">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">{t.role} • {t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <SectionTitle title="Let's Build Something Great" subtitle="Contact" />
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-md">
              Currently available for freelance projects. Based in Pakistan, working globally.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <MagneticButton>
              <a href="mailto:sajidbahar@email.com" className="w-full flex items-center justify-between p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-yellow/50 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-display">Email Me</span>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="https://wa.me/923001234567" className="w-full flex items-center justify-between p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-yellow/50 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-display">WhatsApp</span>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="https://fiverr.com/sajidbahar" className="w-full flex items-center justify-between p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-yellow/50 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-display">Hire on Fiverr</span>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-display font-black text-brand-yellow tracking-tighter">
            SB.
          </div>
          
          <p className="editorial-label">
            &copy; 2025 Sajid Bahar &mdash; Based in Pakistan, Working Globally
          </p>
          
          <div className="flex items-center gap-8">
            {[
              { label: "Behance", url: "#" },
              { label: "LinkedIn", url: "#" },
              { icon: <Instagram className="w-5 h-5" />, url: "#" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                className="editorial-label hover:text-brand-yellow transition-colors opacity-100"
              >
                {social.label || social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
