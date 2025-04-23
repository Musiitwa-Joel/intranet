import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button, Col, Form, Row, Select, Space, theme } from "antd";
import { LOAD_CLEARANCE_STUDENTS_SUMMARY } from "../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { selectUserDetails } from "app/store/userSlice";
import { useEffect } from "react";
import {
  selectClearanceFillForm,
  setClearanceFillForm,
  setClearanceStdsSummary,
} from "../../store/examinationsSlice";
const { Option } = Select;

const LOAD_CLEARANCE_REQS = gql`
  query loadApplicantRequirements {
    acc_yrs {
      id
      acc_yr_title
    }
    campuses {
      id
      campus_title
    }
    intakes {
      id
      intake_title
    }
    schools {
      id
      school_code
      school_title
    }
  }
`;

const GraduationFillForm = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { error, loading, data } = useQuery(LOAD_CLEARANCE_REQS);
  const clearanceFillForm = useSelector(selectClearanceFillForm);
  const userDetails = useSelector(selectUserDetails);

  const [
    loadClearanceStdsSummary,
    { error: loadError, loading: loadingSummary, data: loadRes },
  ] = useLazyQuery(LOAD_CLEARANCE_STUDENTS_SUMMARY);

  if (error) {
    dispatch(
      showMessage({
        message: error.message,
        variant: "error",
      })
    );
  }

  useEffect(() => {
    if (loadError) {
      dispatch(
        showMessage({
          message: loadError.message,
          variant: "error",
        })
      );
    }
  }, [loadError]);

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 5,
    // backgroundColor: "red",
  };

  const onFinish = async (values) => {
    dispatch(setClearanceFillForm(values));
    const payload = {
      sectionId: "examination_officer",
      accYrId: values.acc_yr,
      campusId: values.campus,
      schoolId: values.school,
      intakeId: values.intake,
    };

    const res = await loadClearanceStdsSummary({
      variables: payload,
    });

    if (res.data?.load_clearance_students_summary) {
      dispatch(
        setClearanceStdsSummary(res.data.load_clearance_students_summary)
      );
    }
  };
  return (
    <>
      <Form
        form={form}
        initialValues={clearanceFillForm}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24} align="middle">
          <Col
            span={4}
            style={{
              //   backgroundColor: "green",
              paddingBottom: 0,
            }}
          >
            <Form.Item
              name={`campus`}
              label={`Campus`}
              rules={[
                {
                  required: true,
                  message: "Field is Required",
                },
              ]}
              style={{
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Select loading={loading} placeholder="Campus">
                <Option value={"all"}>{`ALL CAMPUSES`}</Option>
                {data &&
                  data.campuses.map((campus) => (
                    <Option key={campus.id} value={campus.id}>
                      {campus.campus_title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col
            span={5}
            style={{
              //   backgroundColor: "green",
              paddingBottom: 0,
            }}
          >
            <Form.Item
              name={`acc_yr`}
              label={`Academic Year`}
              rules={[
                {
                  required: true,
                  message: "Field is Required",
                },
              ]}
              style={{
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Select loading={loading} placeholder="Academic Year">
                {data &&
                  data.acc_yrs.map((acc_yr) => (
                    <Option value={acc_yr.id}>{acc_yr.acc_yr_title}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              name={`intake`}
              label={`Intake`}
              rules={[
                {
                  required: true,
                  message: "Select an intake",
                },
              ]}
              style={{
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Select loading={loading} placeholder="Intake">
                <Option value={"all"}>{`ALL INTAKES`}</Option>
                {data &&
                  data.intakes.map((intake) => (
                    <Option value={intake.id}>{intake.intake_title}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {!userDetails.school_id && (
            <Col span={8}>
              <Form.Item
                name="school"
                label="School/Faculty"
                rules={[
                  {
                    required: true,
                    message: "Select a school",
                  },
                ]}
                style={{
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                <Select
                  loading={loading}
                  placeholder="School/Faculty"
                  // size="small"
                >
                  <Option value={"all"}>{`ALL SCHOOLS`}</Option>
                  {data &&
                    data.schools.map((school) => (
                      <Option
                        value={school.id}
                      >{`(${school.school_code}) ${school.school_title}`}</Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col span={2}>
            <Button
              type="primary"
              danger
              htmlType="submit"
              disabled={loadingSummary}
              loading={loadingSummary}
            >
              Load
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default GraduationFillForm;
