import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlertIcon } from 'lucide-react';

export function PetitionBanner() {
  return (
    <a className="w-full fixed z-50" href="https://www.change.org/p/protect-our-data-demand-a-data-protection-law-in-the-maldives-now" target="_blank" rel="noopener noreferrer">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#019690] to-[#006780] opacity-60" />
        <div className="relative backdrop-blur-sm text-center text-white font-medium py-2 px-4">
          <div className="container mx-auto flex flex-col sm:flex-row gap-2 items-center justify-center">
            <p className="text-sm sm:text-base flex items-center">
              <ShieldAlertIcon className="w-6 h-6 inline mr-2" />
              Demand a Data Protection Law in the Maldives Now!</p>
            <Button variant="outline" size="sm" className="whitespace-nowrap">Sign the Petition</Button>
          </div>
        </div>
      </div>
    </a>
  );
} 