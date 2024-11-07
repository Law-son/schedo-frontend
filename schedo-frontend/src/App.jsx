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
import Ticket from "./pages/tickets/Ticket";
import DashboardLayoutBranding from "./pages/dashboard/DashboardLayoutBranding";

// Layout
import RouteLayout from "./layouts/RouteLayout";

// Components
import { EventProvider } from "./context/EventContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import RegisterForEvent from "./pages/registration/RegisterForEvent";
import RequireAuth from "./components/auth/RequireAuth";
import ManageEvents from "./pages/dashboard/ManageEvents";
import Archive from "./pages/dashboard/Archive";
import Scan from "./pages/dashboard/Scan";
import Analytics from "./pages/dashboard/Analytics";
import ScheduleEvent from "./pages/dashboard/ScheduleEvent";
import UpdateEvent from "./pages/dashboard/UpdateEvent";
import ViewEvent from "./pages/dashboard/ViewEvent";

// Create routes
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="event-summary/:id" element={<EventSummary />} />
      <Route path="register/" element={<RegisterForEvent />} />
      <Route path="ticket/:id" element={<Ticket />} />

      {/* Protect dashboard routes */}
      <Route
        path="dashboard/*"
        element={
            <DashboardLayoutBranding />
        }
      >
        {/* Default route: Redirect from /dashboard to /dashboard/analytics */}
        <Route index element={<Navigate to="/dashboard/analytics" />} /> 
        <Route path="analytics" element={<Analytics />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="scan" element={<Scan />} />
        <Route path="archive" element={<Archive />} />
        <Route path="schedule" element={<ScheduleEvent />} />
        <Route path="update" element={<UpdateEvent />} />
        <Route path="view" element={<ViewEvent />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);


function App() {
  return (
    <AuthProvider> {/* Wrap your app in AuthProvider */}
      <EventProvider>
        <RouterProvider router={routes} />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
