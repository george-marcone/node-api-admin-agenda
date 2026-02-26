exports.sqlListarColetivo = `
SELECT DISTINCT
sdc.IdAtendimento,
sdc.IdLocalAtendimento,
sdc.IdLocalAtendimentoDivisao,
sdc.IdProduto,
sdc.DescrTituloProduto,
sdc.DescrProduto,
sdc.Preco,
sdc.NrCargaHoraria,
sdc.CEP,
sdc.Logradouro,
sdc.Numero,
sdc.Complemento,
sdc.Bairro,
sdc.Cidade,
sdc.UF,
sdc.DataInicio,
sdc.DataFim,
sdc.Modalidade,
sdc.Regional,
sdc.IdInstrumento,
sdc.IdAreaConhecimento,
sdc.AreaConhecimento,
pci.DescrComplementoTitulo,
pci.InformacoesAdicionais,
sdc.Certificado,
pp.ImagemGrande,
pp.ImagemMedia,
pp.ImagemPequena,
pp.Video,
pp.SituacaoVideo
FROM SolucoesDigitais.Coletivo sdc
LEFT JOIN PaginaER.Coletivo_InfoAdicionais pci ON sdc.IdAtendimento = pci.IdAtendimento
Left Join PaginaER.Produto_Personalizacao pp on pp.IdProduto  = sdc.IdProduto
ORDER BY sdc.IdAtendimento, sdc.DataInicio
`
exports.sqlListarColetivoPorLocal = `
    SELECT DISTINCT
    sdc.IdAtendimento,
    sdc.IdLocalAtendimento,
    sdc.IdLocalAtendimentoDivisao,
    sdc.IdProduto,
    sdc.DescrTituloProduto,
    sdc.DescrProduto,
    sdc.Preco,
    sdc.NrCargaHoraria,
    sdc.CEP,
    sdc.Logradouro,
    sdc.Numero,
    sdc.Complemento,
    sdc.Bairro,
    sdc.Cidade,
    sdc.UF,
    sdc.DataInicio,
    sdc.DataFim,
    sdc.Modalidade,
    sdc.Regional,
    sdc.IdInstrumento,
    sdc.IdAreaConhecimento,
    sdc.AreaConhecimento,
    pci.DescrComplementoTitulo,
    pci.InformacoesAdicionais,
    sdc.Certificado,
    pp.ImagemGrande,
    pp.ImagemMedia,
    pp.ImagemPequena,
    pp.Video,
    pp.SituacaoVideo
  FROM SolucoesDigitais.Coletivo sdc
  LEFT JOIN PaginaER.Coletivo_InfoAdicionais pci ON sdc.IdAtendimento = pci.IdAtendimento
  LEFT JOIN PaginaER.Produto_Personalizacao pp on pp.IdProduto  = sdc.IdProduto
  WHERE sdc.IdLocalAtendimento = ?
  ORDER BY sdc.IdAtendimento, sdc.DataInicio
`


//ExecucaoKit
exports.sqlListarExecucaoKit = `
  SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado,
    kp.ImagemGrande,
    kp.ImagemMedia,
    kp.ImagemPequena,
    kp.Video,
    kp.SituacaoVideo
  FROM SolucoesDigitais.ExecucaoKit sdek
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
  LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = sdek.IdKit
  ORDER BY sdek.DataInicio
 `

exports.sqlConsultarExecucaoKit = `
  SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado
  FROM SolucoesDigitais.ExecucaoKit sdek   
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
  Where sdek.IdExecucaoKit = ?
  `

exports.sqlListarExecucaoKitPorLocal = `
    SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado,
    kp.ImagemGrande,
    kp.ImagemMedia,
    kp.ImagemPequena,
    kp.Video,
    kp.SituacaoVideo
  FROM SolucoesDigitais.ExecucaoKit sdek
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
  LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = sdek.IdKit
  WHERE sdek.IdLocalAtendimento = ?
  ORDER BY sdek.DataInicio
`

/*LOCAL*/

exports.sqlListarLocalDisponivelPorMatriz = `
SELECT 
IdLocalMatriz as idLocalMatriz,
IdLocal as idLocal,
Replace(Descricao,"SEBRAE AQUI - ", "") as nome,
Descricao as descricao,
Slug as slug,
CEP as cep,
Logradouro as logradouro,
Numero as numero,
Complemento as complemento,
Bairro as bairro,
Cidade as cidade,
UF as uf,
Imagem as imagem,
Email as email,
Telefone as telefone,
Whatsapp as whatsapp,
GrupoFacebook as facebook,
HorarioInicio as horarioInicio,
IntervaloInicio as intervaloInicio,
IntervaloFim as intervaloFim,
HorarioFim as horarioFim,
IdDiasAtendimento as idDiasAtendimento, 
AvisoImportante as avisoImportante, 
ServicosOferecidos as servicosOferecidos,
false as Duplicado,
LocalizacaoMapa as localizacaoMapa
FROM Local
where IdLocalMatriz = ?
and Situacao = 1
and Excluido = 0
order by 3 asc;`

exports.sqlListarLocalporTipo = `
SELECT 
IdLocalMatriz as idLocalMatriz,
IdLocal as idLocal,
Replace(Descricao,"SEBRAE AQUI - ", "") as nome,
Descricao as descricao,
Slug as slug,
CEP as cep,
Logradouro as logradouro,
Numero as numero,
Complemento as complemento,
Bairro as bairro,
Cidade as cidade,
UF as uf,
Imagem as imagem,
Email as email,
Telefone as telefone,
Whatsapp as whatsapp,
GrupoFacebook as facebook,
HorarioInicio as horarioInicio,
IntervaloInicio as intervaloInicio,
IntervaloFim as intervaloFim,
HorarioFim as horarioFim,
IdDiasAtendimento as idDiasAtendimento, 
AvisoImportante as avisoImportante, 
ServicosOferecidos as servicosOferecidos,
LocalizacaoMapa as localizacaoMapa,
EmailAlerta as emailAlerta
FROM Local
where IdLocalTipo IN (?)
and Situacao = 1
and Excluido = 0`;

exports.sqlConsultar = `
SELECT 
IdLocalMatriz as idLocalMatriz,
IdLocal as idLocal,
Replace(Descricao,"SEBRAE AQUI - ", "") as nome,
Descricao as descricao,
Slug as slug,
CEP as cep,
Logradouro as logradouro,
Numero as numero,
Complemento as complemento,
Bairro as bairro,
Cidade as cidade,
UF as uf,
Imagem as imagem,
Email as email,
Telefone as telefone,
Whatsapp as whatsapp,
GrupoFacebook as facebook,
HorarioInicio as horarioInicio,
IntervaloInicio as intervaloInicio,
IntervaloFim as intervaloFim,
HorarioFim as horarioFim,
IdDiasAtendimento as idDiasAtendimento, 
AvisoImportante as avisoImportante, 
ServicosOferecidos as servicosOferecidos,
Situacao as situacao,
LocalizacaoMapa as localizacaoMapa,
EmailAlerta as emailAlerta
FROM Local
where IdLocal = ?
and Excluido = 0`;

exports.sqlConsultarSebraeAquiPorSlug = `
Select 
IdLocal
,IdLocalMatriz
,Descricao
from Local 
where IdLocalTipo = 4
and Slug = ?
and Situacao = 1
and Excluido = 0
`
exports.sqlListarLocalporMatriz = `
SELECT 
IdLocalMatriz as idLocalMatriz,
IdLocal as idLocal,
Replace(Descricao,"SEBRAE AQUI - ", "") as nome,
Descricao as descricao,
Slug as slug,
CEP as cep,
Logradouro as logradouro,
Numero as numero,
Complemento as complemento,
Bairro as bairro,
Cidade as cidade,
UF as uf,
Imagem as imagem,
Email as email,
Telefone as telefone,
Whatsapp as whatsapp,
GrupoFacebook as facebook,
HorarioInicio as horarioInicio,
IntervaloInicio as intervaloInicio,
IntervaloFim as intervaloFim,
HorarioFim as horarioFim,
IdDiasAtendimento as idDiasAtendimento, 
AvisoImportante as avisoImportante, 
ServicosOferecidos as servicosOferecidos,
false as Duplicado,
Situacao as situacao,
LocalizacaoMapa as localizacaoMapa
FROM Local
where IdLocalMatriz = ?
and Situacao = 1
and Excluido = 0
order by 3 asc;`

exports.sqlAtualizarContato = `
UPDATE Local
SET
Email = ? ,
Telefone = ? ,
Whatsapp = ? ,
GrupoFacebook = ?
WHERE IdLocal = ?;`;


exports.sqlAtualizarHorario = `
UPDATE Local
SET

HorarioInicio = ?,
IntervaloInicio = ?,
IntervaloFim = ?,
HorarioFim = ?,
IdDiasAtendimento = ?
WHERE IdLocal = ?;`;

exports.sqlAtualizarEndereco = `
UPDATE Local
SET
Descricao = ?,
CEP = ? ,
Logradouro = ?,
Numero = ?,
Complemento = ?,
Bairro = ?,
Cidade = ?,
UF = ?
WHERE IdLocal = ?;`;

exports.sqlInativarLocal = `
UPDATE Local
SET
Situacao = 0
WHERE IdLocal = ?;`; 

exports.sqlConsultarDisponibidadeColetivo = `
Select 
IdAtendimento
, Idlocal
, ExclusivoPJ
, Destaque
, Ordenacao
, DivulgarMarketing
From Coletivo_Disponivel
Where IdAtendimento = ?
And IdLocal = ?
Order by Destaque desc,
CASE WHEN Ordenacao = 0 THEN 1 ELSE 0 END,
Ordenacao`;


exports.sqlListarDisponibidadeColetivo = `
Select 
b.IdAtendimento
, b.ExclusivoPJ
, b.Destaque
, b.Ordenacao
, 1 as Disponivel
, b.DivulgarMarketing
, c.*
, pp.ImagemGrande
, pp.ImagemMedia
, pp.ImagemPequena
, pp.Video
, pp.SituacaoVideo 
From PaginaER.Coletivo_Disponivel as b
Inner join SolucoesDigitais.Coletivo as c On c.IdAtendimento = b.IdAtendimento
Left Join PaginaER.Produto_Personalizacao pp on pp.IdProduto  = c.IdProduto
Where b.IdLocal = ?
Order by Destaque desc,
CASE WHEN Ordenacao = 0 THEN 1 ELSE 0 END,
Ordenacao`;


exports.sqlExcluirDisponibilidadeColetivo = `
Delete from Coletivo_Disponivel
Where IdAtendimento = ?
And IdLocal = ?`;

exports.sqlIncluirDisponibilidadeColetivo = `
Insert Coletivo_Disponivel (IdAtendimento, IdLocal, ExclusivoPJ, DivulgarMarketing) Values(?,?,?,?)`

exports.sqlConsultarDisponibidadeExecucaoKit = `
Select 
IdExecucaoKit
, Idlocal
, ExclusivoPJ
, Destaque
, Ordenacao
, DivulgarMarketing
From ExecucaoKit_Disponivel
Where IdExecucaoKit = ? 
And IdLocal = ?
Order by Ordenacao`;

exports.sqlExcluirDisponibilidadeExecucaoKit = `
Delete from ExecucaoKit_Disponivel
Where IdExecucaoKit = ?
And IdLocal = ?`;

exports.sqlIncluirDisponibilidadeExecucaoKit = `
Insert ExecucaoKit_Disponivel (IdExecucaoKit, IdLocal, ExclusivoPJ, DivulgarMarketing) Values(?,?,?,?)`;

exports.sqlListarDisponibidadeExecucaoKit = `
    Select 
  dis.IdExecucaoKit as IdAtendimento
  , ExclusivoPJ
  , Destaque
  , Ordenacao
  , 1 as Disponivel
  , dis.DivulgarMarketing
  , kit.*
  , kp.ImagemGrande
  , kp.ImagemMedia
  , kp.ImagemPequena
  From PaginaER.ExecucaoKit_Disponivel as dis
  Inner join SolucoesDigitais.ExecucaoKit as kit On kit.IdExecucaoKit = dis.IdExecucaoKit
  Left Join PaginaER.Kit_Personalizacao kp On kp.IdKit = kit.IdKit
  Where dis.IdLocal = ? Order by dis.Ordenacao
`;

exports.sqlConsultarUsuario = `
Select 
Login as login
,IdLocal as idLocal
From Usuario
Where Login = ?`;

exports.sqlIncluirUsuario = `
Insert Usuario (Login, IdLocal) Values(?,?)`;

exports.sqlAlterarExclusivoPJColetivo = `
Update Coletivo_Disponivel 
Set ExclusivoPJ = ?
WHERE IdLocal = ?
AND IdAtendimento = ?;
`;

exports.sqlAlterarExclusivoPJExecucaoKit = `
Update ExecucaoKit_Disponivel 
Set ExclusivoPJ = ?
WHERE IdLocal = ?
AND IdExecucaoKit = ?;
`;

exports.sqlAlterarCursoDestaqueExecucaoKit = `
Update ExecucaoKit_Disponivel 
Set Destaque = ?,
Ordenacao = ?
WHERE IdExecucaoKit = ?
AND IdLocal = ?;
`;

exports.sqlConsultarOrdenacaoExecucaoKitDisponivel = `
SELECT max(Ordenacao) Ordenacao FROM ExecucaoKit_Disponivel 
where IdLocal = ?;
`;

exports.sqlAlterarCursoOrdemExecucaoKit = `
Update ExecucaoKit_Disponivel 
Set Ordenacao = ?
WHERE IdExecucaoKit = ?
AND IdLocal = ?;
`;

exports.sqlAlterarCursoDestaqueColetivo = `
Update Coletivo_Disponivel 
Set Destaque = ?,
Ordenacao = ?
WHERE IdAtendimento = ?
AND IdLocal = ?;
`;

exports.sqlConsultarOrdenacaoColetivoDisponivel = `
SELECT max(Ordenacao) Ordenacao FROM Coletivo_Disponivel 
where IdLocal = ?;
`;

exports.sqlAlterarCursoOrdenacaoColetivo = `
Update Coletivo_Disponivel 
Set Ordenacao = ?
WHERE IdAtendimento = ?
AND IdLocal = ?;
`;

exports.sqlCadastrarEndereco = `
INSERT Local(IdLocalTipo, IdLocalMatriz, Descricao, CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF)
Values(?,?,?,?,?,?,?,?,?,?); `;

exports.sqlAtualizarServicos = `
UPDATE Local
SET
ServicosOferecidos = ?
WHERE IdLocal = ?;`;

exports.sqlAtualizarImagem = `
UPDATE Local
SET
Imagem = ?
WHERE IdLocal = ?;`;

exports.sqlIncluirBanner = `
INSERT Banner
(IdLocal, Titulo, Link, Situacao, DataInicio, DataFim)
VALUES(?, ?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), STR_TO_DATE(?, '%d/%m/%Y'));`;

exports.sqlConsultarBanner = `

SELECT 
  IdBanner as idBanner,
  Titulo as titulo,
  Situacao as situacao,
  IdLocal as idLocal,
  Link as link, 
  Imagem as imagem,
  Ordenacao as ordenacao,
  DATE_FORMAT(DataInicio, '%d/%m/%Y') as dataInicio,
  DATE_FORMAT(DataFim, '%d/%m/%Y') as dataFim,
  CASE WHEN ((DataInicio <= sysdate() AND DataFim >= sysdate()) OR (DataInicio IS NULL AND DataFim IS NULL)) THEN 1 ELSE 0 END as exibir
FROM Banner Where IdBanner = ?;`;

exports.sqlListarBanner = `
SELECT 
  IdBanner as idBanner,
  Titulo as titulo,
  Situacao as publicado,
  Link as link, 
  Imagem as imagem,
  Ordenacao as ordenacao,
  DATE_FORMAT(DataInicio, '%d/%m/%Y') as dataInicio,
  DATE_FORMAT(DataFim, '%d/%m/%Y') as dataFim,
  CASE WHEN ((DataInicio <= sysdate() AND DataFim >= sysdate()) OR (DataInicio IS NULL AND DataFim IS NULL)) THEN 1 ELSE 0 END as exibir
FROM Banner 
WHERE IdLocal = ?
  AND Excluido = 0
ORDER BY Ordenacao,
  CASE WHEN Ordenacao = 0 THEN 1 ELSE 0 END;`;

exports.sqlExcluirBanner = `
Update Banner
Set Excluido = 1
Where IdBanner = ?`;

exports.sqlAlterarBanner = `
UPDATE Banner
SET
Titulo = ?,
Link = ?,
Imagem = ?,
Situacao = ?,
Ordenacao = ?,
DataInicio = STR_TO_DATE(?, '%d/%m/%Y'),
DataFim = STR_TO_DATE(?, '%d/%m/%Y')
WHERE IdBanner = ?`;

exports.sqlAtualizarAviso = `
UPDATE Local
SET
AvisoImportante = ?
WHERE IdLocal = ?;`;

exports.sqlAtualizarSlug = `
UPDATE Local
SET
Descricao = ?,
Slug = ?,
Situacao = 1
WHERE IdLocal = ?;`;

exports.sqlAlterarBannerOrdenacao = `
Update Banner 
Set Ordenacao = ?
WHERE IdBanner = ?
AND IdLocal = ?;
`;

exports.sqlConsultarOrdenacaoBanner = `
SELECT max(Ordenacao) ordenacao FROM Banner 
where IdLocal = ?;
`;

exports.sqlRelatorioColetivoDisponivelLocal =
  `
Select
    b.IdAtendimento as idAtendimento, 
    b.ExclusivoPJ as exclusivoPJ,
    b.IdLocal as idLocal    
FROM PaginaER.Coletivo_Disponivel b;  
`;

exports.sqlRelatorioExecucaoKitDisponivelLocal =
  `
Select     
    b.IdExecucaoKit as idExecucaoKit, 
    b.ExclusivoPJ as exclusivoPJ,
    b.IdLocal as idLocal
    b.DivulgarMarketing as divulgarMarketing   
FROM PaginaER.ExecucaoKit_Disponivel b;  
`;

exports.sqlListarInteressados =
  `
  SELECT
	  I.IdInteracao idInteracao,
    I.IdLocal idLocal,
    I.Nome nome,
    I.Email email,
    I.Celular celular,
    I.IdProduto idProduto,
    I.Data dataInteresse,
    I.Motivo motivo,
    I.FaraConsultoria faraConsultoria,
    C.DescrTituloProduto tituloProduto,
    CASE WHEN C.Modalidade = 'Remoto' THEN 'Online' ELSE C.Modalidade END AS modalidade

  FROM PaginaER.Interacao I
  INNER JOIN SolucoesDigitais.Consultoria C ON I.IdProduto = C.IdProduto
  WHERE I.IdLocal = ?
  AND I.Excluido = 0;
`;

exports.sqlConsultarInteressadoPorId =
  `
  SELECT 
	I.IdInteracao idInteracao,
    I.IdLocal idLocal,
    I.Nome nome,
    I.Email email,
    I.Celular celular,
    I.IdProduto idProduto,
    I.Data dataInteresse,
    I.Motivo motivo,
    I.FaraConsultoria faraConsultoria
  FROM PaginaER.Interacao I  
  WHERE I.IdInteracao = ?
  AND I.Excluido = 0;
`;

exports.sqlExcluirInteressado = `
Update PaginaER.Interacao
Set Excluido = 1,
FaraConsultoria = ?
Where IdInteracao = ?;`;

exports.sqlAlterarConsultoriaOrdenacao = `
Update Consultoria_Disponivel 
Set Ordenacao = ?
WHERE IdLocal = ?
AND IdConsultoria = ?;
`;

exports.sqlAlterarConsultoriaDestaque = `
Update Consultoria_Disponivel
Set Destaque = ?
WHERE IdLocal = ?
AND IdConsultoria = ?;
`;

exports.sqlIncluirDisponibilidadeConsultoria = `
Insert Consultoria_Disponivel (IdConsultoria, IdLocal, ExibirFormulario, DivulgarMarketing) Values(?,?,?,?)`;

exports.sqlListarConsultoriasDisponiveis =
  `
Select     
    b.IdConsultoria as idConsultoria, 
    b.IdLocal as idLocal,
    b.Destaque as destaque,
    b.Ordenacao as ordenacao,
    b.ExibirFormulario as exibirFormulario,
    b.DivulgarMarketing as divulgarMarketing  
FROM Consultoria_Disponivel b
WHERE IdLocal = ?;  
`;

exports.sqlConsultarDisponibidadeConsultoria = `
Select 
IdConsultoria
, Idlocal
, Destaque
, Ordenacao
, ExibirFormulario
, DivulgarMarketing
From Consultoria_Disponivel
Where IdConsultoria = ? 
And IdLocal = ?`;

exports.sqlExcluirDisponibilidadeConsultoria = `
Delete from Consultoria_Disponivel
Where IdConsultoria = ?
And IdLocal = ?;`;

exports.sqlCadastrarInteressado = `
INSERT INTO PaginaER.Interacao (IdLocal, IdProduto, Nome, Celular, Email, Motivo, Data)
VALUES(?, ?, ?, ?, ?, ?, sysdate());`;

exports.sqlAtualizarEmailAlerta = `
UPDATE Local
SET
EmailAlerta = ?
WHERE IdLocal = ?;`;

exports.sqlRegistroDownload = `
INSERT INTO PaginaER.DownLoadMaterialApoio
(IdConteudoApoio, IdProdutoConsultoria, IdLocal,
CpfInteressado, DataDownload)
VALUES (?, ?, ?, ?, sysdate());`;

exports.sqlConsultaDownLoadEbook = `
SELECT
IdDownLoadMaterialApoio,
IdConteudoApoio,
IdProdutoConsultoria,
IdLocal,
CpfInteressado,
DataDownload
FROM PaginaER.DownLoadMaterialApoio
WHERE year(DataDownload) = year(sysdate())
AND CpfInteressado = ?
AND IdConteudoApoio = ?;`;

exports.sqlAlterarConsultoriaDisponivel = `
Update Consultoria_Disponivel 
Set ExibirFormulario = ?
WHERE IdLocal = ?
AND IdConsultoria = ?;
`;

exports.sqlListarLocaisPorExecucaoKit =
  `
Select     
    b.IdLocal as idLocal    
FROM PaginaER.ExecucaoKit_Disponivel b
WHERE b.IdExecucaoKit = ?;  
`;

exports.sqlListarLocaisPorColetivo =
  `
Select     
    b.IdLocal as idLocal    
FROM PaginaER.Coletivo_Disponivel b
WHERE b.IdAtendimento = ?`;

exports.sqlConsultarAcessosMensais = `
Select 
IdLocal
, visualizacoes
, usuarios
, mes
, ano
From AcessosMensais
Where IdLocal = ? And mes = ? And ano = ?`;

exports.sqlEditarMarketingConsultoria = `
Update Consultoria_Disponivel
Set DivulgarMarketing = ?
Where IdConsultoria = ?
And IdLocal = ?;`;

exports.sqlAlterarMarketingExecucaoKit = `
Update ExecucaoKit_Disponivel 
Set DivulgarMarketing = ?
WHERE IdExecucaoKit = ?
AND IdLocal = ?;
`;

exports.sqlAlterarMarketingColetivo = `
Update Coletivo_Disponivel 
Set DivulgarMarketing = ?
WHERE IdAtendimento = ?
AND IdLocal = ?;
`;


exports.sqlMarketingDivulgar = `
SELECT
  if(Upper(c.Descricao)='ONLINE','UAC',c.Descricao) as 'Escritorio Regional',
  a.idAtendimento as Turma,
  'Coletivo' AS 'Tipo',
  DATE_FORMAT(MIN(a.DataInicio), '%d/%m/%Y') AS 'Início',
  DATE_FORMAT(MAX(a.DataFim), '%d/%m/%Y') AS 'Fim',
  GROUP_CONCAT(CONCAT(DATE_FORMAT(DATE(a.DataInicio), '%d/%m')) ORDER BY a.DataInicio SEPARATOR ', ') AS 'Datas do Evento',
  CONCAT(DATE_FORMAT(TIME(DATE_ADD(MIN(a.DataInicio), INTERVAL 3 HOUR)), '%H:%i'), ' às ',
  DATE_FORMAT(TIME(DATE_ADD(MAX(a.DataFim), INTERVAL 3 HOUR)), '%H:%i')) AS 'Horário',
  a.Cidade AS 'Município',
  a.Modalidade AS 'Modalidade',
  REPLACE(a.DescrTituloProduto ,'"','') AS 'Produto',
  REPLACE(a.DescrProduto,'"','') AS 'Descrição',
  CONCAT('https://agenda.sebraesp.com.br/', c.slug, '/evento/', a.idProduto, '/turma/', a.idAtendimento) AS Link,
  if(a.Modalidade = 'Presencial',  CONCAT( a.Logradouro, ', ', a.Numero, ', ', a.Bairro, ', ', a.Cidade) , 'Online') AS Local,
  a.Preco,
  if(b.Destaque = 0,'Não', 'Sim') as Destaque,
  if(b.DivulgarMarketing = 0,'Não', 'Sim') as Divulgar
FROM SolucoesDigitais.Coletivo a
  INNER JOIN PaginaER.Coletivo_Disponivel b ON a.IdAtendimento = b.IdAtendimento
  INNER JOIN PaginaER.Local c ON c.idLocal =  a.IdLocalAtendimento
  WHERE b.DivulgarMarketing = 1
GROUP BY a.idAtendimento, a.Cidade, a.Modalidade, a.DescrTituloProduto, Link, LOCAL, c.Descricao,a.Preco, a.DescrProduto, b.Destaque, b.DivulgarMarketing

UNION

SELECT
  if(UPPER(c.Descricao)='ONLINE','UAC',c.Descricao) 'Escritorio Regional',
  a.IdExecucaoKit AS Turma,
  'Kit' AS 'Tipo',
  DATE_FORMAT(MIN(a.DataInicio), '%d/%m/%Y') AS 'Início',
  DATE_FORMAT(MAX(a.DataFim), '%d/%m/%Y') AS 'Fim',
  GROUP_CONCAT(CONCAT(DATE_FORMAT(DATE(a.DataInicio), '%d/%m')) ORDER BY a.DataInicio SEPARATOR ', ') AS 'Data do Evento',
  CONCAT(DATE_FORMAT(TIME(DATE_ADD(MIN(a.DataInicio), INTERVAL 3 HOUR)), '%H:%i'), ' às ',
  DATE_FORMAT(TIME(DATE_ADD(MAX(a.DataFim), INTERVAL 3 HOUR)), '%H:%i')) AS 'Horário',
  a.Cidade AS 'Município',
  a.Modalidade AS 'Modalidade',
  REPLACE(REPLACE(a.NomeKit,'“',''),'"','')  AS 'Produto',
  REPLACE(a.DescrKit,'"','') AS 'Descrição',
  CONCAT('https://agenda.sebraesp.com.br/'
  , c.slug, '/evento/', a.idKit, '/turma/', a.IdExecucaoKit) AS Link,
  if(a.Modalidade = 'Presencial',  CONCAT( a.Logradouro, ', ', a.Numero, ', ', a.Bairro, ', ', a.Cidade) , 'Online') AS LOCAL,
  a.Preco,
  if(b.Destaque = 0,'Não', 'Sim') as Destaque,
  if(b.DivulgarMarketing = 0,'Não', 'Sim') as Divulgar
FROM SolucoesDigitais.ExecucaoKit a
  INNER JOIN PaginaER.ExecucaoKit_Disponivel b ON a.IdExecucaoKit = b.IdExecucaoKit
  INNER JOIN PaginaER.Local c ON c.idLocal =  a.IdLocalAtendimento
  WHERE b.DivulgarMarketing = 1
GROUP BY a.IdExecucaoKit, a.Cidade, a.Modalidade, a.DescrKit, Link, LOCAL, c.Descricao,a.Preco,a.NomeKit, b.Destaque, b.DivulgarMarketing

UNION

SELECT
  PL.Descricao AS 'Escritório Regional',
  '-' AS 'Turma',
  'Consultoria' AS 'Tipo',
  '-' AS 'Início',
  '-' AS 'Fim',
  '-' AS 'Datas do Evento',
  '-' AS 'Horário',
  '-' AS 'Município',
  SC.Modalidade,
  SC.DescrTituloProduto AS 'Produto',
  REPLACE(SC.DescrProduto, '"', '') AS 'Descricao',
  CONCAT('
  https://agenda.sebraesp.com.br/',PL.slug,'/consultoria/',SC.IdProduto,'/inscricao')
  AS Link,
  IF(SC.Modalidade = 'Presencial',CONCAT(PL.Descricao,', ',PL.Logradouro,', ',PL.Numero,', ',PL.Bairro,', ',PL.Cidade),'Online') AS LOCAL,
  SC.Preco,
  IF(PCD.Destaque = 0, 'Não', 'Sim') AS Destaque,
  IF(PCD.DivulgarMarketing = 0,'Não','Sim') AS Divulgar
FROM SolucoesDigitais.Consultoria SC
  INNER JOIN PaginaER.Consultoria_Disponivel PCD ON PCD.IdConsultoria = SC.IdProduto
  INNER JOIN PaginaER.Local PL ON PL.IdLocal = PCD.IdLocal
  WHERE PCD.DivulgarMarketing = 1
`;

exports.sqlListarAcessosMensais = `
Select * From AcessosMensais 
WHERE IdLocal = ?;
`;

exports.sqlListarTodosAcessosMensais = `
Select * From AcessosMensais am
Inner Join Local l On l.IdLocal = am.IdLocal 
WHERE mes = ? and ano = ? and l.IdLocal != 49 Order By am.visualizacoes Desc;
`;

exports.sqlConsultaInfoAdicionaisExecucaoKit = `
  SELECT 
    peki.IdExecucaoKit,
    peki.IdLocalAtendimento,
    peki.IdLocalAtendimentoDivisao,
    peki.InformacoesAdicionais,
    peki.DescrComplementoTitulo
  FROM PaginaER.ExecucaoKit_InfoAdicionais peki
  WHERE peki.IdExecucaoKit = ?
  AND peki.IdLocalAtendimento = ?
`;

exports.sqlConsultaInfoAdicionaisColetivo = `
  SELECT 
    pci.IdAtendimento,
    pci.IdLocalAtendimento,
    pci.IdLocalAtendimentoDivisao,
    pci.InformacoesAdicionais,
    pci.DescrComplementoTitulo
  FROM PaginaER.Coletivo_InfoAdicionais pci
  WHERE pci.IdAtendimento = ?
  AND pci.IdLocalAtendimento = ?
`;

exports.sqlInserirInfoAdicionaisColetivo = `
INSERT INTO PaginaER.Coletivo_InfoAdicionais
(IdAtendimento, IdLocalAtendimento, InformacoesAdicionais, DescrComplementoTitulo)
VALUES (?, ?, ?, ?)`;

exports.sqlInserirInfoAdicionaisExecucaoKit = `
INSERT INTO PaginaER.ExecucaoKit_InfoAdicionais
(IdExecucaoKit, IdLocalAtendimento, InformacoesAdicionais, DescrComplementoTitulo)
VALUES (?, ?, ?, ?)`;

exports.sqlAlterarInfoAdicionaisExecucaoKit = `
UPDATE PaginaER.ExecucaoKit_InfoAdicionais
SET InformacoesAdicionais = ?, DescrComplementoTitulo = ?
WHERE IdExecucaoKit = ?
AND IdLocalAtendimento = ?`;

exports.sqlAlterarInfoAdicionaisColetivo = `
UPDATE PaginaER.Coletivo_InfoAdicionais
SET InformacoesAdicionais = ?, DescrComplementoTitulo = ?
WHERE IdAtendimento = ?
AND IdLocalAtendimento = ?`;

exports.sqlConsultaInfoAdicionaisConsultoria = `
  SELECT 
    pcia.IdProdutoConsultoria,
    pcia.IdLocalAtendimento,
    pcia.IdLocalAtendimentoDivisao,
    pcia.InformacoesAdicionais,
    pcia.DescrComplementoTitulo
  FROM PaginaER.Consultoria_InfoAdicionais pcia
  WHERE pcia.IdProdutoConsultoria = ?
  AND pcia.IdLocalAtendimento = ?
 `;

 exports.sqlInserirConsultoriaInfoAdicionais = `
 INSERT INTO PaginaER.Consultoria_InfoAdicionais
 (IdProdutoConsultoria, IdLocalAtendimento, InformacoesAdicionais)
 VALUES (?, ?, ?)`;

exports.sqlAlterarInfoAdicionaisConsultoria = `
UPDATE PaginaER.Consultoria_InfoAdicionais
SET InformacoesAdicionais = ?
WHERE IdProdutoConsultoria = ?
AND IdLocalAtendimento = ?`;

//Consultoria
exports.sqlListarConsultoria = `
Select 
	sdc.IdProduto
	, sdc.DescrTituloProduto
	, sdc.DescrProduto
	, sdc.Preco
	, NrCargaHoraria
	, CASE WHEN sdc.Modalidade = 'Remoto' THEN 'Online' ELSE sdc.Modalidade END AS Modalidade
	, sdc.IdInstrumento
	, sdc.IdAreaConhecimento
	, sdc.AreaConhecimento
	, pci.InformacoesAdicionais
	, ca.IdConteudoApoio
	, ca.Titulo
	, ca.URL
from SolucoesDigitais.Consultoria sdc
left join PaginaER.Consultoria_InfoAdicionais pci On sdc.IdProduto = pci.IdProdutoConsultoria 
and pci.IdLocalAtendimento = ?
left join SolucoesDigitais.Consultoria_ConteudoApoio cca On cca.IdProduto = sdc.IdProduto
left join SolucoesDigitais.ConteudoApoio ca on ca.IdConteudoApoio = cca.IdConteudoApoio
`
exports.sqlConsultarColetivo = `
  SELECT DISTINCT
    sdc.IdAtendimento,
    sdc.IdProduto,
    sdc.DescrTituloProduto,
    sdc.DescrProduto,
    sdc.Preco,
    sdc.NrCargaHoraria,
    sdc.CEP,
    sdc.Logradouro,
    sdc.Numero,
    sdc.Complemento,
    sdc.Bairro,
    sdc.Cidade,
    sdc.UF,
    sdc.DataInicio,
    sdc.DataFim,
    sdc.Modalidade,
    sdc.IdLocalAtendimento,
    sdc.IdLocalAtendimentoDivisao,
    sdc.Regional,
    sdc.IdInstrumento,
    sdc.IdAreaConhecimento,
    sdc.AreaConhecimento,    
    pcia.DescrComplementoTitulo complementoTitulo,
    pcia.InformacoesAdicionais maisInformacoes,
    sdc.Certificado certificado
  FROM SolucoesDigitais.Coletivo sdc
  LEFT JOIN PaginaER.Coletivo_InfoAdicionais pcia ON sdc.IdAtendimento = pcia.IdAtendimento    
  WHERE sdc.IdAtendimento = ?`

exports.sqlExcluirInfoAdicionaisConsultoria = `
DELETE FROM PaginaER.Consultoria_InfoAdicionais
WHERE IdProdutoConsultoria = ?
AND IdLocalAtendimento = ?`

exports.sqlExcluirInfoAdicionaisColetivo = `
DELETE FROM PaginaER.Coletivo_InfoAdicionais
WHERE IdAtendimento = ?
AND IdLocalAtendimento = ?`

exports.sqlExcluirInfoAdicionaisExecucaoKit = `
DELETE FROM PaginaER.ExecucaoKit_InfoAdicionais
WHERE IdExecucaoKit = ?
AND IdLocalAtendimento = ?`

exports.sqlQtdConsultoriaDisponivel = `
SELECT count(DISTINCT pcd.IdConsultoria) consultoria FROM PaginaER.Consultoria_Disponivel pcd
where pcd.IdLocal = ?
`

exports.sqlQtdColetivoPresencialDisponivel = `
  SELECT count( distinct sdc.IdProduto) as presencial
  FROM SolucoesDigitais.Coletivo sdc
  INNER JOIN PaginaER.Coletivo_Disponivel pcd
  ON pcd.IdAtendimento = sdc.IdAtendimento AND pcd.IdLocal = ?
  WHERE LOWER(sdc.modalidade) = 'presencial'
  AND sdc.DataInicio >= sysdate()  
`

exports.sqlQtdColetivoOnlineDisponivel = `
  SELECT count( distinct sdc.IdProduto) as 'online'
  FROM SolucoesDigitais.Coletivo sdc
  INNER JOIN PaginaER.Coletivo_Disponivel pcd
  ON pcd.IdAtendimento = sdc.IdAtendimento AND pcd.IdLocal = ?
  WHERE LOWER(sdc.modalidade) = 'remota'
  AND sdc.DataInicio >= sysdate()  
`

exports.sqlQtdExecucaoKitPresencialDisponivel = `
  SELECT count( distinct sdek.IdKit) as presencial
  FROM SolucoesDigitais.ExecucaoKit sdek
  INNER JOIN PaginaER.ExecucaoKit_Disponivel ped
  ON ped.IdExecucaoKit = sdek.IdExecucaoKit AND ped.IdLocal = ?
  WHERE LOWER(sdek.modalidade) = 'presencial'
  AND sdek.DataInicio >= sysdate()  
`

exports.sqlQtdExecucaoKitOnlineDisponivel = `
  SELECT count( distinct sdek.IdKit) as 'online'
  FROM SolucoesDigitais.ExecucaoKit sdek
  INNER JOIN PaginaER.ExecucaoKit_Disponivel ped
  ON ped.IdExecucaoKit = sdek.IdExecucaoKit AND ped.IdLocal = ?
  WHERE LOWER(sdek.modalidade) = 'remota'
  AND sdek.DataInicio >= sysdate()  
`

exports.sqlListarColetivoPresencialPorLocal = `
  SELECT DISTINCT
    sdc.IdAtendimento,
    sdc.IdLocalAtendimento,
    sdc.IdLocalAtendimentoDivisao,
    sdc.IdProduto,
    sdc.DescrTituloProduto,
    sdc.DescrProduto,
    sdc.Preco,
    sdc.NrCargaHoraria,
    sdc.CEP,
    sdc.Logradouro,
    sdc.Numero,
    sdc.Complemento,
    sdc.Bairro,
    sdc.Cidade,
    sdc.UF,
    sdc.DataInicio,
    sdc.DataFim,
    sdc.Modalidade,
    sdc.Regional,
    sdc.IdInstrumento,
    sdc.IdAreaConhecimento,
    sdc.AreaConhecimento,
    pci.DescrComplementoTitulo,
    pci.InformacoesAdicionais,
    sdc.Certificado,
    pp.ImagemGrande,
    pp.ImagemMedia,
    pp.ImagemPequena
  FROM SolucoesDigitais.Coletivo sdc
  LEFT JOIN PaginaER.Coletivo_InfoAdicionais pci ON sdc.IdAtendimento = pci.IdAtendimento
  LEFT JOIN PaginaER.Produto_Personalizacao pp ON pp.IdProduto = sdc.IdProduto
  WHERE sdc.IdLocalAtendimento = ?
  AND sdc.Modalidade = 'Presencial'
  AND sdc.DataInicio >= sysdate()
  ORDER BY sdc.IdAtendimento, sdc.DataInicio
`

exports.sqlListarExecucaoKitPresencialPorLocal = `
  SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado,
    kp.ImagemGrande,
    kp.ImagemMedia,
    kp.ImagemPequena,
    kp.Video,
    kp.SituacaoVideo
  FROM SolucoesDigitais.ExecucaoKit sdek
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
  LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = sdek.IdKit
  WHERE sdek.IdLocalAtendimento = ?
  AND sdek.Modalidade = 'Presencial'
  AND sdek.DataInicio >= sysdate()
  ORDER BY sdek.DataInicio
`

exports.sqlListarColetivoOnlinePorLocal = `
  SELECT DISTINCT
    sdc.IdAtendimento,
    sdc.IdLocalAtendimento,
    sdc.IdLocalAtendimentoDivisao,
    sdc.IdProduto,
    sdc.DescrTituloProduto,
    sdc.DescrProduto,
    sdc.Preco,
    sdc.NrCargaHoraria,
    sdc.CEP,
    sdc.Logradouro,
    sdc.Numero,
    sdc.Complemento,
    sdc.Bairro,
    sdc.Cidade,
    sdc.UF,
    sdc.DataInicio,
    sdc.DataFim,
    sdc.Modalidade,
    sdc.Regional,
    sdc.IdInstrumento,
    sdc.IdAreaConhecimento,
    sdc.AreaConhecimento,
    pci.DescrComplementoTitulo,
    pci.InformacoesAdicionais,
    sdc.Certificado,
    pp.ImagemGrande,
    pp.ImagemMedia,
    pp.ImagemPequena 
  FROM SolucoesDigitais.Coletivo sdc
  LEFT JOIN PaginaER.Coletivo_InfoAdicionais pci ON sdc.IdAtendimento = pci.IdAtendimento
  LEFT JOIN PaginaER.Produto_Personalizacao pp ON pp.IdProduto = sdc.IdProduto
  WHERE sdc.IdLocalAtendimento = ?
  AND sdc.Modalidade = 'Remota'
  AND sdc.DataInicio >= sysdate()
  ORDER BY sdc.IdAtendimento, sdc.DataInicio
`

exports.sqlListarExecucaoKitOnlinePorLocal = `
  SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado,
    kp.ImagemGrande,
    kp.ImagemMedia,
    kp.ImagemPequena
  FROM SolucoesDigitais.ExecucaoKit sdek
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
    LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = sdek.IdKit
  WHERE sdek.IdLocalAtendimento = ?
  AND sdek.Modalidade = 'Remota'
  AND sdek.DataInicio >= sysdate()
  ORDER BY sdek.DataInicio
`
exports.sqlBannerAgrupados = `
Select am.IdLocal, Count(am.IdBanner) as total, l.Descricao From Banner am
Inner Join Local l On l.IdLocal = am.IdLocal
Where am.Excluido = 0 and am.Situacao = 1
Group By am.IdLocal ;
`;

exports.sqlLocaisBannersNaoPublicados = `
select IdLocal, Descricao from Local
where IdLocal not in (select distinct IdLocal from Banner    
Where Excluido = 0  and Situacao = 1)
And IdLocalMatriz Is Null ;
`;

exports.sqlQtdColetivoPresencialDisponivelSebraeAqui = `
  SELECT count( distinct sdc.IdProduto) as presencial
  FROM SolucoesDigitais.Coletivo sdc
  INNER JOIN PaginaER.Coletivo_Disponivel pcd
  ON pcd.IdAtendimento = sdc.IdAtendimento
  WHERE LOWER(sdc.modalidade) = 'presencial'
  AND sdc.DataInicio >= sysdate()
  AND sdc.IdLocalAtendimentoDivisao = ?
`

exports.sqlQtdColetivoOnlineDisponivelSebraeAqui = `
  SELECT count( distinct sdc.IdProduto) as 'online'
  FROM SolucoesDigitais.Coletivo sdc
  INNER JOIN PaginaER.Coletivo_Disponivel pcd
  ON pcd.IdAtendimento = sdc.IdAtendimento
  WHERE LOWER(sdc.modalidade) = 'remota'
  AND sdc.DataInicio >= sysdate()
  AND sdc.IdLocalAtendimentoDivisao = ?
`

exports.sqlQtdExecucaoKitPresencialDisponivelSebraeAqui = `
  SELECT count( distinct sdek.IdKit) as presencial
  FROM SolucoesDigitais.ExecucaoKit sdek
  INNER JOIN PaginaER.ExecucaoKit_Disponivel ped
  ON ped.IdExecucaoKit = sdek.IdExecucaoKit
  WHERE LOWER(sdek.modalidade) = 'presencial'
  AND sdek.DataInicio >= sysdate()
  AND sdek.IdLocalAtendimentoDivisao = ?
`

exports.sqlQtdExecucaoKitOnlineDisponivelSebraeAqui = `
  SELECT count( distinct sdek.IdKit) as 'online'
  FROM SolucoesDigitais.ExecucaoKit sdek
  INNER JOIN PaginaER.ExecucaoKit_Disponivel ped
  ON ped.IdExecucaoKit = sdek.IdExecucaoKit
  WHERE LOWER(sdek.modalidade) = 'remota'
  AND sdek.DataInicio >= sysdate()
  AND sdek.IdLocalAtendimentoDivisao = ?
`

exports.sqlConsultoriaAgrupados = `
Select cd.IdLocal, Count(cd.IdConsultoria) as total, l.Descricao From Consultoria_Disponivel cd
Inner Join Local l On l.IdLocal = cd.IdLocal
Group By cd.IdLocal ;
`;

exports.sqlLocaisConsultoriasNaoPublicadas = `
Select lc.IdLocal, lc.Descricao  from Local lc where lc.IdLocalTipo = 2
And lc.IdLocal not in (Select cd.IdLocal from Consultoria_Disponivel cd left join PaginaER.Local l on cd.idlocal = l.IdLocal)
And IdLocalMatriz Is Null ;
`;

exports.sqlCursosAgrupados = `
Select 
l.IdLocal, 
(
(
	select count(distinct cd.IdAtendimento)
	from Coletivo_Disponivel cd 
	Inner join SolucoesDigitais.Coletivo c on c.IdAtendimento = cd.IdAtendimento
	Where  cd.IdLocal = l.IdLocal  
) 
+
(
	select count(distinct e.IdAtendimento)
	from ExecucaoKit_Disponivel ek 
	Inner join SolucoesDigitais.ExecucaoKit e on e.IdExecucaoKit = ek.IdExecucaoKit
	Where ek.IdLocal = l.IdLocal 
)) as total,
l.Descricao From Local l
Where l.IdLocalMatriz is null
Group By l.IdLocal
order by total desc ;
`;

exports.sqlLocaisCursosNaoPublicadas = `
Select Idlocal, Descricao from Local where 
IdLocaltipo =2 and Idlocal not in (Select distinct cd.IdLocal from Coletivo_Disponivel cd
inner join SolucoesDigitais.Coletivo c on c.IdAtendimento = cd.IdAtendimento where c.DataInicio >= now() union
Select distinct ed.IdLocal from  ExecucaoKit_Disponivel ed 
inner join SolucoesDigitais.ExecucaoKit e 
on e.IdExecucaoKit = ed.IdExecucaoKit where e.DataInicio >= now());
`;

exports.sqlQtdEbookDisponivel = `
SELECT COUNT( DISTINCT sca.IdConteudoApoio ) as ebook
FROM SolucoesDigitais.ConteudoApoio sca
`;


exports.sqlDownloadAgrupados = `
Select dlma.IdLocal, Count(dlma.IdDownLoadMaterialApoio) as total, l.Descricao From DownLoadMaterialApoio dlma
Inner Join Local l On l.IdLocal = dlma.IdLocal
Where dlma.Excluido = 0 and dlma.Situacao = 1
Group By dlma.IdLocal
`;

exports.sqlIncluirCampanha = `
INSERT Campanha
(IdLocal, IdKit, Nome, Cor, Tag, Img, Situacao)
VALUES(?, ?, ?, ?, ?, ?, ?);`;

exports.sqlListarCampanha = `
SELECT 
  IdCampanha as idCampanha,
  Nome as nome,
  IdKit as codigoDoKit,
  Cor as cor, 
  Img as imgCard,
  Tag as tag,
  IdLocal as idLocal,
  Situacao as ativar
FROM Campanha 
WHERE IdLocal = ?
  AND Excluido = 0`;

exports.sqlConsultarCampanha = `
SELECT 
  IdCampanha as idCampanha,
  Nome as nome,
  IdKit as codigoDoKit,
  Cor as cor, 
  Img as imgCard,
  Tag as tag,
  IdLocal as idLocal,
  Situacao as ativar
FROM Campanha 
WHERE IdCampanha = ?`;

exports.sqlAtualizarCampanha = `
UPDATE Campanha SET
IdKit = ?, Nome = ?, Cor = ?, Tag = ?, Img = ?, Situacao = ? WHERE IdCampanha = ?;`;

exports.sqlPublicarCampanha = `
UPDATE Campanha SET Situacao = ? WHERE IdCampanha = ?;`;

exports.sqlExcluirCampanha = `
UPDATE Campanha SET Excluido = 1 WHERE IdCampanha = ?;`;

exports.sqlConsultarPorKitCampanha = `
SELECT 
  IdCampanha as idCampanha,
  Nome as nome,
  IdKit as codigoDoKit,
  Cor as cor, 
  Img as imgCard,
  Tag as tag,
  IdLocal as idLocal,
  Situacao as ativar
FROM Campanha 
WHERE IdKit = ?`;

exports.sqlListarCampanhaPorStatus = `
SELECT 
  IdCampanha as idCampanha,
  Nome as nome,
  IdKit as codigoDoKit,
  Cor as cor, 
  Img as imgCard,
  Tag as tag,
  IdLocal as idLocal,
  Situacao as ativar
FROM Campanha 
WHERE IdLocal = ?
  AND Situacao = 1`;

exports.sqlListarDisponibidadeColetivoProduto = `
Select 
b.IdAtendimento
, b.ExclusivoPJ
, b.Destaque
, b.Ordenacao
, 1 as Disponivel
, b.DivulgarMarketing
, c.*
, pp.ImagemGrande
, pp.ImagemMedia
, pp.ImagemPequena
, pp.Video
, pp.SituacaoVideo
From PaginaER.Coletivo_Disponivel as b
Inner join SolucoesDigitais.Coletivo as c On c.IdAtendimento = b.IdAtendimento
Left Join PaginaER.Produto_Personalizacao pp On pp.IdProduto = c.IdProduto
Where c.IdProduto = ? 
Order by Destaque desc,
CASE WHEN Ordenacao = 0 THEN 1 ELSE 0 END,
Ordenacao`;

exports.sqlListarColetivoPorProduto = `
    SELECT DISTINCT
    sdc.IdAtendimento,
    sdc.IdLocalAtendimento,
    sdc.IdLocalAtendimentoDivisao,
    sdc.IdProduto,
    sdc.DescrTituloProduto,
    sdc.DescrProduto,
    sdc.Preco,
    sdc.NrCargaHoraria,
    sdc.CEP,
    sdc.Logradouro,
    sdc.Numero,
    sdc.Complemento,
    sdc.Bairro,
    sdc.Cidade,
    sdc.UF,
    sdc.DataInicio,
    sdc.DataFim,
    sdc.Modalidade,
    sdc.Regional,
    sdc.IdInstrumento,
    sdc.IdAreaConhecimento,
    sdc.AreaConhecimento,
    pci.DescrComplementoTitulo,
    pci.InformacoesAdicionais,
    sdc.Certificado,
    pp.ImagemGrande,
    pp.ImagemMedia, 
    pp.ImagemPequena,
    pp.Video,
    pp.SituacaoVideo
  FROM SolucoesDigitais.Coletivo sdc
  LEFT JOIN PaginaER.Coletivo_InfoAdicionais pci ON sdc.IdAtendimento = pci.IdAtendimento
  LEFT JOIN PaginaER.Produto_Personalizacao pp ON pp.IdProduto = sdc.IdProduto
  WHERE sdc.IdProduto = ?
  ORDER BY sdc.IdAtendimento, sdc.DataInicio
`;

exports.sqlListarDisponibidadeExecucaoKitPorIdKit = `
  Select 
  dis.IdExecucaoKit as IdAtendimento
  , ExclusivoPJ
  , Destaque
  , Ordenacao
  , 1 as Disponivel
  , dis.DivulgarMarketing
  , kit.*
  , kp.ImagemGrande
  , kp.ImagemMedia
  , kp.ImagemPequena
  , kp.Video
  , kp.SituacaoVideo
  From PaginaER.ExecucaoKit_Disponivel as dis
  Inner join SolucoesDigitais.ExecucaoKit as kit On kit.IdExecucaoKit = dis.IdExecucaoKit
  Left Join PaginaER.Kit_Personalizacao kp On kp.IdKit = kit.IdKit
  Where kit.IdKit = ? Order by dis.Ordenacao
`;

exports.sqlListarExecucaoKitPorKit = `
  SELECT DISTINCT
    sdek.IdExecucaoKit,
    sdek.IdKit,
    sdek.NomeKit,
    sdek.DescrKit,
    sdek.Preco,
    sdek.NrCargaHoraria,
    sdek.CEP,
    sdek.Logradouro,
    sdek.Numero,
    sdek.Complemento,
    sdek.Bairro,
    sdek.Cidade,
    sdek.UF,
    sdek.DataInicio,
    sdek.DataFim,
    sdek.Modalidade,
    sdek.Regional,
    sdek.IdAreaConhecimento,
    sdek.AreaConhecimento,
    sdek.IdLocalAtendimento,
    sdek.IdLocalAtendimentoDivisao,
    sdek.IdAtendimento,
    peki.DescrComplementoTitulo,
    peki.InformacoesAdicionais,
    sdek.Certificado,
    kp.ImagemGrande,
    kp.ImagemMedia,
    kp.ImagemPequena,
    kp.Video,
    kp.SituacaoVideo
  FROM SolucoesDigitais.ExecucaoKit sdek
  LEFT JOIN PaginaER.ExecucaoKit_InfoAdicionais peki ON sdek.IdExecucaoKit = peki.IdExecucaoKit
  LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = sdek.IdKit
  WHERE sdek.IdKit = ?
  ORDER BY sdek.DataInicio
`

exports.listarKitsPersonalizados = `
  Select Distinct
  ep.*,
  kt.NomeKit as Titulo,
  kt.DescrKit as Descricao
  From PaginaER.Kit_Personalizacao as ep
  Inner Join SolucoesDigitais.Kit kt on kt.IdKit = ep.IdKit
`;

exports.consultaKitPersonalizado = `
  Select 
  Distinct
    kt.IdKit,
    ep.ImagemGrande,
    ep.ImagemMedia,
    ep.ImagemPequena,
    ep.Video,
    ep.SituacaoVideo,
    kt.NomeKit as Titulo,
    kt.DescrKit as Descricao
  From SolucoesDigitais.Kit kt
  Left Join PaginaER.Kit_Personalizacao as ep on ep.IdKit = kt.IdKit
  Where kt.IdKit = ?
`;

exports.inserirKitPersonalizado = `
  Insert Into 
   PaginaER.Kit_Personalizacao 
  (IdKit, ImagemGrande, ImagemMedia, ImagemPequena, Video, SituacaoVideo)
  Values (?, ?, ?, ?, ?, ?)
`;

exports.alterarKitPersonalizado = `
  Update 
   PaginaER.Kit_Personalizacao 
   Set ImagemGrande = ?, ImagemMedia = ?, ImagemPequena = ?, Video = ?, SituacaoVideo = ?
   Where IdKit = ?
`;

exports.listarColetivosPersonalizados = `
  Select Distinct
  ep.*,
  pd.DescrTituloProduto as Titulo,
  pd.DescrProduto as Descricao
  From PaginaER.Produto_Personalizacao as ep
  Inner Join SolucoesDigitais.Produto pd on pd.IdProduto = ep.IdProduto
`;

exports.consultaColetivoPersonalizado = `
  Select 
  Distinct
    pd.IdProduto,
    ep.ImagemGrande,
    ep.ImagemMedia,
    ep.ImagemPequena,
    ep.Video,
    ep.SituacaoVideo,
    pd.DescrTituloProduto as Titulo,
    pd.DescrProduto as Descricao
  From SolucoesDigitais.Produto pd
  Left Join PaginaER.Produto_Personalizacao as ep on ep.IdProduto = pd.IdProduto
  Where pd.IdProduto = ?
`;

exports.inserirColetivoPersonalizado = `
  Insert Into 
   PaginaER.Produto_Personalizacao 
  (IdProduto, ImagemGrande, ImagemMedia, ImagemPequena, Video, SituacaoVideo)
  Values (?, ?, ?, ?, ?, ?)
`;

exports.alterarColetivoPersonalizado = `
  Update 
   PaginaER.Produto_Personalizacao 
   Set ImagemGrande = ?, ImagemMedia = ?, ImagemPequena = ?, Video = ?, SituacaoVideo = ?
   Where IdProduto = ?
`;

exports.excluirColetivoPersonalizado = `
  Delete From 
   PaginaER.Produto_Personalizacao 
   Where IdProduto = ?
`;

exports.excluirKitPersonalizado = `
  Delete From 
   PaginaER.Kit_Personalizacao 
   Where IdKit = ?
`;

exports.excluirFaqProdutoPorIdFaq = `
  Delete From 
   PaginaER.Faq_Produto 
   Where IdFaqProduto = ?
`;

exports.excluirFaqKitPorIdFaq = `
  Delete From 
   PaginaER.Faq_Kit 
   Where IdFaqKit = ?
`;

exports.excluirFaqProdutoPorIdProduto = `
  Delete From 
   PaginaER.Faq_Produto 
   Where IdProduto = ?
`;

exports.excluirFaqKitPorIdKit = `
  Delete From 
   PaginaER.Faq_Kit 
   Where IdKit = ?
`;

exports.atualizarFaqProdutoIdFaq = `
  Update PaginaER.Faq_Produto
  set NrOrdenacao = ?,
  DsPergunta = ?,
  DsResposta = ?
  Where IdFaqProduto = ?
  AND IdProduto = ?
`;

exports.atualizarFaqKit = `
  Update PaginaER.Faq_Kit
  SET NrOrdenacao = ?,
  DsPergunta = ?,
  DsResposta = ?
  Where IdFaqKit = ?
  AND IdKit = ?
`;

exports.cadastrarFaqProduto = `
INSERT INTO PaginaER.Faq_Produto
( IdProduto,
  NrOrdenacao,
  DsPergunta,
  DsResposta)
VALUES
  (?, ?, ?, ?)
`;

exports.cadastrarFaqKit = `
INSERT INTO PaginaER.Faq_Kit
( IdKit,
  NrOrdenacao,
  DsPergunta,
  DsResposta)
VALUES
  (?, ?, ?, ?)
`;

exports.consultarFaqProdutoPorIdFaq = `
  SELECT 
    IdFaqProduto idFaqProduto,
    IdProduto idProduto,
    NrOrdenacao nrOrdenacao,
    DsPergunta dsPergunta,
    DsResposta dsResposta
FROM
    PaginaER.Faq_Produto 
   Where IdFaqProduto = ?
`;

exports.consultarFaqKitPorIdFaq = `
  SELECT 
    IdFaqKit idFaqKit,
    IdKit idKit,
    NrOrdenacao nrOrdenacao,
    DsPergunta dsPergunta,
    DsResposta dsResposta
FROM
    PaginaER.Faq_Kit 
   Where IdFaqKit = ?
`;

exports.consultarFaqPorIdKit = `
  SELECT 
    IdFaqKit idFaqKit,
    IdKit idKit,
    NrOrdenacao ordenacao,
    DsPergunta pergunta,
    DsResposta resposta
FROM
    PaginaER.Faq_Kit 
   Where IdKit = ?
   order by 3
`;

exports.consultarFaqPorIdProduto = `
  SELECT 
    IdFaqProduto idFaqProduto,
    IdProduto idProduto,
    NrOrdenacao ordenacao,
    DsPergunta pergunta,
    DsResposta resposta
FROM
    PaginaER.Faq_Produto 
   Where IdProduto = ?
   order by 3
`;