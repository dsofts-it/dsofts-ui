import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'text'
    const [isVisible, setIsVisible] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [ripples, setRipples] = useState([]);
    const [isDarkBg, setIsDarkBg] = useState(false);

    // Motion values for instant ball pointer movement
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth physics spring for outer trailing ball ring
    const auraX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.3 });
    const auraY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.3 });

    // Sharp spring physics for inner small ball pointer
    const dotX = useSpring(mouseX, { stiffness: 1200, damping: 50, mass: 0.05 });
    const dotY = useSpring(mouseY, { stiffness: 1200, damping: 50, mass: 0.05 });

    useEffect(() => {
        // Detect touch devices (tablets/mobile) to keep native touch behavior
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e) => {
            const { clientX: x, clientY: y } = e;

            mouseX.set(x);
            mouseY.set(y);

            if (!isVisible) setIsVisible(true);

            // Check element hover & background color under mouse
            const target = e.target;
            if (target) {
                // Check if background under cursor is dark or colored section (e.g. primary-600 blue or dark-900)
                const computedBg = window.getComputedStyle(target).backgroundColor;
                const closestColoredElem = target.closest?.('.bg-primary-600, .bg-primary-700, .bg-slate-900, .bg-dark-900, [class*="bg-primary"], [class*="bg-slate"]');
                
                // Determine RGB luminosity for automatic contrast/color change
                let isDark = false;
                if (closestColoredElem) {
                    isDark = true;
                } else if (computedBg && computedBg !== 'transparent' && computedBg !== 'rgba(0, 0, 0, 0)') {
                    const rgb = computedBg.match(/\d+/g);
                    if (rgb && rgb.length >= 3) {
                        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                        isDark = brightness < 150;
                    }
                }
                setIsDarkBg(isDark);

                // Check clickable / input elements
                const customText = target.getAttribute?.('data-cursor-text') ||
                    target.closest?.('[data-cursor-text]')?.getAttribute('data-cursor-text');

                const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

                const isClickable = target.tagName === 'BUTTON' ||
                    target.tagName === 'A' ||
                    target.getAttribute?.('role') === 'button' ||
                    target.classList?.contains('cursor-pointer') ||
                    !!target.closest?.('button') ||
                    !!target.closest?.('a') ||
                    !!customText;

                if (customText) {
                    setHoverText(customText);
                } else {
                    setHoverText('');
                }

                if (isText) {
                    setCursorType('text');
                    setIsHovered(false);
                } else if (isClickable) {
                    setCursorType('pointer');
                    setIsHovered(true);
                } else {
                    setCursorType('default');
                    setIsHovered(false);
                }
            }
        };

        const handleMouseDown = (e) => {
            setIsMouseDown(true);
            const newRipple = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY
            };
            setRipples((prev) => [...prev.slice(-3), newRipple]);
        };

        const handleMouseUp = () => setIsMouseDown(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    const removeRipple = (id) => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    if (isTouchDevice || !isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
            {/* Click Ripple Effect */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0.3, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    onAnimationComplete={() => removeRipple(ripple.id)}
                    style={{
                        left: ripple.x - 18,
                        top: ripple.y - 18,
                    }}
                    className={`fixed rounded-full border-2 w-9 h-9 ${
                        isDarkBg
                            ? 'border-cyan-300 bg-cyan-300/30 shadow-[0_0_15px_rgba(103,232,249,0.8)]'
                            : 'border-primary-600 bg-primary-600/30 shadow-[0_0_15px_rgba(2,132,199,0.8)]'
                    }`}
                />
            ))}

            {/* Smooth Trailing Outer Ball Ring */}
            <motion.div
                style={{
                    x: auraX,
                    y: auraY,
                }}
                animate={{
                    scale: isMouseDown ? 0.75 : isHovered ? 2.0 : 1,
                    backgroundColor: isHovered
                        ? isDarkBg ? 'rgba(255, 255, 255, 0.25)' : 'rgba(2, 132, 199, 0.18)'
                        : isDarkBg ? 'rgba(255, 255, 255, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                    borderColor: isDarkBg
                        ? isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)'
                        : isHovered ? 'rgba(2, 132, 199, 0.9)' : 'rgba(2, 132, 199, 0.5)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                className="fixed -top-4 -left-4 w-8 h-8 rounded-full border-2 backdrop-blur-[1px] flex items-center justify-center shadow-sm"
            >
                {hoverText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-bold tracking-wider uppercase text-white bg-slate-900/90 px-2 py-0.5 rounded-full shadow-lg border border-sky-400/40 whitespace-nowrap"
                    >
                        {hoverText}
                    </motion.span>
                )}
            </motion.div>

            {/* Inner Small Ball Pointer */}
            <motion.div
                style={{
                    x: dotX,
                    y: dotY,
                }}
                animate={{
                    scale: isMouseDown ? 0.6 : isHovered ? 0.4 : 1,
                }}
                transition={{ type: 'spring', stiffness: 1000, damping: 45 }}
                className="fixed -top-1.5 -left-1.5 flex items-center justify-center"
            >
                {cursorType === 'text' ? (
                    /* Text Caret Cursor */
                    <motion.div
                        className={`w-1 h-5 rounded-full shadow-md animate-pulse ${
                            isDarkBg ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]' : 'bg-primary-600 shadow-[0_0_8px_rgba(2,132,199,0.9)]'
                        }`}
                    />
                ) : (
                    /* Small Ball Dot Pointer with Dynamic Background Adaptation */
                    <motion.div
                        animate={{
                            backgroundColor: isDarkBg ? '#ffffff' : '#0284c7',
                            boxShadow: isDarkBg
                                ? '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.4)'
                                : '0 0 10px rgba(2, 132, 199, 0.8), 0 0 18px rgba(2, 132, 199, 0.3)',
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-3 h-3 rounded-full border border-white/60"
                    />
                )}
            </motion.div>
        </div>
    );
};

export default CustomCursor;
