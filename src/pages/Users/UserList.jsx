import React, { useState, useCallback } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableContainer,
  Paper,
  useTheme,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  TablePagination,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ConfirmationDialog from "./ConfirmationDialog";
import { useEffect } from "react";

import api from "../../utils/axios";

function UserList({ onEdit }) {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeaderColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";

  const getAllUsers = useCallback(async () => {
    try {
      const response = await api("/users");
      const { status, data } = await response.data;
      if (status === "success") {
        const users = data.users;
        console.log("Users data:",users);
        setUsers(users);
      } else {
        throw new Error("Error fetching users");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error fetching users", { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleEdit = (user) => {
    onEdit(user);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    try {
      // Perform delete operation (e.g., call API to delete user)
      const response = await api.delete(`users/${selectedUser._id}`, {
        // add any required headers or request data
      });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id)
      );

      enqueueSnackbar("User deleted successfully", { variant: "success" });
      setOpenDialog(false);
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "Failed to delete user", {
        variant: "error",
      });
    }
  };

  const handleClick = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: tableHeaderColor }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <Avatar
                          alt={user.name}
                          sx={{ width: 50, height: 50 }}
                        />
                        <Typography sx={{ ml: 1 }}>
                          {user.name || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.phone || "N/A"}</TableCell>
                    <TableCell>{typeof user.roleName === 'string' ? user.roleName : 'N/A'}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleClick(event, user)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleEdit(selectedUser)}>
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Edit" />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(selectedUser)}>
                          <ListItemIcon>
                            <DeleteIcon
                              fontSize="small"
                              sx={{ color: "error.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary="Delete" />
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={users?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </TableContainer>

      <ConfirmationDialog
        open={openDialog}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDialog}
      />
    </>
  );
}

export default React.memo(UserList);
