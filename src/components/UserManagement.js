import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "./AppBar";
import { useSnackbar } from "notistack";

const UserManagement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [usersData, setUsersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText.length) handleSearch(searchText);
    else setFilteredData(usersData);
  }, [searchText, usersData]);

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
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  //Function to handle search
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
      enqueueSnackbar("No result Found", {
        variant: "warning",
        autoHideDuration: 1000,
      });
    }
    setFilteredData(filteredUser);
    setCurrentPage(1);
  };

  //Function to handle Pagination
  const handlePagination = (newPage) => {
    setSelectedRows([]);
    setCurrentPage(newPage);
  };

  //Function to handle Row Selection
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

  //Handle Save Edit
  const handleSaveEdit = (editedUser) => {
    const updatedUsers = usersData.map((user) => {
      if (user.id === editedUser.id) {
        return { ...editedUser };
      }
      return user;
    });
    setUsersData(updatedUsers);
  };

  //handle Delete
  const handleDelete = (userId) => {
    const updatedData = usersData.filter((user) => user.id !== userId);
    setUsersData(updatedData);
    setSearchText("");
  };

  //Handle Delete Selected rows
  const handleDeleteSelected = () => {
    const updatedData = usersData.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsersData(updatedData);
    setSelectedRows([]);
  };

  //Index of first and Last item on current page
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;
  //current Page Data
  const currentPageData = filteredData.slice(startIndex, endIndex);
  //Total no of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div
      style={{
        height: "auto",
        padding: "1rem",
      }}
    >
      <AppBar />

      <Container>
        <div>
          <SearchBar value={searchText} changeValue={setSearchText} />
          <UserTable
            currentPageData={currentPageData}
            selectedRows={selectedRows}
            handleRowSelect={handleRowSelect}
            handleSaveEdit={handleSaveEdit}
            handleDelete={handleDelete}
            setSelectedRows={setSelectedRows}
          />
          <Box
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            bgcolor="white"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
          >
            {currentPageData.length !== 0 && (
              <>
                <span>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteSelected}
                    disabled={selectedRows.length === 0}
                  >
                    Delete Selected
                  </Button>
                </span>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePagination={handlePagination}
                />
              </>
            )}
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default UserManagement;
