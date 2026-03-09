import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Search, MapPin, Heart, Shield, Star, Phone, ChevronRight, CheckCircle, ArrowRight, Users, Award, Clock } from "lucide-react";

const CARE_TYPES = [
    { label: "Assisted Living", icon: "🏡", desc: "Help with daily activities while maintaining independence", color: "bg-[#EBF3ED] text-[#4A7C59]" },
    { label: "Memory Care", icon: "🧠", desc: "Specialized care for dementia & Alzheimer's", color: "bg-[#EBF1F8] text-[#5B7FA6]" },
    { label: "Independent Living", icon: "🌿", desc: "Active lifestyle communities for seniors", color: "bg-[#FBF3E8] text-[#C67C3A]" },
    { label: "Adult Family Home", icon: "🤝", desc: "Small, homelike settings with personal care", color: "bg-[#F5EBF8] text-[#8B5FA6]" },
];

const FEATURED = [
    {
        name: "Sunrise Gardens",
        type: "Assisted Living",
        city: "Seattle, WA",
        price: 4200,
        rating: 4.8,
        reviews: 127,
        beds: 3,
        img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&q=80",
        badge: "Top Rated",
    },
    {
        name: "Meadowbrook Memory Care",
        type: "Memory Care",
        city: "Bellevue, WA",
        price: 5800,
        rating: 4.9,
        reviews: 89,
        beds: 1,
        img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80",
        badge: "Award Winner",
    },
    {
        name: "Harborview Residence",
        type: "Independent Living",
        city: "Tacoma, WA",
        price: 3100,
        rating: 4.7,
        reviews: 204,
        beds: 7,
        img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80",
        badge: "Best Value",
    },
];

const TESTIMONIALS = [
    {
        quote: "Nook helped us find a wonderful memory care facility for my mother in just two weeks. The guidance was invaluable during such a stressful time.",
        name: "Margaret T.",
        relation: "Daughter",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    },
    {
        quote: "I was overwhelmed by all the choices. The assessment tool helped me understand exactly what my dad needed and narrowed it down to three perfect options.",
        name: "Robert K.",
        relation: "Son",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    {
        quote: "Professional, compassionate, and thorough. We toured 4 facilities and found the perfect fit. I can't thank Nook enough.",
        name: "Linda S.",
        relation: "Spouse",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
];

export default function Home() {
    const [searchLocation, setSearchLocation] = useState("");
    const [careType, setCareType] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchLocation) params.set("location", searchLocation);
        if (careType) params.set("type", careType);
        navigate(`${createPageUrl("Search")}?${params.toString()}`);
    };

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#2D3142] via-[#374057] to-[#4A5568] py-20 md:py-28">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=60" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D3142]/90 to-[#4A7C59]/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Heart className="w-4 h-4 text-[#6B9E78] fill-[#6B9E78]" />
                        <span className="text-white text-sm font-medium">Trusted by 50,000+ families nationwide</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight mb-5 max-w-3xl mx-auto">
                        Find the right care for<br />
                        <span className="text-[#6B9E78]">someone you love</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Compare verified senior living communities, read authentic reviews, and get personalized guidance — all in one trusted place.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-2xl p-3 max-w-3xl mx-auto shadow-2xl flex flex-col md:flex-row gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-[#FAF8F5] rounded-xl px-4 py-3">
                            <MapPin className="w-5 h-5 text-[#4A7C59] shrink-0" />
                            <input
                                type="text"
                                placeholder="City, state, or ZIP code"
                                value={searchLocation}
                                onChange={e => setSearchLocation(e.target.value)}
                                className="w-full bg-transparent text-[#2D3142] text-base outline-none placeholder-[#B0ADA8]"
                                onKeyDown={e => e.key === "Enter" && handleSearch()}
                            />
                        </div>
                        <select
                            value={careType}
                            onChange={e => setCareType(e.target.value)}
                            className="flex-1 bg-[#FAF8F5] rounded-xl px-4 py-3 text-[#2D3142] text-base outline-none appearance-none cursor-pointer"
                        >
                            <option value="">All Care Types</option>
                            {CARE_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                        </select>
                        <button onClick={handleSearch} className="btn-primary flex items-center gap-2 whitespace-nowrap md:w-auto w-full justify-center">
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                    </div>

                    <p className="text-white/50 text-sm mt-4">
                        Or <Link to={createPageUrl("Assessment")} className="text-[#6B9E78] hover:text-[#8FC49E] underline font-medium">take our free assessment</Link> to get personalized recommendations
                    </p>
                </div>
            </section>

            {/* Trust Strip */}
            <div className="bg-white border-b border-[#E8E4DD]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-[#6B6B6B]">
                        {[
                            { icon: <Shield className="w-4 h-4 text-[#4A7C59]" />, text: "All facilities licensed & verified" },
                            { icon: <Star className="w-4 h-4 text-[#F59E0B]" />, text: "200,000+ authentic family reviews" },
                            { icon: <CheckCircle className="w-4 h-4 text-[#4A7C59]" />, text: "No cost to families" },
                            { icon: <Phone className="w-4 h-4 text-[#5B7FA6]" />, text: "24/7 placement specialists" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 font-medium">
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Care Types */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#2D3142] mb-3">What type of care are you looking for?</h2>
                    <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Each care type offers different levels of support. We'll help you find the right fit.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CARE_TYPES.map(ct => (
                        <Link
                            key={ct.label}
                            to={`${createPageUrl("Search")}?type=${encodeURIComponent(ct.label)}`}
                            className="bg-white rounded-2xl p-6 card-shadow transition-smooth card-shadow-hover border border-transparent hover:border-[#E8E4DD] group"
                        >
                            <div className="text-3xl mb-4">{ct.icon}</div>
                            <h3 className="font-semibold text-[#2D3142] text-lg mb-2 group-hover:text-[#4A7C59] transition-colors">{ct.label}</h3>
                            <p className="text-[#8B8B8B] text-sm leading-relaxed">{ct.desc}</p>
                            <div className="mt-4 flex items-center gap-1 text-[#4A7C59] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                                Explore <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Facilities */}
            <section className="bg-[#F5F2ED] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#2D3142] mb-2">Featured communities</h2>
                            <p className="text-[#6B6B6B] text-lg">Highly rated facilities in your area</p>
                        </div>
                        <Link to={createPageUrl("Search")} className="hidden md:flex items-center gap-1 text-[#4A7C59] font-semibold text-sm hover:gap-2 transition-all">
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {FEATURED.map(f => (
                            <Link key={f.name} to={createPageUrl("FacilityDetail")} className="bg-white rounded-2xl overflow-hidden card-shadow transition-smooth card-shadow-hover group">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#4A7C59] text-white text-xs font-semibold px-3 py-1 rounded-full">{f.badge}</span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                                            <Heart className="w-4 h-4 text-[#8B8B8B]" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-semibold text-[#2D3142] text-lg">{f.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-medium bg-[#EBF3ED] text-[#4A7C59] px-2 py-0.5 rounded-full">{f.type}</span>
                                        <span className="text-[#8B8B8B] text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{f.city}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[#2D3142] font-bold text-lg">${f.price.toLocaleString()}</span>
                                            <span className="text-[#8B8B8B] text-sm">/mo</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                                            <span className="font-semibold text-[#2D3142] text-sm">{f.rating}</span>
                                            <span className="text-[#8B8B8B] text-xs">({f.reviews})</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-[#F0EDE7] flex items-center justify-between">
                                        <span className="text-sm text-[#4A7C59] font-medium">{f.beds} bed{f.beds !== 1 ? 's' : ''} available</span>
                                        <span className="text-xs text-[#8B8B8B] font-medium group-hover:text-[#4A7C59] transition-colors flex items-center gap-1">View details <ChevronRight className="w-3 h-3" /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#2D3142] mb-3">How Nook helps you</h2>
                    <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Finding the right care doesn't have to be overwhelming. We guide you every step of the way.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: "01", icon: <CheckCircle className="w-6 h-6" />, title: "Complete assessment", desc: "Answer a few questions about your loved one's needs, preferences, and budget." },
                        { step: "02", icon: <Search className="w-6 h-6" />, title: "Browse matched facilities", desc: "See verified facilities that match your specific needs with real photos and pricing." },
                        { step: "03", icon: <Users className="w-6 h-6" />, title: "Compare & connect", desc: "Compare options side by side and connect directly with facility staff." },
                        { step: "04", icon: <Heart className="w-6 h-6" />, title: "Schedule a tour", desc: "Book an in-person or virtual tour at your convenience." },
                    ].map(item => (
                        <div key={item.step} className="text-center group">
                            <div className="relative mb-5 inline-flex">
                                <div className="w-14 h-14 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#4A7C59] group-hover:bg-[#4A7C59] group-hover:text-white transition-all duration-300">
                                    {item.icon}
                                </div>
                                <span className="absolute -top-2 -right-2 text-xs font-bold text-[#8B8B8B] bg-[#F0EDE7] w-6 h-6 rounded-full flex items-center justify-center">{item.step}</span>
                            </div>
                            <h3 className="font-semibold text-[#2D3142] text-lg mb-2">{item.title}</h3>
                            <p className="text-[#8B8B8B] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to={createPageUrl("Assessment")}>
                        <button className="btn-primary text-base px-8 py-3">Start Free Assessment</button>
                    </Link>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-[#2D3142] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">Families trust Nook</h2>
                        <p className="text-[#9DA3B4] text-lg">Real stories from families who found the right care</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map(t => (
                            <div key={t.name} className="bg-[#3D4357] rounded-2xl p-7">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />)}
                                </div>
                                <p className="text-[#D1D5E0] text-base leading-relaxed mb-6">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-white text-sm">{t.name}</p>
                                        <p className="text-[#9DA3B4] text-xs">{t.relation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-r from-[#4A7C59] to-[#5B7FA6] rounded-3xl p-10 md:p-14">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { number: "12,000+", label: "Verified Facilities" },
                            { number: "50,000+", label: "Families Helped" },
                            { number: "48 hrs", label: "Avg. Match Time" },
                            { number: "4.9/5", label: "Family Satisfaction" },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="font-display text-3xl md:text-4xl font-semibold mb-2">{s.number}</div>
                                <div className="text-white/70 text-sm">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Urgent CTA */}
            <section className="bg-[#FFF8F0] border-t border-[#F0E4CC] py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#FDE8C9] text-[#C67C3A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Clock className="w-4 h-4" />
                        Urgent Placement Available
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#2D3142] mb-3">Need care quickly?</h2>
                    <p className="text-[#6B6B6B] text-lg mb-6">Our placement specialists are available 24/7 to help with urgent situations. We can often find placements within 24–48 hours.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="tel:1-800-555-6665">
                            <button className="btn-primary bg-[#C67C3A] hover:bg-[#A8682E] flex items-center gap-2 w-full sm:w-auto justify-center">
                                <Phone className="w-4 h-4" />
                                Call Now: 1-800-555-NOOK
                            </button>
                        </a>
                        <Link to={createPageUrl("Assessment")}>
                            <button className="btn-secondary border-[#C67C3A] text-[#C67C3A] hover:bg-[#FDE8C9] w-full sm:w-auto">Start Online Assessment</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}