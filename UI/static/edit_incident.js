var url = 'https://ireporter-version2.herokuapp.com/api/v2/interventions/'
const token = localStorage.getItem('token')
const jwt_token = "Bearer " + token
// sets the variables to facilitate edit

if (token === null) {
    window.location.replace('user_login.html')
}

function hide_message() {
    let error_container = document.getElementById('errors')
    window.setTimeout(function () {
        if (error_container){
            error_container.innerHTML = ""
        }
    }, 2000)
}

function login_redirect() {
    window.setTimeout(function () {
        window.location.replace('user_login.html')
    }, 3000)
}


function load_data() {
    // check if thereis data to update
    if (localStorage.getItem('comment') == null){
        window.location.replace('user_profile.html')
    }
    document.getElementById('incident_type').value = localStorage.getItem('incident_type')
    document.getElementById('text-inp').innerHTML = localStorage.getItem('comment')
}

function clearData() {
    localStorage.removeItem('comment')
    localStorage.removeItem('incident_id')
    localStorage.removeItem('incident_type')

}

function editComment() {
    event.preventDefault();
    let incident_type = localStorage.getItem('incident_type')
    let incident_id = localStorage.getItem('incident_id')
    let comment = document.getElementById('text-inp').value;
    
    fetch(`${url}${incident_id}/comment`, {
        method: 'PATCH',
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": jwt_token
        },

        body: JSON.stringify(
            {
                comment: comment
            })
    })

    .then((res) => res.json())
    .then((data) => {
        if (data.status == 200){
            let error_container = document.getElementById('errors')
            if(error_container) {
                error_container.style.color = "green"
                error_container.innerHTML = data.message
                hide_message()
                
                
            }
        }
        else if (data.msg == "Token has expired"){
            let error_container = document.getElementById('errors')
            if (error_container){
                alert('Your session has expired, press ok to login')
                login_redirect()
            }
        }

        else {
            let error_container = document.getElementById('errors')
            if (error_container) {
                error_container.innerHTML = data.message
            }
        }
    })
    .catch((e)=> console.log(e))

}
// update location

function hide_location_message() {
    let error_container = document.getElementById('errors')
    window.setTimeout(function () {
        if(error_container){
            error_container.innerHTML = ""
        }
    }, 2000)
}

function editLocation() {
    event.preventDefault();

    let incident_id = localStorage.getItem('incident_id')
    let location = document.getElementById('location').value;

    fetch(`${url}${incident_id}/location`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": jwt_token
        },
        body: JSON.stringify({
            location: location
        })
    })
    .then((res)=> res.json())
    //.then((data)=> console.log(data))
    .then((data) => {
        if (data.status == 200){
            let error_container = document.getElementById('errors')
            if(error_container) {
                error_container.style.color = "green"
                error_container.innerHTML = data.message
                hide_message()
                
                
            }
        }
        else if (data.msg == "Token has expired"){
            let error_container = document.getElementById('errors')
            if (error_container){
                alert('Your session has expired, press ok to login')
                login_redirect()
            }
        }

        else {
            let error_container = document.getElementById('errors')
            if (error_container) {
                error_container.innerHTML = data.message
            }
        }
        })
        .catch((e) => console.log(e))
    
}