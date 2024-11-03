import "./i18n";
import "./styles/app-base.css";
import "react-virtualized/styles.css";
import "./styles/app-components.css";
import "./styles/app-utilities.css";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';
/**
 * The root element of the application.
 */

// Create an HTTP link for file uploads
const uploadLink = createUploadLink({
  uri: "http://localhost:2323",
});

// Create a middleware to dynamically set headers
const authLink = setContext((operation, { headers }) => {
  // console.log("operation name", operation);
  return {
    headers: {
      ...headers,
      // "content-type": "application/json",
      "x-apollo-operation-name": operation.operationName || "Unknown", // Using full operation object
      "apollo-require-preflight": "true",
    },
  };
});

// Combine links
const client = new ApolloClient({
  link: authLink.concat(uploadLink), // Chain the middleware with the upload link
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
    <App />
  </ApolloProvider>
);
// reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
