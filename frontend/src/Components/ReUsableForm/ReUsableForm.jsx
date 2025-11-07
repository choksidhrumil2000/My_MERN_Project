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

import { loginContext } from "../../Context/LoginContext";
import { userContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Context/SnackBarContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  AddUserInDataBase,
  loginToUser,
  RegisterUser,
  UpdateUserInDatabase,
} from "../../api/userApi";
import {
  addProductInDatabase,
  updateProductInDatabase,
} from "../../api/ProductApi";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
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

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const { showMessage } = useSnackbar();

  useEffect(() => {
    handleVariablesAccordingToForm();
  }, []);

  const handleVariablesAccordingToForm = () => {
    switch (form) {
      case "EditUser":
        setName(editData.name);
        setEmail(editData.email);
        setRole(editData.role);
        break;
      case "AddUser":
        setName("");
        setEmail("");
        setRole("");
        break;
      case "EditProduct":
        setName(editData.name);
        setCategory(editData.category);
        setPrice(editData.price);
        break;
      case "AddProduct":
        setName("");
        setCategory("");
        setPrice(0);
        break;
      default:
        return;
    }
  };

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

  const handleLogInActivity = async () => {
    setIsLoading(true);
    const userObj = {
      email,
      password,
    };
    try {
      const resObj = await loginToUser(userObj);
      sessionStorage.setItem(
        "token",
        JSON.stringify(resObj.data.final_result.token)
      );
      sessionStorage.setItem(
        "token_ExpiresIn",
        JSON.stringify(resObj.data.final_result.expiresIn)
      );
      setUserData(resObj.data.final_result.user);
      localStorage.setItem(
        "userData",
        JSON.stringify(resObj.data.final_result.user)
      );
      setIsLoggedIn(true);
      showMessage("Welcome to The Dashboard!!!", "success");
      navigate("/dashboard");
    } catch (err) {
      showMessage(err.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpActivity = async () => {
    setIsLoading(true);
    const userObj = {
      name,
      email,
      password,
      role: "user",
    };
    try {
      const resObj = await RegisterUser(userObj);
      console.log(resObj);
      sessionStorage.setItem(
        "token",
        JSON.stringify(resObj.data.final_result.token)
      );
      sessionStorage.setItem(
        "token_ExpiresIn",
        JSON.stringify(resObj.data.final_result.expiresIn)
      );
      setUserData(resObj.data.final_result.user);
      localStorage.setItem(
        "userData",
        JSON.stringify(resObj.data.final_result.user)
      );
      setIsLoggedIn(true);
      showMessage("Welcome to The Dashboard!!!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      showMessage(err.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUserActivity = async () => {
    setIsLoading(true);
    const userObj = {
      name,
      email,
      password,
      role,
    };
    try {
      const resObj = await AddUserInDataBase(userObj);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUserActivity = async () => {
    setIsLoading(true);
    const userObj = {
      name,
      email,
      role,
    };
    try {
      const resObj = await UpdateUserInDatabase(userObj, editData._id);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProductActivity = async () => {
    setIsLoading(true);
    const productObj = {
      name,
      category,
      price,
    };
    try {
      const resObj = await addProductInDatabase(productObj);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProductActivity = async () => {
    setIsLoading(true);
    const productObj = {
      name,
      category,
      price,
    };
    try {
      const resObj = await updateProductInDatabase(productObj, editData._id);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleformSubmitActivity = async () => {
    switch (form) {
      case "LogIn":
        await handleLogInActivity();
        break;
      case "SignUp":
        await handleSignUpActivity();
        break;
      case "AddUser":
        await handleAddUserActivity();
        break;
      case "EditUser":
        await handleEditUserActivity();
        break;
      case "AddProduct":
        await handleAddProductActivity();
        break;
      case "EditProduct":
        await handleEditProductActivity();
        break;
      default:
        showMessage("Invalid Form Type!!!", "error");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        // height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
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

      {/* Email field */}
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

      {/* Password field */}
      {(form === "LogIn" || form === "SignUp" || form === "AddUser") && (
        <FormControl
          className={styles.marginTop_16}
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

      {/* Role field */}
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
            <MenuItem value="user">user</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Category field */}
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
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="cloths">Cloths</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Price field */}
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

      {/* Forgot Password link */}
      {form === "LogIn" && (
        <Link
          to="/changepassword"
          style={{ textDecoration: "underline", marginTop: "10px" }}
        >
          Forgot Password?
        </Link>
      )}

      {/* Submit button */}
      <Button
        variant="contained"
        className={styles.marginTop_16}
        fullWidth
        onClick={handleformSubmitActivity}
      >
        {form}
      </Button>
    </div>
  );
};

export default ReUsableForm;
