const dotenv = require('dotenv');
dotenv.config();

const templateRegister = (userName, userId) => {
  return `<h1> ${userName} Rolling goes to the mooon 🚀</h1>
  <p>Hacé click en el botón de abajo para activar tu cuenta de Rolling Code</p>
  <a href=${process.env.APP_BACK_URL}/user/active-account/${userId}>Activá tu cuenta</a>`
}

module.exports = {templateRegister}