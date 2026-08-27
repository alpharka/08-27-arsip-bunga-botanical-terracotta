/* Arsip Bunga: editorial botanical, asymmetry, tactile ivory paper, quiet motion. */
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Copy, ExternalLink, Flower2, Heart, MapPin, Music2, Pause, Play, Send, X } from "lucide-react";

const CONFIG = {
  couple: "Alya & Raka",
  shortNames: "Alya & Raka",
  parents: "Putri pertama dari Bapak H. Rahman & Ibu Sari\nPutra kedua dari Bapak D. Santoso & Ibu Mira",
  eventDate: "2027-06-19T09:00:00+07:00",
  dateLabel: "19 Juni 2027",
  dayLabel: "Sabtu",
  akadTime: "09.00 WIB",
  receptionTime: "11.00–14.00 WIB",
  venue: "Taman Langit, Bandung",
  address: "Jl. Dago Pakar No. 18, Bandung, Jawa Barat",
  mapsUrl: "https://maps.google.com/?q=Taman+Langit+Bandung",
  calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Alya%20%26%20Raka%20—%20Pernikahan&dates=20270619T020000Z/20270619T070000Z&details=Akad%20dan%20resepsi%20Alya%20%26%20Raka&location=Taman%20Langit%2C%20Bandung",
  audioUrl: "",
  ewalletProvider: "DANA",
  ewalletNumber: "0812 3456 7890",
  bank: "BCA",
  accountNumber: "1234 567 890",
  recipient: "Alya Prameswari",
};

const gallery = [
  { src: "/manus-storage/arsip-bunga-gallery-1_9fdcf985.jpg", alt: "Tangan memegang rangkaian bunga kering di atas kertas ivory", className: "gallery-tall" },
  { src: "/manus-storage/arsip-bunga-hero_e1b8984e.jpg", alt: "Meja kecil dengan bunga, cincin, dan pita terracotta", className: "gallery-wide" },
  { src: "/manus-storage/arsip-bunga-gallery-2_b875ef82.jpg", alt: "Siluet pasangan berjalan di antara rerumputan saat senja", className: "gallery-portrait" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85", alt: "Detail bunga putih dalam suasana pernikahan", className: "gallery-square" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85", alt: "Pasangan berjalan berdampingan di taman", className: "gallery-portrait" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1000&q=85", alt: "Pita dan bunga di atas meja pernikahan", className: "gallery-wide" },
];

function GuestName() {
  const [name, setName] = useState("Tamu undangan");
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("to");
    const clean = raw?.replace(/\s+/g, " ").trim().slice(0, 80);
    if (clean) setName(clean);
  }, []);
  return name;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

export default function Home() {
  const guest = GuestName();
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [rsvp, setRsvp] = useState({ name: "", status: "Hadir", message: "" });
  const [messages, setMessages] = useState<Array<{ name: string; status: string; message: string; time: string }>>([]);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState("");
  const eventMs = useMemo(() => new Date(CONFIG.eventDate).getTime(), []);

  useEffect(() => {
    const stored = localStorage.getItem("arsip-bunga-rsvp");
    if (stored) setMessages(JSON.parse(stored));
    const tick = () => {
      const diff = Math.max(0, eventMs - Date.now());
      setRemaining({ days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 });
    };
    tick(); const timer = window.setInterval(tick, 1000); return () => window.clearInterval(timer);
  }, [eventMs]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node)); return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (lightbox === null) return; if (event.key === "Escape") setLightbox(null); if (event.key === "ArrowLeft") setLightbox((lightbox + gallery.length - 1) % gallery.length); if (event.key === "ArrowRight") setLightbox((lightbox + 1) % gallery.length); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const copyValue = async (label: string, value: string) => { try { await navigator.clipboard.writeText(value); } catch { const area = document.createElement("textarea"); area.value = value; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); } setCopied(label); window.setTimeout(() => setCopied(""), 2000); };
  const submitRsvp = (event: React.FormEvent) => { event.preventDefault(); if (!rsvp.name.trim() || !rsvp.message.trim()) return; const next = [...messages, { ...rsvp, name: rsvp.name.trim(), message: rsvp.message.trim(), time: new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date()) }]; setMessages(next); localStorage.setItem("arsip-bunga-rsvp", JSON.stringify(next)); setSent(true); setRsvp({ name: "", status: "Hadir", message: "" }); };
  const openInvite = () => { setOpened(true); document.body.classList.add("invite-open"); };

  return <div className="site-shell">
    <div className={`cover ${opened ? "cover--open" : ""}`} aria-hidden={opened}>
      <div className="cover-image" /><div className="cover-shade" />
      <div className="cover-content"><img className="emblem emblem--light" src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="Emblem botani Alya dan Raka" /><p className="eyebrow light">Undangan pernikahan · 19.06.27</p><h1>Alya <i>&</i><br />Raka</h1><div className="cover-rule" /><p className="guest-label">Kepada Yth.<strong>{guest}</strong></p><button className="button button--light" onClick={openInvite}>Buka undangan <ArrowUpRight size={16} /></button></div>
    </div>
    <header className={`topbar ${opened ? "topbar--visible" : ""}`}><a className="brand" href="#atas"><img src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="" /> A<span>&</span>R</a><nav><a href="#cerita">Cerita</a><a href="#acara">Acara</a><a href="#galeri">Galeri</a><a href="#rsvp">RSVP</a><a href="#kasih">Tanda kasih</a></nav><span className="top-date">19 · 06 · 27</span></header>
    <main id="atas">
      <section className="hero"><div className="hero-copy reveal"><p className="eyebrow">Satu hari yang kami simpan</p><h2>Untuk dirayakan<br /><i>bersama.</i></h2><p className="hero-intro">Dengan penuh syukur dan bahagia, kami mengundang Anda untuk hadir menjadi bagian dari awal halaman baru kami.</p><a className="text-link" href="#cerita">Baca kisah kami <ArrowDown size={15} /></a></div><div className="hero-photo reveal"><img src="/manus-storage/arsip-bunga-hero_e1b8984e.jpg" alt="Meja bunga, kertas, dan cincin pernikahan" /><span className="photo-note">Bandung · Jawa Barat<br />sebuah sore, 2026</span></div></section>
      <section id="cerita" className="story section-wrap"><SectionLabel number="01">Cerita kami</SectionLabel><div className="story-grid"><div className="story-heading reveal"><img className="section-emblem" src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="" /><span className="giant-mark">“</span><h2>Dari kebetulan<br />menjadi <i>pulang.</i></h2></div><div className="story-copy reveal"><p>Barangkali beberapa pertemuan memang tidak pernah benar-benar kebetulan. Kami bertemu di antara kesibukan yang biasa, lalu menemukan percakapan yang ingin kami lanjutkan setiap hari.</p><p>Dalam perjalanan yang pelan dan penuh tawa, kami belajar bahwa rumah bukan hanya tempat. Ia adalah seseorang yang membuat kita ingin pulang—dan memilih untuk tinggal.</p><div className="signature">Dengan kasih,<br /><strong>Alya & Raka</strong></div></div></div></section>
      <section id="acara" className="details section-wrap"><SectionLabel number="02">Hari yang dinanti</SectionLabel><div className="details-head reveal"><h2>Catat <i>tanggalnya.</i></h2><div className="date-stamp"><span>{CONFIG.dayLabel}</span><strong>19</strong><span>Juni · 2027</span></div></div><div className="event-grid"><article className="event-card reveal"><span className="event-no">01</span><h3>Akad nikah</h3><p className="event-time">{CONFIG.akadTime}</p><p>{CONFIG.venue}<br />{CONFIG.address}</p><a href={CONFIG.mapsUrl} target="_blank" rel="noreferrer" className="text-link">Lihat lokasi <ExternalLink size={14} /></a></article><article className="event-card reveal"><span className="event-no">02</span><h3>Resepsi</h3><p className="event-time">{CONFIG.receptionTime}</p><p>{CONFIG.venue}<br />{CONFIG.address}</p><a href={CONFIG.mapsUrl} target="_blank" rel="noreferrer" className="text-link">Lihat lokasi <ExternalLink size={14} /></a></article></div><div className="countdown reveal"><p className="eyebrow">Menuju hari bahagia</p><div className="countdown-row">{[[remaining.days, "hari"], [remaining.hours, "jam"], [remaining.minutes, "menit"], [remaining.seconds, "detik"]].map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div><a className="button button--outline" href={CONFIG.calendarUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Simpan ke Google Calendar</a></div></section>
      <section id="galeri" className="gallery-section section-wrap"><SectionLabel number="03">Fragmen perjalanan</SectionLabel><div className="gallery-intro"><h2>Beberapa <i>bingkai</i><br />yang kami simpan.</h2><p>Potongan kecil dari perjalanan menuju satu keputusan besar.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button key={item.src} className={`gallery-item ${item.className} reveal`} onClick={() => setLightbox(index)} aria-label={`Lihat foto ${index + 1}`}><img src={item.src} alt={item.alt} /><span>Lihat foto · {String(index + 1).padStart(2, "0")}</span></button>)}</div></section>
      <section id="rsvp" className="rsvp section-wrap"><SectionLabel number="04">Kehadiran</SectionLabel><div className="rsvp-grid"><div className="rsvp-heading reveal"><img className="section-emblem" src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="" /><h2>Bisakah Anda<br /><i>hadir?</i></h2><p>Mohon isi konfirmasi sebelum 01 Juni 2027. Kehadiran Anda adalah hadiah yang paling kami nantikan.</p></div><form className="rsvp-form reveal" onSubmit={submitRsvp}><label>Nama lengkap<input value={rsvp.name} onChange={e => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Tuliskan nama Anda" required /></label><fieldset><legend>Konfirmasi kehadiran</legend>{["Hadir", "Belum bisa memastikan", "Tidak dapat hadir"].map(status => <label className="radio-label" key={status}><input type="radio" name="status" checked={rsvp.status === status} onChange={() => setRsvp({ ...rsvp, status })} /> <span>{status}</span></label>)}</fieldset><label>Pesan dan doa<input value={rsvp.message} onChange={e => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Tulis pesan untuk kami" required /></label><button className="button button--dark" type="submit"><Send size={15} /> Kirim konfirmasi</button>{sent && <p className="form-success"><Check size={15} /> Terima kasih, pesan Anda sudah tercatat di perangkat ini.</p>}</form></div><div className="guestbook"><h3>Catatan dari para tamu</h3>{messages.length === 0 ? <p className="empty-state">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : messages.map((message, index) => <div className="guest-message" key={`${message.name}-${index}`}><div><strong>{message.name}</strong><span>{message.status} · {message.time}</span></div><p>“{message.message}”</p></div>)}</div></section>
      <section id="kasih" className="gift section-wrap"><SectionLabel number="05">Tanda kasih</SectionLabel><div className="gift-grid"><div className="gift-copy reveal"><img className="section-emblem" src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="" /><h2>Doa Anda<br />sudah <i>cukup.</i></h2><p>Bagi yang ingin mengirimkan tanda kasih, kami menyiapkan beberapa cara sederhana di bawah ini.</p></div><div className="gift-data reveal"><div className="gift-row"><div><span className="eyebrow">{CONFIG.ewalletProvider}</span><strong>{CONFIG.ewalletNumber}</strong><small>{CONFIG.recipient}</small></div><button className="icon-button" onClick={() => copyValue("ewallet", CONFIG.ewalletNumber)} aria-label="Salin nomor e-wallet">{copied === "ewallet" ? <Check size={17} /> : <Copy size={17} />}</button></div><div className="gift-row"><div><span className="eyebrow">{CONFIG.bank}</span><strong>{CONFIG.accountNumber}</strong><small>{CONFIG.recipient}</small></div><button className="icon-button" onClick={() => copyValue("bank", CONFIG.accountNumber)} aria-label="Salin nomor rekening">{copied === "bank" ? <Check size={17} /> : <Copy size={17} />}</button></div></div></div></section>
    </main>
    <footer><img className="emblem" src="/manus-storage/arsip-bunga-emblem_77f7a1c0.png" alt="" /><p>Terima kasih telah menjadi bagian<br />dari halaman ini.</p><strong>Alya <i>&</i> Raka</strong><span>19 · 06 · 2027</span></footer>
    {opened && <button className="music-control" onClick={() => setMusicOn(!musicOn)} aria-label={musicOn ? "Jeda musik" : "Putar musik"}>{musicOn ? <Pause size={17} /> : <Music2 size={17} />}<span>{musicOn ? "Jeda musik" : "Putar musik"}</span></button>}
    {opened && <nav className="mobile-nav"><a href="#cerita"><Heart size={16} /><span>Cerita</span></a><a href="#acara"><CalendarDays size={16} /><span>Acara</span></a><a href="#galeri"><Flower2 size={16} /><span>Galeri</span></a><a href="#rsvp"><Send size={16} /><span>RSVP</span></a></nav>}
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox + gallery.length - 1) % gallery.length); }} aria-label="Foto sebelumnya"><ChevronLeft /></button><figure onClick={e => e.stopPropagation()}><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} /><figcaption>Fragmen perjalanan · {String(lightbox + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</figcaption></figure><button className="lightbox-next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label="Foto berikutnya"><ChevronRight /></button></div>}
  </div>;
}
