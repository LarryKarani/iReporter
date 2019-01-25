let url = "https://ireporter-version2.herokuapp.com/api/v2/interventions/";
let token = localStorage.getItem('token')
let jwt_token = "Bearer " + token
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
                console.log( document.getElementById('incident').innerHTML)
                
                document.getElementById('file').src =  data.data[0].image
                document.getElementById('incident').innerHTML = data.data[0].type
                document.getElementById('comment').innerHTML= data.data[0].comment
                document.getElementById('date').innerHTML= data.data[0].createdon
                document.getElementById('status').innerHTML = data.data[0].status
                document.getElementById('location').innerHTML = data.data[0].location
                document.getElementById('owner').innerHTML = data.data[0].createdby
            }
        })}