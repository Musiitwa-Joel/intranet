import React, { Suspense, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import registrationLogo from "../../assets/registration.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { purple } from "@mui/material/colors";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FusePageCarded from "@fuse/core/FusePageCarded";

import { lighten, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import {
  selectActiveTab,
  setActiveTab,
  setEnrollmentStatuses,
} from "./store/registrationSlice";
import Register from "./tabs/register/Register";
import { gql, useQuery } from "@apollo/client";
import { LOAD_ENROLLMENT_STATUSES } from "./gql/queries";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { updateAccYrs } from "../setup/store/setUpSlice";
import Reports from "./tabs/reports/Reports";

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

const LOAD_ACC_YRS = gql`
  query getAccYrs {
    acc_yrs {
      id
      acc_yr_title
    }
  }
`;

const Registration = React.memo(function Setup() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const activeApp = useSelector((state) => state.apps.activeApp);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const enrollmentTypes = useSelector(setEnrollmentStatuses);
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    loading: loadingEnrollmentStatuses,
    error,
    data,
  } = useQuery(LOAD_ENROLLMENT_STATUSES);

  const {
    loading: loadingAccYrs,
    error: loadErr,
    data: accYrRes,
  } = useQuery(LOAD_ACC_YRS);

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (loadErr) {
      dispatch(
        showMessage({
          message: loadErr.message,
          variant: "error",
        })
      );
    }
  }, [error, loadErr]);

  useEffect(() => {
    if (data) {
      // console.log("data", data);
      dispatch(setEnrollmentStatuses(data.enrollment_types));
    }

    if (accYrRes) {
      // console.log("data", data);
      dispatch(updateAccYrs(accYrRes.acc_yrs));
    }
  }, [data, accYrRes]);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

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
    dispatch(setActiveTab(value));
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
      {loading || loadingEnrollmentStatuses ? (
        <FuseLoading logo={registrationLogo} />
      ) : (
        <Suspense fallback={<FuseLoading logo={registrationLogo} />}>
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
                    Registration
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
                      label="Register Students"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Reports"
                    />
                    <Tab
                      className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                      disableRipple
                      label="Blocked Students"
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

            {activeTab === 0 && <Register />}
            {activeTab === 1 && <Reports />}
          </Box>
        </Suspense>
      )}
    </>
  );
});

// export default Setup;

export default Registration;
