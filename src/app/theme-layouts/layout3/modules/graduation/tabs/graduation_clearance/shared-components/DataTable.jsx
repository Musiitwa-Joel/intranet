import { Box, Typography, Tooltip } from "@mui/material";
import {
  Cancel,
  ChangeCircle,
  Close,
  EditNoteSharp,
  Refresh,
  Send,
} from "@mui/icons-material";
import {
  Select,
  Input,
  Row,
  Col,
  Space,
  Dropdown,
  Button,
  Typography as AntTypography,
  Pagination,
  Spin,
} from "antd";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";
import { selectUser } from "app/store/userSlice";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { useEffect, useMemo, useState } from "react";
import { Check, CircleCheck } from "lucide-react";
import "react-data-grid/lib/styles.css";
import "./mystyles.css";

import DataGrid, { SelectColumn, Row as GridRow } from "react-data-grid";
import { CellExpanderFormatter } from "./CellExpanderFormatter";
import { useDirection } from "./DirectionContext";
import {
  selectClearanceStds,
  selectClearanceStdsCurrentPage,
  selectClearanceStdsTotal,
  selectLoadingClearanceStds,
  selectSelectedClearanceStdsSummary,
  setClearanceDetailsModalVisible,
  setClearanceStds,
  setClearanceStdsCurrentPage,
  setClearanceStdsTotal,
  setSelectedStudent,
} from "../../../store/graduationSlice";
import ClearanceDetailsModal from "../ClearanceDetailsModal";
import { GLOBAL_SEARCH_CLEARANCE_STUDENTS } from "../../../gql/queries";

const { Search } = Input;

const renderRow = (record, text) => {
  const color =
    record.status == "cleared"
      ? "blue"
      : record.status == "rejected"
        ? "red"
        : "black"; // Conditional color based on `verified` field

  return <span style={{ color }}>{text}</span>;
};

const items = [
  {
    label: "Push to Student Information Center",
    key: "push_std_to_sic",
    icon: (
      <Send
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Edit Student Details",
    key: "edit_student_details",
    icon: (
      <EditNoteSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Change of Program Request",
    key: "3",
    icon: (
      <ChangeCircle
        style={{
          fontSize: 18,
        }}
      />
    ),
    // danger: true,
  },
  {
    label: "Cancel Admission",
    key: "4",
    icon: (
      <Cancel
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
];

const filterItems = [
  {
    label: "Students Pushed to Hub",
    key: "stds_pushed_to_hub",
    icon: <CircleCheck size={18} />,
  },
  {
    label: "Students Not in Hub",
    key: "stds_not_in_hub",
    icon: (
      <Cancel
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
];

function getComparator(sortColumn) {
  switch (sortColumn) {
    case "index":
    case "admitted_on":
    case "form_no":
    case "student_no":
    case "gender":
    case "expander":
    case "full_name":
      return (a, b) => {
        const nameA = a.biodata
          ? `${a.biodata.surname || ""} ${a.biodata.other_names || ""}`
          : "";
        const nameB = b.biodata
          ? `${b.biodata.surname || ""} ${b.biodata.other_names || ""}`
          : "";
        return nameA.localeCompare(nameB);
      };
    case "available":
      return (a, b) => {
        return a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
      };
    case "Sex":
    case "course_code":
    case "campus_title":
    case "study_time_title":
      return (a, b) => {
        return a.study_time_title.localeCompare(b.study_time_title);
      };
    case "nationality":
    case "intake_title":
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}

function DataTable() {
  const direction = useDirection();
  const [pageSize, setPageSize] = useState(50);
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  const userObj = useSelector(selectUser);
  const selectedCourseGroup = useSelector(selectSelectedClearanceStdsSummary);
  const loadingClearanceStds = useSelector(selectLoadingClearanceStds);
  const clearedStds = useSelector(selectClearanceStds);
  const [admittedStudents, setAdmittedStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState("name");
  const totalRecords = useSelector(selectClearanceStdsTotal);
  const currentPage = useSelector(selectClearanceStdsCurrentPage);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortColumns, setSortColumns] = useState([]);

  const [globalSearch, { error, loading }] = useLazyQuery(
    GLOBAL_SEARCH_CLEARANCE_STUDENTS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
    }
  );

  const columns2 = useMemo(() => {
    return [
      {
        ...SelectColumn,
        cellClass(row) {
          return row.type === "DETAIL" ? "hidden-select" : "";
        },
      },
      {
        key: "expander",
        name: "",
        width: 40,
        // frozen: true,
        colSpan(args) {
          return args.type === "ROW" && args.row.type === "DETAIL"
            ? 13
            : undefined;
        },
        renderCell: ({ row, onRowChange, tabIndex }) => {
          // console.log("row", row);
          if (row.type === "DETAIL") {
            return (
              <Row
                gutter={24}
                style={{
                  padding: 5,
                }}
              >
                <Col>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Space
                      style={{
                        padding: "5px 0px",
                      }}
                    >
                      <AntTypography.Text strong>
                        CLEARED BY:
                      </AntTypography.Text>
                      <AntTypography.Text>
                        {row.cleared_by_user}
                      </AntTypography.Text>
                    </Space>

                    <Space>
                      <AntTypography.Text strong>
                        CLEARED ON:
                      </AntTypography.Text>
                      <AntTypography.Text>
                        {row.date ? formatDateString(parseInt(row.date)) : null}
                      </AntTypography.Text>
                    </Space>
                  </div>
                </Col>
              </Row>
            );
          }
          return (
            <CellExpanderFormatter
              expanded={row.expanded}
              tabIndex={tabIndex}
              onCellExpand={() => {
                onRowChange({ ...row, expanded: !row.expanded });
              }}
            />
          );
        },
      },

      {
        name: "#",
        key: "index",
        width: 40,
        renderCell({ row, rowIdx }) {
          return renderRow(row, rowIdx + 1);
        },
      },
      {
        name: "Date",
        key: "created_on",
        ellipsis: true,
        renderCell({ row, rowIdx }) {
          return renderRow(row, formatDateString(parseInt(row.created_on)));
        },

        width: 180,
      },
      {
        name: "Student No",
        ellipsis: true,
        key: "student_no",
        renderCell({ row, rowIdx }) {
          return renderRow(row, row.student_no);
        },
        width: 110,
      },
      {
        name: "Name",
        width: 210,
        key: "full_name",
        sortable: true,
        ellipsis: true,
        sorter: (a, b) => {
          const nameA = a.biodata ? `${a.student_name}` : "";
          const nameB = b.biodata ? `${b.student_name}` : "";
          return nameA.localeCompare(nameB);
        },
        renderCell({ row, rowIdx }) {
          return renderRow(row, row.student_name ? row.student_name : "");
        },
      },
      {
        name: "Sex",
        key: "gender",
        width: 50,
        // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,

        renderCell({ row, rowIdx }) {
          return renderRow(row, row.gender);
        },
        // sorter: (a, b) => a.age - b.age,
      },
      {
        name: "Course Code",
        key: "course_code",
        width: 100,

        renderCell({ row, rowIdx }) {
          return renderRow(row, row.course_code);
        },
        // sorter: (a, b) => a.age - b.age,
      },
      {
        name: "Campus",
        key: "campus_title",
        renderCell({ row, rowIdx }) {
          return renderRow(row, row.campus_title);
        },
        width: 80,
      },
      {
        name: "Study Time",
        key: "study_time_title",
        width: 100,
        renderCell({ row, rowIdx }) {
          return renderRow(row, row.study_time_title);
        },
        sorter: (a, b) => {
          return a.study_time_title.localeCompare(b.study_time_title);
        },
      },
      {
        name: "Intake",
        key: "intake_title",
        width: 80,

        renderCell({ row, rowIdx }) {
          return renderRow(row, row.intake_title);
        },
      },
      {
        name: "Status",
        key: "status",
        width: 120,

        renderCell({ row, rowIdx }) {
          return renderRow(row, row.status?.toUpperCase());
        },
        ellipsis: true,
        // sorter: (a, b) => a.age - b.age,
      },

      // {
      //   name: "Entry Study Year",
      //   key: "entry_study_yr",
      //   width: 130,
      //   renderCell({ row, rowIdx }) {
      //     return renderRow(row, row.entry_study_yr);
      //   },
      // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,

      // sorter: (a, b) => a.age - b.age,
      // },
    ];
  }, [direction]);

  useEffect(() => {
    if (error) {
      dispatch(showMessage({ message: error.message, variant: "error" }));
    }
  }, [error]);

  function onRowsChange(rows, { indexes }) {
    const row = rows[indexes[0]];
    if (row.type === "MASTER") {
      if (row.expanded) {
        rows.splice(indexes[0] + 1, 0, {
          type: "DETAIL",
          id: row.student_no + 100,
          parentId: row.student_no,
          cleared_by_user: row.cleared_by_user,
          date: row.date,
        });
      } else {
        rows.splice(indexes[0] + 1, 1);
      }
      console.log("output rows", rows);
      setAdmittedStudents(rows);
    }
  }

  function rowKeyGetter(row) {
    return row.student_no;
  }

  const sortedRows = useMemo(() => {
    const _rows = searchResults.length > 0 ? searchResults : admittedStudents;
    if (sortColumns.length === 0) return _rows;

    return [..._rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [searchResults, admittedStudents, sortColumns]);

  useEffect(() => {
    selectedRows.clear();
    if (clearedStds.length > 0) {
      setAdmittedStudents(
        clearedStds.map((student) => ({
          ...student,
          expanded: false,
          type: "MASTER",
        }))
      );
    } else {
      setAdmittedStudents([]);
    }
  }, [clearedStds]);

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setSelectedCriteria(value);
  };

  const onSearch = async (value) => {
    if (!value) {
      return;
    }

    const response = await globalSearch({
      variables: {
        searchCriteria: selectedCriteria,
        searchValue: value,
        sectionId: "academic_registrar",
        start: 0,
        limit: pageSize,
      },
    });

    if (response.data) {
      dispatch(
        setClearanceStdsTotal(
          response.data.global_search_clearance_students.total_records
        )
      );
      dispatch(
        setClearanceStds(response?.data?.global_search_clearance_students?.results || [])
      );
    }
  };

  const fetchAdmittedStds = async (page) => {
    const payload = {
      admissionsId: selectedCourseGroup.admissions_id,
      courseId: selectedCourseGroup.course_id,
      campusId: selectedCourseGroup.campus_id,
      start: (page - 1) * pageSize, // Calculate offset based on page
      limit: pageSize, // Number of records per page
    };

    // const res = await loadAdmittedStudents({
    //   variables: payload,
    // });

    // if (res.data) {
    //   dispatch(setTotalAdmittedStds(res.data.admitted_students.total_records));
    //   dispatch(setAdmittedStds(res?.data?.admitted_students?.students || []));
    // }
  };

  useEffect(() => {
    if (clearedStds.length > 0) {
      fetchAdmittedStds(currentPage);
    }
  }, [currentPage]);

  const handleMenuClick = async (e) => {
    if (e.key == "push_std_to_sic") {
      // Push to student information center
      if (selectedRows.size == 0)
        return dispatch(
          showMessage({
            message: "Please select at least one student",
            variant: "info",
          })
        );

      const selectedStds = admittedStudents.filter((obj) =>
        selectedRows.has(obj.std_id)
      );

      const std_ids = selectedStds.map((std) => std.std_id);

      const res = await pushToStdInfoCenter({
        variables: {
          stdIds: std_ids,
          pushedBy: userObj.user.user_id,
        },
      });

      dispatch(
        showMessage({
          message: res.data.push_to_std_info_center.message,
          variant: "success",
        })
      );
    }
  };

  const handleFilterMenuClick = async (e) => {
    // message.info("Click on menu item.");
    // console.log("applications", applications);
    if (e.key == "stds_pushed_to_hub") {
      // View pushed students only
      const newArr = clearedStds.filter(
        (application) => application.is_std_verified == true
      );

      setAdmittedStudents(newArr);
    } else if (e.key == "stds_not_in_hub") {
      // View pushed students only
      const newArr = clearedStds.filter(
        (application) => application.is_std_verified == false
      );

      setAdmittedStudents(newArr);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const filterMenuProps = {
    items: filterItems,
    onClick: handleFilterMenuClick,
  };

  const handleOpenPreview = async () => {
    const selectedStds = clearedStds.filter((obj) =>
      selectedRows.has(obj.student_no)
    );

    // console.log('selectedStds', selectedStds)
    dispatch(setSelectedStudent(selectedStds[selectedStds.length - 1]));
    dispatch(setClearanceDetailsModalVisible(true));
    // const stds = selectedStds.map((std) => ({
    //   section_id: std.section_id,
    //   student_no: std.student_no,
    // }));

    // const payload = {
    //   students: stds,
    // };

    // // console.log("selected applications", selectedAdmittedStds);
    // const res = await printAdmissionLetters({
    //   variables: payload,
    // });

    // if (res.data?.print_admission_letters) {
    //   dispatch(setAdmissionLetters(res.data.print_admission_letters));

    //   dispatch(setAdmissionLetterModalVisible(true));
    // }
  };

  const handleExport = () => {
    if (clearedStds.length == 0) {
      dispatch(
        showMessage({
          message: "Please first load admitted students",
          variant: "info",
        })
      );
    }

    const data = clearedStds.map((application) => ({
      name: `${application.biodata.surname} ${application.biodata.other_names}`,
      student_number: application.student_no,
      regno: application.registration_no,
      email: application.biodata.email,
      gender: application.biodata.gender,
      nationality: application.biodata.nationality.nationality_title,
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "admitted-student.csv");
  };

  const handlePaginationChange = (page) => {
    dispatch(setClearanceStdsCurrentPage(page));
  };

  return (
    <div
      style={{
        marginLeft: 0,
        marginRight: 0,
        // backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderTop: "1px solid lightgray",
          borderLeft: "1px solid lightgray",
          borderRight: "1px solid lightgray",
          // marginBottom: 1,
        }}
        className="p-5"
        style={{
          paddingLeft: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 15,
          marginBottom: 0,
        }}
      >
        <AntTypography.Text strong>
          {selectedCourseGroup
            ? `${selectedCourseGroup.course_title} - (${selectedCourseGroup.course_code})`
            : null}
        </AntTypography.Text>

        <div>
          <Space>
            <Tooltip title="Reload">
              <Refresh
                onClick={async () => {
                  // dispatch(setRefetchAdmittedStudents(true));
                }}
                fontSize=""
                color="#000"
                style={{
                  // color: "white",
                  fontSize: 25,
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Space>
        </div>
      </Box>
      <div
        style={{
          // backgroundColor: "#fff",
          // maxHeight: "calc(100vh - 185px)",
          minHeight: "calc(100vh - 179px)",
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ensure it takes full height
          //   height: 600,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: 8,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid lightgray",
            borderLeft: "1px solid lightgray",
            borderRight: "1px solid lightgray",
            // marginTop: 5,
            marginBottom: 0,
          }}
        >
          <Space size="middle">
            <Select
              showSearch
              placeholder="Select"
              optionFilterProp="label"
              size="small"
              style={{
                width: 140,
              }}
              onChange={onChange}
              onSearch={onSearch}
              value={selectedCriteria}
              options={[
                {
                  value: "name",
                  label: "Name",
                },
                {
                  value: "student_no",
                  label: "Student Number",
                },
              ]}
            />

            <Search
              placeholder="Global Search"
              onSearch={onSearch}
              size="small"
            />

            <Dropdown menu={menuProps}>
              <Button size="small">
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Button size="small" onClick={handleExport}>
              Export to Excel
            </Button>

            <Dropdown menu={filterMenuProps}>
              <Button size="small">
                <Space>
                  Filters
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>

          <Button
            disabled={selectedRows.size == 0}
            // loading={printingLetters}
            onClick={handleOpenPreview}
            size="small"
          >
            View Details
          </Button>
        </div>

        <div
          style={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#fff",
            // borderRight: "1px solid lightgray",
            // borderLeft: "1px solid lightgray",
          }}
        >
          <Spin spinning={loadingClearanceStds || loading}>
            <DataGrid
              className="rdg-light fill-grid"
              // rowHeight={30}
              rowKeyGetter={rowKeyGetter}
              columns={columns2}
              rows={sortedRows}
              onSortColumnsChange={setSortColumns}
              sortColumns={sortColumns}
              style={{
                border: "1px solid #ccc",
                height: "calc(100vh - 257px)",
              }}
              onSelectedRowsChange={setSelectedRows}
              selectedRows={selectedRows}
              defaultColumnOptions={{
                sortable: true,
                resizable: true,
              }}
              onRowsChange={onRowsChange}
              onCellDoubleClick={(args) => {
                // console.log("args", args);
                // dispatch(setSelectedAdmittedStudent(args.row));
                // dispatch(setEditStudentRecordsModalVisible(true));
              }}
              direction={direction}
              onCellKeyDown={(_, event) => {
                if (event.isDefaultPrevented()) {
                  // skip parent grid keyboard navigation if nested grid handled it
                  event.preventGridDefault();
                }
              }}
              rowHeight={(row) => (row.type === "DETAIL" ? 65 : 30)}
            />
          </Spin>
        </div>

        <div
          style={{
            borderLeft: "1px solid lightgray",
            borderRight: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
            background: "#fff",
            padding: "5px 10px",
            backgroundColor: "#fafafa",
            height: 39,
            // textAlign: "right",
          }}
        >
          {totalRecords > 0 ? (
            <div>
              <Space size="middle">
                <Pagination
                  simple
                  current={currentPage}
                  total={totalRecords}
                  pageSize={pageSize}
                  pageSizeOptions={[50]}
                  onChange={handlePaginationChange}
                />
                <AntTypography.Text>{totalRecords} Records</AntTypography.Text>
              </Space>
            </div>
          ) : null}
        </div>
      </div>

      <ClearanceDetailsModal />
      {/* <EditStudentRecordsModal /> */}
    </div>
  );
}

export default DataTable;
