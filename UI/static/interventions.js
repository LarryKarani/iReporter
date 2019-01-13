let url = "https://ireporter-version2.herokuapp.com/api/v2/interventions/";
let token = localStorage.getItem('token')
let jwt_token = "Bearer " + token


function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el); 
}

let table_data = document.getElementById("incident_stats").getElementsByTagName('tbody')[0];


// check if the token exists
if(token == null){
    alert('You are not logged in. Press ok to login');
    window.location.replace("./user_login.html");

}

function login_redirect(){
    window.setTimeout(function () {
        alert("Your session has expired press ok to login ")
        window.location.replace('./user_login.html')

    }, 3000)
}
window.onload = function red_flags(){

fetch(url,{
    method: 'GET',
    headers: {

        "Authorization": jwt_token
    }
    })
      .then((res)=> res.json())
      .then((data) =>{
        if ( data.msg == "Token has expired"){
            login_redirect()
        }
        

        else{
            let incidents = data.data
            return incidents.forEach(incident => {

                if(incident.type == "intervention" || incident.type == "Intervention"){
                
                let newRow = table_data.insertRow(table_data.length);
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = incident.id
                cell1 = newRow.insertCell(1)
                cell1.innerHTML = incident.createdon
                cell2 = newRow.insertCell(2)
                cell2.innerHTML = incident.comment
                cell3 = newRow.insertCell(3)
                cell3.innerHTML = incident.type
                cell4= newRow.insertCell(4)
                cell4.innerHTML = incident.status
                cell5 = newRow.insertCell(5)
                cell5.innerHTML = incident.location
                cell5 = newRow.insertCell(6)        
                cell5.innerHTML = '<button id="edit" onclick="view()">View</button>'

                }
                                   
                })
        }
       })
       .catch((e)=> console.log(e))
    }