'use strict';
const amei = require('./amei');

exports.authorize = async (req, res, next) => {
    if (amei.habilitado()) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        let token = authHeader && authHeader.split(' ')[1];  
        
        if (!token) {
            token = req.originalUrl.split('download=')[1]            
        }

        const tokenCoringa = authHeader && authHeader.split(' ')[2] || req.originalUrl.split('download=')[1];                
        const tokenExterno = req.body.token

        if (!token && !tokenCoringa && !tokenExterno) {
            res.status(401).json({ message: 'Acesso Restrito'});
        } else {
            
            if (token || tokenCoringa) { 
                if (!await amei.validarToken(token)) {            
                    if (!tokenCoringa)
                        res.status(401).json({ message: 'Token inválido' });
                    else next();
                }
                else next();
            }
            else
            // Cliente vindo do Agenda de Cursos
            if (!await amei.validarTokenExterno(req.body.token)) {
                res.status(401).json({ message: 'Token inválido' });
            }
            else next();            
        }
    }
        else next();
};

