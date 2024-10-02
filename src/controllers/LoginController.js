const LoginUseCase = require('../useCases/login/LoginUseCase');

class LoginController {
  async login(request, response) {
    const data = request.body;
    const loginUseCase = new LoginUseCase();

    try {
      const result = await loginUseCase.execute(data);

      // Configurar o cookie com HttpOnly e Secure
      response.cookie('destinoCertoToken', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true em produção
        maxAge: 24 * 60 * 60 * 1000, // 1 dia de validade
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        // Não defina o atributo 'domain' mas verificar se vai ser necessário no deploy
      });

      // Retornar os dados do usuário sem o token
      // o toquem possui os dados de usário, mas não para uso no frontend por segurança
      // os dados do usuário ficarãop no UserContext do frontend
      const { token, ...userData } = result;
      return response.json(userData);
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
