-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 25, 2024 alle 18:59
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

--
-- Struttura della tabella `mense`
--

CREATE DATABASE mensapp;

USE mensapp;

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
-- Struttura della tabella `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descrizione` text NOT NULL,
  `prezzo` decimal(10,2) NOT NULL,
  `id_mensa` int(11) NOT NULL,
  `disponibile` tinyint(1) NOT NULL,
  `str_prod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `id` int(11) NOT NULL,
  `id_mensa` int(11) NOT NULL,
  `str_prod` varchar(255) NOT NULL,
  `quantita` varchar(255) NOT NULL,
  `data` datetime DEFAULT NULL,
  `stato_ordine` varchar(255) DEFAULT NULL,
  `id_utente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indici per le tabelle `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mensa` (`id_mensa`);

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
-- AUTO_INCREMENT per la tabella `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- Limiti per la tabella `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_mensa`) REFERENCES `mense` (`id`);

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
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utenti_ibfk_1` FOREIGN KEY (`id_mensa`) REFERENCES `mense` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
