import React from "react";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
    return (
        <div className="flex gap-3 justify-start message-slide-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
            </div>

            <div className="glass-effect border border-white/10 rounded-2xl px-4 py-3 shadow-lg flex items-center">
                <div className="flex items-center gap-1">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-green-400 rounded-full typing-indicator" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full typing-indicator" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full typing-indicator" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}