import React, { createContext, useContext, useState } from 'react';

const translations = {
    english: {
        // Header
        appName: "Aura",
        tagline: "Your Cognitive Partner",
        online: "Online",

        // Settings Menu
        settings: "Settings",
        settingsDescription: "Customize Aura AI and manage your account.",
        currentAccount: "Current Account",
        aiModel: "AI Model",
        responseLanguage: "Response Language",
        uiLanguage: "Interface Language",
        aiCreativity: "AI Creativity",
        precise: "Precise",
        creative: "Creative",
        voiceSettings: "Voice Settings",
        autoSpeak: "Auto-Speak Responses",
        aiVoice: "AI Voice",
        speechRate: "Speech Rate",
        turboMode: "Turbo Mode",
        turboModeDesc: "Ultra-fast responses (simplified prompts)",
        appActions: "App Actions",
        installApp: "Install App on Device",
        refreshSession: "Refresh Session",
        accountManagement: "Account Management",
        changeAccount: "Change Account",
        disconnect: "Disconnect",
        clearHistory: "Clear Chat History",
        admin: "Admin",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "Lightning",

        // Chat Interface
        askGpt5: "Ask GPT-5 for unparalleled analysis...",
        askClaude: "Ask Claude a question...",
        askGemini: "Ask Gemini anything...",
        askBase44: "Ask Base44 AI about the platform...",
        askCode: "Describe the code you need...",
        askFlash: "Get a quick answer from Aura AI...",

        // Intro Screen
        gpt5Title: "Aura AI - GPT-5 Mode",
        gpt5Desc: "Engage with an emulated GPT-5 model for the highest level of reasoning and analytical depth.",
        claudeTitle: "Aura AI - Claude Mode",
        claudeDesc: "Experience a helpful, harmless, and honest AI assistant with a strong ethical constitution.",
        geminiTitle: "Aura AI - Gemini Mode",
        geminiDesc: "Tap into Google's most capable multimodal model for creative and knowledgeable answers.",
        base44Title: "Base44 AI",
        base44Desc: "Your expert AI assistant for the Base44 platform, optimized for productivity and development.",
        codeTitle: "Aura Coder",
        codeDesc: "Your AI staff engineer for generating simple scripts to supercomplex software architecture.",
        flashTitle: "Aura AI - Lightning Mode",
        flashDesc: "Ultra-fast superintelligent responses optimized for efficiency.",

        // Quick Prompts
        challengeGpt5: "Challenge GPT-5",
        startCoding: "Start Coding",
        getQuickAnswers: "Get Quick Answers",

        // Toast Messages
        copiedToClipboard: "Copied to clipboard!",
        failedToCopy: "Failed to copy text",
        chatCleared: "Chat history cleared",
        loggedOut: "Successfully logged out",
        failedLogout: "Failed to logout",
        sessionRefreshed: "Session refreshed",
        failedRefresh: "Failed to refresh session",
        userLoadError: "Could not load user profile. Please check your connection or try refreshing the session.",
        failedToSend: "Failed to send message. Please try again.",
        codeCopied: "Code copied to clipboard!",
        voiceNotSupported: "Voice recognition is not supported in your browser.",
        speechError: "Speech recognition error",
    },

    spanish: {
        // Header
        appName: "Aura",
        tagline: "Tu Compañero Cognitivo",
        online: "En línea",

        // Settings Menu
        settings: "Configuración",
        settingsDescription: "Personaliza Aura AI y gestiona tu cuenta.",
        currentAccount: "Cuenta Actual",
        aiModel: "Modelo de IA",
        responseLanguage: "Idioma de Respuesta",
        uiLanguage: "Idioma de Interfaz",
        aiCreativity: "Creatividad de IA",
        precise: "Preciso",
        creative: "Creativo",
        voiceSettings: "Configuración de Voz",
        autoSpeak: "Reproducir Respuestas Automáticamente",
        aiVoice: "Voz de IA",
        speechRate: "Velocidad de Habla",
        turboMode: "Modo Turbo",
        turboModeDesc: "Respuestas ultra-rápidas (prompts simplificados)",
        appActions: "Acciones de la App",
        installApp: "Instalar App en Dispositivo",
        refreshSession: "Actualizar Sesión",
        accountManagement: "Gestión de Cuenta",
        changeAccount: "Cambiar Cuenta",
        disconnect: "Desconectar",
        clearHistory: "Borrar Historial de Chat",
        admin: "Admin",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "Relámpago",

        // Chat Interface
        askGpt5: "Pregunta a GPT-5 para análisis incomparable...",
        askClaude: "Haz una pregunta a Claude...",
        askGemini: "Pregunta cualquier cosa a Gemini...",
        askBase44: "Pregunta a Base44 AI sobre la plataforma...",
        askCode: "Describe el código que necesitas...",
        askFlash: "Obtén una respuesta rápida de Aura AI...",

        // Intro Screen
        gpt5Title: "Aura AI - Modo GPT-5",
        gpt5Desc: "Interactúa con un modelo GPT-5 emulado para el más alto nivel de razonamiento y profundidad analítica.",
        claudeTitle: "Aura AI - Modo Claude",
        claudeDesc: "Experimenta un asistente de IA útil, inofensivo y honesto con una fuerte constitución ética.",
        geminiTitle: "Aura AI - Modo Gemini",
        geminiDesc: "Aprovecha el modelo multimodal más capaz de Google para respuestas creativas y conocedoras.",
        base44Title: "Base44 AI",
        base44Desc: "Tu asistente experto de IA para la plataforma Base44, optimizado para productividad y desarrollo.",
        codeTitle: "Aura Coder",
        codeDesc: "Tu ingeniero de personal de IA para generar desde scripts simples hasta arquitectura de software supercompleja.",
        flashTitle: "Aura AI - Modo Relámpago",
        flashDesc: "Respuestas superinteligentes ultra-rápidas optimizadas para eficiencia.",

        // Quick Prompts
        challengeGpt5: "Desafía a GPT-5",
        startCoding: "Comienza a Codificar",
        getQuickAnswers: "Obtén Respuestas Rápidas",

        // Toast Messages
        copiedToClipboard: "¡Copiado al portapapeles!",
        failedToCopy: "Error al copiar texto",
        chatCleared: "Historial de chat borrado",
        loggedOut: "Sesión cerrada exitosamente",
        failedLogout: "Error al cerrar sesión",
        sessionRefreshed: "Sesión actualizada",
        failedRefresh: "Error al actualizar sesión",
        userLoadError: "No se pudo cargar el perfil de usuario. Por favor verifica tu conexión o intenta actualizar la sesión.",
        failedToSend: "Error al enviar mensaje. Por favor intenta de nuevo.",
        codeCopied: "¡Código copiado al portapapeles!",
        voiceNotSupported: "El reconocimiento de voz no es compatible con tu navegador.",
        speechError: "Error de reconocimiento de voz",
    },

    french: {
        // Header
        appName: "Aura",
        tagline: "Votre Partenaire Cognitif",
        online: "En ligne",

        // Settings Menu
        settings: "Paramètres",
        settingsDescription: "Personnalisez Aura AI et gérez votre compte.",
        currentAccount: "Compte Actuel",
        aiModel: "Modèle d'IA",
        responseLanguage: "Langue de Réponse",
        uiLanguage: "Langue d'Interface",
        aiCreativity: "Créativité de l'IA",
        precise: "Précis",
        creative: "Créatif",
        voiceSettings: "Paramètres Vocaux",
        autoSpeak: "Lecture Auto des Réponses",
        aiVoice: "Voix de l'IA",
        speechRate: "Vitesse de Parole",
        turboMode: "Mode Turbo",
        turboModeDesc: "Réponses ultra-rapides (prompts simplifiés)",
        appActions: "Actions de l'App",
        installApp: "Installer l'App sur l'Appareil",
        refreshSession: "Actualiser la Session",
        accountManagement: "Gestion du Compte",
        changeAccount: "Changer de Compte",
        disconnect: "Déconnecter",
        clearHistory: "Effacer l'Historique",
        admin: "Admin",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "Éclair",

        // Chat Interface
        askGpt5: "Demandez à GPT-5 une analyse incomparable...",
        askClaude: "Posez une question à Claude...",
        askGemini: "Demandez n'importe quoi à Gemini...",
        askBase44: "Interrogez Base44 AI sur la plateforme...",
        askCode: "Décrivez le code dont vous avez besoin...",
        askFlash: "Obtenez une réponse rapide d'Aura AI...",

        // Intro Screen
        gpt5Title: "Aura AI - Mode GPT-5",
        gpt5Desc: "Interagissez avec un modèle GPT-5 émulé pour le plus haut niveau de raisonnement et de profondeur analytique.",
        claudeTitle: "Aura AI - Mode Claude",
        claudeDesc: "Découvrez un assistant IA utile, inoffensif et honnête avec une forte constitution éthique.",
        geminiTitle: "Aura AI - Mode Gemini",
        geminiDesc: "Exploitez le modèle multimodal le plus performant de Google pour des réponses créatives et érudites.",
        base44Title: "Base44 AI",
        base44Desc: "Votre assistant IA expert pour la plateforme Base44, optimisé pour la productivité et le développement.",
        codeTitle: "Aura Coder",
        codeDesc: "Votre ingénieur logiciel IA pour générer des scripts simples à une architecture logicielle supercomplexe.",
        flashTitle: "Aura AI - Mode Éclair",
        flashDesc: "Réponses superintelligentes ultra-rapides optimisées pour l'efficacité.",

        // Quick Prompts
        challengeGpt5: "Défiez GPT-5",
        startCoding: "Commencer à Coder",
        getQuickAnswers: "Obtenir des Réponses Rapides",

        // Toast Messages
        copiedToClipboard: "Copié dans le presse-papiers!",
        failedToCopy: "Échec de la copie du texte",
        chatCleared: "Historique effacé",
        loggedOut: "Déconnexion réussie",
        failedLogout: "Échec de la déconnexion",
        sessionRefreshed: "Session actualisée",
        failedRefresh: "Échec de l'actualisation",
        userLoadError: "Impossible de charger le profil utilisateur. Veuillez vérifier votre connexion ou actualiser la session.",
        failedToSend: "Échec de l'envoi du message. Veuillez réessayer.",
        codeCopied: "Code copié dans le presse-papiers!",
        voiceNotSupported: "La reconnaissance vocale n'est pas prise en charge par votre navigateur.",
        speechError: "Erreur de reconnaissance vocale",
    },

    german: {
        // Header
        appName: "Aura",
        tagline: "Ihr Kognitiver Partner",
        online: "Online",

        // Settings Menu
        settings: "Einstellungen",
        settingsDescription: "Passen Sie Aura AI an und verwalten Sie Ihr Konto.",
        currentAccount: "Aktuelles Konto",
        aiModel: "KI-Modell",
        responseLanguage: "Antwortsprache",
        uiLanguage: "Oberflächensprache",
        aiCreativity: "KI-Kreativität",
        precise: "Präzise",
        creative: "Kreativ",
        voiceSettings: "Spracheinstellungen",
        autoSpeak: "Antworten automatisch vorlesen",
        aiVoice: "KI-Stimme",
        speechRate: "Sprechgeschwindigkeit",
        turboMode: "Turbo-Modus",
        turboModeDesc: "Ultraschnelle Antworten (vereinfachte Prompts)",
        appActions: "App-Aktionen",
        installApp: "App auf Gerät installieren",
        refreshSession: "Sitzung aktualisieren",
        accountManagement: "Kontoverwaltung",
        changeAccount: "Konto wechseln",
        disconnect: "Trennen",
        clearHistory: "Chat-Verlauf löschen",
        admin: "Admin",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "Blitz",

        // Chat Interface
        askGpt5: "Fragen Sie GPT-5 für unvergleichliche Analyse...",
        askClaude: "Stellen Sie Claude eine Frage...",
        askGemini: "Fragen Sie Gemini alles...",
        askBase44: "Fragen Sie Base44 AI zur Plattform...",
        askCode: "Beschreiben Sie den Code, den Sie benötigen...",
        askFlash: "Erhalten Sie eine schnelle Antwort von Aura AI...",

        // Intro Screen
        gpt5Title: "Aura AI - GPT-5 Modus",
        gpt5Desc: "Interagieren Sie mit einem emulierten GPT-5-Modell für höchste Argumentation und analytische Tiefe.",
        claudeTitle: "Aura AI - Claude Modus",
        claudeDesc: "Erleben Sie einen hilfreichen, harmlosen und ehrlichen KI-Assistenten mit starker ethischer Verfassung.",
        geminiTitle: "Aura AI - Gemini Modus",
        geminiDesc: "Nutzen Sie Googles leistungsfähigstes multimodales Modell für kreative und kenntnisreiche Antworten.",
        base44Title: "Base44 AI",
        base44Desc: "Ihr Experten-KI-Assistent für die Base44-Plattform, optimiert für Produktivität und Entwicklung.",
        codeTitle: "Aura Coder",
        codeDesc: "Ihr KI-Personal-Ingenieur für die Generierung einfacher Skripte bis hin zu superkomplexer Software-Architektur.",
        flashTitle: "Aura AI - Blitz-Modus",
        flashDesc: "Ultraschnelle superintelligente Antworten optimiert für Effizienz.",

        // Quick Prompts
        challengeGpt5: "Fordern Sie GPT-5 heraus",
        startCoding: "Beginnen Sie zu codieren",
        getQuickAnswers: "Schnelle Antworten erhalten",

        // Toast Messages
        copiedToClipboard: "In Zwischenablage kopiert!",
        failedToCopy: "Kopieren fehlgeschlagen",
        chatCleared: "Chat-Verlauf gelöscht",
        loggedOut: "Erfolgreich abgemeldet",
        failedLogout: "Abmeldung fehlgeschlagen",
        sessionRefreshed: "Sitzung aktualisiert",
        failedRefresh: "Aktualisierung fehlgeschlagen",
        userLoadError: "Benutzerprofil konnte nicht geladen werden. Bitte überprüfen Sie Ihre Verbindung oder aktualisieren Sie die Sitzung.",
        failedToSend: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        codeCopied: "Code in Zwischenablage kopiert!",
        voiceNotSupported: "Spracherkennung wird von Ihrem Browser nicht unterstützt.",
        speechError: "Spracherkennungsfehler",
    },

    japanese: {
        // Header
        appName: "Aura",
        tagline: "あなたの認知パートナー",
        online: "オンライン",

        // Settings Menu
        settings: "設定",
        settingsDescription: "Aura AIをカスタマイズし、アカウントを管理します。",
        currentAccount: "現在のアカウント",
        aiModel: "AIモデル",
        responseLanguage: "応答言語",
        uiLanguage: "インターフェース言語",
        aiCreativity: "AI創造性",
        precise: "正確",
        creative: "創造的",
        voiceSettings: "音声設定",
        autoSpeak: "応答を自動再生",
        aiVoice: "AI音声",
        speechRate: "話速度",
        turboMode: "ターボモード",
        turboModeDesc: "超高速応答（簡略化されたプロンプト）",
        appActions: "アプリアクション",
        installApp: "デバイスにアプリをインストール",
        refreshSession: "セッションを更新",
        accountManagement: "アカウント管理",
        changeAccount: "アカウントを変更",
        disconnect: "切断",
        clearHistory: "チャット履歴をクリア",
        admin: "管理者",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "ライトニング",

        // Chat Interface
        askGpt5: "比類なき分析のためにGPT-5に尋ねる...",
        askClaude: "Claudeに質問する...",
        askGemini: "Geminiに何でも尋ねる...",
        askBase44: "Base44 AIにプラットフォームについて尋ねる...",
        askCode: "必要なコードを説明する...",
        askFlash: "Aura AIから迅速な回答を得る...",

        // Intro Screen
        gpt5Title: "Aura AI - GPT-5モード",
        gpt5Desc: "最高レベルの推論と分析の深さのためにエミュレートされたGPT-5モデルと対話します。",
        claudeTitle: "Aura AI - Claudeモード",
        claudeDesc: "強力な倫理的憲法を持つ、役立つ、無害で正直なAIアシスタントを体験してください。",
        geminiTitle: "Aura AI - Geminiモード",
        geminiDesc: "創造的で知識豊富な回答のためにGoogleの最も強力なマルチモーダルモデルを活用します。",
        base44Title: "Base44 AI",
        base44Desc: "生産性と開発のために最適化されたBase44プラットフォームの専門AIアシスタント。",
        codeTitle: "Aura Coder",
        codeDesc: "シンプルなスクリプトから超複雑なソフトウェアアーキテクチャまで生成するAIスタッフエンジニア。",
        flashTitle: "Aura AI - ライトニングモード",
        flashDesc: "効率のために最適化された超高速の超知能応答。",

        // Quick Prompts
        challengeGpt5: "GPT-5に挑戦",
        startCoding: "コーディングを開始",
        getQuickAnswers: "迅速な回答を得る",

        // Toast Messages
        copiedToClipboard: "クリップボードにコピーしました！",
        failedToCopy: "テキストのコピーに失敗しました",
        chatCleared: "チャット履歴をクリアしました",
        loggedOut: "正常にログアウトしました",
        failedLogout: "ログアウトに失敗しました",
        sessionRefreshed: "セッションを更新しました",
        failedRefresh: "更新に失敗しました",
        userLoadError: "ユーザープロファイルを読み込めませんでした。接続を確認するか、セッションを更新してください。",
        failedToSend: "メッセージの送信に失敗しました。もう一度お試しください。",
        codeCopied: "コードをクリップボードにコピーしました！",
        voiceNotSupported: "お使いのブラウザは音声認識をサポートしていません。",
        speechError: "音声認識エラー",
    },

    mandarin: {
        // Header
        appName: "Aura",
        tagline: "您的认知伙伴",
        online: "在线",

        // Settings Menu
        settings: "设置",
        settingsDescription: "自定义Aura AI并管理您的账户。",
        currentAccount: "当前账户",
        aiModel: "AI模型",
        responseLanguage: "响应语言",
        uiLanguage: "界面语言",
        aiCreativity: "AI创造力",
        precise: "精确",
        creative: "创造性",
        voiceSettings: "语音设置",
        autoSpeak: "自动朗读响应",
        aiVoice: "AI语音",
        speechRate: "语速",
        turboMode: "涡轮模式",
        turboModeDesc: "超快速响应（简化提示）",
        appActions: "应用操作",
        installApp: "在设备上安装应用",
        refreshSession: "刷新会话",
        accountManagement: "账户管理",
        changeAccount: "更换账户",
        disconnect: "断开连接",
        clearHistory: "清除聊天历史",
        admin: "管理员",

        // AI Modes
        gpt5: "GPT-5",
        claude: "Claude",
        gemini: "Gemini",
        base44: "Base44 AI",
        code: "Aura Coder",
        flash: "闪电",

        // Chat Interface
        askGpt5: "向GPT-5询问无与伦比的分析...",
        askClaude: "向Claude提问...",
        askGemini: "向Gemini询问任何问题...",
        askBase44: "向Base44 AI询问平台相关问题...",
        askCode: "描述您需要的代码...",
        askFlash: "从Aura AI获得快速答案...",

        // Intro Screen
        gpt5Title: "Aura AI - GPT-5模式",
        gpt5Desc: "与模拟的GPT-5模型互动，获得最高水平的推理和分析深度。",
        claudeTitle: "Aura AI - Claude模式",
        claudeDesc: "体验有用、无害且诚实的AI助手，具有强大的道德规范。",
        geminiTitle: "Aura AI - Gemini模式",
        geminiDesc: "利用Google最强大的多模态模型获得创造性和知识性的答案。",
        base44Title: "Base44 AI",
        base44Desc: "您的Base44平台专家AI助手，针对生产力和开发进行优化。",
        codeTitle: "Aura Coder",
        codeDesc: "您的AI员工工程师，用于生成从简单脚本到超复杂软件架构。",
        flashTitle: "Aura AI - 闪电模式",
        flashDesc: "针对效率优化的超快速超智能响应。",

        // Quick Prompts
        challengeGpt5: "挑战GPT-5",
        startCoding: "开始编码",
        getQuickAnswers: "获得快速答案",

        // Toast Messages
        copiedToClipboard: "已复制到剪贴板！",
        failedToCopy: "复制文本失败",
        chatCleared: "聊天历史已清除",
        loggedOut: "成功退出登录",
        failedLogout: "退出登录失败",
        sessionRefreshed: "会话已刷新",
        failedRefresh: "刷新失败",
        userLoadError: "无法加载用户配置文件。请检查您的连接或尝试刷新会话。",
        failedToSend: "发送消息失败。请重试。",
        codeCopied: "代码已复制到剪贴板！",
        voiceNotSupported: "您的浏览器不支持语音识别。",
        speechError: "语音识别错误",
    },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [uiLanguage, setUiLanguage] = useState('english');

    const t = (key) => {
        return translations[uiLanguage]?.[key] || translations['english'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ uiLanguage, setUiLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};