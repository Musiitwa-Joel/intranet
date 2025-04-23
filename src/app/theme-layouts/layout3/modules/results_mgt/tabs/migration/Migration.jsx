import React, { useState } from "react";
import { Card } from "antd";
import ActiveStdResultsUpload from "./active_students/ActiveStdResultsUpload";
import SubmissionHistory from "../results_submission/SubmissionHistory";
import UploadHistory from "./upload_history/UploadHistory";

const tabListNoTitle = [
  {
    key: "active_students",
    label: "Active Students Results Upload",
  },
  // {
  //   key: "completed_students",
  //   label: "Completed Students Results Batch Upload",
  // },
  {
    key: "upload_history",
    label: "Upload History",
  },
];
const contentListNoTitle = {
  active_students: <ActiveStdResultsUpload />,
  // final_results_submission: <FinalResultsSubmission />,
  upload_history: <UploadHistory />,
};
const Migration = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("active_students");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <div
        style={{
          padding: 10,
        }}
      >
        <Card
          style={{
            width: "100%",
            borderColor: "lightgray",
          }}
          size="small"
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          bordered
          onTabChange={onTab2Change}
          tabProps={{
            size: "small",
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
    </>
  );
};
export default Migration;
