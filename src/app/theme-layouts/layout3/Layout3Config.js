/**
 * The Layout3 Config object.
 */
const Layout3Config = {
  title: "Layout 3 - Horizontal",
  defaults: {
    mode: "container",
    containerWidth: 10000,
    scroll: "content",
    navbar: {
      display: false,
      style: "fixed",
      folded: true,
    },
    toolbar: {
      display: true,
      style: "static",
      position: "below",
    },
    footer: {
      display: true,
      style: "fixed",
    },
    leftSidePanel: {
      display: false,
    },
    rightSidePanel: {
      display: false,
    },
  },
  form: {
    mode: {
      title: "Mode",
      type: "radio",
      options: [
        {
          name: "Boxed",
          value: "boxed",
        },
        {
          name: "Full Width",
          value: "fullwidth",
        },
        {
          name: "Container",
          value: "container",
        },
      ],
    },
    containerWidth: {
      title: "Container Width (px)",
      type: "number",
    },
    navbar: {
      type: "group",
      title: "Navbar",
      children: {
        display: {
          title: "Display",
          type: "switch",
        },
        style: {
          title: "Style",
          type: "radio",
          options: [
            {
              name: "Fixed",
              value: "fixed",
            },
            {
              name: "Static",
              value: "static",
            },
          ],
        },
      },
    },
    toolbar: {
      type: "group",
      title: "Toolbar",
      children: {
        display: {
          title: "Display",
          type: "switch",
        },
        position: {
          title: "Position",
          type: "radio",
          options: [
            {
              name: "Above",
              value: "above",
            },
            {
              name: "Below",
              value: "below",
            },
          ],
        },
        style: {
          title: "Style",
          type: "radio",
          options: [
            {
              name: "Fixed",
              value: "fixed",
            },
            {
              name: "Static",
              value: "static",
            },
          ],
        },
      },
    },
    footer: {
      type: "group",
      title: "Footer",
      children: {
        display: {
          title: "Display",
          type: "switch",
        },
        style: {
          title: "Style",
          type: "radio",
          options: [
            {
              name: "Fixed",
              value: "fixed",
            },
            {
              name: "Static",
              value: "static",
            },
          ],
        },
      },
    },
  },
};
export default Layout3Config;
