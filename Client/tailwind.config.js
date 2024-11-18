module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700", // Gold for IMDB >= 8
        silver: "#C0C0C0", // Silver for IMDB >= 5
        bronze: "#CD7F32", // Bronze for IMDB < 5
      },
    },
  },
  plugins: [],
};
