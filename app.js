const express = require('express')
const mysql = require('mysql')
const app = express()

// DB connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
})

// Connect
db.connect( err => {
    if (err){
        throw err
    } else {
        console.log('Mysql connected...')
    }
})

// CreateDB
app.get('/createdb', (req,res)=>{
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Database created...')
        }
    })
})

// Create table
app.get('/createtableposts', (req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id) )'
    db.query(sql, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Table posts created...')
        }
    })
})

// Insert post1
app.get('/addpost1', (req,res)=>{
    let post = {title:'Post 1', body:'This is the first post'}
    //The ? is a placeholder for the post data
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql,post, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Post 1 added created...')
        }
    })
})

// Select posts
app.get('/getposts/:id', (req,res)=>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Posts fetched...')
        }
    })
})

// Update post
app.get('/updatepost/:id', (req,res)=>{
    let newTitle = 'Updated title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Posts updated...')
        }
    })
})

// Delete post
app.get('/deletepost/:id', (req,res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result)=>{
        if (err){
            throw err
        } else {
            console.log(result)
            res.send('Posts deleted ...')
        }
    })
})


app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})