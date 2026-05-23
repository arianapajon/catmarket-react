import React from 'react';

export default function Main({ children }) {
    return (
        <main
            style={{
                minHeight: '100vh',
                padding: '2rem',
                background:
                    'linear-gradient(to bottom, #fff7e8, #f7e4c7, #fff9f0)'
            }}
        >
            <div
                style={{
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}
            >
                {children}
            </div>
        </main>
    );
}