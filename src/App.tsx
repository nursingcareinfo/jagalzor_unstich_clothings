/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, ChevronRight, Maximize2, Layers, Cpu, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Use relative paths for GitHub Pages subdirectory compatibility.
// "./image.jpg" resolves from current URL path, whether at root (localhost)
// or at /repo-name/ (GitHub Pages).

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  details: string[];
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Obsidian Royal Boski',
    category: 'Elite Wash & Wear',
    price: 'PKR 8,500',
    image: './MKS-8336-3-1639371118.jpg',
    details: ['Liquid Ammonia Finish', 'Anti-Crease Technology', 'Luxury Fall & Drape']
  },
  {
    id: '2',
    name: 'Slate Executive Cotton',
    category: 'Executive Series 2026',
    price: 'PKR 12,900',
    image: './pakistani_gents_shalwar_kameez-2963876879.jpg',
    details: ['100% Giza Cotton', 'High-Density Fine Weave', 'Crisp Executive Finish']
  },
  {
    id: '3',
    name: 'Maroon Heritage Karandi',
    category: 'Heritage Series',
    price: 'PKR 9,500',
    image: './235559a993082128adece399fa8d92ac-473599044.jpg',
    details: ['Traditional Long-Staple', 'Starch-Ready Texture', 'Original Heritage 0.5']
  },
  {
    id: '4',
    name: 'Desert Tan Latha',
    category: 'Winter Collection',
    price: 'PKR 11,200',
    image: './Wash-Wear-Gents-Shalwar-Qameez-GS45-1.webp',
    details: ['Heavyweight Weave', 'Warm Texture', 'Deep Pigment Dye']
  },
  {
    id: '5',
    name: 'Royal Sunray Mustard',
    category: 'Cotton Blend',
    price: 'PKR 7,800',
    image: './Wash-Wear-Gents-Shalwar-Qameez-GS44-1-2025904109.webp',
    details: ['Folded detailing', 'Self-Print Border', 'Breathable Summer Wear']
  },
  {
    id: '6',
    name: 'Azure Mist Lawn',
    category: 'Spring Series',
    price: 'PKR 8,900',
    image: './SK-48-1-scaled-1123149132.jpg',
    details: ['Ultra Light-weight', 'Sky Blue Hue', 'Silky Smooth Finish']
  },
  {
    id: '7',
    name: 'Rose Dusk Executive',
    category: 'Elite Series',
    price: 'PKR 10,500',
    image: './41_9d3f1113-78f0-481f-9cd5-3e12d845849b_1800x1800-2050243805.jpg',
    details: ['Soft-Touch Finish', 'Earthy Tones', 'Modern Fit Silhouette']
  },
  {
    id: '8',
    name: 'Coffee Brown Heritage',
    category: 'Classical Collection',
    price: 'PKR 9,200',
    image: './2f894674bed7377fa07612de9c67759a-2235079211.jpg',
    details: ['Traditional Stitched Look', 'Sturdy Cotton', 'Timeless Appeal']
  },
  {
    id: '9',
    name: 'Olive Zenith Cotton',
    category: 'Luxe Series',
    price: 'PKR 11,800',
    image: './7aad2056fb17541456016cf623c6ac70-2904060245.jpg',
    details: ['Premium Olive Hue', 'Mercerized Finish', 'Contemporary Silhouette']
  }
];

// --- Components ---

const Navbar = ({ 
  isSearchOpen, 
  setIsSearchOpen, 
  searchQuery, 
  setSearchQuery 
}: { 
  isSearchOpen: boolean, 
  setIsSearchOpen: (v: boolean) => void, 
  searchQuery: string, 
  setSearchQuery: (v: string) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-8 flex items-center justify-between",
      isScrolled || isSearchOpen ? "bg-white/5 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent"
    )}>
      <div className="flex items-center gap-8">
        <Menu className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        <div className="hidden md:flex gap-6 uppercase text-[10px] tracking-[0.2em] font-medium">
          <a href="#" className="hover:text-primary transition-colors text-foreground">Collections</a>
          <a href="#" className="hover:text-primary transition-colors text-foreground">Bespoke Fitting</a>
          <a href="#" className="hover:text-primary transition-colors text-foreground">Heritage</a>
        </div>
      </div>

      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 transition-all duration-500 flex items-center gap-4",
        isSearchOpen ? "w-full max-w-md" : "w-auto"
      )}>
        {isSearchOpen ? (
          <div className="w-full relative flex items-center flex-1">
            <input 
              autoFocus
              type="text" 
              placeholder="Search Shalwar Kameez..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-10 outline-none text-sm text-foreground focus:border-primary/50 transition-all"
            />
            <Search className="absolute left-4 w-4 h-4 text-white/40" />
            <X 
              className="absolute right-4 w-4 h-4 text-white/40 cursor-pointer hover:text-white" 
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="text-2xl font-serif tracking-tighter uppercase font-medium text-foreground">
            Velvet <span className="text-primary">&</span> Loom
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {!isSearchOpen && (
          <Search 
            className="w-5 h-5 cursor-pointer hover:text-primary transition-colors text-foreground" 
            onClick={() => setIsSearchOpen(true)}
          />
        )}
        <User className="w-5 h-5 cursor-pointer hover:text-primary transition-colors text-foreground" />
        <div className="relative cursor-pointer group">
          <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors text-foreground" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">3</span>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#0A0F1E]">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
         <img
           src="./7aad2056fb17541456016cf623c6ac70-2904060245.jpg"
           alt="Luxury Men's Tailoring"
           className="w-full h-full object-cover opacity-50 mix-blend-normal scale-105"
         />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase text-xs tracking-[0.4em] font-semibold text-primary mb-6"
        >
          Men's Collection 2026
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-7xl md:text-8xl font-serif font-light tracking-tight max-w-4xl text-[#F8F5F2] leading-[0.9] mb-12"
        >
          Men's <span className="italic font-light">Unstitched</span> <br/> Luxury
        </motion.h1>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           className="flex gap-6"
        >
          <Button size="lg" className="rounded-none px-10 py-8 bg-primary text-background uppercase text-xs font-bold tracking-widest hover:bg-primary/90 transition-all duration-500">
            Pre-Order Now
          </Button>
          <Button variant="outline" size="lg" className="rounded-none px-10 py-8 border-white/20 backdrop-blur-sm bg-white/5 uppercase text-xs font-bold tracking-widest hover:bg-white/10 transition-all duration-500">
            Virtual Fitting
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-50 mb-4 text-foreground transition-all hover:translate-y-2 text-foreground">Scroll to Discover</span>
        <div className="w-[1px] h-20 bg-primary/30 relative">
          <motion.div 
            animate={{ top: ['0%', '80%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-[1px] h-4 bg-primary"
          />
        </div>
      </div>
    </section>
  );
};

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        stagger: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-transparent overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="story-content space-y-4">
            <span className="text-primary uppercase text-[10px] tracking-widest font-bold">The Wardrobe Economy</span>
            <h2 className="text-5xl font-serif font-light leading-[0.9] text-foreground">Experience the <br/> Bespoke fits.</h2>
          </div>
          
          <p className="story-content text-[#F8F5F2]/60 leading-relaxed text-lg font-light">
            Experience the Wardrobe Economy. Bespoke fit meets high-fidelity Egyptian Cotton. Every thread is engineered for the discerning silhouette.
          </p>

          <div className="story-content flex flex-col md:flex-row gap-4 pt-8">
            <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center font-bold text-sm text-background">01</div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-primary mb-1 font-bold">Digital Weave</div>
                <div className="text-xs text-white/70">Symmetrical Egyptian fibers</div>
              </div>
            </div>
            
            <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm">02</div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1 font-bold">Lustre Depth</div>
                <div className="text-xs text-white/70">HDR Environmental Mapping</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group story-content">
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-10 transition-opacity duration-1000" />
          <AspectRatio ratio={3/4} className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
             <motion.img
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.8 }}
               src="./pakistani_gents_shalwar_kameez-2963876879.jpg"
               className="w-full h-full object-cover"
               alt="Fabric Detail"
             />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <section className="py-32 bg-transparent">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
        <div>
          <h3 className="text-5xl font-serif font-light mb-4 text-foreground leading-[0.9]">The Collection</h3>
          <p className="text-white/60 font-light text-sm tracking-wide">High-fidelity Egyptian Cotton engineered for the silhouette.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 h-auto">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-background px-6 py-2 uppercase text-[10px] tracking-widest font-bold transition-all">All</TabsTrigger>
              <TabsTrigger value="velvet" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-background px-6 py-2 uppercase text-[10px] tracking-widest font-bold transition-all">Velvet</TabsTrigger>
              <TabsTrigger value="lawn" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-background px-6 py-2 uppercase text-[10px] tracking-widest font-bold transition-all">Lawn</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
          <p className="text-white/40 font-serif italic text-2xl">No garments match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl transition-all hover:bg-white/10">
                <AspectRatio ratio={4/5} className="bg-muted relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="icon" variant="outline" className="rounded-full w-12 h-12 border-white/20 backdrop-blur-md bg-white/10">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </AspectRatio>
                <CardContent className="p-8">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">{product.category}</p>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-serif text-[#F8F5F2]">{product.name}</h4>
                    <p className="text-sm font-medium text-primary">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

const FabricZoomViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-transparent overflow-hidden">
       <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 space-y-8">
            <Badge variant="outline" className="rounded-none border-primary text-primary px-4 py-1 text-[10px] uppercase font-bold tracking-widest">Digital Weave</Badge>
            <h3 className="text-5xl font-serif font-light leading-[0.9] text-foreground">Interactive <br/> <span className="text-primary italic">Design</span> DNA</h3>
            <p className="text-[#F8F5F2]/60 font-light text-sm leading-relaxed max-w-sm">
                Examine the architectural integrity of our weaves. Our interactive PBR viewer demonstrates light bounce on metallic filaments.
            </p>
            <div className="p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-sm text-primary">03</div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#F8F5F2]/50 mb-1">Bespoke Fit</div>
                <div className="text-xs text-white/70">AI Measurement Patterning</div>
              </div>
            </div>
            <Button size="lg" className="w-full rounded-none bg-primary text-background tracking-widest uppercase text-xs h-14 font-bold">Initialize 3D Viewer</Button>
          </div>

          <div className="md:col-span-3 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#1E293B] via-[#0F172A] to-[#1E293B]"></div>
             <motion.div 
               animate={{ scale: zoomLevel }}
               transition={{ type: "spring", stiffness: 100, damping: 20 }}
               className="w-full h-full cursor-zoom-in relative z-10"
               onClick={() => setZoomLevel(zoomLevel === 1 ? 2.5 : 1)}
             >
                 <img
                   src="./Wash-Wear-Gents-Shalwar-Qameez-GS44-1-2025904109.webp"
                   alt="Micro Fabric"
                   className="w-full h-full object-cover mix-blend-overlay opacity-60"
                 />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/40"></div>
             </motion.div>
             <div className="absolute bottom-8 right-8 text-right z-20">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Material</div>
                <div className="text-xl font-serif italic text-primary">Liquid Ammonia Cotton</div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest border border-white/10 text-white">
                  PBR Thread Count: 800TC
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-8 md:px-24 py-24 border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="grid md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-2 space-y-8">
          <div className="text-3xl font-serif uppercase tracking-tighter text-foreground">Velvet <span className="text-primary">&</span> Loom</div>
          <p className="text-sm font-light text-[#F8F5F2]/60 max-w-sm leading-relaxed">
            Crafting the future of Bespoke Heritage. Our pieces are designed for longevity, blending ancient weaving techniques with algorithmic precision.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Loom Journal', 'Heritage'].map(link => (
              <a key={link} href="#" className="text-[10px] uppercase font-bold tracking-[0.2em] hover:text-primary transition-colors text-foreground">{link}</a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground">Contact</h5>
          <div className="space-y-3 text-sm font-light text-[#F8F5F2]/60">
            <p>Atelier Karachi: Korangi Industrial Zone</p>
            <p>concierge@velvetandloom.com</p>
            <p>+92 21 3567-8901</p>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground">Newsletter</h5>
          <p className="text-xs text-[#F8F5F2]/50 font-light">Join the Circle of Discerning Patrons.</p>
          <div className="flex border-b border-primary/30 pb-2">
            <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#F8F5F2]/30 text-foreground" />
            <button className="text-primary hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-6">
        <div className="text-[9px] uppercase tracking-widest font-bold opacity-40 text-foreground">© 2026 Velvet & Loom. Crafted by Thio.</div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest font-bold opacity-40 text-foreground">
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Terms of Craft</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Traceability</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900 opacity-20 rounded-full blur-[100px] pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl font-serif text-primary"
            >
              V<span className="text-foreground">&</span>L
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-[1px] bg-primary mt-6"
            />
            <p className="mt-4 text-[8px] uppercase tracking-[0.5em] font-bold opacity-50 text-foreground">Calibrating Material DNA</p>
          </motion.div>
        ) : (
          <motion.main 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navbar 
              isSearchOpen={isSearchOpen} 
              setIsSearchOpen={setIsSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Hero />
            <div className="px-8 md:px-24">
               <StorySection />
               <ProductGrid products={filteredProducts} />
               <FabricZoomViewer />
            </div>
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
