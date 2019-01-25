let url = "https://ireporter-version2.herokuapp.com/api/v2/interventions/";
let token = localStorage.getItem('token')
let jwt_token = "Bearer " + token

function hide_message() {
    let error_container = document.getElementById('errors')
    window.setTimeout(function () {
        if (error_container){
            error_container.innerHTML = ""
        }
    }, 2000)
}



function login_redirect(){
    window.setTimeout(function () {
        alert("Your session has expired press ok to login ")
        window.location.replace('./admin_login.html')

    }, 3000)
}
window.onload = ()=>{
    let incident_id = localStorage.getItem('incident_id')
    fetch(`${url}${incident_id}`,{
        method: 'GET',
        headers: {
    
            "Authorization": jwt_token
        }
        })
          .then((res)=> res.json())
          .then((data) =>{
            console.log(data.data[0].image)
            if ( data.msg == "Token has expired"){
                login_redirect()
            }
            else if(data.status == 200){
                
                file = document.getElementById('file')
                console.log(data.data[0].image)
                file.src = data.data[0].image
                document.getElementById('incident').innerHTML = data.data[0].type
                document.getElementById('comment').innerHTML= data.data[0].comment
                document.getElementById('date').innerHTML= data.data[0].createdon
                document.getElementById('status').innerHTML = data.data[0].status
                document.getElementById('location').innerHTML = data.data[0].location
                document.getElementById('owner').innerHTML = data.data[0].createdby
                document.getElementById('file').src = data.data[0].image
            }
        })

}

function updateStatus(){
    event.preventDefault();
    let incident_id = localStorage.getItem('incident_id')
    let raw_incident = document.getElementById("slct");
    let incident_status = raw_incident.options[raw_incident.selectedIndex].value;

    fetch(`${url}${incident_id}/status`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Accept": "aplication/json",
            "Authorization": jwt_token
        },

        body: JSON.stringify({
            status: incident_status
            
        })
    })
    .then((res) => res.json())
    .then((data)=> {
        console.log(data)
        if(data.status ==  200){
            let error_container = document.getElementById("errors")
            error_container.style.color = "green"
            error_container.innerHTML = data.message
            hide_message()
            window.setTimeout(function () {
                location.reload()
            }, 3000);
        }

        else{
            let error_container = document.getElementById("errors")
            error_container.innerHTML = data.message
            hide_message()
        }
    })
    .catch((e)=> console.log(e))
}