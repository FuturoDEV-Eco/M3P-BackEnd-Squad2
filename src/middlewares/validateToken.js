const { verify } = require('jsonwebtoken');

function validateToken(request, response, next) {
  try {
    const token = request.cookies.destinoCertoToken;

    if (!token) {
      return response.status(401).json({
        mensagem: 'Seu token é obrigatório // Your token is required',
      });
    }

    const result = verify(token, process.env.JWT_SECRET);
    request.userId = result.id;
    request.isAdmin = result.isAdmin;

    next();
  } catch (error) {
    console.log('Token validation error:', error);
    if (error.name === 'TokenExpiredError') {
      response
        .status(401)
        .json({ mensagem: 'O Token expirou // The token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      response
        .status(401)
        .json({ mensagem: 'O Token é inválido // The token is invalid' });
    } else {
      response
        .status(500)
        .json({ mensagem: 'Falha na requisição // Request failed' });
    }
  }
}

module.exports = validateToken;
