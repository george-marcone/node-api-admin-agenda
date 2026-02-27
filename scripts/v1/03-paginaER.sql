USE PaginaER;

CREATE TABLE Local (
  IdLocal INT PRIMARY KEY AUTO_INCREMENT,
  IdLocalTipo INT,
  IdLocalMatriz INT,
  Descricao VARCHAR(255),
  Slug VARCHAR(255),
  CEP VARCHAR(10),
  Logradouro VARCHAR(255),
  Numero VARCHAR(20),
  Complemento VARCHAR(100),
  Bairro VARCHAR(100),
  Cidade VARCHAR(100),
  UF CHAR(2),
  Imagem VARCHAR(255),
  Email VARCHAR(150),
  Telefone VARCHAR(50),
  Whatsapp VARCHAR(50),
  GrupoFacebook VARCHAR(255),
  HorarioInicio TIME,
  IntervaloInicio TIME,
  IntervaloFim TIME,
  HorarioFim TIME,
  IdDiasAtendimento INT,
  AvisoImportante TEXT,
  ServicosOferecidos TEXT,
  EmailAlerta VARCHAR(150),
  Situacao BOOLEAN DEFAULT 1,
  Excluido BOOLEAN DEFAULT 0,
  LocalizacaoMapa VARCHAR(255)
);

CREATE TABLE Coletivo_Disponivel (
  IdAtendimento INT,
  IdLocal INT,
  ExclusivoPJ BOOLEAN DEFAULT 0,
  Destaque BOOLEAN DEFAULT 0,
  Ordenacao INT DEFAULT 0,
  DivulgarMarketing BOOLEAN DEFAULT 0,
  PRIMARY KEY (IdAtendimento, IdLocal)
);

CREATE TABLE ExecucaoKit_Disponivel (
  IdExecucaoKit INT,
  IdLocal INT,
  ExclusivoPJ BOOLEAN DEFAULT 0,
  Destaque BOOLEAN DEFAULT 0,
  Ordenacao INT DEFAULT 0,
  DivulgarMarketing BOOLEAN DEFAULT 0,
  PRIMARY KEY (IdExecucaoKit, IdLocal)
);

CREATE TABLE Consultoria_Disponivel (
  IdConsultoria INT,
  IdLocal INT,
  Destaque BOOLEAN DEFAULT 0,
  Ordenacao INT DEFAULT 0,
  ExibirFormulario BOOLEAN DEFAULT 0,
  DivulgarMarketing BOOLEAN DEFAULT 0,
  PRIMARY KEY (IdConsultoria, IdLocal)
);

CREATE TABLE Produto_Personalizacao (
  IdProduto INT PRIMARY KEY,
  ImagemGrande VARCHAR(255),
  ImagemMedia VARCHAR(255),
  ImagemPequena VARCHAR(255),
  Video VARCHAR(255),
  SituacaoVideo BOOLEAN DEFAULT 0
);

CREATE TABLE Kit_Personalizacao (
  IdKit INT PRIMARY KEY,
  ImagemGrande VARCHAR(255),
  ImagemMedia VARCHAR(255),
  ImagemPequena VARCHAR(255),
  Video VARCHAR(255),
  SituacaoVideo BOOLEAN DEFAULT 0
);

CREATE TABLE Banner (
  IdBanner INT PRIMARY KEY AUTO_INCREMENT,
  IdLocal INT,
  Titulo VARCHAR(255),
  Link VARCHAR(255),
  Imagem VARCHAR(255),
  Situacao BOOLEAN DEFAULT 0,
  Ordenacao INT DEFAULT 0,
  DataInicio DATE,
  DataFim DATE,
  Excluido BOOLEAN DEFAULT 0
);