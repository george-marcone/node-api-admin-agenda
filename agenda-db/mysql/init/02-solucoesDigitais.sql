USE SolucoesDigitais;

CREATE TABLE Produto (
  IdProduto INT PRIMARY KEY,
  DescrTituloProduto VARCHAR(255),
  DescrProduto TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  IdInstrumento INT,
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(150),
  Certificado BOOLEAN DEFAULT 0
);

CREATE TABLE Coletivo (
  IdAtendimento INT PRIMARY KEY,
  IdProduto INT NOT NULL,
  IdLocalAtendimento INT,
  IdLocalAtendimentoDivisao INT,
  DescrTituloProduto VARCHAR(255),
  DescrProduto TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  CEP VARCHAR(10),
  Logradouro VARCHAR(255),
  Numero VARCHAR(20),
  Complemento VARCHAR(100),
  Bairro VARCHAR(100),
  Cidade VARCHAR(100),
  UF CHAR(2),
  DataInicio DATETIME,
  DataFim DATETIME,
  Modalidade VARCHAR(50),
  Regional VARCHAR(100),
  IdInstrumento INT,
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(150),
  Certificado BOOLEAN DEFAULT 0,
  INDEX (IdProduto)
);

CREATE TABLE Kit (
  IdKit INT PRIMARY KEY,
  NomeKit VARCHAR(255),
  DescrKit TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(150),
  Certificado BOOLEAN DEFAULT 0
);

CREATE TABLE ExecucaoKit (
  IdExecucaoKit INT PRIMARY KEY,
  IdKit INT NOT NULL,
  NomeKit VARCHAR(255),
  DescrKit TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  CEP VARCHAR(10),
  Logradouro VARCHAR(255),
  Numero VARCHAR(20),
  Complemento VARCHAR(100),
  Bairro VARCHAR(100),
  Cidade VARCHAR(100),
  UF CHAR(2),
  DataInicio DATETIME,
  DataFim DATETIME,
  Modalidade VARCHAR(50),
  Regional VARCHAR(100),
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(150),
  IdLocalAtendimento INT,
  IdLocalAtendimentoDivisao INT,
  IdAtendimento INT,
  Certificado BOOLEAN DEFAULT 0,
  INDEX (IdKit)
);

CREATE TABLE Consultoria (
  IdProduto INT PRIMARY KEY,
  DescrTituloProduto VARCHAR(255),
  DescrProduto TEXT,
  Preco DECIMAL(10,2),
  NrCargaHoraria INT,
  Modalidade VARCHAR(50),
  IdInstrumento INT,
  IdAreaConhecimento INT,
  AreaConhecimento VARCHAR(150)
);