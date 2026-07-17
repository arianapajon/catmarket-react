import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from "../../context/AuthContext";
import {
    FaShoppingCart,
    FaHome,
    FaBoxOpen,
    FaUsers,
    FaTools,
    FaSignOutAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Header({
    alHacerClicInicio,
    alHacerClicProductos,
    alHacerClicEquipo
}) {

    const {
        cart,
        removeFromCart,
        clearCart
    } = useContext(CartContext);

    const { user, cerrarSesion } = useContext(AuthContext);

    const [hovered, setHovered] = useState('');
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    return (
        <>

            <header
                style={{
                    background:
                        'linear-gradient(135deg, rgba(79,119,45,0.96), rgba(144,169,85,0.95))',
                    backdropFilter: 'blur(12px)',
                    padding: '1rem 3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    boxShadow:
                        '0 8px 25px rgba(0,0,0,0.12)',
                    borderBottom:
                        '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Poppins', sans-serif"
                }}
            >

                <div>

                    <h1
                        onClick={alHacerClicInicio}
                        style={{
                            margin: 0,
                            color: '#ffffff',
                            cursor: 'pointer',
                            fontSize: '2rem',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            textShadow:
                                '0 3px 10px rgba(0,0,0,0.18)'
                        }}
                    >
                        🐱 CatMarket
                    </h1>

                </div>

                <nav
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}
                >

                    <button
                        onClick={() => setMostrarCarrito(true)}
                        style={estiloBoton}
                    >
                        <FaShoppingCart />
                        {" "}
                        Carrito ({cart.length})
                    </button>

                    <button
                        onClick={alHacerClicInicio}
                        onMouseEnter={() => setHovered("inicio")}
                        onMouseLeave={() => setHovered("")}
                        style={{
                            ...estiloBoton,
                            ...(hovered === "inicio"
                                ? estiloHover
                                : {})
                        }}
                    >
                        <FaHome />
                        {" "}
                        Inicio
                    </button>

                    <button
                        onClick={alHacerClicProductos}
                        onMouseEnter={() => setHovered("productos")}
                        onMouseLeave={() => setHovered("")}
                        style={{
                            ...estiloBoton,
                            ...(hovered === "productos"
                                ? estiloHover
                                : {})
                        }}
                    >
                        <FaBoxOpen />
                        {" "}
                        Productos
                    </button>

                    <button
                        onClick={alHacerClicEquipo}
                        onMouseEnter={() => setHovered("equipo")}
                        onMouseLeave={() => setHovered("")}
                        style={{
                            ...estiloBoton,
                            ...(hovered === "equipo"
                                ? estiloHover
                                : {})
                        }}
                    >
                        <FaUsers />
                        {" "}
                        Equipo
                    </button>

                    {user && (
    <Link
        to="/admin"
        style={{
            ...estiloBoton,
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
        }}
    >
        <FaTools />
        {" "}
        Gestión
    </Link>
)}

                    {
                        user ? (
                            <>

                                <span
                                    style={{
                                        color: "#fff",
                                        fontWeight: "600"
                                    }}
                                >
                                    {user.email}
                                </span>

                                <button
                                    onClick={cerrarSesion}
                                    style={estiloBoton}
                                >
                                    <FaSignOutAlt />
                                    {" "}
                                    Cerrar sesión
                                </button>

                            </>
                        ) : (

                            <Link
                                to="/login"
                                style={{
                                    ...estiloBoton,
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                Iniciar sesión
                            </Link>

                        )
                    }

                </nav>

            </header>
                        <Modal
                show={mostrarCarrito}
                onHide={() => setMostrarCarrito(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        🛒 Mi carrito
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {cart.length === 0 ? (

                        <p style={{ margin: 0 }}>
                            Tu carrito está vacío.
                        </p>

                    ) : (

                        <>
                            {cart.map((producto) => (

                                <div
                                    key={producto.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "15px"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px"
                                        }}
                                    >

                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />

                                        <div>

                                            <strong>
                                                {producto.nombre}
                                            </strong>

                                            <p
                                                style={{
                                                    margin: 0,
                                                    color: "#4f772d",
                                                    fontWeight: "600"
                                                }}
                                            >
                                                ${producto.precio}
                                            </p>

                                        </div>

                                    </div>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() =>
                                            removeFromCart(producto.id)
                                        }
                                    >
                                        Eliminar
                                    </Button>

                                </div>

                            ))}

                            <hr />

                            <h5>
                                Total: $
                                {cart.reduce(
                                    (total, producto) =>
                                        total + producto.precio,
                                    0
                                )}
                            </h5>

                        </>

                    )}

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setMostrarCarrito(false)}
                    >
                        Cerrar
                    </Button>

                    {cart.length > 0 && (

                        <Button
                            variant="warning"
                            onClick={clearCart}
                        >
                            Vaciar carrito
                        </Button>

                    )}

                </Modal.Footer>

            </Modal>

        </>
    );

}

const estiloBoton = {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff',
    padding: '0.75rem 1.4rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
};

const estiloHover = {
    transform: 'translateY(-2px)',
    background:
        'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.12))',
    boxShadow:
        '0 8px 18px rgba(0,0,0,0.18)',
    border: '1px solid rgba(255,255,255,0.28)'
};