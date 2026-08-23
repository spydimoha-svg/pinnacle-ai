import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import { Spinner } from "./components/ui";
import { useStore } from "./lib/store";

// Lazy: its import chain pulls in the Supabase SDK, which a logged-out visitor
// should never have to download. Also gated on being a signed-in student below
// so the fetch only happens for someone who can actually use cloud sync.
const CloudSync = lazy(() => import("./components/CloudSync"));

const Landing = lazy(() => import("./pages/Landing"));
// The cinematic narrative. Lazy so the three/R3F bundle stays out of the
// entry chunk for everyone who never visits it.
const Experience = lazy(() => import("./experience/Experience"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const MasterAccess = lazy(() => import("./pages/MasterAccess"));

const Dashboard = lazy(() => import("./pages/app/Dashboard"));
const Planner = lazy(() => import("./pages/app/Planner"));
const Tutor = lazy(() => import("./pages/app/Tutor"));
const Subjects = lazy(() => import("./pages/app/Subjects"));
const Chapter = lazy(() => import("./pages/app/Chapter"));
const Worksheets = lazy(() => import("./pages/app/Worksheets"));
const Papers = lazy(() => import("./pages/app/Papers"));
const LibraryPage = lazy(() => import("./pages/app/Library"));
const Videos = lazy(() => import("./pages/app/Videos"));
const Entrance = lazy(() => import("./pages/app/Entrance"));
const Blob = lazy(() => import("./pages/app/Blob"));
const Profile = lazy(() => import("./pages/app/Profile"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMaterials = lazy(() => import("./pages/admin/Materials"));
const AdminStudents = lazy(() => import("./pages/admin/Students"));
const AdminEvaluate = lazy(() => import("./pages/admin/Evaluate"));
const AppJourney = lazy(() => import("./pages/app/Journey"));
const AppTrial = lazy(() => import("./pages/app/Trial"));
const YourJourney = lazy(() => import("./pages/app/YourJourney"));
const Worlds = lazy(() => import("./pages/app/Worlds"));

const MasterDashboard = lazy(() => import("./pages/master/MasterDashboard"));
const MasterSchools = lazy(() => import("./pages/master/Schools"));
const MasterPricing = lazy(() => import("./pages/master/PricingControl"));
const MasterUpdates = lazy(() => import("./pages/master/Updates"));

function Fallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Spinner size={28} />
    </div>
  );
}

function CloudSyncGate() {
  const isStudent = useStore((s) => s.currentUser?.role === "student");
  if (!isStudent) return null;
  return (
    <Suspense fallback={null}>
      <CloudSync />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <CloudSyncGate />
      <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        {/* Hidden Pinnacle Master access — unlinked from all navigation */}
        <Route path="/summit" element={<MasterAccess />} />

        <Route
          path="/app"
          element={
            <Protected role="student">
              <Layout role="student" />
            </Protected>
          }
        >
          {/* YOUR JOURNEY replaces the dashboard: one mission, not nine
              cards. The old page is kept at /app/dashboard so nothing is
              lost while the new one settles. */}
          <Route index element={<YourJourney />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="planner" element={<Planner />} />
          <Route path="tutor" element={<Tutor />} />
          <Route path="journey/:chapterId" element={<AppJourney />} />
          <Route path="trial/:chapterId" element={<AppTrial />} />
          <Route path="subjects" element={<Worlds />} />
          <Route path="subjects/list" element={<Subjects />} />
          <Route path="chapter/:chapterId" element={<Chapter />} />
          <Route path="worksheets" element={<Worksheets />} />
          <Route path="papers" element={<Papers />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="videos" element={<Videos />} />
          <Route path="entrance" element={<Entrance />} />
          <Route path="blob" element={<Blob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Protected role="admin">
              <Layout role="admin" />
            </Protected>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="materials" element={<AdminMaterials />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="evaluate" element={<AdminEvaluate />} />
        </Route>

        <Route
          path="/master"
          element={
            <Protected role="master">
              <Layout role="master" />
            </Protected>
          }
        >
          <Route index element={<MasterDashboard />} />
          <Route path="schools" element={<MasterSchools />} />
          <Route path="pricing" element={<MasterPricing />} />
          <Route path="updates" element={<MasterUpdates />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  );
}
