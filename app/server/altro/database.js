const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
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
                    nome VARCHAR(50) NOT NULL,
                    indirizzo VARCHAR(100) NOT NULL,
                    fd BOOLEAN
                )`);

			connection.query(`CREATE TABLE IF NOT EXISTS utenti (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(50) NOT NULL,
                    cognome VARCHAR(50) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    id_mensa INT NOT NULL,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);

			connection.query(`CREATE TABLE IF NOT EXISTS prodotti (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    descrizione TEXT NOT NULL,
                    allergeni VARCHAR(255) NOT NULL,
                    prezzo DECIMAL(10, 2) NOT NULL,
                    categoria VARCHAR(50) NOT NULL,
                    indirizzo_img VARCHAR(255) NOT NULL,
                    disponibile BOOLEAN NOT NULL,
                    nacq INT NOT NULL,
                    id_mensa INT NOT NULL,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);

			connection.query(`CREATE TABLE IF NOT EXISTS menu (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    descrizione TEXT NOT NULL,
                    prezzo DECIMAL(10, 2) NOT NULL,
                    id_mensa INT NOT NULL,
                    disponibile BOOLEAN NOT NULL,
                    str_prod VARCHAR(255) NOT NULL,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);

			connection.query(`CREATE TABLE IF NOT EXISTS ordini (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    id_mensa INT NOT NULL,
                    str_prod VARCHAR(255) NOT NULL,
                    fd BOOLEAN,
                    FOREIGN KEY (id_mensa) REFERENCES mense(id)
                )`);
		});
	});
});
