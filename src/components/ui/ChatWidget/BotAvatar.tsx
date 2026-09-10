interface BotAvatarProps {
  size: number;
}

export function BotAvatar({ size: s }: BotAvatarProps) {
  return (
    <div style={{ width: s, height: s, position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 28%,#ffffff,#d3ddff 46%,#8ea2ff 100%)',
      }} />
      <div style={{
        position: 'absolute', top: s * 0.13, left: s * 0.2,
        width: s * 0.3, height: s * 0.19,
        borderRadius: '50%', background: 'rgba(255,255,255,.7)',
        filter: 'blur(1.5px)', transform: 'rotate(-24deg)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex', gap: s * 0.2,
      }}>
        <span style={{
          display: 'block', width: s * 0.14, height: s * 0.05, minHeight: 3,
          borderRadius: '0 0 8px 8px', background: '#5a63a8',
          animation: 'cbBlink 5.5s ease-in-out infinite', transformOrigin: 'center',
        }} />
        <span style={{
          display: 'block', width: s * 0.14, height: s * 0.05, minHeight: 3,
          borderRadius: '0 0 8px 8px', background: '#5a63a8',
          animation: 'cbBlink 5.5s ease-in-out infinite', transformOrigin: 'center',
        }} />
      </div>
      <div style={{
        position: 'absolute', top: '62%', left: '50%',
        transform: 'translateX(-50%)',
        width: s * 0.18, height: s * 0.1,
        borderRadius: '0 0 10px 10px', background: '#7a83c8', opacity: 0.75,
      }} />
      <div style={{
        position: 'absolute', top: '57%', left: s * 0.13,
        width: s * 0.14, height: s * 0.08,
        borderRadius: '50%', background: 'rgba(255,150,118,.4)', filter: 'blur(1px)',
      }} />
      <div style={{
        position: 'absolute', top: '57%', right: s * 0.13,
        width: s * 0.14, height: s * 0.08,
        borderRadius: '50%', background: 'rgba(255,150,118,.4)', filter: 'blur(1px)',
      }} />
    </div>
  );
}
