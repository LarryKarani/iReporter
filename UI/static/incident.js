const url = "https://ireporter-version2.herokuapp.com/api/v2/interventions"

const token = localStorage.getItem('token')
const jwt_token = "Bearer " + token
console.log(token);
// check if token exists
if (token === null){
    alert('you are not looged in press okey to login')
    window.location.replace("user_login.html");
}

function hide_message(){
    let error_container = document.getElementById('errors')
    window.setTimeout(function (){
        if (error_container){
            error_container.innerHTML = ""
        }
    }, 3000)
}

function login_redirect(){
    window.setTimeout(function () {
        window.location.replace('./user_login.html')

    }, 3000)
}
function create_incident(){
    event.preventDefault();
    let formdata = new FormData();
    let raw_incident = document.getElementById("incident");
    let incident_type = raw_incident.options[raw_incident.selectedIndex].value;
    let comment = document.getElementById("text-inp").value;
    let coordinates = document.getElementById("cordinates").innerText;
    let image = document.getElementById('image').files[0]
    
    formdata.append( "incidence_type", incident_type);
    formdata.append( "location", coordinates);
    formdata.append( "comment", comment);
    formdata.append( "file", image);



    
    console.log(image)

    fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": jwt_token
        },

        body: formdata
    })
    .then((res) => res.json())

    .then((data) => {

        if(data.status == 201 ){
            let error_container = document.getElementById('errors')
            if(error_container){
                document.getElementById('errors').style.color="white";
                error_container.innerHTML = data.data[0].message
                hide_message()
                //refresh the form
                document.getElementById('incidentForm').reset();
            }
               
        }
        else if ( data.msg == "Token has expired"){
            let error_container = document.getElementById('errors')
            if (error_container){
                error_container.innerHTML = 'Your session has expired, redirecting to login'
                login_redirect()
            }
        }
        else{
            let error_container = document.getElementById('errors')
            if (error_container){
                error_container.innerHTML = data.message
            }

        }
    })
    .catch((e) => console.log(e))
}

module.exports = create_incident