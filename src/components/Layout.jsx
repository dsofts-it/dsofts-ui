import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowPreloader(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen relative bg-white">
            <CustomCursor />
            {showPreloader && <Preloader />}

            <div className={showPreloader ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-500'}>
                <Navbar />
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow pt-16 md:pt-18"
                >
                    {children}
                </motion.main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
