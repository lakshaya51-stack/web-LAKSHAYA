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
  MessageSquare,
  User
} from 'lucide-react';

// --- Types ---
type CursorType = 'default' | 'view' | 'play' | 'text' | 'magnetic';
type Page = 'home' | 'about' | 'services' | 'portfolio' | 'clients' | 'media' | 'contact' | 'privacy' | 'terms';

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
  image?: string;
}

interface Client {
  name: string;
  logo: string;
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
    youtubeId: "GD9ODkoFNO0"
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
  { name: "Mr. Pavan Malu", role: "Director" },
  { name: "Mr. Hemant Prabhu", role: "Director" },
  { name: "Mr. Piyush Shah", role: "Writer" },
  { name: "Mr. Amit Dua (DOP)", role: "Cameraman" },
  { name: "Mr. Ajay Kumar", role: "Video-Editor" },
  { name: "Mr. Prakash G. Nair", role: "Music Composer" },
  { name: "Mr. Prince Kumar", role: "Graphic Artist & Video Editor" },
  { name: "Mr. Vijay Tiwari", role: "Sound Engineer" },
  { name: "Mr. Dyaneshwar", role: "Studio-Head & Archive In-Charge" }
];

const NEWS: NewsItem[] = [
  { id: 1, title: "Shadows of the Ghats Premieres at Cannes", date: "May 15, 2024", category: "Festival", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Lakshaya Announces New VFX Hub in Bangalore", date: "April 22, 2024", category: "Expansion", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Collaboration with Netflix for 3-Part Docuseries", date: "March 10, 2024", category: "Project", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800" }
];

const CLIENTS: Client[] = [
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_logo.svg" },
  { name: "Zee", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee_TV_Logo.svg" },
  { name: "Viacom18", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Viacom18_Studios_Logo.svg" },
  { name: "Eros International", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Eros_International_logo.svg" },
  { name: "Shemaroo", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Shemaroo_Logo.svg" },
  { name: "Star TV", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Star_India_logo.svg" },
  { name: "Reliance Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Reliance_Entertainment_Logo.svg" },
  { name: "Balaji Telefilms", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Balaji_Telefilms_logo.svg" },
  { name: "Dharma Productions", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Dharma_Productions_Logo.svg" },
  { name: "Mukta Arts", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Mukta_Arts_logo.svg" },
  { name: "Vishesh Films", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Vishesh_Films_logo.svg" },
  { name: "Filmkraft", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Filmkraft_logo.svg" },
  { name: "Doordarshan", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Doordarshan_Logo.svg" },
  { name: "NFDC", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/NFDC_India_logo.svg" },
  { name: "Hinduja Group", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Hinduja_Group_logo.svg" },
  { name: "Madras Talkies", logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/Madras_Talkies_Logo.png" }
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
    <Hero setCursorType={setCursorType} setCurrentPage={setCurrentPage} />
    <section className="py-32 bg-premium-black relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-8 max-w-4xl mx-auto">
          "Cinema is a matter of what's in the frame and what's out."
        </h2>
        <div className="flex items-center justify-center gap-4 text-premium-orange uppercase tracking-[0.3em] text-[10px] font-bold">
          <div className="w-12 h-[1px] bg-premium-orange/30" />
          <span>The Lakshaya Philosophy</span>
          <div className="w-12 h-[1px] bg-premium-orange/30" />
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
          <div className="max-w-3xl">
            <h3 className="text-premium-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Producer Profile</h3>
            <p className="text-xl md:text-2xl font-serif italic text-white/60 mb-8 leading-relaxed">
              Lakshaya Entertainments Pvt. Ltd. is a pioneer in <span className="text-premium-orange font-medium">Production, Marketing & Distribution</span>, led by a board of directors with a distinguished legacy in Indian cinema.
            </p>
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-premium-orange opacity-50" />
                <strong className="text-premium-orange block mb-2 uppercase tracking-[0.2em] text-[10px]">Major Achievement</strong>
                <p className="text-lg md:text-xl font-serif text-white/80 italic">
                  "Won a Total of <span className="text-premium-orange font-bold">15 (Fifteen)</span> National and International Awards by the company's directors."
                </p>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                Our leadership is anchored by <span className="text-premium-orange font-bold">Mr. Anwar Jamal</span> (Honry. Director), <span className="text-premium-orange font-bold">Mr. Surinder Keram</span>, and <span className="text-premium-orange font-bold">Mr. Tarun Keram</span>. Mr. Anwar Jamal alone is a <span className="text-white/70 font-medium">four-time National Film Award winner</span> and recipient of <span className="text-white/70 font-medium">eight International Awards</span> for his socially and culturally significant documentary and feature films.
              </p>
            </div>
          </div>
          <div className="glass-panel p-10 rounded-2xl border border-white/10">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-premium-orange mb-8">Creative Personalities & Technicians</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {[
                { label: "Directors", names: ["Mr. Pavan Malu", "Mr. Hemant Prabhu"] },
                { label: "Writer", names: ["Mr. Piyush Shah"] },
                { label: "Cameraman", names: ["Mr. Amit Dua (DOP)"] },
                { label: "Video-Editor", names: ["Mr. Ajay Kumar"] },
                { label: "Music Composer", names: ["Mr. Prakash G. Nair"] },
                { label: "Graphic Artist & Video Editor", names: ["Mr. Prince Kumar"] },
                { label: "Sound Engineer", names: ["Mr. Vijay Tiwari"] },
                { label: "Studio-Head & Archive In-Charge", names: ["Mr. Dyaneshwar"] }
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{item.label}</span>
                  <div className="flex flex-col">
                    {item.names.map(name => (
                      <span key={name} className="text-lg font-serif italic text-white/90 group-hover:text-premium-orange transition-colors duration-300">{name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
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
                      <h3 className="text-4xl font-serif font-bold mb-2 italic text-premium-orange">{SERVICES[activeTab].title}</h3>
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
                     <button 
                       onClick={() => {
                         setCurrentPage('portfolio');
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       }}
                       className="px-10 py-4 bg-premium-orange text-premium-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all text-sm"
                     >
                        View Projects
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
                  <h4 className="text-xl font-serif font-bold italic mb-4 text-premium-orange">{p.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
    </PageReveal>
  );
};

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {CLIENTS.map((client, i) => (
            <div key={i} className="bg-premium-black p-8 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all hover:bg-white/5 group gap-6 min-h-[220px]">
              <div className="w-full h-24 bg-white/5 group-hover:bg-white rounded-xl flex items-center justify-center p-6 transition-all duration-500 overflow-hidden">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-premium-orange transition-colors font-bold text-center h-8 flex items-center">{client.name}</span>
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
            All content hosted on this site, including but not limited to trailers, behind-the-scenes footage, scripts, and visual concepts, remains the sole property of Lakshaya Entertainments Pvt. Ltd. and is protected by international copyright laws.
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
              LAKSHAYA<span className="text-premium-orange">.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              A premium production house crafting bold cinema and original stories for global audiences.
            </p>
            <div className="flex gap-4">
              <Magnetic scaling={0.5}>
                <a 
                  href="https://youtube.com/channel/UCwKnAd8flImld54lUP_TpBw" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-premium-orange hover:text-premium-orange transition-all"
                  onMouseEnter={() => setCursorType('magnetic')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </Magnetic>
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <Magnetic key={i} scaling={0.5}>
                  <button 
                    onClick={() => {}}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-premium-orange hover:text-premium-orange transition-all"
                    onMouseEnter={() => setCursorType('magnetic')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['About', 'Services', 'Portfolio', 'Clients', 'Contact'].map((item) => (
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
  "Sony", "Viacom18", "Zee", "Star TV", "NFDC", "Doordarshan", 
  "Dharma Productions", "Eros International", "Mukta Arts", "Vishesh Films", "Filmkraft", "Reliance Entertainment"
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
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-gold/40 pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference will-change-transform"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: type === 'view' || type === 'play' ? 2.2 : isInteractive ? 1.5 : 1,
          opacity: type === 'text' ? 0 : 1,
          backgroundColor: type === 'view' || type === 'play' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0)',
          visibility: 'visible' // Default to visible, but we can refine if needed
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {type === 'view' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[6px] font-bold tracking-[0.2em] text-premium-orange uppercase text-center px-2"
            >
              View Project
            </motion.span>
          )}
          {type === 'play' && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[6px] font-bold tracking-[0.2em] text-premium-orange uppercase text-center px-2"
            >
              Play Reel
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[10000] block mix-blend-difference shadow-[0_0_10px_rgba(212,175,55,0.8)] will-change-transform"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isInteractive ? 0.2 : 1,
          opacity: type === 'text' ? 0.1 : 1,
          visibility: 'visible'
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
            LAKSHAYA<span> ENTERTAINMENTS PVT. LTD.</span><span className="text-premium-orange">.</span>
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
              <div className="text-xl font-serif font-bold">LAKSHAYA<span className="text-premium-orange">.</span></div>
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

const Hero = ({ setCursorType, setCurrentPage }: { setCursorType: (t: CursorType) => void, setCurrentPage: (p: Page) => void }) => {
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
            <div className="w-12 h-[1px] bg-premium-orange" />
            <span className="text-premium-orange uppercase tracking-[0.4em] text-[10px] font-bold">Premium Production House</span>
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
                onClick={() => {
                  setCurrentPage('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative flex items-center gap-3 px-8 py-4 bg-premium-orange text-premium-black rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden transition-all"
                onMouseEnter={() => setCursorType('magnetic')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span className="relative z-10">View Our Work</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform" />
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform" />
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
      <span className="text-premium-orange font-mono text-sm tracking-widest">{number}</span>
      <div className="w-12 h-[1px] bg-premium-orange/30" />
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
      <AnimatePresence>
        {project.youtubeId && isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black"
          >
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
              className="w-[300%] h-[120%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-60 grayscale blur-[1px]"
              allow="autoplay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <img 
        src={project.image} 
        alt={project.title}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out will-change-transform ${isHovered && project.youtubeId ? 'scale-110 opacity-0 blur-sm' : 'opacity-100 group-hover:scale-105 grayscale group-hover:grayscale-0'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-linear-to-t from-premium-black/90 via-premium-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-orange mb-2 block">{project.category}</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-premium-orange transition-colors">{project.title}</h3>
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
                  <h4 className="text-xs uppercase tracking-widest text-premium-orange font-bold mb-1">Email Us</h4>
                  <p className="text-lg font-medium text-white/90">lakshaya51@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-premium-orange font-bold mb-1">Call Studio</h4>
                  <p className="text-lg font-medium text-white/90">+91 9711187316</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-premium-orange font-bold mb-1">Head (Marketing)</h4>
                  <p className="text-lg font-medium text-white/90">Mr. Pranab Ganguly</p>
                  <p className="text-base text-premium-orange mt-1 tracking-wide font-medium">8447556279</p>
                  <p className="text-sm text-white/40 italic">gangulypranab63@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-premium-orange group-hover:bg-premium-orange group-hover:text-premium-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-premium-orange font-bold mb-1">Studio Address</h4>
                  <p className="text-lg font-medium text-white/90 text-balance">K-18, Green Park Extension, New Delhi-11016</p>
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
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your inquiry. Our team will get back to you shortly.");
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-focus-within:text-premium-orange transition-colors">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-premium-orange transition-colors text-white" 
                      onFocus={() => setCursorType('text')}
                      onBlur={() => setCursorType('default')}
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-focus-within:text-premium-orange transition-colors">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-premium-orange transition-colors text-white" 
                      onFocus={() => setCursorType('text')}
                      onBlur={() => setCursorType('default')}
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-focus-within:text-premium-orange transition-colors">Project Type</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-premium-orange transition-colors appearance-none outline-none cursor-pointer text-white"
                    onMouseEnter={() => setCursorType('magnetic')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <option className="bg-premium-black">Feature Film</option>
                    <option className="bg-premium-black">Short Films</option>
                    <option className="bg-premium-black">Nukar Natak</option>
                    <option className="bg-premium-black">Documentary</option>
                    <option className="bg-premium-black">Branded Content</option>
                    <option className="bg-premium-black">Distribution</option>
                  </select>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-focus-within:text-premium-orange transition-colors">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-premium-orange transition-colors resize-none text-white"
                    onFocus={() => setCursorType('text')}
                    onBlur={() => setCursorType('default')}
                  ></textarea>
                </div>
                <Magnetic scaling={0.1}>
                  <button 
                    className="w-full py-4 bg-premium-orange text-premium-black rounded-full font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,107,44,0.2)] transition-all"
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
      case 'services': return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'portfolio': return <PortfolioPage setCursorType={setCursorType} onPlay={setSelectedProject} />;
      case 'clients': return <ClientsPage />;
      case 'media': return <MediaPage />;
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
                LAKSHAYA ENTERTAINMENTS PVT. LTD.
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

      <CustomCursor type={cursorType} />
    </div>
  );
}
