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
import { MdOutlineDelete, MdDone, MdOutlineClose } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import "./UserTable.css";

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
      <Table size="small" className="user-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={
                  selectedRows.length === currentPageData.length &&
                  selectedRows.length > 0
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
            <TableCell className="table-header-cell">
              <b>Name</b>
            </TableCell>
            <TableCell className="table-header-cell">
              <b>Email</b>
            </TableCell>
            <TableCell className="table-header-cell">
              <b>Role</b>
            </TableCell>
            <TableCell className="table-header-cell">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData.map((user) => (
            <TableRow
              key={user.id}
              className={`table-row ${
                selectedRows.includes(user.id) ? "selected-row" : ""
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onChange={(event) => handleRowSelect(event, user.id)}
                />
              </TableCell>
              <TableCell className="table-cell">
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
              <TableCell className="table-cell">
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
              <TableCell className="table-cell">
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
              <TableCell className="table-cell">
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
                        startIcon={<MdDone />}
                      />
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        size="small"
                        variant="text"
                        color="error"
                        onClick={handleCancel}
                        startIcon={<MdOutlineClose />}
                      />
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
                        startIcon={<MdOutlineDelete />}
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
