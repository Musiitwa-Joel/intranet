import React, { useRef, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Timeline,
  Badge,
  Card,
  ConfigProvider,
  Descriptions,
  Typography
} from "antd";
import PerfectScrollbar from "perfect-scrollbar";
import { useSelector } from "react-redux";
import { selectStudentDetails } from "../../../store/infoCenterSlice";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";

const Enrollment = () => {
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const studentDetails = useSelector(selectStudentDetails);

  const enrollmentHist = studentDetails?.enrollment_history.filter(
    (enrollment) => enrollment.active && enrollment.enrollment_status.id !== "6"
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      psRef.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
      });
    }

    return () => {
      if (psRef.current) {
        psRef.current.destroy();
        psRef.current = null;
      }
    };
  }, []);
  return (
    <>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          style={{
            color: "dodgerblue",
            fontSize: "1.7rem",
            fontWeight: "500",
          }}
        >
          Student Enrollment Track
        </span>
      </div>
      <div
        ref={scrollContainerRef}
        style={{
          position: "relative",
          height: 360, // Adjust this height as needed
          // marginTop: 10,
          // backgroundColor: "red",
          padding: 20,
          overflow: "hidden", // Hide default scrollbars
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Timeline: {
                tailColor: "lightgray",
              },
              Card: {
                headerBg: "#f4f4f4",
                headerHeightSM: 38,
              },
            },
          }}
        >
          <Timeline
            items={enrollmentHist?.map((enrollment) => ({
              color:
                enrollment.study_yr == "1" &&
                enrollment.sem == "1" &&
                enrollment.enrollment_status.id == "1"
                  ? "#00CCFF"
                  : enrollment.enrollment_status.color_code,
              dot:
                enrollment.study_yr == "1" && enrollment.sem == "1" ? (
                  <SmileOutlined />
                ) : null,
              children: (
                <Badge.Ribbon
                  text={enrollment.enrollment_status.title}
                  color={
                    enrollment.study_yr == "1" &&
                    enrollment.sem == "1" &&
                    enrollment.enrollment_status.id == "1"
                      ? "#00CCFF"
                      : enrollment.enrollment_status.color_code
                  }
                >
                  <Card
                    key={"enrollment"}
                    title={
                      <Typography.Text strong>
                        {`Year ${enrollment.study_yr}, Semester ${enrollment.sem} (${enrollment.acc_yr_title})`}
                      </Typography.Text>
                    }
                    size="small"
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      color: "red",
                    }}
                  >
                    {enrollment.enrollment_status.id === "6" && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black overlay
                          zIndex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "1.5rem", // Scaled for smaller screens
                            fontWeight: "bold",
                          }}
                        >
                          DEAD SEMESTER - YEAR {enrollment.study_yr}, SEMESTER{" "}
                          {enrollment.sem}
                        </span>
                      </div>
                    )}
                    <Descriptions
                      className="custom-descriptions"
                      bordered
                      size="small"
                      items={[
                        {
                          key: "1",
                          label: "Enrolled By",
                          children:
                            enrollment.enrolled_by_type == "student"
                              ? "SELF"
                              : enrollment.enrolled_by_user,
                          span: 2,
                        },
                        {
                          key: "6",
                          label: "Invoiced",
                          children: enrollment.invoiced ? "TRUE" : "FALSE",
                          span: 2,
                        },
                        {
                          key: "3",
                          label: "Enrollment Token",
                          children: enrollment.enrollment_token,
                          span: 2,
                        },
                        {
                          key: "6",
                          label: "Enrollment Date",
                          children: formatDateString(
                            parseInt(enrollment.datetime)
                          ),
                          span: 2,
                        },
                      ]}
                      style={{
                        borderColor: "lightgray",
                        borderWidth: 0.2,
                        borderRadius: 10,
                      }}
                      labelStyle={{
                        width: "40%",
                        backgroundColor: "#e7edfe",
                        color: "#0832b7",
                        fontWeight: "bold",
                      }}
                      contentStyle={{
                        borderBottomColor: "red",
                        textAlign: "left",
                      }}
                      column={2}
                    />
                  </Card>
                </Badge.Ribbon>
              ),
            }))}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Enrollment;
