import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import CreateNewProgrammeForm from "./CreateNewProgrammeForm";
import ProgrammeAliases from "./programme_aliases/ProgrammeAliases";
import {
  selectCreateNewCourse,
  selectProgrammeFormDetails,
  selectSelectedCourseVersion,
  updatecreateProgrammeModalOpen,
} from "../../../store/progAndCoursesSlice";
import ModulesDataTable from "./ModulesDataTable";
import ProgrammeDescription from "./ProgrammeDescription";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function CustomTabPanelNoPadding(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CreateProgrammeModal() {
  const { createProgrammeModalOpen } = useSelector(
    (state) => state.progAndCourses
  );

  const selectedCourseVersion = useSelector(selectSelectedCourseVersion);
  const createNew = useSelector(selectCreateNewCourse);
  const programFormDetails = useSelector(selectProgrammeFormDetails);

  // console.log("selected Couse version", selectedCourseVersion);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  //   console.log("modal open", createProgrammeModalOpen);
  return (
    <Dialog
      fullScreen
      open={createProgrammeModalOpen}
      onClose={() => dispatch(updatecreateProgrammeModalOpen(false))}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(updatecreateProgrammeModalOpen(false))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {selectedCourseVersion && !createNew
              ? `(${selectedCourseVersion.course.course_code}) ${selectedCourseVersion.course.course_title} - ${selectedCourseVersion.label}`
              : "CREATE A NEW PROGRAMME/COURSE"}
          </Typography>
          {/* <Button
            autoFocus
            color="inherit"
            onClick={() => dispatch(updatecreateProgrammeModalOpen(false))}
          >
            save
          </Button> */}
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Program Details" {...a11yProps(0)} />
            <Tab
              label="Program Aliases"
              disabled={!programFormDetails?.id}
              {...a11yProps(1)}
            />
            <Tab label="Program Description" disabled {...a11yProps(2)} />
            <Tab label="Course units/Modules" disabled {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CreateNewProgrammeForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProgrammeAliases />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ProgrammeDescription />
        </CustomTabPanel>
        <CustomTabPanelNoPadding value={value} index={3}>
          <ModulesDataTable />
        </CustomTabPanelNoPadding>
      </Box>
    </Dialog>
  );
}
