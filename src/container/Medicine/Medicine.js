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
import DeleteIcon from '@mui/icons-material/Delete';


function Medicine(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Enter Medicine Name"),
        price: yup.number().required('Enter Medicine Price').positive().integer(),
        quantity: yup.string().required("Enter Medicine Quantity"),
        expiry: yup.string().required("Enter Medicine Expiry")
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('medicine'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        console.log(data);

        if (localData === null) {
            localStorage.setItem("medicine", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("medicine", JSON.stringify(localData));
        }

        loadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            insertData(values);
        },
    });

    const handleDelete = (params) => {

        let localData = JSON.parse(localStorage.getItem('medicine'));
        let fData = localData.filter((d) => d.id !== params.id)
        localStorage.setItem("medicine",JSON.stringify(fData))
        loadData();
    }

    const columns = [
        { field: 'name', headerName: 'Medicine Name', width: 170 },
        { field: 'price', headerName: 'Medicine Price', width: 170 },
        { field: 'quantity', headerName: 'Medicine Quantity', width: 170 },
        { field: 'expiry', headerName: 'Medicine Expiry', width: 170 },
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

        let localData = JSON.parse(localStorage.getItem('medicine'))

        if (localData !== null) {
            setData(localData)
        }


    }

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikobj

    return (
        <div>
            <h2>Medicine</h2>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
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
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    name="name"
                                    label="Medicine Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p className='text-danger' >{errors.name}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="price"
                                    label="Medicine Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="quantity"
                                    label="Medicine quantity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="expiry"
                                    label="Medicine expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
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

export default Medicine;