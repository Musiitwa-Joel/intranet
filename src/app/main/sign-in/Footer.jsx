import { Badge } from "antd";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        background: "#fff",
        color: theme.palette.text.secondary, // Corrected color usage
        gap: "8px",
        marginTop: 20,
      }}
    >
      <span>© {new Date().getFullYear()}</span>|
      <Badge status="processing" />
      <span>All Systems Operational</span>
    </footer>
  );
};

export default Footer;
