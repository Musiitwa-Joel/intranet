import React, { Suspense, useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import SetupLogo from "../../assets/setup.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { purple } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import FuseNavigation from "@fuse/core/FuseNavigation";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { motion } from "framer-motion";
import { lighten, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Campus from "./tabs/campus/Campus";
import Intake from "./tabs/intake/Intake";
import Levels from "./tabs/levels/Level";
import Awards from "./tabs/awards/Awards";
import Study_Time from "./tabs/study_time/Study_Time";
import Menu from "@mui/material/Menu";
// import GeneralInfo from "./tabs/general_info/GeneralInfo";
import GeneralInformation from "./tabs/general_info/GeneralInformation";
import { updateActiveTab } from "./store/setUpSlice";
import AcademicYears from "./tabs/academic_yr/AcademicYears";
import AcademicCalendar from "./tabs/academic_calendar/AcademicCalendar";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {},
  "& .FusePageCarded-wrapper": {},
  "& .FusePageCarded-leftSidebar": {},
  "& .description": {
    fontSize: 20,
    marginBottom: 40,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#4f46e6",
  "&:hover": {
    backgroundColor: "#4f46e6",
  },
}));

const Setup = React.memo(function Setup() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const [selectedTab, setSelectedTab] = useState(0);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.setUp.activeTab);

  const [acc_yr, setAccYr] = React.useState("");
  const [scheme, setScheme] = React.useState("");
  const [intake, setIntake] = React.useState("");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
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

  const handleChange = (event) => {
    setAccYr(event.target.value);
  };
  const handleChangeScheme = (event) => {
    setScheme(event.target.value);
  };

  const handleChangeIntake = (event) => {
    setIntake(event.target.value);
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
    dispatch(updateActiveTab(value));
  }

  // console.log("apps in taskbar", taskBarApps);
  useEffect(() => {
    // const exists = checkAppExistence(taskBarApps, "route", "admissions");

    if (!appExistsInTaskBar) {
      setLoading(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading logo={SetupLogo} />
      ) : (
        <Suspense fallback={<FuseLoading logo={SetupLogo} />}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
              {/* <Container maxWidth="xl"> */}
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

                  <Typography variant="h6" color="inherit" component="div">
                    System Setup
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
                      label="General Information"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Campuses"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Intakes"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Levels"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Awards"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Study Times"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Academic Years"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Academic Calendar"
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
              {/* </Container> */}
            </AppBar>

            {activeTab === 0 && <GeneralInformation />}
            {activeTab === 1 && <Campus />}
            {activeTab === 2 && <Intake />}
            {activeTab === 3 && <Levels />}
            {activeTab === 4 && <Awards />}
            {activeTab === 5 && <Study_Time />}
            {activeTab === 6 && <AcademicYears />}
            {activeTab === 7 && <AcademicCalendar />}
            {/* {selectedTab === 1 && <AboutTab />
              {selectedTab === 2 && <PhotosVideosTab />} */}

            {/* <Root
            content={
              <div className="flex flex-auto justify-center w-full  ml-20 mt-10 p-0 sm:p-0">
                {selectedTab === 0 && <Applicants />}
                {selectedTab === 1 && <AboutTab />}
              {selectedTab === 2 && <PhotosVideosTab />}
              </div>
            }
           
          /> */}
          </Box>
        </Suspense>
      )}
    </>
  );
});

// export default Setup;

export default Setup;
