import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { borderBottomColor, Box, height } from "@mui/system";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { GET_APPLICANT_FORMS } from "app/theme-layouts/layout3/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { Tooltip } from "@mui/material";
import { Refresh, RuleFolder } from "@mui/icons-material";
import { Button, Image, Input as Input2, Space, message } from "antd";

import ListItem from "@mui/material/ListItem";

import {
  selectAdmittedStdsSummary,
  selectApplicantsSummary,
  selectSelectedAdmittedStdsSummary,
  selectSelectedApplicantSummary,
  setAdmittedStds,
  setLoadingAdmittedStds,
  setLoadingApplications,
  setSelectedAdmittedStdsSummary,
  setSelectedApplicantSummary,
} from "../../../admissionsSlice";
import { LOAD_ADMITTED_STUDENTS } from "../../../graphql/queries";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";

const rows = [
  {
    id: 1,
    prog_name: "BACHELOR OF LAWS",
    prog_code: "LLB",
    student_count: 30,
    campus_id: 1,
  },
  {
    id: 2,
    prog_name: "BACHELOR OF  SCIENCE IN COMPUTER SCIENCE",
    prog_code: "BCSCSS",
    student_count: 20,
    campus_id: 1,
  },
  {
    id: 3,
    prog_name: "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
    prog_code: "BIST",
    student_count: 19,
    campus_id: 1,
  },
  {
    id: 4,
    prog_name: "BACHELOR OF LAWS",
    prog_code: "LLB",
    student_count: 2,
    campus_id: 2,
  },
  {
    id: 5,
    prog_name: "BACHELOR OF  SCIENCE IN COMPUTER SCIENCE",
    prog_code: "BCSCSS",
    student_count: 4,
    campus_id: 2,
  },
  {
    id: 6,
    prog_name: "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
    prog_code: "BIST",
    student_count: 8,
    campus_id: 2,
  },
];

const groupByCampusTitle = (data) => {
  return data.reduce((acc, item) => {
    const { campus_title } = item;
    if (!acc[campus_title]) {
      acc[campus_title] = [];
    }
    acc[campus_title].push(item);
    return acc;
  }, {});
};

const columns = [
  { id: "prog_code", label: "Course Code", minWidth: 10 },
  {
    id: "students",
    numeric: false,
    // disablePadding: true,
    label: "No. of Stds",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              // border: "1px solid #ddd",
              // padding: "8px",
              // backgroundColor: "lightfray",
              whiteSpace: "nowrap",
              textAlign: "left",
              // color: "blue",
              // borderBottomColor: "blue",
              // borderBottomWidth: 1.5,
              boxShadow: "inset 0px -1.5px lightgray",
              // opacity: 0.7,
              fontSize: 13,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  "&.active": {
    backgroundColor: theme.palette.background.default,
  },
}));

function DemoSidebar({ refetch, isRefetching }) {
  const [searchText, setSearchText] = useState("");

  const [selected, setSelected] = React.useState([]);
  // const [selectedRow, setSelectedRow] = React.useState(null); //
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const [groupedData, setGroupedData] = useState({});

  const selectedprog = useSelector((state) => state.applicants.selectedProgram);
  const programChoices = useSelector(
    (state) => state.applicants.programChoices
  );

  const admittedStdsSummary = useSelector(selectAdmittedStdsSummary);
  const dispatch = useDispatch();
  const selectedRow = useSelector(selectSelectedAdmittedStdsSummary);

  const _groupedData = groupByCampusTitle(admittedStdsSummary);

  // console.log("grouped by campus", _groupedData);

  const [
    loadAdmittedStds,
    { error: loadErr, loading: loadingApplications, data },
  ] = useLazyQuery(LOAD_ADMITTED_STUDENTS, {
    notifyOnNetworkStatusChange: true, // Essential for accurate loading state
  });

  // const [getApplicantForms, { loading, error, data: applicant_forms }] =
  //   useLazyQuery(GET_APPLICANT_FORMS);

  // dispatch(loadApplicantForms(loading));

  if (loadErr) {
    // alert("error getting forms!");
    dispatch(
      showMessage({
        message: loadErr.message,
        variant: "error",
      })
    );
  }

  useEffect(() => {
    dispatch(setLoadingAdmittedStds(loadingApplications));
  }, [loadingApplications]);

  useEffect(() => {
    if (data) {
      dispatch(setAdmittedStds(data.admitted_students));
    }
  }, [data]);

  // console.log("redux prpog", programChoices);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleRowClick = async (event, row) => {
    // setSelectedRow(row.id); // Update selected row index
    // console.log("row", row);
    dispatch(setSelectedAdmittedStdsSummary(row));

    const res = await loadAdmittedStds({
      variables: {
        admissionsId: row.admissions_id,
        courseId: row.course_id,
        campusId: row.campus_id,
      },
    });

    // console.log("applications", res.data);

    if (res.data) {
      dispatch(setAdmittedStds(res.data.admitted_students));
    }
  };

  // console.log("grading...", gradingSystems);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="px-0 py-0">
      <Box
        className="p-5"
        style={{
          paddingLeft: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 15,
          backgroundColor: "#fff",
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{
            //   opacity: 0.7,
            // color: "white",
            fontSize: "1.7rem",
            // fontWeight: "bold",
          }}
        >
          Students Summary
        </Typography>

        <div>
          <Space>
            <Tooltip title="Reload">
              <Refresh
                onClick={async () => {
                  await refetch();
                  console.log("refetch...");
                  // if (networkStatus === NetworkStatus.refetch) {
                  //   console.log("Refetching...");
                  // }
                }}
                fontSize=""
                color="white"
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
          padding: 10,
        }}
      >
        {/* <Button>View Incomplete Forms</Button> */}
        <Input2 placeholder="Search..." />
      </div>

      <div className="max-w-full relative">
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 250px)",
            // minHeight: "calc(100vh - 180px)",
            // minHeight: 400,
            // maxHeight: 400,
          }}
        >
          <Table
            //   sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
            stickyHeader
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
            aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <Backdrop
              sx={{
                color: "#fff",
                position: "absolute",
                left: 0,
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isRefetching}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <TableBody>
              <>
                {Object.entries(_groupedData).map(([campusTitle, courses]) => {
                  // Calculate the total number of students for each campus
                  const totalStudents = courses.reduce(
                    (sum, course) => sum + course.student_count,
                    0
                  );

                  return (
                    <React.Fragment key={campusTitle}>
                      <TableRow
                        style={{
                          backgroundColor: "rgb(246, 249, 251)",
                        }}
                      >
                        <TableCell
                          colSpan={7}
                          style={{
                            color: "blue",
                            fontWeight: "bold",
                            fontSize: 13,
                            paddingLeft: 5,
                            marginLeft: 0,
                            opacity: 0.7,
                            borderBottomColor: "lightgray",
                            borderBottomWidth: 1.5,
                          }}
                        >
                          {campusTitle} CAMPUS
                        </TableCell>
                      </TableRow>
                      {courses.map((row) => (
                        <TableRow
                          hover
                          onClick={(event) => handleRowClick(event, row)}
                          key={row.id}
                          selected={
                            selectedRow &&
                            `${row.course_id}-${row.campus_id}` ===
                              `${selectedRow.course_id}-${selectedRow.campus_id}`
                          }
                          sx={{
                            cursor: "pointer",
                            fontSize: 13,
                            padding: 5,
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            style={{
                              // border: "1px solid #ddd",
                              borderTopColor: "#ddd",
                              borderBottomColor: "#ddd",
                              borderRightColor: "#ddd",
                              borderWidth: 1,
                              padding: "8px",
                              whiteSpace: "nowrap",
                              textAlign: "left",
                              fontSize: 13,
                            }}
                          >
                            {row.course_code}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            style={{
                              // border: "1px solid #ddd",
                              borderTopColor: "#ddd",
                              borderBottomColor: "#ddd",
                              borderWidth: 1,
                              whiteSpace: "nowrap",
                              paddingLeft: 10,
                              textAlign: "left",
                              fontSize: 13,
                            }}
                          >
                            {row.student_count}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        style={{
                          backgroundColor: "rgb(246, 249, 251)",
                        }}
                      >
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            paddingLeft: 5,
                            marginLeft: 0,
                            opacity: 0.7,
                            borderBottomColor: "lightgray",
                            borderBottomWidth: 1.5,
                          }}
                        >
                          Total Students
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            paddingLeft: 5,
                            marginLeft: 0,
                            opacity: 0.7,
                            borderBottomColor: "lightgray",
                            borderBottomWidth: 1.5,
                          }}
                        >
                          {totalStudents}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}

                {/* )} */}

                {/* <TableRow
                  style={{
                    backgroundColor: "rgb(246, 249, 251)",
                  }}
                >
                  <TableCell
                    colSpan={7}
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                      fontSize: 13,
                      paddingLeft: 5,
                      marginLeft: 0,
                      opacity: 0.7,
                      borderBottomColor: "lightgray",
                      borderBottomWidth: 1.5,
                    }}
                  >
                    {"KAMPALA CAMPUS"}
                  </TableCell>
                </TableRow>
                {visibleRows.map((row, index) => {
                  // const isItemSelected = isSelected(row.id);
                  // const isSelected = row.id === .id;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, row)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      //   tabIndex={-1}

                      key={row.id}
                      // selected={isSelected}
                      sx={{
                        cursor: "pointer",
                        fontSize: 13,
                        padding: 5,
                        // backgroundColor: "lightblue",
                      }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          //   paddingLeft: 10,
                          whiteSpace: "nowrap",
                          textAlign: "left",
                          fontSize: 13,
                        }}
                      >
                        {row.prog_code}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{
                          border: "1px solid #ddd",
                          // padding: "8px",

                          whiteSpace: "nowrap",
                          paddingLeft: 10,
                          textAlign: "left",
                          fontSize: 13,
                        }}
                      >
                        {row.student_count}
                      </TableCell>
                    </TableRow>
                  );
                })} */}
              </>
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DemoSidebar;
