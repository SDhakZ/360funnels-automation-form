import { Hourglass } from "lucide-react";

export default function LinkExpiredPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col items-center text-center bg-white p-10 rounded-2xl shadow-md max-w-[480px]">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-amber-100 text-amber-600">
          <Hourglass className="w-8 h-8" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-800">
          This link has expired
        </h1>

        {/* Description */}
        <p className="mt-2 leading-relaxed text-slate-500">
          Your onboarding form link is no longer active. It may have expired or
          been replaced by a new one. Please contact our team at{" "}
          <a
            target="_blank"
            className="text-blue-600 underline"
            href="mailto:operations@the360mails.com"
          >
            operations@the360mails.com
          </a>{" "}
          <br />
          if you need a new link.
        </p>
      </div>
    </div>
  );
}
