var mysql = require('mysql');

//创建连接  
var client = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'dushu_help',
    charset : 'UTF8_GENERAL_CI',
    debug : false
});

client.connect();
//client.query("use dushu_help" );
client.query('SELECT * FROM book',function(err, rs) {
        if (err) {
            throw err;
        }

        if(rs)
        {
            for(var i = 0; i < rs.length; i++)
            {
                console.log("%s\t%s\t%s\n", rs[i].bookname, rs[i].booksex, rs[i].bookinfo);
            }
        }
        client.end();
    }
); 