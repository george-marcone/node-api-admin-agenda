const winston = require('winston');

// Defina o nível mínimo de logs que você deseja registrar
const level = 'info';

// Função para obter o nome do arquivo de log com base na data atual
function getLogFileName() {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);
  return `logs/application-${formattedDate}.log`;
}

// Crie uma instância do logger do Winston
const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
    winston.format.json() // Define o formato dos logs (JSON neste exemplo)
  ),
  transports: [
    // Adicione os transportes (destinos) para os logs
    new winston.transports.Console(), // Exibe os logs no console
    new winston.transports.File({ filename: getLogFileName() }) // Salva os logs em um arquivo
  ]
});

// Atualiza o nome do arquivo de log a cada novo log
logger.on('data', (log) => {
  const logFileName = getLogFileName();
  if (logger.transports[1].filename !== logFileName) {
    logger.transports[1].filename = logFileName;
    logger.transports[1].open();
  }
});

module.exports = logger;