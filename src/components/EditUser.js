import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';

const EditUser = ({ user, handleSave, handleCancel}) =>{
    const [editedUser, setEditedUser] = useState({...user});

    const handleChange = (event) =>{
        const {name, value} =event.target;
        setEditedUser((prevUser) =>({
            ...prevUser,
            [name]:value,
        }));
    };
    return(
        <Container maxWidth="sm">
            <h2>Edit User</h2>
            <TextField 
            fullWidth
            label="Name"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            />
            <TextField 
            fullWidth
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"/>
            <TextField 
            fullWidth
            label="Role"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            variant="outlined"
            margin="normal"/>
            <Button 
            variant='contained' 
            color='primary' 
            onClick={() => handleSave(editedUser)}>
                Save
            </Button>
            <Button 
            variant='contained' 
            color='secondary' 
            onClick={handleCancel}>
                Cancel
            </Button>
        </Container>
    );
};

export default EditUser;