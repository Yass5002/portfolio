"use client";

import { useState, useRef, useEffect } from 'react';
import type { IconType } from 'react-icons';
import { FaBriefcase, FaTools, FaFolder, FaEnvelope } from 'react-icons/fa';
import { ChatButton } from './ChatButton';
import { ChatModal } from './ChatModal';

export interface Message {
  id: number;
  isBot: boolean;
  text?: string;
  typing?: boolean;
}

export interface QuickReply {
  key: string;
  label: string;
  icon: IconType;
  onClick: () => void;
}

const QUICK_DEFS: Array<{ key: string; label: string; icon: IconType }> = [
  { key: 'career', label: 'Experience', icon: FaBriefcase },
  { key: 'skills', label: 'Tech Stack', icon: FaTools },
  { key: 'projects', label: 'Projects', icon: FaFolder },
  { key: 'contact', label: 'Contact', icon: FaEnvelope },
];

const INTRO_MESSAGES: Message[] = [
  { id: 1, isBot: true, text: "Hey there! I'm Bubble, Yassine's portfolio assistant 😊" },
  { id: 2, isBot: true, text: 'Feel free to type a question or pick a topic below!' },
  { id: 3, isBot: true, text: 'You can ask me about his projects, skills, experience, or anything else!' },
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

let msgIdCounter = INTRO_MESSAGES.length + 1;
function nextId() { return ++msgIdCounter; }

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [showQuick, setShowQuick] = useState(false);
  const [seenIntro, setSeenIntro] = useState(false);
  const [badge, setBadge] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 40);
  };

  const togglePanel = () => {
    if (open) { setOpen(false); return; }
    setOpen(true);
    setBadge(false);
    if (!seenIntro) {
      setSeenIntro(true);
      setMessages(prev => [...prev, ...INTRO_MESSAGES]);
      setShowQuick(true);
    }
    scrollToBottom();
  };

  const pushUser = (text: string) => {
    setMessages(prev => [...prev, { id: nextId(), isBot: false, text }]);
    setShowQuick(false);
    setDraft('');
    scrollToBottom();
  };

  const botReply = async (userText: string) => {
    const typingId = nextId();
    setMessages(prev => [...prev, { id: typingId, isBot: true, typing: true }]);
    scrollToBottom();

    const nextHistory: ChatMessage[] = [
      ...history,
      { role: 'user', content: userText },
    ];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      });

      const data = await res.json() as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? 'Sorry, there was an error getting a response.';

      setHistory([
        ...nextHistory,
        { role: 'assistant', content: reply },
      ]);
      setMessages(prev =>
        prev.map(m => m.id === typingId ? { id: typingId, isBot: true, text: reply } : m)
      );
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === typingId
            ? { id: typingId, isBot: true, text: 'Sorry, a network error occurred. Please try again shortly.' }
            : m
        )
      );
    }

    setShowQuick(true);
    scrollToBottom();
  };

  const handleQuick = (label: string) => {
    pushUser(label);
    botReply(label);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    pushUser(text);
    botReply(text);
  };

  const quickReplies: QuickReply[] = QUICK_DEFS.map(q => ({
    ...q,
    onClick: () => handleQuick(q.label),
  }));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', right: 28, bottom: 96, zIndex: 80,
        fontFamily: "'Quicksand',-apple-system,sans-serif",
      }}
    >
      <ChatModal
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
        showQuick={showQuick}
        quickReplies={quickReplies}
        draft={draft}
        onDraftChange={setDraft}
        onSend={handleSend}
        scrollRef={scrollRef}
      />
      <ChatButton open={open} onClick={togglePanel} showBadge={badge && !open} />
    </div>
  );
}
