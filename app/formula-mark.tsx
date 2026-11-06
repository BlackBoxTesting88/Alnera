export default function FormulaMark({ type = 'capsule' }: { type?: 'capsule' | 'glass' | 'formula' }) {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    {type === 'capsule' ? <><g transform="rotate(35 32 32)"><rect x="21" y="9" width="22" height="46" rx="11"/><path d="M21 32h22M26 20c0-3 2-5 5-5"/><path d="M26 38v6m5-3v7m5-11v6" strokeOpacity=".4"/></g><path d="M7 12h8M11 8v8M49 52h8M53 48v8" strokeOpacity=".4"/></> : type === 'glass' ? <><path d="M24 12h16M26 12v9c0 4-9 7-9 14v16c0 3 2 5 5 5h20c3 0 5-2 5-5V35c0-7-9-10-9-14v-9M18 35h28M22 48h20M25 42h14M24 7h16"/><path d="M24 27h16" strokeOpacity=".4"/></> : <><circle cx="32" cy="32" r="22" strokeOpacity=".3"/><path d="M32 4v9M32 51v9M4 32h9M51 32h9" strokeOpacity=".5"/><circle cx="32" cy="32" r="10"/><path d="M27 32h10M32 27v10"/><path d="M16 16l5 5m22 22 5 5M16 48l5-5m22-22 5-5" strokeOpacity=".4"/></>}
  </svg>;
}
