import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { memo } from "react";
import {
  selectFuseCurrentLayoutConfig,
  selectToolbarTheme,
} from "@fuse/core/FuseSettings/fuseSettingsSlice";
import NavbarToggleButton from "app/theme-layouts/shared-components/navbar/NavbarToggleButton";
import { useAppSelector } from "app/store/hooks";
import AdjustFontSize from "../../shared-components/AdjustFontSize";
import FullScreenToggle from "../../shared-components/FullScreenToggle";
import LanguageSwitcher from "../../shared-components/LanguageSwitcher";
import NavigationSearch from "../../shared-components/navigation/NavigationSearch";
import UserMenu from "../../shared-components/UserMenu";
import QuickPanelToggleButton from "../../shared-components/quickPanel/QuickPanelToggleButton";
import { url2 } from "app/configs/apiConfig";

/**
 * The toolbar layout 3.
 */
function ToolbarLayout3(props) {
  const { className = "" } = props;
  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useAppSelector(selectToolbarTheme);
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx("relative z-20 flex shadow-md", className)}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
      >
        <Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}

          <Hidden lgDown>
            <div className={clsx("flex shrink-0 items-center")}>
              <img
                src={`${url2}/university/nkumba-university.png`}
                style={{
                  width: 120,
                }}
              />
              {/* NKUMBA UNIVERSITY */}
            </div>
          </Hidden>

          <div className="flex flex-1">
            {/* <Hidden smDown>
              <NavigationSearch className="mx-16 lg:mx-24" variant="basic" />
            </Hidden> */}
          </div>

          <div className="flex items-center px-8 md:px-0 h-full overflow-x-auto">
            <Hidden smUp>
              <NavigationSearch />
            </Hidden>

            {/* <Hidden lgUp>
              <ChatPanelToggleButton />
            </Hidden> */}

            {/* <LanguageSwitcher /> */}

            <AdjustFontSize />

            <FullScreenToggle />

            <QuickPanelToggleButton />

            {/* <NotificationPanelToggleButton /> */}

            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout3);
