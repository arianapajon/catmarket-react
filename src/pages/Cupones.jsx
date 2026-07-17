import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaArrowLeft, FaTrash } from "react-icons/fa";
import { db } from "../firebase/firebase";

import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "firebase/firestore";

function Cupones() {

    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState("");
    const [cupones, setCupones] = useState([]);

    // Cargar cupones en tiempo real
    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, "cupones"),
            (snapshot) => {

                const lista = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setCupones(lista);

            }
        );

        return () => unsubscribe();

    }, []);

    // Agregar cupón
    const agregarCupon = async (e) => {

        e.preventDefault();

        if (!codigo || !descuento) {
            alert("Completá todos los campos.");
            return;
        }

        try {

            await addDoc(collection(db, "cupones"), {
                codigo: codigo,
                descuento: Number(descuento)
            });

            setCodigo("");
            setDescuento("");

        } catch (error) {

            console.error(error);
            alert("Error al guardar el cupón.");

        }

    };

    // Eliminar cupón
    const eliminarCupon = async (id) => {

        try {

            await deleteDoc(doc(db, "cupones", id));

        } catch (error) {

            console.error(error);
            alert("Error al eliminar el cupón.");

        }

    };

    return (

        <div
            style={{
                maxWidth: "900px",
                margin: "50px auto",
                padding: "40px",
                background: "linear-gradient(145deg,#ffffff,#eef9e7)",
                borderRadius: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                fontFamily: "'Poppins', sans-serif"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    color: "#4f772d",
                    marginBottom: "10px"
                }}
            >
                <FaTicketAlt /> Gestión de Cupones
            </h1>

            <p
                style={{
                    textAlign: "center",
                    color: "#666",
                    marginBottom: "35px"
                }}
            >
                Administrá los cupones de descuento de CatMarket.
            </p>

            <form
                onSubmit={agregarCupon}
                style={{
                    display: "grid",
                    gap: "18px",
                    marginBottom: "35px"
                }}
            >

                <input
                    type="text"
                    placeholder="Código del cupón"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    style={input}
                />

                <input
                    type="number"
                    placeholder="Descuento (%)"
                    value={descuento}
                    onChange={(e) => setDescuento(e.target.value)}
                    style={input}
                />

                <button
                    type="submit"
                    style={botonVerde}
                >
                    Agregar Cupón
                </button>

            </form>

            <h3
                style={{
                    color: "#4f772d",
                    marginBottom: "20px"
                }}
            >
                Cupones creados
            </h3>

            {
                cupones.length === 0 ? (

                    <p style={{ color: "#666" }}>
                        Todavía no hay cupones.
                    </p>

                ) : (

                    cupones.map((c) => (

                        <div
                            key={c.id}
                            style={{
                                background: "#fff",
                                border: "1px solid #d7e8c6",
                                borderRadius: "15px",
                                padding: "18px",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                boxShadow: "0 3px 10px rgba(0,0,0,.05)"
                            }}
                        >

                            <div>

                                <strong
                                    style={{
                                        color: "#4f772d",
                                        fontSize: "18px"
                                    }}
                                >
                                    {c.codigo}
                                </strong>

                                <p style={{ margin: "5px 0 0" }}>
                                    {c.descuento}% OFF
                                </p>

                            </div>

                            <button
                                onClick={() => eliminarCupon(c.id)}
                                style={botonEliminar}
                            >
                                <FaTrash />
                            </button>

                        </div>

                    ))

                )
            }

            <div
                style={{
                    marginTop: "35px",
                    textAlign: "center"
                }}
            >
                <Link
                    to="/admin"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                        background: "#4f772d",
                        color: "#fff",
                        padding: "12px 22px",
                        borderRadius: "12px",
                        fontWeight: "600"
                    }}
                >
                    <FaArrowLeft />
                    Volver al Panel de Administración
                </Link>
            </div>

        </div>

    );

}

const input = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #cfd8c5",
    fontSize: "15px",
    boxSizing: "border-box"
};

const botonVerde = {
    background: "linear-gradient(135deg,#8bc34a,#5e9c2d)",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px"
};

const botonEliminar = {
    background: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer"
};

export default Cupones;