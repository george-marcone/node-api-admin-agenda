SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- =========================================================
-- LOCAL
-- =========================================================
DELETE FROM Local;

INSERT INTO Local
(IdLocal, IdLocalTipo, IdLocalMatriz, Descricao, Slug, CEP,
 Logradouro, Numero, Bairro, Cidade, UF,
 Situacao, Excluido)
VALUES
(1,2,NULL,'SEBRAE Uberlândia','uberlandia','38400000','Av Afonso Pena','100','Centro','Uberlândia','MG',1,0),
(2,2,NULL,'SEBRAE Belo Horizonte','bh','30100000','Av Amazonas','200','Centro','Belo Horizonte','MG',1,0),
(3,2,NULL,'SEBRAE São Paulo','sp','01000000','Av Paulista','300','Centro','São Paulo','SP',1,0),
(4,2,NULL,'SEBRAE Campinas','campinas','13000000','Av Norte','400','Centro','Campinas','SP',1,0),
(5,2,NULL,'SEBRAE Rio','rio','20000000','Av Atlântica','500','Copacabana','Rio de Janeiro','RJ',1,0),
(6,2,NULL,'SEBRAE Curitiba','curitiba','80000000','Rua XV','600','Centro','Curitiba','PR',1,0),
(7,2,NULL,'SEBRAE Recife','recife','50000000','Av Boa Viagem','700','Boa Viagem','Recife','PE',1,0),
(8,2,NULL,'SEBRAE Salvador','salvador','40000000','Av Oceânica','800','Barra','Salvador','BA',1,0),
(9,2,NULL,'SEBRAE Goiânia','goiania','74000000','Av Goiás','900','Centro','Goiânia','GO',1,0),
(10,2,NULL,'SEBRAE Brasília','brasilia','70000000','Eixo Monumental','1000','Plano Piloto','Brasília','DF',1,0);

-- =========================================================
-- FAIXA CEP
-- =========================================================
INSERT INTO SolucoesDigitais.FaixaCEP (IdLocal, CEPde, CEPate) VALUES
(1,38400000,38409999),
(2,30100000,30109999),
(3,1000000,1999999),
(4,13000000,13009999),
(5,20000000,20009999),
(6,80000000,80009999),
(7,50000000,50009999),
(8,40000000,40009999),
(9,74000000,74009999),
(10,70000000,70009999);

-- =========================================================
-- PRODUTO
-- =========================================================
DELETE FROM SolucoesDigitais.Produto;

INSERT INTO SolucoesDigitais.Produto
(IdProduto, DescrTituloProduto, DescrProduto,
 Preco, NrCargaHoraria, IdInstrumento,
 IdAreaConhecimento, AreaConhecimento, Certificado)
VALUES
(100,'Gestão Financeira','Curso completo',0,8,1,10,'Finanças',1),
(101,'Marketing Digital','Curso completo',0,8,1,20,'Marketing',1),
(102,'Vendas','Curso completo',0,8,1,30,'Comercial',1),
(103,'Liderança','Curso completo',0,8,1,40,'Gestão',1),
(104,'Inovação','Curso completo',0,8,1,50,'Inovação',1),
(105,'MEI','Curso completo',0,8,1,60,'Empreendedorismo',1),
(106,'Fluxo de Caixa','Curso completo',0,8,1,10,'Finanças',1),
(107,'Branding','Curso completo',0,8,1,20,'Marketing',1),
(108,'Negociação','Curso completo',0,8,1,30,'Comercial',1),
(109,'Planejamento','Curso completo',0,8,1,40,'Gestão',1);

-- =========================================================
-- COLETIVO
-- =========================================================
DELETE FROM SolucoesDigitais.Coletivo;

INSERT INTO SolucoesDigitais.Coletivo
(IdAtendimento, IdProduto, IdLocalAtendimento,
 DescrTituloProduto, DescrProduto,
 Preco, NrCargaHoraria,
 Cidade, UF,
 DataInicio, DataFim,
 Modalidade, IdAreaConhecimento, AreaConhecimento)
VALUES
(1000,100,1,'Gestão Financeira','Turma presencial',0,8,'Uberlândia','MG',DATE_ADD(NOW(),INTERVAL 5 DAY),DATE_ADD(NOW(),INTERVAL 5 DAY),'Presencial',10,'Finanças'),
(1001,101,2,'Marketing Digital','Turma online',0,8,'BH','MG',DATE_ADD(NOW(),INTERVAL 6 DAY),DATE_ADD(NOW(),INTERVAL 6 DAY),'Remota',20,'Marketing'),
(1002,102,3,'Vendas','Turma presencial',0,8,'SP','SP',DATE_ADD(NOW(),INTERVAL 7 DAY),DATE_ADD(NOW(),INTERVAL 7 DAY),'Presencial',30,'Comercial'),
(1003,103,4,'Liderança','Turma online',0,8,'Campinas','SP',DATE_ADD(NOW(),INTERVAL 8 DAY),DATE_ADD(NOW(),INTERVAL 8 DAY),'Remota',40,'Gestão'),
(1004,104,5,'Inovação','Turma presencial',0,8,'Rio','RJ',DATE_ADD(NOW(),INTERVAL 9 DAY),DATE_ADD(NOW(),INTERVAL 9 DAY),'Presencial',50,'Inovação'),
(1005,105,6,'MEI','Turma online',0,8,'Curitiba','PR',DATE_ADD(NOW(),INTERVAL 10 DAY),DATE_ADD(NOW(),INTERVAL 10 DAY),'Remota',60,'Empreendedorismo'),
(1006,106,7,'Fluxo de Caixa','Turma presencial',0,8,'Recife','PE',DATE_ADD(NOW(),INTERVAL 11 DAY),DATE_ADD(NOW(),INTERVAL 11 DAY),'Presencial',10,'Finanças'),
(1007,107,8,'Branding','Turma online',0,8,'Salvador','BA',DATE_ADD(NOW(),INTERVAL 12 DAY),DATE_ADD(NOW(),INTERVAL 12 DAY),'Remota',20,'Marketing'),
(1008,108,9,'Negociação','Turma presencial',0,8,'Goiânia','GO',DATE_ADD(NOW(),INTERVAL 13 DAY),DATE_ADD(NOW(),INTERVAL 13 DAY),'Presencial',30,'Comercial'),
(1009,109,10,'Planejamento','Turma online',0,8,'Brasília','DF',DATE_ADD(NOW(),INTERVAL 14 DAY),DATE_ADD(NOW(),INTERVAL 14 DAY),'Remota',40,'Gestão');

-- =========================================================
-- COLETIVO DISPONIVEL
-- =========================================================
INSERT INTO PaginaER.Coletivo_Disponivel
(IdAtendimento, IdLocal, ExclusivoPJ, Destaque, Ordenacao, DivulgarMarketing)
VALUES
(1000,1,0,1,1,1),
(1001,2,0,0,1,1),
(1002,3,0,1,1,1),
(1003,4,0,0,1,1),
(1004,5,0,1,1,1),
(1005,6,0,0,1,1),
(1006,7,0,1,1,1),
(1007,8,0,0,1,1),
(1008,9,0,1,1,1),
(1009,10,0,0,1,1);

-- =========================================================
-- CONSULTORIA
-- =========================================================
INSERT INTO SolucoesDigitais.Consultoria
(IdProduto, DescrTituloProduto, DescrProduto,
 Preco, NrCargaHoraria, Modalidade,
 IdInstrumento, IdAreaConhecimento, AreaConhecimento)
VALUES
(200,'Consultoria Financeira','Especializada',0,4,'Presencial',1,10,'Finanças'),
(201,'Consultoria Marketing','Especializada',0,4,'Remoto',1,20,'Marketing'),
(202,'Consultoria Vendas','Especializada',0,4,'Presencial',1,30,'Comercial'),
(203,'Consultoria Liderança','Especializada',0,4,'Remoto',1,40,'Gestão'),
(204,'Consultoria Inovação','Especializada',0,4,'Presencial',1,50,'Inovação'),
(205,'Consultoria MEI','Especializada',0,4,'Remoto',1,60,'Empreendedorismo'),
(206,'Consultoria Fluxo','Especializada',0,4,'Presencial',1,10,'Finanças'),
(207,'Consultoria Branding','Especializada',0,4,'Remoto',1,20,'Marketing'),
(208,'Consultoria Negociação','Especializada',0,4,'Presencial',1,30,'Comercial'),
(209,'Consultoria Planejamento','Especializada',0,4,'Remoto',1,40,'Gestão');

-- =========================================================
-- CONSULTORIA DISPONIVEL
-- =========================================================
INSERT INTO PaginaER.Consultoria_Disponivel
(IdConsultoria, IdLocal, Destaque, Ordenacao, ExibirFormulario, DivulgarMarketing)
VALUES
(200,1,1,1,1,1),
(201,2,0,1,1,1),
(202,3,1,1,1,1),
(203,4,0,1,1,1),
(204,5,1,1,1,1),
(205,6,0,1,1,1),
(206,7,1,1,1,1),
(207,8,0,1,1,1),
(208,9,1,1,1,1),
(209,10,0,1,1,1);

-- =========================================================
-- USUARIO
-- =========================================================
INSERT INTO Usuario (Login, IdLocal)
VALUES
('admin1',1),('admin2',2),('admin3',3),('admin4',4),('admin5',5),
('admin6',6),('admin7',7),('admin8',8),('admin9',9),('admin10',10);

SET FOREIGN_KEY_CHECKS = 1;