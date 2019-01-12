function hide_message() {
    let error_container = document.getElementById('message')
    window.setTimeout(function () {
        if (error_container){
            error_container.innerHTML = ""
        }
    }, 2000)
}

function deleteIncident(){
    let table_data = document.getElementById('incident_stats')
    let confirmed = confirm("Are you sure you want to delete this incident");
    if(confirmed == true){
    for (var i = 0; i < table_data.rows.length; i++){
        table_data.rows[i].onclick = function (){
            record_id = this.cells[0].innerHTML;
            
            fetch(`${url}${record_id}`, {
                method: 'DELETE',
                headers: {

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Request-Method': '*',
                    "Authorization": jwt_token

                }

            })
            .then((res) => res.json())
            .then((data)  => {
                if (data.status == 200){
                 let message = document.getElementById("message")
                 if(message){
                    message.style.color = "green"
                     message.innerHTML = data.message
                     window.setTimeout(function () {
                         location.reload()
                     }, 3000);
                 }
                } else if (data.msg == 'Expired Token'){
                
                        window.setTimeout(function () {
                        alert("Your session has expired press okey to login")
                        window.location.replace('user_login.html')
                    }, 2000);
                    }
                
                else {
                    let message = document.getElementById("message")
                    if(message){
                        message.innerHTML = data.message
                        hide_message()
                    }

                }
            })
            .catch((e)=> console.log(e))
            
        }
    }
    
}
}