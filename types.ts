import React from 'react';

export interface Project {
    id: string;
    domain: 'systems' | 'audio' | 'research' | 'graphics' | 'community' | 'dataset';
    title: string;
    description: string;
    metaLeft: string;
    metaRight: string;
    tags: string[];
    link?: string;
    linkLabel?: string;
    repoUrl?: string;
    demoUrl?: string;
    isPrime?: boolean;
    stat?: string;
}

export interface StreamAsset {
    name: string;
    download_url: string;
    type: string;
}

export interface CursorState {
    active: boolean;
    variant: 'default' | 'hover';
}

export interface NetworkProfile {
    id: string;
    platform: string;
    username: string;
    url: string;
    role: string;
    description: string;
    iconPath?: string; // SVG path data
    iconUrl?: string; // External image URL
    color: string; // Hover glow color
    isShape?: boolean; // If true, renders as fill instead of stroke
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    deliverables: string[];
    techStack: string[];
    icon?: React.ReactNode;
}