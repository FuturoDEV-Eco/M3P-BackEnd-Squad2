const LoginUseCase = require('../useCases/login/LoginUseCase');

class LoginController {
  async login(request, response) {
    const data = request.body;
    const loginUseCase = new LoginUseCase();

    try {
      const result = await loginUseCase.execute(data);

      return response.json({
        token: result.token,
        user: {
          id: result.id,
          name: result.name,
          accent: result.accent,
          admin: result.admin,
        },
      });
    } catch (error) {
      console.error('Error in LoginController:', error);
      const status = error.status || 500;
      const message =
        error.message || 'Erro interno do servidor // Internal Server Error';
      return response.status(status).json({ mensagem: message });
    }
  }
}

module.exports = new LoginController();
