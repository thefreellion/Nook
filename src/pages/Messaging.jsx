import { useState } from "react";
import { Search, Send, Paperclip, Phone, Video, MoreVertical, CheckCheck, Clock, MessageSquare, ChevronLeft } from "lucide-react";

const CONVERSATIONS = [
    {
        id: "1", facility: "Sunrise Gardens", type: "Assisted Living",
        lastMessage: "Great! We look forward to seeing you on the 14th.", time: "2:32 PM",
        unread: 0, img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=80&q=80"
    },
    {
        id: "2", facility: "Meadowbrook Memory Care", type: "Memory Care",
        lastMessage: "Can you tell us more about your mother's current medications?", time: "Yesterday",
        unread: 2, img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=80&q=80"
    },
    {
        id: "3", facility: "Evergreen Family Home", type: "Adult Family Home",
        lastMessage: "Thank you for your interest! We'd love to schedule a tour.", time: "Mar 3",
        unread: 1, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&q=80"
    },
];

const MESSAGES = {
    "1": [
        { id: 1, from: "facility", text: "Hello! Thank you for your interest in Sunrise Gardens. How can we help you today?", time: "9:10 AM", date: "March 12" },
        { id: 2, from: "user", text: "Hi, my mother Eleanor is 82 and needs assisted living. She's fairly mobile but needs help with medications and meals.", time: "9:25 AM", date: "March 12" },
        { id: 3, from: "facility", text: "That sounds like a wonderful fit for us! We specialize in exactly that level of care. Would you like to schedule a tour?", time: "9:41 AM", date: "March 12" },
        { id: 4, from: "user", text: "Yes, that would be wonderful. Can we do March 14th at 10 AM?", time: "10:03 AM", date: "March 12" },
        { id: 5, from: "facility", text: "Great! We look forward to seeing you on the 14th. Please bring any medical records or insurance information you have available.", time: "2:32 PM", date: "Today" },
    ],
    "2": [
        { id: 1, from: "facility", text: "Hello! We received your inquiry about memory care for your loved one. I'm Sarah, the admissions coordinator.", time: "11:00 AM", date: "Yesterday" },
        { id: 2, from: "user", text: "Hi Sarah! Yes, we're looking for memory care for my mother. She has moderate Alzheimer's.", time: "11:30 AM", date: "Yesterday" },
        { id: 3, from: "facility", text: "I understand. Can you tell us more about your mother's current medications?", time: "11:45 AM", date: "Yesterday" },
    ],
    "3": [
        { id: 1, from: "facility", text: "Thank you for your interest! We'd love to schedule a tour.", time: "2:00 PM", date: "March 3" },
    ],
};

const QUICK_REPLIES = [
    "When is the earliest available move-in date?",
    "What's included in the monthly fee?",
    "Do you accept Medicare/Medicaid?",
    "Can we schedule a virtual tour?",
];

export default function Messaging() {
    const [activeConv, setActiveConv] = useState("1");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(MESSAGES);
    const [showConvList, setShowConvList] = useState(true);

    const conv = CONVERSATIONS.find(c => c.id === activeConv);
    const convMessages = messages[activeConv] || [];

    const sendMessage = (text) => {
        const msg = text || message;
        if (!msg.trim()) return;
        setMessages(m => ({
            ...m,
            [activeConv]: [...(m[activeConv] || []), {
                id: Date.now(), from: "user", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), date: "Today"
            }]
        }));
        setMessage("");
    };

    const selectConv = (id) => {
        setActiveConv(id);
        setShowConvList(false);
    };

    return (
        <div className="h-[calc(100vh-112px)] bg-[#FAF8F5] flex">
            {/* Conversation List */}
            <div className={`${showConvList ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-80 bg-white border-r border-[#E8E4DD] shrink-0`}>
                <div className="p-4 border-b border-[#E8E4DD]">
                    <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-3">Messages</h2>
                    <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-[#8B8B8B]" />
                        <input placeholder="Search conversations..." className="bg-transparent text-sm text-[#2D3142] outline-none flex-1" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map(c => (
                        <button
                            key={c.id}
                            onClick={() => selectConv(c.id)}
                            className={`w-full text-left p-4 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors border-b border-[#F5F2ED] ${activeConv === c.id ? 'bg-[#EBF3ED]/50' : ''}`}
                        >
                            <div className="relative shrink-0">
                                <img src={c.img} alt={c.facility} className="w-12 h-12 rounded-xl object-cover" />
                                {c.unread > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A7C59] rounded-full text-white text-[10px] flex items-center justify-center font-bold">{c.unread}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className={`text-sm font-semibold ${c.unread > 0 ? 'text-[#2D3142]' : 'text-[#6B6B6B]'}`}>{c.facility}</span>
                                    <span className="text-xs text-[#B0ADA8]">{c.time}</span>
                                </div>
                                <p className="text-xs text-[#B0ADA8] mb-0.5">{c.type}</p>
                                <p className={`text-xs truncate ${c.unread > 0 ? 'text-[#2D3142] font-medium' : 'text-[#B0ADA8]'}`}>{c.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`${!showConvList ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
                {conv ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-[#E8E4DD] px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowConvList(true)} className="md:hidden p-1.5 hover:bg-[#FAF8F5] rounded-lg mr-1">
                                    <ChevronLeft className="w-5 h-5 text-[#6B6B6B]" />
                                </button>
                                <img src={conv.img} alt={conv.facility} className="w-9 h-9 rounded-lg object-cover" />
                                <div>
                                    <p className="font-semibold text-[#2D3142] text-sm">{conv.facility}</p>
                                    <p className="text-[#8B8B8B] text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] inline-block" /> Usually replies within a few hours</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-[#FAF8F5] rounded-xl transition-colors"><Phone className="w-4 h-4 text-[#6B6B6B]" /></button>
                                <button className="p-2 hover:bg-[#FAF8F5] rounded-xl transition-colors"><Video className="w-4 h-4 text-[#6B6B6B]" /></button>
                                <button className="p-2 hover:bg-[#FAF8F5] rounded-xl transition-colors"><MoreVertical className="w-4 h-4 text-[#6B6B6B]" /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {convMessages.map((msg, i) => {
                                const showDate = i === 0 || convMessages[i - 1]?.date !== msg.date;
                                return (
                                    <div key={msg.id}>
                                        {showDate && (
                                            <div className="text-center my-3">
                                                <span className="bg-[#F0EDE7] text-[#8B8B8B] text-xs px-3 py-1 rounded-full">{msg.date}</span>
                                            </div>
                                        )}
                                        <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-xs md:max-w-sm lg:max-w-md ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col`}>
                                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.from === "user"
                                                        ? "bg-[#4A7C59] text-white rounded-br-sm"
                                                        : "bg-white text-[#2D3142] card-shadow rounded-bl-sm"
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                                <div className={`flex items-center gap-1 mt-1 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                                                    <span className="text-[10px] text-[#B0ADA8]">{msg.time}</span>
                                                    {msg.from === "user" && <CheckCheck className="w-3 h-3 text-[#4A7C59]" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Replies */}
                        <div className="px-4 pb-2">
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {QUICK_REPLIES.map(qr => (
                                    <button
                                        key={qr}
                                        onClick={() => sendMessage(qr)}
                                        className="shrink-0 text-xs font-medium text-[#5B7FA6] bg-[#EBF1F8] border border-[#C5D8ED] px-3 py-1.5 rounded-full hover:bg-[#D5E7F5] transition-colors"
                                    >
                                        {qr}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="bg-white border-t border-[#E8E4DD] p-4">
                            <div className="flex items-end gap-3">
                                <button className="p-2 hover:bg-[#FAF8F5] rounded-xl transition-colors shrink-0">
                                    <Paperclip className="w-5 h-5 text-[#8B8B8B]" />
                                </button>
                                <div className="flex-1 bg-[#FAF8F5] border border-[#E8E4DD] rounded-2xl px-4 py-3 flex items-end gap-2">
                                    <textarea
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        rows={1}
                                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                        className="flex-1 bg-transparent text-sm text-[#2D3142] outline-none resize-none max-h-24"
                                    />
                                </div>
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={!message.trim()}
                                    className="w-10 h-10 rounded-xl bg-[#4A7C59] flex items-center justify-center hover:bg-[#3d6849] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-8">
                        <div>
                            <MessageSquare className="w-12 h-12 text-[#C0BBB5] mx-auto mb-3" />
                            <p className="font-semibold text-[#2D3142] mb-1">No conversation selected</p>
                            <p className="text-[#8B8B8B] text-sm">Choose a conversation from the list to start messaging.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}