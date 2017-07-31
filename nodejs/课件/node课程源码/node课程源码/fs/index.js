var fs=require('fs');
var exec=require('child_process').exec;
//读取文件
//var data=fs.readFileSync('day.txt','utf-8');
//console.log(data);

//复制文件
//exec('copy day.txt day2.txt');

//修改文件名
//fs.rename('day2.txt','del.txt');

//删除文件
//fs.unlink('del.txt');

//修改文件内容
//fs.open(path, flags, [mode], [callback(err,fd)])
//'r' -   以读取模式打开文件。
//'r+' - 以读写模式打开文件。
//'rs' - 使用同步模式打开并读取文件。指示操作系统忽略本地文件系统缓存。
//'rs+' - 以同步的方式打开，读取 并 写入文件。
//注意：这不是让fs.open变成同步模式的阻塞操作。如果想要同步模式请使用fs.openSync()。
//
//'w' - 以读取模式打开文件，如果文件不存在则创建
//'wx' - 和 ' w ' 模式一样，如果文件存在则返回失败
//'w+' - 以读写模式打开文件，如果文件不存在则创建
//'wx+' - 和 ' w+ ' 模式一样，如果文件存在则返回失败
//
//'a' - 以追加模式打开文件，如果文件不存在则创建
//'ax' - 和 ' a ' 模式一样，如果文件存在则返回失败
//'a+' - 以读取追加模式打开文件，如果文件不存在则创建
//'ax+' - 和 ' a+ ' 模式一样，如果文件存在则返回失败
//mode    用于创建文件时给文件制定权限，默认0666

//修改文件内容
//fs.open('day.txt','a',function(err,fd){
//    if (err){
//        throw err;
//    }
//   var data='2345678987654 hsadfkj';
//    fs.write(fd,data,function(err,bytesWritten,buffer){
//        console.log(bytesWritten);
//        console.log(buffer);
//        fs.close(fd,function(err){
//          if (err){
//              throw err;
//          }
//          console.log('file closed');
//        })
//    })
//});
















