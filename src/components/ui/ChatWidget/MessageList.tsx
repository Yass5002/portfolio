"use client";

import type { RefObject } from 'react';
import type { Message, QuickReply } from './index';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  showQuick: boolean;
  quickReplies: QuickReply[];
  scrollRef: RefObject<HTMLDivElement>;
}

export function MessageList({ messages, showQuick, quickReplies, scrollRef }: MessageListProps) {
  return (
    <div
      ref={scrollRef}
      className="cb-scroll"
      style={{
        flex: 1, overflowY: 'auto', padding: '18px 16px 8px',
        display: 'flex', flexDirection: 'column', gap: 12,
        background: 'var(--surface)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 2 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)',
          background: 'var(--card)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 10,
        }}>Today</span>
      </div>

      {messages.map(m => <MessageItem key={m.id} message={m} />)}

      {showQuick && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '4px 0 6px 38px', animation: 'cbPop .4s ease both' }}>
          {quickReplies.map(q => {
            const Icon = q.icon;
            return (
              <button
                key={q.key}
                onClick={q.onClick}
                className="cb-chip"
                style={{
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '9px 15px', borderRadius: 10,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  color: 'var(--accent)', fontWeight: 600, fontSize: 13.5,
                }}
              >
                <Icon size={13} />
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
