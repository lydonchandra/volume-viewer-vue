module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["babel-plugin-inline-import", {
      "extensions": [".obj"],
    }],
    ["inline-import-data-uri", {
      "extensions": [".png"],
    }],
  ],
};
