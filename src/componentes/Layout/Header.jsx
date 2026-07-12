import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from "../../context/AuthContext";

export default function Header({
    alHacerClicInicio,
    alHacerClicProductos,
    alHacerClicEquipo
}) {
    const { cart } = useContext(CartContext);
    const [hovered, setHovered] = useState('');
    const { user, cerrarSesion } = useContext(AuthContext);

    return (
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
            {/* LOGO */}
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
                        transition: '0.3s ease',
                        textShadow:
                            '0 3px 10px rgba(0,0,0,0.18)'
                    }}
                >
                    <span
                    style={{
                    fontSize: '2.1rem',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                    >
                    🐱
                    </span>
                    CatMarket
                </h1>
            </div>

            {/* NAV */}
            <nav
                style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}
            >
                <button
                style={{
                ...estiloBoton,
                cursor: 'default'
                }}
                >
                🛒 Carrito ({cart.length})
                </button>
                <button
                    onClick={alHacerClicInicio}
                    onMouseEnter={() => setHovered('inicio')}
                    onMouseLeave={() => setHovered('')}
                    style={{
                        ...estiloBoton,
                        ...(hovered === 'inicio'
                            ? estiloHover
                            : {})
                    }}
                >
                    Inicio
                </button>

                <button
                    onClick={alHacerClicProductos}
                    onMouseEnter={() => setHovered('productos')}
                    onMouseLeave={() => setHovered('')}
                    style={{
                        ...estiloBoton,
                        ...(hovered === 'productos'
                            ? estiloHover
                            : {})
                    }}
                >
                    Productos
                </button>

                <button
                    onClick={alHacerClicEquipo}
                    onMouseEnter={() => setHovered('equipo')}
                    onMouseLeave={() => setHovered('')}
                    style={{
                        ...estiloBoton,
                        ...(hovered === 'equipo'
                            ? estiloHover
                            : {})
                    }}
                >
                    Equipo
                </button>
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
                Cerrar sesión
            </button>
        </>
    ) : null
}
            </nav>
        </header>
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