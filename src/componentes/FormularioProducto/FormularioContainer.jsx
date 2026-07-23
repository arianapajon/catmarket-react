import React, { useState, useEffect } from 'react';
import { ButtonStyled } from "../../styles/ButtonStyled";

export default function FormularioContainer({
    alAgregarProducto,
    productoEditar,
    setProductoEditar,
    editarProducto
}) {

    const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    categoria: "",
    destacado: false
});

    const [imagenFile, setImagenFile] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    const [hoverBtn, setHoverBtn] = useState(false);

    useEffect(() => {

        if (productoEditar) {

            setDatosForm({
    nombre: productoEditar.nombre,
    precio: productoEditar.precio,
    stock: productoEditar.stock || "",
    descripcion: productoEditar.descripcion || "",
    categoria: productoEditar.categoria || "",
    destacado: productoEditar.destacado || false
});

        } else {

            setDatosForm({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    categoria: "",
    destacado: false
});

        }

    }, [productoEditar]);

    const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosForm({
        ...datosForm,
        [name]: type === "checkbox" ? checked : value
    });
};

    const manejarImagen = (e) => {

        setImagenFile(e.target.files[0]);

    };

    const manejarSubmit = async (e) => {

        e.preventDefault();

        if (datosForm.nombre.trim() === "") {
    alert("El nombre es obligatorio.");
    return;
}

if (Number(datosForm.precio) <= 0) {
    alert("El precio debe ser mayor a 0.");
    return;
}

if (Number(datosForm.stock) < 0) {
    alert("El stock no puede ser negativo.");
    return;
}

        if (!imagenFile && !productoEditar) {
            alert("Seleccioná una imagen.");
            return;
        }

        setSubiendo(true);

        try {

            let imagenURL = productoEditar?.imagen || "";

            if (imagenFile) {

                const formData = new FormData();
                formData.append("image", imagenFile);

                const respuesta = await fetch(
                    "https://api.imgbb.com/1/upload?key=39f1bb239c5af860fbef882042aaa618",
                    {
                        method: "POST",
                        body: formData
                    }
                );

                const data = await respuesta.json();

                if (!data.success) {
                    throw new Error("No se pudo subir la imagen.");
                }

                imagenURL = data.data.url;
            }

            const producto = {
    nombre: datosForm.nombre,
    precio: Number(datosForm.precio),
    stock: Number(datosForm.stock),
    descripcion: datosForm.descripcion,
    categoria: datosForm.categoria,
    destacado: datosForm.destacado,
    imagen: imagenURL
};

            if (productoEditar) {

                await editarProducto({
                    ...productoEditar,
                    ...producto
                });

                setProductoEditar(null);

            } else {

                await alAgregarProducto(producto);

            }

            setDatosForm({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    categoria: "",
    destacado: false
});

            setImagenFile(null);

            e.target.reset();

        } catch (error) {

            console.error(error);
            alert("Ocurrió un error.");

        } finally {

            setSubiendo(false);

        }

    };
        return (
        <section
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(230,255,210,0.9))',
                backdropFilter: 'blur(10px)',
                padding: '2.8rem',
                borderRadius: '28px',
                maxWidth: '700px',
                margin: '3rem auto',
                boxShadow: '0 15px 35px rgba(90,150,60,0.18)',
                border: '1px solid rgba(139,195,74,0.25)',
                fontFamily: "'Poppins', sans-serif"
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "2.5rem"
                }}
            >

                <h2
                    style={{
                        margin: 0,
                        fontSize: "2.3rem",
                        color: "#4b7c1f"
                    }}
                >
                    {productoEditar
                        ? "Editar Producto"
                        : "Crear Producto"}
                </h2>

                <p
                    style={{
                        marginTop: ".7rem",
                        color: "#6d7f60"
                    }}
                >
                    {productoEditar
                        ? "Modificá la información del producto."
                        : "Agregá productos a tu catálogo."}
                </p>

            </div>

            <form
                onSubmit={manejarSubmit}
                style={{
                    display: "grid",
                    gap: "1.5rem"
                }}
            >

                <div>

                    <label style={estilosLabel}>
                        Nombre
                    </label>

                    <input
                        type="text"
                        name="nombre"
                        value={datosForm.nombre}
                        onChange={manejarCambio}
                        required
                        style={estilosInput}
                    />

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem"
                    }}
                >

                    <div>

                        <label style={estilosLabel}>
                            Precio
                        </label>

                        <input
                            type="number"
                            min="1"
                            name="precio"
                            value={datosForm.precio}
                            onChange={manejarCambio}
                            required
                            style={estilosInput}
                        />

                    </div>

                    <div>

                        <label style={estilosLabel}>
                            Stock
                        </label>

                        <input
                            type="number"
                            min="0"
                            name="stock"
                            value={datosForm.stock}
                            onChange={manejarCambio}
                            required
                            style={estilosInput}
                        />
                    </div>

                    <div>
    <label style={estilosLabel}>
        Descripción
    </label>

    <textarea
        name="descripcion"
        value={datosForm.descripcion}
        onChange={manejarCambio}
        rows="5"
        style={{
            ...estilosInput,
            resize: "vertical"
        }}
    />

</div>

<div>

    <label style={estilosLabel}>
        Categoría
    </label>

    <select
        name="categoria"
        value={datosForm.categoria}
        onChange={manejarCambio}
        required
        style={estilosInput}
    >
        <option value="">Seleccionar categoría</option>
        <option value="Juguetes">Juguetes</option>
        <option value="Rascadores">Rascadores y Camas</option>
        <option value="Accesorios">Accesorios</option>
    </select>

</div>

<div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }}
>

    <input
        type="checkbox"
        name="destacado"
        checked={datosForm.destacado}
        onChange={manejarCambio}
    />
    <label>
        Mostrar en destacados
    </label>
</div>

                </div>

                <div>

                    <label style={estilosLabel}>
                        Imagen
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={manejarImagen}
                        required={!productoEditar}
                        style={{
                            width: "100%",
                            padding: ".9rem",
                            borderRadius: "14px",
                            border: "2px dotted #8bc34a",
                            boxSizing: "border-box"
                        }}
                    />

                </div>

                <ButtonStyled
                    type="submit"
                    disabled={subiendo}
                    onMouseEnter={() => setHoverBtn(true)}
                    onMouseLeave={() => setHoverBtn(false)}
                    style={{
                        background:
                            subiendo
                                ? "#9e9e9e"
                                : "linear-gradient(135deg,#8bc34a,#5e9c2d)",
                        color: "#fff",
                        border: "none",
                        padding: "1rem",
                        borderRadius: "16px",
                        cursor: "pointer",
                        fontWeight: "700",
                        transform:
                            hoverBtn
                                ? "translateY(-3px)"
                                : "translateY(0)",
                        transition: ".3s"
                    }}
                >

                    {subiendo
                        ? "Guardando..."
                        : productoEditar
                            ? "Actualizar Producto"
                            : "Guardar Producto"}

                </ButtonStyled>

            </form>

        </section>
    );

}

const estilosLabel = {
    display: "block",
    marginBottom: ".6rem",
    color: "#486b25",
    fontWeight: "600"
};

const estilosInput = {
    width: "100%",
    padding: "1rem",
    borderRadius: "14px",
    border: "1px solid #c5df9f",
    outline: "none",
    boxSizing: "border-box"
};