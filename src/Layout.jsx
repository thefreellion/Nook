import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { useState } from "react";
import { Menu, X, Phone, Heart, ChevronDown } from "lucide-react";

export default function Layout({ children, currentPageName }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { label: "Find Care", page: "Search" },
        { label: "How It Works", page: "HowItWorks" },
        { label: "Resources", page: "Resources" },
        { label: "For Facilities", page: "AdminDashboard" },
        { label: "ERD", page: "ERD" },
        { label: "API Docs", page: "ApiDocs" },
    ];

    const isActive = (page) => currentPageName === page;

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        :root {
          --sage: #4A7C59;
          --sage-light: #6B9E78;
          --sage-pale: #EBF3ED;
          --slate: #5B7FA6;
          --slate-light: #7FA3C9;
          --slate-pale: #EBF1F8;
          --cream: #FAF8F5;
          --cream-dark: #F0EDE7;
          --charcoal: #2D3142;
          --warm-gray: #8B8B8B;
          --text-soft: #6B6B6B;
        }
        .btn-primary {
          background: var(--sage);
          color: white;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover { background: #3d6849; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(74,124,89,0.3); }
        .btn-secondary {
          background: transparent;
          color: var(--sage);
          border: 2px solid var(--sage);
          border-radius: 8px;
          padding: 10px 22px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-secondary:hover { background: var(--sage-pale); }
        .card-shadow { box-shadow: 0 2px 12px rgba(45,49,66,0.08); }
        .card-shadow-hover:hover { box-shadow: 0 8px 32px rgba(45,49,66,0.14); transform: translateY(-2px); }
        .transition-smooth { transition: all 0.25s ease; }
      `}</style>

            {/* Emergency Banner */}
            <div className="bg-[#2D3142] text-white text-center py-2 px-4 text-sm">
                <span className="font-medium">Need urgent placement?</span>
                <span className="mx-2 opacity-60">•</span>
                <a href="tel:1-800-555-NOOK" className="underline font-semibold hover:text-[#6B9E78] transition-colors">
                    Call our 24/7 helpline: 1-800-555-NOOK
                </a>
            </div>

            {/* Nav */}
            <nav className="bg-white border-b border-[#E8E4DD] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-[#4A7C59] flex items-center justify-center">
                                <Heart className="w-4 h-4 text-white fill-white" />
                            </div>
                            <span className="font-display text-xl font-semibold text-[#2D3142] group-hover:text-[#4A7C59] transition-colors">Nook</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`text-sm font-medium transition-colors ${isActive(link.page) ? 'text-[#4A7C59]' : 'text-[#6B6B6B] hover:text-[#2D3142]'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to={createPageUrl("Assessment")} className="text-sm font-semibold text-[#5B7FA6] hover:text-[#4A7C59] transition-colors">
                                Take Assessment
                            </Link>
                            <Link to={createPageUrl("FamilyDashboard")}>
                                <button className="btn-primary text-sm px-4 py-2">My Dashboard</button>
                            </Link>
                        </div>

                        {/* Mobile */}
                        <button className="md:hidden p-2 text-[#2D3142]" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-white border-t border-[#E8E4DD] px-4 py-4 space-y-3">
                        {navLinks.map(link => (
                            <Link key={link.page} to={createPageUrl(link.page)} className="block text-base font-medium text-[#2D3142] py-2" onClick={() => setMobileOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-[#E8E4DD] space-y-2">
                            <Link to={createPageUrl("Assessment")} onClick={() => setMobileOpen(false)}>
                                <button className="w-full btn-secondary text-sm">Take Assessment</button>
                            </Link>
                            <Link to={createPageUrl("FamilyDashboard")} onClick={() => setMobileOpen(false)}>
                                <button className="w-full btn-primary text-sm">My Dashboard</button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#2D3142] text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[#4A7C59] flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-white fill-white" />
                                </div>
                                <span className="font-display text-xl font-semibold">Nook</span>
                            </div>
                            <p className="text-[#9DA3B4] text-sm leading-relaxed">Helping families find the right senior care with compassion and clarity.</p>
                            <div className="mt-4 flex items-center gap-2 text-[#6B9E78]">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-semibold">1-800-555-NOOK</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-[#9DA3B4]">Find Care</h4>
                            <ul className="space-y-2 text-sm text-[#9DA3B4]">
                                {["Assisted Living", "Memory Care", "Independent Living", "Adult Family Home", "Skilled Nursing"].map(t => (
                                    <li key={t}><Link to={createPageUrl("Search")} className="hover:text-white transition-colors">{t}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-[#9DA3B4]">Resources</h4>
                            <ul className="space-y-2 text-sm text-[#9DA3B4]">
                                {["How to Choose", "Cost Guide", "Medicare & Medicaid", "Caregiver Support", "Assessment Tool"].map(t => (
                                    <li key={t}><a href="#" className="hover:text-white transition-colors">{t}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-[#9DA3B4]">For Providers</h4>
                            <ul className="space-y-2 text-sm text-[#9DA3B4]">
                                {["List Your Facility", "Admin Dashboard", "Update Listing", "Contact Us"].map(t => (
                                    <li key={t}><a href="#" className="hover:text-white transition-colors">{t}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-[#3D4357] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#9DA3B4] text-sm">
                        <p>© 2026 Nook Care, Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}