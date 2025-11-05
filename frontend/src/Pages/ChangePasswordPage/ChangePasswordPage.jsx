import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./ChangePasswordPage.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSnackbar } from "../../Context/SnackBarContext";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [currUserData, setCurrUserData] = useState({});
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const { showMessage } = useSnackbar();

  const checkIfUserExist = async () => {
    if(error)return;
    let resObj;
    try {
      resObj = await axios.get(
        process.env.REACT_APP_API_URL + `/user/profile?email=${email}`
      );
    } catch (err) {
      console.log(err);
      showMessage(err.response.data.message, "error");
      return;
    }
    console.log(resObj.data.userData);
    setCurrUserData(resObj.data.userData);
    setVerified(true);
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      setError(true);
      setHelperText("Email is required");
    } else if (!emailRegex.test(value)) {
      setError(true);
      setHelperText("Enter a valid email address");
    } else {
      setError(false);
      setHelperText("");
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const changePassword = async () => {
    let resObj;
    try {
      resObj = await axios.patch(
        process.env.REACT_APP_API_URL + `/user/profile/${currUserData._id}`,
        {
          password: newPassword,
        }
      );
    } catch (err) {
      console.log(err);
      showMessage(err.response.data.message, "error");
      return;
    }
    console.log(resObj);
    showMessage(resObj.data.message);
    navigate("/");
  };
  return (
    <div className={`${styles.mainSectionDiv}`}>
      <h1>Security Section</h1>
      <div className={`${styles.section}`}>
        {!verified && (
          <div className={`${styles.subSection}`}>
            <p>Verify If you Exist or Not.........</p>
            <div style={{ width: "100%" }}>
              <div className={`${styles.inputSection}`}>
                <label htmlFor={"input-email"}>Email:</label>
                <TextField
                  variant="standard"
                  id="input-email"
                  type="text"
                  width={`50%`}
                  value={email}
                  onChange={handleEmailChange}
                  error={error}
                  helperText={helperText}
                />
              </div>
            </div>

            <div className={`${styles.btnSection}`}>
              <Button variant="outlined" onClick={() => checkIfUserExist()}>
                Check
              </Button>
            </div>
          </div>
        )}
        {verified && (
          <div className={`${styles.subSection}`}>
            <p>Enter New Password.........</p>
            <div style={{ width: "100%" }}>
              <div className={`${styles.inputSection}`}>
                <label htmlFor={"input-password"}>NewPassword:</label>
                <TextField
                  variant="standard"
                  id="input-password"
                  type="text"
                  width={`50%`}
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className={`${styles.btnSection}`}>
              <Button variant="outlined" onClick={() => changePassword()}>
                Change Password
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
