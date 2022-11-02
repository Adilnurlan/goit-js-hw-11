// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

console.log('working!!!')

const foo = async () => {
    const fetchqew = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await fetchqew.json()
    return data
}

const showFive = (value) => {
    console.log(value)
}


foo().then(() => {
    return 555
}).then(showFive)

foo().then(() => {
    return 555
}).then((data) => {
    return 1234
})


