import { 
    Button, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Select,
    MenuItem,
    DialogActions,
} from "@material-ui/core";

import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import useSWR, { mutate, trigger } from 'swr';
import AlertComponent from '../components/alert_component';
import IProduct from '../models/product';
import { API_CREAR, API_TODOS } from "../routes/api";

export default function DialogProduct({products}:{products:IProduct[]}) {

    const {data} = useSWR(API_TODOS);
    const {register, handleSubmit, errors, control} = useForm();

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const categorias = [
        { value: 'Bebidas', label: 'Bebidas'},
        { value: 'Limpieza', label: 'Limpieza'},
        { value: 'Botanas', label: 'Botanas'},
        { value: 'Cremería', label: 'Cremería'},
    ];

    const [alert, setAlert] = useState(false);
    const [alertOption, setAlertOption] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const onSubmit = async (form) => {
        
        const res = await fetch(
            process.env.NEXT_PUBLIC_API_URL
            +'/crearUnProducto', 
        {
            method: 'post',
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        });
        const product = await res.json();

        if(product.error) {
            setAlertOption('error');
            setAlertMessage('Ocurrió un problema en el servidor. No se pudo procesar su petición');
        }
        else  {
            mutate(API_TODOS, [...data, product], false);
            setAlertOption('success');
            setAlertMessage('Producto agregado con éxito');
            setOpenDialog(false);
        }
        setAlert(true);
    }

    return (
        <div>
            <AlertComponent alert={alert} alertOption={alertOption} alertMessage={alertMessage}></AlertComponent>
            <Button onClick={handleOpenDialog} color="primary" variant="outlined">Agregar un producto</Button>
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">Nuevo producto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Llene los campos para registar un nuevo producto.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="NameProduct"
                            label="Nombre del producto"
                            type="text"
                            fullWidth
                            name="NameProduct"
                            helperText="El nombre es requerido"
                            error={errors.NameProduct ? true : false}
                            inputRef={register({required: true})}
                        />
                        <Controller
                            as= {
                                <Select>
                                    {categorias.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>   
                            }
                            name="Category"
                            fullWidth
                            control={control}
                            defaultValue="Bebidas"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="ProductQuantity"
                            label="Cantidad"
                            type="number"
                            fullWidth
                            name="ProductQuantity"
                            helperText="Debe ser entre 0 y 100"
                            error={errors.ProductQuantity ? true : false}
                            inputRef={register({required: true, min: 0, max: 100})}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Description"
                            label="Descripción"
                            type="text"
                            multiline
                            rows={4}
                            rowsMax={15}
                            fullWidth
                            name="Description"
                            helperText="Máximo 450 caracteres"
                            error={errors.Description ? true : false}
                            inputRef={register({required: true, maxLength: 450})}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                        Guardar
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div> 
    );
}