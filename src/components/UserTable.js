import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Box,
  ButtonGroup,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { FiEdit } from "react-icons/fi";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const UserTable = ({
  currentPageData,
  selectedRows,
  handleRowSelect,
  handleSaveEdit,
  handleDelete,
  setSelectedRows,
}) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const isEditing = (userId) => userId === editingUserId;

  const handleSave = () => {
    handleSaveEdit(editedUserData);
    setEditingUserId(null);
    setEditedUserData({});
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUserData({});
  };

  const handleEditFieldChange = (field, value) => {
    setEditedUserData((prevEditedUserData) => ({
      ...prevEditedUserData,
      [field]: value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={
                  selectedRows.length === currentPageData.length &&
                  currentPageData.length !== 0
                }
                onChange={() =>
                  setSelectedRows(
                    selectedRows.length === currentPageData.length
                      ? []
                      : currentPageData.map((user) => user.id)
                  )
                }
              />
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Role</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onChange={(event) => handleRowSelect(event, user.id)}
                />
              </TableCell>
              <TableCell>
                {isEditing(user.id) ? (
                  <TextField
                    value={editedUserData.name || user.name}
                    onChange={(e) =>
                      handleEditFieldChange("name", e.target.value)
                    }
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>
                {isEditing(user.id) ? (
                  <TextField
                    value={editedUserData.email || user.email}
                    onChange={(e) =>
                      handleEditFieldChange("email", e.target.value)
                    }
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {isEditing(user.id) ? (
                  <Select
                    size="small"
                    value={editedUserData.role || user.role}
                    name="role"
                    onChange={(e) =>
                      handleEditFieldChange("role", e.target.value)
                    }
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"member"}>Member</MenuItem>
                  </Select>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {isEditing(user.id) ? (
                  <Box
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <ButtonGroup>
                      <Button
                        size="small"
                        variant="text"
                        color="success"
                        onClick={handleSave}
                        startIcon={<DoneIcon />}
                      />
                      {/* Save */}
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        size="small"
                        variant="text"
                        color="error"
                        onClick={handleCancel}
                        startIcon={<CloseIcon />}
                      />
                      {/* Cancel */}
                    </ButtonGroup>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <ButtonGroup>
                      <Button
                        className="edit-delete"
                        startIcon={<FiEdit />}
                        variant="text"
                        onClick={() => {
                          setEditingUserId(user.id);
                          setEditedUserData(user);
                        }}
                      />
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        className="edit-delete"
                        startIcon={<DeleteIcon />}
                        variant="text"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      />
                    </ButtonGroup>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
