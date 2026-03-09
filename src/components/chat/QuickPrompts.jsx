
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Atom, TrendingUp, Lightbulb, Database, FileCode, FunctionSquare, Bot as BotIcon } from "lucide-react";

const gpt5Prompts = [
    { icon: Brain, text: "Solve a complex theoretical problem", prompt: "Explain the relationship between consciousness, quantum mechanics, and information theory." },
    { icon: Atom, text: "Provide advanced scientific analysis", prompt: "Analyze the potential for room-temperature superconductors to transform global infrastructure." },
    { icon: TrendingUp, text: "Predict technological convergence", prompt: "Model the convergence of brain-computer interfaces, AGI, and nanotechnology by 2035." },
    { icon: Lightbulb, text: "Design a revolutionary innovation", prompt: "Design a breakthrough approach to carbon capture that could reverse climate change within 20 years." },
];

const codePrompts = [
    { icon: FileCode, text: "Write a Python script for web scraping", prompt: "Write a Python script using BeautifulSoup and requests to scrape the headlines from the front page of a news website. Handle potential errors." },
    { icon: Database, text: "Design a database schema", prompt: "Design a PostgreSQL schema for a social media app with users, posts, comments, and likes. Include tables and relationships." },
    { icon: FunctionSquare, text: "Explain a complex algorithm", prompt: "Explain the Dijkstra's algorithm for finding the shortest path in a graph. Provide a simple implementation in JavaScript." },
    { icon: BotIcon, text: "Refactor this piece of code", prompt: "I have this piece of code that is hard to read. Can you refactor it for better clarity and efficiency? \n\n[PASTE YOUR CODE HERE]" },
];

const flashPrompts = [
    { icon: Lightbulb, text: "Brainstorm ideas for a new app", prompt: "Give me 5 creative ideas for a new mobile application." },
    { icon: TrendingUp, text: "Summarize a news article", prompt: "Summarize the key points of this article for me: [PASTE URL HERE]" },
    { icon: FileCode, text: "Write a short email", prompt: "Write a professional email to a colleague asking for an update on the Q3 report." },
    { icon: Brain, text: "Explain a topic simply", prompt: "Explain the concept of blockchain to me like I'm 10 years old." },
]

export default function QuickPrompts({ onPromptSelect, aiMode }) {
    let prompts;
    let title = "Challenge GPT-5";

    switch (aiMode) {
        case 'code':
            prompts = codePrompts;
            title = "Start Coding";
            break;
        case 'flash':
            prompts = flashPrompts;
            title = "Get Quick Answers";
            break;
        default: // Assumes 'gpt5' mode or undefined, using gpt5Prompts as default
            prompts = gpt5Prompts;
        // Title is already set to "Challenge GPT-5"
    }


    return (
        <div className="space-y-3">
            <h3 className="text-base font-semibold text-white text-center">
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {prompts.slice(0, 4).map((prompt, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className="glass-effect border-white/20 text-white hover:bg-white/10 hover:border-white/30 p-3 h-auto text-left flex items-start gap-2.5 transition-all duration-200"
                        onClick={() => onPromptSelect(prompt.prompt)}
                    >
                        <prompt.icon className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-snug">{prompt.text}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
