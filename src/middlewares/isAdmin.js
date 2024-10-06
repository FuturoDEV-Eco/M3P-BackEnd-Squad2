function isAdminMiddleware(req, res, next) {
  if (req.admin) {
    next();
  } else {
    res.status(403).json({ mensagem: 'Acesso negado // Access denied' });
  }
}

module.exports = isAdminMiddleware;
