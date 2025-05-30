# Portfolio Project

This is a Next.js static portfolio website configured for deployment on GitHub Pages with a custom domain (`satyadahal.com.np`).

---

## Prerequisites

- Node.js (v16+ recommended)  
- npm
- GitHub repository with GitHub Pages enabled  

---

## Setup & Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/satyadahal/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## Build & Deploy to GitHub Pages

The project is configured to export a static build in the `out` folder and deploy it to the `gh-pages` branch of the repository.

1. Build and deploy with the following command:

   ```bash
   npm run deploy
   ```

2. This will:

   - Run `next build` (which outputs static files to `out/`)  
   - Create a `CNAME` file with your custom domain `satyadahal.com.np`  
   - Create a `.nojekyll` file to avoid GitHub Pages ignoring folders starting with `_`  
   - Deploy the contents of the `out/` folder to the `gh-pages` branch  

---

## Notes

- Make sure your DNS is configured to point your custom domain `satyadahal.com.np` to GitHub Pages (see GitHub Pages docs for setting A and CNAME records).  
- The `next.config.js` is configured without any `basePath` or `assetPrefix` to work correctly with your custom domain.

---

## Scripts

| Command        | Description                          |
| -------------- | ---------------------------------- |
| `npm run dev`  | Start Next.js in development mode  |
| `npm run build`| Build static export (`out/` folder)|
| `npm run deploy`| Build and deploy to GitHub Pages   |

---

Feel free to customize and expand this README for your needs!
