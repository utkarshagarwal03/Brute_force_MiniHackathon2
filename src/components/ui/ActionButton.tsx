
import { ReactNode } from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonProps {
  icon?: ReactNode;
  label: string;
  description?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  colorClass?: string;
}

export function ActionButton({ 
  icon, 
  label, 
  description, 
  variant = "default", 
  colorClass, 
  className,
  ...props 
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "flex flex-col items-center justify-center h-auto py-6 px-4 space-y-2 min-w-[150px]",
        colorClass,
        className
      )}
      {...props}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <span className="font-medium text-lg">{label}</span>
      {description && <span className="text-xs opacity-80">{description}</span>}
    </Button>
  );
}
