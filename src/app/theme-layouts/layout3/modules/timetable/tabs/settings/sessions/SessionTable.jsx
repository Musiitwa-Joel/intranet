import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  ConfigProvider,
  message,
  Popconfirm,
  Space,
  Table,
  theme,
} from "antd";
import React, { useEffect } from "react";
import { LOAD_TIMETABLE_SESSIONS } from "../../../gql/queries";
import { useDispatch } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { DELETE_TIMETABLE_SESSION } from "../../../gql/mutations";
import { setSelectedTTSessions } from "../../../store/timetableSlice";
import dayjs from "dayjs";

function SessionTable() {
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(LOAD_TIMETABLE_SESSIONS, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteTimetableSession,
    { error: deleteErr, loading: deletingSessions },
  ] = useMutation(DELETE_TIMETABLE_SESSION, {
    refetchQueries: ["timetable_sessions"],
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

    if (deleteErr) {
      dispatch(
        showMessage({
          message: deleteErr.message,
          variant: "error",
        })
      );
    }
  }, [error, deleteErr]);

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
      render: (text, record, index) => index + 1,
      width: 50,
      ellipsis: true,
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
      ellipsis: true,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      ellipsis: true,
      render: (time) =>
        time ? dayjs(time, "HH:mm:ss").format("h:mm A") : "--",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (time) =>
        time ? dayjs(time, "HH:mm:ss").format("h:mm A") : "--",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => dispatch(setSelectedTTSessions(record))}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Session"
            description="Are you sure to delete?"
            onConfirm={() => handleDelete(record)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  const handleDelete = async (record) => {
    // console.log("delete", record);

    const res = await deleteTimetableSession({
      variables: {
        deleteTimeTableSessionId: record.id,
      },
    });

    if (res.data?.deleteTimeTableSession.success) {
      dispatch(
        showMessage({
          message: res.data?.deleteTimeTableSession.message,
          variant: "success",
        })
      );
    }
  };

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.compactAlgorithm,
          components: {
            Table: {
              headerBg: "#f9f9f9",
              headerBorderRadius: 0,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data ? data.timetable_sessions : []}
          loading={loading || deletingSessions}
          size="small"
          style={{
            width: "100%",
            borderColor: "lightgray",
            borderWidth: 0.5,
            borderRadius: 0,
          }}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
}

export default SessionTable;
