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
import { Outlet, useNavigate, useLocation } from "react-router-dom"; 
import AuthContext from "../../context/AuthContext";

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
  const navigate = useNavigate(); 
  const { logout } = React.useContext(AuthContext);

  const demoWindow = window !== undefined ? window() : undefined;

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path === '/logout') {
          logout().then(() => {
            navigate("/signin");
          });
        } else {
          navigate(`/dashboard${path}`);
        }
      },
    };
  }, [location.pathname, navigate, logout]);

  return (
    <AppProvider
      navigation={NAVIGATION.map((nav) => ({
        ...nav,
        selected: location.pathname.includes(`/dashboard/${nav.segment}`),
      }))}
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
