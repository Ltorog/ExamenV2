const db = require('../models');
const reggresion = require('regression')

//Funcion busqueda de rut

function regression(req, res) {
    //inicializan variables
    const param=req.body;
    var rut = req.param.rut;
    var apiKey = req.header('apikey')

    //Se normaliza rut, sin puntos ni digito verificador
    rut = rut.replace(/\./g, '');
    rut = rut.replace(/\-/g, '');
    rut = rut.substring(0,rut.length -1);  

    sequelize.query(`SELECT promedio, stddev, year, birthdate, lastName,
    gender , rut, apiKey 
    FROM (SELECT ROUND(AVG(finished_courses.grade),2)  AS promedio, round(coalesce(stddev_samp(finished_courses.grade),0),3) AS stddev, courses.year AS year, students.last_name AS lastName,
	 (CASE WHEN students.gender=0 then 'FEMENINO' else 'MASCULINO' END ) AS gender, students.rut AS rut, students.birthdate AS birthdate, tokens.api_key AS apiKey
    FROM students AS students INNER JOIN finished_courses AS finished_courses on students.pk = finished_courses.student_fk INNER JOIN courses AS courses on finished_courses.course_fk = courses.pk INNER JOIN tokens tokens
	 on tokens.rut = students.rut
    where students.rut=${rut}
    group by courses.year, students.last_name, students.gender, students.rut, students.birthdate, tokens.apiKey) AS dato
    group by dato.promedio, dato.stddev, dato.firstName, dato.year, dato.birthdate, dato.rut, dato.lastName, dato.gender, dato.apiKey
    order by year desc
`, { type: Sequelize.QueryTypes.SELECT })

    .then(student=>{
        //Si no existe el rut, se entrega mensaje correspondiente
        if(student==''){
            res.status(400).send({message: "El rut no corresponde"})
        }
        else{
            //Si existe, se separan los datos recolectados de la BD
            if(apiKey==student[0].apikey){
                var regresion=[]
                var jsonData = {data:[]}

                //Se insertan los datos segun perfil de año, el promedio y desviación correspondiente
                for(var i in student){
                    aux1.push(parseInt(student[i].year))
                    aux1.push(parseFloat(student[i].promedio))
                    query.push(aux1)
                    jsonData.data.push({
                        "year": parseInt(student[i].year),
                        "average": parseFloat(student[i].promedio),
                        "stddev": parseFloat(student[i].stddev)
                    })
                }
            
            //Mediante la función regression se realizan los calculos automáticos
            const resultado = regression.linear(query);

            //Pendiente
            jsonData["m"] = resultado.equation[0];

            //interseccion
            jsonData["n"] = resultado.equation[1]

            //interseccion
            jsonData["r2"] = parseFloat(resultado.r2);
            
            //Ecuacion de la regresion
            jsonData["equation"] = resultado.string
            
            //Se entrega por consola el resultado
            console.log(resultado);

            //Se envía el json correspondiente
            res.status(200).send(
                jsonData
            )}

            else{
                //Si no se completa ninguna operacion, es debido a que la página no fue encontrada
                res.status(404).send({message: "Pagina no encontrada o error de login"})
            }
        }
    })
    res.status(200).send({message: "all right"});
    db.sequelize.query(`SELECT * FROM students LIMIT 3`, { type: db.Sequelize.QueryTypes.SELECT })
    .then(student => {
        console.log(student);
    });
}

// Exportando las funciones para que se puedan ver
// desde los modulos que llaman a los controladores.
// Si las funciones no estan dentro de este objeto entonces no son
// visibles para quien use los controladores.
module.exports = {
    regression: regression
}