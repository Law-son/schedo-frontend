// src/App.jsx
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { RequireAuth } from "react-auth-kit";

// pages
import Home from "./pages/home/Home";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Error404 from "./pages/Error404";
import EventSummary from "./pages/eventSummary/EventSummary";

// Layout
import RouteLayout from "./layouts/RouteLayout";

// Components
import "flowbite/dist/flowbite.min.css";
import { EventProvider } from "./context/EventContext";
import RegisterForEvent from "./pages/registration/RegisterForEvent";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="event-summary/:id" element={<EventSummary />} />
      <Route path="register/" element={<RegisterForEvent />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth loginPath="/login">
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <EventProvider> {/* Place EventProvider at the top */}
      <RouterProvider router={routes} />
    </EventProvider>
  );
}

export default App;
