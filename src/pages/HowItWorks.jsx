import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { CheckCircle, Search, Users, Calendar, Heart, Shield, Star, Phone, ArrowRight } from "lucide-react";

const STEPS = [
    {
        step: "01", icon: <CheckCircle className="w-8 h-8" />, color: "bg-[#EBF3ED] text-[#4A7C59]",
        title: "Complete a free needs assessment",
        desc: "Answer a few guided questions about your loved one's health, mobility, cognitive status, and preferences. Takes about 5 minutes.",
        details: ["Mobility & physical health questions", "Cognitive and memory evaluation", "Daily living assistance needs", "Budget and timeline"],
    },
    {
        step: "02", icon: <Search className="w-8 h-8" />, color: "bg-[#EBF1F8] text-[#5B7FA6]",
        title: "Browse matched facilities",
        desc: "We show you verified facilities that match your specific needs. Filter by location, price, care level, and amenities.",
        details: ["Personalized facility matches", "Real photos and pricing", "Verified certifications", "Honest family reviews"],
    },
    {
        step: "03", icon: <Users className="w-8 h-8" />, color: "bg-[#FBF3E8] text-[#C67C3A]",
        title: "Compare your top choices",
        desc: "Use our side-by-side comparison tool to evaluate facilities on the factors that matter most to your family.",
        details: ["Side-by-side comparison", "Cost breakdown", "Staff ratios", "Care services offered"],
    },
    {
        step: "04", icon: <Calendar className="w-8 h-8" />, color: "bg-[#F5EBF8] text-[#8B5FA6]",
        title: "Schedule tours",
        desc: "Book in-person or virtual tours directly through Nook. We'll confirm and remind you ahead of time.",
        details: ["In-person or virtual options", "Appointment confirmation", "Tour reminders", "Guided questions to ask"],
    },
    {
        step: "05", icon: <Heart className="w-8 h-8" />, color: "bg-[#EBF3ED] text-[#4A7C59]",
        title: "Connect & make your decision",
        desc: "Message facilities directly, ask questions, and receive personalized support from our care advisors throughout the process.",
        details: ["Direct messaging with staff", "Expert advisor support", "No-cost to families", "Ongoing guidance"],
    },
];

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Hero */}
            <section className="bg-white border-b border-[#E8E4DD] py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-[#EBF3ED] text-[#4A7C59] px-4 py-2 rounded-full text-sm font-medium mb-5">
                        <Heart className="w-4 h-4 fill-[#4A7C59]" />
                        Simple, guided process
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#2D3142] mb-4">How Nook works</h1>
                    <p className="text-[#6B6B6B] text-xl leading-relaxed mb-8">Finding senior care can feel overwhelming. We've simplified the process into clear, manageable steps so your family can make the best decision with confidence.</p>
                    <Link to={createPageUrl("Assessment")}>
                        <button className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 mx-auto">Start Free Assessment <ArrowRight className="w-4 h-4" /></button>
                    </Link>
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
                <div className="space-y-12">
                    {STEPS.map((s, i) => (
                        <div key={s.step} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                            <div className={`w-full md:w-1/2 bg-white rounded-2xl p-8 card-shadow text-center ${s.color.split(' ')[0]} bg-opacity-30`}>
                                <div className={`inline-flex w-20 h-20 rounded-2xl ${s.color} items-center justify-center mb-4`}>
                                    {s.icon}
                                </div>
                                <div className="text-[#8B8B8B] font-semibold text-sm mb-1">Step {s.step}</div>
                                <h2 className="font-display text-xl font-semibold text-[#2D3142]">{s.title}</h2>
                            </div>
                            <div className="w-full md:w-1/2">
                                <p className="text-[#6B6B6B] text-lg leading-relaxed mb-5">{s.desc}</p>
                                <ul className="space-y-2">
                                    {s.details.map(d => (
                                        <li key={d} className="flex items-center gap-2 text-[#6B6B6B] text-sm">
                                            <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0" />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust */}
            <section className="bg-[#2D3142] py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-display text-3xl font-semibold text-white text-center mb-12">Why families choose Nook</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Shield className="w-6 h-6" />, title: "Verified & Licensed", desc: "Every facility on Nook is state-licensed and verified. We check certifications so you don't have to." },
                            { icon: <Star className="w-6 h-6" />, title: "Authentic Reviews", desc: "Real reviews from families just like yours. We verify every review to ensure honesty and accuracy." },
                            { icon: <Phone className="w-6 h-6" />, title: "Free Expert Support", desc: "Our care advisors are available by phone 24/7 to answer questions and guide you through the process." },
                        ].map(item => (
                            <div key={item.title} className="bg-[#3D4357] rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-[#4A7C59]/20 flex items-center justify-center text-[#6B9E78] mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                                <p className="text-[#9DA3B4] text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 text-center">
                <h2 className="font-display text-3xl font-semibold text-[#2D3142] mb-4">Ready to find the right care?</h2>
                <p className="text-[#6B6B6B] text-lg mb-8">It starts with a free 5-minute assessment.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                    <Link to={createPageUrl("Assessment")}>
                        <button className="btn-primary text-base px-8 py-3.5">Start Free Assessment</button>
                    </Link>
                    <Link to={createPageUrl("Search")}>
                        <button className="btn-secondary text-base px-8 py-3.5">Browse Facilities</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}