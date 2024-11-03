import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, Col, Form, Row, Select, Space, theme } from "antd";
import {
  LOAD_ADMITTED_STDS_SUMMARY,
  LOAD_APPLICANT_REQS,
} from "../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  loadInitialApplicantRequirements,
  selectAdmittedFillForm,
  selectApplicantRequirements,
  setAdmittedFillForm,
  setAdmittedStdsSummary,
} from "../../admissionsSlice";
const { Option } = Select;

const AdmittedFillForm = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { error, loading, data } = useQuery(LOAD_APPLICANT_REQS);
  const applicantReqs = useSelector(selectApplicantRequirements);
  const _admittedFillForm = useSelector(selectAdmittedFillForm);

  const [
    loadAdmittedStdsSummary,
    { error: loadError, loading: loadingSummary, data: loadRes },
  ] = useLazyQuery(LOAD_ADMITTED_STDS_SUMMARY);

  if (error) {
    dispatch(
      showMessage({
        message: error.message,
        variant: "error",
      })
    );
  }

  if (loadError) {
    // console.log("errr", loadError);
    dispatch(
      showMessage({
        message: loadError.message,
        variant: "error",
      })
    );
  }

  if (data) {
    // console.log("data", data);
    dispatch(loadInitialApplicantRequirements(data));
  }
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 5,
    // backgroundColor: "red",
  };
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const payload = {
      accYrId: values.acc_yr,
      schemeId: values.scheme,
      intakeId: values.intake,
    };

    dispatch(setAdmittedFillForm(values));

    console.log("payload", payload);

    const res = await loadAdmittedStdsSummary({
      variables: payload,
    });

    console.log("response", res.data);

    if (res.data) {
      dispatch(setAdmittedStdsSummary(res.data.admitted_students_summary));
    }
  };
  return (
    <>
      <Form
        form={form}
        initialValues={_admittedFillForm}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24} align="middle">
          <Col
            span={6}
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
              <Select loading={loading} placeholder="Accademic Year">
                {applicantReqs.acc_yrs.map((acc_yr) => (
                  <Option value={acc_yr.id}>{acc_yr.acc_yr_title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={`scheme`}
              label={`Scheme`}
              rules={[
                {
                  required: true,
                  message: "Select a scheme",
                },
              ]}
              style={{
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Select loading={loading} placeholder="Scheme">
                {applicantReqs.schemes.map((scheme) => (
                  <Option value={scheme.id}>{scheme.scheme_title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
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
                {applicantReqs.intakes.map((intake) => (
                  <Option value={intake.id}>{intake.intake_title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

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
export default AdmittedFillForm;
