import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowPreloader(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen relative">
            <CustomCursor />
            {showPreloader && <Preloader />}

            <div className={showPreloader ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-500'}>
                <Navbar />
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow pt-20"
                >
                    {children}
                </motion.main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
