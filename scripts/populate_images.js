import db from '../server/db/models'
import { urls } from './results'

// JS implementation of Fisher-Yates Algo
function shuffle(array) {
  const copy = [];
  let length = array.length;
  let index;
  // While there remain elements to shuffle…
  while (length) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * length--);
    // And move it to the new array.
    copy.push(array.splice(index, 1)[0]);
  }
  return copy;
}

function run() {
  console.log('Getting Images')
  db.Image.findAndCountAll().then((result) => {
    console.log('Images count', result.count);
    if (result.count >= 100) {
      console.log('Images already updated. No need to migrate');
    } else {
      console.log('No image exists. Adding images');
      const ramdomizedUrls = shuffle(urls);
      for (const index in ramdomizedUrls) {
        db.Image.create({
          id: index,
          url: ramdomizedUrls[index],
          preCategory: null,
          preDescription: null,
        })
        .then((response) => {
          console.log('DB Response:', response.dataValues)
        })
        .catch((error) => {
          console.log('Failed! Error:', error)
        })
      }
      console.log('Total Update Count:', ramdomizedUrls.length)
    }
  });
}

run()
