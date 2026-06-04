import { AlertCircleIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

type Props = {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success" | "warning";
};

export function AlertMessage({
  title,
  description,
  variant = "default",
}: Props) {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
}