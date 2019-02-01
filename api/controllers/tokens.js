// const jwt = require('../jwt');

const db = require('../models');
const Students = db.students;
const Tokens = db.tokens;
const jwt = require('jwt-simple');
const crypto = require('crypto');
const keyword = 'xxxx';

//Funcion de password
function password(text){

    //Uso de crypto, para usar sus parametros en la autentificacion 
    const hash = crypto.createHash('sha512');
    const data = hash.update(text,keyword);
    const hashFin = data.digest('hex');
    return hashFin;
}

//Se realiza la autenticacion mediante jwt simple
function authenticate(req, res) {

    // Inicialización
    const params = req.body;
    const rut = params.rut;
    const pass = params.pass;
    const hashOld = password(password);
    sequelize.query(`SELECT rut, role, "apikey" FROM tokens WHERE password = '${hashOld}' and rut='${rut} `
    , { type: Sequelize.QueryTypes.SELECT })
    .then(token => {

        //Si el rut no aparece en el registro se envia mensaje
        if(token ==''){
            res.status(400).send({message: "Rut no se encuentra registrado"})
        }
        else{

            //Si se logra autenticar se envia codigo 200 y se crea un token
            if(params.gethash){
                res.status(200).send({
                    token: jwt.createToken(token)
                });
            }

            //sino el token ya esta y solamente se envia
            else{
                res.status(200).send(token);
            }
        }
    })
    
    //Si no hay respuesta del servidor se envia codigo 500
    .catch(err => {
        res.status(500).send({err});
    });

    // consultar base de datos
    // Consulta la base de datos con QUERY tipo RAW
    db.sequelize.query(`SELECT * FROM tokens LIMIT 3`, { type: db.Sequelize.QueryTypes.SELECT })
    .then(console.log);
}
    
module.exports = {
    authenticate
}