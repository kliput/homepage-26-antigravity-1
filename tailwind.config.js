// Refer to: https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js

const typoHeadingConfig = {
  color: "var(--od-text-strong)",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      // NOTE: we use these values also in media queries in CSS, but using literal values
      // because of CSS limitations. When changing the breakpoint, search also for
      // values lesser by 1px, e.g. 768px -> 767px in global.css.
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--od-text)",
            a: {
              color: "var(--od-accent)",
              textDecoration: "none",
              "&:hover": {
                color: "var(--od-accent-2)",
                textDecoration: "underline",
              },
            },
            blockquote: {
              // blockquote styles should be similar to markdown-containers
              fontWeight: "normal",
              fontStyle: "normal",
              color: "var(--od-text)",
              borderInlineStartWidth: "6px",
              borderInlineStartColor: "var(--od-border)",
              backgroundColor: "var(--od-bg-input)",
              quotes: "",
              "p::before": {
                content: "none",
              },
              "p::after": {
                content: "none",
              },
            },
            code: {
              color: "var(--od-text)",
              fontWeight: "normal",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            h1: typoHeadingConfig,
            h2: typoHeadingConfig,
            h3: typoHeadingConfig,
            h4: typoHeadingConfig,
            h5: typoHeadingConfig,
            h6: typoHeadingConfig,
            li: {
              marginTop: "0.1rem",
              marginBottom: "0.1rem",
            },
            "ul ul": {
              marginTop: "0.2rem",
              marginBottom: "0.2rem",
            },
            "ol > li::marker": {
              color: "var(--od-text)",
            },
            "ul > li::marker": {
              color: "var(--od-text)",
            },
            strong: {
              color: "inherit",
            },
            thead: {
              borderBottomColor: "var(--od-border-hover)",
            },
            "thead th": {
              color: "inherit",
            },
            "tbody tr": {
              borderBottomColor: "var(--od-border)",
            },
            tfoot: {
              borderTopColor: "var(--od-border-hover)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
