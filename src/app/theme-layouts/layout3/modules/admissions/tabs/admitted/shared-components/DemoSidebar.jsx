import React, { useEffect } from "react";
import { Box, height } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { Tooltip } from "@mui/material";
import { Refresh, RuleFolder } from "@mui/icons-material";
import { Input, Typography, Table as AntTable, ConfigProvider } from "antd";
import "./rowStyles.css";

import {
  selectAdmittedStds,
  selectAdmittedStdsSelectedRowKey,
  selectAdmittedStdsSummary,
  selectRefetchAdmittedStudents,
  setAdmittedSearchActive,
  setAdmittedStds,
  setAdmittedStdsCurrentPage,
  setAdmittedStdsSelectedRowKey,
  setLoadingAdmittedStds,
  setRefetchAdmittedStudents,
  setSelectedAdmittedStdsRowKeys,
  setSelectedAdmittedStdsSummary,
  setTotalAdmittedStds,
} from "../../../admissionsSlice";

import {
  LOAD_ADMITTED_STUDENTS,
  LOAD_APPLICANTS_SUMMARY,
  LOAD_APPLICATIONS,
} from "../../../graphql/queries";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { ChevronDown, ChevronRight } from "lucide-react";

function getUniqueCampuses(admittedStdsSummary) {
  const uniqueCampuses = [];
  const seenCampuses = new Set();

  admittedStdsSummary.forEach(({ campus_id, campus_title }) => {
    if (!seenCampuses.has(campus_id)) {
      seenCampuses.add(campus_id);
      uniqueCampuses.push({ campus_id, campus_title, unique: true });
    }
  });

  return uniqueCampuses;
}

const _columns = [
  {
    title: "#",
    key: "index",
    width: "15%",
    render: (text, record, index) => {
      if (record.unique) {
        return (
          <span className="font-semibold text-blue-600">
            {`${record.campus_title} CAMPUS`}
          </span>
        );
      }
      return index + 1;
    },
    onCell: (record) => {
      if (record.unique) {
        return { colSpan: 3 }; // Span across all columns for MAIN CAMPUS
      }
      return {}; // Normal rows
    },
  },
  {
    title: "Course code",
    dataIndex: "course_code",
    key: "course_code",
    onCell: (record) => {
      if (record.unique) {
        return { colSpan: 0 }; // Hide this column when spanning
      }
      return {};
    },
    // width: "10%",
  },
  {
    title: "No. Of Stds",
    dataIndex: "student_count",
    key: "student_count",
    render: (text, record, index) => {
      return <span className="font-semibold text-blue-600">{text}</span>;
    },
    onCell: (record) => {
      if (record.unique) {
        return { colSpan: 0 }; // Hide this column when spanning
      }
      return {};
    },
  },
];

const pageSize = 50;

const DemoSidebar = React.memo(({ refetch, isRefetching }) => {
  // const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRowKey = useSelector(selectAdmittedStdsSelectedRowKey);
  const admittedStdsSummary = useSelector(selectAdmittedStdsSummary);
  const dispatch = useDispatch();
  const uniqueCampuses = getUniqueCampuses(admittedStdsSummary);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const refetchAdmittedStudents = useSelector(selectRefetchAdmittedStudents);
  const admittedStds = useSelector(selectAdmittedStds);
  useEffect(() => {
    setExpandedRowKeys(uniqueCampuses.map((c) => c.campus_id));
  }, [admittedStdsSummary]);

  const [
    loadAdmittedStudents,
    {
      error: loadErr,
      loading: loadingAdmittedStds,
      data,
      refetch: refetchAdmittedStds,
    },
  ] = useLazyQuery(LOAD_ADMITTED_STUDENTS, {
    notifyOnNetworkStatusChange: true, // Essential for accurate loading state
  });

  useEffect(() => {
    if (loadErr) {
      // alert("error getting forms!");
      dispatch(
        showMessage({
          message: loadErr.message,
          variant: "error",
        })
      );
    }
  }, [loadErr]);

  const handleRefetch = async () => {
    if (refetchAdmittedStudents && admittedStds.length > 0) {
      await refetchAdmittedStds();
    }

    dispatch(setRefetchAdmittedStudents(false));
  };

  // for refetching
  useEffect(() => {
    handleRefetch();
  }, [refetchAdmittedStudents]);

  useEffect(() => {
    dispatch(setLoadingAdmittedStds(loadingAdmittedStds));
  }, [loadingAdmittedStds]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setAdmittedStds(data.admitted_students));
  //   }
  // }, [data]);

  const handleRowClick = async (row) => {
    // setSelectedRow(row.id); // Update selected row index
    // console.log("row", row);
    // dispatch(setSelectedAdmittedStdsRowKeys(row));
    dispatch(setSelectedAdmittedStdsSummary(row));
    dispatch(setAdmittedStdsCurrentPage(1));
    dispatch(setAdmittedSearchActive(false))

    const res = await loadAdmittedStudents({
      variables: {
        admissionsId: row.admissions_id,
        courseId: row.course_id,
        campusId: row.campus_id,
        start: 0,
        limit: pageSize,
      },
    });

    // console.log("applications", res.data);

    if (res.data) {
      dispatch(setTotalAdmittedStds(res.data.admitted_students.total_records));
      dispatch(setAdmittedStds(res?.data?.admitted_students?.students || []));
    }
  };

  const expandedRowRender = (record) => {
    const expandedData = admittedStdsSummary.filter(
      (summary) => summary.campus_id == record.campus_id
    );

    // console.log("expanded data", expandedData);

    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderRadius: 0,
              borderRadiusLG: 0,
              rowHoverBg: "#cce5ff",
            },
          },
        }}
      >
        <AntTable
          columns={[
            {
              title: "#",
              key: "index",
              width: "16%",
              // render: (_, __, index) => "STUDY YEAR " + index + 1,
              render: (text, record, index) => {
                if (record.key == "MAIN") {
                  return (
                    <span className="font-semibold text-blue-600">MAIN</span>
                  );
                }
                return index + 1;
              },
              // onCell: (record) => {
              //   return { colSpan: 3 }; // Span across all columns for expandable rows
              // },
            },
            {
              title: "Course code",
              dataIndex: "course_code",
              key: "course_code",
              // width: "10%",
            },
            {
              title: "No. Of Stds",
              dataIndex: "student_count",
              key: "student_count",
              render: (text, record, index) => {
                return (
                  <span className="font-semibold text-blue-600">{text}</span>
                );
              },
              width: "41%",
            },
          ]}
          dataSource={expandedData}
          rowKey={(row) => `${row.campus_id}-${row.course_id}`}
          pagination={false}
          className="nested-table"
          showHeader={false}
          // rowSelection={{
          //   selectedRowKeys: selectedRowKey,
          //   type: null,
          // }}
          onRow={(record) => ({
            onClick: () => {
              dispatch(
                setAdmittedStdsSelectedRowKey(
                  `${record.campus_id}-${record.course_id}`
                )
              ); // Set selected row key
              handleRowClick(record);
            },
          })}
          rowClassName={(record) =>
            `${record.campus_id}-${record.course_id}` === selectedRowKey
              ? "custom-selected-row"
              : ""
          }
          bordered
          size="small"
          summary={(pageData) => {
            let totalStds = 0;

            pageData.map((data) => {
              totalStds += parseInt(data.student_count);
            });
            return (
              <>
                <AntTable.Summary.Row
                  style={{
                    borderBottom: "none",
                  }}
                >
                  {/* Adjust the colSpan to leave the first 3 columns empty */}
                  <AntTable.Summary.Cell
                    colSpan={1}
                    style={{
                      borderBottom: "none",
                    }}
                  ></AntTable.Summary.Cell>
                  <AntTable.Summary.Cell
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      TOTAL
                    </span>{" "}
                    {/* Place the "Tot" label in the fourth column */}
                  </AntTable.Summary.Cell>
                  <AntTable.Summary.Cell
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {totalStds}
                    </span>{" "}
                    {/* Place the total value in the fifth column */}
                  </AntTable.Summary.Cell>
                </AntTable.Summary.Row>
              </>
            );
          }}
        />
      </ConfigProvider>
    );
  };

  return (
    <div className="px-0 py-0">
      <Box
        className="p-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          padding: "4px 10px",
        }}
      >
        <Typography.Text strong>Admitted Students Summary</Typography.Text>

        <div>
          <Tooltip title="Reload">
            <Refresh
              onClick={async () => {
                await refetch();
                console.log("refetch...");
              }}
              style={{
                fontSize: 25,
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </div>
      </Box>

      <div
        style={{
          padding: 7,
        }}
      >
        {/* <Button>View Incomplete Forms</Button> */}
        <Input size="small" placeholder="Search..." />
      </div>

      <AntTable
        columns={_columns}
        dataSource={uniqueCampuses}
        rowKey={"campus_id"}
        expandable={{
          expandedRowRender,
          expandedRowKeys: expandedRowKeys,
          // onExpandedRowsChange: (record, state) => console.log(record, state),
          onExpand: (expanded, record) => {
            setExpandedRowKeys((prevKeys) => {
              if (!expanded) {
                // Remove collapsed campus_id from the list
                return prevKeys.filter((id) => id !== record.campus_id);
              } else {
                // Add new campus_id only if not already in the list
                return [...new Set([...prevKeys, record.campus_id])];
              }
            });
          },
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <ChevronDown
                className="cursor-pointer"
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <ChevronRight
                className="cursor-pointer"
                onClick={(e) => onExpand(record, e)}
              />
            ),
        }}
        size="small"
        pagination={false}
        // bordered
        scroll={{
          y: "calc(100vh - 250px)",
        }}
      />
    </div>
  );
});

export default DemoSidebar;
