import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Container  from '@mui/material/Container';
import UserTable from './UserTable';
import  Pagination from './Pagination';
import SearchBar from './SearchBar';
import Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditUser from './EditUser';
import AppBar from './AppBar';


const UserManagement = () =>{
    const [usersData, setUsersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editMode, setEditMode] =useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const itemsPerPage =10;

    useEffect(() => {
        document.title = "AdminUI";
      }, []);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        try{
            const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            console.log(res.data);
            setUsersData(res.data);
            setFilteredData(res.data);
        }
        catch(error){
            console.error("Error in fetching:", error);
        }
    };

    //Function to handle search
    const handleSearch = (event)=>{
        const searchTerm = event.target.value.trim().toLowerCase();
        const filteredUser = usersData.filter((user) =>
        {
            return(
                user.name.toLowerCase().includes(searchTerm) ||
                user.name.toLowerCase().includes(searchTerm) ||
                user.name.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredData(filteredUser);
        setCurrentPage(1);
    };

    //Function to handle Pagination
    const handlePagination = (newPage)=>{
        setCurrentPage(newPage);
    };

    //Function to handle Row Selection
    const handleRowSelect =(event, userId) =>{
        const selectedIndex = selectedRows.indexOf(userId);
        let newSelectedRows = [];
        if(selectedIndex === -1){
            newSelectedRows = [...selectedRows, userId];
        }else{
            newSelectedRows = selectedRows.filter((id)=> id !== userId)
        }
        setSelectedRows(newSelectedRows);
    };

    //Function to handle Edit
    const handleEdit = (userId)=>{
        const userToEdit = usersData.find((user) => user.id === userId);
        setEditingUser(userToEdit);
        setEditMode(true);
        console.log(`editing user with id: ${userId}`);
    }
    
    //CancelEdit
    const handleCancelEdit = ()=>{
        setEditingUser(null);
        setEditMode(false);
    }

    //Handle Save Edit
    const handleSaveEdit =(editedUser)=>{
        const updatedUsers = usersData.map((user) =>{
            if(user.id ===editedUser.id){
                return {...editedUser}
            }
            return user;
        })
        setUsersData(updatedUsers);
        setFilteredData(updatedUsers);
        setEditingUser(null);
        setEditMode(false);
    }

    //handle Delete 
    const handleDelete = (userId)=>{
        const updatedData = usersData.filter((user) => user.id !== userId);
        setUsersData(updatedData);
        setFilteredData(updatedData);
        console.log(`Deleting user with ${userId}`);
    };

    //Handle Delete Selected rows
    const handleDeleteSelected =()=>{
        const updatedData = usersData.filter((user) => !selectedRows.includes(user.id));
        console.log("Deleting slected users:", selectedRows);
        setUsersData(updatedData);
        setFilteredData(updatedData);
        setSelectedRows([]);
    };


    //Index of first and Last item on current page
    const startIndex = (currentPage -1 ) *itemsPerPage;

    const endIndex = startIndex + itemsPerPage;
    //current Page Data
    const currentPageData = filteredData.slice(startIndex, endIndex);
    //Total no of pages
    const totalPages = Math.ceil(filteredData.length/itemsPerPage);

    return(
        <div style={{
            height: 'auto',
            padding: '1rem', // Add padding to the container
          }}>
            <AppBar/>
        
        <Container >
            
        {editMode ?
            ( <EditUser user={editingUser} handleSave={handleSaveEdit} handleCancel={handleCancelEdit}/>):
             ( 
            <div> 
                    
            <SearchBar handleSearch={handleSearch}/>
            <UserTable 
            usersData={usersData}
            currentPageData={currentPageData}
            selectedRows={selectedRows}
            handleRowSelect={handleRowSelect}
            handleEdit={handleEdit}
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
                <span>
            <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteSelected} 
            disabled={selectedRows.length ===0} 
            >
                Delete Selected
            </Button></span>
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePagination={handlePagination}/>
            </Box>
            </div>
              )} 
        </Container>
        </div>
    );
};

export default UserManagement;