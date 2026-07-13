import React, { useEffect, useRef, useState } from 'react';

import Header from './componentes/Layout/Header';
import Main from './componentes/Layout/Main';
import Footer from './componentes/Layout/Footer';
import ItemListContainer from './componentes/Productos/ItemListContainer';
import FormularioContainer from './componentes/FormularioProducto/FormularioContainer';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { Helmet } from "react-helmet";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import ProtectedRoute from "./routes/ProtectedRoute";
import {
    Modal,
    Button,
    Row,
    Col,
    Container
} from "react-bootstrap";

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productoEditar, setProductoEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const inicioRef = useRef(null);
    const productosRef = useRef(null);
    const equipoRef = useRef(null);

    const scrollSeccion = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {

    const obtenerProductos = async () => {

        try {

            const productosRef = collection(db, "productos");

            const snapshot = await getDocs(productosRef);

            const listaProductos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setProductos(listaProductos);

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);

        }

    };

    obtenerProductos();

}, []);

    const agregarProducto = async (productoNuevo) => {

    try {

        const docRef = await addDoc(
            collection(db, "productos"),
            productoNuevo
        );

        setProductos([
            {
                id: docRef.id,
                ...productoNuevo
            },
            ...productos
        ]);

        alert("Producto agregado correctamente.");

    } catch (error) {

        console.log(error);

        alert("Error al guardar el producto.");

    }

};

const abrirModalEliminar = (id) => {
    setProductoAEliminar(id);
    setMostrarModal(true);
};

const eliminarProducto = async () => {
    try {
    await deleteDoc(doc(db, "productos", productoAEliminar));
    setProductos(
        productos.filter(
            (producto) => producto.id !== productoAEliminar
        )
    );
    setMostrarModal(false);
    setProductoAEliminar(null);
    alert("Producto eliminado.");
} catch (error) {
    console.log(error);
    alert("No se pudo eliminar.");
}
};

const editarProducto = async (producto) => {

    try {

        const referencia = doc(
            db,
            "productos",
            producto.id
        );

        await updateDoc(referencia, {
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            destacado: producto.destacado
        });

        setProductos(
            productos.map((p) =>
                p.id === producto.id ? producto : p
            )
        );

        alert("Producto actualizado.");

    } catch (error) {

        console.log(error);

        alert("Error al actualizar.");

    }

};

const productosFiltrados = productos.filter((producto) =>
    producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())
);

const productosPorPagina = 6;

const indiceUltimoProducto = paginaActual * productosPorPagina;
const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

const productosPaginados = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
);

const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
);

    return (
        <>
    <Helmet>

        <title>
            CatMarket | Tienda para gatos
        </title>

        <meta
            name="description"
            content="CatMarket - Tienda online de accesorios para gatos."
        />

    </Helmet>
    <Routes>

        <Route
            path="/"
            element={
                <>
                    <Header
                        alHacerClicInicio={() => scrollSeccion(inicioRef)}
                        alHacerClicProductos={() => scrollSeccion(productosRef)}
                        alHacerClicEquipo={() => scrollSeccion(equipoRef)}
                    />

                    <Main>

                        

                        <div ref={productosRef}>
    <Container>

    <div
        style={{
            maxWidth: "500px",
            margin: "0 auto 30px auto"
        }}
    >
        <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
            }}
            style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "16px",
                boxSizing: "border-box"
            }}
        />
    </div>

    <Row>

        <Col xs={12}>

            <ItemListContainer
                productos={productosPaginados}
                cargando={cargando}
                error={error}
                abrirModalEliminar={abrirModalEliminar}
                esAdmin={false}
                setProductoEditar={(producto) => {
    setProductoEditar(producto);

    inicioRef.current?.scrollIntoView({
        behavior: "smooth"
    });
}}
            />

        </Col>

    </Row>

    <div
        style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px"
        }}
    >
        {[...Array(totalPaginas)].map((_, index) => (

            <button
                key={index}
                onClick={() => setPaginaActual(index + 1)}
                style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background:
                        paginaActual === index + 1
                            ? "#4CAF50"
                            : "#ddd",
                    color:
                        paginaActual === index + 1
                            ? "#fff"
                            : "#000"
                }}
            >
                {index + 1}
            </button>

        ))}
    </div>

</Container>
</div>

                    </Main>

                    <div ref={equipoRef}>
                        <Footer />
                    </div>
                </>
            }
        />

        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

        <Route
    path="/admin"
    element={
        <ProtectedRoute>
            <Admin
                productos={productos}
                cargando={cargando}
                error={error}
                agregarProducto={agregarProducto}
                eliminarProducto={eliminarProducto}
                editarProducto={editarProducto}
                productoEditar={productoEditar}
                setProductoEditar={setProductoEditar}
                abrirModalEliminar={abrirModalEliminar}
            />
        </ProtectedRoute>
    }
/>

    </Routes>
    <Modal
    show={mostrarModal}
    onHide={() => setMostrarModal(false)}
    centered
>
    <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        ¿Seguro que querés eliminar este producto?
    </Modal.Body>

    <Modal.Footer>
        <Button
            variant="secondary"
            onClick={() => setMostrarModal(false)}
        >
            Cancelar
        </Button>

        <Button
            variant="danger"
            onClick={eliminarProducto}
        >
            Eliminar
        </Button>
    </Modal.Footer>
</Modal>
    </>
    );
}

export default App;