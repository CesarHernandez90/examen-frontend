import { 
    TableContainer, 
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@material-ui/core'

import { useState } from "react";
import IProduct from '../models/product';
import AlertComponent from '../components/alert_component';

export default function TableProducts({products}:{products: IProduct[]}) {
    
    const [alert, setAlert] = useState(false);
    const [alertOption, setAlertOption] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const deleteProduct = async(id: string) => {
        const res = await fetch('http://localhost:5000/eliminarUnProducto/'+id, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        });
        const product = await res.json();

        if(product.error) {
            setAlertOption('error');
            setAlertMessage('Ocurrió un problema en el servidor. No se pudo procesar su petición');
        }
        else  {
            const index = await products.findIndex(a => a._id == product._id);
            products.splice(index, 1);

            setAlertOption('success');
            setAlertMessage('El producto se eliminó correctamente');
        }
        setAlert(true);
    };
    
    return (
        <div>
            <AlertComponent alert={alert} alertOption={alertOption} alertMessage={alertMessage}></AlertComponent>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Cantidad</TableCell>
                            <TableCell align="left">Nombre del producto</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map(product => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.ProductQuantity}</TableCell>
                                    <TableCell>{product.NameProduct}</TableCell>
                                    <TableCell>{product.Category}</TableCell>
                                    <TableCell>{product.Description}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary">Editar</Button>{' '}
                                        <Button variant="contained" color="secondary" onClick={() => deleteProduct(product._id)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};