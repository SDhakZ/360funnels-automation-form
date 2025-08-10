import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowLeft, Copy, Clock } from "lucide-react";

export default function ThankYou({
  brandName = "",
  submissionId = "",
  onRestart,
}) {
  const copyId = async () => {
    if (!submissionId) return;
    try {
      await navigator.clipboard.writeText(submissionId);
    } catch {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl"
      >
        <Card className="relative overflow-hidden">
          {/* subtle decorative glow */}
          <div className="absolute rounded-full pointer-events-none -top-24 -right-24 h-60 w-60 bg-green-200/40 blur-3xl" />
          <CardHeader className="flex items-center gap-1 pt-8 pb-2 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Thanks for submitting{brandName ? `, ${brandName}` : ""}!
            </h1>
            <p className="text-muted-foreground">
              We’ve received your onboarding details. Our team will review them
              and get back to you if we need anything else.
            </p>
            <div className="mt-3">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                Submission received
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="mt-4 space-y-3">
            {submissionId ? (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex gap-2 text-sm">
                  <div className="font-medium">Submission ID:</div>
                  <div className="text-muted-foreground">{submissionId}</div>
                </div>
                <Button variant="outline" size="sm" onClick={copyId}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            ) : null}

            <ul className="mt-4 space-y-1 text-sm list-disc list-inside text-muted-foreground">
              <li>
                We’ll start setting up your workspace using the details
                provided.
              </li>
              <li>
                If clarifications are needed, we’ll reach out via your preferred
                contact.
              </li>
              <li>You can begin a new submission at any time.</li>
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={onRestart}>
              Start a new submission
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
