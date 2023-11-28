
function start() {
    const mysql = require("mysql");
    const express = require("express");
    const cors = require("cors");

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    connection.connect((err) => {
        if (err) throw new Error(err);
        console.log("Connected");
        connection.query("CREATE DATABASE IF NOT EXISTS mensapp", (err) => {
            if (err) throw new Error(err);
            console.log("Database created");
            connection.changeUser({ database: "mensapp" }, () => {
                if (err) throw new Error(err);
                connection.query(`CREATE TABLE IF NOT EXISTS mense (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(50),
                    indirizzo VARCHAR(100),
                    fd BOOLEAN
                )`);
            
                connection.query(`CREATE TABLE IF NOT EXISTS utenti (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(50),
                    cognome VARCHAR(50),
                    email VARCHAR(100),
                    password VARCHAR(255),
                    id_mensa INT,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);
            
                connection.query(`CREATE TABLE IF NOT EXISTS prodotti (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(100),
                    descrizione TEXT,
                    allergeni VARCHAR(255),
                    prezzo DECIMAL(10, 2),
                    categoria VARCHAR(50),
                    indirizzo_img VARCHAR(255),
                    disponibile BOOLEAN,
                    nacq INT,
                    id_mensa INT,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);
            
                connection.query(`CREATE TABLE IF NOT EXISTS menu (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(100),
                    descrizione TEXT,
                    prezzo DECIMAL(10, 2),
                    id_mensa INT,
                    disponibile BOOLEAN,
                    str_prod VARCHAR(255),
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);
            
                connection.query(`CREATE TABLE IF NOT EXISTS ordini (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    id_mensa INT,
                    str_prod VARCHAR(255),
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);
            });
        });
    });
    
}

module.exports = { start};