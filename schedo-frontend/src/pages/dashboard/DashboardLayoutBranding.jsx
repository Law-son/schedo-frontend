import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EventIcon from "@mui/icons-material/Event";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ArchiveIcon from "@mui/icons-material/Archive";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

// Navigation for the dashboard, use segment names without "/dashboard"
const NAVIGATION = [
  {
    segment: "analytics",
    title: "Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    segment: "events",
    title: "Manage Events",
    icon: <EventIcon />,
  },
  {
    segment: "scan",
    title: "Scan Ticket",
    icon: <QrCodeScannerIcon />,
  },
  {
    segment: "archive",
    title: "Archive",
    icon: <ArchiveIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

// Theme setup for the dashboard layout
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBranding(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate to handle navigation

  const demoWindow = window !== undefined ? window() : undefined;

  // Update navigation handling to correctly use "/dashboard" as base path only once
  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => navigate(`/dashboard${path}`), // Correctly navigate with single "/dashboard/"
    };
  }, [location.pathname, navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION} // Leave navigation segments as simple strings (e.g. "analytics")
      branding={{
        logo: (
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-primary-blue md:text-4xl lg:text-3xl">
            Schedo
          </span>
        ),
        title: "",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}
