import React, { useRef, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline, Badge, Card, ConfigProvider, Descriptions, theme, Typography } from "antd";
import PerfectScrollbar from "perfect-scrollbar";
import { useSelector } from "react-redux";
import { selectStudentDetails } from "../../../store/infoCenterSlice";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";

const Registration = () => {
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const studentDetails = useSelector(selectStudentDetails)

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
          Student Registration Track
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
            key={"registration"}
            theme={{
              algorithm: theme.compactAlgorithm,
              components: {
                Timeline: {
                  tailColor: "lightgray",
                },
                Card: {
                  headerBg: "#f4f4f4",
                  // headerHeightSM: 38,
                },
              },
            }}
          >
            <Timeline
              items={studentDetails?.registration_history.map((reg) => ({
                color: reg.provisional ? "green" : "blue",
                dot:
                  reg.study_yr == "1" && reg.sem == "1" ? (
                    <SmileOutlined />
                  ) : null,
                children: (
                  <Badge.Ribbon
                    text={
                      reg.provisional
                        ? "Provisionally Registered"
                        : "Fully Registered"
                    }
                    color={reg.provisional ? "green" : "blue"}
                  >
                    <Card
                      key={"registration"}
                      title={
                        <Typography.Text strong>
                          {`Year ${reg.study_yr}, Semester ${reg.sem} (${reg.acc_yr_title})`}

                        </Typography.Text>
                      }
                      size="small"
                      style={{
                        borderColor: "lightgray",
                        borderWidth: 1,
                      }}
                    >
                    
                          <Descriptions
                            className="custom-descriptions"
                            bordered
                            size="small"
                            items={[
                              {
                                key: "1",
                                label: "Registered By",
                                children: reg?.registered_by_user ? reg?.registered_by_user : "SYSTEM",
                                span: 2,
                              },
                              {
                                key: "6",
                                label: "Registration Date",
                                children: formatDateString(parseInt(reg.date)),
                                span: 2,
                              },
                              ...(reg.provisional
                                ? [
                                    {
                                      key: "3",
                                      label: "Provisional Expiry",
                                      children: (
                                        <span
                                          style={{
                                            color:
                                              new Date() <
                                              new Date(reg.provisional_expiry)
                                                ? "green"
                                                : "red",
                                          }}
                                        >
                                          {formatCustomDate(
                                            reg.provisional_expiry
                                          )}
                                        </span>
                                      ),
                                      span: 2,
                                    },
                                    {
                                      key: "3",
                                      label: "Provisional Reason",
                                      children: reg.provisional_reason,
                                      span: 2,
                                    },
                                  ]
                                : [
                                    {
                                      key: "6",
                                      label: "Registration Token",
                                      children: reg.registration_token,
                                      span: 2,
                                    },

                                    {
                                      key: "4",
                                      label: "Comment",
                                      children: reg.reg_comments,
                                      span: 2,
                                    },
                                  ]),
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

export default Registration;
