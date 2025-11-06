import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./ReUsableForm.module.css";
import Button from "@mui/material/Button";

import axios from "axios";
import { loginContext } from "../../Context/LoginContext";
import { userContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Context/SnackBarContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const ReUsableForm = ({
  form,
  editData,
  closeModal,
  tableData,
  setTableDataFunctions,
  refreshtable,
}) => {
  const { setIsLoggedIn } = useContext(loginContext);
  const { setUserData } = useContext(userContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const { showMessage } = useSnackbar();

  useEffect(() => {
    if (form === "EditUser") {
      setName(editData.name);
      setEmail(editData.email);
      setRole(editData.role);
    } else if (form === "AddUser") {
      setName("");
      setEmail("");
      setRole("");
    } else if (form === "EditProduct") {
      setName(editData.name);
      setCategory(editData.category);
      setPrice(editData.price);
    } else if (form === "AddUser") {
      setName("");
      setCategory("");
      setPrice(0);
    }
  }, []);

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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleformSubmitActivity = async () => {
    let resObj;
    let userObj;
    let productObj;
    if (form === "LogIn") {
      userObj = {
        email,
        password,
      };
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
        return;
      }
    } else if (form === "SignUp") {
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
        return;
      }
    } else if (form === "AddUser") {
      userObj = {
        name,
        email,
        password,
        role,
      };
      try {
        resObj = await axios.post(
          process.env.REACT_APP_API_URL + "/user/",
          userObj,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
          }
        );
        showMessage(resObj.data.message, "success");
        closeModal();
        refreshtable(
          tableData.currentPage,
          tableData.limit,
          tableData.filter,
          tableData.sort,
          tableData.searchText
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }
      return;
    } else if (form === "EditUser") {
      userObj = {
        name,
        email,
        role,
      };
      try {
        resObj = await axios.put(
          process.env.REACT_APP_API_URL + `/user/profile/${editData._id}`,
          userObj,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
          }
        );
        showMessage(resObj.data.message, "success");
        closeModal();
        refreshtable(
          tableData.currentPage,
          tableData.limit,
          tableData.filter,
          tableData.sort,
          tableData.searchText
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }

      return;
    } else if (form === "AddProduct") {
      productObj = {
        name,
        category,
        price,
      };
      try {
        resObj = await axios.post(
          process.env.REACT_APP_API_URL + "/product/",
          productObj,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
          }
        );
        showMessage(resObj.data.message, "success");
        closeModal();
        refreshtable(
          tableData.currentPage,
          tableData.limit,
          tableData.filter,
          tableData.sort,
          tableData.searchText
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }
      return;
    } else if (form === "EditProduct") {
      productObj = {
        name,
        category,
        price,
      };
      try {
        resObj = await axios.put(
          process.env.REACT_APP_API_URL + `/product/${editData._id}`,
          productObj,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
          }
        );
        showMessage(resObj.data.message, "success");
        closeModal();
        refreshtable(
          tableData.currentPage,
          tableData.limit,
          tableData.filter,
          tableData.sort,
          tableData.searchText
        );
      } catch (err) {
        showMessage(err.response.data.message, "error");
        return;
      }

      return;
    }
    sessionStorage.setItem(
      "token",
      JSON.stringify(resObj.data.final_result.token)
    );
    setUserData(resObj.data.final_result.user);
    localStorage.setItem(
      "userData",
      JSON.stringify(resObj.data.final_result.user)
    );
    setIsLoggedIn(true);
    showMessage("Welcome to The Dashboard!!!", "success");
    navigate("/dashboard");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div>
      {form !== "LogIn" && (
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
      )}
      {/* email................. */}
      {form !== "AddProduct" && form !== "EditProduct" && (
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`${!(form === "LogIn") ? styles.marginTop_16 : ""}`}
          fullWidth
        />
      )}

      {/* pasword.......................... */}

      {(form === "LogIn" || form === "SignUp") && (
        <FormControl
          className={`${styles.marginTop_16}`}
          fullWidth
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChnage}
            disabled={form === "EditUser"}
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
      )}

      {/* Role...................................... */}
      {(form === "AddUser" || form === "EditUser") && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="input-select">Role</InputLabel>
          <Select
            id="input-select"
            value={role}
            onChange={handleRoleChange}
            fullWidth
            label="Role"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={"user"}>user</MenuItem>
            <MenuItem value={"admin"}>admin</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Category of Product...................................... */}
      {(form === "AddProduct" || form === "EditProduct") && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="input-select">Category</InputLabel>
          <Select
            id="input-select"
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            label="Category"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={"electronics"}>Electronics</MenuItem>
            <MenuItem value={"cloths"}>Cloths</MenuItem>
          </Select>
        </FormControl>
      )}
      {/* Price Of Product.......................... */}
      {(form === "AddProduct" || form === "EditProduct") && (
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          fullWidth
          inputProps={{ min: 0, step: 1 }}
          sx={{ my: 1 }}
        />
      )}

      {form === "LogIn" && (
        <Link
          to="/changepassword"
          style={{ textDecoration: "underline", marginTop: "10px" }}
        >
          Forgot Password?
        </Link>
      )}
      {/* Login/Signup/AddUser/EditUser,etc.... Button...................... */}
      <Button
        variant="contained"
        className={`${styles.marginTop_16}`}
        fullWidth
        onClick={handleformSubmitActivity}
      >
        {form}
      </Button>
    </div>
  );
};

export default ReUsableForm;
