const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-px-to-viewport": {
      viewportWidth: 1920, // 设计稿宽度
      // viewportHeight: 812, // 设计稿高度（可选）
      unitPrecision: 5, // 单位转换后保留的小数位数
      viewportUnit: "vw", // 转换成的视口单位
      propList: ["*", "!border*"], // ✅ 确保包含 width
      selectorBlackList: [".ignore", ".hairlines"], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于1px不转换为视口单位
      mediaQuery: false, // 允许在媒体查询中转换px
    },
  },
};

export default config;

// const config  = {
//   plugins: {
//     'tailwindcss': {},
//     'postcss-px-to-viewport': {
//       viewportWidth: 750, // 根据设计稿调整
//       unitPrecision: 5,
//       propList: ['*'],
//       selectorBlackList: [], // 清空黑名单
//       exclude: [], // 不排除任何文件
//     },
//     'autoprefixer': {},
//   }
// }
// export default config;
