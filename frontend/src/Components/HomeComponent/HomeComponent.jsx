import { useContext, useState } from "react";
import { loginContext } from "../../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './HomeComponent.module.css';
import LoginOrSignUpFormComponent from "../LogInOrSignUpFormComponent/LogInOrSignUpFormComponent";


const HomeComponent = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);

  const [tabValue, setTabValue] = useState("1");

  if (isLoggedIn) navigate("/dashboard");

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };
  return (
    <div className={`d_flex ${styles.mainDiv}`}>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "12px",
          padding: "10px",
          width:'500px'
        }}
      >
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              centered
            >
              <Tab label="Login" value="1" />
              <Tab label="Signup" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><LoginOrSignUpFormComponent form="LogIn" /></TabPanel>
          <TabPanel value="2"><LoginOrSignUpFormComponent form="SignUp"/></TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default HomeComponent;
