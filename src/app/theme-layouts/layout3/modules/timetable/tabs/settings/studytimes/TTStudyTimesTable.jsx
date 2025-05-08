import { useMutation, useQuery } from "@apollo/client";
import { Button, ConfigProvider, Popconfirm, Space, Table, theme } from "antd";
import React, { useEffect } from "react";
import { LOAD_TT_STUDY_TIME_ALIASES } from "../../../gql/queries";
import { useDispatch } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { DELETE_TT_STUDYTIME_ALIAS } from "../../../gql/mutations";
import { setSelectedTTStudyTimeAlias } from "../../../store/timetableSlice";

function TTStudyTimesTable() {
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(LOAD_TT_STUDY_TIME_ALIASES, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteTTStudyTimeAlias,
    { error: deleteErr, loading: deletingSessions },
  ] = useMutation(DELETE_TT_STUDYTIME_ALIAS, {
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
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
      ellipsis: true,
    },
    {
      title: "Study Times",
      dataIndex: "study_times",
      key: "study_times",
      ellipsis: true,
      render: (studyTimes, record) => {
        const titles = studyTimes.map((st) => st.study_time_title).join(", ");
        return titles;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => dispatch(setSelectedTTStudyTimeAlias(record))}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Alias"
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
    const res = await deleteTTStudyTimeAlias({
      variables: {
        deleteTtStudyTimeAliasId: record.id,
      },
    });

    if (res.data?.deleteTTStudyTimeAlias.success) {
      dispatch(
        showMessage({
          message: res.data?.deleteTTStudyTimeAlias.message,
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
          dataSource={data ? data.tt_studytime_aliases : []}
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

export default TTStudyTimesTable;
