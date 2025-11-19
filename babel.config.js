module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@Components": "./src/components",
            "@config": "./src/config",
            "@context": "./src/context",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};




