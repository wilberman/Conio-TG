# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.13-MariaDB)
# Base de Dados: conio_bd
# Tempo de Geração: 2017-04-10 03:00:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela tbl_bloqueios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_bloqueios`;

CREATE TABLE `tbl_bloqueios` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_bloqueante` int(11) NOT NULL,
  `id_bloqueado` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump da tabela tbl_conversas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_conversas`;

CREATE TABLE `tbl_conversas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data_hora` int(11) DEFAULT NULL,
  `emissor` int(11) DEFAULT NULL,
  `id_sala` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump da tabela tbl_usuarios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_usuarios`;

CREATE TABLE `tbl_usuarios` (
  `usu_id` int(11) NOT NULL AUTO_INCREMENT,
  `usu_nome` varchar(30) NOT NULL,
  `usu_sobrenome` varchar(30) NOT NULL,
  `usu_username` varchar(30) NOT NULL,
  `usu_bio` varchar(40) NOT NULL,
  `usu_email` varchar(30) NOT NULL,
  `usu_imagem` varchar(20) NOT NULL,
  `usu_senha` varchar(150) NOT NULL,
  PRIMARY KEY (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

LOCK TABLES `tbl_usuarios` WRITE;
/*!40000 ALTER TABLE `tbl_usuarios` DISABLE KEYS */;

INSERT INTO `tbl_usuarios` (`usu_id`, `usu_nome`, `usu_sobrenome`, `usu_username`, `usu_bio`, `usu_email`, `usu_imagem`, `usu_senha`)
VALUES
	(11,'Felipe','W. Smith','felipewsmith','lolwtfbbq','felipewsmith@gmail.com','default.png','$2a$10$3RIc3/djQntHi9x7xvs0Qe.nm1Xx.FqJemP.SSDGUcXbHdElEB82G');

/*!40000 ALTER TABLE `tbl_usuarios` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
