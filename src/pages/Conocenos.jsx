import React, { useEffect, useState } from "react";
import Header from "../componentes/Layout/Header";
import Footer from "../componentes/Layout/Footer";
import local from "../assets/local.png";

export default function Conocenos() {
    const [miembros, setMiembros] = useState([]);

    useEffect(() => {
        fetch("/data/equipo.json")
            .then((res) => res.json())
            .then((data) => setMiembros(data))
            .catch((error) => console.error("No se pudo cargar el equipo", error));
    }, []);

    return (
        <>
            <Header />
            <main className="info-page">
                <div className="info-page-inner">
                    <h1 className="info-page-title">Conocenos</h1>
                    <p className="info-page-subtitle">
                        Detrás de CatMarket hay un equipo que comparte el amor por los gatos y trabaja para ofrecer productos útiles, lindos y pensados para su bienestar.
                    </p>

                    <section className="business-description">

    <h2>Sobre CatMarket</h2>

    <div className="business-content">

        <div className="business-image">
            <img
                src={local}
                alt="Local de CatMarket"
                className="info-page-image"
            />
        </div>

        <div className="business-text">

            <p>
                Bienvenidos a <strong>CatMarket</strong>, un espacio creado por
                y para amantes de los gatos. Nacimos con la idea de ofrecer un
                lugar donde encontrar todo lo necesario para consentir a
                nuestros compañeros felinos de una manera simple, cómoda y
                confiable.
            </p>

            <p>
                Sabemos que cada gato tiene su propia personalidad, sus gustos
                y sus necesidades. Por eso, seleccionamos cuidadosamente
                nuestros productos para acompañarlos en cada momento de su día,
                desde la alimentación y el cuidado hasta el juego y el descanso.
            </p>

            <h2>¿Por qué elegirnos?</h2>

            <p>
                <strong>Calidad y confianza:</strong> Seleccionamos productos
                pensados para brindar comodidad, seguridad y bienestar.
            </p>

            <p>
                <strong>Envío rápido y seguro:</strong> Preparamos cada pedido
                con cuidado para que puedas recibir tus productos directamente
                en la puerta de tu casa.
            </p>

            <p>
                <strong>Atención personalizada:</strong> Te ayudamos a
                encontrar la opción más adecuada según la edad, personalidad y
                necesidades de tu gato.
            </p>

        </div>

    </div>

</section>

                    <section className="team-section">
                        <h2>El equipo</h2>
                        <div className="team-grid">
                            {miembros.map((miembro) => (
                                <article className="team-card" key={miembro.id}>
                                    <img src={miembro.avatar} alt={miembro.nombre} />
                                    <h3>{miembro.nombre}</h3>
                                    <p>{miembro.rol}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
