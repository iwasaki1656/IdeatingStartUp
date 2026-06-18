import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/10 text-primary",
        eco: "border-eco/30 bg-eco/10 text-eco",
        outline: "border-white/20 text-foreground/70",
        warning:
          "border-amber-400/30 bg-amber-400/10 text-amber-300",
        danger: "border-rose-500/30 bg-rose-500/10 text-rose-300",
        purple: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
        muted: "border-white/10 bg-white/5 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
