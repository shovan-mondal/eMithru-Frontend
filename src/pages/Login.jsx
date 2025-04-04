import logo from "../public/logo.png";
import {
  Box,
  Card,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Link,
  Avatar,
  useTheme,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import Image from "mui-image";
import Page from "../components/Page";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import Illustration from "../public/login_illustration.png";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const { isFetching, dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [isAdminDemoChecked, setIsAdminDemoChecked] = useState(false);
  const [isFacultyDemoChecked, setIsFacultyDemoChecked] = useState(false);
  const [isStudentDemoChecked, setIsStudentDemoChecked] = useState(false);

  const handleAdminDemoChange = (event) => {
    setIsAdminDemoChecked(event.target.checked);
    if (event.target.checked) {
      email.current.value = "ghost@ex.com";
      password.current.value = "ghost1234";
      setIsStudentDemoChecked(false);
      setIsFacultyDemoChecked(false);
    } else {
      email.current.value = "";
      password.current.value = "";
    }
  };

  const handleFacultyDemoChange = (event) => {
    setIsFacultyDemoChecked(event.target.checked);
    if (event.target.checked) {
      email.current.value = "demofaculty@emithru.com";
      password.current.value = "demofacultypassword";
      setIsStudentDemoChecked(false);
      setIsAdminDemoChecked(false);
    } else {
      email.current.value = "";
      password.current.value = "";
    }
  };

  const handleStudentDemoChange = (event) => {
    setIsStudentDemoChecked(event.target.checked);
    if (event.target.checked) {
      email.current.value = "demostudent@emithru.com";
      password.current.value = "demostudentpassword";
      setIsFacultyDemoChecked(false);
      setIsAdminDemoChecked(false);
    } else {
      email.current.value = "";
      password.current.value = "";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message || "Login failed", {
        variant: "error",
      });
    }
  };

  return (
    <Page title="Login">
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundImage: `url(${Illustration})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "1rem",
            }}
          />
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              py: { xs: 4, md: 8 },
              px: { xs: 4, md: 8 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                display="flex"
                flexDirection="column"
                width="100%"
                maxWidth={500}
                mx="auto"
              >
                <Stack spacing={3} mb={3}>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{
                        width: "200px",
                        filter:
                          theme.palette.mode === "dark"
                            ? "invert(100%) brightness(200%)"
                            : "none",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    color=""
                    align="center"
                    gutterBottom
                  >
                    Sign in to e-Mithru
                  </Typography>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    inputRef={email}
                    autoComplete="email"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    inputRef={password}
                    autoComplete="current-password"
                  />

                  <Stack direction="row" justifyContent="space-between">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={isAdminDemoChecked}
                          onChange={handleAdminDemoChange}
                          name="adminDemo"
                        />
                      }
                      label="Admin Demo"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={isFacultyDemoChecked}
                          onChange={handleFacultyDemoChange}
                          name="facultyDemo"
                        />
                      }
                      label="Faculty Demo"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={isStudentDemoChecked}
                          onChange={handleStudentDemoChange}
                          name="studentDemo"
                        />
                      }
                      label="Student Demo"
                    />
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    color={isLight ? "primary" : "info"}
                    size="large"
                    disabled={isFetching}
                    startIcon={
                      isFetching ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isFetching ? "Signing in..." : "Sign in"}
                  </Button>
                </Stack>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Link href="/forgotPassword" underline="hover">
                    Forgot password?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Login;
