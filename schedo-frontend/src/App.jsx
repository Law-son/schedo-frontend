import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate, // Import Navigate for redirect
} from "react-router-dom";

// Pages
import Home from "./pages/home/Home";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import Error404 from "./pages/Error404";
import EventSummary from "./pages/eventSummary/EventSummary";
import DashboardLayoutBranding from "./pages/dashboard/DashboardLayoutBranding";

// Layout
import RouteLayout from "./layouts/RouteLayout";

// Components
import { EventProvider } from "./context/EventContext";
import RegisterForEvent from "./pages/registration/RegisterForEvent";
import RequireAuth from "./components/auth/RequireAuth";
import Events from "./pages/dashboard/Events";
import Archive from "./pages/dashboard/Archive";
import Scan from "./pages/dashboard/Scan";
import Analytics from "./pages/dashboard/Analytics";

// Create routes
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="event-summary/:id" element={<EventSummary />} />
      <Route path="register/" element={<RegisterForEvent />} />

      {/* Protect dashboard routes */}
      <Route
        path="dashboard/*"
        element={<DashboardLayoutBranding />}
      >
        {/* Default route: Redirect from /dashboard to /dashboard/analytics */}
        <Route index element={<Navigate to="analytics" />} />
        <Route path="analytics" element={<Analytics />} /> {/* Changed from Analytics to a valid component */}
        <Route path="events" element={<Events />} />
        <Route path="scan" element={<Scan />} />
        <Route path="archive" element={<Archive />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <EventProvider>
      <RouterProvider router={routes} />
    </EventProvider>
  );
}

export default App;
