-- Dump de estrutura + carga mínima (50 registros por tabela)
-- Banco alvo: MySQL 8+

CREATE DATABASE IF NOT EXISTS PaginaER;
USE PaginaER;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Faq_Kit;
DROP TABLE IF EXISTS Faq_Produto;
DROP TABLE IF EXISTS Kit_Personalizacao;
DROP TABLE IF EXISTS Produto_Personalizacao;
DROP TABLE IF EXISTS Consultoria_InfoAdicionais;
DROP TABLE IF EXISTS ExecucaoKit_InfoAdicionais;
DROP TABLE IF EXISTS Coletivo_InfoAdicionais;
DROP TABLE IF EXISTS DownLoadMaterialApoio;
DROP TABLE IF EXISTS Interacao;
DROP TABLE IF EXISTS Consultoria_Disponivel;
DROP TABLE IF EXISTS ExecucaoKit_Disponivel;
DROP TABLE IF EXISTS Coletivo_Disponivel;
DROP TABLE IF EXISTS Local;

CREATE TABLE Local (
  IdLocal INT PRIMARY KEY,
  IdLocalTipo INT NOT NULL,
  IdLocalMatriz INT NULL,
  Descricao VARCHAR(120) NOT NULL,
  Slug VARCHAR(150) NULL,
  CEP VARCHAR(10) NULL,
  Logradouro VARCHAR(120) NULL,
  Numero VARCHAR(20) NULL,
  Complemento VARCHAR(120) NULL,
  Bairro VARCHAR(120) NULL,
  Cidade VARCHAR(80) NULL,
  UF CHAR(2) NULL,
  Imagem VARCHAR(255) NULL,
  Email VARCHAR(120) NULL,
  Telefone VARCHAR(30) NULL,
  Whatsapp VARCHAR(30) NULL,
  GrupoFacebook VARCHAR(255) NULL,
  HorarioInicio TIME NULL,
  IntervaloInicio TIME NULL,
  IntervaloFim TIME NULL,
  HorarioFim TIME NULL,
  IdDiasAtendimento INT NULL,
  AvisoImportante TEXT NULL,
  ServicosOferecidos TEXT NULL,
  LocalizacaoMapa VARCHAR(255) NULL,
  Situacao TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE Coletivo_Disponivel (
  IdColetivoDisponivel INT AUTO_INCREMENT PRIMARY KEY,
  IdAtendimento INT NOT NULL,
  IdLocal INT NOT NULL,
  Destaque TINYINT(1) NOT NULL DEFAULT 0,
  DivulgarMarketing TINYINT(1) NOT NULL DEFAULT 1,
  ExclusivoPJ TINYINT(1) NOT NULL DEFAULT 0,
  Ordem INT NULL,
  CONSTRAINT FK_ColetivoDisponivel_Local FOREIGN KEY (IdLocal) REFERENCES Local(IdLocal)
);

CREATE TABLE ExecucaoKit_Disponivel (
  IdExecucaoKitDisponivel INT AUTO_INCREMENT PRIMARY KEY,
  IdExecucaoKit INT NOT NULL,
  IdLocal INT NOT NULL,
  Destaque TINYINT(1) NOT NULL DEFAULT 0,
  DivulgarMarketing TINYINT(1) NOT NULL DEFAULT 1,
  ExclusivoPJ TINYINT(1) NOT NULL DEFAULT 0,
  Ordem INT NULL,
  CONSTRAINT FK_ExecucaoKitDisponivel_Local FOREIGN KEY (IdLocal) REFERENCES Local(IdLocal)
);

CREATE TABLE Consultoria_Disponivel (
  IdConsultoriaDisponivel INT AUTO_INCREMENT PRIMARY KEY,
  IdConsultoria INT NOT NULL,
  IdLocal INT NOT NULL,
  DivulgarMarketing TINYINT(1) NOT NULL DEFAULT 1,
  Ordem INT NULL,
  CONSTRAINT FK_ConsultoriaDisponivel_Local FOREIGN KEY (IdLocal) REFERENCES Local(IdLocal)
);

CREATE TABLE Interacao (
  IdInteracao INT AUTO_INCREMENT PRIMARY KEY,
  IdLocal INT NOT NULL,
  IdProduto INT NOT NULL,
  Nome VARCHAR(120) NOT NULL,
  Celular VARCHAR(30) NULL,
  Email VARCHAR(120) NULL,
  Motivo VARCHAR(120) NULL,
  Data DATETIME NOT NULL,
  Atendido TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT FK_Interacao_Local FOREIGN KEY (IdLocal) REFERENCES Local(IdLocal)
);

CREATE TABLE DownLoadMaterialApoio (
  IdDownLoadMaterialApoio INT AUTO_INCREMENT PRIMARY KEY,
  IdLocal INT NOT NULL,
  Nome VARCHAR(120) NOT NULL,
  Email VARCHAR(120) NOT NULL,
  Telefone VARCHAR(30) NULL,
  Data DATETIME NOT NULL,
  CONSTRAINT FK_Download_Local FOREIGN KEY (IdLocal) REFERENCES Local(IdLocal)
);

CREATE TABLE Coletivo_InfoAdicionais (
  IdColetivoInfo INT AUTO_INCREMENT PRIMARY KEY,
  IdAtendimento INT NOT NULL,
  IdLocalAtendimento INT NOT NULL,
  DescrComplementoTitulo VARCHAR(255) NULL,
  InformacoesAdicionais TEXT NULL,
  UNIQUE KEY UK_ColetivoInfo (IdAtendimento, IdLocalAtendimento)
);

CREATE TABLE ExecucaoKit_InfoAdicionais (
  IdExecucaoKitInfo INT AUTO_INCREMENT PRIMARY KEY,
  IdExecucaoKit INT NOT NULL,
  IdLocalAtendimento INT NOT NULL,
  DescrComplementoTitulo VARCHAR(255) NULL,
  InformacoesAdicionais TEXT NULL,
  UNIQUE KEY UK_ExecucaoKitInfo (IdExecucaoKit, IdLocalAtendimento)
);

CREATE TABLE Consultoria_InfoAdicionais (
  IdConsultoriaInfo INT AUTO_INCREMENT PRIMARY KEY,
  IdProdutoConsultoria INT NOT NULL,
  IdLocalAtendimento INT NOT NULL,
  DescrComplementoTitulo VARCHAR(255) NULL,
  InformacoesAdicionais TEXT NULL,
  UNIQUE KEY UK_ConsultoriaInfo (IdProdutoConsultoria, IdLocalAtendimento)
);

CREATE TABLE Produto_Personalizacao (
  IdProduto INT PRIMARY KEY,
  ImagemGrande VARCHAR(255) NULL,
  ImagemMedia VARCHAR(255) NULL,
  ImagemPequena VARCHAR(255) NULL,
  Video VARCHAR(255) NULL,
  SituacaoVideo TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE Kit_Personalizacao (
  IdKit INT PRIMARY KEY,
  ImagemGrande VARCHAR(255) NULL,
  ImagemMedia VARCHAR(255) NULL,
  ImagemPequena VARCHAR(255) NULL,
  Video VARCHAR(255) NULL,
  SituacaoVideo TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE Faq_Produto (
  IdFaqProduto INT AUTO_INCREMENT PRIMARY KEY,
  IdProduto INT NOT NULL,
  NrOrdenacao INT NOT NULL,
  DsPergunta VARCHAR(255) NOT NULL,
  DsResposta TEXT NOT NULL
);

CREATE TABLE Faq_Kit (
  IdFaqKit INT AUTO_INCREMENT PRIMARY KEY,
  IdKit INT NOT NULL,
  NrOrdenacao INT NOT NULL,
  DsPergunta VARCHAR(255) NOT NULL,
  DsResposta TEXT NOT NULL
);

-- Carga mínima: 50 registros por tabela

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Local (
  IdLocal, IdLocalTipo, IdLocalMatriz, Descricao, Slug, CEP, Logradouro, Numero,
  Complemento, Bairro, Cidade, UF, Imagem, Email, Telefone, Whatsapp,
  GrupoFacebook, HorarioInicio, IntervaloInicio, IntervaloFim, HorarioFim,
  IdDiasAtendimento, AvisoImportante, ServicosOferecidos, LocalizacaoMapa, Situacao
)
SELECT
  n,
  IF(MOD(n,2)=0,2,1),
  NULL,
  CONCAT('Unidade ', n),
  CONCAT('unidade-', n),
  LPAD(n, 8, '0'),
  CONCAT('Rua ', n),
  CAST(n AS CHAR),
  CONCAT('Sala ', n),
  CONCAT('Bairro ', n),
  CONCAT('Cidade ', n),
  'SP',
  CONCAT('https://img.exemplo.com/local-', n, '.jpg'),
  CONCAT('local', n, '@exemplo.com'),
  CONCAT('1199999', LPAD(n, 4, '0')),
  CONCAT('1198888', LPAD(n, 4, '0')),
  CONCAT('https://facebook.com/grupo', n),
  '08:00:00',
  '12:00:00',
  '13:00:00',
  '18:00:00',
  MOD(n, 7) + 1,
  CONCAT('Aviso importante ', n),
  CONCAT('Serviços oferecidos ', n),
  CONCAT('https://maps.exemplo.com/', n),
  1
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Coletivo_Disponivel (IdAtendimento, IdLocal, Destaque, DivulgarMarketing, ExclusivoPJ, Ordem)
SELECT n, n, MOD(n,2), 1, MOD(n,3)=0, n FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO ExecucaoKit_Disponivel (IdExecucaoKit, IdLocal, Destaque, DivulgarMarketing, ExclusivoPJ, Ordem)
SELECT n, n, MOD(n,2), 1, MOD(n,4)=0, n FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Consultoria_Disponivel (IdConsultoria, IdLocal, DivulgarMarketing, Ordem)
SELECT n, n, 1, n FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Interacao (IdLocal, IdProduto, Nome, Celular, Email, Motivo, Data, Atendido)
SELECT
  n,
  n,
  CONCAT('Pessoa ', n),
  CONCAT('1197777', LPAD(n, 4, '0')),
  CONCAT('pessoa', n, '@exemplo.com'),
  IF(MOD(n,2)=0, 'Dúvida', 'Interesse'),
  DATE_ADD('2025-01-01 09:00:00', INTERVAL n DAY),
  MOD(n,2)
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO DownLoadMaterialApoio (IdLocal, Nome, Email, Telefone, Data)
SELECT
  n,
  CONCAT('Download ', n),
  CONCAT('download', n, '@exemplo.com'),
  CONCAT('1196666', LPAD(n, 4, '0')),
  DATE_ADD('2025-01-01 10:00:00', INTERVAL n DAY)
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Coletivo_InfoAdicionais (IdAtendimento, IdLocalAtendimento, DescrComplementoTitulo, InformacoesAdicionais)
SELECT n, n, CONCAT('Complemento Coletivo ', n), CONCAT('Informações adicionais do coletivo ', n) FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO ExecucaoKit_InfoAdicionais (IdExecucaoKit, IdLocalAtendimento, DescrComplementoTitulo, InformacoesAdicionais)
SELECT n, n, CONCAT('Complemento Kit ', n), CONCAT('Informações adicionais do kit ', n) FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Consultoria_InfoAdicionais (IdProdutoConsultoria, IdLocalAtendimento, DescrComplementoTitulo, InformacoesAdicionais)
SELECT n, n, CONCAT('Complemento Consultoria ', n), CONCAT('Informações adicionais da consultoria ', n) FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Produto_Personalizacao (IdProduto, ImagemGrande, ImagemMedia, ImagemPequena, Video, SituacaoVideo)
SELECT
  n,
  CONCAT('https://img.exemplo.com/produto-', n, '-g.jpg'),
  CONCAT('https://img.exemplo.com/produto-', n, '-m.jpg'),
  CONCAT('https://img.exemplo.com/produto-', n, '-p.jpg'),
  CONCAT('https://video.exemplo.com/produto-', n),
  MOD(n,2)
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Kit_Personalizacao (IdKit, ImagemGrande, ImagemMedia, ImagemPequena, Video, SituacaoVideo)
SELECT
  n,
  CONCAT('https://img.exemplo.com/kit-', n, '-g.jpg'),
  CONCAT('https://img.exemplo.com/kit-', n, '-m.jpg'),
  CONCAT('https://img.exemplo.com/kit-', n, '-p.jpg'),
  CONCAT('https://video.exemplo.com/kit-', n),
  MOD(n,2)
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Faq_Produto (IdProduto, NrOrdenacao, DsPergunta, DsResposta)
SELECT
  n,
  n,
  CONCAT('Pergunta produto ', n, '?'),
  CONCAT('Resposta produto ', n, '.')
FROM seq;

WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 50
)
INSERT INTO Faq_Kit (IdKit, NrOrdenacao, DsPergunta, DsResposta)
SELECT
  n,
  n,
  CONCAT('Pergunta kit ', n, '?'),
  CONCAT('Resposta kit ', n, '.')
FROM seq;

SET FOREIGN_KEY_CHECKS = 1;
