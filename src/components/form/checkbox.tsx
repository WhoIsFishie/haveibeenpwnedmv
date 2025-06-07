import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Checkbox({ key, label, onChange }: { key: string, label: string } & React.ComponentProps<typeof Switch>) {
  <div className="flex items-center space-x-2">
    <Switch id={key} onChange={onChange} />
    <Label htmlFor={key}>{label}</Label>
  </div>;
}
