import { 
    Typography, Button
} from '@material-ui/core'

import LayoutComponent from '../components/layout_component'
import TableProducts from '../components/table_products';
import DialogProduct from '../components/dialog_product'
import IProduct from '../models/product'
import useSWR, { mutate, trigger } from 'swr';
import { API_TODOS } from "../routes/api";

export default function Store(props) {

    const { products, isLoading, isError }: 
        {products:IProduct[], isLoading:boolean, isError:any} 
        = useProducts();

    return (
        <LayoutComponent>
            <Typography variant="h5">Lista de productos</Typography>
            <DialogProduct products={products} />
            <TableProducts products={products} isLoading={isLoading}/>
        </LayoutComponent>
    );
}

function useProducts() {
    const { data, error } = useSWR(API_TODOS);
    return {
        products: data,
        isLoading: !error && !data,
        isError: error,
    }
}