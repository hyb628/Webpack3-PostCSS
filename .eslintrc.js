// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // 缩进4个空格
        'indent': ['error', 4],
        "no-unused-vars": 0,
        // 关闭未定义变量检测
        "no-undef": "off",
        // 关闭强制返回检测
        "no-unreachable": "off",
        // 关闭判断条件中的常量检测
        "no-constant-condition": "off",
        // 关闭分号检测
        "semi": "off",
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-useless-escape": "off",
        // 不让new
        "no-new": "off",
        "eol-last": "off",
        "no-trailing-spaces": "off",
        // 每个js末尾多个空格
        "no-multiple-empty-lines": "off",
        "no-extend-native": ["error", { "exceptions": ["Object", "Array", "Date", "Promise"] }]
    }
}
