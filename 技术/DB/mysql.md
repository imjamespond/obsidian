```
show processlist;
show status where `variable_name` = 'Threads_connected';

```

连接数
```
mysql> set global max_connections = 200;
# To permanently increase 
$ sudo vi /etc/my.cnf
max_connections = 200
$ sudo service mysql restart
```

---
explain type all 查看是否全表扫描


---
### generate some data  

```
DROP PROCEDURE if EXISTS test;
 DELIMITER $$
 CREATE PROCEDURE test(_start INT, num INT )
 BEGIN 
 SET @i1 = _start;
START TRANSACTION;
 WHILE @i1 <= num DO 
 INSERT INTO user (`username`,`password`,`password_salt`) VALUES ( CONCAT( 'user', CAST(@i1 AS CHAR(10))), 'password', 'salt' );
 SET @i1 = @i1 + 1;
 END WHILE;
COMMIT;
 END$$
 DELIMITER ;

call(1,9999);
```

--- 
- 间隙锁
https://v2ex.com/t/933239#reply16
索引范围查询需要访问到不满足条件的第一个值为止，这里是等值查询，感觉这里主键 id 加锁的范围为(10,25]
