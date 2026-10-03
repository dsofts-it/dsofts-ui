import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const LegalPrivacy = () => {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy and candidate data protection policy for DSofts IT Services."
            />

            <div className="container-custom max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Privacy Policy</h1>
                <p className="text-xs text-slate-500 font-medium">Last updated: October 2026</p>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
                    <p>
                        At DSofts IT Services (<strong>dsofts.in</strong>), protecting your privacy and personal data is a primary commitment. This Privacy Policy explains how we collect, process, and safeguard information provided when using our website, submitting project inquiries, or applying for career opportunities.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Contact & Project Inquiries:</strong> Name, email address, phone number, company name, service requirement, and budget details.</li>
                        <li><strong>Job Applicants:</strong> Full name, contact info, experience, skills, social profiles (LinkedIn, GitHub), cover letter, and uploaded resume documents (PDF/DOC/DOCX).</li>
                        <li><strong>Technical Telemetry:</strong> IP addresses, browser type, device information, and standard website usage analytics.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">2. How Candidate Resumes & Data Are Protected</h2>
                    <p>
                        Candidate resume uploads and personal data submitted through our Careers portal are strictly restricted to authorized DSofts internal HR and hiring managers. Candidate documents are stored securely in non-public file storage and are never sold or shared with external third parties.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">3. Use of Information</h2>
                    <p>
                        Information collected is used solely to respond to project requests, evaluate job candidates, improve user experience, and fulfill contractual obligations.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 font-heading mt-6">4. Contact Information</h2>
                    <p>
                        If you have any questions regarding this Privacy Policy or wish to request data removal, please contact us at: <strong>dsofts.itservices@gmail.com</strong>.
                    </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <Link to="/" className="btn btn-secondary text-sm">Return to Home Page</Link>
                </div>
            </div>
        </div>
    );
};

export default LegalPrivacy;
