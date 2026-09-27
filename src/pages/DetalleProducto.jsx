import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

function DetalleProducto() {

    const { id } = useParams();

    const { addToCart } = useContext(CartContext);

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [agregado, setAgregado] = useState(false);

    const agregarProductoAlCarrito = () => {
        addToCart(producto);
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1400);
    };

    useEffect(() => {

        const obtenerProducto = async () => {

            try {

                const docRef = doc(db, "productos", id);

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    setProducto({
                        id: docSnap.id,
                        ...docSnap.data()
                    });

                }

            } catch (error) {

                console.log(error);

            } finally {

                setCargando(false);

            }

        };

        obtenerProducto();

    }, [id]);

    if (cargando) {

        return (
            <h2
                style={{
                    textAlign: "center",
                    marginTop: "80px",
                    color: "#4f772d"
                }}
            >
                Cargando producto...
            </h2>
        );

    }

    if (!producto) {

        return (
            <h2
                style={{
                    textAlign: "center",
                    marginTop: "80px",
                    color: "#d62828"
                }}
            >
                Producto no encontrado.
            </h2>
        );

    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "50px 20px",
                width: "100%",
                boxSizing: "border-box"
            }}
        >

            <div
                className="detalle-producto"
                style={{
                    width: "100%",
                    maxWidth: "1050px",
                    background: "#ffffff",
                    borderRadius: "25px",
                    padding: "40px",
                    boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "40px",
                    alignItems: "center",
                    boxSizing: "border-box",
                    overflow: "hidden"
                }}
            >

                {/* IMAGEN DEL PRODUCTO */}

                <div
                    className="detalle-imagen"
                    style={{
                        flex: "1 1 0",
                        minWidth: "0",
                        width: "100%",
                        textAlign: "center",
                        boxSizing: "border-box"
                    }}
                >

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            height: "auto",
                            borderRadius: "20px",
                            boxShadow: "0 10px 25px rgba(0,0,0,.15)",
                            display: "block",
                            margin: "0 auto",
                            objectFit: "contain"
                        }}
                    />

                </div>

                {/* INFORMACIÓN DEL PRODUCTO */}

                <div
                    className="detalle-info"
                    style={{
                        flex: "1 1 0",
                        minWidth: "0",
                        width: "100%",
                        boxSizing: "border-box"
                    }}
                >

                    <h1
                        style={{
                            color: "#4f772d",
                            marginBottom: "15px",
                            overflowWrap: "break-word"
                        }}
                    >
                        {producto.nombre}
                    </h1>

                    <h2
                        style={{
                            color: "#7cb518",
                            fontSize: "2rem",
                            marginBottom: "20px"
                        }}
                    >
                        ${producto.precio}
                    </h2>

                    <p
                        style={{
                            background: "#f6fff1",
                            padding: "20px",
                            borderRadius: "15px",
                            lineHeight: "1.7",
                            color: "#555",
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                            overflowWrap: "break-word"
                        }}
                    >
                        {producto.descripcion || "Este producto todavía no tiene descripción."}
                    </p>

                    <p
                        style={{
                            fontWeight: "bold",
                            color: "#4f772d",
                            marginBottom: "30px"
                        }}
                    >
                        Stock disponible: {producto.stock}
                    </p>

                    <button
                        onClick={agregarProductoAlCarrito}
                        className={agregado ? "detail-cart-added" : ""}
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                            boxSizing: "border-box",
                            padding: "15px",
                            border: "none",
                            borderRadius: "15px",
                            background: "linear-gradient(135deg,#8bc34a,#5e9c2d)",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginBottom: "15px"
                        }}
                    >
                        <FaShoppingCart style={{ marginRight: "8px" }} />
                        {agregado ? "✓ ¡Agregado al carrito!" : "Agregar al carrito"}
                    </button>

                    <Link
                        to="/"
                        style={{
                            display: "block",
                            width: "100%",
                            boxSizing: "border-box",
                            textAlign: "center",
                            padding: "15px",
                            borderRadius: "15px",
                            textDecoration: "none",
                            background: "#e9ecef",
                            color: "#333",
                            fontWeight: "600",
                            overflowWrap: "break-word"
                        }}
                    >
                        <FaArrowLeft style={{ marginRight: "8px" }} />
                        Volver a la tienda
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default DetalleProducto;