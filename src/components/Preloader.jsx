import { motion } from 'framer-motion';

const letters = 'DSOFTS'.split('');

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
};

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="text-center space-y-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex gap-3 text-5xl md:text-6xl font-heading tracking-[0.35em] justify-center"
                >
                    {letters.map((letter) => (
                        <motion.span key={letter} variants={letterVariants}>
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>

                <div className="relative h-1 w-56 bg-white/10 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-400 to-secondary-400"
                        initial={{ x: '-100%' }}
                        animate={{ x: '120%' }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
