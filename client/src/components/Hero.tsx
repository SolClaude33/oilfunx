import { motion } from "framer-motion";
import { Moon, Sun, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export function Hero() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { data: config } = useQuery<{ ca: string | null }>({
    queryKey: ["public-config"],
    queryFn: async () => {
      const res = await fetch("/api/public/config");
      if (!res.ok) throw new Error("Failed to fetch config");
      return res.json();
    },
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#f5f0e1] dark:bg-zinc-900 text-foreground border-b-4 border-border transition-colors duration-300">
      {/* Navbar/Header Controls */}
      <div className="absolute top-0 left-0 right-0 pt-1 pl-1 pr-6 pb-0 flex justify-between items-start z-50">
        <div className="relative z-50 -translate-x-4 -translate-y-2">
           <img src="/logooil.png" alt="Refinery" className="h-[7.5rem] md:h-[9rem] w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3 translate-y-6">
          <a 
            href="https://x.com/Refinery" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 border-2 border-border bg-card hover:bg-muted transition-colors rounded-full cursor-pointer"
            data-testid="link-twitter-hero"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-border bg-card hover:bg-muted transition-colors rounded-full cursor-pointer"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Oil Companies - Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/biggest_oil_and_gas_companies.webp"
          alt="Biggest oil and gas companies"
          className="w-full h-full object-cover object-top"
        />
      </div>
      {/* CA Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="bg-black/90 backdrop-blur-sm border-2 border-metal-gold px-4 py-2 font-mono text-sm md:text-base shadow-[0_0_20px_rgba(255,215,0,0.3)]">
          <span className="text-metal-gold font-bold">CA:</span>
          <span className="text-white ml-2 tracking-wider" data-testid="ca-address">{config?.ca || "SOON"}</span>
        </div>
      </motion.div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <img src="/refinery2.png" alt="Refinery" className="h-40 md:h-48 lg:h-[14rem] w-auto object-contain mx-auto mb-4 drop-shadow-[0_4px_0_rgba(0,0,0,0.2)]" />
          
          <div className="bg-metal-gold text-black font-mono font-bold text-xl md:text-2xl px-6 py-2 inline-block transform -rotate-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            THE BLACK GOLD
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="w-full md:w-auto px-8 py-4 bg-black text-white font-black text-lg uppercase tracking-widest hover:bg-zinc-800 transition-transform hover:-translate-y-1 shadow-[0_4px_0_rgba(0,0,0,0.5)] border-2 border-black cursor-pointer" data-testid="button-buy">
              Buy Refinery
            </button>
            <a href="#dashboard">
              <button className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-black dark:border-white text-black dark:text-white font-black text-lg uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 transition-transform hover:-translate-y-1 cursor-pointer" data-testid="button-dashboard">
                Protocol Dashboard
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
