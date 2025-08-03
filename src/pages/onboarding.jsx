import React from "react";

export default function Onboarding() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col gap-3 rounded-2xl justify-center max-w-[628px] p-10 bg-white">
        <img src="/companyLogo.png" alt="Onboarding" className="w-48" />
        <h1 className="mt-4 text-2xl font-semibold text-slate-700">
          Lets get your brand ready to soar with us
        </h1>
        <p className="mt-2 text-slate-500">
          This quick questionnaire (⏱️ 10–15 minutes) helps us deeply understand
          your voice, customers, and goals — so we can craft powerful email
          flows that connect, convert, and boost your revenue
        </p>
        <div className="flex items-center w-full gap-2 p-4 rounded-lg bg-slate-100">
          <img src="/bulb.png" alt="bulb" className="w-3 " />
          <p className="text-sm text-slate-500">
            Pro tip: The more accurate your answers, the better your results!
          </p>
        </div>

        <button className="px-6 py-4 mt-4 text-lg font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700">
          Lets get started
        </button>
      </div>
    </div>
  );
}
