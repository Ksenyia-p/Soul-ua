import React from 'react';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flex: '1 0 auto', paddingBottom: '200px' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
