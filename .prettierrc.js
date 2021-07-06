module.exports = {
	semi: false, // 行位不使用分号
	trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none \ es5 \ all>"
	singleQuote: true, // 字符串使用单引号
	printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80
	tabWidth: 4, // 一个tab代表几个空格数
	useTabs: false,
	bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
	jsxBracketSameLine: false, // 将多行JSX元素的>单独放在下一行
	arrowParens: 'avoid',
	alwaysParens: 'always', // 为单行箭头函数的参数添加圆括号。示例：(x) => x
	endOfLine: 'crlf', //"<lf|crlf|cr|auto>"
}
