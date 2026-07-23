import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.png';

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo-inner">

                <div className="promo-image">
                    <img src={heroImg} alt="Promoción CatMarket" />
                </div>

                <div className="promo-content">
                    <h2>Código "MICHI" para</h2>

                    <span className="promo-badge">20% OFF</span>

                    <div>
                        <Link to="/productos" className="btn-primary">
                            Comprar ahora
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}