let url = "https://ireporter-version2.herokuapp.com/api/v2/interventions/user";
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
window.onload = function incidents_report(){

fetch(url,{
    method: 'GET',
    headers: {

        "Authorization": jwt_token
    }
    })
      .then((res)=> res.json())
      .then((data) =>{
       console.log(data.data)
        if ( data.msg == "Token has expired"){
            login_redirect()
        }
        

        else{
            let incidents = data.data
            let draft = 0
            let resolved = 0
            let pending = 0
            let rejected = 0
    
            return incidents.forEach(incident => {

                
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
                                  
                cell5.innerHTML = '<button id="edit" onclick="editIncident()">Edit</button><button id="delete" onclick="delete()">Delete</button>'
                                   
                if(incident.status == 'Draft'){
                    draft++;
                    document.getElementById('draft').innerHTML= draft;
                    document.getElementById('resolved').innerHTML= resolved;
                    document.getElementById('pending').innerHTML= pending;
                    document.getElementById('rejected').innerHTML= rejected;
                    
                }
                else if(incident.status == 'resolved'){
                    resolved++;
                    document.getElementById('draft').innerHTML= draft;
                    document.getElementById('resolved').innerHTML= resolved;
                    document.getElementById('pending').innerHTML= pending;
                    document.getElementById('rejected').innerHTML= rejected;

                }
                else if (incident.status == 'under_investigation'){
                    pending++
                    document.getElementById('draft').innerHTML= draft;
                    document.getElementById('resolved').innerHTML= resolved;
                    document.getElementById('pending').innerHTML= pending;
                    document.getElementById('rejected').innerHTML= rejected;

                }
            })
        }
      } )
    }

    function editIncident(){
        let table_data = document.getElementById('incident_stats')
    
        for (var i = 0; i < table_data.rows.length; i++){
            table_data.rows[i].onclick = function (){
                localStorage.setItem('incident_id', this.cells[0].innerHTML)
                localStorage.setItem('incident_type', this.cells[1].innerHTML)
                localStorage.setItem('comment', this.cells[2].innerHTML)
    
                window.location.href = "edit_incident.html"
            }
        }
        
    }
