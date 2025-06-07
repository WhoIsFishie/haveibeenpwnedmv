"use client";

import { BreachProvider } from "@/lib/context/BreachContext";
import { QuestionList } from "@/components/QuestionList";
import { BreachList } from "@/components/BreachList";
import { breachData } from "@/lib/data/breachData";

export default function Home() {
  return (
    <BreachProvider breachData={breachData}>
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-24">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuestionList />
            <BreachList />
          </div>
        </div>
      </main>
    </BreachProvider>
  );
}
