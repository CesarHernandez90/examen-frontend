import { 
    Typography, Button
} from '@material-ui/core'

import { useState } from "react";
import LayoutComponent from '../components/layout_component'
import TableProducts from '../components/table_products';
import DialogProduct from '../components/dialog_product'
import IProduct from '../models/product'

//export default function Store({products}:{products:IProduct[]}) {
export default function Store(props) {

    const [products, setProducts] = useState(props.products);

    const agua = {
        ProductQuantity: 10,
        NameProduct: 'Agua natural',
        Category: 'Bebidas',
        Description: 'Agua normal',
    };

    const actualizar = () => {
        console.log('llego aquí');
        setProducts(getStaticProps);
    };

    return (
        <LayoutComponent>
            <Typography variant="h5">Lista de productos</Typography>
            <DialogProduct />
            <TableProducts products={products} />
        </LayoutComponent>
    );
}

export async function getStaticProps(context) {
    const res = await fetch('http://localhost:5000/listarTodosLosProductos');
    const products = await res.json();
    return {
        props: {products}
    }
}