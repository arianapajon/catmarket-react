import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from "../../context/AuthContext";
import {
    FaShoppingCart,
    FaHome,
    FaBoxOpen,
    FaUsers,
    FaTools,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";

export default function Header() {

    const {
        cart,
        removeFromCart,
        clearCart,
        notificacion,
        cerrarNotificacion
    } = useContext(CartContext);

    const { user, cerrarSesion } = useContext(AuthContext);

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <>
            <header className="site-header">

                <div className="header-topbar">
                    Envío gratis en compras superiores a $20.000 🐾
                </div>

                <div className="header-main">

                    <Link
                        to="/"
                        className="logo"
                        onClick={cerrarMenu}
                    >
                        CatMarket
                    </Link>

                    <button
                        className="nav-toggle"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        aria-label="Abrir menú"
                    >
                        {menuAbierto ? <FaTimes /> : <FaBars />}
                    </button>

                    <ul className={`nav-list ${menuAbierto ? "is-open" : ""}`}>

                        <li>
                            <Link
                                to="/"
                                className="nav-link"
                                onClick={cerrarMenu}
                            >
                                <FaHome /> Inicio
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/productos"
                                className="nav-link"
                                onClick={cerrarMenu}
                            >
                                <FaBoxOpen /> Productos
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/conocenos"
                                className="nav-link"
                                onClick={cerrarMenu}
                            >
                                <FaUsers /> Conocenos
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contacto"
                                className="nav-link"
                                onClick={cerrarMenu}
                            >
                                Contacto
                            </Link>
                        </li>

                        {user && (
                            <li>
                                <Link
                                    to="/admin"
                                    className="nav-link"
                                    onClick={cerrarMenu}
                                >
                                    <FaTools /> Gestión
                                </Link>
                            </li>
                        )}

                        {user ? (
                            <li>
                                <button
                                    className="nav-link"
                                    onClick={() => {
                                        cerrarSesion();
                                        cerrarMenu();
                                    }}
                                >
                                    <FaSignOutAlt /> Cerrar sesión
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="nav-link"
                                    onClick={cerrarMenu}
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                        )}

                        <li>
                            <button
                                className="nav-link nav-cart"
                                onClick={() => {
                                    setMostrarCarrito(true);
                                    cerrarMenu();
                                }}
                            >
                                <FaShoppingCart /> Carrito ({cart.length})
                            </button>
                        </li>

                    </ul>

                </div>

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
                                                    color: "#c46d78",
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

            <ToastContainer position="top-end" className="cart-toast-container">
                <Toast
                    show={Boolean(notificacion)}
                    onClose={cerrarNotificacion}
                    delay={2800}
                    autohide
                    bg="light"
                >
                    <Toast.Header>
                        <FaShoppingCart className="me-2" />
                        <strong className="me-auto">Carrito actualizado</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span className="cart-toast-check">✓</span> {notificacion?.mensaje}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

        </>
    );

}