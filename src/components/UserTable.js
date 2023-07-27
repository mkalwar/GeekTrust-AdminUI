import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Checkbox, IconButton } from '@mui/material';
 
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FiEdit } from "react-icons/fi";



const UserTable = ({ usersData, currentPageData, selectedRows, handleRowSelect, handleEdit, handleDelete, setSelectedRows }) =>{

    return(
        <TableContainer component={Paper} style={{ maxHeight: "calc(100vh - 100px)", overflow: "auto"}}>
            <Table style={{ tableLayout: "fixed" }} className="tableRow">
                <TableHead style={{ fontWeight: 'bold', backgroundColor: '#f1f1f1'}}>
                    <TableRow >
                        <TableCell>
                            <Checkbox style={{ padding: "2px", fontSize: "12px" }}
                             checked={selectedRows.length === currentPageData.length} 
                            onChange ={()=>
                            setSelectedRows(
                                selectedRows.length === currentPageData.length ? []: currentPageData.map((user) => user.id)
                            )}/>
                        </TableCell>
                        <TableCell style={{ padding: "2px", fontWeight: 'bold', fontSize: "14px" }}>
                            Name
                        </TableCell>
                        <TableCell style={{ padding: "2px", fontWeight: 'bold', fontSize: "14px" }}>
                            Email
                        </TableCell>
                        <TableCell style={{ padding: "2px", fontWeight: 'bold', fontSize: "14px" }}>
                            Role
                        </TableCell>
                        <TableCell style={{ padding: "2px", fontWeight: 'bold', fontSize: "14px" }}>
                            Action
                        </TableCell>
                                              
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (currentPageData.map((user)=>(
                            <TableRow key={user.id}>
                                <TableCell >
                                    <Checkbox style={{ padding: "2px", fontSize: "12px" }}
                                    checked={selectedRows.includes(user.id)} 
                                    onChange={(event)=> handleRowSelect(event, user.id)}/>
                                </TableCell>
                                <TableCell style={{ padding: "2px", fontSize: "12px" }}>
                                    {user.name}
                                </TableCell>
                                <TableCell style={{ padding: "2px", fontSize: "12px" }}>
                                    {user.email}
                                </TableCell>
                                <TableCell style={{ padding: "2px", fontSize: "12px" }}>
                                    {user.role}
                                </TableCell>
                                <TableCell style={{ padding: "2px", fontSize: "12px" }}>
                                    <IconButton>
                                        <FiEdit style={{cursor: 'pointer', fontSize: "16px" }}
                                        onClick={()=>handleEdit(user.id)}/>
                                    </IconButton>
                                        
                                    <IconButton>
                                        <DeleteIcon style={{cursor: 'pointer', fontSize: "16px"}}
                                        onClick={()=>handleDelete(user.id)} color="error"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;