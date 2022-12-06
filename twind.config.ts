import { Options } from "$fresh/plugins/twind.ts";
import { asset } from "$fresh/runtime.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    letterSpacing: {
      tight: '-.1em',
      normal: '0',
    },
    fontFamily: {
      sans: ['Noto Sans Display', 'ui-sans-serif', 'system-ui', 'Arial']
    }
  },

  preflight: {
    '@font-face': [
      {
        fontFamily: 'Noto Sans Display',
        fontWeight: '400',
        src: 'url('+asset("/fonts/NotoSansDisplay-Regular.ttf") + ')',
      },
    ],
  },
} as Options;
