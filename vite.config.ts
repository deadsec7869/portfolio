import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const host =
    env.VITE_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : env.VERCEL_URL
        ? `https://${env.VERCEL_URL}`
        : "");
  const origin = host ? new URL(host).origin : "";
  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: "portfolio-social-metadata",
        transformIndexHtml(html) {
          if (!origin) return html;
          const safeOrigin = origin
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;");
          return html
            .replaceAll(
              'content="/og-image.png"',
              `content="${safeOrigin}/og-image.png"`,
            )
            .replace(
              "</head>",
              `<link rel="canonical" href="${safeOrigin}/" /><meta property="og:url" content="${safeOrigin}/" /></head>`,
            );
        },
      },
    ],
  };
});
