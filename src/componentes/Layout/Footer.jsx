import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF, FaPaw, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-brand">
                    <h3>CatMarket</h3>
                    <p>Todo lo que tu gato necesita para jugar, descansar y disfrutar cada día. Una tienda especializada en los michis del hogar.</p>
                </div>

                <nav className="footer-nav" aria-label="Subnavegación del sitio">
                    <h4>Explorá la tienda</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/conocenos">Conocenos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </nav>

                <div className="footer-contact">
                    <h4>Contacto</h4>
                    <div className="footer-contact-item"><FaPhoneAlt /><span>11 1234-5678</span></div>
                    <div className="footer-contact-item"><FaEnvelope /><span>hola@catmarket.com</span></div>
                    <div className="footer-contact-item"><FaMapMarkerAlt /><span>Av. de los Gatos 1234, Buenos Aires</span></div>
                </div>
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
