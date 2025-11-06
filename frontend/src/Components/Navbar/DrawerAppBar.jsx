import * as React from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;
const navItems = [
  { tab: "Users", role: ["admin"] },
  { tab: "Products", role: ["user", "admin"] },
];

function DrawerAppBar(props) {
  const { window, children, tabClickFunction, onLogout, openUserProfile } =
    props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { userData } = useContext(userContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const goToUserProfile = () => {
    openUserProfile();
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
            onClick={() => goToUserProfile()}
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
      </Box>

      <Divider />
      <List>
        {navItems.map((item) => {
          if (item.role.includes(userData.role)) {
            return (
              <Box key={item.tab}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "left" }}
                    onClick={() => tabClickFunction(item.tab)}
                  >
                    <ListItemText primary={item.tab} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            );
          }else{
            return null;
          }
        })}
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
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
