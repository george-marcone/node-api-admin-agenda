SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- =====================================================
-- SCHEMAS
-- =====================================================
CREATE DATABASE IF NOT EXISTS PaginaER;
CREATE DATABASE IF NOT EXISTS SolucoesDigitais;

-- =====================================================
-- LOCAL (PaginaER)
-- =====================================================
USE PaginaER;

CREATE TABLE IF NOT EXISTS Local (
  IdLocal INT PRIMARY KEY,
  IdLocalTipo INT,
  IdLocalMatriz INT NULL,
  Descricao VARCHAR(255),
  Slug VARCHAR(120),
  CEP VARCHAR(10),
  Logradouro VARCHAR(255),
  Numero VARCHAR(20),
  Bairro VARCHAR(120),
  Cidade VARCHAR(120),
  UF VARCHAR(2),
  Situacao TINYINT DEFAULT 1,
  Excluido TINYINT DEFAULT 0
);

INSERT INTO Local VALUES
(1,2,NULL,'SEBRAE Uberlândia','uberlandia','38400000','Av Afonso Pena','100','Centro','Uberlândia','MG',1,0),
(2,2,NULL,'SEBRAE BH','bh','30100000','Av Amazonas','200','Centro','Belo Horizonte','MG',1,0),
(3,2,NULL,'SEBRAE SP','sp','01000000','Av Paulista','300','Centro','São Paulo','SP',1,0),
(4,2,NULL,'SEBRAE Campinas','campinas','13000000','Av Norte','400','Centro','Campinas','SP',1,0),
(5,2,NULL,'SEBRAE Rio','rio','20000000','Av Atlântica','500','Copacabana','Rio de Janeiro','RJ',1,0),
(6,2,NULL,'SEBRAE Curitiba','curitiba','80000000','Rua XV','600','Centro','Curitiba','PR',1,0),
(7,2,NULL,'SEBRAE Recife','recife','50000000','Av Boa Viagem','700','Boa Viagem','Recife','PE',1,0),
(8,2,NULL,'SEBRAE Salvador','salvador','40000000','Av Oceânica','800','Barra','Salvador','BA',1,0),
(9,2,NULL,'SEBRAE Goiânia','goiania','74000000','Av Goiás','900','Centro','Goiânia','GO',1,0),
(10,2,NULL,'SEBRAE Brasília','brasilia','70000000','Eixo Monumental','1000','Plano Piloto','Brasília','DF',1,0);

-- =====================================================
-- BANNER
-- =====================================================
CREATE TABLE Banner (
  IdBanner INT AUTO_INCREMENT PRIMARY KEY,
  IdLocal INT,
  Titulo VARCHAR(255),
  Link VARCHAR(255),
  Imagem VARCHAR(255),
  Situacao TINYINT,
  Ordenacao INT,
  DataInicio DATE,
  DataFim DATE,
  Excluido TINYINT DEFAULT 0
);

INSERT INTO Banner (IdLocal,Titulo,Link,Imagem,Situacao,Ordenacao,DataInicio,DataFim)
VALUES
(1,'Campanha Financeira','https://sebrae.com','banner1.jpg',1,1,NOW(),DATE_ADD(NOW(),INTERVAL 30 DAY)),
(2,'Campanha Marketing','https://sebrae.com','banner2.jpg',1,1,NOW(),DATE_ADD(NOW(),INTERVAL 30 DAY));

-- =====================================================
-- INTERACAO
-- =====================================================
CREATE TABLE Interacao (
  IdInteracao INT AUTO_INCREMENT PRIMARY KEY,
  IdLocal INT,
  IdProduto INT,
  Nome VARCHAR(150),
  Celular VARCHAR(20),
  Email VARCHAR(150),
  Motivo TEXT,
  Data DATETIME,
  Excluido TINYINT DEFAULT 0,
  FaraConsultoria TINYINT DEFAULT 0
);

-- =====================================================
-- SolucoesDigitais
-- =====================================================
USE SolucoesDigitais;

CREATE TABLE Produto (
  IdProduto INT PRIMARY KEY,
  DescrTituloProduto VARCHAR(255),
  DescrProduto TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  IdInstrumento INT,
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(120),
  Certificado TINYINT
);

CREATE TABLE Coletivo (
  IdAtendimento INT PRIMARY KEY,
  IdProduto INT,
  IdLocalAtendimento INT,
  DescrTituloProduto VARCHAR(255),
  DescrProduto TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  Cidade VARCHAR(120),
  UF VARCHAR(2),
  DataInicio DATETIME,
  DataFim DATETIME,
  Modalidade VARCHAR(50),
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(120)
);

CREATE TABLE ExecucaoKit (
  IdExecucaoKit INT PRIMARY KEY,
  IdKit INT,
  NomeKit VARCHAR(255),
  DescrKit TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  Cidade VARCHAR(120),
  UF VARCHAR(2),
  DataInicio DATETIME,
  DataFim DATETIME,
  Modalidade VARCHAR(50),
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(120),
  IdLocalAtendimento INT
);

CREATE TABLE FaixaCEP (
  IdFaixaCep INT AUTO_INCREMENT PRIMARY KEY,
  IdLocal INT,
  CEPde BIGINT,
  CEPate BIGINT
);

INSERT INTO FaixaCEP (IdLocal,CEPde,CEPate) VALUES
(1,38400000,38409999),
(2,30100000,30109999);

-- =====================================================
-- PERFORMANCE DATA (1000 registros)
-- =====================================================
DELIMITER $$

CREATE PROCEDURE SeedMass()
BEGIN
  DECLARE i INT DEFAULT 1;

  WHILE i <= 1000 DO

    INSERT INTO Coletivo VALUES
    (10000+i,1+(i%10),1+(i%10),
    CONCAT('Curso ',i),
    CONCAT('Descricao curso ',i),
    0,8,'Uberlândia','MG',
    NOW(),NOW(),
    IF(i%2=0,'Presencial','Remota'),
    10,'Finanças');

    INSERT INTO PaginaER.Interacao
    (IdLocal,IdProduto,Nome,Celular,Email,Motivo,Data)
    VALUES
    (1+(i%10),100+(i%10),
    CONCAT('Cliente ',i),
    CONCAT('3499',LPAD(i,6,'0')),
    CONCAT('cliente',i,'@email.com'),
    'Interesse no curso',
    NOW());

    SET i = i + 1;
  END WHILE;
END $$

DELIMITER ;

CALL SeedMass();

SET FOREIGN_KEY_CHECKS = 1;