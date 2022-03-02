//* Simulate API Call
export const fetchData = async (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve(data)}, Math.random() * 1500)
    })
}
