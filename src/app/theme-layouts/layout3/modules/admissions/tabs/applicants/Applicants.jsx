import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { lighten, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DemoSidebar from "./shared-components/DemoSidebar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useSuspenseQuery } from "@apollo/client";
import {
  GET_APPLICANT_REQS,
  GET_PROGRAM_CHOICES,
} from "app/theme-layouts/layout3/graphql/queries";
// import {
//   applicantReqsLoaded,
//   saveProgramChoices,
// } from "app/store/admissions/applicantsSlice";
import {
  updateAccYr,
  updateIntake,
  updateScheme,
} from "app/store/admissionsSlice";
// import DataTable from "./shared-components/DataTable";
import ApplicantsFillForm from "./ApplicantsFillForm";
import AdmissionsDataTable from "./shared-components/AdmissionsDataTable";
import TestTable from "./shared-components/TestTable";

const acc_yrs = [
  {
    value: "2023/2024",
    label: "2023/2024",
  },
  {
    value: "2023/2024",
    label: "2023/2024",
  },
  {
    value: "2023/2024",
    label: "2023/2024",
  },
  {
    value: "2023/2024",
    label: "2023/2024",
  },
];

const schemes = [
  {
    value: "1",
    label: "DIRECT ENTRY",
  },
  {
    value: "2",
    label: "MATURE ENTRY",
  },
  {
    value: "3",
    label: "POST GRADUATE",
  },
];

const intakes = [
  {
    value: "FEB",
    label: "FEBRUARY",
  },
  {
    value: "AUG",
    label: "AUGUST",
  },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#4f46e6",
  "&:hover": {
    backgroundColor: "#4f46e6",
  },
}));

const Applicants = React.memo(function Applicants() {
  const appExistsInTaskBar = useSelector((state) => state.apps.exists);
  const [
    getProgramChoices,
    {
      loading: progChoiceLoading,
      error: progChoiceError,
      data: progChoiceData,
      refetch,
    },
  ] = useLazyQuery(GET_PROGRAM_CHOICES);

  // const [acc_yr, setAccYr] = React.useState("");
  // const [scheme, setScheme] = React.useState("");
  // const [intake, setIntake] = React.useState("");

  const { scheme, acc_yr, intake } = useSelector(
    (state) => state.admissions.module_state
  );
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const handleChange = (event) => {
    dispatch(updateAccYr(event.target.value));
  };
  const handleChangeScheme = (event) => {
    dispatch(updateScheme(event.target.value));
  };

  const handleChangeIntake = (event) => {
    dispatch(updateIntake(event.target.value));
  };

  // if (loading) return console.log("loading...");
  // if (error) {
  //   return console.log("errorr", error);
  // }

  if (progChoiceError) {
    return console.log("prog error", progChoiceError.message);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);
  return (
    <>
      <div>
        {/* <IconButton
          onClick={(ev) => setLeftSidebarOpen(!leftSidebarOpen)}
          aria-label="toggle left sidebar"
          size="large"
        >
          <FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
        </IconButton> */}
        {/* <div className="flex flex-1 px-8 py-16 lg:px-12">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              marginTop: 0,
            }}
          >
            <Grid item xs={2}>
              <FormControl
                fullWidth
                size="small"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <InputLabel id="demo-simple-select-label">Acc Yr</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={acc_yr}
                  label="Acc_yr"
                  onChange={handleChange}
                >
                  {acc_yrs.map((acc) => (
                    <MenuItem value={acc.value}>{acc.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Scheme</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={scheme}
                  label="Scheme"
                  onChange={handleChangeScheme}
                >
                  {schemes.map((acc) => (
                    <MenuItem value={acc.value}>{acc.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Intake</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={intake}
                  label="Intake"
                  onChange={handleChangeIntake}
                >
                  {intakes.map((acc) => (
                    <MenuItem value={acc.value}>{acc.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <ColorButton
                variant="contained"
                disabled={acc_yr && scheme && intake && data ? false : true}
                onClick={async () => {
                  console.log("data", {
                    intake,
                    scheme,
                    acc_yr,
                  });
                  getProgramChoices({
                    variables: {
                      accYr: acc_yr,
                      intakeId: intake,
                      schemeCategoryId: scheme,
                    },
                  }).then((res) => {
                    console.log("result", res.data);
                    dispatch(saveProgramChoices(res.data.program_choices));
                  });
                }}
              >
                {progChoiceLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                      color: "#fff",
                      animationDuration: "550ms",
                    }}
                    size={18}
                    thickness={6}
                  />
                ) : (
                  "LOAD"
                )}
              </ColorButton>
            </Grid>
          </Grid>
        </div> */}

        <ApplicantsFillForm />
      </div>
      <div
        style={{
          height: "calc(100vh - 152px)",
        }}
      >
        <PanelGroup direction="horizontal">
          <Panel
            defaultSize={20}
            minSize={15}
            style={{
              backgroundColor: "#fff",
              marginLeft: 10,
              borderColor: "lightgray",
              borderWidth: 1,
            }}
          >
            <DemoSidebar isRefetching={progChoiceLoading} />
          </Panel>
          <PanelResizeHandle
            style={
              {
                // width: 1,
                // backgroundColor: "lightgray",
                // opacity: 0.6,
              }
            }
          />
          <Panel minSize={65}>
            <AdmissionsDataTable />
            {/* <TestTable /> */}
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
});

export default Applicants;
