const User = require('../../models/User');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class LoginUseCase {
  async execute(data) {
    if (!data.email || !data.password) {
      console.error('Validation Error: Email and password are required');
      throw {
        status: 400,
        message:
          'E-mail e senha são obrigatórios // Email and password are required',
      };
    }

    try {
      const user = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        console.error('User Not Found:', data.email);
        throw {
          status: 404,
          message: 'Usuário não encontrado // User not found',
        };
      }

      const passwordOk = await compare(data.password, user.password);

      if (!passwordOk) {
        console.error('Incorrect Password for email:', data.email);
        throw {
          status: 401,
          message:
            'A senha ou o e-mail estão incorretos // The password or email is incorrect',
        };
      }

      const token = sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
      );

      return {
        token: token,
        id: user.id,
        name: user.name,
        accent: user.accent,
        isAdmin: user.admin,
      };
    } catch (error) {
      console.error('Error in LoginUseCase:', error);
      if (error.status && error.message) {
        throw error; // Re-lança erros conhecidos
      } else {
        throw {
          status: 500,
          message: 'Erro interno do servidor // Internal Server Error',
        };
      }
    }
  }
}

module.exports = LoginUseCase;
