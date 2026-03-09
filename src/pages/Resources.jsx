import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { BookOpen, DollarSign, Heart, Shield, ChevronRight, Phone, ExternalLink, FileText } from "lucide-react";

const GUIDES = [
    { icon: <BookOpen className="w-5 h-5" />, color: "bg-[#EBF3ED] text-[#4A7C59]", title: "Understanding Care Levels", desc: "Learn the difference between assisted living, memory care, independent living, skilled nursing, and adult family homes.", readTime: "5 min read" },
    { icon: <DollarSign className="w-5 h-5" />, color: "bg-[#FBF3E8] text-[#C67C3A]", title: "Senior Care Cost Guide", desc: "Understand what affects pricing, what's included, hidden fees, and how to plan financially for long-term care.", readTime: "8 min read" },
    { icon: <Shield className="w-5 h-5" />, color: "bg-[#EBF1F8] text-[#5B7FA6]", title: "Medicare & Medicaid Guide", desc: "What Medicare and Medicaid cover (and don't cover) for senior living. How to apply and what to expect.", readTime: "10 min read" },
    { icon: <Heart className="w-5 h-5" />, color: "bg-[#F5EBF8] text-[#8B5FA6]", title: "Caregiver Wellness", desc: "Resources for family caregivers. Recognizing burnout, setting boundaries, and getting the support you need.", readTime: "6 min read" },
    { icon: <FileText className="w-5 h-5" />, color: "bg-[#EBF3ED] text-[#4A7C59]", title: "Questions to Ask on a Tour", desc: "A comprehensive checklist of the most important questions to ask when touring a senior living facility.", readTime: "4 min read" },
    { icon: <BookOpen className="w-5 h-5" />, color: "bg-[#FBF3E8] text-[#C67C3A]", title: "Veterans Benefits for Senior Care", desc: "Aid & Attendance, Pension benefits, and other VA resources that can help pay for senior care.", readTime: "7 min read" },
];

const FAQS = [
    { q: "How much does assisted living typically cost?", a: "The national median for assisted living is around $4,500/month, though costs range from $3,000 to $8,000+ depending on location, care level, and amenities included." },
    { q: "Does Medicare pay for assisted living?", a: "Medicare does not typically cover assisted living or long-term custodial care. It may cover short-term skilled nursing after a hospital stay. Medicaid may cover some costs depending on the state." },
    { q: "What's the difference between assisted living and memory care?", a: "Assisted living helps with daily activities while memory care is specifically designed for people with Alzheimer's or dementia. Memory care facilities have secured areas, specialized programming, and staff trained in dementia care." },
    { q: "How do I know when it's time to consider senior care?", a: "Signs include difficulty managing medications, declining hygiene, falls or mobility issues, social isolation, nutritional concerns, or cognitive changes that affect daily safety." },
    { q: "What should I look for when touring a facility?", a: "Look for cleanliness, staff attentiveness, resident happiness, safety features, food quality, activity programming, staff-to-resident ratios, and certifications. Ask about staff turnover and how they handle medical emergencies." },
];

export default function Resources() {
    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Hero */}
            <section className="bg-white border-b border-[#E8E4DD] py-14 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#2D3142] mb-4">Senior Care Resources</h1>
                    <p className="text-[#6B6B6B] text-xl leading-relaxed">Guides, tools, and information to help you navigate senior care with clarity and confidence.</p>
                </div>
            </section>

            {/* Guides */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
                <h2 className="font-display text-2xl font-semibold text-[#2D3142] mb-8">Guides & Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {GUIDES.map(g => (
                        <a key={g.title} href="#" className="bg-white rounded-2xl p-6 card-shadow transition-smooth card-shadow-hover group flex gap-4">
                            <div className={`w-12 h-12 rounded-xl ${g.color} flex items-center justify-center shrink-0`}>{g.icon}</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-[#2D3142] mb-1 group-hover:text-[#4A7C59] transition-colors">{g.title}</h3>
                                <p className="text-[#8B8B8B] text-sm leading-relaxed mb-2">{g.desc}</p>
                                <span className="text-xs text-[#B0ADA8]">{g.readTime}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#C0BBB5] group-hover:text-[#4A7C59] transition-colors shrink-0 mt-1" />
                        </a>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white border-t border-b border-[#E8E4DD] py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-2xl font-semibold text-[#2D3142] mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {FAQS.map(faq => (
                            <div key={faq.q} className="bg-[#FAF8F5] rounded-2xl p-6">
                                <h3 className="font-semibold text-[#2D3142] mb-2">{faq.q}</h3>
                                <p className="text-[#6B6B6B] text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* External Links */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
                <h2 className="font-display text-2xl font-semibold text-[#2D3142] mb-8">Helpful External Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { name: "Medicare.gov", desc: "Official Medicare information and coverage details", url: "https://medicare.gov" },
                        { name: "Eldercare Locator", desc: "Federal resource to find local aging services", url: "https://eldercare.acl.gov" },
                        { name: "AARP Caregiver Resources", desc: "Tools and guides for family caregivers", url: "https://aarp.org/caregiving" },
                        { name: "Alzheimer's Association", desc: "Resources for dementia and memory care", url: "https://alz.org" },
                        { name: "Veterans Affairs", desc: "VA benefits for senior care and long-term services", url: "https://va.gov" },
                        { name: "Long-Term Care Ombudsman", desc: "Advocate for nursing home and assisted living residents", url: "https://acl.gov/ltcop" },
                    ].map(r => (
                        <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-5 card-shadow card-shadow-hover transition-smooth group flex items-start gap-3">
                            <ExternalLink className="w-4 h-4 text-[#5B7FA6] mt-0.5 shrink-0" />
                            <div>
                                <p className="font-semibold text-[#2D3142] text-sm group-hover:text-[#4A7C59] transition-colors">{r.name}</p>
                                <p className="text-[#8B8B8B] text-xs mt-0.5">{r.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Helpline */}
            <section className="bg-[#4A7C59] py-14 px-4 text-center">
                <div className="max-w-xl mx-auto">
                    <Phone className="w-10 h-10 text-white/80 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-semibold text-white mb-2">Still have questions?</h2>
                    <p className="text-white/70 text-lg mb-6">Our care advisors are available 24/7 to help you navigate your options at no cost.</p>
                    <a href="tel:1-800-555-6665">
                        <button className="bg-white text-[#4A7C59] font-bold text-lg px-8 py-3.5 rounded-xl hover:bg-[#F5F2ED] transition-colors">
                            Call 1-800-555-NOOK
                        </button>
                    </a>
                </div>
            </section>
        </div>
    );
}