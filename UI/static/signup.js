const url = 'https://ireporter-version2.herokuapp.com/api/v2/auth/signup'
function signUp(){
    event.preventDefault();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let otherName = document.getElementById('otherName').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    fetch(url, 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'firstname': firstName,
            'lastname': lastName,
            'othername': otherName,
            'email': email,
            'phoneNumber': phoneNumber,
            'username': userName,
            'password': password
        })
    })
     
    .then((res) => res.json())
    .then((data) => {
        if(data.status == 201){
            //console.log(data)
        window.location.replace('user_login.html');
        }
        else{
            let error_container = document.getElementById('errors')
            if (error_container){
                error_container.innerHTML = data.message
            }
        }
    })
    .catch((e)=> console.log(e))
}