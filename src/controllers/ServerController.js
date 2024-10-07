class ServerController {
  static status(req, res) {
    res.status(200).json({ status: 'Server is running' });
  }
}

module.exports = ServerController;
