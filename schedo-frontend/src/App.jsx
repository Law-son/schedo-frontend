import './App.css'
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
import Error404 from "./pages/Error404"

// Layout
import RouteLayout from "./layouts/RouteLayout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<SignIn />} />
      <Route path="dashboard" element={<RequireAuth loginPath="/login"> <Dashboard socket={socket} /> </RequireAuth>} />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes} />;
} 

export default App;
