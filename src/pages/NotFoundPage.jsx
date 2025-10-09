import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col items-center text-center bg-white p-10 rounded-2xl shadow-md max-w-[480px]">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 text-red-600 bg-red-100 rounded-full">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-800">
          This form link isn’t valid
        </h1>

        {/* Description */}
        <p className="mt-2 leading-relaxed text-slate-500">
          The link you followed may be broken, expired, or no longer available.
          If you believe this is an error, please contact our team at{" "}
          <a
            target="_blank"
            className="text-blue-600 underline"
            href="mailto:support@the360mails.com"
          >
            support@the360mails.com
          </a>
        </p>

        {/* Back CTA */}
        <Link
          to="/"
          className="px-6 py-3 mt-6 font-medium text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
