setTimeout(() => {
  console.log('A')
})

new Promise((resolve) => {
  console.log('B')
  return resolve()
}).then(() => console.log('C'))

console.log('D')
