import React from "react";
import "./my_app.css";
import { motion } from "framer-motion";

const MyApp = ({ title, onClick, logo }) => {
  const lines = title.split("\n");

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: { duration: 0.04 },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      // className="myapp"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        boxShadow: 3,
        borderRadius: 10,
        cursor: "pointer",
        padding: 10,
        // backgroundColor: "red",
        width: 150,
      }}
    >
      {logo ? (
        <img src={logo} alt="logo" width={80} height={80} />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "lightgray",
            marginBottom: 5,
          }}
        ></div>
      )}
      <span
        style={{
          marginTop: 10,
          fontSize: "1.8rem",
          overflow: "hidden",
          whiteSpace: "normal",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          textOverflow: "ellipsis",
          // width: ,
          textAlign: "center",
        }}
      >
        {title}
      </span>
    </motion.div>
  );
};

export default MyApp;
