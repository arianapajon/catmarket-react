import FormularioContainer from "../componentes/FormularioProducto/FormularioContainer";
import ItemListContainer from "../componentes/Productos/ItemListContainer";

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
    setProductoEditar={setProductoEditar}
    esAdmin={true}
    mostrarCompra={false}
/>

        </div>

    );

}

export default Admin;