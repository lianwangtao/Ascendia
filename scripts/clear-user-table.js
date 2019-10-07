import db from '../server/db/models'

function run() {
  console.log('Clearing user table')
  db.User.destroy({ where: {}, truncate: true });
}
run()
