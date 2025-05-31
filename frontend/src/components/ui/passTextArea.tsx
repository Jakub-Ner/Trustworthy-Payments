import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function PassTextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="relative w-full max-w-md mb-4">
      <Input
        type={showApiKey ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        className="pr-10"
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 hover:!bg-transparent focus:ring-0 focus:!bg-transparent hover:!text-current"
        onClick={() => setShowApiKey((prev) => !prev)}
      >
        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </Button>
    </div>
  );
}
