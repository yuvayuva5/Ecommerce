import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';
import axios from 'axios';

export const addCartItem = (id, quantity, size) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity,
            size // Add the selected size to the payload
        }));
    } catch (error) {
        // Handle error appropriately
        console.error(error);
    }
};
