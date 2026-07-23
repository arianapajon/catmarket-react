import React, { useEffect, useState } from 'react';

import Home from './pages/Home';
import Productos from './pages/Productos';
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
import { Modal, Button } from "react-bootstrap";
import Header from './componentes/Layout/Header';
import Main from './componentes/Layout/Main';
import Footer from './componentes/Layout/Footer';
import DetalleProducto from "./pages/DetalleProducto";
import Cupones from "./pages/Cupones";
import ScrollToTop from "./componentes/ScrollToTop";

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

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
                descripcion: producto.descripcion,
                imagen: producto.imagen,
                destacado: producto.destacado,
                categoria: producto.categoria
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

            <ScrollToTop />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            productos={productos}
                            cargando={cargando}
                            error={error}
                        />
                    }
                />

                <Route
                    path="/productos"
                    element={
                        <Productos
                            productos={productos}
                            cargando={cargando}
                            error={error}
                        />
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

                <Route
                    path="/cupones"
                    element={
                        <ProtectedRoute>
                            <Cupones />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/producto/:id"
                    element={
                        <>
                            <Header />

                            <Main>
                                <DetalleProducto />
                            </Main>

                            <Footer />
                        </>
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