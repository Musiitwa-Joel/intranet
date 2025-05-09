import React, { useRef, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline, Badge, Card } from "antd";
import PerfectScrollbar from "perfect-scrollbar";

const Registration = () => {
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);

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
        <Timeline
          // style={{
          //   paddingTop: 10,
          // }}
          items={[
            {
              color: "green",
              children: (
                <Badge.Ribbon text="Fully Registered" color="green">
                  <Card
                    title="Year 1, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },
            {
              color: "green",
              children: (
                <Badge.Ribbon text="Not Registered" color="red">
                  <Card
                    title="Year 3, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },
            {
              color: "red",
              children: (
                <Badge.Ribbon text="Partially Registered" color="green">
                  <Card
                    title="Year 3, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },
            {
              children: (
                <Badge.Ribbon text="Partially Registered" color="green">
                  <Card
                    title="Year 3, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },
            {
              color: "gray",
              children: (
                <Badge.Ribbon text="Partially Registered" color="green">
                  <Card
                    title="Year 3, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },

            {
              color: "#00CCFF",
              dot: <SmileOutlined />,
              children: (
                <Badge.Ribbon text="Fully Registered" color="green">
                  <Card
                    title="Year 3, Semester 1 (2023/2024)"
                    size="small"
                    type="inner"
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                          // backgroundColor: "red",
                        }}
                      >
                        Registered By:
                      </span>
                      <span>Self</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Provisional Expiry:
                      </span>
                      <span>{""}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 150,
                        }}
                      >
                        Registration Date:
                      </span>
                      <span>{"MON 10 AUGUST 2024, 01:45 AM"}</span>
                    </div>
                  </Card>
                </Badge.Ribbon>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Registration;
