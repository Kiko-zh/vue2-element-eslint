module.exports = {
  root: true, // 当前项目使用这个配置文件, 不会往父级目录找.eslintrc.js文件
  env: {
    // 指定eslint启动环境(vuecli底层是node支持), browser: true也可以在浏览器设置
    node: true
  },
  extends: [
    // 扩展配置
    'plugin:vue/recommended', // vue模板格式化更严格
    'eslint:recommended', // 这个扩展包帮我们启用了一系列核心规则，这些规则是在 rules（https://cn.eslint.org/docs/rules/）页面 中被标记为 ✅ 的常见问题
    'plugin:prettier/recommended' // 添加 prettier 插件 解决 eslint 和 prettier 的冲突
    // "plugin:vue/essential", // vue里必须的规则
    // "@vue/prettier",
  ],
  parserOptions: {
    // parser: '@babel/eslint-parser',
    // 对新语法使用eslint
    parser: 'babel-eslint' // 使用babel-eslint 来解析新语法ES6
  },
  // 这里可以进行自定义规则配置
  // key：规则代号
  // value：具体的限定方式
  // "off" or 0 - 关闭规则
  // "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
  // "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
  // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    'no-multiple-empty-lines': 'off', // 不允许有连续多行空行(关闭规则)
    'no-useless-concat': 1, // 禁止不必要的字符串字面量或模板字面量的连接
    'no-useless-escape': 0, // 禁止不必要的转义字符
    'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    camelcase: 0, // 强制使用骆驼拼写法命名约定
    'no-redeclare': 1, // 禁止多次声明同一变量
    'array-callback-return': 1, // 强制数组方法的回调函数中有 return 语句,Array有几种过滤，映射和折叠的方法。如果我们忘记return在这些回调中写入语句，那可能是一个错误。
    'default-case': 1, // 要求 switch 语句中有 default 分支
    'no-fallthrough': 1, // 禁止 case 语句落空
    'no-lonely-if': 1, // 禁止 if 作为唯一的语句出现在 else 语句中.如果一个if陈述是该else块中唯一的陈述，那么使用一个else if表格通常会更清晰。
    'no-irregular-whitespace': 1, // 禁止在字符串和注释之外不规则的空白
    'prefer-const': 0, // 要求使用 const 声明那些声明后不再被修改的变量.如果一个变量从不重新分配，使用const声明更好。const 声明告诉读者，“这个变量永远不会被重新分配，”减少认知负荷并提高可维护性。
    'no-use-before-define': 1, // 禁止在变量定义之前使用它们
    'no-undef': 2,
    'arrow-parens': ['error', 'as-needed'],
    'vue/attributes-order': 2, // vue api使用顺序
    'vue/no-multiple-template-root': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'vue/html-indent': 0,
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': 0
  }
}
