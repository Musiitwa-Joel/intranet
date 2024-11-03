import { Box, Typography, Tooltip } from "@mui/material";
import {
  AccessTimeFilledSharp,
  AddCircleSharp,
  DownloadDone,
  EditNoteSharp,
  GetAppSharp,
  HouseSidingSharp,
  PublishSharp,
  Refresh,
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
  selectApplicationPreviewModalOpen,
  selectApplications,
  selectLoadingApplications,
  selectSelectedApplicantSummary,
  selectSelectedApplications,
  selectSelectedRowKeys,
  setAdmitStdsModalVisible,
  setApplicationForm,
  setApplicationPreviewModalOpen,
  setSelectedApplications,
  setSelectedRowKeys,
} from "../../../admissionsSlice";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  LOAD_APPLICATIONS,
  LOAD_APPLICATION_DETAILS,
} from "../../../graphql/queries";
import formatDateString from "app/theme-layouts/layout3/utils/formatDateToDateAndTime";
import { useEffect, useState } from "react";
import ApplicationPreview from "./ApplicationPreview";
import Add from "@mui/icons-material/Add";
import AdmitStudentsModal from "./AdmitStudentsModal";
import { ADMIT_STDS } from "../../../graphql/mutations";
import { selectUser } from "app/store/userSlice";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import CheckIcon from "@mui/icons-material/Check";

const { Search } = Input;

const renderRow = (record, text) => {
  const color = parseInt(record.is_admitted)
    ? "blue"
    : parseInt(record.is_paid)
      ? "green"
      : "red"; // Conditional color based on `paid` field

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
    dataIndex: "creation_date",
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
    title: "Name",
    // dataIndex: "name",
    width: 210,
    ellipsis: true,
    sorter: (a, b) => {
      const nameA = `${a.applicant.surname} ${a.applicant.other_names}`;
      const nameB = `${b.applicant.surname} ${b.applicant.other_names}`;
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
        `${record.applicant.surname} ${record.applicant.other_names}`
      ),
  },
  {
    title: "Sex",
    dataIndex: "gender",
    width: 50,
    // rener: (text, record, index) => <>{`${record.applicant.gender}`}</>,
    render: (text, record, index) => renderRow(record, record.applicant.gender),
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 150,
    ellipsis: true,
    // render: (text, record, index) => <span>{`${record.applicant.email}`}</span>,
    render: (text, record, index) => renderRow(record, record.applicant.email),
  },
  {
    title: "Paid",
    dataIndex: "is_paid",
    ellipsis: true,
    width: 50,
    render: (text, record, index) => {
      if (Boolean(parseInt(text))) {
        return (
          <CheckIcon
            style={{
              color: parseInt(record.is_admitted)
                ? "blue"
                : parseInt(record.is_paid)
                  ? "green"
                  : "red",
            }}
          />
        );
      } else {
        return renderRow(record, "...");
      }
    },
    // render: (text, record, index) => <>{`${record.applicant.email}`}</>,
  },
  {
    title: "Admitted",
    dataIndex: "admitted",
    ellipsis: true,
    // render: (text, record, index) => <>{`_`}</>,
    render: (text, record, index) => {
      if (Boolean(parseInt(record.is_admitted))) {
        return (
          <CheckIcon
            style={{
              color: "blue",
            }}
          />
        );
      } else {
        return renderRow(record, "...");
      }
    },
    width: 80,
  },
  {
    title: "1st Choice",
    // dataIndex: "",
    ellipsis: true,
    width: 200,
    children: [
      {
        title: "Progcode",
        dataIndex: "street",
        key: "code",
        ellipsis: true,
        // render: (text, record, index) => (
        //   <>{`${record.program_choices[0].course.course_code}`}</>
        // ),
        render: (text, record, index) =>
          renderRow(record, record.program_choices[0].course.course_code),
        width: 150,
      },
      {
        title: "Alias",
        dataIndex: "street",
        ellipsis: true,
        key: "street",
        // render: (text, record, index) => (
        //   <>{`${record.program_choices[0].course.course_code}`}</>
        // ),
        render: (text, record, index) =>
          renderRow(record, record.program_choices[0].course.course_code),
        width: 150,
      },
    ],
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const handleButtonClick = (e) => {
  // message.info("Click on left button.");
  console.log("click left button", e);
};

const items = [
  {
    label: "Add Application",
    key: "1",
    icon: (
      <AddCircleSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Edit Application",
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
    label: "Edit Campus",
    key: "3",
    icon: (
      <HouseSidingSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
    // danger: true,
  },
  {
    label: "Edit Study Time",
    key: "4",
    icon: (
      <AccessTimeFilledSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Import Applicants",
    key: "5",
    icon: (
      <PublishSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Export Applicants",
    key: "6",
    icon: (
      <GetAppSharp
        style={{
          fontSize: 18,
        }}
      />
    ),
  },
  {
    label: "Administratively Admit",
    key: "7",
    icon: (
      <DownloadDone
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

function AdmissionsDataTable() {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const userObj = useSelector(selectUser);
  const selectedCourseGroup = useSelector(selectSelectedApplicantSummary);
  const loadingApplications = useSelector(selectLoadingApplications);
  const applications = useSelector(selectApplications);
  const selectedApplications = useSelector(selectSelectedApplications);
  const applicationPreviewModalOpen = useSelector(
    selectApplicationPreviewModalOpen
  );
  const admitStdsModalVisible = useSelector(selectAdmitStdsModalVisible);
  const selectedRowKeys = useSelector(selectSelectedRowKeys);

  const [admitStudents, { error, loading, data }] = useMutation(ADMIT_STDS, {
    refetchQueries: ["loadApplications"],
  });

  // console.log("selectedApplication", selectedApplications);
  const [
    loadApplicationDetails,
    {
      error: loadErr,
      data: applicationRes,
      loading: loadingApplicationDetails,
    },
  ] = useLazyQuery(LOAD_APPLICATION_DETAILS);

  if (loadErr) {
    dispatch({
      message: loadErr.message,
      variant: "error",
    });
  }

  if (error) {
    dispatch({
      message: error.message,
      variant: "error",
    });
  }

  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    console.log("click", e);
    if (e.key == "7") {
      // admiministrative admit
      dispatch(setAdmitStdsModalVisible(true));
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys, selectedRows);
    // setSelectedRowKeys(newSelectedRowKeys);
    dispatch(setSelectedRowKeys(newSelectedRowKeys));
    dispatch(setSelectedApplications(selectedRows));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAdmit = async () => {
    // console.log("selected applications", selectedApplications);

    const _applications = selectedApplications.map((application) => ({
      application_id: application.id,
      prog_choice_id: application.program_choices[0].id,
      std_id: application.std_id,
    }));

    const data = {
      applicants: _applications,
      admittedBy: userObj.user.user_id,
    };

    // console.log("data", data);

    const res = await admitStudents({
      variables: data,
    });

    dispatch(
      showMessage({
        message: res.data.admit_students.message,
        variant: "success",
      })
    );

    dispatch(setAdmitStdsModalVisible(false));
    dispatch(setSelectedApplications([]));
  };

  const handleOpenPreview = async () => {
    // console.log("selected app", selectedApplication);
    if (selectedApplications.length > 0) {
      let latestAppSelected =
        selectedApplications[selectedApplications.length - 1];
      const res = await loadApplicationDetails({
        variables: {
          formNo: latestAppSelected.form_no,
          applicantId: latestAppSelected.applicant.id,
        },
      });

      // console.log("response", res.data);
      dispatch(setApplicationForm(res.data.application));
      dispatch(setApplicationPreviewModalOpen(true));
    }
    // setIsOpen(true);
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
          backgroundColor: "#1e293b",
        }}
        className="p-5"
        style={{
          paddingLeft: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 15,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{
            //   opacity: 0.7,
            color: "white",
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
                color="white"
                style={{
                  color: "white",
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
              placeholder="Select a person"
              optionFilterProp="label"
              size="small"
              style={{
                width: 200,
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
              style={{
                width: 200,
              }}
            />

            <Dropdown menu={menuProps}>
              <Button size="small">
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Button size="small">Download All Applicants</Button>
          </Space>

          <Button
            disabled={
              selectedApplications.length == 0 || loadingApplicationDetails
            }
            loading={loadingApplicationDetails}
            onClick={handleOpenPreview}
            size="small"
          >
            View Form
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
                cellFontSize: 10,
                fontSize: 13,
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
            loading={loadingApplications}
            rowKey="id"
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

          {/* <TestTable /> */}
        </ConfigProvider>
      </div>

      <Modal
        title="APPLICATION FORM PREVIEW"
        // centered
        open={applicationPreviewModalOpen}
        style={{
          top: 0,
          //   overflow: "auto",
        }}
        onOk={() => dispatch(setApplicationPreviewModalOpen(false))}
        onCancel={() => dispatch(setApplicationPreviewModalOpen(false))}
        okButtonProps={{
          style: {
            color: "#000",
            borderColor: "lightgray",
          },
        }}
        width={1000}
        zIndex={10000}
      >
        <ApplicationPreview />
      </Modal>

      <Modal
        title="ADMIT STUDENTS"
        // centered
        open={admitStdsModalVisible}
        // style={{
        //   top: 0,
        //   //   overflow: "auto",
        // }}
        onOk={() => handleAdmit()}
        onCancel={() => dispatch(setAdmitStdsModalVisible(false))}
        okButtonProps={{
          danger: true,
          loading: loading,
          disabled: loading || selectedApplications == 0,
        }}
        okType="primary"
        width={1000}
        zIndex={10000}
        okText="Admit Students"
      >
        {/* <ApplicationPreview form_details={selectedApplication} /> */}
        <AdmitStudentsModal />
      </Modal>
    </div>
  );
}

export default AdmissionsDataTable;
