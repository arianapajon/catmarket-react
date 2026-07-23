import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-inner">

                <div className="hero-content">
                    <span className="hero-eyebrow">Todo para tu gato</span>

                    <h1 className="hero-title">
                        Mimos en cada compra
                    </h1>

                    <p className="hero-subtitle">
                        Descubrí juguetes, accesorios y todo lo que tu gato
                        necesita para vivir feliz, en un solo lugar y con
                        mucho amor.
                    </p>

                    <Link to="/productos" className="btn-primary">
                        Ver productos
                    </Link>
                </div>

                <div className="hero-image-wrap">
                    <div className="hero-blob" />
                    <img src={heroImg} alt="Gato feliz de CatMarket" />
                </div>

            </div>
        </section>
    );
}