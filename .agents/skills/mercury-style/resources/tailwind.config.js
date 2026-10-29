/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'onyx-canvas': '#171721',
        'graphite-card': '#1e1e2a',
        'obsidian-button': '#272735',
        'slate-border': '#70707d',
        'mist-border': '#e2e3ed',
        'ash-text': '#c3c3cc',
        'ivory-text': '#ededf3',
        'cobalt': {
          DEFAULT: '#5266eb',
          hover: '#4355db',
        },
        'pure-white': '#ffffff',
      },
      fontFamily: {
        arcadia: ['arcadia', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arcadiaDisplay: ['arcadiaDisplay', 'Söhne Breit', 'Cabinet Grotesk', 'Syne', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.0', letterSpacing: '0.12px' }],
        'body-sm': ['14px', { lineHeight: '1.0', letterSpacing: '0.07px' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'body-lg': ['18px', { lineHeight: '1.35' }],
        'subheading': ['21px', { lineHeight: '1.35' }],
        'heading-sm': ['28px', { lineHeight: '1.2', letterSpacing: '0.42px' }],
        'heading': ['32px', { lineHeight: '1.15', letterSpacing: '0.48px' }],
        'heading-lg': ['42px', { lineHeight: '1.15', letterSpacing: '0.42px' }],
        'display': ['65px', { lineHeight: '1.1' }],
      },
      fontWeight: {
        360: '360',
        400: '400',
        420: '420',
        480: '480',
        530: '530',
      },
      spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        56: '56px',
        72: '72px',
        112: '112px',
        128: '128px',
      },
      borderRadius: {
        'nav': '40px',
        'tags': '40px',
        'cards': '12px',
        'inputs': '32px',
        'buttons': '32px',
        'default': '4px',
      },
      maxWidth: {
        'content': '1200px',
        'hero-copy': '640px',
      },
      boxShadow: {
        'none': 'none',
      },
    },
  },
};

