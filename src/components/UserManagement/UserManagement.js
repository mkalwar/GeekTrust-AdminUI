import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../UserTable/UserTable";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "../AppBar/AppBar";
import { useSnackbar } from "notistack";
// import { Typography } from "@mui/material";
import "./UserManagement.css";

const UserManagement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [usersData, setUsersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText.length) handleSearch(searchText);
    else setFilteredData(usersData);
  }, [searchText, usersData]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsersData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      if (error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable, and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  const handleSearch = (searchText) => {
    const searchTerm = searchText.toLowerCase();
    const filteredUser = usersData.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    if (!filteredUser.length) {
      enqueueSnackbar("No results found", {
        variant: "warning",
        autoHideDuration: 1000,
      });
    }
    setFilteredData(filteredUser);
    setCurrentPage(1);
  };

  const handlePagination = (newPage) => {
    setSelectedRows([]);
    setCurrentPage(newPage);
  };

  const handleRowSelect = (event, userId) => {
    const selectedIndex = selectedRows.indexOf(userId);
    let newSelectedRows = [];
    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, userId];
    } else {
      newSelectedRows = selectedRows.filter((id) => id !== userId);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSaveEdit = (editedUser) => {
    const updatedUsers = usersData.map((user) => {
      if (user.id === editedUser.id) {
        return { ...editedUser };
      }
      return user;
    });
    setUsersData(updatedUsers);
    setSelectedRows([]);
  };

  const handleDelete = (userId) => {
    const updatedData = usersData.filter((user) => user.id !== userId);
    setUsersData(updatedData);
    setSearchText("");
  };

  const handleDeleteSelected = () => {
    const updatedData = usersData.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsersData(updatedData);
    setSelectedRows([]);

    const newTotalUsers = updatedData.length;
    setTotalPages(Math.ceil(newTotalUsers / itemsPerPage));

    if (currentPage > newTotalUsers / itemsPerPage) {
      setCurrentPage(Math.ceil(newTotalUsers / itemsPerPage));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="user-management">
      <AppBar />

      <div className="container">
        <SearchBar value={searchText} changeValue={setSearchText} />
        <UserTable
          currentPageData={currentPageData}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
          setSelectedRows={setSelectedRows}
        />
      </div>
      <Box
        bottom={0}
        left={0}
        width="100%"
        margin="auto auto"
        bgcolor="white"
        padding="1rem"
        className="action-bar"
      >
        <div>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            fullWidth
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
        </div>
        <div className="pagination-container">
          {/* <Typography variant="body1">{`${currentPage} of ${totalPages}`}</Typography> */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </div>
      </Box>
    </div>
  );
};

export default UserManagement;
