import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../componentes/Layout/Header';
import Footer from '../componentes/Layout/Footer';
import Hero from '../componentes/Layout/Hero';
import Signature from '../componentes/Layout/Signature';
import Promo from '../componentes/Layout/Promo';
import ItemListContainer from '../componentes/Productos/ItemListContainer';
import { Container } from 'react-bootstrap';

export default function Home({ productos, cargando, error }) {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#equipo') {
            const el = document.getElementById('equipo');
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const destacados = productos.filter((p) => p.destacado);

    return (
        <>
            <Header />

            <Hero />
            <Signature />
            <Promo />

            <section className="signature">
                <Container>
                    <ItemListContainer
                        productos={destacados}
                        cargando={cargando}
                        error={error}
                        esAdmin={false}
                        setProductoEditar={() => {}}
                        titulo="Destacados"
                        subtitulo="Lo que más les gusta a nuestros clientes"
                    />
                </Container>
            </section>

            <div id="equipo">
                <Footer />
            </div>
        </>
    );
}