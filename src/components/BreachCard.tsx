import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreachData } from "@/lib/types";
import { severityColor } from "@/lib/utils";
import { ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface BreachCardProps {
  breach: BreachData;
}

export function BreachCard({ breach }: BreachCardProps) {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Unknown";
    if (date === "launch") return "Since Launch";
    if (date === "ongoing") return "Ongoing";
    return date;
  };

  const discoveredDate = formatDate(breach.discoveredDate);
  const patchedDate = formatDate(breach.patchedDate);

  return (
    <Card
      className="p-4 relative"
      style={{
        backgroundImage: `url(${breach.logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 right-0 flex">
        <Badge 
          className={`capitalize backdrop-blur-sm font-medium px-3 py-1.5 rounded-none rounded-bl-md ${
            breach.patchedDate 
              ? 'bg-green-500/40 text-green-100' 
              : 'bg-red-500/40 text-red-100'
          }`}
        >
          {breach.patchedDate ? `Patched ${breach.patchedDate}` : 'Not Patched'}
        </Badge>
        <Badge 
          className={`capitalize ${
            breach.severity === 'critical' ? 'bg-red-500/40 text-red-100' :
            breach.severity === 'high' ? 'bg-orange-500/40 text-orange-100' :
            breach.severity === 'medium' ? 'bg-yellow-500/40 text-yellow-100' :
            'bg-green-500/40 text-green-100'
          } backdrop-blur-sm font-medium px-3 py-1.5 rounded-none rounded-tr-md`}
        >
          {breach.severity}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={breach.logo}
              alt={breach.service}
              className="rounded"
              width={24}
              height={48}
            />
            <div>
              <div>{breach.service}</div>
              <div className="text-sm text-muted-foreground">{breach.category}</div>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {discoveredDate ? (
                <>
                  {discoveredDate}
                  {patchedDate && (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      {patchedDate}
                    </>
                  )}
                </>
              ) : patchedDate ? (
                <>Patched: {patchedDate}</>
              ) : (
                "Unknown"
              )}
            </div>
            <Separator className="mx-2" orientation="vertical" />
            {breach.affectedUsers}
          </div> */}
        </CardTitle>
        <CardDescription className="font-jetbrains-mono">
          {breach.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {breach.affectedUsers && (
            <p>
              Affect{breach.patchedDate ? "ed" : "s"} {breach.affectedUsers}
            </p>
          )}
          <div>
            {/* <p className="font-semibold mb-2">Data Types:</p> */}
            <div className="flex flex-wrap gap-2">
              {breach.dataTypes.map((type, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 