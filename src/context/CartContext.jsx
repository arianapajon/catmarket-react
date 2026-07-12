import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const addToCart = (producto) => {
    setCart([...cart, producto]);
};

const removeFromCart = (id) => {
    setCart(cart.filter((producto) => producto.id !== id));
};

const clearCart = () => {
    setCart([]);
};

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}