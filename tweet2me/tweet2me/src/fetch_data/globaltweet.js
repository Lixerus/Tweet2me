const fetchdata = (method, url, data=null, headers=null) => {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'

        xhr.withCredentials = true

        if (headers !== null){
            for(let key in headers){
                xhr.setRequestHeader(key, headers[key])}
        }

        xhr.onload = () => {
            console.log(xhr.response)
            if (xhr.status < 400){
                resolve(xhr)
            }
            reject(xhr.response)
        }
        xhr.onerror = () => reject(xhr.response)

        if (data !== null)
            xhr.send(JSON.stringify(data))
        else
            xhr.send()
    })
}


export default fetchdata