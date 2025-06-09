module.exports = function (plop) {
  plop.setGenerator('use-case', {
    description: 'Cria um novo use case',
    prompts: [
      {
        type: 'input',
        name: 'namearquivo',
        message: 'informe o nome do arquivo:',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nome do use case (ex: createDemand):',
      },
      {
        type: 'input',
        name: 'metodo',
        message: 'Informe o metodo:',
      },
      {
        type: 'input',
        name: 'rota',
        message: 'Caminho da rota (ex: return-counting/register):'
      },
      {
        type: 'list',
        name: 'metodohttp',
        message: 'Método HTTP:',
        choices: ['get', 'post', 'put', 'delete']
      }
    ],
    actions: [
      
      //TESTES
      {
        type: 'add',
        path: 'src/data/usecases/db-{{kebabCase namearquivo}}.spec.ts',
        templateFile: 'plop-templates/testes/db-testes.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/presentation/controllers/{{kebabCase namearquivo}}-controller.spec.spec.ts',
        templateFile: 'plop-templates/testes/controller-teste.ts.hbs',
      },



      
      
      //USE CASE
      {
        type: 'add',
        path: 'src/domain/usecases/{{kebabCase namearquivo}}.ts',
        templateFile: 'plop-templates/use-case/useCase.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/domain/usecases/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './{{kebabCase namearquivo}}';\n$1`,
      },
      //REPOSITORY
      {
        type: 'add',
        path: 'src/data/protocols/{{kebabCase namearquivo}}.repository.ts',
        templateFile: 'plop-templates/use-case/repository.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/data/protocols/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './{{kebabCase namearquivo}}.repository';\n$1`,
      },
      //DB
      {
        type: 'add',
        path: 'src/data/useCases/db-{{kebabCase namearquivo}}.ts',
        templateFile: 'plop-templates/use-case/dbrepository.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/data/useCases/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './db-{{kebabCase namearquivo}}';\n$1`,
      },
      
      //CONTROLLER
      {
        type: 'add',
        path: 'src/presentation/controllers/{{kebabCase namearquivo}}-controller.ts',
        templateFile: 'plop-templates/use-case/controller.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/presentation/controllers/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './{{kebabCase namearquivo}}-controller';\n$1`,
      },
      //FACTORY USE CASE
      {
        type: 'add',
        path: 'src/main/factories/usecases/make-{{kebabCase namearquivo}}-usecase.ts',
        templateFile: 'plop-templates/use-case/factoryusecase.ts.hbs',
      },

      {
        type: 'modify',
        path: 'src/main/factories/usecases/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './make-{{kebabCase namearquivo}}-usecase';\n$1`,
      },


      //FACTORY CONTROLLER
      {
        type: 'add',
        path: 'src/main/factories/controllers/make-{{kebabCase namearquivo}}-controller.ts',
        templateFile: 'plop-templates/use-case/factorycontroller.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/main/factories/controllers/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './make-{{kebabCase namearquivo}}-controller';\n$1`,
      },
      //SCHEMA ZOD
      {
        type: 'add',
        path: 'src/validation/validators/{{kebabCase namearquivo}}.Schema.ts',
        templateFile: 'plop-templates/use-case/schema.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/validation/validators/index.ts',
        pattern: /(\/\/ ## USE CASE EXPORTS)/g,
        template: `export * from './{{kebabCase namearquivo}}.Schema';\n$1`,
      },

      // INFRA PRISMA
      {
        type: 'modify',
        path: 'src/infra/data/prisma/demand-prisma-repository.ts',
        pattern: /(\/\/ \[PLOP:INSERIR-METODO-AQUI\])/g,
        templateFile: 'plop-templates/use-case/prisma.ts.hbs',
      },

      //ROUTES

      {
        type: 'modify',
        path: 'src/main/routes/routes-demand.ts',
        pattern: /(\/\/ ## ADDROUTE)/g,
        templateFile: 'plop-templates/route/route.hbs'
      }
    ],
  });
};
