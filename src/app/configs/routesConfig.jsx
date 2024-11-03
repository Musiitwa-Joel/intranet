import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import Example from "../main/example/Example";
import SignInPage from "../main/sign-in/SignInPage";
import Admissions from "app/theme-layouts/layout3/modules/admissions/Admissions";
import Setup from "app/theme-layouts/layout3/modules/setup/Setup";
import ProgramsAndCourses from "app/theme-layouts/layout3/modules/prog_and_courses/ProgramsAndCourses";
import EducationMonitoring from "app/theme-layouts/layout3/modules/education_monitoring/EducationMonitoring";
import PhotosManager from "app/theme-layouts/layout3/modules/photos_manager/PhotosManager";
import Elearning from "app/theme-layouts/layout3/modules/elearning/Elearning";
import StudentInformationCenter from "app/theme-layouts/layout3/modules/student_info_center/StudentInformationCenter";
import FeesMgt from "app/theme-layouts/layout3/modules/fees_mgt/FeesMgt";
import Registration from "app/theme-layouts/layout3/modules/registration/Registration";

const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];
/**
 * The routes of the application.
 */
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs
    // settingsConfig.defaultAuth
  ),
  // {
  //  path: '/',
  //  element: <Navigate to="/example" />,
  //  auth: settingsConfig.defaultAuth
  // },
  {
    path: "/",
    element: <SignInPage />,
    // auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "example",
    element: <Example />,
    // auth: settingsConfig.defaultAuth,
  },
  {
    path: "admissions",
    element: <Admissions />,
  },
  {
    path: "setup",
    element: <Setup />,
  },
  {
    path: "programsencourses",
    element: <ProgramsAndCourses />,
  },
  {
    path: "student_assesment",
    element: <EducationMonitoring />,
  },
  {
    path: "photos_manager",
    element: <PhotosManager />,
  },
  {
    path: "student_information_center",
    element: <StudentInformationCenter />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "fees_management",
    element: <FeesMgt />,
  },
  {
    path: "elearning",
    element: <Elearning />,
  },

  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "home",
    element: <h1>Home</h1>,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];
export default routes;
