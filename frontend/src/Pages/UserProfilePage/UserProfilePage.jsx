import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./UserProfilePage.module.css";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSnackbar } from "../../Context/SnackBarContext";
import axios from "axios";
import { userContext } from "../../Context/UserContext";

const UserProfilePage = (
  {
    // userData,
    // setterOfUserData,
    // editProfileSection,
    // setEditProfileSection,
    // securitySectionEdit,
    // setSecuritySectionEdit,
  }
) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const { userData, setUserData } = useContext(userContext);

  const [editProfileSection, setEditProfileSection] = useState(false);
  const [securitySectionEdit, setSecuritySectionEdit] = useState(false);

  const [editedUserData, setEditedUserData] = useState(userData);

  const { showMessage } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChnage = (e) => {
    setNewPassword(e.target.value);
  };

  const OnSavePassword = async () => {
    let resObj;
    try {
      resObj = await axios.patch(
        process.env.REACT_APP_API_URL + `/user/profile/${editedUserData.id}`,
        {
          password: newPassword,
        }
        // ,
        // {
        //   headers: {
        //     Authorization: `Bearer ${JSON.parse(
        //       sessionStorage.getItem("token")
        //     )}`,
        //   },
        // }
      );
    } catch (err) {
      console.log(err);
      showMessage(err.response.data.message, "error");
      // console.log("SaveUserProfile Error", err);
      return;
    }
    console.log(resObj);
    showMessage(resObj.data.message);
    // setterOfUserData(editedUserData);
    setNewPassword("");
    setSecuritySectionEdit(false);
  };

  const OnSaveUserProfile = async () => {
    let resObj;
    const { id, ...dataToSent } = editedUserData;
    try {
      resObj = await axios.put(
        process.env.REACT_APP_API_URL + `/user/profile/${editedUserData.id}`,
        dataToSent,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
      showMessage(err.response.data.message, "error");
      // console.log("SaveUserProfile Error", err);
      return;
    }
    console.log(resObj);
    showMessage(resObj.data.message);
    // setterOfUserData(editedUserData);
    setUserData(editedUserData);
    setEditProfileSection(false);
  };

  const OnCloseEdit = (section) => {
    if (section === "userProfile") setEditProfileSection(false);
    else if (section === "security") setSecuritySectionEdit(false);
    setEditedUserData(userData);
    setNewPassword("");
  };

  const handleNameChange = (e) => {
    setEditedUserData((data) => {
      const newData = {
        ...data,
        name: e.target.value,
      };
      return newData;
    });
  };

  const handleEmailChange = (e) => {
    setEditedUserData((data) => {
      const newData = {
        ...data,
        email: e.target.value,
      };
      return newData;
    });
  };

  const handleRoleChange = (e) => {
    setEditedUserData((data) => {
      const newData = {
        ...data,
        role: e.target.value,
      };
      return newData;
    });
  };

  const handleEditProfile = () => {
    setEditProfileSection(true);
  };

  const handlePasswordEdit = () => {
    setSecuritySectionEdit(true);
  };

  return (
    <div>
      {/* Starts Here............... */}
      <h1>{`Hello, ${editedUserData.name}!!!`}</h1>
      <div className={`${styles.mainSectionDiv}`}>
        <h2>UserProfile Section</h2>
        <EditIcon onClick={handleEditProfile} />
      </div>
      <div className={`${styles.section}`}>
        <div className={`${styles.subSection}`}>
          <p>You can Edit this Profile By clicking on Edit Button...</p>
          <div style={{ width: "100%" }}>
            <div className={`${styles.inputSection}`}>
              <label htmlFor={"input-name"}>Password:</label>
              <TextField
                variant="standard"
                id="input-name"
                type="text"
                value={editedUserData.name}
                onChange={handleNameChange}
                disabled={!editProfileSection}
              />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <div className={`${styles.inputSection}`}>
              <label htmlFor={"input-email"}>Email:</label>
              <TextField
                variant="standard"
                id="input-email"
                type="text"
                width={`50%`}
                value={editedUserData.email}
                onChange={handleEmailChange}
                disabled={!editProfileSection}
              />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <div className={`${styles.inputSection}`}>
              <label htmlFor="input-select">Role:</label>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  id="input-select"
                  value={editedUserData.role}
                  onChange={handleRoleChange}
                  fullWidth
                  disabled={!editProfileSection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"user"}>user</MenuItem>
                  <MenuItem value={"admin"}>admin</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div
            className={`${styles.btnSection}`}
            style={
              !editProfileSection ? { display: "none" } : { display: "flex" }
            }
          >
            <Button variant="contained" onClick={OnSaveUserProfile}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => OnCloseEdit("userProfile")}
            >
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Security Section */}

      <div className={`${styles.mainSectionDiv}`}>
        <h2>Security Section</h2>
        <EditIcon onClick={handlePasswordEdit} />
      </div>
      <div className={`${styles.section}`}>
        <div className={`${styles.subSection}`}>
          <p>You can Change Your Password By Editing this Password...</p>
          <div className={`${styles.inputSection}`}>
            <div>
              <label htmlFor={"input-password"}>NewPassword:</label>
              <FormControl variant="standard">
                <TextField
                  id="input-password"
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handlePasswordChnage}
                  disabled={!securitySectionEdit}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div
            className={`${styles.btnSection}`}
            style={
              !securitySectionEdit ? { display: "none" } : { display: "flex" }
            }
          >
            <Button variant="contained" onClick={OnSavePassword}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => OnCloseEdit("security")}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
