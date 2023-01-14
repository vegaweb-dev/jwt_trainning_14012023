const app = require('./app');
require('./database');

async function init() {
  await app.listen(3000);
  console.log('Server Running On Port 3000');
}

init();
