import React, { useEffect, useState } from 'react';

export default function Footer() {
    const [miembros, setMiembros] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        fetch('/data/equipo.json')
            .then((res) => res.json())
            .then((data) => setMiembros(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <footer
            style={{
                background:
                    'linear-gradient(180deg, #3d5a1a, #4f772d)',
                padding: '4rem 2rem 2rem',
                color: '#fff',
                marginTop: '5rem',
                fontFamily: "'Poppins', sans-serif",
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* EFECTO FONDO */}
            <div
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background:
                        'rgba(255,255,255,0.04)',
                    top: '-120px',
                    right: '-100px',
                    filter: 'blur(10px)'
                }}
            />

            {/* TITULO */}
            <div
                style={{
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <h3
                    style={{
                        marginBottom: '0.7rem',
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}
                >
                    Nuestro Equipo
                </h3>
                <p
                    style={{
                        color: '#dbe8c8',
                        marginBottom: '3rem',
                        fontSize: '0.98rem'
                    }}
                >
                    Las personas detrás de CatMarket
                </p>
            </div>

            {/* TARJETAS */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                {miembros.map((m) => {
                    const isHovered =
                        hoveredCard === m.id;

                    return (
                        <div
                            key={m.id}
                            onMouseEnter={() =>
                                setHoveredCard(m.id)
                            }
                            onMouseLeave={() =>
                                setHoveredCard(null)
                            }
                            style={{
                                background:
                                    'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(10px)',
                                border:
                                    '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '24px',
                                padding: '2rem 1.5rem',
                                textAlign: 'center',
                                transition:
                                    'all 0.35s ease',
                                transform: isHovered
                                    ? 'translateY(-8px)'
                                    : 'translateY(0)',
                                boxShadow: isHovered
                                    ? '0 18px 30px rgba(0,0,0,0.22)'
                                    : '0 8px 18px rgba(0,0,0,0.12)'
                            }}
                        >
                            {/* FOTO */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100px',
                                    margin: '0 auto'
                                }}
                            >
                                <img
                                    src={m.avatar}
                                    alt={m.nombre}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border:
                                            '4px solid rgba(223,245,176,0.95)',
                                        transition:
                                            '0.3s ease',
                                        transform: isHovered
                                            ? 'scale(1.06)'
                                            : 'scale(1)'
                                    }}
                                />

                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '50%',
                                        background:
                                            '#8bc34a',
                                        border:
                                            '3px solid #4f772d'
                                    }}
                                />
                            </div>

                            {/* INFO */}
                            <h4
                                style={{
                                    marginTop: '1.3rem',
                                    marginBottom: '0.4rem',
                                    fontSize: '1.15rem',
                                    fontWeight: '600'
                                }}
                            >
                                {m.nombre}
                            </h4>

                            <p
                                style={{
                                    margin: 0,
                                    color: '#dff5b0',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {m.rol}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* LINEA */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1100px',
                    height: '1px',
                    background:
                        'rgba(255,255,255,0.12)',
                    margin: '4rem auto 2rem'
                }}
            />

            {/* COPYRIGHT */}
            <div
                style={{
                    textAlign: 'center',
                    color: '#d6ebb4',
                    position: 'relative',
                    zIndex: 2
                }}
            >

                <p
                    style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        opacity: 0.9
                    }}
                >
                    © 2026 CatMarket
                </p>
            </div>
        </footer>
    );
}