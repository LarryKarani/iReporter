const url = "https://ireporter-version2.herokuapp.com/api/v2/auth/login"
function login() {
    event.preventDefault();
    // let Form = document.getElementById('login');
    // let loginFormData = new FormData('LoginForm');
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username: username, password:password})
    })
    .then((res)=>res.json())
    //.tata) => console.log(data))
    .then((data)=> {
        //login sucess
        if (data.status == 200){
            if(data.is_admin == true){
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('current_user', username)
                window.location.replace("./admin.html")
            }
            else {
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('current_user', username)
                window.location.replace("./user_profile.html")

            }
       
        }
        else{
            let error_container =  document.getElementById('errors')
            if (error_container){
                error_container.innerHTML = data.message
            }
        }
        
    })
    .catch((e) => console.log(e))
    
}
