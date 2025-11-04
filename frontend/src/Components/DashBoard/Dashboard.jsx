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

const DashBoard = () => {
  const [currentTab, setCurrentTab] = useState("");
  const { userData, setUserData, loading } = useContext(userContext);
  const [editFlag, setEditFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role) {
      if (userData.role === "admin") setCurrentTab("Users");
      else setCurrentTab("Products");
    }
  }, [userData]);

  const handleTabClickedinDrawer = (tab) => {
    setCurrentTab(tab);
  };

  const renderComponent = () => {
    console.log(currentTab);
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
    navigate("/");
  };

  const openUserProfile = (editFlag) => {
    setCurrentTab("UserProfile");
    setEditFlag(editFlag);
  };

  if (loading) {
    console.log("loading");
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
        <p>Page will Load Here</p>
        {/* {currentTab === 'Users' && <UsersPage />}
        {currentTab === 'Products' && <ProductsPage /> }
        <div style={{height:'100vh',width:'100vw',background:'black'}}>hello</div> */}
        {renderComponent()}
      </DrawerAppBar>
    </div>
  );
};

export default DashBoard;
