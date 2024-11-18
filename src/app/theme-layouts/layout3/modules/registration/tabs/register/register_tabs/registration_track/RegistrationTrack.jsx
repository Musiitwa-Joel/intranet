import React, { useRef, useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Timeline,
  Badge,
  Card,
  Radio,
  Descriptions,
  Row,
  Col,
  Button,
  ConfigProvider,
} from "antd";
import PerfectScrollbar from "perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStudentData,
  setRegistrationPermitModalVisible,
} from "../../../../store/registrationSlice";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";
import { Delete, Edit, Print, RemoveRedEye } from "@mui/icons-material";
import ExaminationPermit from "./ExaminationPermit";
import { useLazyQuery } from "@apollo/client";
import { GET_STUDENT_REGISTERED_COURSEUNITS } from "../../../../gql/queries";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";

const RegistrationTrack = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const studentFile = useSelector(selectStudentData);
  const [selectedReg, setSelectedReg] = React.useState(null);
  const [selectedModules, setSelectedModules] = useState([]);

  const [
    getStudentRegisteredCourseUnits,
    { error, loading, data: studentRegisteredCourseUnitsRes },
  ] = useLazyQuery(GET_STUDENT_REGISTERED_COURSEUNITS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }
  }, [error]);

  const handlePreviewExamPermit = async (reg) => {
    const res = await getStudentRegisteredCourseUnits({
      variables: {
        studentNo: studentFile?.student_no,
        studyYear: parseInt(reg?.study_yr),
        sem: parseInt(reg?.sem),
      },
    });

    // console.log("modules", res.data?.student_registered_courseunits);
    if (res.data?.student_registered_courseunits) {
      setSelectedModules(res.data?.student_registered_courseunits);
    }

    setSelectedReg(reg);
    dispatch(setRegistrationPermitModalVisible(true));
  };

  // console.log("student file", studentFile);

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
        <Radio.Group
        //    value={activeBioDataTab}
        //    onChange={handleTabChange}
        >
          <Radio.Button value="academic_info">
            Add Missed Registration
          </Radio.Button>
          <Radio.Button value="personal_info">Move Back A Year</Radio.Button>
        </Radio.Group>
      </div>
      <div
        ref={scrollContainerRef}
        style={{
          position: "relative",
          height: "calc(100vh - 260px)", // Adjust this height as needed
          // marginTop: 10,
          // backgroundColor: "red",
          padding: 20,
          overflow: "hidden", // Hide default scrollbars
        }}
      >
        {studentFile ? (
          <ConfigProvider
            key={"registration"}
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
              items={studentFile?.registration_history.map((reg) => ({
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
                      title={`Year ${reg.study_yr}, Semester ${reg.sem} (${reg.acc_yr_title})`}
                      size="small"
                      style={{
                        borderColor: "lightgray",
                        borderWidth: 1,
                      }}
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={12} lg={14} xl={16}>
                          <Descriptions
                            className="custom-descriptions"
                            bordered
                            size="small"
                            items={[
                              {
                                key: "1",
                                label: "Registered By",
                                children: reg.registered_by,
                                span: 2,
                              },
                              {
                                key: "6",
                                label: "Registration Date",
                                children: formatDateString(parseInt(reg.date)),
                                span: 2,
                              },
                              {
                                key: "6",
                                label: "Registration Token",
                                children: reg.registration_token,
                                span: 2,
                              },
                              // {
                              //   key: "3",
                              //   label: "Provisional Expiry",
                              //   children: reg.provisional_expiry,
                              //   span: 2,
                              // },
                              {
                                key: "4",
                                label: "Comment",
                                children: reg.reg_comments,
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
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={10} xl={8}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8, // Space between buttons
                              marginTop: 2,
                              marginBottom: 10,
                            }}
                          >
                            <Button
                              type="primary"
                              ghost
                              icon={<Print />}
                              style={{ width: "100%" }}
                              loading={loading}
                              disabled={loading}
                              onClick={() => handlePreviewExamPermit(reg)}
                            >
                              Preview Examination Permit
                            </Button>

                            <Button
                              type="primary"
                              ghost
                              icon={<Edit />}
                              style={{ width: "100%" }}
                              // onClick={() => {
                              //   dispatch(setSelectedEnrollment(enrollment));
                              //   dispatch(setEditEnrollmentVisible(true));
                              // }}
                            >
                              Edit Registration
                            </Button>

                            <Button
                              danger
                              icon={<Delete />}
                              style={{ width: "100%" }}
                              // onClick={() => handleDelete(enrollment)}
                            >
                              Delete Registration
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Badge.Ribbon>
                ),
              }))}
            />
          </ConfigProvider>
        ) : null}
      </div>
      <ExaminationPermit
        study_yr={selectedReg?.study_yr}
        semester={selectedReg?.sem}
        reg={selectedReg}
        selectedModules={selectedModules}
      />
    </>
  );
};

export default RegistrationTrack;
