import { styled } from "@mui/material/styles";
// import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import ProjectDashboardAppHeader from "./ProjectDashboardAppHeader";
import HomePage from "./Homepage";

const Root2 = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

function Example(props) {
  //   const { t } = useTranslation("examplePage");

  return (
    <>
      <Root2
        header={<ProjectDashboardAppHeader />}
        content={
          <div className="">
            <HomePage />
          </div>
        }
      />
    </>
  );
}

export default Example;
