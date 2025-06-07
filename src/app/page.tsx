"use client";

import { BreachProvider } from "@/lib/context/BreachContext";
import { QuestionList } from "@/components/QuestionList";
import { BreachList } from "@/components/BreachList";
import { breachData } from "@/lib/data/breachData";
import { useEffect, useState } from "react";
import { GithubIcon, TwitterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setShowFooter(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BreachProvider breachData={breachData}>
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-24 pb-20">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuestionList />
            <BreachList />
          </div>
        </div>
        <footer 
          className={`fixed bottom-0 left-0 right-0 p-4 text-center transition-opacity duration-300 ${
            showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>Made with 💖 by FlameXode</p>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://github.com/WhoIsFishie/haveibeenpwnedmv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="https://x.com/WhoIsFishie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </main>
    </BreachProvider>
  );
}
