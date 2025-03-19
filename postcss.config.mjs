const config = {
  plugins: [
    "@tailwindcss/postcss",
    [
      // "postcss-pxtorem",
      // {
      //   rootValue: 37.5, // 适用于 750px 设计稿
      //   propList: ["*"], // 需要转换的属性
      //   unitPrecision: 5, // 小数精度
      //   minPixelValue: 2, // 最小转换数值
      //   mediaQuery: false, // 允许在媒体查询中转换 px
      // },
      "postcss-px-to-viewport",
      {
        viewportWidth: 430, // 设计稿宽度
        // viewportHeight: 812, // 设计稿高度（可选）
        unitPrecision: 5, // 单位转换后保留的小数位数
        viewportUnit: "vw", // 转换成的视口单位
        selectorBlackList: [".ignore", ".hairlines"], // 指定不需要转换的类
        minPixelValue: 1, // 小于或等于1px不转换为视口单位
        mediaQuery: false, // 允许在媒体查询中转换px
      },
    ],
  ],
};

export default config;
