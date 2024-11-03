import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
// import resultsLogo from "../../assets/results.png";
import StudentAssessmentLogo from "../../assets/assesement.png";

function EducationMonitoring() {
  const [loading, setLoading] = useState(false);
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);

  // console.log("apps in taskbar", taskBarApps);
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
        <FuseLoading logo={StudentAssessmentLogo} />
      ) : (
        <div
          style={{
            height: "calc(100vh - 200px)",
          }}
        >
          <iframe
            src="http://localhost:5174/"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Embedded App"
          />
        </div>
      )}
    </>
  );
}

export default EducationMonitoring;
