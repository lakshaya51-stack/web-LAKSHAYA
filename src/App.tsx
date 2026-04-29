/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Play, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  Film, 
  Camera, 
  Clapperboard, 
  MonitorPlay, 
  Youtube, 
  Award,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageSquare
} from 'lucide-react';

// --- Types ---
type CursorType = 'default' | 'view' | 'play' | 'text' | 'magnetic';
type Page = 'home' | 'about' | 'services' | 'portfolio' | 'clients' | 'media' | 'careers' | 'contact' | 'privacy' | 'terms';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  youtubeId?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Client {
  name: string;
  logo: string;
}

interface Opening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Shadows of the Ghats",
    category: "Feature Film",
    year: "2024",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
    description: "A neo-noir thriller set in the ancient alleyways of Varanasi, exploring the thin line between myth and reality.",
    youtubeId: "dQw4w9WgXcQ" // Placeholder ID, replace with actual
  },
  {
    id: 2,
    title: "The Industrial Pulse",
    category: "Documentary",
    year: "2023",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000",
    description: "An intimate look at the lives of harbor workers during the great monsoon, capturing the relentless spirit of human labor.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Echoes of Silence",
    category: "Short Film",
    year: "2024",
    image: "https://images.unsplash.com/photo-1542204172-3c328db32155?auto=format&fit=crop&q=80&w=1000",
    description: "A dialogue-free sensory experience exploring the profound impact of isolation on the human creative spirit.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Luxury Unbound",
    category: "Branded Content",
    year: "2023",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1000",
    description: "A cinematic campaign for a leading automotive brand, redefining luxury through the lens of movement and light.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "The Last Artisan",
    category: "Documentary",
    year: "2024",
    image: "https://images.unsplash.com/photo-1459183885447-5689510d84a9?auto=format&fit=crop&q=80&w=1000",
    description: "Chronicling the extinction of master weaving techniques in remote mountain villages.",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 6,
    title: "Urban Rhapsody",
    category: "Feature Film",
    year: "2022",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c5814?auto=format&fit=crop&q=80&w=1000",
    description: "A musical journey through the heart of Mumbai, where every sound tells a story of survival and success.",
    youtubeId: "dQw4w9WgXcQ"
  }
];

const TEAM: TeamMember[] = [
  { name: "Surinder Keram", role: "Director", image: "https://i.pravatar.cc/300?u=surinder" },
  { name: "Aryan Lakshaya", role: "Founder & Creative Director", image: "https://i.pravatar.cc/300?u=aryan" },
  { name: "Sarah Jensen", role: "Head of Production", image: "https://i.pravatar.cc/300?u=sarah" },
  { name: "David Chen", role: "Director of Photography", image: "https://i.pravatar.cc/300?u=david" }
];

const NEWS: NewsItem[] = [
  { id: 1, title: "Shadows of the Ghats Premieres at Cannes", date: "May 15, 2024", category: "Festival", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Lakshaya Announces New VFX Hub in Bangalore", date: "April 22, 2024", category: "Expansion", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Collaboration with Netflix for 3-Part Docuseries", date: "March 10, 2024", category: "Project", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800" }
];

const OPENINGS: Opening[] = [
  { id: 1, title: "Senior Video Editor", department: "Post-Production", location: "Mumbai / Remote", type: "Full-Time" },
  { id: 2, title: "Creative Producer", department: "Production", location: "Mumbai", type: "Full-Time" },
  { id: 3, title: "VFX Compositor", department: "VFX", location: "Bangalore", type: "Full-Time" },
  { id: 4, title: "Graphic Designer", department: "Creative", location: "Remote", type: "Contract" }
];

const CLIENTS: Client[] = [
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Prime Video", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" },
  { name: "Rolex", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Rolex_logo.svg/1200px-Rolex_logo.svg.png" }
];

const SERVICES = [
  {
    title: "Film Production",
    description: "End-to-end production for feature films and shorts with a focus on powerful narratives.",
    icon: Clapperboard
  },
  {
    title: "Documentary Development",
    description: "Authentic storytelling that captures the essence of human experiences and global issues.",
    icon: Camera
  },
  {
    title: "Branded Content",
    description: "Cinematic visual identities for luxury brands, startups, and global enterprises.",
    icon: MonitorPlay
  },
  {
    title: "Creative Direction",
    description: "Holistic vision for projects, ensuring every frame aligns with the brand's soul.",
    icon: Film
  }
];

const WHY_US = [
  {
    title: "Story-First Approach",
    description: "Technology serves the story, not the other way around. Every frame is a narrative choice.",
    number: "01"
  },
  {
    title: "Global Production Quality",
    description: "Industry-leading gear and talent to compete on the world stage of cinema.",
    number: "02"
  },
  {
    title: "Festival-Ready Execution",
    description: "Crafting films that resonate with international juries and global audiences.",
    number: "03"
  },
  {
    title: "End-to-End Excellence",
    description: "From the first ink on script to the final DCP delivery and distribution.",
    number: "04"
  }
];

// --- Components ---

const PageReveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const HomePage = ({ setCursorType, setCurrentPage, onPlay }: { setCursorType: (t: CursorType) => void, setCurrentPage: (p: Page) => void, onPlay: (p: Project) => void }) => (
  <PageReveal>
    <Hero setCursorType={setCursorType} />
    <section className="py-32 bg-premium-black relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-8 max-w-4xl mx-auto">
          "Cinema is a matter of what's in the frame and what's out."
        </h2>
        <div className="flex items-center justify-center gap-4 text-gold uppercase tracking-[0.3em] text-[10px] font-bold">
          <div className="w-12 h-[1px] bg-gold/30" />
          <span>The Lakshaya Philosophy</span>
          <div className="w-12 h-[1px] bg-gold/30" />
        </div>
      </div>
    </section>
    
    <ServicesSection setCursorType={setCursorType} setCurrentPage={setCurrentPage} />
    
    <section className="py-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <SectionHeading number="03" title="Recent Works" subtitle="Portfolio" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} setCursorType={setCursorType} onPlay={onPlay} />
          ))}
        </div>
      </div>
    </section>

    <section className="h-[70vh] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 will-change-transform translate-z-0">
         <div className="absolute inset-0 bg-premium-black/60 z-10" />
         <img 
          src="https://images.unsplash.com/photo-1535016120720-40c646bebbbb?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale brightness-50" 
          referrerPolicy="no-referrer" 
          loading="lazy"
         />
      </div>
      <div className="container mx-auto px-6 relative z-20 text-center">
          <Magnetic scaling={0.2}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center group mb-12 mx-auto"
              onMouseEnter={() => setCursorType('play')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-premium-orange flex items-center justify-center text-premium-black group-hover:bg-white transition-colors text-center">
                <Play className="w-8 h-8 md:w-12 md:h-12 fill-current" />
              </div>
            </motion.button>
          </Magnetic>
          <h3 className="text-4xl md:text-6xl font-serif font-bold italic">Watch Showreel 2024</h3>
      </div>
    </section>

    <Testimonials />
    <HorizontalScrollLogos />
    <Contact setCursorType={setCursorType} />
  </PageReveal>
);

const AboutPage = () => (
  <PageReveal>
    <section className="pt-48 pb-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <SectionHeading number="01" title="Our Legacy" subtitle="Story" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed">
            <p>
              Founded in 2012, Lakshaya Entertainments has grown from a boutique post-production house to a powerhouse of cinematic storytelling. We believe that every frame matters and every story deserves to be told with uncompromising quality.
            </p>
            <p>
              Our team consists of visionary directors, meticulous editors, and imaginative visual effects artists who work in tandem to create experiences that transcend cultural boundaries.
            </p>
          </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1500" 
              alt="Studio Life" 
              className="w-full h-full object-cover grayscale"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mt-32">
          <SectionHeading number="02" title="The High Table" subtitle="Leadership" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-serif font-bold">{member.name}</h4>
                <p className="text-xs uppercase tracking-widest text-premium-orange font-bold mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageReveal>
);

const PortfolioPage = ({ setCursorType, onPlay }: { setCursorType: (t: CursorType) => void, onPlay: (p: Project) => void }) => {
  const [filter, setFilter] = useState('All');
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category.includes(filter));

  return (
    <PageReveal>
      <section className="pt-48 pb-32 bg-premium-black min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <SectionHeading number="01" title="The Archive" subtitle="Portfolio" />
            <div className="flex flex-wrap gap-4 mb-24">
              {['All', 'Film', 'Documentary', 'Branded'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${filter === cat ? 'bg-premium-orange border-premium-orange text-premium-black' : 'border-white/10 text-white/50 hover:border-white hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} setCursorType={setCursorType} onPlay={onPlay} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageReveal>
  );
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageReveal>
      <section className="pt-48 pb-32 bg-premium-charcoal min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading number="01" title="Technical Artistry" subtitle="Our Craft" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveTab(i)}
                  className={`w-full p-8 rounded-2xl text-left border transition-all flex items-center justify-between group ${activeTab === i ? 'bg-premium-orange border-premium-orange text-premium-black' : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <s.icon className={`w-6 h-6 ${activeTab === i ? 'text-premium-black' : 'text-premium-orange'}`} />
                    <span className="text-lg font-serif font-bold italic">{s.title}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-premium-black p-10 md:p-20 rounded-3xl border border-white/5 h-full"
                >
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-premium-orange/10 flex items-center justify-center">
                      {React.createElement(SERVICES[activeTab].icon, { className: "w-10 h-10 text-premium-orange" })}
                    </div>
                    <div>
                      <h3 className="text-4xl font-serif font-bold mb-2 italic text-gold">{SERVICES[activeTab].title}</h3>
                      <p className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Detailed Workflow</p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-white/70 font-light leading-relaxed mb-12 italic">
                    {SERVICES[activeTab].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange">Key Deliverables</h4>
                      <ul className="space-y-4">
                        {['Strategic Planning', 'Technical Execution', 'Post-Production Sync', 'Global Distribution Ready'].map(item => (
                          <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-premium-orange" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange">Tooling & Gear</h4>
                      <ul className="space-y-4">
                        {['ARRI/RED Ecosystem', 'DaVinci Resolve Studio', 'Dolby Atmos Mastering', 'Proprietary VFX Pipeline'].map(item => (
                          <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-16 pt-16 border-t border-white/5 text-center md:text-left">
                     <button className="px-10 py-4 bg-premium-orange text-premium-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all text-sm">
                        Request Consultation
                     </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-premium-black">
        <div className="container mx-auto px-6">
            <SectionHeading number="02" title="How We Create" subtitle="Workflow" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Concept", desc: "Script development and visionary brainstorming.", step: "01" },
                { title: "Pre-Prod", desc: "Casting, location scouting, and storyboarding.", step: "02" },
                { title: "Production", desc: "Principal photography with world-class gear.", step: "03" },
                { title: "Post-Prod", desc: "Editing, VFX, and cinematic sound design.", step: "04" }
              ].map((p, i) => (
                <div key={p.title} className="relative group p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-6xl font-serif font-bold italic opacity-[0.03] absolute top-4 right-4 group-hover:opacity-10 transition-opacity">{p.step}</span>
                  <h4 className="text-xl font-serif font-bold italic mb-4 text-gold">{p.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
    </PageReveal>
  );
};

const CareersPage = () => (
  <PageReveal>
    <section className="pt-48 pb-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <SectionHeading number="01" title="Join the Vision" subtitle="Careers" />
        <div className="max-w-3xl mb-24">
          <p className="text-2xl font-serif italic text-white/60">
            We are always looking for rebels, dreamers, and master craftsmen who believe that "good enough" is the enemy of excellence.
          </p>
        </div>

        <div className="space-y-4">
          {OPENINGS.map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-premium-orange text-white hover:text-premium-black transition-all cursor-pointer flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-premium-orange group-hover:text-premium-black mb-2 block">{job.department}</span>
                <h3 className="text-2xl font-serif font-bold">{job.title}</h3>
              </div>
              <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 flex-shrink-0">
                <span>{job.location}</span>
                <span>{job.type}</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageReveal>
);

const MediaPage = () => (
  <PageReveal>
    <section className="pt-48 pb-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <SectionHeading number="01" title="In The Spotlight" subtitle="Pressroom" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {NEWS.map((item, i) => (
            <motion.div key={item.id} className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-premium-orange text-premium-black text-[8px] font-bold uppercase tracking-widest rounded-full">
                  {item.category}
                </div>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 mb-2 uppercase">{item.date}</p>
              <h3 className="text-xl font-serif font-bold group-hover:text-premium-orange transition-colors italic">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageReveal>
);

const ClientsPage = () => (
  <PageReveal>
    <section className="pt-48 pb-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <SectionHeading number="01" title="Trusted Partners" subtitle="Network" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {CLIENTS.concat(CLIENTS).concat(CLIENTS).map((client, i) => (
            <div key={i} className="bg-premium-black p-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:bg-white/5 group">
              <img 
                src={client.logo} 
                alt={client.name} 
                className="w-full max-w-[100px] opacity-20 group-hover:opacity-100 transition-opacity invert" 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageReveal>
);

const LegalPage = ({ title }: { title: string }) => (
  <PageReveal>
    <section className="pt-48 pb-32 bg-premium-black min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-serif font-bold mb-16 italic">{title}</h1>
        <div className="prose prose-invert prose-orange max-w-none space-y-8 text-white/60 font-light leading-relaxed">
          <p>
            Welcome to LAKSHAYA ENTERTAINMENTS PVT. LTD. Your privacy and the integrity of our services are paramount. This document outlines our practices and terms regarding your use of our cinematic assets and digital presence.
          </p>
          <h3 className="text-white font-serif text-2xl mt-12 mb-4 italic">1. Intellectual Property</h3>
          <p>
            All content hosted on this site, including but not limited to trailers, behind-the-scenes footage, scripts, and visual concepts, remains the sole property of Lakshaya Entertainments and is protected by international copyright laws.
          </p>
          <h3 className="text-white font-serif text-2xl mt-12 mb-4 italic">2. Use of Information</h3>
          <p>
            Information collected via our contact forms is used strictly for internal collaboration and is never shared with third-party agencies without explicit creative consent.
          </p>
        </div>
      </div>
    </section>
  </PageReveal>
);

const Footer = ({ setCursorType, setCurrentPage }: { setCursorType: (t: CursorType) => void, setCurrentPage: (p: Page) => void }) => {
  const handleLinkClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-premium-black pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div 
              className="text-3xl font-serif font-bold cursor-pointer"
              onClick={() => handleLinkClick('home')}
            >
              LAKSHAYA<span className="text-gold">.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              A premium production house crafting bold cinema and original stories for global audiences.
            </p>
            <div className="flex gap-4">
              <Magnetic scaling={0.5}>
                <a 
                  href="https://youtube.com/channel/UCwKnAd8flImld54lUP_TpBw" 
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-premium-orange hover:text-premium-orange transition-all"
                  onMouseEnter={() => setCursorType('magnetic')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </Magnetic>
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <Magnetic key={i} scaling={0.5}>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-premium-orange hover:text-premium-orange transition-all"
                    onMouseEnter={() => setCursorType('magnetic')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['About', 'Services', 'Portfolio', 'Clients', 'Careers', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleLinkClick(item.toLowerCase() as Page)}
                  className="text-white/40 hover:text-white transition-colors text-left text-sm uppercase tracking-widest font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange mb-8">Studio</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="w-4 h-4 text-white/40 mt-1" />
                <p className="text-white/40 text-sm">K-18, Green Park Extension,<br />New Delhi-110016, India</p>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="w-4 h-4 text-white/40 mt-1" />
                <p className="text-white/40 text-sm italic">+91 9711187316</p>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="w-4 h-4 text-white/40 mt-1" />
                <p className="text-white/40 text-sm italic">lakshaya51@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange mb-8">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">Stay updated with our latest productions and news.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/5 border-b border-white/10 py-3 text-xs focus:outline-none focus:border-premium-orange transition-colors uppercase tracking-widest"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-premium-orange">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20">
            © 2024 M/S. LAKSHAYA ENTERTAINMENTS PVT. LTD. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/20">
            <button onClick={() => handleLinkClick('privacy')} className="hover:text-premium-orange transition-colors">Privacy Policy</button>
            <button onClick={() => handleLinkClick('terms')} className="hover:text-premium-orange transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PARTNERS = [
  "Cinelust", "Aether Films", "Nova Studios", "Lumina Works", "Spectre Media", "Vanguard Cine", 
  "Cinelust", "Aether Films", "Nova Studios", "Lumina Works", "Spectre Media", "Vanguard Cine"
];

const HorizontalScrollLogos = () => {
  return (
    <div className="py-20 border-y border-white/5 overflow-hidden">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 items-center whitespace-nowrap opacity-10 filter grayscale will-change-transform"
      >
        {[...PARTNERS, ...PARTNERS].map((name, i) => (
          <div key={`${name}-${i}`} className="text-3xl font-serif font-bold tracking-[0.2em] uppercase">
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CustomCursor = ({ type = 'default' }: { type?: CursorType }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Outer ring trail with delay/spring
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.2 });
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.2 });
  
  // Inner dot (faster)
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 250, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 250, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const isInteractive = type !== 'default';

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-gold/40 pointer-events-none z-max flex items-center justify-center mix-blend-difference will-change-transform"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: type === 'view' || type === 'play' ? 2.2 : isInteractive ? 1.5 : 1,
          opacity: type === 'text' ? 0 : 1,
          backgroundColor: type === 'view' || type === 'play' ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {type === 'view' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[6px] font-bold tracking-[0.2em] text-gold uppercase text-center px-2"
            >
              View Project
            </motion.span>
          )}
          {type === 'play' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[6px] font-bold tracking-[0.2em] text-gold uppercase text-center px-2"
            >
              Play Reel
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-max block mix-blend-difference shadow-[0_0_10px_rgba(212,175,55,0.8)] will-change-transform"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isInteractive ? 0.2 : 1,
          opacity: type === 'text' ? 0.1 : 1
        }}
      />

      {/* Ambient Glow - Simplified for performance */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-80 pointer-events-none z-0 block"
        style={{ 
          x: ringX, 
          y: ringY, 
          translateX: '-50%', 
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: isInteractive ? 1.5 : 1,
          opacity: isInteractive ? 0.8 : 0.4
        }}
      />
    </>
  );
};

const Magnetic = ({ children, scaling = 0.3 }: { children: React.ReactNode, scaling?: number, key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * scaling;
    const y = (clientY - (top + height / 2)) * scaling;
    setPosition({ x, y });
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
    >
      {children}
    </motion.div>
  );
};

const Navbar = ({ setCursorType, setCurrentPage, currentPage }: { setCursorType: (t: CursorType) => void, setCurrentPage: (p: Page) => void, currentPage: Page }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, page: Page }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Portfolio', page: 'portfolio' },
    { name: 'About', page: 'about' },
    { name: 'Services', page: 'services' },
    { name: 'Clients', page: 'clients' },
    { name: 'Careers', page: 'careers' },
    { name: 'Contact', page: 'contact' }
  ];

  const handleLinkClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-premium-black/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Magnetic scaling={0.2}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-serif font-bold tracking-tighter cursor-pointer whitespace-nowrap"
            onMouseEnter={() => setCursorType('magnetic')}
            onMouseLeave={() => setCursorType('default')}
            onClick={() => handleLinkClick('home')}
          >
            LAKSHAYA<span> ENTERTAINMENTS</span><span className="text-gold">.</span>
          </motion.div>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <Magnetic key={link.name} scaling={0.4}>
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleLinkClick(link.page)}
                className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-all block py-2 ${currentPage === link.page ? 'text-premium-orange' : 'text-white/60 hover:text-white'}`}
                onMouseEnter={() => setCursorType('magnetic')}
                onMouseLeave={() => setCursorType('default')}
              >
                {link.name}
              </motion.button>
            </Magnetic>
          ))}
          <Magnetic scaling={0.2}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => handleLinkClick('contact')}
              className="px-6 py-2 border border-premium-orange/40 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-premium-orange hover:text-premium-black transition-all"
              onMouseEnter={() => setCursorType('magnetic')}
              onMouseLeave={() => setCursorType('default')}
            >
              Start Project
            </motion.button>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Magnetic scaling={0.5}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Magnetic>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-premium-black z-[100] flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="text-xl font-serif font-bold">LAKSHAYA<span className="text-gold">.</span></div>
              <button onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button 
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-4xl font-serif text-left hover:text-premium-orange transition-colors ${currentPage === link.page ? 'text-premium-orange' : 'text-white'}`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Get in touch</p>
              <p className="text-lg font-medium">lakshaya51@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setCursorType }: { setCursorType: (t: CursorType) => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Cinematic Background */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0 will-change-transform translate-z-0"
      >
        <div className="absolute inset-0 bg-linear-to-b from-premium-black/80 via-transparent to-premium-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinematic gear"
          className="w-full h-full object-cover grayscale brightness-50"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Premium Production House</span>
          </motion.div>
          
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] tracking-tighter mb-8 will-change-transform uppercase"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            Lakshaya <br />
            <span className="italic font-normal text-gold-gradient">Entertainments</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-light leading-relaxed">
            Lakshaya Entertainments crafts bold cinema, original stories, and premium visual experiences for global audiences.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Magnetic scaling={0.15}>
              <button 
                className="group relative flex items-center gap-3 px-8 py-4 bg-premium-orange text-premium-black rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden transition-all"
                onMouseEnter={() => setCursorType('magnetic')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span className="relative z-10">View Our Work</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform" />
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </Magnetic>
            
            <Magnetic scaling={0.15}>
              <button 
                className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest hover:border-premium-orange hover:text-premium-orange transition-all"
                onMouseEnter={() => setCursorType('play')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Play className="w-4 h-4 fill-white group-hover:fill-premium-orange" />
                <span>Watch Reel</span>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium vertical-text">Scroll</span>
        <div className="w-[1px] h-12 bg-linear-to-b from-premium-orange to-transparent" />
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ number, title, subtitle }: { number: string, title: string, subtitle: string }) => (
  <div className="mb-20">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <span className="text-gold font-mono text-sm tracking-widest">{number}</span>
      <div className="w-12 h-[1px] bg-gold/30" />
      <span className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">{subtitle}</span>
    </motion.div>
    <h2 className="text-6xl md:text-7xl font-serif font-bold tracking-tight">
      {title}
    </h2>
  </div>
);

const ProjectCard = ({ project, index, setCursorType, onPlay }: { project: Project, index: number, setCursorType: (t: CursorType) => void, onPlay?: (p: Project) => void, key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative cursor-pointer overflow-hidden aspect-[3/4] rounded-xl will-change-transform translate-z-0"
      onMouseEnter={() => {
        setCursorType(project.youtubeId ? 'play' : 'view');
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setCursorType('default');
        setIsHovered(false);
      }}
      onClick={() => project.youtubeId && onPlay?.(project)}
    >
      {/* Background Video Preview on Hover */}
      {project.youtubeId && isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&rel=0&modestbranding=1&iv_load_policy=3`}
            className="w-[400%] h-[120%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-40 grayscale blur-[2px]"
            allow="autoplay"
          />
        </motion.div>
      )}

      <img 
        src={project.image} 
        alt={project.title}
        className={`w-full h-full object-cover transition-all duration-1000 will-change-transform ${isHovered && project.youtubeId ? 'opacity-0' : 'opacity-100 group-hover:scale-105 grayscale group-hover:grayscale-0'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-linear-to-t from-premium-black/90 via-premium-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-2 block">{project.category}</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
            <span className="text-xs text-white/50 font-mono italic">{project.year}</span>
          </div>
          <motion.div 
            className="w-12 h-12 rounded-full bg-premium-orange flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            {project.youtubeId ? <Play className="w-5 h-5 text-premium-black fill-current" /> : <ArrowUpRight className="w-5 h-5 text-premium-black" />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = ({ setCursorType, setCurrentPage }: { setCursorType: (t: CursorType) => void, setCurrentPage: (p: Page) => void }) => {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-premium-charcoal">
       <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-premium-black to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading number="02" title="Our Expertise" subtitle="Capabilities" />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              whileHover={{ backgroundColor: 'rgba(255, 107, 44, 0.05)' }}
              className="p-12 bg-premium-charcoal transition-colors group cursor-pointer"
              onMouseEnter={() => setCursorType('magnetic')}
              onMouseLeave={() => setCursorType('default')}
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <service.icon className="w-10 h-10 text-premium-orange mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-premium-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-12"
          >
            <MessageSquare className="w-12 h-12 text-gold opacity-30" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif italic font-light leading-snug mb-12"
          >
            "Lakshaya doesn't just produce films; they create visual poetry. Their eye for detail and commitment to cinematic excellence is truly world-class."
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mb-4 bg-white/10">
              <img 
                src="https://i.pravatar.cc/150?u=1" 
                alt="Avatar" 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-lg font-bold tracking-tight">Vikram Singh</h4>
            <span className="text-xs text-gold uppercase tracking-widest font-bold">Independent Director, TIFF Laureate</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ setCursorType }: { setCursorType: (t: CursorType) => void }) => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <SectionHeading number="03" title="Let's Talk Story" subtitle="Collaborate" />
            <p className="text-xl text-white/50 font-light mb-12">
              Ready to bring your vision to the big screen? We collaborate with investors, OTT partners, and visionary brands.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-1">Email Us</h4>
                  <p className="text-lg font-medium">lakshaya51@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-1">Call Studio</h4>
                  <p className="text-lg font-medium">+91 9711187316</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-1">Studio Address</h4>
                  <p className="text-lg font-medium">K-18, Green Park Extension, New Delhi-11016</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-panel p-10 md:p-16 rounded-3xl"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" 
                      onFocus={() => setCursorType('text')}
                      onBlur={() => setCursorType('default')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" 
                      onFocus={() => setCursorType('text')}
                      onBlur={() => setCursorType('default')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Project Type</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none outline-none cursor-pointer"
                    onMouseEnter={() => setCursorType('magnetic')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <option>Feature Film</option>
                    <option>Documentary</option>
                    <option>Branded Content</option>
                    <option>Distribution</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    onFocus={() => setCursorType('text')}
                    onBlur={() => setCursorType('default')}
                  ></textarea>
                </div>
                <Magnetic scaling={0.1}>
                  <button 
                    className="w-full py-4 bg-premium-orange text-premium-black rounded-full font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
                    onMouseEnter={() => setCursorType('magnetic')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    Send Inquiry
                  </button>
                </Magnetic>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-premium-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
      onClick={onClose}
    >
      <button 
        className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X className="w-10 h-10" />
      </button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-6xl aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {project.youtubeId ? (
          <iframe 
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
            title={project.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 uppercase tracking-widest font-bold">
            No Video Link Available
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCursorType={setCursorType} setCurrentPage={setCurrentPage} onPlay={setSelectedProject} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'portfolio': return <PortfolioPage setCursorType={setCursorType} onPlay={setSelectedProject} />;
      case 'clients': return <ClientsPage />;
      case 'media': return <MediaPage />;
      case 'careers': return <CareersPage />;
      case 'contact': return <Contact setCursorType={setCursorType} />;
      case 'privacy': return <LegalPage title="Privacy Policy" />;
      case 'terms': return <LegalPage title="Terms of Service" />;
      default: return <HomePage setCursorType={setCursorType} setCurrentPage={setCurrentPage} onPlay={setSelectedProject} />;
    }
  };

  return (
    <div className="relative selection:bg-gold selection:text-premium-black overflow-x-hidden min-h-screen">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-premium-black flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 240 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-premium-orange shadow-[0_0_15px_rgba(255,107,44,0.5)]"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] tracking-[0.8em] text-white/40 uppercase font-bold"
              >
                LAKSHAYA ENTERTAINMENTS
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <CustomCursor type={cursorType} />
      <Navbar setCursorType={setCursorType} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      
      <main className={loading ? 'hidden' : 'block'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        <Footer setCursorType={setCursorType} setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}
