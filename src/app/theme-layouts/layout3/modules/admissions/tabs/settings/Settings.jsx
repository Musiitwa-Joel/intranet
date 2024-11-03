import { useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RunningAdmissions from "./running/RunningAdmissions";
import AdmissionForms from "./admission_forms/AdmissionForms";
import Schemes from "./managescheme/Schemes";
import AdmissionLevels from "./admission_levels/AdmissionLevels";

function Settings() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="widget flex w-full">
        <Box sx={{ width: "100%", typography: "body1", padding: 0 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                indicatorColor="secondary"
                textColor="secondary"
                style={{ backgroundColor: "white" }}
              >
                <Tab label="Running Admissions" value="1" />
                <Tab label="Manage Schemes" value="2" />
                <Tab label="Admission Levels" value="3" />
                <Tab label="Admission Letters" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{ padding: 0 }}>
              <RunningAdmissions />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <Schemes />
            </TabPanel>
            <TabPanel value="3" style={{ padding: 0 }}>
              <AdmissionLevels />
            </TabPanel>
            <TabPanel value="4" style={{ padding: 0 }}>
              <AdmissionForms />
            </TabPanel>
          </TabContext>
        </Box>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
