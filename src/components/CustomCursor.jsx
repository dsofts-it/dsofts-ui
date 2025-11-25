import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const [visible, setVisible] = useState(false);
    const target = useRef({ x: -100, y: -100 });
    const current = useRef({ x: -100, y: -100 });
    const [renderPos, setRenderPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const onMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
        };
        const onLeave = () => setVisible(false);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, [visible]);

    // Smooth follow using rAF lerp
    useEffect(() => {
        let raf;
        const tick = () => {
            current.current.x += (target.current.x - current.current.x) * 0.18;
            current.current.y += (target.current.y - current.current.y) * 0.18;
            setRenderPos({ ...current.current });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    // Hide on touch devices to avoid interfering with taps
    useEffect(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (hasTouch) setVisible(false);
    }, []);

    return (
        <div
            className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block transition-opacity duration-200"
            style={{
                transform: `translate(${renderPos.x - 10}px, ${renderPos.y - 10}px)`,
                opacity: visible ? 1 : 0,
                mixBlendMode: 'difference',
            }}
        >
            <div className="h-3 w-3 rounded-full bg-white" />
        </div>
    );
};

export default CustomCursor;
