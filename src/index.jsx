import "./i18n";
import "./styles/app-base.css";
import "react-virtualized/styles.css";
import "./styles/app-components.css";
import "./styles/app-utilities.css";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useEffect } from "react";
import store from "app/store/store";
import { setToken } from "app/store/tokenSlice";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { addAppToTaskBar } from "app/store/appSlice";
import { userLoggedOut } from "app/store/userSlice";
import { mainUrl } from "app/configs/apiConfig";
import { ConfigProvider } from "antd";
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';
/**
 * The root element of the application.
 */

// Create an HTTP link for file uploads
// const uploadLink = createUploadLink({
//   uri: "http://localhost:2323",
// });

const uploadLink = createUploadLink({
  uri: mainUrl,
});

// Create a middleware to dynamically set headers
const authLink = setContext((operation, { headers }) => {
  const token = store.getState().token.token;
  return {
    headers: {
      ...headers,
      // "content-type": "application/json",
      "x-apollo-operation-name": operation.operationName || "Unknown", // Using full operation object
      "apollo-require-preflight": "true",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Error link to handle token expiration or invalid token errors
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      console.log("message", message);
      console.log("extensions", extensions);
      if (
        extensions?.code === "UNAUTHENTICATED" ||
        extensions?.code === "UNAUTHORIZED"
      ) {
        // Clear the token in your Redux store
        store.dispatch(setToken(null)); // Dispatch an action to clear the token
        store.dispatch(addAppToTaskBar([])); // close all apps
        store.dispatch(userLoggedOut()); // remove the user profile

        store.dispatch(
          showMessage({
            message: "Your Session has expired",
            variant: "error",
          })
        );
      }
    });
  }
});

// Combine links
const client = new ApolloClient({
  // link: authLink.concat(uploadLink), // Chain the middleware with the upload link
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
});
const container = document.getElementById("root");

// const client = new ApolloClient({
//   uri: "http://localhost:2323",
//   cache: new InMemoryCache(),
// });

if (!container) {
  throw new Error("Failed to find the root element");
}

/**
 * The root component of the application.
 */
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <ConfigProvider
      theme={
        {
          // algorithm: [theme.compactAlgorithm],
        }
      }
    >
      <App />
    </ConfigProvider>
  </ApolloProvider>
);
// reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
