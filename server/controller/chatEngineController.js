const axios = require('axios')

class ChatEngineController {
  static getUserChatEngine(req, res, next) {
    axios({
      method: 'get',
      url: 'https://api.chatengine.io/users/',
      headers: { 
        'PRIVATE-KEY': '93a6043a-5d0f-4587-bbd7-957fe1885986'
      }
    })
    .then(({ data }) => {
      const user = data.map(e => e.username)
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error, 'error chatengine di model user');
      next(error)
    })
  }
}


module.exports = ChatEngineController