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
    mostrarCompra = true
}) {
    const { addToCart } = useContext(CartContext);
    const [hoveredCard, setHoveredCard] = useState(null);

    if (cargando) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "60px"
            }}
        >
            <Spinner animation="border" variant="success" />
        </div>
    );
}

    if (error) {
        return (
            <h2
                style={{
                    textAlign: 'center',
                    color: '#d62828',
                    padding: '4rem',
                    fontFamily: "'Poppins', sans-serif"
                }}
            >
                {error}
            </h2>
        );
    }

    return (
        <section
            style={{
                marginTop: '4rem',
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            {/* TITULO */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}
            >
                <h2
                    style={{
                        color: '#4f772d',
                        fontSize: '2.5rem',
                        marginBottom: '0.7rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}
                >
                    Productos Disponibles
                </h2>

                <p
                    style={{
                        color: '#6d8a4c',
                        fontSize: '1rem'
                    }}
                >
                    Descubrí accesorios únicos para gatos
                </p>
            </div>

            {/* GRID */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.2rem'
                }}
            >
                {productos.map((prod) => {
                    const isHovered = hoveredCard === prod.id;

                    return (
                        <article
                            key={prod.id}
                            onMouseEnter={() =>
                                setHoveredCard(prod.id)
                            }
                            onMouseLeave={() =>
                                setHoveredCard(null)
                            }
                            style={{
                                background:
                                    'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(240,255,228,0.95))',
                                borderRadius: '26px',
                                overflow: 'hidden',
                                boxShadow: isHovered
                                    ? '0 18px 35px rgba(90, 150, 60, 0.18)'
                                    : '0 8px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.35s ease',
                                transform: isHovered
                                    ? 'translateY(-8px)'
                                    : 'translateY(0)',
                                border:
                                    '1px solid rgba(139, 195, 74, 0.18)',
                                backdropFilter: 'blur(8px)'
                            }}
                        >
                            {/* IMAGEN */}
                            <div
                                style={{
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                <img
                                    src={prod.imagen}
                                    alt={prod.nombre}
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        transition:
                                            'transform 0.4s ease',
                                        transform: isHovered
                                            ? 'scale(1.05)'
                                            : 'scale(1)'
                                    }}
                                />

                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background:
                                            'rgba(255,255,255,0.88)',
                                        padding:
                                            '0.45rem 0.8rem',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        color: '#5f7d35',
                                        backdropFilter: 'blur(8px)'
                                    }}
                                >
                                    CatMarket
                                </div>
                            </div>

                            {/* INFO */}
                            <div
                                style={{
                                    padding: '1.6rem'
                                }}
                            >
                                <h3
                                    style={{
                                        marginTop: 0,
                                        marginBottom: '0.8rem',
                                        color: '#3d5a1a',
                                        fontSize: '1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {prod.nombre}
                                </h3>

                                <p
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#7cb518',
                                        marginBottom: '1.3rem'
                                    }}
                                >
                                    ${prod.precio}
                                </p>

                                <Link
    to={`/producto/${prod.id}`}
    style={{
        display: "inline-block",
        marginBottom: "15px",
        color: "#4CAF50",
        fontWeight: "bold",
        textDecoration: "none"
    }}
>
    Ver detalle
</Link>

                                {mostrarCompra && (<button
                                    onClick={() => addToCart(prod)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        border: 'none',
                                        borderRadius: '16px',
                                        background:
                                            'linear-gradient(135deg, #8bc34a, #5e9c2d)',
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: '0.95rem',
                                        letterSpacing: '0.5px',
                                        cursor: 'pointer',
                                        transition:
                                            'all 0.3s ease',
                                        boxShadow: isHovered
                                            ? '0 10px 20px rgba(94,156,45,0.25)'
                                            : '0 4px 10px rgba(94,156,45,0.12)'
                                    }}
                                >
                                    <FaShoppingCart style={{ marginRight: "8px" }} />
    Comprar Producto
                                </button>)}
                                {esAdmin && (<button
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
</button>)}
                                {esAdmin && (<button
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
</button>)}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}