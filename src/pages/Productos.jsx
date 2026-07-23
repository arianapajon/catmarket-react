import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../componentes/Layout/Header';
import Main from '../componentes/Layout/Main';
import Footer from '../componentes/Layout/Footer';
import ItemListContainer from '../componentes/Productos/ItemListContainer';

const CATEGORIAS = [
    { slug: "Juguetes", nombre: "Juguetes" },
    { slug: "Rascadores", nombre: "Rascadores y Camas" },
    { slug: "Accesorios", nombre: "Accesorios" }
];

export default function Productos({ productos, cargando, error }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoriaActiva = searchParams.get("categoria") || "";

    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        setPaginaActual(1);
    }, [categoriaActiva, busqueda]);

    const elegirCategoria = (slug) => {
        if (slug === categoriaActiva) {
            searchParams.delete("categoria");
        } else {
            searchParams.set("categoria", slug);
        }
        setSearchParams(searchParams);
    };

    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideCategoria = categoriaActiva
            ? producto.categoria === categoriaActiva
            : true;

        return coincideNombre && coincideCategoria;
    });

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

    const nombreCategoriaActiva = CATEGORIAS.find(
        (c) => c.slug === categoriaActiva
    )?.nombre;

    return (
        <>
            <Header />

            <Main>
                <Container>

                    <h1 className="page-title">
                        {nombreCategoriaActiva || "Todos los productos"}
                    </h1>
                    <p className="page-subtitle">
                        Descubrí accesorios únicos para gatos
                    </p>

                    <div className="category-bar">
                        {CATEGORIAS.map((cat) => (
                            <button
                                key={cat.slug}
                                className={`category-chip ${categoriaActiva === cat.slug ? "is-active" : ""}`}
                                onClick={() => elegirCategoria(cat.slug)}
                            >
                                {cat.nombre}
                            </button>
                        ))}
                    </div>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <Row>
                        <Col xs={12}>
                            <ItemListContainer
                                productos={productosPaginados}
                                cargando={cargando}
                                error={error}
                                esAdmin={false}
                                setProductoEditar={() => {}}
                                titulo=""
                                subtitulo=""
                            />
                        </Col>
                    </Row>

                    {totalPaginas > 1 && (
                        <div className="pagination-bar">
                            {[...Array(totalPaginas)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPaginaActual(index + 1)}
                                    className={paginaActual === index + 1 ? "is-active" : ""}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}

                </Container>
            </Main>

            <div id="equipo">
                <Footer />
            </div>
        </>
    );
}