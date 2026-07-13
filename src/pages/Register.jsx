import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registrarUsuario = async (e) => {

        e.preventDefault();

        try {

            const usuario = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Usuario registrado correctamente");

            console.log(usuario.user);

            setEmail("");
            setPassword("");

            navigate("/login");

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 0 20px rgba(0,0,0,.1)"
            }}
        >

            <h2>Registro</h2>

            <form onSubmit={registrarUsuario}>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >
                    Registrarse
                </button>

            </form>

            <p
                style={{
                    textAlign: "center",
                    margin: 0
                }}
            >
                ¿Ya tenés cuenta?{" "}
                <Link
                    to="/login"
                    style={{
                        color: "#1976d2",
                        fontWeight: "bold",
                        textDecoration: "none"
                    }}
                >
                    Iniciá sesión
                </Link>
            </p>

        </div>

    );

}

export default Register;