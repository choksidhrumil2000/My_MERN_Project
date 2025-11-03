import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./LogInOrSignUpFormComponent.module.css";
import Button from "@mui/material/Button";

import axios from "axios";
import { loginContext } from "../../Context/LoginContext";
import { userContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Context/SnackBarContext";
const LoginOrSignUpFormComponent = ({ form }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);
  const { userData, setUserData } = useContext(userContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showMessage } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChnage = (e) => {
    setPassword(e.target.value);
  };

  const handleLogInSignUpActivity = async () => {
    let resObj;
    let userObj;
    if (form === "LogIn") {
      userObj = {
        email,
        password,
      };
      console.log(userObj);
      try {
        resObj = await axios.post(
          process.env.REACT_APP_API_URL + "/auth/login",
          userObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        console.log("Login Error", err);
        return;
      }
    } else {
      userObj = {
        name,
        email,
        password,
        role: "user",
      };
      try {
        resObj = await axios.post(
          process.env.REACT_APP_API_URL + "/auth/register",
          userObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        showMessage(err.respone.data.message, "error");
        console.log("SignUp Error", err);
        return;
      }
    }
    console.log(resObj);
    sessionStorage.setItem("token", resObj.data.result.token);
    setUserData(resObj.data.result.user);
    setIsLoggedIn(true);
    showMessage("Welcome to The Dashboard!!!", "success");
    navigate("/dashboard");
  };

  return (
    <div>
      {form === "SignUp" && (
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
      )}
      {/* email................. */}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        className={`${!(form === "LogIn") ? styles.marginTop_16 : ""}`}
        fullWidth
      />

      {/* pasword.......................... */}

      <FormControl
        className={`${styles.marginTop_16}`}
        fullWidth
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChnage}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      {/* Login/Signup Button...................... */}
      <Button
        variant="contained"
        className={`${styles.marginTop_16}`}
        fullWidth
        onClick={handleLogInSignUpActivity}
      >
        {form}
      </Button>

    </div>
  );
};

export default LoginOrSignUpFormComponent;
