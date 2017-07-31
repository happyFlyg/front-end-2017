var stu_json=require("./stu.json");
var txt="my name is " + stu_json.name;
define(["./stu.json"],function(stu_json){
	console.log(stu_json.name);
	return document.getElementById("test").innerHTML=txt;
})
// document.getElementById("test").innerHTML=txt;