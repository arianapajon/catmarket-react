import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [notificacion, setNotificacion] = useState(null);

    const addToCart = (producto) => {
        setCart((carritoActual) => [...carritoActual, producto]);
        setNotificacion({
            id: Date.now(),
            mensaje: `${producto.nombre} se agregó al carrito.`
        });
    };

    const cerrarNotificacion = () => {
        setNotificacion(null);
    };

    const removeFromCart = (id) => {
        setCart((carritoActual) => carritoActual.filter((producto) => producto.id !== id));
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
                clearCart,
                notificacion,
                cerrarNotificacion
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
