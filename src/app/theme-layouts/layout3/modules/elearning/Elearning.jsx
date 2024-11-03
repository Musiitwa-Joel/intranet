import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";

// import resultsLogo from "../../assets/results.png";
import elearning from "../../assets/elearning.png";

function Elearnig() {
  const [loading, setLoading] = useState(false);
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);

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
        <FuseLoading logo={elearning} />
      ) : (
        <div
          style={{
            height: "calc(100vh - 200px)",
          }}
        >
          <iframe
            src="https://elearning.nkumbauniversity.ac.ug/course/"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Embedded App"
          />
        </div>
      )}
    </>
  );
}

export default Elearnig;
