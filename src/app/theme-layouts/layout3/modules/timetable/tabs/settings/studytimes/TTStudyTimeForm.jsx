import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Typography,
  Input,
  Space,
  Select,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { SAVE_TT_STUDY_TIMES_ALIAS } from "../../../gql/mutations";
import {
  selectSelectedTTStudyTimeAlias,
  setSelectedTTStudyTimeAlias,
} from "../../../store/timetableSlice";

const LOAD_STUDY_TIMES = gql`
  query study_times {
    study_times {
      id
      study_time_title
    }
    days_of_week {
      id
      name
    }
  }
`;

function TTStudyTimeForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { error, loading, data } = useQuery(LOAD_STUDY_TIMES);
  const selectedAlias = useSelector(selectSelectedTTStudyTimeAlias);
  const [saveTTStudyTimeAlias, { error: saveErr, loading: savingAlias }] =
    useMutation(SAVE_TT_STUDY_TIMES_ALIAS, {
      refetchQueries: ["tt_studytime_aliases"],
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

    if (saveErr) {
      dispatch(
        showMessage({
          message: saveErr.message,
          variant: "error",
        })
      );
    }
  }, [error, saveErr]);

  useEffect(() => {
    if (selectedAlias) {
      form.setFieldsValue({
        alias: selectedAlias.alias,
        study_times: selectedAlias.study_times.map((record) => record.id),
        days: selectedAlias.days.map((record) => record.id),
        description: selectedAlias.description,
      });
    }
  }, [selectedAlias]);

  const onFinish = async (values) => {
    console.log("values", values);
    const payload = {
      payload: {
        id: selectedAlias?.id || null,
        alias: values.alias,
        description: values?.description || "",
        study_times: values.study_times,
        days: values.days,
      },
    };

    const res = await saveTTStudyTimeAlias({
      variables: payload,
    });

    if (res.data?.saveTTStudyTimeAlias?.success) {
      dispatch(
        showMessage({
          message: res.data.saveTTStudyTimeAlias.message,
          variant: "success",
        })
      );
      form.resetFields();
    }
  };

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <Divider orientation="left" orientationMargin={0}>
        <Typography.Title
          level={4}
          style={
            {
              // padding: 0,
              // margin: 0,
            }
          }
        >
          {"Add Study Time Alias"}
        </Typography.Title>
      </Divider>

      <div
        style={{
          height: "calc(100vh - 200px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="max-w-full relative">
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Alias"
              name="alias"
              rules={[
                {
                  required: true,
                  message: "Please input the Study Time Alias",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="study_times"
              label="Study Time"
              rules={[
                {
                  required: true,
                  message: "Please select atleast one study time.",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Study Times"
                loading={loading}
                options={
                  data &&
                  data?.study_times.map((opt) => ({
                    label: opt.study_time_title,
                    value: opt.id,
                  }))
                }
              />
            </Form.Item>

            <Form.Item
              name="days"
              label="Days Associated With Study Time"
              rules={[
                {
                  required: true,
                  message: "Please select atleast one day.",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Days"
                loading={loading}
                options={
                  data &&
                  data?.days_of_week.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  }))
                }
              />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Form.Item>
                <Button
                  onClick={() => {
                    dispatch(setSelectedTTStudyTimeAlias(null));
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={savingAlias}
                  disabled={savingAlias}
                >
                  Save
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TTStudyTimeForm;
