import { useState } from "react";
import DrawerAppBar from "../Navbar/DrawerAppBar";
import UsersPage from "../../Pages/UsersPage/UsersPage";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import { useEffect } from "react";
import ProductsPage from "../../Pages/ProductsPage/ProductsPage";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UserProfilePage from "../../Pages/UserProfilePage/UserProfilePage";
import { loginContext } from "../../Context/LoginContext";

const DashBoard = () => {
  const [currentTab, setCurrentTab] = useState("");
  const { userData, loading } = useContext(userContext);
  const { setIsLoggedIn } = useContext(loginContext);

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
  }, []);

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
