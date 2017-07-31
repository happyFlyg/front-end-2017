//node提供了一些process的属性，如下：
//
//process.version：包含当前node实例的版本号；
//
//process.installPrefix：包含安装路径；
//
//process.platform：列举node运行的操作系统的环境，只会显示内核相关的信息，如：linux2， darwin，而不是“Redhat ES3” ，“Windows 7”，“OSX 10.7”等；
//
//process.uptime()：包含当前进程运行的时长（秒）；
//
//process.getgid(), process.setgid()：获取或者设置group id；
//
//process.getuid(), process.setuid()：获取或者设计user id；
//
//process.pid：获取进程id；
//
//process.title：设置进程名称；
//
//process.execPath：当前node进程的执行路径，如：/usr/local/bin/node；
//
//process.cwd()：当前工作目录；
//
//process.memoryUsage()：node进程内存的使用情况，rss代表ram的使用情况，vsize代表总内存的使用大小，包括ram和swap；
//
//process.heapTotal,process.heapUsed：分别代表v8引擎内存分配和正在使用的大小。

console.log(process.pid);