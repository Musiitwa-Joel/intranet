import { Box, Typography } from "@mui/material";
import {
  Add,
  Cancel,
  ChangeCircle,
  Delete,
  Download,
  EditNoteSharp,
  IosShare,
  Refresh,
  RemoveRedEye,
  Send,
  Upload,
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
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import TestTable2 from "./TestTable2";
import {
  selectCourseVersionDetails,
  selectSelectedCourseVersion,
  setCreateNewCourse,
  updateCreateModuleModalOpen,
  updatecreateProgrammeModalOpen,
  updateProgrammeFormDetails,
} from "../../store/progAndCoursesSlice";
import Edit from "@mui/icons-material/Edit";

const { Search } = Input;

function CourseUnitsDatable({ panelWidth }) {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // console.log("pannel width", panelWidth);
  const dispatch = useDispatch();

  // const { selectedCourseVersion } = useSelector(
  //   (state) => state.progAndCourses
  // );
  const selectedCourseVersion = useSelector(selectSelectedCourseVersion);
  const courseVersionDetails = useSelector(selectCourseVersionDetails);

  // console.log("selected Couse version", selectedCourseVersion);
  const userObj = useSelector(selectUser);
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // console.log("selected course version", selectedCourseVersion);

  const handleCreateNewModule = () => {
    dispatch(updateCreateModuleModalOpen(true));
  };

  return (
    <div
      style={{
        // marginTop: 9,
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
        {selectedCourseVersion ? (
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
            {`${selectedCourseVersion.course.course_title} - ${selectedCourseVersion.label}`}
          </Typography>
        ) : (
          <div></div>
        )}

        <div>
          <Space>
            <Tooltip title="View Course Details">
              <Button
                size="small"
                icon={<RemoveRedEye />}
                disabled={!selectedCourseVersion}
                onClick={() => {
                  dispatch(setCreateNewCourse(false));
                  dispatch(updatecreateProgrammeModalOpen(true));

                  if (courseVersionDetails) {
                    const extractedData = {
                      id: courseVersionDetails.course.id,
                      course_code: courseVersionDetails.course.course_code,
                      course_title: courseVersionDetails.course.course_title,
                      course_version: courseVersionDetails.version_title,
                      course_duration:
                        courseVersionDetails.course.course_duration,
                      duration_measure:
                        courseVersionDetails.course.duration_measure,
                      course_head_id:
                        courseVersionDetails.course.course_head_id,
                      campuses: JSON.parse(
                        courseVersionDetails.course.campuses
                      ),
                      entry_yrs: JSON.parse(
                        courseVersionDetails.course.entry_yrs
                      ),
                      college_id: courseVersionDetails.course.college_id,
                      school_id: courseVersionDetails.course.school_id,
                      department_id: courseVersionDetails.course.department_id,
                      level: courseVersionDetails.course.level,
                      award: courseVersionDetails.course.award,
                      grading_id: courseVersionDetails.course.grading_id,
                      study_times: JSON.parse(
                        courseVersionDetails.course.study_times
                      ),
                      course_version_id: courseVersionDetails.id,
                      isShortCourse: Boolean(
                        courseVersionDetails.course.is_short_course
                      ),
                    };

                    dispatch(updateProgrammeFormDetails(extractedData));
                  }
                }}
              >
                View Course Details
              </Button>
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
          <Space
            style={{
              overflow: "auto",
            }}
          >
            <Search
              placeholder="Search Module..."
              onSearch={onSearch}
              size="small"
              width={500}
              style={{
                width: 190,
              }}
            />

            <Tooltip title="Create New Module">
              <Button
                size="small"
                icon={<Add />}
                onClick={handleCreateNewModule}
              >
                Create New Module
              </Button>
            </Tooltip>

            <Tooltip title="Upload Modules">
              <Button size="small" icon={<Upload />}>
                Upload Modules
              </Button>
            </Tooltip>

            <Tooltip title="Upload Modules">
              <Button size="small" icon={<Download />}>
                Download Modules
              </Button>
            </Tooltip>

            {/* <Dropdown menu={menuProps}>
              <Button size="small">
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown> */}

            <Button size="small" icon={<Edit />}>
              Edit Module
            </Button>

            <Button
              size="small"
              danger
              // style={{
              //   color: "red",
              //   borderColor: "red",
              // }}
              icon={<Delete />}
            >
              Delete
            </Button>
          </Space>

          {/* <Button
            disabled={
              selectedApplications.length == 0 || loadingApplicationDetails
            }
            loading={loadingApplicationDetails}
            onClick={handleOpenPreview}
            size="small"
          >
            Print Admission Letter(s)
          </Button> */}
        </div>
        <TestTable2 panelWidth={panelWidth} />
      </div>
    </div>
  );
}

export default CourseUnitsDatable;
