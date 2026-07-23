import React from 'react';
import { Link } from 'react-router-dom';

const categorias = [
    {
        id: 1,
        nombre: "Juguetes",
        slug: "Juguetes",
        descripcion: "Diversión y estímulo para las horas de juego.",
        imagen: "https://acdn-us.mitiendanube.com/stores/575/267/products/71f1dsc7drl-_ac_sl1500_-0800dccf6a1e764b8917474102273710-1024-1024.webp"
    },
    {
        id: 2,
        nombre: "Rascadores y Camas",
        slug: "Rascadores",
        descripcion: "Comodidad y bienestar para cada rincón de casa.",
        imagen: "https://petproducts.com.cn/wp-content/uploads/2026/03/Cat-Scratcher.webp"
    },
    {
        id: 3,
        nombre: "Accesorios",
        slug: "Accesorios",
        descripcion: "Comederos y accesorios para su día a día.",
        imagen: "https://www.petmarket.com.ar/wp-content/uploads/2024/06/Comedero-Bowl-Doble-para-gato-2-1.jpg"
    }
];

export default function Signature() {
    return (
        <section className="signature">
            <h2 className="signature-title">Nuestras Categorías</h2>

            <div className="signature-grid">
                {categorias.map((cat) => (
                    <Link
                        to={`/productos?categoria=${cat.slug}`}
                        className="signature-card"
                        key={cat.id}
                    >
                        <img src={cat.imagen} alt={cat.nombre} />

                        <div className="signature-card-body">
                            <h3>{cat.nombre}</h3>
                            <p>{cat.descripcion}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}