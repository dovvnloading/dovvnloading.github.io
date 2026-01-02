
import { Project, NetworkProfile, ServiceItem } from './types';

export const GITHUB_ASSETS_API = "https://api.github.com/repos/dovvnloading/dovvnloading.github.io/contents/assets";

export const NAVIGATION_LINKS = [
    { id: 'overview', label: 'Index / Profile' },
    { id: 'hire', label: 'For Hire / Services' },
    { id: 'graphite', label: 'Systems Architecture' },
    { id: 'audio', label: 'Audio & DSP' },
    { id: 'research', label: 'Research & AI' },
    { id: 'graphics', label: 'Graphics & Rendering' },
    { id: 'community', label: 'Community & Data' },
    { id: 'network', label: 'Network / Connect' },
];

export const NETWORK_PROFILES: NetworkProfile[] = [
    {
        id: 'github',
        platform: 'GitHub',
        username: '@dovvnloading',
        url: 'https://github.com/dovvnloading',
        role: 'Code Repository',
        description: 'Primary source for all open-source systems, audio engines, and experimental protocols.',
        color: '#ffffff',
        iconPath: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'
    },
    {
        id: 'huggingface',
        platform: 'Hugging Face',
        username: '@mattwesney',
        url: 'https://huggingface.co/mattwesney',
        role: 'Datasets & Models',
        description: 'Hosting synthetic reasoning datasets (CoT) and specialized fine-tuned models.',
        color: '#FFD21E',
        // Correct HF Emoji Face Logo (Pirate Version)
        iconUrl: 'https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo-pirate.svg',
        isShape: false
    },
    {
        id: 'youtube',
        platform: 'YouTube',
        username: 'Matthew Wesney',
        url: 'https://youtube.com/channel/UCUoDm8chmkIMrYOrRqeRO-Q',
        role: 'Visual Essays',
        description: 'Video documentation of system architectures, graphics demos, and audio performance.',
        color: '#FF0000',
        iconPath: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z'
    },
    {
        id: 'soundcloud',
        platform: 'SoundCloud',
        username: 'D3VAUX',
        url: 'https://soundcloud.app.goo.gl/B1bAS',
        role: 'Audio Streams',
        description: 'A massive collection spanning 15 years. My old life in sound design and ghost production.',
        color: '#FF5500',
        iconPath: 'M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.18 0-.356.011-.53.03-.455-2.296-2.47-4.03-4.9-4.03-2.76 0-5 2.24-5 5h-1c-2.76 0-5 2.24-5 5s2.24 5 5 5h11.5z'
    },
    {
        id: 'twitter',
        platform: 'X / Twitter',
        username: '@d3vaux',
        url: 'https://x.com/d3vaux',
        role: 'Signals & Comms',
        description: 'Direct communication line. Real-time updates on development and research.',
        color: '#ffffff',
        // Official X Logo Path
        iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
        isShape: true
    },
    {
        id: 'pianobook',
        platform: 'Pianobook',
        username: 'Matt Wesney',
        url: 'https://www.pianobook.co.uk/profile/mattwesney/',
        role: 'Sample Libraries',
        description: 'High-fidelity instruments for Kontakt and Decent Sampler. Texture and degradation focus.',
        color: '#0088ff',
        iconPath: 'M3 3h18v18H3V3zm4 0v12m4-12v12m4-12v12m4-12v12M3 15h18'
    }
];

export const SERVICES: ServiceItem[] = [
    {
        id: 'systems-arch',
        title: 'Systems Design',
        description: 'End-to-end architecture of complex, stateful applications. Specialized in local-first environments that do not rely on fragile external APIs.',
        deliverables: ['System Architecture', 'Database Schema', 'State Management', 'Security Protocols'],
        techStack: ['Python', 'TypeScript', 'Rust', 'SQLite']
    },
    {
        id: 'dsp-audio',
        title: 'Custom DSP & Audio',
        description: 'Development of browser-based audio engines and VST plugins. I build raw signal processing chains from scratch without relying on pre-baked libraries.',
        deliverables: ['Web Audio API Engines', 'VST/AU Plugins', 'Spectral Analysis', 'Real-time Synthesis'],
        techStack: ['WebAudio API', 'C++', 'JUCE', 'WASM']
    },
    {
        id: 'synthetic-data',
        title: 'Synthetic Pipelines',
        description: 'Construction of bespoke data generation pipelines for fine-tuning LLMs. I design the logic to create high-quality "Chain of Thought" reasoning datasets.',
        deliverables: ['Data Synthesis', 'Pipeline Orchestration', 'Validation Agents', 'HuggingFace Integration'],
        techStack: ['Python', 'Pandas', 'Ollama', 'PyTorch']
    },
    {
        id: 'llm-integration',
        title: 'LLM Technical Advisement',
        description: 'Expert guidance on integrating Large Language Models into existing web or desktop ecosystems. Focus on privacy, latency, and context window optimization.',
        deliverables: ['RAG Architecture', 'Prompt Engineering', 'Model Selection', 'Local Inference Setup'],
        techStack: ['LlamaIndex', 'LangChain', 'Gemini API', 'Ollama']
    },
    {
        id: 'ai-consulting',
        title: 'AI/ML Implementation',
        description: 'Hands-on consulting for deploying machine learning models. From selecting the right quantization to optimizing inference on consumer hardware.',
        deliverables: ['Model Quantization', 'Inference Optimization', 'Hardware Spec', 'Deployment Strategy'],
        techStack: ['GGUF', 'ONNX', 'CUDA', 'Metal']
    },
    {
        id: 'web-engineering',
        title: 'High-Fidelity Web Design',
        description: 'Production of "next-level" web applications that feel like native software. Heavy focus on performance, animations, and non-standard layouts.',
        deliverables: ['React Architecture', 'Custom Component Systems', 'Animation Choreography', 'PWA'],
        techStack: ['React 19', 'Tailwind', 'Framer Motion', 'Vite']
    },
    {
        id: 'experience-design',
        title: 'Experience Design (UX)',
        description: 'Crafting user journeys for complex tools. I specialize in making dense, data-heavy interfaces feel intuitive and "flow" naturally.',
        deliverables: ['User Journey Mapping', 'Information Architecture', 'Interaction Models', 'Prototyping'],
        techStack: ['Figma', 'Rive', 'Spline']
    },
    {
        id: 'conceptual-ui',
        title: 'Conceptual Interface',
        description: 'Designing the "impossible" interfaces. UI flows that break standard patterns to solve specific domain problems in creative ways.',
        deliverables: ['High-Fidelity Mockups', 'Motion Design', 'Design Systems', 'Micro-interactions'],
        techStack: ['CSS3', 'Canvas', 'SVG']
    },
    {
        id: 'desktop-packaging',
        title: 'Desktop Packaging',
        description: 'Converting web or Python applications into distributable, signed executables for Windows and macOS. Handling the messy parts of deployment.',
        deliverables: ['MSI/EXE Installers', 'Code Signing', 'Auto-updaters', 'Cross-platform Build'],
        techStack: ['Electron', 'Tauri', 'PyInstaller', 'Inno Setup']
    },
    {
        id: 'local-first',
        title: 'Local-First Architecture',
        description: 'Architecting software that works 100% offline. Prioritizing user ownership of data and zero-latency interactions.',
        deliverables: ['Offline Sync', 'CRDTs', 'Local Databases', 'Privacy Compliance'],
        techStack: ['RxDB', 'PouchDB', 'IndexedDB']
    },
    {
        id: 'webgl-shaders',
        title: 'WebGL & Shaders',
        description: 'Custom GLSL shader development for high-performance visual effects. Creating marketing assets that render in real-time in the browser.',
        deliverables: ['Fragment Shaders', 'Vertex Shaders', '3D Scene Comp', 'Post-processing'],
        techStack: ['Three.js', 'GLSL', 'React Three Fiber']
    }
];

export const PROJECTS: Project[] = [
    // --- SYSTEMS ---
    {
        id: 'graphite-main',
        domain: 'systems',
        title: 'Graphite',
        description: 'An advanced desktop environment transforming linear AI interactions into a visual, non-linear reasoning space. Replaces chronological chat logs with an infinite node-based canvas for branching conversations. Features a "local-first" architecture via Ollama for privacy, specialized plotting agents, and secure SQLite storage for a highly customizable research workspace.',
        metaLeft: 'Workspace',
        metaRight: 'Python',
        tags: ['Node Graph', 'PySide6', 'Local LLM'],
        link: 'https://github.com/dovvnloading/Graphite',
        linkLabel: ':: VIEW SOURCE ->',
        isPrime: true
    },
    {
        id: 'graphite-webdev',
        domain: 'systems',
        title: 'Graphite: WebDev',
        description: 'A proprietary, browser-native IDE acting as a cognitive partner. Features a Multi-Agent Swarm (Planner, Developer, Reviewer) to automate complex coding tasks. Runs entirely client-side using a Shadow Output Protocol for deterministic modifications, offering a sandboxed preview environment and full GitHub integration within a virtualized web OS.',
        metaLeft: 'IDE',
        metaRight: 'React 19',
        tags: ['Agentic Swarm', 'Shadow DOM', 'WebOS'],
        link: 'https://github.com/dovvnloading/Graphite-WebDev',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'graphite-git',
        domain: 'systems',
        title: 'Graphite: Git',
        description: 'High-performance, browser-based GitHub management tool operating entirely client-side for security and advanced auditing capabilities.',
        metaLeft: 'Client',
        metaRight: 'TypeScript',
        tags: ['Git', 'GitHub API', 'Secure'],
        link: 'https://github.com/dovvnloading/Graphite-Git',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'graphite-logica',
        domain: 'systems',
        title: 'Graphite: Logica',
        description: 'A "Visual Flow Engineering" protocol designed to bridge the Stochastic-Deterministic Gap. Decouples probabilistic inference from logic loops using a hybrid runtime. Utilizes a directed graph execution model, parallel Map-Reduce threads, and "Circuit Breaker" protocols to transpile visual agent workflows into production-grade Python.',
        metaLeft: 'Protocol',
        metaRight: 'Whitepaper',
        tags: ['Orchestration', 'Logic', 'Cognitive'],
        link: 'https://github.com/dovvnloading/Graphite-Logica',
        linkLabel: ':: READ PAPER ->'
    },
    {
        id: 'mindmap-v2',
        domain: 'systems',
        title: 'MindMap V2',
        description: 'High-performance visualization engine that transforms structured Markdown text into interactive, force-directed node graphs in real-time.',
        metaLeft: 'Engine',
        metaRight: 'TypeScript',
        tags: ['Visualization', 'Node Graph', 'Markdown'],
        repoUrl: 'https://github.com/dovvnloading/MindMap-V2',
        demoUrl: 'https://dovvnloading.github.io/MindMap-V2/'
    },
    {
        id: 'ouroboros',
        domain: 'systems',
        title: 'Ouroboros',
        description: 'An infinite canvas where AI agents design, code, and hot-load interactive React widgets in real-time.',
        metaLeft: 'Runtime',
        metaRight: 'TypeScript',
        tags: ['AI Agents', 'Recursive', 'React'],
        link: 'https://github.com/dovvnloading/Ouroboros',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'file2md',
        domain: 'systems',
        title: 'File2MD',
        description: 'Sleek desktop app that converts text to Markdown using private, local AI. Powered by Ollama for secure, offline formatting.',
        metaLeft: 'Desktop',
        metaRight: 'Python',
        tags: ['Markdown', 'Ollama', 'Productivity'],
        link: 'https://github.com/dovvnloading/File2MD',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'py2exe',
        domain: 'systems',
        title: 'Py2Exe GUI',
        description: 'Modern GUI for PyInstaller. Simplifies building Python executables with a clean, themeable interface and real-time build logs.',
        metaLeft: 'Tool',
        metaRight: 'Python',
        tags: ['Packaging', 'PyInstaller', 'GUI'],
        link: 'https://github.com/dovvnloading/Py2Exe',
        linkLabel: ':: VIEW SOURCE ->'
    },

    // --- AUDIO ---
    {
        id: 'soisto',
        domain: 'audio',
        title: 'Soisto Beat Machine',
        description: 'Browser-based production environment designed to bridge the gap between physical hardware tactility and web-based DSP.',
        metaLeft: 'Production',
        metaRight: 'TypeScript',
        tags: ['Web Audio', 'DSP', 'Sequencer'],
        repoUrl: 'https://github.com/dovvnloading/Soisto-Beat-Machine',
        demoUrl: 'https://dovvnloading.github.io/Soisto-Beat-Machine/'
    },
    {
        id: 'somnium',
        domain: 'audio',
        title: 'Somnium',
        description: 'High-fidelity ambient noise generator designed for deep sleep induction and focus enhancement using procedural sound processing.',
        metaLeft: 'Ambient',
        metaRight: 'TypeScript',
        tags: ['Procedural', 'DSP', 'Wellness'],
        repoUrl: 'https://github.com/dovvnloading/Somnium-Sleep-App',
        demoUrl: 'https://dovvnloading.github.io/Somnium-Sleep-App/'
    },
    {
        id: 'aetheria',
        domain: 'audio',
        title: 'Aetheria 3X',
        description: 'Browser-based, polyphonic subtractive synthesizer with a triple-oscillator architecture and custom DSP effects chain.',
        metaLeft: 'Synth',
        metaRight: 'TypeScript',
        tags: ['Subtractive', 'Web Audio', 'Polyphonic'],
        repoUrl: 'https://github.com/dovvnloading/Aetheria-3X',
        demoUrl: 'https://dovvnloading.github.io/Aetheria-3X/'
    },
    {
        id: 'neumawave',
        domain: 'audio',
        title: 'NeumaWave Shaper',
        description: 'Polyphonic wavetable synthesizer featuring a fully neumorphic user interface and custom transfer functions for aggressive saturation.',
        metaLeft: 'Synth',
        metaRight: 'TypeScript',
        tags: ['Wavetable', 'Distortion', 'Neumorphic'],
        repoUrl: 'https://github.com/dovvnloading/NeumaWave-Shaper',
        demoUrl: 'https://dovvnloading.github.io/NeumaWave-Shaper/'
    },
    {
        id: 'gitdat',
        domain: 'audio',
        title: 'GitDat VST',
        description: 'High-fidelity subtractive synthesizer that translates binary file structures and code repositories into wavetable data.',
        metaLeft: 'Experimental',
        metaRight: 'TypeScript',
        tags: ['Sonification', 'Wavetable', 'Data Bending'],
        repoUrl: 'https://github.com/dovvnloading/GitDat-VST',
        demoUrl: 'https://dovvnloading.github.io/GitDat-VST/'
    },
    {
        id: 'nexus-dj',
        domain: 'audio',
        title: 'Nexus DJ',
        description: 'Professional-grade, browser-based DJ controller replicating Pioneer-standard hardware with client-side spectral analysis.',
        metaLeft: 'DJ',
        metaRight: 'TypeScript',
        tags: ['Controller', 'Spectral', 'Mixing'],
        repoUrl: 'https://github.com/dovvnloading/Nexus-DJ',
        demoUrl: 'https://dovvnloading.github.io/Nexus-DJ/'
    },

    // --- RESEARCH ---
    {
        id: 'cortex',
        domain: 'research',
        title: 'Cortex',
        description: 'High-performance, privacy-centric desktop assistant designed for 100% local interaction via Ollama. Prioritizes autonomy by processing requests entirely on hardware with a persistent memory system. Built on a modular PySide6 architecture, it offers asynchronous processing, chat forking, and deep system prompt customization.',
        metaLeft: 'Desktop',
        metaRight: 'Python',
        tags: ['Local LLM', 'PySide6', 'Ollama'],
        link: 'https://github.com/dovvnloading/Cortex',
        linkLabel: ':: VIEW SOURCE ->',
        isPrime: true
    },
    {
        id: 'echolingua',
        domain: 'research',
        title: 'EchoLingua',
        description: 'Real-time interpretation and deep linguistic analysis through Google’s low-latency Gemini Live API.',
        metaLeft: 'Translator',
        metaRight: 'TypeScript',
        tags: ['Gemini Live', 'Translation', 'Linguistics'],
        link: 'https://github.com/dovvnloading/EchoLingua',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'deepseek-r1',
        domain: 'research',
        title: 'Local Deepseek R1',
        description: 'Modern desktop interface for local language models through Ollama. Features persistent chat history and real-time model switching.',
        metaLeft: 'Chat',
        metaRight: 'Python',
        tags: ['Deepseek', 'Ollama', 'PyQt5'],
        link: 'https://github.com/dovvnloading/Local-Deepseek-R1',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'polyglot',
        domain: 'research',
        title: 'Polyglot Analyzer',
        description: 'Desktop-based static analysis tool providing clear, immediate insights into code structure across dozens of programming languages.',
        metaLeft: 'Analysis',
        metaRight: 'Python',
        tags: ['Static Analysis', 'PySide6', 'Code Quality'],
        link: 'https://github.com/dovvnloading/Polyglot-Code-Analyzer',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'web-search-ai',
        domain: 'research',
        title: 'Autonomous Search',
        description: 'Advanced AI research assistant that provides trustworthy, real-time answers by validating and synthesizing online sources.',
        metaLeft: 'Agent',
        metaRight: 'Python',
        tags: ['Research', 'Web Search', 'Validation'],
        link: 'https://github.com/dovvnloading/Autonomous-AI-Web-Search-Assistant',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'tree-graph',
        domain: 'research',
        title: 'Tree Graph AI',
        description: 'Transforms raw, unstructured text into an interactive mind map using local LLMs to intelligently structure information.',
        metaLeft: 'Visualization',
        metaRight: 'Python',
        tags: ['NLP', 'Ollama', 'Mind Map'],
        link: 'https://github.com/dovvnloading/Tree-Graph-MindMap',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'fine-tuned',
        domain: 'research',
        title: 'Fine-Tuned',
        description: 'Desktop application designed to bridge the gap between powerful language model fine-tuning and a user-friendly graphical interface.',
        metaLeft: 'Utility',
        metaRight: 'Python',
        tags: ['LLM', 'Fine-Tuning', 'Training'],
        link: 'https://github.com/dovvnloading/Fine-Tuned',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'clarity',
        domain: 'research',
        title: 'Clarity',
        description: 'Sophisticated desktop application for in-depth text analysis. Leverages local LLMs to provide users with deep insights.',
        metaLeft: 'Analysis',
        metaRight: 'Python',
        tags: ['NLP', 'Text Analysis', 'Local AI'],
        link: 'https://github.com/dovvnloading/clarity',
        linkLabel: ':: VIEW SOURCE ->'
    },

    // --- DATASETS (NEW SECTION) ---
    {
        id: 'cot-medical',
        domain: 'dataset',
        title: 'CoT Medical Diagnosis',
        description: 'Comprehensive synthetic Chain-of-Thought dataset focused on clinical reasoning, symptom analysis, and diagnostic pathways.',
        metaLeft: 'Dataset',
        metaRight: 'Healthcare',
        tags: ['Medical', 'CoT', 'Reasoning'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Medical_Diagnosis',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-general-inquiry',
        domain: 'dataset',
        title: 'General Inquiry CoT',
        description: 'Broad-spectrum Chain-of-Thought dataset designed to enhance general reasoning capabilities across diverse topics.',
        metaLeft: 'Dataset',
        metaRight: 'General',
        tags: ['CoT', 'Synthetic', 'Logic'],
        link: 'https://huggingface.co/datasets/moremilk/General_Inquiry_Thinking-Chain-Of-Thought',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-ancient-past',
        domain: 'dataset',
        title: 'CoT Ancient Past',
        description: 'Historical reasoning dataset focusing on archaeological context, ancient civilizations, and temporal logic.',
        metaLeft: 'Dataset',
        metaRight: 'History',
        tags: ['History', 'CoT', 'Education'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_The_Ancient_Past',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-first-responders',
        domain: 'dataset',
        title: 'First Responders CoT',
        description: 'Critical decision-making dataset for emergency triage, disaster response, and high-pressure situational awareness.',
        metaLeft: 'Dataset',
        metaRight: 'Safety',
        tags: ['Triage', 'Emergency', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_First_Responders_Triage_And_Emergencies',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-photography',
        domain: 'dataset',
        title: 'CoT Photography',
        description: 'Technical and artistic reasoning chains regarding composition, lighting physics, and camera equipment configurations.',
        metaLeft: 'Dataset',
        metaRight: 'Creative',
        tags: ['Art', 'Physics', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Photography',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-nature',
        domain: 'dataset',
        title: 'CoT Nature & Wildlife',
        description: 'Ecological reasoning dataset covering behavioral biology, ecosystem dynamics, and environmental conservation.',
        metaLeft: 'Dataset',
        metaRight: 'Biology',
        tags: ['Nature', 'Wildlife', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Nature_And_Wildlife',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-fungi',
        domain: 'dataset',
        title: 'CoT Fungi Info',
        description: 'Specialized mycological reasoning chains focusing on identification, taxonomy, and mycelial network structures.',
        metaLeft: 'Dataset',
        metaRight: 'Mycology',
        tags: ['Fungi', 'Biology', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_General_Fungi_Info',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-mens-health',
        domain: 'dataset',
        title: 'CoT Men\'s Mental Health',
        description: 'Sensitive reasoning dataset addressing psychological well-being, emotional processing, and support mechanisms for men.',
        metaLeft: 'Dataset',
        metaRight: 'Health',
        tags: ['Mental Health', 'Psychology', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Mens_Mental_Health',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-edm',
        domain: 'dataset',
        title: 'CoT EDM & Bass Music',
        description: 'Audio engineering reasoning chains focused on sound design, mixing techniques, and electronic music theory.',
        metaLeft: 'Dataset',
        metaRight: 'Audio',
        tags: ['Music', 'DSP', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/Cot_Reasoning_EDM_And_Bass_Music',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-quantum',
        domain: 'dataset',
        title: 'CoT Quantum Physics',
        description: 'Advanced scientific reasoning dataset covering quantum mechanics, computing principles, and theoretical physics.',
        metaLeft: 'Dataset',
        metaRight: 'Physics',
        tags: ['Quantum', 'Computing', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Quantom_Physics_And_Computing',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-heartbreak',
        domain: 'dataset',
        title: 'CoT Emotional Processing',
        description: 'Psychological reasoning chains focused on navigating relationship dynamics, grief, and emotional resilience.',
        metaLeft: 'Dataset',
        metaRight: 'Psychology',
        tags: ['Emotion', 'Resilience', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Heartbreak_and_Breakups',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-problem-solving',
        domain: 'dataset',
        title: 'Reasoning & Solving',
        description: 'General purpose problem-solving dataset utilizing multi-step logical deduction and analytical thinking patterns.',
        metaLeft: 'Dataset',
        metaRight: 'Logic',
        tags: ['Problem Solving', 'Logic', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/Reasoning_Problem_Solving_Dataset',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-bushcraft',
        domain: 'dataset',
        title: 'CoT Bushcraft Survival',
        description: 'Practical reasoning chains for wilderness survival, resource management, and primitive technology.',
        metaLeft: 'Dataset',
        metaRight: 'Survival',
        tags: ['Outdoors', 'Skills', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Bushcraft_Survival',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-legal',
        domain: 'dataset',
        title: 'CoT Legal & Laws',
        description: 'Juridical reasoning dataset covering legal interpretation, case law analysis, and statutory frameworks.',
        metaLeft: 'Dataset',
        metaRight: 'Legal',
        tags: ['Law', 'Justice', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Legal_Issues_And_Laws',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-science',
        domain: 'dataset',
        title: 'CoT Scientific Discovery',
        description: 'Methodological reasoning chains regarding the scientific method, hypothesis generation, and experimental design.',
        metaLeft: 'Dataset',
        metaRight: 'Science',
        tags: ['Research', 'Methodology', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Scientific_Discovery_and_Research',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-clinical-mental',
        domain: 'dataset',
        title: 'CoT Clinical Mental Health',
        description: 'Professional-grade reasoning dataset for psychiatric assessment and therapeutic intervention strategies.',
        metaLeft: 'Dataset',
        metaRight: 'Clinical',
        tags: ['Psychiatry', 'Health', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Clinical_Diagnosis_Mental_Health',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-cooking',
        domain: 'dataset',
        title: 'CoT Culinary Arts',
        description: 'Gastronomic reasoning chains covering molecular gastronomy, flavor pairing, and cooking techniques.',
        metaLeft: 'Dataset',
        metaRight: 'Culinary',
        tags: ['Cooking', 'Chemistry', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Cooking',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-movies',
        domain: 'dataset',
        title: 'CoT Cinema & Movies',
        description: 'Cinematic reasoning dataset analyzing narrative structures, film theory, and visual storytelling.',
        metaLeft: 'Dataset',
        metaRight: 'Arts',
        tags: ['Film', 'Narrative', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Movies',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-python',
        domain: 'dataset',
        title: 'CoT Python Query',
        description: 'Software engineering reasoning chains focused on Pythonic patterns, algorithm optimization, and debugging.',
        metaLeft: 'Dataset',
        metaRight: 'Code',
        tags: ['Python', 'Programming', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Reasoning_Python_General_Query',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-temporal',
        domain: 'dataset',
        title: 'CoT Temporal Reasoning',
        description: 'Complex reasoning dataset focused on time-based logic, causality, and sequential event processing.',
        metaLeft: 'Dataset',
        metaRight: 'Logic',
        tags: ['Time', 'Causality', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Temporal_Reasoning_Dataset',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-philosophy',
        domain: 'dataset',
        title: 'CoT Philosophy',
        description: 'Deep philosophical reasoning chains covering epistemology, ethics, metaphysics, and logic.',
        metaLeft: 'Dataset',
        metaRight: 'Philosophy',
        tags: ['Thought', 'Ethics', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Philosophical_Understanding',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-neurodivergent',
        domain: 'dataset',
        title: 'CoT Neurodivergence',
        description: 'Social reasoning dataset modeling interactions and communication styles between neurodivergent and neurotypical minds.',
        metaLeft: 'Dataset',
        metaRight: 'Social',
        tags: ['Psychology', 'Communication', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Neurodivergent_vs_Neurotypical_Interactions',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-culture',
        domain: 'dataset',
        title: 'CoT Cultural Nuances',
        description: 'Sociological reasoning chains regarding global customs, etiquette, and cross-cultural communication.',
        metaLeft: 'Dataset',
        metaRight: 'Culture',
        tags: ['Sociology', 'Global', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT-Reasoning_Cultural_Nuances',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-rare-diseases',
        domain: 'dataset',
        title: 'CoT Rare Diseases',
        description: 'Specialized medical dataset for diagnosing and understanding rare and orphan diseases.',
        metaLeft: 'Dataset',
        metaRight: 'Medical',
        tags: ['Pathology', 'Rare', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Rare-Diseases_And_Health-Conditions',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'cot-music-daw',
        domain: 'dataset',
        title: 'CoT Music DAW',
        description: 'Technical reasoning chains for Digital Audio Workstations, workflow optimization, and production tools.',
        metaLeft: 'Dataset',
        metaRight: 'Tech',
        tags: ['Audio', 'DAW', 'CoT'],
        link: 'https://huggingface.co/datasets/moremilk/CoT_Music_Production_DAW',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'tot-problem-solving',
        domain: 'dataset',
        title: 'ToT Problem Solving V2',
        description: 'Tree-of-Thought dataset implementing branching logic paths for complex, multi-layered problem solving.',
        metaLeft: 'Dataset',
        metaRight: 'Logic',
        tags: ['ToT', 'Branching', 'Reasoning'],
        link: 'https://huggingface.co/datasets/moremilk/ToT_Reasoning_Problem_Solving_Dataset_V2',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'tot-math',
        domain: 'dataset',
        title: 'ToT Math V1',
        description: 'Mathematical Tree-of-Thought dataset for exploring multiple solution paths in algebraic and calculus problems.',
        metaLeft: 'Dataset',
        metaRight: 'Math',
        tags: ['ToT', 'Math', 'Logic'],
        link: 'https://huggingface.co/datasets/moremilk/ToT-Math-V1',
        linkLabel: ':: VIEW DATA ->'
    },
    {
        id: 'tot-biology',
        domain: 'dataset',
        title: 'ToT Biology',
        description: 'Biological Tree-of-Thought dataset analyzing complex biological systems through branching reasoning paths.',
        metaLeft: 'Dataset',
        metaRight: 'Biology',
        tags: ['ToT', 'Science', 'Reasoning'],
        link: 'https://huggingface.co/datasets/moremilk/ToT-Biology',
        linkLabel: ':: VIEW DATA ->'
    },

    // --- GRAPHICS ---
    {
        id: 'os-ve',
        domain: 'graphics',
        title: 'OS-VE',
        description: 'Professional-grade, web-based non-linear video editing (NLE) suite constructed entirely on modern web technologies.',
        metaLeft: 'NLE',
        metaRight: 'TypeScript',
        tags: ['Video Editor', 'Canvas', 'WebGL'],
        repoUrl: 'https://github.com/dovvnloading/Os-Video-Editor',
        demoUrl: 'https://dovvnloading.github.io/Os-Video-Editor/',
        isPrime: true
    },
    {
        id: 'os-sculpt',
        domain: 'graphics',
        title: 'Os-Sculpt',
        description: 'Professional in-browser 3D sculpting engine. Real-time mesh deformation, vertex painting, and OBJ export via direct buffer manipulation.',
        metaLeft: '3D',
        metaRight: 'TypeScript',
        tags: ['Sculpting', 'Three.js', 'Modeling'],
        link: 'https://github.com/dovvnloading/Os-Sculpt',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'shader-pro',
        domain: 'graphics',
        title: 'Shader Pro v1',
        description: 'Client-side web application designed to streamline the creation of high-quality product marketing assets via real-time shaders.',
        metaLeft: 'Composition',
        metaRight: 'TypeScript',
        tags: ['GLSL', 'Shaders', 'Marketing'],
        repoUrl: 'https://github.com/dovvnloading/Shader-Pro-v1',
        demoUrl: 'https://dovvnloading.github.io/Shader-Pro-v1/'
    },
    {
        id: 'dither-pro-2',
        domain: 'graphics',
        title: 'Dither Pro 2.0',
        description: 'Web-based application designed to bring advanced image dithering algorithms (Floyd-Steinberg, Atkinson) to a modern interface.',
        metaLeft: 'Processing',
        metaRight: 'TypeScript',
        tags: ['Dithering', 'Algorithms', 'Image'],
        repoUrl: 'https://github.com/dovvnloading/Dither-Pro-2',
        demoUrl: 'https://dovvnloading.github.io/Dither-Pro-2/'
    },
    {
        id: 'adgeni',
        domain: 'graphics',
        title: 'AdGeni',
        description: 'All-in-one creative suite to streamline ad campaign creation. Move seamlessly from initial concept to a fully composed video ad.',
        metaLeft: 'Suite',
        metaRight: 'TypeScript',
        tags: ['Advertising', 'AI Video', 'Workflow'],
        link: 'https://github.com/dovvnloading/AdGeni',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'webp-conv',
        domain: 'graphics',
        title: 'Os-WEBP',
        description: 'Lightweight, privacy-focused web application designed to convert WEBP images into universally supported formats using WASM.',
        metaLeft: 'Tool',
        metaRight: 'TypeScript',
        tags: ['WASM', 'Compression', 'Privacy'],
        repoUrl: 'https://github.com/dovvnloading/Os-WEBP-Converter',
        demoUrl: 'https://dovvnloading.github.io/Os-WEBP-Converter/'
    },
    {
        id: 'sapphire',
        domain: 'graphics',
        title: 'Sapphire GenXL',
        description: 'Standalone desktop application harnessing the power of diffusion models (RunDiffusion/Juggernaut-XL-v9) for image generation.',
        metaLeft: 'GenAI',
        metaRight: 'Python',
        tags: ['Stable Diffusion', 'Image Gen', 'Desktop'],
        link: 'https://github.com/dovvnloading/Sapphire-Image-GenXL',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'normalizer',
        domain: 'graphics',
        title: 'Normalizer',
        description: 'Powerful desktop application for generating high-quality normal maps from 2D images. Designed for 3D artists and game devs.',
        metaLeft: 'Tool',
        metaRight: 'Python',
        tags: ['3D', 'Textures', 'Normal Maps'],
        link: 'https://github.com/dovvnloading/normalizer',
        linkLabel: ':: VIEW SOURCE ->'
    },
    {
        id: 'colorpix',
        domain: 'graphics',
        title: 'ColorPix',
        description: 'A powerful desktop color-palette toolkit for designers, developers, and artists, built with PySide6.',
        metaLeft: 'Tool',
        metaRight: 'Python',
        tags: ['Color', 'Design', 'Palette'],
        link: 'https://github.com/dovvnloading/ColorPix',
        linkLabel: ':: VIEW SOURCE ->'
    }
];

export const COMMUNITY_ITEMS: Project[] = [
    {
        id: 'pianobook',
        domain: 'community',
        title: '18K+ DLs',
        description: 'High-fidelity Kontakt libraries focused on texture and degradation. Includes "The Synths" and "Broken Piano."',
        metaLeft: 'Sample Library',
        metaRight: '',
        tags: [],
        stat: '18K+ DLs',
        link: 'https://www.pianobook.co.uk/profile/mattwesney/',
        linkLabel: ':: ACCESS LIBRARY ->'
    },
    {
        id: 'huggingface',
        domain: 'community',
        title: '151K Rows',
        description: '"Synthetic Reasoning Data." A dataset explicitly tailored for fine-tuning AI in logical reasoning (Chain of Thought).',
        metaLeft: 'Dataset',
        metaRight: '',
        tags: [],
        stat: '151K Rows',
        link: 'https://huggingface.co/mattwesney',
        linkLabel: ':: VIEW DATASET ->'
    }
];
