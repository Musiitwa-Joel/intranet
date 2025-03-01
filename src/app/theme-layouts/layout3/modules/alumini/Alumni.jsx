import React, { useState } from "react";
import { Spin } from "antd"; // Ant Design spinner (optional)

const Alumni = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Show loader while iframe is loading */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin size="large" /> {/* Ant Design spinner */}
        </div>
      )}

      {/* iframe with onLoad event to hide loader when loaded */}
      <iframe
        src="http://tredumo.com/alumni"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: loading ? "none" : "block", // Hide until loaded
        }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default Alumni;
