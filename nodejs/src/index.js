function() { //1.缩进用空格
	var a = 1; //2.var声明
	a = b - c; //3.加减乘除前后加空格
	var html = '<a href="www.baidu.com">baidu.com</a>'; //4.全部用单引号
}

function yyy() { //大括号方式
	var c = 1;
}
//逗号放在后面
var foo = 'hello',
	bar = 'world'
	//分号（一句话结束后一定要用分号）
function add() {
	var a = 1,
		b = 2;
	return a + b;
}
//注释规范见以下
/*命名规范（驼峰写法）
 *1.变量命名（小驼峰写法） 不能这样写（student_name）,只能这样写studentName
 *2.方法命名  第一个单词尽量用动词，例如getStudentId returnUserInfo
 *3.类命名（大驼峰写法）UserDatabase
 */
