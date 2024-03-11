let server = "http://localhost:8000";

async function postServiceData(method, params) {
    const response = await fetch(server + "/" + method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    const data = await response.json();
    return Promise.resolve(data);

    /*
    return fetch(server + "/" + method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => {
        console.log(response);
        response.json()
        .then((data) => {
            console.log("data in postService" + data);
            return Promise.resolve(data);
        })
        .catch (error => {
            console.log(error);
            return error;
        })
    });*/
    
}
export {postServiceData}