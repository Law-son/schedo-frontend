// src/App.jsx
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { RequireAuth } from "react-auth-kit";
console.log('RequireAuth:', RequireAuth);

// pages
import Home from "./pages/home/Home";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import Error404 from "./pages/Error404";
import EventSummary from "./pages/eventSummary/EventSummary";
import DashboardLayoutBranding from "./pages/dashboard/DashboardLayoutBranding"; // Import Dashboard layout

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

      {/* Protect Dashboard routes */}
      <Route
        path="dashboard/*"
        // element={<DashboardLayoutBranding />}
        element={
          <RequireAuth loginPath="/signin">
            {" "}
            {/* Use SignIn page as login */}
            <DashboardLayoutBranding /> {/* Use the dashboard layout here */}
          </RequireAuth>
        }
      >
        {/* Nested routes for dashboard sections */}
        <Route path="orders" element={<h1>Orders Page</h1>} />
        <Route path="analytics" element={<h1>Analytics Page</h1>} />
        {/* You can add more dashboard-related pages here */}
      </Route>

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <EventProvider>
      {" "}
      {/* Place EventProvider at the top */}
      <RouterProvider router={routes} />
    </EventProvider>
  );
}

export default App;
