import db from '../server/db/models'

function run() {
  console.log('Getting Categories')
  const categories = [
    'Chemical Formulas',
    'Math Equations and Formulas',
    'Diagrams and Charts',
    'Maps',
    'Word Art(titles/headlines)',
    'Photograph',
    'Drawings/Paintings',
    'Tables',
    'Other',
  ]

  db.Category.findAndCountAll().then((result) => {
    console.log('Category Count: ', result.count);   
    if (result.count >= 9) {
      console.log('Category is up to date. No need to migrate');
    } else {
      for (const index in categories) {
        console.log('Adding Category:', categories[index])
        db.Category.create({
          value: categories[index],
          id: index,
        })
          .then((response) => {
            console.log('DB Response:', response.dataValues)
          })
          .catch((error) => {
            console.log('Failed! Error:', error)
          })
      }
    }
  })
}

run()
