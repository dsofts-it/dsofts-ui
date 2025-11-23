import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import FeaturedProjects from '../components/FeaturedProjects';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <>
            <Hero />
            <ServicesSection />
            <FeaturedProjects />

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10">
                            Let's collaborate to build something amazing. We're here to turn your vision into reality.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="btn btn-primary text-lg px-8">
                                Get a Quote
                            </a>
                            <a href="/portfolio" className="btn btn-outline text-lg px-8">
                                View Our Work
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;
