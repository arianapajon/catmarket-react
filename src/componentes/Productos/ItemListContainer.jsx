import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ItemListContainer({
    productos,
    cargando,
    error,
    eliminarProducto,
    abrirModalEliminar,
    setProductoEditar,
    esAdmin = false,
    mostrarCompra = true,
    titulo = "Productos Disponibles",
    subtitulo = "Descubrí accesorios únicos para gatos"
}) {
    const { addToCart } = useContext(CartContext);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [productoAgregado, setProductoAgregado] = useState(null);

    const comprarProducto = (producto) => {
        addToCart(producto);
        setProductoAgregado(producto.id);

        setTimeout(() => {
            setProductoAgregado((idActual) =>
                idActual === producto.id ? null : idActual
            );
        }, 1400);
    };

    if (cargando) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    if (error) {
        return (
            <h2 style={{ textAlign: 'center', color: '#d62828', padding: '4rem', fontFamily: "'Poppins', sans-serif" }}>
                {error}
            </h2>
        );
    }

    return (
        <section style={{ marginTop: '4rem', fontFamily: "'Poppins', sans-serif" }}>
            {/* TITULO */}
            {titulo && (
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}
                >
                    <h2
                        style={{
                            color: '#74884d',
                            fontSize: '2.5rem',
                            marginBottom: '0.7rem',
                            fontWeight: '700',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {titulo}
                    </h2>

                    <p
                        style={{
                            color: '#708a70',
                            fontSize: '1rem'
                        }}
                    >
                        {subtitulo}
                    </p>
                </div>
            )}

            {productos.length === 0 && (
                <p
                    style={{
                        textAlign: 'center',
                        color: '#8a7570',
                        padding: '2rem'
                    }}
                >
                    No encontramos productos en esta sección todavía.
                </p>
            )}

            {/* GRID DE PRODUCTOS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.2rem' }}>
                {productos.map((prod) => {
                    const isHovered = hoveredCard === prod.id;

                    return (
                        <article
                            key={prod.id}
                            onMouseEnter={() => setHoveredCard(prod.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: 'linear-gradient(145deg, #ffffff, #f4fce6)',
                                borderRadius: '26px',
                                overflow: 'hidden',
                                boxShadow: isHovered ? '0 18px 35px rgba(164, 181, 126, 0.25)' : '0 8px 20px rgba(0,0,0,0.06)',
                                transition: 'all 0.35s ease',
                                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                border: '1px solid rgba(193, 217, 169, 0.4)',
                                backdropFilter: 'blur(8px)'
                            }}
                        >
                            {/* IMAGEN CLIQUEABLE */}
                            <Link to={`/producto/${prod.id}`} style={{ display: 'block', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={prod.imagen}
                                    alt={prod.nombre}
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease',
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                        cursor: 'pointer'
                                    }}
                                />

                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(244, 252, 230, 0.92)',
                                    padding: '0.45rem 0.8rem',
                                    borderRadius: '999px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    color: '#74884d',
                                    backdropFilter: 'blur(8px)',
                                    pointerEvents: 'none'
                                }}>
                                    CatMarket
                                </div>
                            </Link>

                            {/* INFORMACIÓN DEL PRODUCTO */}
                            <div style={{ padding: '1.6rem' }}>
                                {/* TÍTULO CLIQUEABLE */}
                                <Link 
                                    to={`/producto/${prod.id}`} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <h3 style={{ 
                                        marginTop: 0, 
                                        marginBottom: '0.8rem', 
                                        color: isHovered ? '#74884d' : '#2e3b23', 
                                        fontSize: '1.1rem', 
                                        fontWeight: '600',
                                        transition: 'color 0.2s ease',
                                        cursor: 'pointer'
                                    }}>
                                        {prod.nombre}
                                    </h3>
                                </Link>

                                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#74884d', marginBottom: '1.3rem' }}>
                                    ${prod.precio}
                                </p>

                                {mostrarCompra && (
                                    <button
                                        onClick={() => comprarProducto(prod)}
                                        className={productoAgregado === prod.id ? "buy-button-added" : ""}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: 'none',
                                            borderRadius: '16px',
                                            background: '#8ba750',
                                            color: '#fff',
                                            fontWeight: '700',
                                            fontSize: '0.95rem',
                                            letterSpacing: '0.5px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: isHovered ? '0 10px 20px rgba(164,181,126,0.35)' : '0 4px 10px rgba(164,181,126,0.18)'
                                        }}
                                    >
                                        <FaShoppingCart style={{ marginRight: "8px" }} />
                                        {productoAgregado === prod.id ? "✓ ¡Agregado!" : "Comprar Producto"}
                                    </button>
                                )}

                                {esAdmin && (
                                    <button
                                        onClick={() => setProductoEditar(prod)}
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            padding: "1rem",
                                            border: "none",
                                            borderRadius: "16px",
                                            background: "#1976d2",
                                            color: "#fff",
                                            cursor: "pointer",
                                            fontWeight: "700"
                                        }}
                                    >
                                        <FaEdit style={{ marginRight: "8px" }} />
                                        Editar
                                    </button>
                                )}

                                {esAdmin && (
                                    <button
                                        onClick={() => abrirModalEliminar(prod.id)}
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            padding: "1rem",
                                            border: "none",
                                            borderRadius: "16px",
                                            background: "#d62828",
                                            color: "#fff",
                                            cursor: "pointer",
                                            fontWeight: "700"
                                        }}
                                    >
                                        <FaTrash style={{ marginRight: "8px" }} />
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}