-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: zelos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apontamentos`
--

DROP TABLE IF EXISTS `apontamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apontamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chamado_id` int(11) NOT NULL,
  `tecnico_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `pecasUtilizadas` text DEFAULT NULL,
  `arquivos` text DEFAULT NULL,
  `fim` timestamp NULL DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `chamado_id` (`chamado_id`),
  KEY `tecnico_id` (`tecnico_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `apontamentos_ibfk_1` FOREIGN KEY (`chamado_id`) REFERENCES `chamados` (`id`),
  CONSTRAINT `apontamentos_ibfk_2` FOREIGN KEY (`tecnico_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `apontamentos_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apontamentos`
--

LOCK TABLES `apontamentos` WRITE;
/*!40000 ALTER TABLE `apontamentos` DISABLE KEYS */;
INSERT INTO `apontamentos` VALUES (1,1,3,NULL,'teste','teste','\\uploads\\1757705076305-seilÃ¡kkkkkkkk.png',NULL,'2025-09-12 19:24:36'),(2,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705392240-01.png',NULL,'2025-09-12 19:29:58'),(3,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705399349-01.png',NULL,'2025-09-12 19:30:06'),(4,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705407569-01.png',NULL,'2025-09-12 19:30:16'),(5,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705441772-01.png',NULL,'2025-09-12 19:30:51'),(6,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705451847-01.png',NULL,'2025-09-12 19:30:58'),(7,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705452228-01.png',NULL,'2025-09-12 19:31:05'),(8,12,1,NULL,'Já realizamos a solução Computador Quebrado','peças especiais','\\uploads\\1757705452356-01.png',NULL,'2025-09-12 19:31:11');
/*!40000 ALTER TABLE `apontamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chamados`
--

DROP TABLE IF EXISTS `chamados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chamados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `patrimonio` text NOT NULL,
  `localizacao` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `grauPrioridade` int(11) NOT NULL,
  `arquivos` varchar(400) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `tecnico_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `status` enum('pendente','em andamento','concluído') DEFAULT 'pendente',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tipo_id` (`tipo_id`),
  KEY `tecnico_id` (`tecnico_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `idx_chamados_status` (`status`),
  CONSTRAINT `chamados_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `pool` (`id`),
  CONSTRAINT `chamados_ibfk_2` FOREIGN KEY (`tecnico_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `chamados_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chamados`
--

LOCK TABLES `chamados` WRITE;
/*!40000 ALTER TABLE `chamados` DISABLE KEYS */;
INSERT INTO `chamados` VALUES (1,'Teste','12335566','Bloco A','Teste',3,NULL,2,3,4,'concluído','2025-09-12 18:30:16','2025-09-12 19:24:36'),(2,'','','','',1,NULL,2,NULL,5,'pendente','2025-09-12 18:31:25','2025-09-12 18:31:25'),(5,'','','','',1,NULL,2,NULL,5,'pendente','2025-09-12 19:14:26','2025-09-12 19:14:26'),(6,'Computador Quebrado','3231313123','Bloco B','fsdcdvs wfwsfcse sgvdsf',4,NULL,2,NULL,5,'pendente','2025-09-12 19:18:11','2025-09-12 19:18:11'),(12,'Computador Quebrado','3231313123','Bloco B','asedeawdc sdswf',1,NULL,3,1,5,'concluído','2025-09-12 19:22:29','2025-09-12 19:30:51'),(13,'Computador','0462946','Bloco C','Computador não liga ao pressionar o botão, o computador não inicia.',2,'\\uploads\\1758109159602-ComputadornÃ£oliga.jpg,\\uploads\\1758109159608-ComputadornÃ£oliga2.jpg,\\uploads\\1758109159608-ComputadornÃ£oliga3.webp',3,NULL,4,'pendente','2025-09-17 11:39:19','2025-09-17 11:39:19'),(14,'tela do computador quebrada ','37784334625654','Bloco C','A tela do computador está trincada, dificultando a visualização. Precisa de substituição para que o equipamento volte a funcionar corretamente.',3,'\\uploads\\1758115612374-telaQuebrada',2,NULL,6,'pendente','2025-09-17 13:26:52','2025-09-17 13:26:52');
/*!40000 ALTER TABLE `chamados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duvidas`
--

DROP TABLE IF EXISTS `duvidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `duvidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `descricao` text NOT NULL,
  `usuario` varchar(400) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duvidas`
--

LOCK TABLES `duvidas` WRITE;
/*!40000 ALTER TABLE `duvidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `duvidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamentos` (
  `PATRIMONIO` int(11) NOT NULL,
  `SALA` varchar(100) NOT NULL,
  `EQUIPAMENTO` varchar(255) NOT NULL,
  `STATUS` enum('ativo','inativo') DEFAULT 'ativo',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`PATRIMONIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pool`
--

DROP TABLE IF EXISTS `pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` enum('externo','manutencao','apoio_tecnico','limpeza') NOT NULL,
  `descricao` text DEFAULT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `pool_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pool_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pool`
--

LOCK TABLES `pool` WRITE;
/*!40000 ALTER TABLE `pool` DISABLE KEYS */;
INSERT INTO `pool` VALUES (1,'externo','Chamado relacionado a serviços externos à empresa','ativo','2025-09-10 12:37:02','2025-09-10 12:37:02',1,1),(2,'manutencao','Chamado referente à manutenção de equipamentos ou sistemas','ativo','2025-09-10 12:37:02','2025-09-10 12:37:02',1,1),(3,'apoio_tecnico','Solicitação de suporte técnico interno','ativo','2025-09-10 12:37:02','2025-09-10 12:37:02',1,1),(4,'limpeza','Chamado relacionado a serviços de limpeza','ativo','2025-09-10 12:37:02','2025-09-10 12:37:02',1,1);
/*!40000 ALTER TABLE `pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pool_tecnico`
--

DROP TABLE IF EXISTS `pool_tecnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pool_tecnico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pool` int(11) DEFAULT NULL,
  `id_tecnico` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pool` (`id_pool`),
  KEY `id_tecnico` (`id_tecnico`),
  CONSTRAINT `pool_tecnico_ibfk_1` FOREIGN KEY (`id_pool`) REFERENCES `pool` (`id`),
  CONSTRAINT `pool_tecnico_ibfk_2` FOREIGN KEY (`id_tecnico`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pool_tecnico`
--

LOCK TABLES `pool_tecnico` WRITE;
/*!40000 ALTER TABLE `pool_tecnico` DISABLE KEYS */;
INSERT INTO `pool_tecnico` VALUES (2,3,1),(3,2,3),(4,1,4);
/*!40000 ALTER TABLE `pool_tecnico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numeroRegistro` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `funcao` varchar(100) NOT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_usuarios_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,24166249,'ISABELA ALVES DOS SANTOS','$2b$10$tQRZAzpJouiQfDbx3LWFL.QbApTCSJ0IBlXKtcLdY3e0kq8DtRsii','24166249@educ123.sp.senai.br','tecnico','ativo','2025-09-10 12:27:12','2025-09-10 12:36:40'),(2,24166193,'ISABELLI LOPES MONTENEGRO','$2b$10$ovvGhTgz3IPoRC4N7xEIUOnLmBagTq9QFl1mSi93P4oCWSAzIXE0S','24166193@educ123.sp.senai.br','usuario','ativo','2025-09-10 12:28:32','2025-09-10 12:28:32'),(3,24166254,'GIOVANNA ARAGÃO FERREIRA ROVINA','$2b$10$UXW.bJN0Kq8yzi/XXNLCNOrSLl2jO639UYS25pvYw8Su2POFe4rgy','24166254@educ123.sp.senai.br','tecnico','ativo','2025-09-10 12:29:31','2025-09-10 12:39:40'),(4,24166218,'GIULIANNO LINO TAVARES DE OLIVEIRA','$2b$10$SPool70j0LYwhLtWBacZd.5gRYjAHk55wgfdrd3TRBWSIa04i4g5e','24166218@educ123.sp.senai.br','usuario','ativo','2025-09-10 12:31:58','2025-09-12 19:41:12'),(5,24166206,'EDUARDA ALVES PINHO','$2b$10$Hg0cPFOdQhhYGA4c5m8M7O501WJG4GbSCoHcGWSJa9YeiYd1UuAki','24166206@educ123.sp.senai.br','admin','ativo','2025-09-10 12:34:46','2025-09-10 12:41:52'),(6,24166166,'MARIANA MARTINS DE SOUSA MELLO','$2b$10$xC0aslT8o/69gDxWQowdN.KsoWCaS1xRT/YJOlEVaGr9W9idyVPTC','24166166@educ123.sp.senai.br','usuario','ativo','2025-09-10 12:36:29','2025-09-10 12:36:29'),(7,24166154,'FÁBIO HENRIQUE LOURENÇO PACHECO','$2b$10$aDWW0PpD9K1K.HVq2GxYhuiVjKvGDhEFDuzB/b4JiEz.DmvkOlsHy','24166154@educ123.sp.senai.br','usuario','ativo','2025-09-17 12:37:06','2025-09-17 12:37:06');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-17 11:11:21
