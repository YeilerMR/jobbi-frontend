// app.config.js
import { loadEnv } from './scripts/loadEnv.js'; // Vamos a crearlo a continuación

const ENV = loadEnv();

export default {
  expo: {
    name: "jobbi-frontend",
    slug: "jobbi-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: ENV.API_URL, // ← ¡Aquí inyectamos la variable!
    }
  }
};