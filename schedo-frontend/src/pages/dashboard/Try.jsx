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

// Navigation for the dashboard
const NAVIGATION = [
  {
    segment: "analytics",
    title: "Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    segment: "events",
    title: "Events",
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

// Page content based on the route
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default function DashboardLayoutBranding(props) {
  const { window } = props;
  const [pathname, setPathname] = React.useState("/analytics");

  // Router functionality for navigating between segments
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
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
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}