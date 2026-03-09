import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Monitor, SquareArrowUp, MoreVertical, DownloadCloud } from "lucide-react";

const instructions = [
    {
        platform: "iOS / iPadOS",
        icon: Smartphone,
        steps: [
            {
                icon: SquareArrowUp,
                text: "Tap the 'Share' button in Safari.",
            },
            {
                icon: DownloadCloud,
                text: "Scroll down and tap 'Add to Home Screen'.",
            },
        ],
    },
    {
        platform: "Android",
        icon: Smartphone,
        steps: [
            {
                icon: MoreVertical,
                text: "Tap the menu button (3 dots) in Chrome.",
            },
            {
                icon: DownloadCloud,
                text: "Tap 'Install app' or 'Add to Home screen'.",
            },
        ],
    },
    {
        platform: "Desktop",
        icon: Monitor,
        steps: [
            {
                icon: MoreVertical,
                text: "Click the menu button (3 dots) in your browser's address bar.",
            },
            {
                icon: DownloadCloud,
                text: "Click 'Install Aura AI...'.",
            },
        ],
    },
];

export default function DownloadAppDialog({ isOpen, onClose }) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="glass-effect border-l border-white/10 text-white w-full sm:max-w-md">
                <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-2xl text-white">Install Aura AI</SheetTitle>
                    <SheetDescription className="text-blue-200">
                        Access Aura AI instantly from your home screen, just like a native app.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-6">
                    {instructions.map((instr) => (
                        <Card key={instr.platform} className="glass-effect border-white/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <instr.icon className="w-5 h-5 text-blue-300" />
                                    <span>For {instr.platform}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {instr.steps.map((step, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-700/50 rounded-lg">
                                            <step.icon className="w-5 h-5 text-blue-200" />
                                        </div>
                                        <p className="text-sm text-blue-100">{step.text}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}