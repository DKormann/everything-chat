
const backend_url = "http://localhost:5000/"

function get_answer(messages){

    let res = new Promise((resolve, reject)=>{
        messages = messages.map(message=>{
            return {content:message.content, role:message.role}
        })

        fetch (backend_url + "answer", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({messages})
        }).then(response=>{
            console.log(response);
            response.text().then(text=>{
                console.log(text);
                resolve(text)
            })
        })
    })
    return res
}

