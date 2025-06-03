import { type Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeFinalizarProdutividadeController } from "../factories/controllers/finalizar-produtividade-controller-factory";
import { makeAAddAccountController } from "../factories/controllers/add-account-controller";
import { makeLoginController } from "../factories/controllers/login-controller-factory";
import { makeAddProdutividadeController } from "../factories/controllers/add-produtividade-controller-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/authMiddleware";
import { makeGetProdutividadeByCenterController } from "../factories/controllers/get-produtividade-by-center-controller-factory";
import { makeGetProdutividadeIntervalDatarController } from "../factories/controllers/get-produtividade-interval-data-controller-factory";
import { adaptRouteDownload } from "../adapters/express-route-adapter-download";
import { makeGetFuncionarioByIdController } from "../factories/controllers/get-funcionario-by-id";
import { makeGetProdutividadeByTransporteController } from "../factories/controllers/get-produtividade-by-transporte";
import { makeCriarFuncionarioController } from "../factories/controllers/criar-funcionario-controller";
import { makeGetFuncionariosController } from "../factories/controllers/get-funcionarios-controller-factory";
import { makeAddPPausarodutividadeController } from "../factories/controllers/add-pausa-controller-factory";
import { makeGetProdutividadeIntervalDataAllRegionController } from "../factories/controllers/get-produtividade-interval-data-controller-factory-all-region";


export default (router: Router): void => {
  router.post('/signup',adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAAddAccountController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.put('/finalizardemanda/:processo/:palletId/:transporte', adaptRoute(makeFinalizarProdutividadeController()))
  router.post('/addprodutividade/:centerId', adaptMiddleware(makeAuthMiddleware()) ,adaptRoute(makeAddProdutividadeController()))
  router.get('/listarprodutibidade/:centerId/:data/:processo', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetProdutividadeByCenterController()))
  router.get('/gerarrelatorio/:centerId/:dataInicio/:dataFim', adaptMiddleware(makeAuthMiddleware()), adaptRouteDownload(makeGetProdutividadeIntervalDatarController()))
  router.get('/relatoriotodasunidades/:dataInicio/:dataFim', adaptRoute(makeGetProdutividadeIntervalDataAllRegionController()))
  router.get('/buscarfuncionario/:centerId/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetFuncionarioByIdController()))
  router.get('/buscardemanda/:processo/:palletId/:transporte', adaptRoute(makeGetProdutividadeByTransporteController()))
  router.post('/criarfuncionario', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCriarFuncionarioController()))
  router.get('/buscarfuncionarios/:centerId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetFuncionariosController()))
   router.put('/adicionarpausa/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddPPausarodutividadeController()))
  // ## ADDROUTE
};
