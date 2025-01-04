import { Download, Edit, Info, Print } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Space, Button, ConfigProvider, Table, Typography, theme } from "antd";
// import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  selectExpandedMarksKeys,
  selectMarksDetails,
  setExpandedMarksKeys,
} from "../../store/resultsSlice";
import { useEffect, useState } from "react";

const getUniqueRecords = (allRecords) => {
  if (!allRecords) return [];
  const uniqueRecords = allRecords.reduce((acc, current) => {
    // Check if `yrsem` already exists in the accumulator array
    if (!acc.some((item) => item.yrsem === current.yrsem)) {
      acc.push(current); // Add the current record if it's unique by `yrsem`
    }
    return acc;
  }, []);

  return uniqueRecords;
};

const columns = [
  {
    title: "Row Name",
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => (
      <span
        style={{
          // color: "dodgerblue",
          fontWeight: "500",
        }}
      >
        {text}
      </span>
    ),
  },
];

function ResultsTable() {
  const dispatch = useDispatch();
  const marksDetails = useSelector(selectMarksDetails);
  const uniqueRecords = getUniqueRecords(marksDetails?.student_marks);
  const expandedKeys = useSelector(selectExpandedMarksKeys);

  // console.log("unique", getUniqueRecords(marksDetails?.student_marks));

  useEffect(() => {
    if (marksDetails) {
      dispatch(
        setExpandedMarksKeys([...uniqueRecords.map((record) => record.yrsem)])
      );
    }
  }, [marksDetails]);

  const expandedRowRender = (row) => {
    // console.log("details", row);

    const columns2 = [
      {
        title: "#",
        dataIndex: "index",
        key: "date",
        render: (text, record, index) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {index + 1}
          </Typography.Text>
        ),
        width: "5%",
      },
      {
        title: "Code",
        dataIndex: "course_unit_code",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        width: "21%",
        key: "code",
        ellipsis: true,
      },
      {
        title: "Title",
        dataIndex: "course_unit_title",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        key: "title",
        width: "70%",
        ellipsis: true,
      },
      {
        title: "CSWK",
        dataIndex: "coursework",
        key: "coursework",
        ellipsis: true,
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        width: "10%",
      },
      {
        title: "Exam",
        key: "exam",
        dataIndex: "exam",
        width: "10%",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
      },
      {
        title: "Final Mark",
        dataIndex: "final_mark",
        key: "final_mark",
        width: "14%",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        // render: (text, record, index) => parseInt(text).toLocaleString(),
      },

      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        width: "12%",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
      },
      {
        title: "Grade Point",
        dataIndex: "grade_point",
        key: "grade_point",
        width: "16%",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
      },
      {
        title: "C.U",
        dataIndex: "credit_units",
        key: "credit_units",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        width: "8%",
      },
      {
        title: "Remarks",
        dataIndex: "remarks",
        key: "remarks",
        render: (text) => (
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {text}
          </Typography.Text>
        ),
        width: "16%",
      },
    ];

    // const data2 = [
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER MATHEMATICS",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER REPAIR AND MAINTAINENCE",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER MATHEMATICS",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER REPAIR AND MAINTAINENCE",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER MATHEMATICS",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    //   {
    //     code: "BCS920933",
    //     title: "COMPUTER REPAIR AND MAINTAINENCE hjsdb jkdsb",
    //     cswk: "20",
    //     exam: "50",
    //     final_mark: "70",
    //     grade: "B",
    //     grade_point: "4",
    //     credit_units: "4",
    //     remarks: "NP",
    //   },
    // ];

    const handleSelect = (record) => {
      // console.log("selected inv", record);
      //   dispatch(setSelectedInvoice(record));
    };

    const data2 = marksDetails?.student_marks.filter(
      (mark) => mark.yrsem == row.key
    );

    return (
      <Table
        size="middle"
        // bordered
        columns={columns2}
        dataSource={data2}
        pagination={false}
        // rowKey={"invoice_no"}
        rowHoverable
        // rowSelection={{
        //   type: "radio",
        //   onSelect: handleSelect,
        //   selectedRowKeys: selectedInvoice
        //     ? [selectedInvoice.invoice_no]
        //     : null,
        // }}
        // rowSelection={{
        //   type: "radio",
        // }}
      />
    );
  };

  // const data = [
  //   {
  //     key: "2",
  //     name: (
  //       <Space size="middle">
  //         <Space size="small">
  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"ACADEMIC YR:"}
  //           </Typography.Text>
  //           <Typography.Text>{"2020/2021"}</Typography.Text>
  //         </Space>

  //         <Space size="small">
  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"Study Yr:"}
  //           </Typography.Text>
  //           <Typography.Text>{1}</Typography.Text>

  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"Sem:"}
  //           </Typography.Text>
  //           <Typography.Text>{1}</Typography.Text>
  //         </Space>

  //         <Space size="small">
  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"GPA: "}
  //           </Typography.Text>
  //           <Typography.Text>{"4.76"}</Typography.Text>
  //         </Space>

  //         <Space size="small">
  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"CGPA: "}
  //           </Typography.Text>
  //           <Typography.Text>{"4.76"}</Typography.Text>
  //         </Space>

  //         <Space size="small">
  //           <Typography.Text
  //             style={{
  //               color: "rgb(8, 50, 183)",
  //               // fontWeight: "bold",
  //             }}
  //           >
  //             {"REMARKS: "}
  //           </Typography.Text>
  //           <Typography.Text>{"NP"}</Typography.Text>
  //         </Space>
  //       </Space>
  //     ),
  //   },
  // ];

  const data = uniqueRecords.map((group) => ({
    key: group.yrsem,
    name: (
      <Space size="middle">
        <Space size={30}>
          <Space size="small">
            <Typography.Text
              style={{
                color: "rgb(8, 50, 183)",
                fontSize: 13,
              }}
              strong
            >
              {"Academic Yr:"}
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: 13,
              }}
            >
              {group.acc_yr_title}
            </Typography.Text>
          </Space>
        </Space>

        <Space size="small">
          <Typography.Text
            style={{
              color: "rgb(8, 50, 183)",
              fontSize: 13,
            }}
            strong
          >
            {"Year:"}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {group.study_yr}
          </Typography.Text>

          <Typography.Text
            style={{
              color: "rgb(8, 50, 183)",
              fontSize: 13,
            }}
            strong
          >
            {"Sem:"}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {group.semester}
          </Typography.Text>
        </Space>

        <div
          style={{
            paddingLeft: 25,
          }}
        />

        <Space size="small">
          <Typography.Text
            style={{
              color: "rgb(8, 50, 183)",
              fontSize: 13,
            }}
            strong
          >
            {"GPA: "}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {group.GPA}
          </Typography.Text>
        </Space>

        <Space size="small">
          <Typography.Text
            style={{
              color: "rgb(8, 50, 183)",
              fontSize: 13,
            }}
            strong
          >
            {"CGPA: "}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {group.CGPA}
          </Typography.Text>
        </Space>

        <Space size="small">
          <Typography.Text
            style={{
              color: "rgb(8, 50, 183)",
              fontSize: 13,
            }}
            strong
          >
            {"Remarks: "}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: 13,
            }}
          >
            {group.remarks}
          </Typography.Text>
        </Space>
      </Space>
    ),
  }));

  //   const handleInvoiceDetails = () => {
  //     if (!selectedInvoice) {
  //       dispatch(
  //         showMessage({
  //           message: "Please select an invoice!!!",
  //           variant: "info",
  //         })
  //       );

  //       return;
  //     }
  //     console.log("selected invoice", selectedInvoice);
  //     dispatch(setInvoiceDetailsModalVisible(true));
  //   };

  return (
    <div
      style={{
        padding: 0,
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
              // cellFontSize: 10,
              // fontSize: 13,
              // lineHeight: 0.8,
            },
          },
          token: {
            fontSize: 15,
          },
          algorithm: theme.compactAlgorithm,
        }}
      >
        <Table
          bordered
          showHeader={false}
          pagination={false}
          title={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title
                level={5}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                Testimonial
              </Typography.Title>

              <Space>
                <Button
                  type="primary"
                  ghost
                  size="small"
                  icon={<Print size={19} />}
                  // onClick={() => dispatch(setRespondReviewVisible(false))}
                >
                  Print Testimonial
                </Button>

                <Button
                  type="primary"
                  ghost
                  size="small"
                  //   icon={<Action size={19} />}
                  // onClick={() => refetch()}
                >
                  Actions
                </Button>
              </Space>
            </div>
          )}
          // loading={loading || deletingItem}
          // size="middle"
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandAllRows: true,
            // defaultExpandedRowKeys: [...feesCategories.map((cat) => cat.id)],
            expandedRowKeys: expandedKeys,
            onExpandedRowsChange: (e) => dispatch(setExpandedMarksKeys(e)),
          }}
          dataSource={data}
          scroll={{
            y: "calc(100vh - 205px)",
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default ResultsTable;
