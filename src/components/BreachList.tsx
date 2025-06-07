import { useBreach } from "@/lib/context/BreachContext";
import { BreachCard } from "./BreachCard";
import { useEffect, useState, useRef } from "react";
import { BreachData } from "@/lib/types";
import { Affected } from "@/lib/types";

export function BreachList() {
  const { breachData, selectedBreaches, selectedQuestions, questions } = useBreach();
  const [orderedBreaches, setOrderedBreaches] = useState<BreachData[]>([]);
  const [lastSelected, setLastSelected] = useState<Record<string, number>>({});
  const prevSelectedQuestions = useRef(selectedQuestions);

  useEffect(() => {
    // Get all selected breaches
    const selected = breachData.filter(breach => selectedBreaches[breach.id]);
    
    // Sort them based on when they were last selected
    const sorted = [...selected].sort((a, b) => {
      const aTime = lastSelected[a.id] || 0;
      const bTime = lastSelected[b.id] || 0;
      return bTime - aTime; // Most recent first
    });

    // Get breaches that affect everyone and aren't already in the selected list
    const everyoneBreaches = breachData.filter(
      breach => 
        breach.affectedUsers === Affected.EVERYONE && 
        !selected.some(s => s.id === breach.id)
    );

    // Combine the sorted selected breaches with the everyone breaches
    setOrderedBreaches([...sorted, ...everyoneBreaches]);
  }, [breachData, selectedBreaches, lastSelected]);

  // Update lastSelected when a question is toggled
  useEffect(() => {
    const now = Date.now();
    
    // Find which question was toggled by comparing previous and current state
    const toggledQuestionIndex = questions.findIndex((_, index) => 
      prevSelectedQuestions.current[index] !== selectedQuestions[index]
    );

    if (toggledQuestionIndex !== -1) {
      // Find all breaches that contain this question
      const affectedBreaches = breachData.filter(breach => 
        breach.questions?.includes(questions[toggledQuestionIndex])
      );

      // Update lastSelected for all affected breaches
      setLastSelected(prev => ({
        ...prev,
        ...affectedBreaches.reduce((acc, breach) => ({
          ...acc,
          [breach.id]: now
        }), {})
      }));
    }

    // Update the ref with current state for next comparison
    prevSelectedQuestions.current = selectedQuestions;
  }, [selectedQuestions, breachData, questions]);

  if (orderedBreaches.length === 0) return null;

  return (
    <div className="w-full max-w-2xl space-y-4 mx-auto">
      {orderedBreaches.map((breach) => (
        <BreachCard key={breach.id} breach={breach} />
      ))}
    </div>
  );
} 