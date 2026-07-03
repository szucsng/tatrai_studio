module.exports = {
  apps: [
    {
      name: "tatrai",            // Az alkalmazás neve a PM2-ben
      script: "npm",             // A parancs, amivel indítjuk
      args: "start",             // A parancs argumentuma
      env: {
        NODE_ENV: "production",  // Környezeti változó
      },
      // Ha a szerveren a .env fájl nem a root-ban van, itt megadhatod:
      // env_file: "./.env", 
    },
  ],
};