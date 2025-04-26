const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // 适用于 Next.js / Vite 项目
  theme: {
    extend: {
      screens: {
        sm: '640px',
        lsm: { max: '640px' },
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }
        lmd: { max: '768px' },

        llg: { max: '1024px' },
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        lxl: { max: '1280px' },
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1600px',
        l2xl: { max: '1600px' },
        // => @media (min-width: 1600px) { ... }

        '3xl': '2000px',
        // => @media (min-width: 2000px) { ... }

        '4xl': '2600px',
        // => @media (min-width: 2600px) { ... }
      },
    },
  },
  plugins: [],
};

export default config;
