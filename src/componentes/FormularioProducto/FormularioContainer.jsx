import React, { useState } from 'react';

export default function FormularioContainer({ alAgregarProducto }) {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    const [imagenFile, setImagenFile] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    const [hoverBtn, setHoverBtn] = useState(false);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarImagen = (e) => {
        setImagenFile(e.target.files[0]);
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();

        if (!imagenFile) {
            alert('Seleccioná una imagen');
            return;
        }

        setSubiendo(true);

        const formData = new FormData();
        formData.append('image', imagenFile);

        const apiKey = '39f1bb239c5af860fbef882042aaa618';

        try {
            const respuesta = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await respuesta.json();

            if (data.success) {
                const nuevoProducto = {
                    nombre: datosForm.nombre,
                    precio: Number(datosForm.precio),
                    stock: Number(datosForm.stock),
                    imagen: data.data.url,
                    destacado: false
                };

                alAgregarProducto(nuevoProducto);

                alert('Producto agregado correctamente');

                setDatosForm({
                    nombre: '',
                    precio: '',
                    stock: ''
                });

                setImagenFile(null);
                e.target.reset();
            }
        } catch (error) {
            alert('Ocurrió un error al subir la imagen');
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
                boxShadow:
                    '0 15px 35px rgba(90, 150, 60, 0.18)',
                border: '1px solid rgba(139, 195, 74, 0.25)',
                fontFamily: "'Poppins', sans-serif",
                transition: '0.3s ease'
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2
                    style={{
                        margin: 0,
                        fontSize: '2.3rem',
                        color: '#4b7c1f',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}
                >
                    Crear Producto
                </h2>

                <p
                    style={{
                        marginTop: '0.7rem',
                        color: '#6d7f60',
                        fontSize: '0.98rem'
                    }}
                >
                    Agregá productos a tu catálogo de manera rápida
                </p>
            </div>

            <form
                onSubmit={manejarSubmit}
                style={{
                    display: 'grid',
                    gap: '1.5rem'
                }}
            >
                <div>
                    <label style={estilosLabel}>
                        Nombre del producto
                    </label>

                    <input
                        type="text"
                        name="nombre"
                        value={datosForm.nombre}
                        onChange={manejarCambio}
                        placeholder="Ej: Collar elástico"
                        required
                        style={estilosInput}
                    />
                </div>

                <div
                style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            columnGap: '1.8rem',
            rowGap: '1rem',
            alignItems: 'center'
            }}
            >
                    <div>
                        <label style={estilosLabel}>
                            Precio
                        </label>

                        <input
                            type="number"
                            name="precio"
                            value={datosForm.precio}
                            onChange={manejarCambio}
                            placeholder="Ej: 25000"
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
                            name="stock"
                            value={datosForm.stock}
                            onChange={manejarCambio}
                            placeholder="Ej: 8"
                            required
                            style={estilosInput}
                        />
                    </div>
                </div>

                <div>
                    <label style={estilosLabel}>
                        Imagen del producto
                    </label>

                    <input
                    type="file"
                    accept="image/*"
                    onChange={manejarImagen}
                    required
                    style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '14px',
                    border: '2px dotted #8bc34a',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    color: '#5f6f52',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                    }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={subiendo}
                    onMouseEnter={() => setHoverBtn(true)}
                    onMouseLeave={() => setHoverBtn(false)}
                    style={{
                        background: subiendo
                            ? '#9e9e9e'
                            : 'linear-gradient(135deg, #8bc34a, #5e9c2d)',
                        color: '#fff',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '1rem',
                        letterSpacing: '0.8px',
                        transition: 'all 0.3s ease',
                        transform: hoverBtn
                            ? 'translateY(-3px)'
                            : 'translateY(0)',
                        boxShadow: hoverBtn
                            ? '0 10px 20px rgba(94, 156, 45, 0.35)'
                            : '0 4px 10px rgba(94, 156, 45, 0.2)'
                    }}
                >
                    {subiendo
                        ? 'Subiendo producto...'
                        : 'Guardar Producto'}
                </button>
            </form>
        </section>
    );
}

const estilosLabel = {
    display: 'block',
    marginBottom: '0.6rem',
    color: '#486b25',
    fontWeight: '600',
    fontSize: '0.95rem'
};

const estilosInput = {
    width: '100%',
    padding: '1rem',
    borderRadius: '14px',
    border: '1px solid #c5df9f',
    outline: 'none',
    backgroundColor: '#fff',
    fontSize: '0.95rem',
    color: '#3f4d35',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
    boxSizing: 'border-box'
};