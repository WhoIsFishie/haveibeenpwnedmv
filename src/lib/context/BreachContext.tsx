import { createContext, useContext, useState, ReactNode } from 'react';
import { BreachData, Affected } from '../types';
import { isAlwaysChecked } from '../utils';

interface BreachContextType {
  breachData: BreachData[];
  selectedBreaches: Record<string, boolean>;
  selectedQuestions: Record<number, boolean>;
  toggleBreach: (id: string) => void;
  toggleQuestion: (question: string) => void;
  categories: string[];
  questions: string[];
}

const BreachContext = createContext<BreachContextType | undefined>(undefined);

export function BreachProvider({ children, breachData }: { children: ReactNode; breachData: BreachData[] }) {
  const [selectedBreaches, setSelectedBreaches] = useState<Record<string, boolean>>(
    Object.values(breachData)
      .map(b => ({ [b.id]: isAlwaysChecked(b.affectedUsers) }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  const questions = breachData
		.sort((a, b) => (isAlwaysChecked(a.affectedUsers) ? 1 : 0) + (isAlwaysChecked(b.affectedUsers) ? 1 : 0))
    .map((b) => b.questions || [])
    .reduce((acc, curr) => [...acc, ...curr], []);

  const [selectedQuestions, setSelectedQuestions] = useState<Record<number, boolean>>(
    questions.reduce((acc, _, index) => ({
      ...acc,
      [index]: false,
    }), {})
  );

  const categories = Array.from(new Set(breachData.map((breach) => breach.category)));

  const toggleBreach = (id: string) => {
    setSelectedBreaches((prev) => ({
      ...prev,
      [id]: isAlwaysChecked(breachData.find(breach => breach.id === id)?.affectedUsers) ? true : !prev[id],
    }));
  };

  const toggleQuestion = (question: string) => {
    const questionIndex = questions.findIndex(q => q === question);
    const newSelectedQuestions = {
      ...selectedQuestions,
      [questionIndex]: !selectedQuestions[questionIndex]
    };
    
    setSelectedQuestions(newSelectedQuestions);

    // Find all breaches that contain this question
    const relatedBreaches = breachData.filter(breach => breach.questions?.includes(question));
    
    // For each related breach, check if any of its questions are selected
    relatedBreaches.forEach(breach => {
      if (!breach.questions) return;
      
      const breachQuestionIndices = breach.questions.map(q => questions.findIndex(q2 => q2 === q));
      const hasAnySelectedQuestion = breachQuestionIndices.some(idx => newSelectedQuestions[idx]);

      setSelectedBreaches(prev => ({
        ...prev,
        [breach.id]: hasAnySelectedQuestion
      }));
    });
  };

  return (
    <BreachContext.Provider
      value={{
        breachData,
        selectedBreaches,
        selectedQuestions,
        toggleBreach,
        toggleQuestion,
        categories,
        questions,
      }}
    >
      {children}
    </BreachContext.Provider>
  );
}

export function useBreach() {
  const context = useContext(BreachContext);
  if (context === undefined) {
    throw new Error('useBreach must be used within a BreachProvider');
  }
  return context;
} 