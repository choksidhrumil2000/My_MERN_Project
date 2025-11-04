import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const UserProfilePage = ({ userData, setterOfUserData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChnage = () => {};

  return (
    <div>
      {/* <h1>{`Hello ${userData.name}`}</h1> */}
      <h1>{`Hello From User Profile`}</h1>
      {/* <div>
        <h2>Profile Section</h2>
      </div>
      <div>
        <h2>Security Section</h2>
        <div>
          <FormControl
            // className={`${styles.marginTop_16}`}
            // fullWidth
            variant="standard"
          >
            <TextField
              //   id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={userData.password || "abc"}
              onChange={handlePasswordChnage}
              endAdornment={
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
              }
              //   label="Password"
            />
          </FormControl>
        </div>
      </div> */}
    </div>
  );
};

export default UserProfilePage;
