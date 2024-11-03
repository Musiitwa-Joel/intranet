import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import FuseLoading from "@fuse/core/FuseLoading";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import admissions from "../../assets/admissions.png";
import Applicants from "./tabs/applicants/Applicants";
import Reports from "./tabs/reports/Reports";
import Settings from "./tabs/settings/Settings";
import AdmissiblePHDStds from "./tabs/admissible_phd_std/AdmissiblePHDStds";
import { updateActiveTab } from "app/store/admissionsSlice";
import Admitted from "./tabs/admitted/Admitted";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Admissions = React.memo(function Admissions() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const { activeTab } = useSelector((state) => state.admissions.module_state);
  // const [selectedTab, setSelectedTab] = useState(0);
  const apps = useSelector((state) => state.apps.apps);
  const activeApp = apps.find((app) => app.route === "admissions");
  // const { selectedTab } = activeApp.data[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);

  function handleTabChange(event, value) {
    // setSelectedTab(value);
    // dispatch(admissionsTabChanged(value));
    dispatch(updateActiveTab(value));
  }

  // console.log("selected tab", selectedTab);

  // console.log("apps in taskbar", taskBarApps);
  useEffect(() => {
    // const exists = checkAppExistence(taskBarApps, "route", "admissions");

    if (!appExistsInTaskBar) {
      // if (!applicantReqsLoaded && !error) {

      // }
      setLoading(true);
    } else {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading logo={admissions} />
      ) : (
        <Suspense fallback={<FuseLoading logo={admissions} />}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
              <Toolbar
                variant="dense"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <img
                      src={activeApp.logo}
                      alt="logo"
                      width={30}
                      height={30}
                    />
                  </div>
                  {/* <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  // sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton> */}
                  <Typography variant="h6" color="inherit" component="div">
                    Admissions
                  </Typography>

                  <div className="hidden lg:flex h-32 mx-20" />

                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons={false}
                    className="-mx-4 min-h-40"
                    classes={{
                      indicator:
                        "flex justify-center bg-transparent w-full h-full",
                    }}
                    TabIndicatorProps={{
                      children: (
                        <Box
                          sx={{ bgcolor: "text.disabled" }}
                          className="w-full h-full rounded-full opacity-20"
                        />
                      ),
                    }}
                  >
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Applicants"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Admissible PhD Students"
                    />
                    {/* <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Weighting and selection"
                    /> */}
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Admitted"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Change of program"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Report"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Settings"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Uneb Results"
                    />
                  </Tabs>
                </div>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/material-ui-static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>

            {activeTab === 0 && <Applicants />}
            {activeTab === 2 && <Admitted />}
            {activeTab === 4 && <Reports />}
            {activeTab === 5 && <Settings />}
          </Box>
        </Suspense>
      )}
    </>
  );
});

export default Admissions;
