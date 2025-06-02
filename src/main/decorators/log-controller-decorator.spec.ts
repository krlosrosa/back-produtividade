import { Controller, HttpResponse } from "@/presentation/protocols";
import { LoggerProtocol } from "@/infra/observability/protocols/logger.protocol";
import { LogControllerDecorator } from "./log-controller-decorator";

// Mocks
class ControllerStub implements Controller {
  constructor(
    public readonly response: HttpResponse = {
      statusCode: 200,
      body: { data: "any_data" },
    }
  ) {}

  async handle(): Promise<HttpResponse> {
    return this.response;
  }
}

class LoggerStub implements LoggerProtocol {
  public infoMessages: { message: string; args: unknown[] }[] = [];
  public warnMessages: { message: string; args: unknown[] }[] = [];
  public errorMessages: { message: string; args: unknown[] }[] = [];
  public debugMessages: { message: string; args: unknown[] }[] = [];

  info(message: string, ...args: unknown[]): void {
    this.infoMessages.push({ message, args });
  }

  warn(message: string, ...args: unknown[]): void {
    this.warnMessages.push({ message, args });
  }

  error(message: string, ...args: unknown[]): void {
    this.errorMessages.push({ message, args });
  }

  debug(message: string, ...args: unknown[]): void {
    this.debugMessages.push({ message, args });
  }
}

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: ControllerStub;
  loggerStub: LoggerStub;
}

const makeSut = (statusCode = 200): SutTypes => {
  const controllerStub = new ControllerStub({
    statusCode,
    body:
      statusCode === 500
        ? { error: "server_error", stack: "any_stack" }
        : { data: "any_data" },
  });
  const loggerStub = new LoggerStub();
  const sut = new LogControllerDecorator(controllerStub, loggerStub);
  return { sut, controllerStub, loggerStub };
};

const makeRequest = () => ({
  body: { test: "test_body" },
  url: "/test-url",
  method: "GET",
});

describe("LogControllerDecorator", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("deve chamar o método handle do controller com os parâmetros corretos", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    const request = makeRequest();
    await sut.handle(request);
    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  test("deve retornar a mesma resposta do controller", async () => {
    const { sut, controllerStub } = makeSut();
    const request = makeRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(controllerStub.response);
  });

  test("deve registrar um log de info para requisições bem-sucedidas", async () => {
    const { sut, loggerStub, controllerStub } = makeSut(200);
    const request = makeRequest();

    // Simular passagem de tempo para testar duração
    jest
      .spyOn(Date, "now")
      .mockReturnValueOnce(1000) // startTime
      .mockReturnValueOnce(1150); // endTime (150ms de duração)

    await sut.handle(request);

    expect(loggerStub.infoMessages.length).toBe(1);
    expect(loggerStub.infoMessages[0].message).toContain(
      "Requisição bem-sucedida"
    );
    expect(loggerStub.infoMessages[0].message).toContain("200");
    expect(loggerStub.infoMessages[0].message).toContain("150ms");
    expect(loggerStub.infoMessages[0].message).toContain(
      controllerStub.constructor.name
    );
    expect(loggerStub.infoMessages[0].args[0]).toEqual({
      path: request.url,
      method: request.method,
    });
  });

  test("deve registrar um log de warn para erros de cliente (4xx)", async () => {
    const { sut, loggerStub, controllerStub } = makeSut(400);
    const request = makeRequest();

    jest.spyOn(Date, "now").mockReturnValueOnce(1000).mockReturnValueOnce(1200);

    await sut.handle(request);

    expect(loggerStub.warnMessages.length).toBe(1);
    expect(loggerStub.warnMessages[0].message).toContain(
      "Erro de requisição do cliente"
    );
    expect(loggerStub.warnMessages[0].message).toContain("400");
    expect(loggerStub.warnMessages[0].message).toContain("200ms");
    expect(loggerStub.warnMessages[0].message).toContain(
      controllerStub.constructor.name
    );
    expect(loggerStub.warnMessages[0].args[0]).toMatchObject({
      error: { data: "any_data" },
      path: request.url,
      method: request.method,
    });
  });

  test("deve registrar um log de erro para erros de servidor (5xx)", async () => {
    const { sut, loggerStub, controllerStub } = makeSut(500);
    const request = makeRequest();

    jest.spyOn(Date, "now").mockReturnValueOnce(1000).mockReturnValueOnce(1300);

    await sut.handle(request);

    expect(loggerStub.errorMessages.length).toBe(1);
    expect(loggerStub.errorMessages[0].message).toContain(
      "Erro interno no servidor"
    );
    expect(loggerStub.errorMessages[0].message).toContain("500");
    expect(loggerStub.errorMessages[0].message).toContain("300ms");
    expect(loggerStub.errorMessages[0].message).toContain(
      controllerStub.constructor.name
    );
    expect(loggerStub.errorMessages[0].args[0]).toMatchObject({
      error: "any_stack",
      path: request.url,
      method: request.method,
    });
  });

  test("deve capturar e registrar exceções não tratadas", async () => {
    const { sut, controllerStub, loggerStub } = makeSut();
    const request = makeRequest();
    const error = new Error("controller_error");
    error.stack = "any_stack";

    jest.spyOn(controllerStub, "handle").mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(loggerStub.errorMessages.length).toBe(1);
    expect(loggerStub.errorMessages[0].message).toBe(
      "Exceção não tratada no controller"
    );
    expect(loggerStub.errorMessages[0].args[0]).toMatchObject({
      error: error.stack,
      path: request.url,
      method: request.method,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toMatchObject({
      error: "Erro interno no servidor",
      stack: error.stack,
    });
  });

  test("deve capturar e registrar exceções que não são instâncias de Error", async () => {
    const { sut, controllerStub, loggerStub } = makeSut();
    const request = makeRequest();
    const errorObject = { message: "Erro customizado" };

    jest.spyOn(controllerStub, "handle").mockRejectedValueOnce(errorObject);

    const response = await sut.handle(request);

    expect(loggerStub.errorMessages.length).toBe(1);
    expect(loggerStub.errorMessages[0].args[0]).toMatchObject({
      error: errorObject,
      path: request.url,
      method: request.method,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toMatchObject({
      error: "Erro interno no servidor",
      stack: String(errorObject),
    });
  });
});
