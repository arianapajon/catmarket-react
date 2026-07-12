import React, { useEffect, useRef, useState } from 'react';

import Header from './componentes/Layout/Header';
import Main from './componentes/Layout/Main';
import Footer from './componentes/Layout/Footer';
import ItemListContainer from './componentes/Productos/ItemListContainer';
import FormularioContainer from './componentes/FormularioProducto/FormularioContainer';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
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

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [productoEditar, setProductoEditar] = useState(null);

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

const eliminarProducto = async (id) => {

    const confirmar = window.confirm(
        "¿Seguro que querés eliminar este producto?"
    );

    if (!confirmar) return;

    try {

        await deleteDoc(doc(db, "productos", id));

        setProductos(
            productos.filter((producto) => producto.id !== id)
        );

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

    return (
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

                        <div ref={inicioRef}>
                            <FormularioContainer
    alAgregarProducto={agregarProducto}
    productoEditar={productoEditar}
    setProductoEditar={setProductoEditar}
    editarProducto={editarProducto}
/>
                        </div>

                        <div ref={productosRef}>
                            <ItemListContainer
    productos={productos}
    cargando={cargando}
    error={error}
    eliminarProducto={eliminarProducto}
    setProductoEditar={setProductoEditar}
/>
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
            <Admin />
        </ProtectedRoute>
    }
/>

        

    </Routes>
);
}

export default App;