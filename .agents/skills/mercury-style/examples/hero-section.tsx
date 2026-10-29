import React, { useState, useEffect } from 'react';

export const MercuryHero: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting account request for:', email);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#171721] text-[#ededf3] overflow-x-hidden selection:bg-[#5266eb] selection:text-white">
      {/* Background Photography & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=80')`,
        }}
      >
        {/* Cinematic Cool Dark Overlay */}
        <div className="absolute inset-0 bg-[#171721]/80 backdrop-brightness-75" />
      </div>

      {/* Top Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-4 ${
          isScrolled 
            ? 'bg-[#171721]/85 backdrop-blur-md border-b border-[#70707d]/20 py-3.5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Logo Mark: Concentric Rings + Typography */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#ededf3]/40 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-[#ededf3]" />
            </div>
            <span className="text-[21px] font-[480] tracking-[0.02em] text-[#ededf3] font-['arcadiaDisplay',sans-serif]">
              mercury
            </span>
          </div>

          {/* Nav Items (Pill Links) */}
          <div className="hidden md:flex items-center gap-1">
            {['Products', 'Solutions', 'Resources', 'About', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#ededf3] hover:text-white hover:bg-white/5 rounded-[40px] px-5 py-2 text-[16px] font-[400] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Action Buttons: Ghost Outline + Single Cobalt Primary */}
          <div className="flex items-center gap-3">
            <button className="bg-transparent hover:bg-white/5 text-[#ededf3] text-[16px] font-[400] border border-[#ededf3] rounded-[40px] px-5 py-2 transition-colors">
              Log in
            </button>
            <button className="bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-[16px] font-[400] rounded-[32px] px-6 py-2.5 transition-colors border-0">
              Open account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content Stack */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-16">
        <div className="max-w-[640px] flex flex-col items-center">
          {/* Headline: 65px, intermediate weight 480, tight leading */}
          <h1 className="text-[48px] md:text-[65px] font-[480] leading-[1.1] text-[#ffffff] tracking-normal mb-6 font-['arcadiaDisplay',sans-serif]">
            Banking engineered for ambitious minds.
          </h1>

          {/* Subtitle: 18px, weight 480, Ivory text */}
          <p className="text-[18px] font-[480] leading-[1.35] text-[#ededf3]/90 max-w-[520px] mb-10 font-['arcadia',sans-serif]">
            Precision accounts, treasury yield, and automated operations built for the modern company.
          </p>

          {/* Inline Email Capture Form: Split Pill Radius */}
          <form 
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-[480px] group shadow-none"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 bg-transparent border-t border-b border-l border-[#ededf3] text-[#ededf3] placeholder-[#c3c3cc] text-[16px] font-[400] rounded-l-[32px] px-5 py-3.5 focus:outline-none focus:border-[#5266eb] transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-[16px] font-[400] rounded-r-[32px] px-6 py-3.5 border-0 transition-colors whitespace-nowrap"
            >
              Open account
            </button>
          </form>

          {/* Footnote Caption */}
          <p className="text-[12px] font-[480] text-[#c3c3cc] tracking-[0.01em] mt-4">
            Mercury is a financial technology company, not a bank. Banking services provided by Choice Financial Group and Evolve Bank & Trust; Members FDIC.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MercuryHero;

