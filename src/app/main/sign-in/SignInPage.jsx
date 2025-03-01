import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "app/theme-layouts/layout3/graphql/mutations";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  setUserPermissions,
  userLogin,
} from "app/store/userSlice";
import { updateApps } from "app/store/appSlice";
import { setToken } from "app/store/tokenSlice";
import UseJwtAuth from "src/app/auth/services/jwt/useJwtAuth";
import config from "../../auth/services/jwt/jwtAuthConfig";
import { GET_MY_PROFILE } from "app/theme-layouts/layout3/graphql/queries";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import jwtDecode from "jwt-decode";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};
const facebookClick = (e) => {
  e.preventDefault(); // Prevent the default behavior of the link
  const facebookLink = "https://www.facebook.com/nkumbaUni";
  window.open(facebookLink, "_blank");
};
const instagramClick = (e) => {
  e.preventDefault(); // Prevent the default behavior of the link
  const instagramLink = "https://www.instagram.com/nkumba_uni";
  window.open(instagramLink, "_blank");
};
const twitterClick = (e) => {
  e.preventDefault(); // Prevent the default behavior of the link
  const twitterLink = "https://www.twitter.com/NkumbaUni";
  window.open(twitterLink, "_blank");
};

function SignInPage() {
  const { signIn } = UseJwtAuth();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    errorPolicy: "all",
  });

  const [
    loadMyProfile,
    { data: myProfileRes, error: myProfileErr, loading: myProfileLoading },
  ] = useLazyQuery(GET_MY_PROFILE, {
    fetchPolicy: "network-only",
  });

  // const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (myProfileErr) {
      dispatch(
        showMessage({
          message: myProfileErr.message,
          variant: "error",
        })
      );
    }
  }, [myProfileErr]);

  async function onSubmit({ email, password }) {
    const res = await loginUser({
      variables: {
        email: email,
        pwd: password,
      },
    });

    dispatch(setToken(res.data?.login?.token));

    // lets decode the token to get the user permissions
    const decoded = jwtDecode(res.data?.login?.token);

    // console.log(decoded);
    dispatch(setUserPermissions(decoded.permissions));
    dispatch(setUserDetails(decoded));

    if (res.data?.login) {
      //make another query for the user profile
      const res2 = await loadMyProfile();

      // console.log("myProfile", res2.data);

      dispatch(userLogin(res2.data.my_profile));

      dispatch(updateApps(res2.data.my_profile.role._modules));

      navigate("/example");
    }

    // if (data) {
    //   // console.log("data", data);
    //   if (data.login.sys_gen_pwd === 1) {
    //     navigate("/change-pwd");
    //   } else if (data.login.has_set_sec_qns === 0) {
    //     // hasnot yet set security qns
    //     navigate("/security_qns");
    //   } else {
    //     navigate("/example");
    //     // console.log("the role", data.login.role._modules);
    //     dispatch(updateApps(data.login.role._modules));
    //   }
    //   // console.log("loggged in", data.login);
    //   dispatch(userLogin(data.login));
    // }

    // navigate("/change-pwd");
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img
            className="w-50"
            src="assets/images/logo/nkumba-uninersity.png"
            alt="logo"
          />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          {/* <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/reset">
              Sign up
            </Link>
          </div> */}

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error ? (
              <Alert
                variant="filled"
                severity="error"
                style={{
                  marginBottom: 10,
                }}
              >
                {error.message}
              </Alert>
            ) : null}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  autoComplete="off"
                  // helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  autoComplete="new-password"
                  // helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              {loading || myProfileLoading ? (
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
                "Sign in"
              )}
            </Button>

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Follow Us On
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button
                variant="outlined"
                className="flex-auto"
                onClick={facebookClick}
              >
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button
                variant="outlined"
                className="flex-auto"
                onClick={twitterClick}
              >
                <Icon
                  color="action"
                  icon="pajamas:twitter"
                  width="20"
                  height="20"
                />
              </Button>
              <Button
                variant="outlined"
                className="flex-auto"
                onClick={instagramClick}
              >
                <FuseSvgIcon size={20} color="action">
                  feather:instagram
                </FuseSvgIcon>
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>Nkumba University 🎉</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            We are thrilled to have you as part of our community on the intranet
            system. This platform is designed to streamline communication,
            collaboration, and access to important resources.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                "& .MuiAvatar-root": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar src="assets/images/avatars/finance.png" />
              <Avatar src="assets/images/avatars/admissions.png" />
              <Avatar src="assets/images/avatars/assesement.png" />
              <Avatar src="assets/images/avatars/qualityAssurance.png" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              Feel free to interact with most of our modules!
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
