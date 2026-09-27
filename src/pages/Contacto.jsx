import React, { useState } from "react";
import Header from "../componentes/Layout/Header";
import Footer from "../componentes/Layout/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
    const [enviado, setEnviado] = useState(false);
    const [formulario, setFormulario] = useState({ nombre: "", email: "", mensaje: "" });

    const manejarEnvio = (e) => {
        e.preventDefault();
        setEnviado(true);
        setFormulario({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <>
            <Header />
            <main className="info-page">
                <div className="info-page-inner">
                    <h1 className="info-page-title">Contacto</h1>
                    <p className="info-page-subtitle">
                        ¿Tenés una consulta, una sugerencia o querés saber más sobre algún producto? Escribinos y nos ponemos en contacto.
                    </p>

                    <div className="contact-layout">
                        <section className="contact-info-card">
                            <h2>Encontranos</h2>
                            <div className="contact-info-item"><FaPhoneAlt /><span><strong>Teléfono</strong><br />11 1234-5678</span></div>
                            <div className="contact-info-item"><FaEnvelope /><span><strong>Mail</strong><br />hola@catmarket.com</span></div>
                            <div className="contact-info-item"><FaMapMarkerAlt /><span><strong>Dirección</strong><br />Av. de los Gatos 1234, Buenos Aires</span></div>
                        </section>

                        <section className="contact-form-card">
                            <h2>Dejanos tu mensaje</h2>
                            {enviado && <div className="contact-success">✓ ¡Mensaje recibido! Gracias por contactarte con CatMarket.</div>}
                            <form className="contact-form" onSubmit={manejarEnvio}>
                                <div>
                                    <label htmlFor="nombre">Nombre</label>
                                    <input id="nombre" type="text" required value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input id="email" type="email" required value={formulario.email} onChange={(e) => setFormulario({ ...formulario, email: e.target.value })} placeholder="tu@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="mensaje">Mensaje</label>
                                    <textarea id="mensaje" required value={formulario.mensaje} onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })} placeholder="Escribí tu consulta..." />
                                </div>
                                <button type="submit" className="btn-primary">Enviar mensaje</button>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
