import React, { useRef, useEffect } from "react";
import { Table, ConfigProvider, Space, Button, Popconfirm } from "antd";
import PerfectScrollbar from "perfect-scrollbar";

import { Delete, Edit } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FEES_CATEGORIES } from "../../gql/queries";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  selectFeesCategories,
  setFeesCategories,
  setSelectedCategoryRow,
} from "../../store/feesMgtSlice";
import { DELETE_FEES_CATEGORY } from "../../gql/mutations";

const renderRow = (record, text) => {
  return <span>{text}</span>;
};

const rows = [
  {
    id: 1,
    category_title: "TUITION",
  },
  {
    id: 1,
    category_title: "FUNCTIONAL",
  },
  {
    id: 1,
    category_title: "ACCOMODATION",
  },
];

const DataTable = () => {
  const scrollContainerRef = useRef(null);
  const psRef = useRef(null);
  const dispatch = useDispatch();
  const feesCategories = useSelector(selectFeesCategories);
  const { error, loading, data } = useQuery(GET_FEES_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteFeesCategory,
    { error: deleteErr, loading: deletingCategory, data: deleteRes },
  ] = useMutation(DELETE_FEES_CATEGORY, {
    refetchQueries: ["getFeesCategories"],
  });

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      ellipsis: true,
      // render: (text, record, index) => (
      //   <span>{formatDateString(parseInt(text))}</span>
      // ),
      render: (text, record, index) => renderRow(record, index + 1),
      width: 20,
    },
    {
      title: "Category",
      ellipsis: true,
      dataIndex: "category_name",
      render: (text, record, index) => renderRow(record, text),
      width: 140,
    },
    {
      title: "Action",
      ellipsis: true,
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            ghost
            onClick={() => handleRowClick(record)}
            icon={<Edit />}
          />
          <Popconfirm
            title="Delete Fees Category"
            description="Are you sure to delete this category?"
            onConfirm={(e) => confirm(e, record)}
            // onCancel={cancel}
            okText="Yes"
            okButtonProps={{
              style: {
                backgroundColor: "dodgerblue",
              },
            }}
            cancelText="No"
          >
            <Button
              size="small"
              danger
              // onClick={() => handleRowDelete(record)}
              icon={<Delete color="red" />}
            />
          </Popconfirm>
        </Space>
      ),
      width: 110,
    },
  ];

  const confirm = (e, row) => {
    // console.log("the row", row);
    handleRowDelete(row);
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

    if (deleteErr) {
      dispatch(
        showMessage({
          message: deleteErr.message,
          variant: "error",
        })
      );
    }
  }, [error, deleteErr]);

  if (data) {
    // console.log("response", data);
    dispatch(setFeesCategories(data.fees_categories));
  }

  const handleRowClick = (row) => {
    // console.log("clicked", row);
    dispatch(setSelectedCategoryRow(row));
  };

  const handleRowDelete = async (row) => {
    const payload = {
      categoryId: row.id,
    };

    // console.log("delete", payload);

    const res = await deleteFeesCategory({
      variables: payload,
    });

    dispatch(
      showMessage({
        message: res.data.deleteFeesCategory.message,
        variant: "success",
      })
    );
  };

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
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <span
          style={{
            // color: "dodgerblue",
            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          Fees Categories
        </span>
      </div>

      <div
        style={{
          padding: 10,
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Table: {
                // headerBg: "rgba(0, 0, 0, 0.04)",
                borderColor: "lightgray",
                borderRadius: 0,
                headerBorderRadius: 0,
                cellFontSize: 10,
                fontSize: 13,
                lineHeight: 0.8,
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={feesCategories}
            // loading={loadingApplications |}
            rowKey="id"
            bordered
            sticky
            loading={loading || deletingCategory}
            // rowSelection={rowSelection}
            // expandable={defaultExpandable}
            showHeader={true}
            tableLayout="fixed"
            size="small"
            pagination={{
              position: ["bottomRight"],
            }}
            scroll={{
              y: "calc(100vh - 200px)", // Set the same height as in the style to ensure content scrolls
              // x: "100vw",
            }}

            // scroll={{
            //   y: "calc(100vh - 370px)",
            //   x: "100vw",
            // }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default DataTable;