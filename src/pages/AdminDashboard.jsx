import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { BarChart2, Users, Calendar, Star, MessageSquare, Bell, TrendingUp, Bed, Clock, CheckCircle, AlertCircle, ChevronRight, Eye, Phone, Mail } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const occupancyData = [
    { month: "Oct", occupancy: 87 }, { month: "Nov", occupancy: 89 }, { month: "Dec", occupancy: 85 },
    { month: "Jan", occupancy: 91 }, { month: "Feb", occupancy: 93 }, { month: "Mar", occupancy: 90 },
];

const inquiryData = [
    { month: "Oct", inquiries: 18 }, { month: "Nov", inquiries: 22 }, { month: "Dec", inquiries: 15 },
    { month: "Jan", inquiries: 28 }, { month: "Feb", inquiries: 32 }, { month: "Mar", inquiries: 24 },
];

const TOUR_REQUESTS = [
    { id: "1", name: "Linda Patterson", date: "March 14, 2026", time: "10:00 AM", type: "In-Person", lovedOne: "Robert P., 79", careLevel: "Assisted Living", status: "Pending", phone: "(206) 555-0198" },
    { id: "2", name: "David Kim", date: "March 15, 2026", time: "2:00 PM", type: "Virtual", lovedOne: "Margaret K., 84", careLevel: "Memory Care", status: "Confirmed", phone: "(206) 555-0277" },
    { id: "3", name: "Susan Chen", date: "March 18, 2026", time: "11:00 AM", type: "In-Person", lovedOne: "Frank C., 81", careLevel: "Assisted Living", status: "Pending", phone: "(206) 555-0341" },
];

const WAITLIST = [
    { name: "Margaret Collins", age: 82, careLevel: "Memory Care", addedDate: "Feb 1", priority: "High", contact: "(425) 555-0128" },
    { name: "Harold Stevens", age: 78, careLevel: "Assisted Living", addedDate: "Feb 14", priority: "Medium", contact: "(206) 555-0192" },
    { name: "Dorothy Walsh", age: 90, careLevel: "Assisted Living", addedDate: "Mar 1", priority: "High", contact: "(253) 555-0217" },
];

const RECENT_REVIEWS = [
    { author: "Linda T.", rating: 5, text: "Wonderful staff and beautiful facility. My mother is very happy here.", date: "March 3" },
    { author: "Robert K.", rating: 4, text: "Great care. Would appreciate more evening activities.", date: "February 28" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const stats = [
        { label: "Occupancy Rate", value: "90%", change: "+2%", icon: <Bed className="w-5 h-5" />, color: "text-[#4A7C59]", bg: "bg-[#EBF3ED]" },
        { label: "Pending Inquiries", value: "12", change: "+4 this week", icon: <MessageSquare className="w-5 h-5" />, color: "text-[#5B7FA6]", bg: "bg-[#EBF1F8]" },
        { label: "Tours Scheduled", value: "7", change: "Next: Mar 14", icon: <Calendar className="w-5 h-5" />, color: "text-[#C67C3A]", bg: "bg-[#FBF3E8]" },
        { label: "Average Rating", value: "4.8", change: "127 reviews", icon: <Star className="w-5 h-5" />, color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
    ];

    const tabs = [
        { id: "overview", label: "Overview", icon: <BarChart2 className="w-4 h-4" /> },
        { id: "tours", label: "Tour Requests", icon: <Calendar className="w-4 h-4" /> },
        { id: "waitlist", label: "Waitlist", icon: <Users className="w-4 h-4" /> },
        { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
    ];

    const statusColors = { Pending: "bg-[#FBF3E8] text-[#C67C3A]", Confirmed: "bg-[#EBF3ED] text-[#4A7C59]", Cancelled: "bg-[#FEE2E2] text-[#EF4444]" };
    const priorityColors = { High: "bg-[#FEE2E2] text-[#EF4444]", Medium: "bg-[#FBF3E8] text-[#C67C3A]", Low: "bg-[#EBF3ED] text-[#4A7C59]" };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div>
                        <p className="text-[#8B8B8B] text-sm mb-1">Facility Management</p>
                        <h1 className="font-display text-3xl font-semibold text-[#2D3142]">Sunrise Gardens</h1>
                        <p className="text-[#8B8B8B] text-sm">Seattle, WA · Assisted Living · 64 beds</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="relative p-2.5 bg-white rounded-xl border border-[#E8E4DD] hover:bg-[#FAF8F5] transition-colors">
                            <Bell className="w-5 h-5 text-[#6B6B6B]" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E05B5B] rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
                        </button>
                        <button className="btn-primary text-sm px-4 py-2.5 flex items-center gap-2">
                            <Eye className="w-4 h-4" /> View Public Listing
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white rounded-2xl p-5 card-shadow">
                            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3`}>
                                {s.icon}
                            </div>
                            <div className="font-bold text-[#2D3142] text-2xl mb-0.5">{s.value}</div>
                            <div className="text-[#8B8B8B] text-xs">{s.label}</div>
                            <div className={`text-xs font-medium mt-1 ${s.color}`}>{s.change}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-[#F0EDE7] rounded-xl p-1 mb-6 overflow-x-auto">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${activeTab === t.id ? 'bg-white text-[#2D3142] card-shadow' : 'text-[#8B8B8B] hover:text-[#2D3142]'}`}
                        >
                            {t.icon}
                            <span className="hidden sm:block">{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 card-shadow">
                                <h3 className="font-semibold text-[#2D3142] mb-4">Occupancy Rate (6 months)</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={occupancyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE7" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B8B8B" }} />
                                        <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "#8B8B8B" }} unit="%" />
                                        <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", border: "1px solid #E8E4DD" }} />
                                        <Line type="monotone" dataKey="occupancy" stroke="#4A7C59" strokeWidth={2.5} dot={{ fill: "#4A7C59" }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white rounded-2xl p-6 card-shadow">
                                <h3 className="font-semibold text-[#2D3142] mb-4">Monthly Inquiries</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={inquiryData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE7" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B8B8B" }} />
                                        <YAxis tick={{ fontSize: 12, fill: "#8B8B8B" }} />
                                        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E8E4DD" }} />
                                        <Bar dataKey="inquiries" fill="#5B7FA6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bed availability */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h3 className="font-semibold text-[#2D3142] mb-4">Current Bed Availability</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { type: "Standard Room", total: 20, available: 2, color: "#4A7C59" },
                                    { type: "Memory Care Suite", total: 16, available: 1, color: "#5B7FA6" },
                                    { type: "Private Suite", total: 14, available: 0, color: "#C67C3A" },
                                    { type: "Semi-Private", total: 14, available: 0, color: "#8B5FA6" },
                                ].map(room => (
                                    <div key={room.type} className="bg-[#FAF8F5] rounded-xl p-4">
                                        <div className="text-sm font-medium text-[#2D3142] mb-2">{room.type}</div>
                                        <div className="text-2xl font-bold mb-1" style={{ color: room.color }}>{room.available}</div>
                                        <div className="text-xs text-[#8B8B8B]">of {room.total} available</div>
                                        <div className="mt-2 w-full bg-[#E8E4DD] rounded-full h-1.5">
                                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${((room.total - room.available) / room.total) * 100}%`, backgroundColor: room.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h3 className="font-semibold text-[#2D3142] mb-4">Action Items</h3>
                            <div className="space-y-2">
                                {[
                                    { icon: <AlertCircle className="w-4 h-4 text-[#C67C3A]" />, text: "3 tour requests awaiting confirmation", action: "Review" },
                                    { icon: <MessageSquare className="w-4 h-4 text-[#5B7FA6]" />, text: "2 unread family messages", action: "Reply" },
                                    { icon: <Star className="w-4 h-4 text-[#F59E0B]" />, text: "1 new review to respond to", action: "Respond" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-sm text-[#2D3142]">{item.text}</span>
                                        </div>
                                        <button className="text-xs font-semibold text-[#4A7C59] hover:underline">{item.action}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tour Requests */}
                {activeTab === "tours" && (
                    <div className="space-y-4">
                        {TOUR_REQUESTS.map(t => (
                            <div key={t.id} className="bg-white rounded-2xl p-5 card-shadow">
                                <div className="flex items-start justify-between flex-wrap gap-3">
                                    <div>
                                        <h3 className="font-semibold text-[#2D3142] text-base">{t.name}</h3>
                                        <p className="text-[#8B8B8B] text-sm mb-2">For: {t.lovedOne} · {t.careLevel}</p>
                                        <div className="flex items-center gap-3 text-sm text-[#6B6B6B] flex-wrap">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.time}</span>
                                            <span className="bg-[#F5F2ED] text-[#6B6B6B] px-2 py-0.5 rounded-full text-xs">{t.type}</span>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F0EDE7] flex-wrap">
                                    <a href={`tel:${t.phone}`}>
                                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#4A7C59] border border-[#4A7C59] px-3 py-2 rounded-lg hover:bg-[#EBF3ED] transition-colors">
                                            <Phone className="w-3 h-3" /> {t.phone}
                                        </button>
                                    </a>
                                    {t.status === "Pending" && (
                                        <>
                                            <button className="btn-primary text-xs px-4 py-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirm</button>
                                            <button className="text-xs font-semibold text-[#E05B5B] border border-[#E05B5B] px-3 py-2 rounded-lg hover:bg-[#FEE2E2] transition-colors">Decline</button>
                                        </>
                                    )}
                                    <Link to={createPageUrl("Messaging")} className="ml-auto">
                                        <button className="text-xs font-semibold text-[#5B7FA6] flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Message</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Waitlist */}
                {activeTab === "waitlist" && (
                    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                        <div className="p-5 border-b border-[#F0EDE7] flex items-center justify-between">
                            <h2 className="font-semibold text-[#2D3142]">Waitlist ({WAITLIST.length} families)</h2>
                            <button className="btn-primary text-sm px-4 py-2">+ Add to Waitlist</button>
                        </div>
                        {WAITLIST.map((w, i) => (
                            <div key={w.name} className={`p-5 flex items-start justify-between flex-wrap gap-3 ${i < WAITLIST.length - 1 ? 'border-b border-[#F0EDE7]' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#EBF3ED] flex items-center justify-center text-[#4A7C59] font-bold text-sm shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2D3142] text-sm">{w.name}, {w.age}</p>
                                        <p className="text-[#8B8B8B] text-xs">{w.careLevel} · Added {w.addedDate}</p>
                                        <p className="text-[#8B8B8B] text-xs">{w.contact}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColors[w.priority]}`}>{w.priority}</span>
                                    <a href={`tel:${w.contact}`}>
                                        <button className="p-1.5 hover:bg-[#FAF8F5] rounded-lg transition-colors"><Phone className="w-4 h-4 text-[#4A7C59]" /></button>
                                    </a>
                                    <Link to={createPageUrl("Messaging")}>
                                        <button className="p-1.5 hover:bg-[#FAF8F5] rounded-lg transition-colors"><MessageSquare className="w-4 h-4 text-[#5B7FA6]" /></button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Reviews */}
                {activeTab === "reviews" && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 card-shadow flex items-center gap-8 flex-wrap">
                            <div className="text-center">
                                <div className="font-display text-5xl font-semibold text-[#2D3142]">4.8</div>
                                <div className="flex items-center gap-0.5 justify-center mt-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />)}
                                </div>
                                <div className="text-[#8B8B8B] text-sm mt-1">127 reviews</div>
                            </div>
                            <div className="flex-1">
                                {[5, 4, 3, 2, 1].map(stars => (
                                    <div key={stars} className="flex items-center gap-2 mb-1.5">
                                        <span className="text-xs text-[#8B8B8B] w-2">{stars}</span>
                                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                                        <div className="flex-1 h-2 bg-[#F0EDE7] rounded-full overflow-hidden">
                                            <div className="h-2 bg-[#F59E0B] rounded-full" style={{ width: `${[75, 15, 6, 3, 1][5 - stars]}%` }} />
                                        </div>
                                        <span className="text-xs text-[#8B8B8B] w-6">{[96, 19, 8, 4, 1][5 - stars]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {RECENT_REVIEWS.map(r => (
                            <div key={r.author} className="bg-white rounded-2xl p-5 card-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-[#2D3142] text-sm">{r.author}</span>
                                        <span className="text-[#8B8B8B] text-xs">{r.date}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />)}
                                    </div>
                                </div>
                                <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">{r.text}</p>
                                <button className="text-xs font-semibold text-[#4A7C59] hover:underline">Respond publicly</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}