"use client";

import { useEffect, useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import type { Message, QuickReply } from './index';
import { BotAvatar } from './BotAvatar';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  showQuick: boolean;
  quickReplies: QuickReply[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  scrollRef: RefObject<HTMLDivElement>;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ChatModal({
  open, onClose, messages, showQuick, quickReplies,
  draft, onDraftChange, onSend, scrollRef,
}: ChatModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.inert = !open;

    if (open) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    } else {
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    }
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !rootRef.current) return;

    const focusables = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Bubble Chat"
      onKeyDown={handleKeyDown}
      style={{
        position: 'absolute', bottom: 76, right: 0, width: 370, maxWidth: '88vw',
        transformOrigin: 'bottom right',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.92)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .32s ease, transform .42s cubic-bezier(.2,.9,.3,1.3)',
      }}>
      <div style={{
        display: 'flex', flexDirection: 'column', height: 520, maxHeight: '72vh',
        borderRadius: 20, overflow: 'hidden',
        background: 'var(--surface)',
        backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px',
          background: 'var(--accent)', color: 'var(--accent-foreground)', flex: 'none',
        }}>
          <div style={{ position: 'relative', width: 42, height: 42, flex: 'none' }}>
            <BotAvatar size={42} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Quicksand',sans-serif", fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>
              Bubble
            </div>
            <div style={{ marginTop: 2 }}>
              <span style={{ fontSize: 12, opacity: 0.92 }}>Usually replies in seconds</span>
            </div>
          </div>
        </div>

        <MessageList
          messages={messages}
          showQuick={showQuick}
          quickReplies={quickReplies}
          scrollRef={scrollRef}
        />

        <InputBar value={draft} onChange={onDraftChange} onSend={onSend} />
      </div>
    </div>
  );
}
