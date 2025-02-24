import { Box, Typography, Tooltip } from "@mui/material";
import {
  Cancel,
  ChangeCircle,
  EditNoteSharp,
  Refresh,
  Send,
} from "@mui/icons-material";
import {
  Form,
  Select,
  Table,
  Input,
  Row,
  Col,
  Space,
  Dropdown,
  Button,
  ConfigProvider,
  Modal,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdmitStdsModalVisible,
  selectAdmittedStds,
  selectAdmittedStdsSummary,
  selectApplicationPreviewModalOpen,
  selectApplications,
  selectLoadingAdmittedStds,
  selectSelectedAdmittedStds,
  selectSelectedAdmittedStdsRowKeys,
  selectSelectedAdmittedStdsSummary,
  setAdmissionLetterModalVisible,
  setAdmissionLetters,
  setApplicationForm,
  setApplicationPreviewModalOpen,
  setSelectedAdmittedStds,
  setSelectedAdmittedStdsRowKeys,
  setSelectedRowKeys,
} from "../../../admissionsSlice";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  LOAD_APPLICATION_DETAILS,
  PRINT_ADMISSION_LETTERS,
} from "../../../graphql/queries";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";
import {
  ADMIT_STDS,
  PUSH_TO_STD_INFO_CENTER,
} from "../../../graphql/mutations";
import { selectUser } from "app/store/userSlice";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import AdmissionLetterPreview from "./AdmissionLetterPreview";
import { useEffect } from "react";

const { Search } = Input;

const renderRow = (record, text) => {
  const color = parseInt(record.is_std_verified) ? "blue" : "black"; // Conditional color based on `verified` field

  return <span style={{ color }}>{text}</span>;
};
const columns = [
  {
    title: "#",
    dataIndex: "no",
    key: "index",
    width: 40,
    render: (text, record, index) => renderRow(record, index + 1),
  },
  {
    title: "Date",
    dataIndex: "admitted_on",
    ellipsis: true,
    // render: (text, record, index) => (
    //   <span>{formatDateString(parseInt(text))}</span>
    // ),
    render: (text, record, index) =>
      renderRow(record, formatDateString(parseInt(text))),
    width: 150,
  },
  {
    title: "Form No",
    ellipsis: true,
    dataIndex: "form_no",
    render: (text, record, index) => renderRow(record, text),
    width: 140,
  },
  {
    title: "Student No",
    ellipsis: true,
    dataIndex: "student_no",
    render: (text, record, index) => renderRow(record, text),
    width: 110,
  },
  {
    title: "Reg no",
    dataIndex: "registration_no",
    ellipsis: true,
    width: 150,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Name",
    // dataIndex: "name",
    width: 210,
    ellipsis: true,
    sorter: (a, b) => {
      const nameA = `${a.biodata.surname} ${a.biodata.other_names}`;
      const nameB = `${b.biodata.surname} ${b.biodata.other_names}`;
      return nameA.localeCompare(nameB); // Sort names alphabetically
    },
    // render: (text, record, index) => {
    //   const name = `${record.applicant.surname} ${record.applicant.other_names}`;
    //   const color = record ? "blue" : "red"; // Conditional color based on `paid` field

    //   return <span style={{ color }}>{name}</span>;
    // },
    render: (text, record, index) =>
      renderRow(
        record,
        `${record.biodata.surname} ${record.biodata.other_names}`
      ),
  },
  {
    title: "Sex",
    dataIndex: "gender",
    width: 50,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, record.biodata.gender),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Course Code",
    dataIndex: "course_code",
    width: 100,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) =>
      renderRow(record, record.course.course_code),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Campus",
    dataIndex: "campus_title",
    width: 80,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Study Time",
    dataIndex: "study_time_title",
    width: 100,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Intake",
    dataIndex: "intake_title",
    width: 80,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    width: 100,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) =>
      renderRow(record, record.biodata.nationality.nationality_title),
    // sorter: (a, b) => a.age - b.age,
  },

  {
    title: "Entry Study Year",
    dataIndex: "entry_study_yr",
    width: 130,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, text),
    // sorter: (a, b) => a.age - b.age,
  },
];

const handleButtonClick = (e) => {
  // message.info("Click on left button.");
  console.log("click left button", e);
};

const items = [
  {
    label: "Push to Student Information Center",
    key: "1",
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
    key: "2",
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

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.address}</p>,
};

function AdmittedStdsDataTable() {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const userObj = useSelector(selectUser);
  const selectedCourseGroup = useSelector(selectSelectedAdmittedStdsSummary);
  const loadingApplications = useSelector(selectLoadingAdmittedStds);
  const applications = useSelector(selectAdmittedStds);
  const selectedAdmittedStds = useSelector(selectSelectedAdmittedStds);
  const applicationPreviewModalOpen = useSelector(
    selectApplicationPreviewModalOpen
  );
  const selectedRowKeys = useSelector(selectSelectedAdmittedStdsRowKeys);

  const [
    pushToStdInfoCenter,
    { error: pushErr, loading: pushingStds, data: pushRes },
  ] = useMutation(PUSH_TO_STD_INFO_CENTER, {
    refetchQueries: ["loadAdmittedStudents"],
  });

  // console.log("applications----", applications);
  const [
    loadApplicationDetails,
    {
      error: loadErr,
      data: applicationRes,
      loading: loadingApplicationDetails,
    },
  ] = useLazyQuery(LOAD_APPLICATION_DETAILS);

  const [printAdmissionLetters, { error: printErr, loading: printingLetters }] =
    useLazyQuery(PRINT_ADMISSION_LETTERS, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    });

  // console.log("print error", printErr?.message);

  useEffect(() => {
    if (loadErr) {
      dispatch(
        showMessage({
          message: loadErr.message,
          variant: "error",
        })
      );
    }

    if (pushErr) {
      dispatch(
        showMessage({
          message: pushErr.message,
          variant: "error",
        })
      );
    }

    if (printErr) {
      dispatch(
        showMessage({
          message: printErr.message,
          variant: "error",
        })
      );
    }
  }, [printErr, pushErr, loadErr]);

  const handleMenuClick = async (e) => {
    // message.info("Click on menu item.");
    console.log("click", e);
    if (e.key == "1") {
      // Push to student information center

      if (selectedAdmittedStds.length == 0)
        return dispatch(
          showMessage({
            message: "Please select at least one student",
            variant: "info",
          })
        );
      const std_ids = selectedAdmittedStds.map((std) => std.std_id);

      // console.log("the ids", std_ids);

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

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys, selectedRows);
    // setSelectedRowKeys(newSelectedRowKeys);
    dispatch(setSelectedAdmittedStdsRowKeys(newSelectedRowKeys));
    dispatch(setSelectedAdmittedStds(selectedRows));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOpenPreview = async () => {
    const stds = selectedAdmittedStds.map((std) => ({
      applicant_id: std.biodata.id,
      form_no: std.form_no,
    }));

    const payload = {
      students: stds,
    };

    console.log("selected applications", selectedAdmittedStds);
    const res = await printAdmissionLetters({
      variables: payload,
    });

    console.log("responsse", res.data);
    if (res.data?.print_admission_letters) {
      dispatch(setAdmissionLetters(res.data.print_admission_letters));

      dispatch(setAdmissionLetterModalVisible(true));
    }
  };

  return (
    <div
      style={{
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderColor: "lightgray",
          borderWidth: 1,
          // marginBottom: 1,
        }}
        className="p-5"
        style={{
          paddingLeft: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 15,
          marginBottom: 7,
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
          {selectedCourseGroup
            ? `${selectedCourseGroup.course_title} - (${selectedCourseGroup.course_code})`
            : null}
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
          maxHeight: "calc(100vh - 188px)",
          minHeight: "calc(100vh - 188px)",
          //   height: 600,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: 8,
            display: "flex",
            justifyContent: "space-between",
            borderColor: "lightgray",

            borderWidth: 1,
            // marginTop: 5,
            marginBottom: 8,
          }}
        >
          <Space>
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
              options={[
                {
                  value: "name",
                  label: "Name",
                },
                {
                  value: "program_code",
                  label: "Program Code",
                },
              ]}
            />

            <Search
              placeholder="input search text"
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

            <Button size="small">Export to Excel</Button>
          </Space>

          <Button
            disabled={selectedAdmittedStds.length == 0 || printingLetters}
            loading={printingLetters}
            onClick={handleOpenPreview}
            size="small"
          >
            Print Admission Letter(s)
          </Button>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                // headerBg: "rgba(0, 0, 0, 0.04)",
                borderColor: "lightgray",
                // borderWidth: 10,
                // headerColor: "dodgerblue",
                borderRadius: 0,
                headerBorderRadius: 0,
                // colorBorderBg: "black",
                // cellFontSize: 10,
                // fontSize: 13,
                // controlHeight: 12
                lineHeight: 0.8,

                // backgroundColor: "red",

                // headerColor: "red",
                // headerSplitColor: "red",
                // borderColor: "red",
                // padding: 0,
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={applications}
            loading={loadingApplications || pushingStds}
            rowKey="std_id"
            bordered
            sticky
            rowSelection={rowSelection}
            expandable={defaultExpandable}
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

      <AdmissionLetterPreview />
    </div>
  );
}

export default AdmittedStdsDataTable;
