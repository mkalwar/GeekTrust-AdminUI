import React from 'react';
import { Button, Fab } from '@mui/material';


const Pagination = ({ currentPage, totalPages, handlePagination }) =>{
    const paginationButtons = () =>{
        const buttons = [];
        if(currentPage > 1){
            buttons.push(
                <Fab sx={{ height:45, width:45 }} key="first" color="primary" onClick={() => handlePagination(1)}>
                    {'<<'}
                </Fab>
            );
            buttons.push(
                <Fab sx={{ height:45, width:45 }} key="previous" color="primary" onClick={() => handlePagination(currentPage - 1)}>
                    {'<'}
                </Fab>
            );

        }

        for( let page=1; page <=totalPages; page++){
            buttons.push(
                <Fab  sx={{ height:45, width:45 }} 
                key={page} 
                color="primary" 
                onClick={() => handlePagination(page)} 
                disabled={page === currentPage}>
                    {page}
                </Fab>
            );
        }

        if(currentPage < totalPages){
            buttons.push(
                <Fab sx={{ height:45, width:45 }} key="next" color="primary" onClick={() => handlePagination(currentPage + 1)}>
                    {'>'}
                </Fab>
            );
            buttons.push(
                <Fab sx={{ height:45, width:45 }} key="last" color="primary" onClick={() => handlePagination(totalPages)}>
                    {'>>'}
                </Fab>
            );
        }
        return buttons;

        };
    
    return(
        <span  style={{ display: "flex", gap: "0.5rem", margin: "0 auto" }}>
            {paginationButtons()}
        </span>
    );

};
export default Pagination;