module.exports = {
  "parser": "babel-eslint",
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "rules": {
    "indent": ["error", 2], // 缩紧
    "quotes": [
      "error",
      "single", // 单引号
      {
        "allowTemplateLiterals": true  // 模版字符串``
      }
    ],
    "semi": [
      "error",
      "never" // 分号
    ]
  }
}