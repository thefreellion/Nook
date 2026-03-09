import React from "react";
import { AlertCircle, Lightbulb, Star, Zap } from "lucide-react";

export default function ImportantBox({ content, type = "important" }) {
    const getBoxConfig = () => {
        switch (type) {
            case "key-insight":
                return {
                    icon: Lightbulb,
                    bgColor: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
                    borderColor: "border-amber-400/40",
                    iconColor: "text-amber-400",
                    title: "Key Insight"
                };
            case "critical":
                return {
                    icon: AlertCircle,
                    bgColor: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
                    borderColor: "border-red-400/40",
                    iconColor: "text-red-400",
                    title: "Critical Point"
                };
            case "breakthrough":
                return {
                    icon: Star,
                    bgColor: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
                    borderColor: "border-purple-400/40",
                    iconColor: "text-purple-400",
                    title: "Breakthrough"
                };
            default:
                return {
                    icon: Zap,
                    bgColor: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
                    borderColor: "border-blue-400/40",
                    iconColor: "text-blue-400",
                    title: "Important"
                };
        }
    };

    const config = getBoxConfig();
    const Icon = config.icon;

    return (
        <div className={`my-4 p-4 rounded-xl border-2 ${config.bgColor} ${config.borderColor} backdrop-blur-sm`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white/10 ${config.iconColor} flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold mb-2 ${config.iconColor}`}>
                        {config.title}
                    </h4>
                    <div className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}