"use client";

import { FaTimes } from 'react-icons/fa';
import { BotAvatar } from './BotAvatar';

interface ChatButtonProps {
  open: boolean;
  onClick: () => void;
  showBadge: boolean;
}

export function ChatButton({ open, onClick, showBadge }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close chat" : "Open chat"}
      className="cb-fab"
      style={{
        position: 'relative', width: 60, height: 60,
        borderRadius: '50%', border: 'none', cursor: 'pointer',
        padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: open
          ? 'var(--accent)'
          : 'radial-gradient(circle at 34% 28%,#fff,#9fb2ff 45%,#6c7cf0 100%)',
        transition: 'transform .35s cubic-bezier(.2,.9,.3,1.3),background .35s ease',
        animation: open ? 'none' : 'cbFloat 3.4s ease-in-out infinite',
      }}
    >
      <div style={{
        position: 'absolute',
        transition: 'opacity .3s ease,transform .3s ease',
        opacity: open ? 0 : 1,
        transform: open ? 'scale(.6) rotate(-90deg)' : 'scale(1)',
      }}>
        <BotAvatar size={36} />
      </div>
      <div style={{
        position: 'absolute',
        transition: 'opacity .3s ease,transform .3s ease',
        opacity: open ? 1 : 0,
        transform: open ? 'scale(1)' : 'scale(.6) rotate(90deg)',
        color: 'var(--accent-foreground)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <FaTimes size={20} />
      </div>
      {showBadge && (
        <span style={{
          position: 'absolute', top: -2, right: -2,
          width: 20, height: 20, borderRadius: '50%',
          background: '#ff7a5e', color: '#fff',
          fontSize: 12, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--surface)',
        }}>
          1
        </span>
      )}
    </button>
  );
}
