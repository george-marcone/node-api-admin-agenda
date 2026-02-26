
exports.sqlConsultarAcesso = `
Select  
DA.Login, 
DA.Senha, 
DP.Permissao 
From Acesso DA
inner join Digital.Permissao DP on DP.IdAcesso = DA.IdAcesso
Where DA.Situacao = 1
and DP.Situacao = 1
`

// RAE.FaixaCEP todos
exports.sqlConsultarLocais = `
SELECT 
IdLocal
FROM FaixaCEP `

// RAE.FaixaCEP Cep
exports.sqlConsultarLocaisPorCep = `
SELECT
  IdLocal as idLocal
FROM FaixaCEP 
  Where ? BETWEEN CEPde AND CEPate`;

exports.sqlConsultarConsultoria = `
Select 
IdProduto
, DescrTituloProduto
, DescrProduto
, Preco
, NrCargaHoraria
, CASE WHEN Modalidade = 'Remoto' THEN 'Online' ELSE Modalidade END AS Modalidade
, IdInstrumento
, IdAreaConhecimento
, AreaConhecimento
from SolucoesDigitais.Consultoria
where IdProduto = ?
`

exports.sqlConsultaMatApoioConsultoria = `
SELECT 
  ca.IdConteudoApoio as idConteudoApoio
, ca.Titulo as titulo
, ca.Descricao as descricao
, ca.URL as linkDownload
 FROM SolucoesDigitais.ConteudoApoio ca
 INNER JOIN SolucoesDigitais.Consultoria_ConteudoApoio cca
 ON ca.IdConteudoApoio = cca.IdConteudoApoio
 WHERE cca.IdProduto = ?
 `;

 exports.sqlRegistroDownload = `
 INSERT INTO SolucoesDigitais.DownLoadMaterialApoio
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
FROM SolucoesDigitais.DownLoadMaterialApoio
WHERE year(DataDownload) = year(sysdate())
AND CpfInteressado = ?
AND IdConteudoApoio = ?;`;

exports.sqlRetornaConsultoriaEditada = `
SELECT 
  c.IdProduto idProduto,
  c.DescrTituloProduto descrTituloProduto,
  c.DescrProduto descrProduto,
  c.Preco preco,
  c.NrCargaHoraria nrCargaHoraria,
  c.Modalidade modalidade,
  c.IdInstrumento idInstrumento,
  c.IdAreaConhecimento idAreaConhecimento,
  c.AreaConhecimento areaConhecimento,
  cd.IdLocal idLocal,
  cd.Destaque destaque,
  cd.Ordenacao ordenacao,
  cd.ExibirFormulario exibirFormulario,
  cd.DivulgarMarketing divulgarMarketing
FROM
  SolucoesDigitais.Consultoria c
Right JOIN
  PaginaER.Consultoria_Disponivel cd ON cd.IdConsultoria = c.IdProduto
Where cd.IdLocal = ?
AND cd.IdConsultoria = ?`;

exports.sqlListaEbook = `
  SELECT 
	  sca.IdConteudoApoio as idConteudoApoio,
    sca.Titulo as titulo,
    sca.Descricao as descricao,
    sca.URL as linkDownload,
    sca.IdAreaConhecimento as idAreaConhecimento,   
    sca.AreaConhecimento as areaConhecimento,
    'ebook' as tipo,
    false as exclusivoPJ, 
    0 as preco
  FROM SolucoesDigitais.ConteudoApoio sca
`;

exports.sqlConsultarEbook = `
SELECT 
	sca.IdConteudoApoio as idConteudoApoio,
	sca.Titulo as titulo,
	sca.Descricao as descricao,
	sca.URL as linkDownload,
	sca.IdAreaConhecimento as idAreaConhecimento,   
	sca.AreaConhecimento as areaConhecimento,
	'ebook' as tipo,
	false as exclusivoPJ, 
	0 as preco
FROM SolucoesDigitais.ConteudoApoio sca
WHERE IdConteudoApoio = ?
`;

exports.sqlConsultarProduto = `
SELECT p.IdProduto idProduto,
  p.DescrTituloProduto titulo,
  p.DescrProduto descricao,
  p.Preco preco,
  p.NrCargaHoraria cargaHoraria,
  p.IdInstrumento idInstrumento,
  p.IdAreaConhecimento idAreaConhecimento,
  p.AreaConhecimento areaConhecimento,
  p.Certificado certificado,
  pp.ImagemGrande as imagemGrande,
  pp.ImagemMedia as imagemMedia,
  pp.ImagemPequena as imagemPequena,
  pp.Video as video,
  pp.SituacaoVideo as situacaoVideo
FROM SolucoesDigitais.Produto p
LEFT JOIN PaginaER.Produto_Personalizacao pp ON pp.IdProduto = p.IdProduto
WHERE p.IdProduto = ?
`;

exports.sqlConsultarKit = `
SELECT kit.IdKit idKit,
  kit.NomeKit titulo,
  kit.DescrKit descricao,
  kit.Preco preco,
  kit.NrCargaHoraria cargaHoraria,
  kit.IdAreaConhecimento idAreaConhecimento,
  kit.AreaConhecimento areaConhecimento,
  kit.Certificado certificado,
  kp.ImagemGrande as imagemGrande,
  kp.ImagemMedia as imagemMedia,
  kp.Video as video,
  kp.SituacaoVideo as situacaoVideo,
  'curso' as tipo
FROM SolucoesDigitais.Kit kit
LEFT JOIN PaginaER.Kit_Personalizacao kp ON kp.IdKit = kit.IdKit
WHERE kit.IdKit = ?
`;