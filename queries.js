var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://liba:ufla@localhost:5432/liba';
var db = pgp(connectionString);

// add query functions

function getAllIndicadores(req, res, next) {
  db.any('select * from indics')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornado todos indicadores'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleIndicador(req, res, next) {
  var indId = parseInt(req.params.id);
  db.one('select * from indics where id = $1', indId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornado um indicador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createIndicador(req, res, next) {
  //req.body.age = parseInt(req.body.age);
  console.log("Pino %s %s \n", req.body.dataIntegracao, req.body.dataUltAlteracao);
  db.none('insert into indics(dataIntegracao, dataUltAlteracao, formulaCalculo, idDrgIntegracao, identDirecaoSeta, identPeriodicidade, identReferencial, informacoesAdicionais, nome, numDecimais, objetivo, unidade, usuarioUltAlteracao, versao)' +
      'values(${dataIntegracao}, ${dataUltAlteracao}, ${formulaCalculo}, ${idDrgIntegracao}, ${identDirecaoSeta}, ${identPeriodicidade}, ${identReferencial}, ${informacoesAdicionais}, ${nome}, ${numDecimais}, ${objetivo}, ${unidade}, ${usuarioUltAlteracao}, ${versao})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserido um indicador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateIndicador(req,res,next){
    db.none("update indics set dataIntegracao=${dataIntegracao},dataUltAlteracao=${dataUltAlteracao},formulaCalculo=${formulaCalculo},idDrgIntegracao=${idDrgIntegracao},identDirecaoSeta=${identDirecaoSeta},identPeriodicidade=${identPeriodicidade},identReferencial=${identReferencial},informacoesAdicionais=${informacoesAdicionais},nome=${nome},numDecimais=${numDecimais},objetivo=${objetivo},unidade=${unidade},usuarioUltAlteracao=${usuarioUltAlteracao},versao=${versao} where id = '"+req.params.id+"'",req.body)
    .then(()=>{
        res.status(200)
        .json({
            status:'success',
            message:'atualização successo'
        });
    })
    .catch((err)=>{
        return next(err);
    })
}

function removeIndicador(req, res, next) {
  var indId = parseInt(req.params.id);
  db.result('delete from indics where id = $1', indId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removido ${result.rowCount} indicador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = {
  getAllIndicadores: getAllIndicadores,
  getSingleIndicador: getSingleIndicador,
  createIndicador: createIndicador,
  updateIndicador: updateIndicador,
  removeIndicador: removeIndicador
};
