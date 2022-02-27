import fs from 'fs'

function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

getFile('./files/1.txt')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err.message)
  })
