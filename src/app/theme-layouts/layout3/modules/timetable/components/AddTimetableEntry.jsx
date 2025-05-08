import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Form,
  Modal,
  Row,
  Typography,
  theme,
  Col,
  Select,
  Button,
  Card,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedTTDetails,
  selectTimetableFormInput,
  selectTimetableModalVisible,
  setTimetableModalVisible,
} from "../store/timetableSlice";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { GET_COURSE_UNITS } from "../gql/queries";
import { SAVE_TIMETABLE_ENTRY } from "../gql/mutations";

const LOAD_REQS = gql`
  query loadReqs {
    days_of_week {
      id
      name
    }
    timetable_sessions {
      id
      session_name
    }
    # course_units {
    #   id
    #   course_unit_code
    #   course_unit_title
    # }
    employees {
      id
      salutation
      surname
      other_names
    }
    rooms {
      room_id
      room_name
    }
  }
`;

function AddTimetableEntry() {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const isModalOpen = useSelector(selectTimetableModalVisible);
  const timetableFormInput = useSelector(selectTimetableFormInput)
  const selectedTTDetails = useSelector(selectSelectedTTDetails)
  const [courseEntries, setCourseEntries] = useState([{ key: 0 }]);
  const { error, loading, data } = useQuery(LOAD_REQS);
 const [getCourseUnits, {error: getUnitsErr, loading: loadingCourseUnits}] = useLazyQuery(GET_COURSE_UNITS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache"
  })
  const [courseUnitOptions, setCourseUnitOptions] = useState([]);
  const [saveTimetableEntry, {error: saveErr, loading: savingTimetableEntry}] = useMutation(SAVE_TIMETABLE_ENTRY, {
    refetchQueries: ["timetableEntries"],
  })

  const handleCourseUnitSearch = async (searchText) => {
    if (searchText.length >= 2) {
      try {
        const response = await getCourseUnits({
          variables: {
            payload: searchText
          }
        });
        
        const options = response.data?.get_course_units?.map(cu => ({
          value: cu.id,
          label: `${cu.course_unit_code} - ${cu.course_unit_title} - ${cu.course_version?.course?.course_code} (${cu.course_version.version_title})`
        })) || [];
        
        setCourseUnitOptions(options);
      } catch (error) {
        console.error('Error fetching course units:', error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: error.message,
          variant: "error",
        })
      );
    }

    if (getUnitsErr) {
        dispatch(
          showMessage({
            message: getUnitsErr.message,
            variant: "error",
          })
        );
      }

      if (saveErr) {
        dispatch(
          showMessage({
            message: saveErr.message,
            variant: "error",
          })
        );
      }
  }, [error, getUnitsErr, saveErr]);

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      console.log("Form values:", values);
      console.log('timetableFormInput', timetableFormInput)

      const payload = {
        "payload": {
            "timetable_info": {
            "campus_id": timetableFormInput.campus_id,
            "intake_id": timetableFormInput.intake,
            "school_id": timetableFormInput.school_id,
            "study_time_id": timetableFormInput.study_time_id,
            "year": timetableFormInput.year
          },
          "entry_id": selectedTTDetails?.entryId || null,
          "day_id": values.day,
          "session_id": values.session,
          "entries": values.courses.map((entry) => (
            {
              "room_id": entry.room_id,
              "lecturer_id": entry.lecturer_id,
              "course_units": entry.course_unit
            })
          ),
        }
      }

      console.log('payload', payload)

    const response =  await saveTimetableEntry({
        variables: payload
      })

      // console.log('response', response.data)

      if (response.data?.saveTimetableEntry?.success) {
        dispatch(
          showMessage({
            message: response.data?.saveTimetableEntry?.message,
            variant: "success",
          })
        );
        form.resetFields();
        setCourseEntries([{ key: 0 }]);
        dispatch(setTimetableModalVisible(false));
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    // setCourseEntries([{ key: 0 }]);
    dispatch(setTimetableModalVisible(false));
  };

  const addCourseEntry = () => {
    setCourseEntries([...courseEntries, { key: courseEntries.length }]);
  };

  const removeCourseEntry = (keyToRemove) => {
    if (courseEntries.length > 1) {
      setCourseEntries(
        courseEntries.filter((entry) => entry.key !== keyToRemove)
      );
    }
  };

  useEffect(() => {
    if (selectedTTDetails) {
      form.setFieldsValue({
        day: selectedTTDetails.day,
        session: selectedTTDetails.session,
      });
    }
  }, [selectedTTDetails]);

  useEffect(() => {
    if (selectedTTDetails?.isEditing) {
      // Load initial course unit options for editing
      const initialOptions = selectedTTDetails.courseUnits.map(cu => ({
        value: cu.id,
        label: `${cu.course_unit_code} - ${cu.course_unit_title} - ${cu.course_version?.course?.course_code} (${cu.course_version.version_title})`
      }));
      setCourseUnitOptions(initialOptions);

      form.setFieldsValue({
        day: selectedTTDetails.day,
        session: selectedTTDetails.session,
        courses: [{
          key: 0,
          course_unit: selectedTTDetails.courseUnits.map(cu => cu.id),
          lecturer_id: selectedTTDetails.lecturer_id,
          room_id: selectedTTDetails.room_id
        }]
      });
    }
  }, [selectedTTDetails, form]);

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: "0px 15px",
    paddingTop: 10,
    paddingBottom: 4,
    // backgroundColor: "red",
  };
  return (
    <Modal
      title={
        <Typography.Text
          style={{
            color: "#fff",
          }}
        >
          {selectedTTDetails?.isEditing ? 'EDIT TIMETABLE' : 'ADD TIMETABLE'}
        </Typography.Text>
      }
      maskClosable={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      okButtonProps={{
        loading: savingTimetableEntry,
        disabled: savingTimetableEntry,
      }}
      width={700}
      style={{
        top: 50,
      }}
      closeIcon={
        <Close
          style={{
            color: "#fff",
          }}
        />
      }
      styles={{
        body: {
          paddingLeft: 10,
          paddingRight: 10,

          maxHeight: "100vh - 500px",
          

          // Ensure the content is not clipped
        },
        content: {
          padding: 0,
          
          // Ensure the content is not clipped
        },
        footer: {
          padding: 10,
        },
        header: {
          backgroundColor: "#2f405d",
          padding: "7px 10px",
        },
      }}
      // okText={"Upload Applicants"}
    >
      <div style={{
        maxHeight: "calc(100vh - 250px)",
        overflow: "auto",
      }}>
        <Form
          form={form}
          name="advanced_search"
          style={formStyle}
          // onFinish={onFinish}
        >
          <Row gutter={24} align="middle">
            <Col span={12}>
              <Form.Item
                name="day"
                label="Day"
                rules={[{ required: true, message: "Field is Required" }]}
              >
                <Select
                  loading={loading}
                  placeholder="Day"
                  // size="small"
                >
                  {data &&
                    data.days_of_week.map((opt) => (
                      <Select.Option key={opt.id} value={opt.id}>
                        {opt.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="session"
                label="Session"
                rules={[{ required: true, message: "Select a session" }]}
              >
                <Select
                  placeholder="Session"
                  //   disabled={selectedSession}
                  loading={loading}
                >
                  {data &&
                    data.timetable_sessions.map((opt) => (
                      <Select.Option key={opt.id} value={opt.id}>
                        {opt.session_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {courseEntries.map((entry, index) => (
            <Card
              key={entry.key}
              style={{ marginBottom: 16 }}
              title={`Course Unit ${index + 1}`}
              extra={
                courseEntries.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutline />}
                    onClick={() => removeCourseEntry(entry.key)}
                  />
                )
              }
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name={["courses", entry.key, "course_unit"]}
                    rules={[
                      { required: true, message: "Course unit is required" },
                    ]}
                  >
                    {/* <Select
                      placeholder="Course Unit"
                      showSearch
                      loading={loading}
                      filterOption={(input, option) =>
                        option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        data
                          ? data.course_units.map((cu) => ({
                              value: cu.id,
                              label: `${cu.course_unit_code} - ${cu.course_unit_title}`,
                            }))
                          : []
                      }
                    /> */}
                    <Select
                    placeholder="Search course unit..."
                    mode="multiple"
                    showSearch
                    loading={loadingCourseUnits}
                    onSearch={handleCourseUnitSearch}
                    filterOption={false}
                    options={courseUnitOptions}
                    notFoundContent={loadingCourseUnits ? 'Loading...' : 'No course units found'}
                  />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name={["courses", entry.key, "lecturer_id"]}
                    rules={[
                      { required: true, message: "Lecturer is required" },
                    ]}
                  >
                    <Select
                      placeholder="Lecturer"
                      showSearch
                      loading={loading}
                      filterOption={(input, option) =>
                        option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        data
                          ? data.employees.map((opt) => ({
                              value: opt.id,
                              label: `${opt.salutation} ${opt.surname} ${opt.other_names}`,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={["courses", entry.key, "room_id"]}
                    rules={[{ required: true, message: "Room is required" }]}
                  >
                   <Select
                      placeholder="Room"
                      showSearch
                      loading={loading}
                      filterOption={(input, option) =>
                        option?.label.toLowerCase().includes(input.toLowerCase())
                      }
                      options={
                        data
                          ? data.rooms.map((opt) => ({
                              value: opt.room_id,
                              label: opt.room_name,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          <Button
            type="dashed"
            onClick={addCourseEntry}
            style={{ width: "100%", marginBottom: 16 }}
          >
            Add Another Course
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

export default AddTimetableEntry;
