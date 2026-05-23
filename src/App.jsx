import React, { useEffect, useRef, useState } from 'react';

import Header from './componentes/Layout/Header';
import Main from './componentes/Layout/Main';
import Footer from './componentes/Layout/Footer';

import ItemListContainer from './componentes/Productos/ItemListContainer';
import FormularioContainer from './componentes/FormularioProducto/FormularioContainer';

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const inicioRef = useRef(null);
    const productosRef = useRef(null);
    const equipoRef = useRef(null);

    const scrollSeccion = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('No se pudo cargar el catálogo');
                }

                return res.json();
            })
            .then((data) => {
                setProductos(data);
                setCargando(false);
            })
            .catch((err) => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const agregarProducto = (productoNuevo) => {
        const nuevoProducto = {
            ...productoNuevo,
            id: Date.now()
        };

        setProductos([nuevoProducto, ...productos]);
    };

    return (
        <>
            <Header
                alHacerClicInicio={() => scrollSeccion(inicioRef)}
                alHacerClicProductos={() => scrollSeccion(productosRef)}
                alHacerClicEquipo={() => scrollSeccion(equipoRef)}
            />

            <Main>
                <div ref={inicioRef}>
                    <FormularioContainer
                        alAgregarProducto={agregarProducto}
                    />
                </div>

                <div ref={productosRef}>
                    <ItemListContainer
                        productos={productos}
                        cargando={cargando}
                        error={error}
                    />
                </div>
            </Main>

            <div ref={equipoRef}>
                <Footer />
            </div>
        </>
    );
}

export default App;