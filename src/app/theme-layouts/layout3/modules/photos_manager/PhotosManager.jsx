import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import ClickableCardComponent from "./CardComponent";

import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import photoManage from "../../assets/photomanage.png";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import StudentBooth from "./StudentBooth/StudentBooth";
import StaffBooth from "./StaffBooth/StaffBooth";
import { selectActiveBooth, setActiveBooth } from "./store/photosSlice";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function PhotosManager() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [loading, setLoading] = useState(!appExistsInTaskBar ? true : false);
  const activeBooth = useSelector(selectActiveBooth);
  const dispatch = useDispatch();
  const activeApp = useSelector((state) => state.apps.activeApp);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleStudentCardClick = () => {
    // Handle card click logic here
    dispatch(setActiveBooth("student"));
  };
  const handleStaffCardClick = () => {
    // Handle card click logic here
    dispatch(setActiveBooth("staff"));
  };
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
        <FuseLoading logo={photoManage} />
      ) : (
        <Suspense fallback={<FuseLoading logo={photoManage} />}>
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
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    noWrap
                  >
                    Photo Booth
                  </Typography>

                  <div className="hidden lg:flex h-32 mx-20" />

                  <Tabs
                    value={0}
                    // onChange={handleTabChange}
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
                      label={
                        activeBooth == "student"
                          ? "Student Booth"
                          : activeBooth == "staff"
                            ? "Staff Booth"
                            : "Main Menu"
                      }
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

            {!activeBooth && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                  height: "calc(100vh - 99px)",
                }}
              >
                <div>
                  <ClickableCardComponent
                    title="Student Booth"
                    content="Add student photos."
                    onClick={handleStudentCardClick}
                  />
                </div>
                <div style={{ marginLeft: 10 }}>
                  <ClickableCardComponent
                    title="Staff Booth"
                    content="Add staff photos."
                    onClick={handleStaffCardClick}
                  />
                </div>
              </div>
            )}

            {activeBooth == "student" && <StudentBooth />}
            {activeBooth == "staff" && <StaffBooth />}
          </Box>
        </Suspense>
      )}
    </>
  );
}

export default PhotosManager;
