import React from "react";
import { Drawer } from "@mui/material";
import SidebarContent from "./SidebarContent";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, handleLogout }) => (
  <>
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <SidebarContent handleLogout={handleLogout} />
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      open
    >
      <SidebarContent handleLogout={handleLogout} />
    </Drawer>
  </>
);

export default Sidebar;
