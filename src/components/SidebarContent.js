// components/SidebarContent.js
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as MaterialIcons from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarContent = ({ handleLogout }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const getIcon = (iconName) => {
    const formattedIconName = iconName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

    const IconComponent = MaterialIcons[formattedIconName];
    if (!IconComponent) {
      console.warn(`Icon "${formattedIconName}" not found.`);
      return null;
    }
    return <IconComponent />;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
        <ListItem
        button
        key={item.id}
        onClick={() => navigate(`/dashboard${item.route}`)}
      >
            <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <MaterialIcons.ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default SidebarContent;
