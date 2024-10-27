import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
// M2 icon
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
// M2 icon
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { FC } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

import { tokens } from "../../utils/theme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export default function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Kanban Board");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                paddingLeft="11%"
                mr="45px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
                  EZJobs
                </Typography>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && <Box mb="25px"></Box>}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} paddingRight="0%">
            <Item
              title="Kanban Board"
              to="/app/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Contacts"
              to="/app/contacts"
              icon={<ContactPageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h5" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Job Stats
            </Typography>

            <Item
              title="Heat Map"
              to="/app/stats-heatmap"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Bar Chart"
              to="/app/stats-bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Donut Chart"
              to="/app/stats-donut"
              icon={<DataUsageIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Sankey Chart"
              to="/app/stats-sankey"
              icon={<SsidChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h5" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              AI tools
            </Typography>
            <Item
              title="Generate Resume"
              to="/app/ai-resume"
              icon={<PictureAsPdfOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Interview Prep"
              to="/app/ai-interview"
              icon={<SmartToyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* M2 Test sidebar, delete later */}
            <Typography variant="h5" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              M2 Test
            </Typography>

            <Item
              title="Test Jobs Data"
              to="/app/test"
              icon={<LooksTwoOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Test Search by Company"
              to="/app/search-company"
              icon={<LooksTwoOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Test Search by Type"
              to="/app/search-type"
              icon={<LooksTwoOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}
