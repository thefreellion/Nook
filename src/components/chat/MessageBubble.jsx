
import React from "react";
import ReactMarkdown from 'react-markdown';
import { Bot, User, Copy, Check, Volume2 } from "lucide-react"; // Added Volume2 import
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ImportantBox from "./ImportantBox";
import { toast } from "sonner";

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeText = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeText);
        toast.success("Code copied to clipboard!");
    };

    return !inline && match ? (
        <div className="my-4 bg-slate-900/70 rounded-lg border border-slate-700 relative group">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                <span className="text-xs text-slate-400">{match[1]}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleCopy}
                >
                    <Copy className="h-3 w-3" />
                </Button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code {...props} className="text-sm font-mono">
                    {children}
                </code>
            </pre>
        </div>
    ) : (
        <code className="bg-slate-700 text-orange-300 px-1 py-0.5 rounded-sm text-sm font-mono" {...props}>
            {children}
        </code>
    );
};


export default function MessageBubble({ message, onCopy, copiedId, onSpeak }) { // Added onSpeak prop
    const isUser = message.role === "user";
    const isCopied = copiedId === message.id;

    const parseAndRenderContent = (content) => {
        if (isUser) {
            return <p className="text-base leading-relaxed whitespace-pre-wrap m-0">{content}</p>;
        }

        const importantPatterns = [
            { pattern: /\[IMPORTANT\](.*?)\[\/IMPORTANT\]/gs, type: 'important' },
            { pattern: /\[KEY-INSIGHT\](.*?)\[\/KEY-INSIGHT\]/gs, type: 'key-insight' },
            { pattern: /\[CRITICAL\](.*?)\[\/CRITICAL\]/gs, type: 'critical' },
            { pattern: /\[BREAKTHROUGH\](.*?)\[\/BREAKTHROUGH\]/gs, type: 'breakthrough' }
        ];

        const regex = new RegExp(importantPatterns.map(p => p.pattern.source).join('|'), 'gs');

        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            // Text before the match
            if (match.index > lastIndex) {
                parts.push({ type: 'markdown', content: content.substring(lastIndex, match.index) });
            }

            // Find which pattern matched
            for (let i = 0; i < importantPatterns.length; i++) {
                if (match[i + 1] !== undefined) {
                    parts.push({ type: importantPatterns[i].type, content: match[i + 1].trim() });
                    break;
                }
            }
            lastIndex = match.index + match[0].length;
        }

        // Remaining text after the last match
        if (lastIndex < content.length) {
            parts.push({ type: 'markdown', content: content.substring(lastIndex) });
        }

        if (parts.length === 0) {
            parts.push({ type: 'markdown', content });
        }

        return parts.map((part, index) => {
            if (part.type.includes('markdown')) {
                return (
                    <ReactMarkdown
                        key={index}
                        className="prose prose-base prose-invert max-w-none"
                        components={{
                            code: CodeBlock,
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
                        }}
                    >
                        {part.content}
                    </ReactMarkdown>
                );
            } else {
                return <ImportantBox key={index} content={part.content} type={part.type} />;
            }
        });
    };

    return (
        <div className={`flex gap-4 message-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                </div>
            )}

            <div className={`max-w-[85%] lg:max-w-[75%] ${isUser ? 'order-1' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 shadow-lg ${isUser
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'glass-effect text-white border border-white/10'
                    }`}>
                    <div>{parseAndRenderContent(message.content)}</div>
                </div>

                <div className={`flex items-center gap-2 mt-2.5 text-xs text-blue-200 ${isUser ? 'justify-end' : 'justify-start'
                    }`}>
                    {!isUser && (
                        <>
                            <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 text-blue-300 hover:text-white hover:bg-white/10"
                                onClick={() => onCopy(message.content, message.id)}
                            >
                                {isCopied ? (
                                    <Check className="w-3 h-3" />
                                ) : (
                                    <Copy className="w-3 h-3" />
                                )}
                            </Button>
                            <Button // Speak button added
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 text-blue-300 hover:text-white hover:bg-white/10"
                                onClick={() => onSpeak(message.content)}
                            >
                                <Volume2 className="w-3 h-3" />
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                </div>
            )}
        </div>
    );
}
