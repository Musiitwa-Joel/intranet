import { memo, lazy } from "react";
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
import ProtectedRoute from "../auth/ProtectedRoute";
import FullScreenUnlockSessionPage from "../main/unlock-session/FullScreenUnlockSessionPage";
import Finance from "app/theme-layouts/layout3/modules/finance/Finance";
import TredPay from "app/theme-layouts/layout3/modules/tredpay/TredPay";
import SystemAccess from "app/theme-layouts/layout3/modules/system_access/SystemAccess";
import HR from "app/theme-layouts/layout3/modules/hr/HR";
import ResultsMgt from "app/theme-layouts/layout3/modules/results_mgt/ResultsMgt";
import Alumni from "app/theme-layouts/layout3/modules/alumini/Alumni";
import Voting from "app/theme-layouts/layout3/modules/voting/Voting";
import Counselling from "app/theme-layouts/layout3/modules/counselling/Counselling";
import Graduation from "app/theme-layouts/layout3/modules/graduation/Graduation";

// const ProgramsAndCourses = lazy(
//   () =>
//     import(
//       "app/theme-layouts/layout3/modules/prog_and_courses/ProgramsAndCourses"
//     )
// );

// const MemoizedProgramsAndCourses = memo(ProgramsAndCourses);

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
  //   path: "example",
  //   element: <Navigate to="/example" />,
  //   // auth: settingsConfig.defaultAuth,
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
  // {
  //   path: "example",
  //   element: (
  //     <ProtectedRoute>
  //       <Example />
  //     </ProtectedRoute>
  //   ),
  //   // auth: settingsConfig.defaultAuth,
  // },
  {
    path: "admissions",
    element: (
      <ProtectedRoute>
        <Admissions />
      </ProtectedRoute>
    ),
  },
  {
    path: "setup",
    element: (
      <ProtectedRoute>
        <Setup />
      </ProtectedRoute>
    ),
  },
  {
    path: "finance",
    element: (
      <ProtectedRoute>
        <Finance />
      </ProtectedRoute>
    ),
  },
  {
    path: "tredpay",
    element: (
      <ProtectedRoute>
        <TredPay />
      </ProtectedRoute>
    ),
  },
  {
    path: "programsencourses",
    element: (
      <ProtectedRoute>
        <ProgramsAndCourses />
      </ProtectedRoute>
    ),
  },
  {
    path: "student_assesment",
    element: (
      <ProtectedRoute>
        <EducationMonitoring />
      </ProtectedRoute>
    ),
  },
  {
    path: "photos_manager",
    element: (
      <ProtectedRoute>
        <PhotosManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "student_information_center",
    element: (
      <ProtectedRoute>
        <StudentInformationCenter />
      </ProtectedRoute>
    ),
  },
  {
    path: "registration",
    element: (
      <ProtectedRoute>
        <Registration />
      </ProtectedRoute>
    ),
  },
  {
    path: "fees_management",
    element: (
      <ProtectedRoute>
        <FeesMgt />
      </ProtectedRoute>
    ),
  },
  {
    path: "system_access",
    element: (
      <ProtectedRoute>
        <SystemAccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "hr",
    element: (
      <ProtectedRoute>
        <HR />
      </ProtectedRoute>
    ),
  },
  {
    path: "results_manager",
    element: (
      <ProtectedRoute>
        <ResultsMgt />
      </ProtectedRoute>
    ),
  },
  {
    path: "alumni",
    element: (
      <ProtectedRoute>
        <Alumni />
      </ProtectedRoute>
    ),
  },
  {
    path: "elearning",
    element: (
      <ProtectedRoute>
        <Elearning />
      </ProtectedRoute>
    ),
  },
  {
    path: "elections",
    element: (
      <ProtectedRoute>
        <Voting />
      </ProtectedRoute>
    ),
  },
  {
    path: "counselling",
    element: (
      <ProtectedRoute>
        <Counselling />
      </ProtectedRoute>
    ),
  },
  {
    path: "graduation",
    element: (
      <ProtectedRoute>
        <Graduation />
      </ProtectedRoute>
    ),
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "unlock_session",

    element: (
      <ProtectedRoute>
        <FullScreenUnlockSessionPage />
      </ProtectedRoute>
    ),
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
