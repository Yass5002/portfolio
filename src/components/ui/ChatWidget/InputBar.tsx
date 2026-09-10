"use client";

import type { KeyboardEvent } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function InputBar({ value, onChange, onSend }: InputBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div style={{
      flex: 'none', padding: '12px 14px',
      borderTop: '1px solid var(--border)',
      background: 'var(--card)',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        style={{
          flex: 1, minWidth: 0, border: '1px solid var(--border)', outline: 'none',
          background: 'var(--bg)', borderRadius: 10, padding: '13px 16px',
          fontFamily: 'inherit', fontSize: 14, color: 'var(--foreground)',
        }}
      />
      <button
        onClick={onSend}
        aria-label="Send"
        className="cb-send"
        style={{
          flex: 'none', width: 44, height: 44, border: 'none', cursor: 'pointer',
          borderRadius: 10,
          background: 'var(--accent)', color: 'var(--accent-foreground)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform .25s cubic-bezier(.2,.9,.3,1.3), background .2s ease',
        }}
      >
        <FaPaperPlane size={15} />
      </button>
    </div>
  );
}
