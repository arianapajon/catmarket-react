import FormularioContainer from "../componentes/FormularioProducto/FormularioContainer";
import ItemListContainer from "../componentes/Productos/ItemListContainer";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Admin({
    productos,
    cargando,
    error,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    productoEditar,
    setProductoEditar,
    abrirModalEliminar
}) {

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "20px"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "10px"
                }}
            >
                Panel de Administración
            </h1>

            <p
                style={{
                    textAlign: "center",
                    color: "#666",
                    marginBottom: "40px"
                }}
            >
                Desde aquí podés crear, editar y eliminar productos.
            </p>

            <div
    style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px"
    }}
>
    <Link
        to="/"
        style={{
            textDecoration: "none",
            background: "#4f772d",
            color: "#fff",
            padding: "12px 22px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "600",
            transition: ".3s"
        }}
    >
        <FaArrowLeft />
        Volver a la tienda
    </Link>
</div>

            <FormularioContainer
                alAgregarProducto={agregarProducto}
                productoEditar={productoEditar}
                setProductoEditar={setProductoEditar}
                editarProducto={editarProducto}
            />

            <ItemListContainer
    productos={productos}
    cargando={cargando}
    error={error}
    abrirModalEliminar={abrirModalEliminar}
    esAdmin={true}
    mostrarCompra={false}
    setProductoEditar={(producto) => {
    setProductoEditar(producto);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}}
/>

        </div>

    );

}

export default Admin;