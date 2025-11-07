import { useState } from "react";
import DrawerAppBar from "../../Components/Navbar/DrawerAppBar";
import UsersPage from "../UsersPage/UsersPage";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import { useEffect } from "react";
import ProductsPage from "../ProductsPage/ProductsPage";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import { loginContext } from "../../Context/LoginContext";
import { useSnackbar } from "../../Context/SnackBarContext";

const DashBoard = () => {
  const [currentTab, setCurrentTab] = useState("");
  const { userData } = useContext(userContext);
  const { setIsLoggedIn } = useContext(loginContext);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role) {
      if (currentTab === "") {
        if (userData.role === "admin") setCurrentTab("Users");
        else setCurrentTab("Products");
        localStorage.setItem("currentTab", currentTab);
      }
    }
  }, [userData]);

  useEffect(() => {
    const activeTab = localStorage.getItem("currentTab");
    if (activeTab) {
      setCurrentTab(activeTab);
    }

    setTimeout(async () => {
      handleTokenExpire();
    }, giveTimeinMillisecondsforToken());
  }, []);

  const handleTokenExpire = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
    showMessage("Token Has Expired,Kindly Login Again!!");
    navigate("/");
  };

  const giveTimeinMillisecondsforToken = () => {
    const token_ExpiresIn = JSON.parse(
      sessionStorage.getItem("token_ExpiresIn")
    );
    if (!token_ExpiresIn) return 0;
    const time_str = token_ExpiresIn;
    console.log(time_str);
    let temp_str = "";
    for (let i = 0; i < time_str.length - 1; i++) {
      temp_str += time_str;
    }
    const timeDigits = parseInt(temp_str, 10);
    console.log(time_str[time_str.length - 1], timeDigits);
    switch (time_str[time_str.length - 1]) {
      case "s":
        return timeDigits * 1000;
      case "m":
        return timeDigits * 60 * 1000;
      case "h":
        return timeDigits * 60 * 60 * 1000;
      case "d":
        return timeDigits * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  const handleTabClickedinDrawer = (tab) => {
    setCurrentTab(tab);
  };

  const renderComponent = () => {
    switch (currentTab) {
      case "Users":
        return <UsersPage />;
      case "Products":
        return <ProductsPage />;
      case "UserProfile":
        return <UserProfilePage />;
      default:
        return null;
    }
  };

  const onLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const openUserProfile = () => {
    setCurrentTab("UserProfile");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <DrawerAppBar
        onLogout={onLogout}
        tabClickFunction={handleTabClickedinDrawer}
        openUserProfile={openUserProfile}
      >
        {renderComponent()}
      </DrawerAppBar>
    </div>
  );
};

export default DashBoard;
