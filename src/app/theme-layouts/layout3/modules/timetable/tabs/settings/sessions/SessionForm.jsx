import { useMutation } from "@apollo/client";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Typography,
  Input,
  Space,
} from "antd";
import React, { useEffect } from "react";
import { SAVE_TIMETABLE_SESSION } from "../../../gql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  selectSelectedTTSession,
  setSelectedTTSessions,
} from "../../../store/timetableSlice";
import dayjs from "dayjs";

function SessionForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedSession = useSelector(selectSelectedTTSession);
  const [saveTimetableSessions, { error, loading }] = useMutation(
    SAVE_TIMETABLE_SESSION,
    {
      refetchQueries: ["timetable_sessions"],
    }
  );

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

  useEffect(() => {
    if (selectedSession) {
      form.setFieldsValue({
        session_name: selectedSession.session_name,
        start_time: selectedSession.start_time
          ? dayjs(selectedSession.start_time, "HH:mm:ss")
          : null,
        end_time: selectedSession.end_time
          ? dayjs(selectedSession.end_time, "HH:mm:ss")
          : null,
      });
    }
  }, [selectedSession]);

  const onFinish = async (values) => {
    const payload = {
      payload: {
        id: selectedSession?.id || null,
        session_name: values.session_name,
        start_time: values.start_time
          ? values.start_time.format("HH:mm:ss")
          : null,
        end_time: values.end_time ? values.end_time.format("HH:mm:ss") : null,
      },
    };

    // console.log("payload to send", payload);
    const res = await saveTimetableSessions({
      variables: payload,
    });

    console.log("response", res.data);

    if (res.data?.saveTimeTableSession?.success) {
      dispatch(
        showMessage({
          message: res.data.saveTimeTableSession.message,
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
          {"Add Session"}
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
              label="Session Name"
              name="session_name"
              rules={[
                {
                  required: true,
                  message: "Please input the Session Name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="start_time"
              label="Start Time"
              rules={[
                {
                  required: true,
                  message: "Start Time is required",
                },
              ]}
            >
              <DatePicker.TimePicker
                use12Hours
                format="h:mm A"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="end_time"
              label="End Time"
              rules={[
                {
                  required: true,
                  message: "End Time is required",
                },
              ]}
            >
              <DatePicker.TimePicker
                use12Hours
                format="h:mm A"
                style={{
                  width: "100%",
                }}
              />
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
                    dispatch(setSelectedTTSessions(null));
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
                  loading={loading}
                  disabled={loading}
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

export default SessionForm;
