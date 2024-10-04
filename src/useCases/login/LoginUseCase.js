const User = require('../../models/User');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class LoginUseCase {
  async execute(data) {
    if (!data.email || !data.password) {
      throw {
        status: 400,
        message:
          'E-mail e senha são obrigatórios // Email and password are required',
      };
    }

    try {
      const user = await User.findOne({
        where: { email: data.email },
      });

      if (!user) {
        throw {
          status: 404,
          message: 'Usuário não encontrado // User not found',
        };
      }

      const passwordOk = await compare(data.password, user.password);

      if (!passwordOk) {
        throw {
          status: 401,
          message:
            'A senha ou o e-mail estão incorretos // The password or email is incorrect',
        };
      }

      console.log({
        id: user.id,
        name: user.name,
        accent: user.accent, // Verifique o valor de accent
        admin: user.admin, // Verifique o valor de admin
      });
      //Paiload
      const token = sign(
        {
          id: user.id,
          name: user.name,
          accent: user.accent,
          admin: user.admin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
      );

      return {
        token,
        id: user.id,
        name: user.name,
        accent: user.accent,
        admin: user.admin,
      };
    } catch (error) {
      throw {
        status: 500,
        message: 'Erro interno do servidor // Internal Server Error',
      };
    }
  }
}

module.exports = LoginUseCase;
