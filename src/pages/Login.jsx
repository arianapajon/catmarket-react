import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const iniciarSesion = async (e) => {

        e.preventDefault();

        try {

            const usuario = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("¡Bienvenido!");

            navigate("/admin");
            
            console.log(usuario.user);

        } catch (error) {

            alert("Correo o contraseña incorrectos.");

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

            <h2>Iniciar sesión</h2>

            <form onSubmit={iniciarSesion}>

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
                        cursor: "pointer"
                    }}
                >
                    Iniciar sesión
                </button>

            </form>

        </div>

    );

}

export default Login;