import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <SEO
                title="Terms & Conditions"
                description="Terms and conditions for using DSofts IT Services platform and software development services."
            />

            <div className="container-custom max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Terms & Conditions</h1>
                <p className="text-xs text-slate-500 font-medium">Last updated: October 2026</p>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
                    <p>
                        Welcome to DSofts IT Services (<strong>dsofts.in</strong>). By accessing our website, browsing our portfolio, or requesting software engineering services, you agree to comply with the following Terms and Conditions.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">1. Services Scope</h2>
                    <p>
                        DSofts IT Services provides custom web development, mobile application engineering, full-stack software development, SaaS engineering, and technology consulting. All specific client deliverables are governed by formal project statements of work (SOW) executed between DSofts and the client.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">2. Intellectual Property</h2>
                    <p>
                        All original website content, branding assets, logos, text, designs, and code snippets on dsofts.in are the exclusive property of DSofts IT Services. Client deliverables created under contract belong to the client upon full payment.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">3. User Conduct</h2>
                    <p>
                        Users agree not to attempt unauthorized access to administrative portals, modify server assets, submit malicious scripts, or attempt unauthorized access to candidate application databases.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">4. Contact & Inquiries</h2>
                    <p>
                        For inquiries regarding these terms, reach us at: <strong>dsofts.itservices@gmail.com</strong>.
                    </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <Link to="/" className="btn btn-secondary text-sm">Return to Home Page</Link>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
