var express=require('express');
var app=express();
var a;
const pg = require('pg')
const client = new pg.Client({
   user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'passion',
  port: 5432,
})
client.connect()


app.get('/list',function(req,res1){
	client.query('SELECT * FROM task3 ORDER BY id ASC', (err, res) => {
		if(err){console.log(err);}
a = res.rows;
console.log(a);
res1.json(a);


})
	
	console.log(req);
});

app.get('/insert',function(req,res1){
	var d=req.query.insert;
	var e=new Date();
console.log(d,e);
const text = 'INSERT INTO task3(name,starttime) VALUES($1,$2)'
const values = [d,e];
client.query(text,values,(err, res) => {
if(err)
	{
		console.log(err)
	}
if(res)
{
	res1.send("data")
}
})

});

app.get('/update',function(req,res1){
	var d=req.query.update;
	var st=req.query.update1;
	var et=new Date();
console.log(d);
var text = 'UPDATE task3 SET status=$2 WHERE id=$1'
var values = [d,st,et];
if(st=='true')
{
	text='UPDATE task3 SET status=$2,endtime=$3 WHERE id=$1'
}
else
{
	values = [d,st," "];
	text='UPDATE task3 SET status=$2,endtime=$3 WHERE id=$1'

}
client.query(text,values,(err, res) => {
if(err)
	{
		console.log(err)
	}
if(res)
{
	res1.send("data")
}
})

});

app.get('/delete',function(req,res1){
	var d=req.query.delete;
console.log(d);
const text = 'DELETE FROM task3 WHERE id=($1)'
const values = [d];
client.query(text,values,(err, res) => {
if(err)
	{
		console.log(err)
	}
if(res)
{
	res1.send("data")
}
})

});

app.use(express.static('public'));

app.listen(3011);
