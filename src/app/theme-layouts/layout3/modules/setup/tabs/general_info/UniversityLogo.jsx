import React from "react";
import tredumoLogo from "../../../../assets/nkumba-uninersity.png";

function UniversityLogo() {
  return (
    <>
      <h5
        style={{
          fontSize: 25,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        University Logo
      </h5>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <img
          src={tredumoLogo}
          style={{
            width: "80%",
          }}
        />
      </div>
    </>
  );
}

export default UniversityLogo;
