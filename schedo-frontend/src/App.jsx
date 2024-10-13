// src/App.jsx
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
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
import { AuthProvider } from "./context/AuthContext";

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
        element={
            <DashboardLayoutBranding />
          // <RequireAuth>
          //   <DashboardLayoutBranding />
          // </RequireAuth>
        }
      >
        <Route path="orders" element={<h1>Orders Page</h1>} />
        <Route path="analytics" element={<h1>Analytics Page</h1>} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider> {/* AuthProvider below RouterProvider */}
      <EventProvider>
        <RouterProvider router={routes} />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
