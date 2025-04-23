import React, { useEffect, useMemo } from "react";
import {
  Form,
  Row,
  Col,
  ConfigProvider,
  Select,
  Button,
  theme,
  FloatButton,
  Space,
  Spin,
} from "antd";
import { Add } from "@mui/icons-material";
import styled from "styled-components";
import Courseunit from "../components/Courseunit";
import _ from "lodash";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { Download } from "lucide-react";
import { LOAD_TIMETABLE_ENTRIES } from "../gql/queries";
import {
  selectDays,
  selectTimetableEntries,
  selectTimetableFormInput,
  setDays,
  setSelectedTTDetails,
  setTimetableEntries,
  setTimetableFormInput,
  setTimetableModalVisible,
} from "../store/timetableSlice";
import { useSelect } from "@mui/base";
import AddTimetableEntry from "../components/AddTimetableEntry";
import { DELETE_TIMETABLE_ENTRY } from "../gql/mutations";
// import "./timetable.css";

const convertTo12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${period}`;
};

function generateYearOptions(yearsBack = 10) {
  const currentYear = new Date().getFullYear();
  const options = [];

  for (let i = 0; i <= yearsBack; i++) {
    const year = currentYear - i;
    options.push({ label: `${year}`, value: year });
  }

  return options;
}

const LOAD_REQS = gql`
  query loadReqs {
    campuses {
      id
      campus_title
    }
    schools {
      id
      school_code
      school_title
    }
    intakes {
      id
      intake_title
    }
    tt_studytime_aliases {
      id
      alias
      days {
        id
        name
      }
    }
  }
`;

const StyledTable = styled.table`
  border: 1px solid #dee2e6;
  border-collapse: collapse;
  width: 100%;
`;

const StyledThead = styled.thead`
  background-color: #343a40; /* dark background for thead */
`;

const StyledTh = styled.th`
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  color: white;
  text-align: left;
  background-color: #ffffff80;

  /* Apply specific column widths */
  &.col-md-2 {
    width: 16.66%;
  }

  &.col-md-1 {
    width: 8.33%;
  }
`;

const dynamicDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const uniqueSessions = [
  {
    ls_id: "1",
    session_name: "MORNING",
    start_time: "7:00 AM",
    end_time: "10: 00 AM",
  },
  {
    ls_id: "2",
    session_name: "MIDMORNING",
    start_time: "7:00 AM",
    end_time: "10: 00 AM",
  },
];

function ViewTimetable() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const timetableFormInput = useSelector(selectTimetableFormInput)
  const { loading, error, data } = useQuery(LOAD_REQS);
  const [
    loadTimetableEntries,
    { loading: loadingEntries, error: loadEntriesErr, data: loadEntriesData },
  ] = useLazyQuery(LOAD_TIMETABLE_ENTRIES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });
  const days = useSelector(selectDays);
  const timetableEntries = useSelector(selectTimetableEntries);
  const [deleteTimetableEntry, {error: deleteErr, loading: deletingEntry}] = useMutation(DELETE_TIMETABLE_ENTRY, {
    refetchQueries: ["timetableEntries"],
  })

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (loadEntriesErr) {
      dispatch(
        showMessage({
          message: loadEntriesErr.message,
          variant: "error",
        })
      );
    }

    if (deleteErr) {
      dispatch(
        showMessage({
          message: deleteErr.message,
          variant: "error",
        })
      );
    }
  }, [error, loadEntriesErr, deleteErr]);

  const groupedEntries = useMemo(() => {
    if (!timetableEntries) return {};
    return _.groupBy(timetableEntries, "session_id");
  }, [timetableEntries]);

  // Get unique sessions from entries
  const sessions = useMemo(() => {
    if (!timetableEntries) return [];
    return _.uniqBy(timetableEntries, "session_id").map((entry) => ({
      ls_id: entry.session_id,
      session_name: entry.session_name,
      start_time: entry.start_time,
      end_time: entry.end_time,
    }));
  }, [timetableEntries]);

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 5,
    // backgroundColor: "red",
  };

  const onFinish = async (values) => {
    dispatch(setTimetableFormInput(values))
    const payload = {
      payload: {
        campus_id: values.campus_id,
        intake_id: values.intake,
        school_id: values.school_id,
        study_time_id: values.study_time_id,
        year: values.year,
      },
    };

    // console.log("payload", payload);
    const response = await loadTimetableEntries({
      variables: payload,
    });

    const selectedAlias = data.tt_studytime_aliases.find(
      (alias) => alias.id == values.study_time_id
    );
  
    dispatch(setDays(selectedAlias.days));
    dispatch(setTimetableEntries(response.data.timetableEntries));
  };

  const handleAddTimetable = () => {
    // console.log("add tt...");
    dispatch(setTimetableModalVisible(true));
  };


  const handleAddCourseUnit = (day, session) => {
    console.log('day', day)
    console.log('session', session)
    dispatch(setSelectedTTDetails({
      day,
      session
    }))

    dispatch(setTimetableModalVisible(true));
  }

  const handleEditEntry = (entryDetails, day, session) => {
    dispatch(setSelectedTTDetails({
      day,
      session,
      entryId: entryDetails.entryId,
      courseUnits: entryDetails.courseUnits,
      lecturer_id: entryDetails.entry.lecturer_id,
      room_id: entryDetails.entry.room_id,
      isEditing: true
    }));
    dispatch(setTimetableModalVisible(true));
  };

 const handleDeleteEntry = async (entryId) => {
    console.log('entryId', entryId)

   const res =  await deleteTimetableEntry({
      variables: {
        entryId: entryId
      }
    })

    if (res.data.deleteTimetableEntry) {
      dispatch(
        showMessage({
          message: res.data.deleteTimetableEntry.message,
          variant: "success",
        })
      )
    }
  };

  return (
    <div>
      <div
        style={{
          padding: 0,
          background: "#c6e3ff",
          height: "auto",
        }}
      >
        <Form
          form={form}
          name="loadTimetableForm"
          initialValues={timetableFormInput}
          style={formStyle}
          onFinish={onFinish}
        >
          <Row gutter={10} align="middle" justify="space-between">
            <ConfigProvider
              theme={{
                token: {
                  colorTextPlaceholder: "gray",
                },
              }}
            >
              <Col span={3}>
                <Form.Item
                  name={`campus_id`}
                  rules={[
                    {
                      required: true,
                      message: "Select Campus",
                    },
                  ]}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Select placeholder="Campus" loading={loading}>
                    {data &&
                      data?.campuses?.map((opt) => (
                        <Option key={opt.id} value={opt.id}>
                          {opt.campus_title}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  name={`school_id`}
                  rules={[
                    {
                      required: true,
                      message: "Select School/Faculty",
                    },
                  ]}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Select placeholder="Faculty/School" loading={loading}>
                    {data &&
                      data?.schools?.map((opt) => (
                        <Option key={opt.id} value={opt.id}>
                          {`(${opt.school_code}) - ${opt.school_title}`}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  name={`study_time_id`}
                  rules={[
                    {
                      required: true,
                      message: "Select a study time",
                    },
                  ]}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Select placeholder="Study Time" loading={loading}>
                    {/* {data && data?.tt_studytime_aliases.length > 0 && (
                      <Option value={"all_study_times"}>
                        {"ALL STUDY TIMES"}
                      </Option>
                    )} */}
                    {data &&
                      data?.tt_studytime_aliases?.map((opt) => (
                        <Option key={opt.id} value={opt.id}>
                          {opt.alias}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={`intake`}
                  rules={[
                    {
                      required: true,
                      message: "Select session",
                    },
                  ]}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Select
                    placeholder="Intake"
                    loading={loading}
                    showSearch
                    filterOption={(input, option) =>
                      option?.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      data &&
                      data?.intakes?.map((opt) => ({
                        value: opt.id,
                        label: opt.intake_title,
                      }))
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={`year`}
                  rules={[
                    {
                      required: true,
                      message: "Select Year",
                    },
                  ]}
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Select
                    placeholder="Year"
                    loading={loading}
                    showSearch
                    filterOption={(input, option) =>
                      option?.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={generateYearOptions(10)}
                  />
                </Form.Item>
              </Col>
            </ConfigProvider>

            {/* Button placed at the extreme end */}
            <Col span={6} style={{ textAlign: "right" }}>
              <Space size="middle">
                <Button icon={<Download size={14} />} />

                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  loading={loadingEntries}
                  disabled={loadingEntries}
                >
                  Load
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>

      <Spin spinning={loadingEntries || deletingEntry}>
        {days && days.length > 0 && (
          <div
            className="col-md-12"
            style={{
              paddingTop: 10,
            }}
          >
            <div className="table-responsive">
              <StyledTable>
                <StyledThead>
                  <tr>
                    <StyledTh className="col-md-2">Time</StyledTh>
                    {days.map((day) => (
                      <StyledTh key={day.id} className="col-md-2 text-white">
                        {day.name}
                      </StyledTh>
                    ))}
                  </tr>
                </StyledThead>
                <tbody>
                  {sessions.map((session) => (
                    <tr
                      key={session.ls_id}
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <StyledTh
                        style={{
                          backgroundColor: "#666",
                        }}
                      >
                        <span>{convertTo12Hour(session.start_time)}</span> -{" "}
                        <span>{convertTo12Hour(session.end_time)}</span>
                      </StyledTh>

                      {days.map((day) => {
                        const entriesForDayAndSession =
                          groupedEntries[session.ls_id]?.filter(
                            (entry) => entry.day === day.id
                          ) || [];

                        return (
                          <td
                            key={`${session.ls_id}-${day.id}`}
                            style={{
                              maxWidth: "20%",
                              border: "1px solid #dee2e6",
                              padding: "8px",
                            }}
                          >
                            {entriesForDayAndSession.map((entry, index) => (
                              <React.Fragment key={entry.entry_id}>
                                <Courseunit
                                  entryId={entry.entry_id}
                                  courseUnits={entry.course_units}
                                  lecturerName={entry.lecturer_name}
                                  roomName={entry.room_name}
                                  entry={entry}
                                  onEdit={(payload) => handleEditEntry(payload, day.id, session.ls_id)}
                                  onDelete={(payload) => handleDeleteEntry(payload)}
                                />
                                {index < entriesForDayAndSession.length - 1 && (
                                  <hr
                                    style={{
                                      padding: 0,
                                      marginBottom: 5,
                                      marginTop: 1,
                                    }}
                                  />
                                )}
                              </React.Fragment>
                            ))}
                            {entriesForDayAndSession.length > 0 && (
                              <hr
                                style={{
                                  padding: 0,
                                  marginBottom: 5,
                                  marginTop: 1,
                                }}
                              />
                            )}
                            <Button
                              type="link"
                              onClick={() =>
                                handleAddCourseUnit(day.id, session.ls_id)
                              }
                            >
                              Add
                            </Button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </div>
          </div>
        )}
      </Spin>

      <ConfigProvider
        theme={{
          token: {
            //   backgroundColor: !loading ? "blue" : "grey",
            backgroundColor: "blue",
            colorText: "white",
          },
        }}
      >
        <FloatButton
          style={{
            bottom: 70,
            backgroundColor: "blue",
            // color: "#fff",
            width: 45,
            height: 45,
            borderRadius: 22.5,
            cursor: "pointer",
          }}
          onClick={handleAddTimetable}
          type="primary"
          htmlType="submit"
          tooltip={<div>Add Timetable</div>}
          icon={
            <Add
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            />
          }
        />
      </ConfigProvider>

      <AddTimetableEntry />
    </div>
  );
}

export default ViewTimetable;
