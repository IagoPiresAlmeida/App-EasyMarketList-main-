const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "bditens",
})

//DELETE
/*app.delete("/item/:id", (req, res) =>{

    const { id } = req.params;
    console.log("Informação: ", id)

    let SQL = "DELETE FROM listaitens WHERE (`id` = ?)"

    db.query(SQL, id, (err, result) => {
        console.log(err);
    })
})

//READ
app.get("/itens", (req, res) =>{

    let SQL = "SELECT * FROM listaitens";

    db.query(SQL, (err, result)=> {
        if(err) console.log(err);
        else res.send(result);
    })
})

//CREATE
app.post("/item", (req, res) => {
    console.log(req)
    const { item } = req.body;
    let SQL = "INSERT INTO listaitens ( itens ) VALUES (?)"
    db.query(SQL, item, (err,result) =>{
        console.log(err)
    })
})*/

//DELETE
app.delete("/lista/:id", (req, res) =>{

    const { id } = req.params;

    let SQL = "DELETE FROM nomedaslistas WHERE (`id` = ?)"

    db.query(SQL, id, (err, result) => {
        console.log(err);
    })
})

//READ
app.get("/itens", (req, res) =>{

    let SQL = "SELECT * FROM nomedaslistas";

    db.query(SQL, (err, result)=> {
        if(err) console.log(err);
        else res.send(result);
    })
})

//CREATE
app.post("/lista", (req, res) => {
    const { Nomedalista } = req.body;
    let SQL = "INSERT INTO nomedaslistas ( itens ) VALUES (?)"
    db.query(SQL, Nomedalista, (err,result) =>{
        console.log(err)
    })
})

//ModelList

app.get("/produto", (req, res) => {

    let SQL = "select * from produtos "
    db.query(SQL, (err,result) =>{
        //if(err) console.log(err)
        res.send(result);
    })
})

app.post("/market", (req, res) => {

    const { prod, id } = req.body;
    console.log("o id é", id)
    let SQL = "INSERT INTO produtos ( id_lista, produto ) VALUES (?, ?)"
    db.query(SQL, [id, prod], (err,result) =>{
        if(err) console.log(err)
        if(result) console.log(result)
        
    })
})






app.listen(3001, () => {
    console.log("rodando servidor");
});