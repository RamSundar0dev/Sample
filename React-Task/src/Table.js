import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from "@material-ui/core/Button";
import AddToPhotosRoundedIcon from '@material-ui/icons/AddToPhotosRounded';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import "./css/Table.css";
import TableForm from "./TableForm";
import tableitems from "./Tableitems.js";


export default function ReactBootstrapTable() {
  const [state] = useState({
    row: null,
    state: null,
    oldValue: null
  });

  const [items, setitems] = useState(tableitems);
  const [updateitems, setUpdateitems] = useState({});
  const [open, setOpen] = useState(false);

  const columns = [    
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { backgroundColor: '#215E95', color: 'white'},
      filter: textFilter({
        placeholder: "Search"
      })
    },
    {
      dataField: "fname",
      text: "Firstname",
      sort: true,
      filter: textFilter({
        placeholder: "Search"
      }),
      headerStyle: { backgroundColor: '#215E95', color: 'white'}
    },
    {
      dataField: "lname",
      text: "Lastname",
      sort: true,
      headerStyle: { backgroundColor: '#215E95', color: 'white'},
      filter: textFilter({
        placeholder: "Search"
      })
    },
    
    {
      dataField: "actions",
      text: "Actions",
      editable: false,
      isDummyField: true,
      headerStyle: { backgroundColor: '#215E95', color: 'white'},
      formatExtraData: state,
      formatter: ( cellcontent,row) => {        
          return (
            <div>
              <IconButton aria-label="Edit"  className="btn btn-danger btn-xs"
                onClick={() => handleStartEdit(row.id)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete"  className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
      }
    }
  ];
  const defaultSorted = [
    {
      dataField: "name",
      order: "ascd"
    }
  ];
 
  const handleStartEdit = row => {
    setUpdateitems(items.find(x => x.id === row));
    setOpen(true);   
  };

  const handleDelete = row => {
    setitems(items=>items.filter(el => el.id !== row));
  };

  const handleNewRow = () => {
    setUpdateitems({});
    setOpen(true);
  };

  const handleCancelAdd = () => {
    setOpen(false);
  };

  const handleSaveAdd = inputData => {
    if(inputData.id === ""){
      inputData.id =  Math.floor((Math.random() * 100) + 1);
      setitems(prev => {
        let newVal = [ ...prev, inputData];
        return newVal;
      });
    }
    else{
      items.map((item, i) => {
        console.log(item);
        if(item.id === inputData.id){
          items[i] = inputData;
        }
      });
      //console.log(items);
    }
    setOpen(false); 
  };

  return (
    
    <>
    <div className="body">
      <div className="button">        
        <Button className="btn btn-warning" onClick={handleNewRow}>
          <AddToPhotosRoundedIcon /> Add new Employee
        </Button>
        </div>
        </div>
      <div className="table">
      <BootstrapTable
        striped
        keyField="id"
        data={items}
        columns={columns}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        filterPosition="bottom"
        pagination={paginationFactory({sizePerPage:"5"})}        
      />
   </div>
      <TableForm        
        open={open}
        updateitems = {updateitems}
        onCancel={handleCancelAdd}
        onSave={handleSaveAdd}
      />
    </>
   
  );
}
