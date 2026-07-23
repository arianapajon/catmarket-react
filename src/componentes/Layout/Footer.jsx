import React, { useEffect, useState } from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaPaw } from 'react-icons/fa';

export default function Footer() {
    const [miembros, setMiembros] = useState([]);

    useEffect(() => {
        fetch('/data/equipo.json')
            .then((res) => res.json())
            .then((data) => setMiembros(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <footer className="site-footer">

            <h3 className="footer-title">Nuestro Equipo</h3>
            <p className="footer-subtitle">Las personas detrás de CatMarket</p>

            <div className="footer-grid">
                {miembros.map((m) => (
                    <div className="footer-card" key={m.id}>
                        <img src={m.avatar} alt={m.nombre} />
                        <h4>{m.nombre}</h4>
                        <p>{m.rol}</p>
                    </div>
                ))}
            </div>

            <div className="footer-social">
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="CatMarket"><FaPaw /></a>
            </div>

            <div className="footer-bottom">
                <p>© 2026 CatMarket. Todos los derechos reservados.</p>
            </div>

        </footer>
    );
}
