import { styled } from "@mui/material/styles";
// import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import ProjectDashboardAppHeader from "./ProjectDashboardAppHeader";

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
          <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
            Home
          </div>
        }
      />
    </>
  );
}

export default Example;
