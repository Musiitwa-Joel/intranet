import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "@fuse/core/FuseSettings/fuseSettingsSlice";
import MockAdapterProvider from "@mock-api/MockAdapterProvider";
import { useAppSelector } from "app/store/hooks";
import { useDispatch, useSelector } from "react-redux";
import withAppProviders from "./withAppProviders";
import AuthenticationProvider from "./auth/AuthenticationProvider";
import { useEffect } from "react";
import { setToken } from "./store/tokenSlice";
import { addAppToTaskBar } from "./store/appSlice";
import { userLoggedOut } from "./store/userSlice";
import { useApolloClient } from "@apollo/client";
// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

/**
 * The main App component.
 */
function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const langDirection = useAppSelector(selectCurrentLanguageDirection);

  const mainTheme = useSelector(selectMainTheme);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:8005") return;

      if (event.data.type === "LOGOUT") {
        dispatch(setToken(null)); // remove token
        dispatch(addAppToTaskBar([])); // close all apps
        dispatch(userLoggedOut()); // remove the user profile
        client.resetStore(); // reset all queries
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    // <MockAdapterProvider>
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} root>
        <AuthenticationProvider>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            classes={{
              containerRoot:
                "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
            }}
          >
            <FuseLayout layouts={themeLayouts} />
          </SnackbarProvider>
        </AuthenticationProvider>
      </FuseTheme>
    </CacheProvider>
    // </MockAdapterProvider>
  );
}

export default withAppProviders(App);
