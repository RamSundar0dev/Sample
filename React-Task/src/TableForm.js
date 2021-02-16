import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import {TextField,Select, MenuItem} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Yup from "yup";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));


export default function TableForm(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.onCancel();
  };

  return (    
    <div>      
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
         <Formik
          enableReinitialize
          initialValues={{
            id: props.updateitems.id || "",       
            title: props.updateitems.title || "",
            fname: props.updateitems.fname || "",
            lname: props.updateitems.lname || "",            
          }}
          validationSchema={Yup.object().shape({
            fname: Yup.string()
            .required("Firstname required")
            ,
            lname: Yup.string()
            .required("Lastname required")
            ,        
            title: Yup.string().required(
              "Title is required"
            ),
        })}
      onSubmit={(
        values,
      ) => {
        
        props.onSave(values);
        handleClose();
      }}
      render={({
        errors,
        touched,
        handleSubmit,
        handleChange,
        values,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>           
            Title
            <Select
              name = "title"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.title}            
              autoFocus
              onChange={handleChange}              
              >
                <MenuItem value={"Director"}>Director</MenuItem>
                <MenuItem value={"Employee"}>Employee</MenuItem>
                <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
            </Select>
            {errors.title ? (
              <div
                style={{
                  fontSize: "80%",
                  color: "#FF5B5C",
                }}
              >
                {errors.title}
              </div>
            ) : null} 
            <TextField
              name = "fname"              
              id="transformer-fname-input"
              label="Firstname"
              value={values.fname}
              onChange={handleChange}
            />
            {errors.fname ? (
              <div
                style={{
                  fontSize: "80%",
                  color: "#FF5B5C",
                }}
              >
                {errors.fname}
              </div>
            ) : null}
              <TextField
              name = "lname"
              id="transformer-id-input"
              label="Lastname"
              value={values.lname}
              onChange={handleChange}              
            />
            {errors.lname ? (
              <div
                style={{
                  fontSize: "80%",
                  color: "#FF5B5C",
                }}
              >
                {errors.lname}
              </div>
            ) : null}       
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
          </Form>
        );
      }}      
    ></Formik>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
