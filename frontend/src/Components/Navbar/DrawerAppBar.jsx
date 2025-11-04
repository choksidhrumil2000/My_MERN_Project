import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;
const navItems = ["Users", "Products"];

function DrawerAppBar(props) {
  const { window, children, tabClickFunction, onLogout, openUserProfile } =
    props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { userData, setUserData } = useContext(userContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const goToUserProfile = (editFlag) => {
    openUserProfile(editFlag);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
            lineHeight: "1",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "1.5rem",
              my: 0,
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => goToUserProfile(false)}
          >
            {userData.name}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "0.7rem",
              my: 0,
              color: "grey",
              fontWeight: "bold",
            }}
          >
            {userData.role}
          </Typography>
        </Box>
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => goToUserProfile(true)}
        />
      </Box>

      <Divider />
      <List>
        {navItems.map((item) => (
          <Box key={item}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left" }}
                onClick={() => tabClickFunction(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            My MERN Project
          </Typography>
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */}
          <Tooltip title="Logout" arrow>
            <LogoutIcon style={{ cursor: "pointer" }} onClick={onLogout} />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
