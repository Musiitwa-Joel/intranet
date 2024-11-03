import React, { useEffect } from "react";
import { Button, Form, Input, Select, Space, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { selectSelectedStudent } from "../../../../store/infoCenterSlice";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };
const AcademicInfo = () => {
  const selectedStudent = useSelector(selectSelectedStudent);
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  if (!selectedStudent) return;

  if (selectedStudent) {
    form.setFieldsValue({
      student_no: selectedStudent.student_no,
      reg_no: selectedStudent.registration_no,
      intake: selectedStudent.intake_title,
      entry_acc_yr: selectedStudent.entry_acc_yr_title,
      course_code: selectedStudent.course.course_code,
      course_title: selectedStudent.course.course_title,
      course_version: selectedStudent.course_details.version_title,
      entry_study_yr: selectedStudent.entry_study_yr,
      level: selectedStudent.course.level_details.level_title,
      campus: selectedStudent.campus_title,
      status: selectedStudent.status == 1 ? "Active" : "Inactive",
      sponsorhip: selectedStudent.sponsorhip,
      study_time: selectedStudent.study_time_title,
      current_yr: 1,
      sem: 1,
      college: selectedStudent.course.school.college.college_title,
      school: `(${selectedStudent.course.school.school_code}) ${selectedStudent.course.school.school_title}`,
    });
  }

  // useEffect(() => {

  // }, [selectedStudent]);
  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        //   style={{
        //     maxWidth: 600,
        //   }}
      >
        <Row gutter={0}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="student_no"
              label="Student Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="reg_no"
              label="Reg No"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="intake"
              label="Intake"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="entry_acc_yr"
              label="Entry Acc Yr"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="course_code"
              label="Course Code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="course_title"
              label="Course Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="course_version"
              label="Course Version"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="entry_study_yr"
              label="Entry Study Year"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="level"
              label="Level"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <Form.Item
                name="campus"
                label="Campus"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="sponsorship"
                label="Sponsorship"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="study_time"
                label="Study Time"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="current_yr"
                label="Current Year"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="sem"
                label="Current Sem"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="college"
                label="College"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="school"
                label="Faculty/School"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="dpt"
                label="Department"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/* <Form.Item>
          <Space>
            <Button
              type="primary"
              style={{
                backgroundColor: "dodgerblue",
              }}
              htmlType="submit"
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Space>
        </Form.Item> */}
      </Form>
    </>
  );
};
export default AcademicInfo;
