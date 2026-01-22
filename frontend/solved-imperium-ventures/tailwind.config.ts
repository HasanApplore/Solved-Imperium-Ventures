import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
export default {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                gold: {
                    start: "#bf953f",
                    mid: "#fcf6ba",
                    end: "#b38728",
                },
                glass: {
                    border: "rgba(255,255,255,0.08)",
                    bg: "rgba(255,255,255,0.03)",
                },
            },
            backgroundImage: {
                "gold-gradient":
                    "linear-gradient(135deg, #bf953f, #fcf6ba 40%, #b38728)",
                "premium-radial":
                    "radial-gradient(circle at 50% 0%, rgba(191,149,63,0.08), transparent 40%)",
            },
            boxShadow: {
                gold: "0 8px 25px rgba(191,149,63,0.5)",
                glass: "0 25px 50px -12px rgba(0,0,0,0.8)",
            },
            keyframes: {
                fadeInUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards",
            },
        },
    },
    plugins: [animate],
} satisfies Config;
