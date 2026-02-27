SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

DELIMITER $$

DROP PROCEDURE IF EXISTS SeedPerformance $$
CREATE PROCEDURE SeedPerformance()
BEGIN

DECLARE i INT DEFAULT 1;

-- =========================
-- COLETIVO MASSIVO
-- =========================
WHILE i <= 1000 DO

INSERT INTO SolucoesDigitais.Coletivo
(IdAtendimento, IdProduto, IdLocalAtendimento,
DescrTituloProduto, DescrProduto,
Preco, NrCargaHoraria,
Cidade, UF,
DataInicio, DataFim,
Modalidade, IdAreaConhecimento, AreaConhecimento)
VALUES
(10000 + i,
100 + (i % 10),
1 + (i % 10),
CONCAT('Curso Performance ', i),
CONCAT('Descrição detalhada do curso ', i),
0,
8,
'Uberlândia',
'MG',
DATE_ADD(NOW(), INTERVAL (i % 30) DAY),
DATE_ADD(NOW(), INTERVAL (i % 30) DAY),
IF(i % 2 = 0,'Presencial','Remota'),
10,
'Finanças');

INSERT INTO PaginaER.Coletivo_Disponivel
(IdAtendimento, IdLocal, ExclusivoPJ, Destaque, Ordenacao, DivulgarMarketing)
VALUES
(10000 + i,
1 + (i % 10),
0,
IF(i % 5 = 0,1,0),
i,
1);

SET i = i + 1;

END WHILE;

-- =========================
-- INTERAÇÕES (LEADS)
-- =========================
SET i = 1;

WHILE i <= 1000 DO

INSERT INTO PaginaER.Interacao
(IdLocal, IdProduto, Nome, Celular, Email, Motivo, Data, Excluido, FaraConsultoria)
VALUES
(1 + (i % 10),
100 + (i % 10),
CONCAT('Interessado ', i),
CONCAT('3499', LPAD(i,6,'0')),
CONCAT('cliente', i, '@email.com'),
'Quero mais informações',
NOW(),
0,
0);

SET i = i + 1;

END WHILE;

-- =========================
-- DOWNLOAD MATERIAL APOIO
-- =========================
SET i = 1;

WHILE i <= 1000 DO

INSERT INTO SolucoesDigitais.DownLoadMaterialApoio
(IdConteudoApoio, IdProdutoConsultoria, IdLocal,
CpfInteressado, DataDownload)
VALUES
1,
200 + (i % 10),
1 + (i % 10),
LPAD(i,11,'0'),
NOW();

SET i = i + 1;

END WHILE;

-- =========================
-- EXECUCAO KIT MASSIVO
-- =========================
SET i = 1;

WHILE i <= 1000 DO

INSERT INTO SolucoesDigitais.ExecucaoKit
(IdExecucaoKit, IdKit, NomeKit, DescrKit,
Preco, NrCargaHoraria,
Cidade, UF,
DataInicio, DataFim,
Modalidade,
IdAreaConhecimento, AreaConhecimento,
IdLocalAtendimento)
VALUES
(20000 + i,
1 + (i % 10),
CONCAT('Kit Performance ', i),
CONCAT('Execução do kit ', i),
0,
16,
'Uberlândia',
'MG',
DATE_ADD(NOW(), INTERVAL (i % 30) DAY),
DATE_ADD(NOW(), INTERVAL (i % 30) DAY),
IF(i % 2 = 0,'Presencial','Remota'),
10,
'Finanças',
1 + (i % 10));

INSERT INTO PaginaER.ExecucaoKit_Disponivel
(IdExecucaoKit, IdLocal, ExclusivoPJ, Destaque, Ordenacao, DivulgarMarketing)
VALUES
(20000 + i,
1 + (i % 10),
0,
0,
i,
1);

SET i = i + 1;

END WHILE;

-- =========================
-- BANNERS REALISTAS
-- =========================
SET i = 1;

WHILE i <= 20 DO

INSERT INTO Banner
(IdLocal, Titulo, Link, Situacao, DataInicio, DataFim, Excluido)
VALUES
(1 + (i % 10),
CONCAT('Campanha Especial ', i),
'https://agenda.sebrae.com.br',
1,
NOW(),
DATE_ADD(NOW(), INTERVAL 60 DAY),
0);

SET i = i + 1;

END WHILE;

-- =========================
-- CAMPANHAS
-- =========================
SET i = 1;

WHILE i <= 20 DO

INSERT INTO Campanha
(IdLocal, IdKit, Nome, Cor, Tag, Img, Situacao, Excluido)
VALUES
(1 + (i % 10),
1 + (i % 10),
CONCAT('Campanha Kit ', i),
'#005EB8',
CONCAT('KIT', i),
'campanha.jpg',
1,
0);

SET i = i + 1;

END WHILE;

END $$

DELIMITER ;

CALL SeedPerformance();

SET FOREIGN_KEY_CHECKS = 1;