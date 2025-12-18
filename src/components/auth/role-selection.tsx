"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  Building2,
  Scale,
  Landmark,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export type UserRole = "investor" | "broker" | "lawyer" | "mortgage_advisor";

interface RoleOption {
  id: UserRole;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "investor",
    icon: <TrendingUp className="h-6 w-6" />,
    titleKey: "investor",
    descriptionKey: "investorDescription",
  },
  {
    id: "broker",
    icon: <Building2 className="h-6 w-6" />,
    titleKey: "broker",
    descriptionKey: "brokerDescription",
  },
  {
    id: "lawyer",
    icon: <Scale className="h-6 w-6" />,
    titleKey: "lawyer",
    descriptionKey: "lawyerDescription",
  },
  {
    id: "mortgage_advisor",
    icon: <Landmark className="h-6 w-6" />,
    titleKey: "mortgageAdvisor",
    descriptionKey: "mortgageAdvisorDescription",
  },
];

interface RoleSelectionProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
  disabled?: boolean;
}

export function RoleSelection({
  selectedRole,
  onRoleSelect,
  disabled = false,
}: RoleSelectionProps) {
  const t = useTranslations("auth.roles");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {roleOptions.map((role) => {
        const isSelected = selectedRole === role.id;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleSelect(role.id)}
            disabled={disabled}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-lg border-2 transition-all duration-200 text-start",
              "hover:border-primary/50 hover:bg-accent/50",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card"
            )}
          >
            {isSelected && (
              <div className="absolute top-2 end-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg mb-3",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {role.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{t(role.titleKey)}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {t(role.descriptionKey)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
