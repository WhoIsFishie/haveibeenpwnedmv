import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useBreach } from "@/lib/context/BreachContext";
import { Affected } from "@/lib/types";

export function QuestionList() {
  const { questions, selectedQuestions, toggleQuestion, breachData } = useBreach();

  // Helper function to check if a question is for a breach that affects everyone
  const isEveryoneQuestion = (question: string) => {
    const relatedBreach = breachData.find(breach => breach.questions?.includes(question));
    return relatedBreach?.affectedUsers === Affected.EVERYONE;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Have I been Pwned?</CardTitle>
        <CardDescription>
          See if you have been pwned from any of these services.
        </CardDescription>
        <CardAction>😱</CardAction>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex flex-col-reverse sticky top-18">
          {questions.sort(q => isEveryoneQuestion(q) ? 1 : 0).map((question, i) => {
            const isEveryone = isEveryoneQuestion(question);
            return (
              <div key={i}>
                {i !== questions.length - 1 && <Separator className="my-3" />}
                <div className="flex items-center gap-2 max-w-[fit-content]">
                  <Switch
                    className="data-[state=checked]:bg-green-500"
                    id={`question-${i}`}
                    checked={isEveryone ? true : !!selectedQuestions[i]}
                    onCheckedChange={() => !isEveryone && toggleQuestion(question)}
                    disabled={isEveryone}
                  />
                  <Label htmlFor={`question-${i}`}>{question}</Label>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 