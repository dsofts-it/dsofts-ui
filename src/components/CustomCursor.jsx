import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
            return;
        }

        const onMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            const target = e.target;
            const isClickable = target && (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('cursor-pointer') ||
                target.closest('button') ||
                target.closest('a')
            );
            setIsHovered(!!isClickable);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [isVisible]);

    if (isTouchDevice || !isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Small Inner Pointer Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full shadow-sm"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovered ? 0.5 : 1,
                    opacity: 0.9
                }}
                transition={{ type: 'spring', stiffness: 1200, damping: 50, mass: 0.1 }}
            />

            {/* Smooth Trailing Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary-500/60 bg-primary-500/10 backdrop-blur-[1px]"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovered ? 1.8 : 1,
                    borderColor: isHovered ? 'rgba(2, 132, 199, 0.8)' : 'rgba(2, 132, 199, 0.4)',
                    backgroundColor: isHovered ? 'rgba(2, 132, 199, 0.15)' : 'rgba(2, 132, 199, 0.05)'
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
        </div>
    );
};

export default CustomCursor;
