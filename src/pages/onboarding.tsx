import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgByToken } from "@/thunk/orgThunk";
import type { RootState, AppDispatch } from "@/store";
import type { Organization } from "@/features/orgSlice";

export default function Onboarding() {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { org, loading } = useSelector(
    (state: RootState) => state.organization,
  );
  const orgData = org as Organization;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch org details when page loads
  useEffect(() => {
    if (token) {
      dispatch(fetchOrgByToken(token))
        .unwrap()
        .catch(() => navigate("/link-expired", { replace: true }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (orgData?.logo) setImageLoaded(true);
  }, [org]);

  // --- Normal UI when token is valid ---
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col gap-3 rounded-2xl justify-center max-w-[628px] p-10 bg-white shadow-md">
        {/* Logo area */}
        <div className="relative flex items-center justify-center h-12 w-44">
          {loading || !imageLoaded ? (
            <div className="absolute inset-0 bg-gray-100 rounded-md animate-pulse" />
          ) : null}

          <img
            src={orgData?.logo as string}
            alt={(orgData?.name as string) || "Brand logo"}
            onLoad={() => setImageLoaded(true)}
            className={`object-contain w-48 transition-all duration-700 ease-out 
              ${
                imageLoaded
                  ? "opacity-100 blur-0 scale-100"
                  : "opacity-0 blur-sm scale-95"
              }`}
          />
        </div>

        {/* Text Content */}
        <h1 className="mt-4 text-2xl font-semibold text-slate-700">
          Let’s get your brand ready to soar with us
        </h1>
        <p className="mt-2 text-slate-500">
          This quick questionnaire (⏱️ 10–15 minutes) helps us deeply understand
          your voice, customers, and goals — so we can craft powerful email
          flows that connect, convert, and boost your revenue.
        </p>

        <div className="flex items-center w-full gap-2 p-4 rounded-lg bg-slate-100">
          <img src="/form/bulb.png" alt="bulb" className="w-3" />
          <p className="text-sm text-slate-500">
            Pro tip: The more accurate your answers, the better your results!
          </p>
        </div>

        {/* CTA */}
        <Link
          to={`/${token}/multistep-form`}
          className="flex items-center justify-center px-6 py-4 mt-4 text-lg font-semibold text-white transition-colors rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Let’s get started
        </Link>
      </div>
    </div>
  );
}
