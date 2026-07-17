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
                padding: "50px 20px"
            }}
        >

            <div
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
                    alignItems: "center"
                }}
            >

                <div
                    style={{
                        flex: "1",
                        minWidth: "300px",
                        textAlign: "center"
                    }}
                >

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            borderRadius: "20px",
                            boxShadow: "0 10px 25px rgba(0,0,0,.15)"
                        }}
                    />

                </div>

                <div
                    style={{
                        flex: "1",
                        minWidth: "300px"
                    }}
                >

                    <h1
                        style={{
                            color: "#4f772d",
                            marginBottom: "15px"
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
                            marginBottom: "20px"
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
                        onClick={() => addToCart(producto)}
                        style={{
                            width: "100%",
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
                        Agregar al carrito
                    </button>

                    <Link
                        to="/"
                        style={{
                            display: "block",
                            textAlign: "center",
                            padding: "15px",
                            borderRadius: "15px",
                            textDecoration: "none",
                            background: "#e9ecef",
                            color: "#333",
                            fontWeight: "600"
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