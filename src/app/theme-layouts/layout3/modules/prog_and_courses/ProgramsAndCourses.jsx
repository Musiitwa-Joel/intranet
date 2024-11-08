import React, { useMemo } from "react";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";

import ProgramAndCourseLogo from "../../assets/programcourses.png";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Programmes from "./tabs/programmes/Programmes";
import College from "./tabs/college/College";
import Schools from "./tabs/schools/Schools";
import Departments from "./tabs/departments/Departments";
import GradingSystems from "./tabs/grading/GradingSystems";
import { updateActiveTab } from "./store/progAndCoursesSlice";
import { ConfigProvider, Tabs as Tabs2 } from "antd";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import "./programs.css";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const { TabPane } = Tabs2;

function ProgramsAndCourses() {
  const dispatch = useDispatch();

  const [position, setPosition] = useState(["left", "right"]);

  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeApp = useSelector((state) => state.apps.activeApp);
  // const { activeTab } = useSelector((state) => state.progAndCourses);

  // console.log("active app", activeApp);

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
  // console.log("active tab", activeTab);

  // console.log("reducer", reducer);

  // useEffect(() => {
  //   dispatch(getItems(routeParams.folderId));
  // }, [dispatch, routeParams.folderId]);

  useEffect(() => {
    if (!appExistsInTaskBar) {
      setLoading(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function handleTabChange(event, value) {
    // setSelectedTab(value);
    dispatch(updateActiveTab(value));
  }
  const OperationsSlot = {
    left: (
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
          <img src={activeApp.logo} alt="logo" width={30} height={30} />
        </div>
        {/* <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    // sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton> */}
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          noWrap
          style={{
            color: "#fff",
          }}
        >
          Course Administration Hub
        </Typography>

        <div className="hidden lg:flex h-32 mx-20" />
      </div>
    ),
    right: (
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
    ),
  };

  const slot = useMemo(() => {
    if (position.length === 0) {
      return null;
    }
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {}
    );
  }, [position]);

  return loading ? (
    <FuseLoading logo={ProgramAndCourseLogo} />
  ) : (
    <>
      <Suspense fallback={<FuseLoading logo={ProgramAndCourseLogo} />}>
        <Box sx={{ flexGrow: 1 }}>
          {/* <AliveScope> */}
          {/* <AppBar position="sticky">
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
                  <img src={activeApp.logo} alt="logo" width={30} height={30} />
                </div>

                <Typography variant="h6" color="inherit" component="div" noWrap>
                  Course Administration Hub
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
                    label="Courses"
                  />
                  <Tab
                    className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Colleges"
                  />
                  <Tab
                    className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Schools"
                  />
                  <Tab
                    className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Departments"
                  />
                  <Tab
                    className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Grading"
                  />
                  <Tab
                    className="text-16 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Other Configs" // include awards, program_levels, prog_versions,
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
          </AppBar> */}

          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  cardBg: "#1e293b",
                  itemColor: "lightgray",
                  itemActiveColor: "#fff",
                  cardGutter: 0,
                  itemSelectedColor: "#fff",
                },
              },
            }}
          >
            <Tabs2
              tabBarExtraContent={slot}
              className="custom-tabs"
              // type="card"
              tabBarStyle={{
                backgroundColor: "#1e293b",
                paddingLeft: 25,
                paddingRight: 25,
                marginBottom: 0,
              }}
              // renderTabBar={renderTabBar}
              tabBarGutter={5}
              items={[
                {
                  key: "1",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Courses
                    </span>
                  ),
                  children: <Programmes />,
                },
                {
                  key: "2",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Colleges
                    </span>
                  ),
                  children: <College />,
                },
                {
                  key: "3",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Schools
                    </span>
                  ),
                  children: <Schools />,
                },
                {
                  key: "4",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Departments
                    </span>
                  ),
                  children: <Departments />,
                },
                {
                  key: "5",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Grading
                    </span>
                  ),
                  children: <GradingSystems />,
                },
                {
                  key: "6",
                  label: (
                    <span
                      className="text-16 font-semibold"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      Other Configs
                    </span>
                  ),
                  // children: <Schools />,
                },
              ]}
              // onChange={onChange}
            />
          </ConfigProvider>

          {/* {activeTab === 0 && (
              <KeepAlive name="courses">
                <Programmes />
              </KeepAlive>
            )}

            {activeTab === 1 && <College />}
            {activeTab === 2 && <Schools />}
            {activeTab === 3 && <Departments />}
            {activeTab === 4 && <GradingSystems />} */}
          {/* </AliveScope> */}
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
    </>
  );
}

export default ProgramsAndCourses;
