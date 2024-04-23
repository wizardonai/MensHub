-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 19, 2024 alle 19:32
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mensapp`
--

-- --------------------------------------------------------



CREATE DATABASE mensapp;
use mensapp;

-- Tabellla allergeni

CREATE TABLE `allergeni` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;  


INSERT INTO `allergeni` (`nome`) VALUES
('glutine'),
('latticini'),
('uova'),
('soia'),
('sesamo'),
('noci'),
('sedano'),
('senape'),
('aglio'),
( 'frutta a guscio'),
( 'pesce'),
( 'arachidi'),
( 'lupino'),
( 'molluschi');


--
-- Struttura della tabella `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(255) NOT NULL,
  `indirizzo_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `categorie` (`nome`, `indirizzo_img`) VALUES
('antipasto', 'categories/antipasto.png'),
('primo', 'categories/primo.png'),
('secondo', 'categories/secondo.png'),
('contorno', 'categories/contorno.png'),
('dolce', 'categories/dolce.png'),
('bibita', 'categories/bibita.png');

-- --------------------------------------------------------

--
-- Struttura della tabella `mense`
--

CREATE TABLE `mense` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `indirizzo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `mense`
--

INSERT INTO `mense` (`id`, `nome`, `indirizzo`) VALUES
(1, 'Mensa Planck', 'Via Franchini, 2');

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `id` int(11) NOT NULL,
  `id_mensa` int(11) NOT NULL,
  `data` datetime DEFAULT NULL,
  `stato_ordine` varchar(255) DEFAULT NULL,
  `id_utente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordini`
--

INSERT INTO `ordini` (`id`, `id_mensa`, `data`, `stato_ordine`, `id_utente`) VALUES
(1234, 1, '2024-02-21 00:00:00', 'attivo', 1),
(5678, 1, '2024-01-25 15:37:01', 'in corso', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotti`
--

CREATE TABLE `prodotti` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descrizione` text NOT NULL,
  `allergeni` varchar(255) NOT NULL,
  `prezzo` decimal(10,2) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `indirizzo_img` varchar(255) NOT NULL,
  `disponibile` tinyint(1) NOT NULL,
  `nacq` int(11) NOT NULL,
  `id_mensa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prodotti`
--

INSERT INTO `prodotti` (`id`, `nome`, `descrizione`, `allergeni`, `prezzo`, `categoria`, `indirizzo_img`, `disponibile`, `nacq`, `id_mensa`) VALUES
(1, 'Paninazzo', 'Panino con la mortadella', 'glutine, sesamo', 4.50, 'panino', 'products/paninomortazza.png', 1, 7, 1),
(2, 'Carbonara', 'Pasta alla carbonara', 'uova, latticini, glutine', 8.90, 'primo', 'products/carbonara.png', 1, 14, 1),
(3, 'Cotoletta con le patatine', 'Cotoletta di pollo accompagnata da delle patatine fritte', 'uova, glutine, latticini, soia, sesamo', 11.20, 'secondo', 'products/cotoletta.png', 1, 8, 1),
(4, 'Spaghetti all\'arrabbiata', 'Piatto di spaghetti condito con pomodoro e peperoncino', 'glutine, aglio, peperoncino', 8.90, 'primo', 'products/spaghettiArrabbiata.png', 1, 6, 1),
(5, 'Panna cotta', 'Panna cotta condita con caramello e granella di nocciola', 'latticini, uova, gelatina, frutta a guscio', 4.50, 'dolce', 'products/pannacotta.png', 1, 11, 1),
(6, 'Insalata', 'Insalata, salsa yogurt e aceto balsamico', 'glutine, latticini, noci, soia, sedano, uova', 7.30, 'contorno', 'products/insalata.png', 1, 15, 1),
(7, 'Tar tar di manzo', 'Carne di manzo di alta qualità. 100% Made in Italy', ' glutine, uova, senape, cipolla, latticini', 6.40, 'antipasto', 'products/tartare.png', 1, 10, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotti_ordini`
--

CREATE TABLE `prodotti_ordini` (
  `id_prodotto` int(11) NOT NULL,
  `id_ordine` int(11) NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prodotti_ordini`
--

INSERT INTO `prodotti_ordini` (`id_prodotto`, `id_ordine`, `quantita`) VALUES
(1, 1234, 7),
(2, 1234, 3),
(3, 1234, 1),
(6, 5678, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_mensa` int(11) DEFAULT NULL,
  `cliente` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nome`, `cognome`, `email`, `password`, `id_mensa`, `cliente`) VALUES
(1, 'Simone', 'Lapomarda', 'simolapomarda@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, 0);

--
-- Indici per le tabelle scaricate
--


--
-- Indici per le tabelle `mense`
--
ALTER TABLE `mense`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mensa` (`id_mensa`),
  ADD KEY `fk_ordini_utenti` (`id_utente`);

--
-- Indici per le tabelle `prodotti`
--
ALTER TABLE `prodotti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mensa` (`id_mensa`);

--
-- Indici per le tabelle `prodotti_ordini`
--
ALTER TABLE `prodotti_ordini`
  ADD PRIMARY KEY (`id_prodotto`,`id_ordine`),
  ADD KEY `id_ordine` (`id_ordine`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mensa` (`id_mensa`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--


--
-- AUTO_INCREMENT per la tabella `mense`
--
ALTER TABLE `mense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5679;

--
-- AUTO_INCREMENT per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `ordini`
--
ALTER TABLE `ordini`
  ADD CONSTRAINT `fk_ordini_utenti` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`),
  ADD CONSTRAINT `ordini_ibfk_1` FOREIGN KEY (`id_mensa`) REFERENCES `mense` (`id`);

--
-- Limiti per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  ADD CONSTRAINT `prodotti_ibfk_1` FOREIGN KEY (`id_mensa`) REFERENCES `mense` (`id`);

--
-- Limiti per la tabella `prodotti_ordini`
--
ALTER TABLE `prodotti_ordini`
  ADD CONSTRAINT `prodotti_ordini_ibfk_1` FOREIGN KEY (`id_prodotto`) REFERENCES `prodotti` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prodotti_ordini_ibfk_2` FOREIGN KEY (`id_ordine`) REFERENCES `ordini` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utenti_ibfk_1` FOREIGN KEY (`id_mensa`) REFERENCES `mense` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
