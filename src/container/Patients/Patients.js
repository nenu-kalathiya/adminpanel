import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';note


function Patients(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Enter Patients Name"),
        gender: yup.mixed().oneOf(['male', 'female', 'other']).required("Enter Patients Gender"),
        age: yup.number().required('Enter Patients Age').positive().integer(),
        phone: yup.string().required("enter your number"),
        date: yup.string().required("Enter Patients appointment Date ")
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('patients'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        console.log(data);

        if (localData === null) {
            localStorage.setItem("patients", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("patients", JSON.stringify(localData));
        }

        loadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            gender: '',
            phone: '',
            age: '',
            date: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            insertData(values);
        },
    });

    const handleDelete = (params) => {

        let localData = JSON.parse(localStorage.getItem('patients'));
        let fData = localData.filter((d) => d.id !== params.id)
        localStorage.setItem("patients",JSON.stringify(fData))
        loadData();
    }

    const columns = [
        { field: 'name', headerName: 'Patients Name', width: 170 },
        { field: 'gender', headerName: 'Patients Gender', width: 170 },
        { field: 'phone', headerName: 'Patients phone Number', width: 170 },
        { field: 'age', headerName: 'Patients Age', width: 170 },
        { field: 'date', headerName: 'Patients Appointment Date', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleDelete(params)}>
                    <DeleteIcon  />
                </IconButton>
            )   
        },
    ];
    useEffect(() => {

        loadData();
    }, []);

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem('patients'))

        if (localData !== null) {
            setData(localData)
        }

    }
    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikobj
    return (
        <div>
            <h2>Patients</h2>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Patients Form
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Patients</DialogTitle>
                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    name="name"
                                    label="patients Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p className='text-danger' >{errors.name}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="gender"
                                    label="Patients gender"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.gender && touched.gender ? <p>{errors.gender}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="phone"
                                    label="patients Phone Num"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="age"
                                    label="Patients Age"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="date"
                                    label="Patients appinment date"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='submit'>Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Patients;