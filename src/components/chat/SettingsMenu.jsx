
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Zap, Trash2, Download, LogOut, RefreshCw, User as UserIcon, Shield, Code, Mic, Bot, Feather, Gem } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User } from "@/entities/User";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsMenu({
    isOpen,
    onClose,
    settings,
    onSettingsChange,
    onClearChat,
    onOpenDownloadDialog,
    voiceConfig,
    onVoiceConfigChange,
    availableVoices,
}) {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            loadCurrentUser();
        }
    }, [isOpen]);

    const loadCurrentUser = async () => {
        try {
            const user = await User.me();
            setCurrentUser(user);
        } catch (error) {
            console.error("Error loading user:", error);
            toast.error("Could not load user profile. Please check your connection or try refreshing the session.");
        }
    };

    const handleSettingChange = (key, value) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    const handleVoiceChange = (key, value) => {
        onVoiceConfigChange({ ...voiceConfig, [key]: value });
    };

    const handleVoiceSelection = (voiceURI) => {
        const selectedVoice = availableVoices.find(v => v.voiceURI === voiceURI);
        handleVoiceChange('voice', selectedVoice);
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await User.logout();
            toast.success("Successfully logged out");
            onClose();
            // Full page reload to clear all state
            window.location.reload();
        } catch (error) {
            toast.error("Failed to logout");
        }
        setIsLoading(false);
    };

    const handleChangeAccount = async () => {
        setIsLoading(true);
        try {
            // Logout first to ensure a clean login flow
            await User.logout(window.location.href);
        } catch (error) {
            // If logout fails, try to redirect to login anyway
            User.loginWithRedirect(window.location.href);
            toast.error("Failed to change account cleanly, redirecting to login.");
            setIsLoading(false);
        }
    };

    const handleRefreshSession = async () => {
        setIsLoading(true);
        try {
            await loadCurrentUser();
            toast.success("Session refreshed");
        } catch (error) {
            toast.error("Failed to refresh session");
        }
        setIsLoading(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="glass-effect border-l border-white/10 text-white w-full sm:max-w-sm overflow-y-auto">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-2xl text-white">Settings</SheetTitle>
                    <SheetDescription className="text-blue-200">
                        Customize Aura AI and manage your account.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                    {/* Current User Info */}
                    {currentUser && (
                        <div className="space-y-3">
                            <Label>Current Account</Label>
                            <div className="glass-effect border border-white/20 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white truncate">
                                            {currentUser.full_name || "User"}
                                        </p>
                                        <p className="text-sm text-blue-200 truncate">
                                            {currentUser.email}
                                        </p>
                                        {currentUser.role === 'admin' && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <Shield className="w-3 h-3 text-amber-400" />
                                                <span className="text-xs text-amber-400">Admin</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <Separator className="bg-white/20" />

                    {/* AI Model Selection */}
                    <div className="space-y-3">
                        <Label htmlFor="ai-model">AI Model</Label>
                        <Select
                            value={settings.aiMode}
                            onValueChange={(value) => handleSettingChange("aiMode", value)}
                        >
                            <SelectTrigger id="ai-model" className="glass-effect border-white/20 text-white">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent className="glass-effect border-white/10 text-white">
                                <SelectItem value="gpt5"><div className="flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-sky-400" /> GPT-5</div></SelectItem>
                                <SelectItem value="claude"><div className="flex items-center gap-2"><Feather className="w-4 h-4 text-orange-400" /> Claude</div></SelectItem>
                                <SelectItem value="gemini"><div className="flex items-center gap-2"><Gem className="w-4 h-4 text-purple-400" /> Gemini</div></SelectItem>
                                <SelectItem value="base44"><div className="flex items-center gap-2"><Bot className="w-4 h-4 text-blue-400" /> Base44 AI</div></SelectItem>
                                <SelectItem value="code"><div className="flex items-center gap-2"><Code className="w-4 h-4 text-amber-400" /> Aura Coder</div></SelectItem>
                                <SelectItem value="flash"><div className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Lightning</div></SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Language */}
                    <div className="space-y-3">
                        <Label htmlFor="language">Response Language</Label>
                        <Select
                            value={settings.language}
                            onValueChange={(value) => handleSettingChange("language", value)}
                        >
                            <SelectTrigger id="language" className="glass-effect border-white/20 text-white">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="glass-effect border-white/10 text-white">
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Español</SelectItem>
                                <SelectItem value="french">Français</SelectItem>
                                <SelectItem value="german">Deutsch</SelectItem>
                                <SelectItem value="japanese">日本語</SelectItem>
                                <SelectItem value="mandarin">中文</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Creativity Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="temperature">AI Creativity</Label>
                            <span className="text-sm text-blue-200">{settings.temperature.toFixed(1)}</span>
                        </div>
                        <Slider
                            id="temperature"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[settings.temperature]}
                            onValueChange={([value]) => handleSettingChange("temperature", value)}
                        />
                        <div className="flex justify-between text-xs text-blue-300">
                            <span>Precise</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* Voice Settings */}
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2"><Mic className="w-4 h-4" /> Voice Settings</Label>
                        <div className="flex items-center justify-between glass-effect border-white/20 rounded-lg p-3">
                            <Label htmlFor="auto-play">Auto-Speak Responses</Label>
                            <Switch
                                id="auto-play"
                                checked={voiceConfig.autoPlay}
                                onCheckedChange={(checked) => handleVoiceChange('autoPlay', checked)}
                            />
                        </div>
                        {availableVoices.length > 0 && (
                            <div className="space-y-3">
                                <Label htmlFor="voice-select">AI Voice</Label>
                                <Select
                                    value={voiceConfig.voice?.voiceURI}
                                    onValueChange={handleVoiceSelection}
                                >
                                    <SelectTrigger id="voice-select" className="glass-effect border-white/20 text-white">
                                        <SelectValue placeholder="Select a voice" />
                                    </SelectTrigger>
                                    <SelectContent className="glass-effect border-white/10 text-white max-h-60">
                                        {availableVoices.filter(v => v.lang.startsWith('en')).map(voice => (
                                            <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                                                {voice.name} ({voice.lang})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="speech-rate">Speech Rate</Label>
                                <span className="text-sm text-blue-200">{voiceConfig.rate.toFixed(1)}x</span>
                            </div>
                            <Slider
                                id="speech-rate"
                                min={0.5}
                                max={2}
                                step={0.1}
                                value={[voiceConfig.rate]}
                                onValueChange={([value]) => handleVoiceChange("rate", value)}
                            />
                        </div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* App Actions */}
                    <div className="space-y-3">
                        <Label>App Actions</Label>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-3 glass-effect border-white/20 text-white hover:bg-white/10"
                                onClick={() => {
                                    onOpenDownloadDialog();
                                    onClose();
                                }}
                            >
                                <Download className="w-4 h-4" />
                                Install App on Device
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start gap-3 glass-effect border-white/20 text-white hover:bg-white/10"
                                onClick={handleRefreshSession}
                                disabled={isLoading}
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                Refresh Session
                            </Button>
                        </div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* Account Actions */}
                    <div className="space-y-3">
                        <Label>Account Management</Label>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-3 glass-effect border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-400"
                                onClick={handleChangeAccount}
                                disabled={isLoading}
                            >
                                <UserIcon className="w-4 h-4" />
                                Change Account
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start gap-3 glass-effect border-red-500/40 text-red-300 hover:bg-red-500/20 hover:border-red-400"
                                onClick={handleLogout}
                                disabled={isLoading}
                            >
                                <LogOut className="w-4 h-4" />
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </div>

                <SheetFooter>
                    <Button
                        variant="destructive"
                        className="w-full flex items-center gap-2 bg-red-800/50 hover:bg-red-700/50 border border-red-500/50"
                        onClick={() => {
                            onClearChat();
                            onClose();
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear Chat History
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
