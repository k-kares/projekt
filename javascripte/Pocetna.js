$(document).ready(function() {
    $('#logIn').on('click', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var url = 'https://www.fulek.com/data/api/user/login';

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify({
                username: username,
                password: password
            }),

            dataType: "json",
            contentType: 'application/json',
            
            success: function(data, status) {
                console.log(status);
                $.each(data, function(key, value){
                    var errorMsg = "";

                    if (key == 'errorMessages') {
                        errorMsg = value[0];
                    }

                    if (key == 'isSuccess' && value == true) {
                        saveUserToken(data);
                        $('#loginButton').hide();
                        $('#logoutButton').show();
                        window.location.href="pocetna.html";
                    }
                })
            },

            error: function(error) {                
                console.log('Error:', error);
            }
        });
    });

    $('#registerButton').on('click', function(){
        var username = $('#username').val();
        var password = $('#username').val();
        var url = 'https://www.fulek.com/data/api/user/register';
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify({
                username: username,
                password: password
            }),

            dataType: "json",
            contentType: 'application/json',
            success: function(data, status) {
                console.log(status);
                window.location.href="PrijaviSe.html";
            },
            
            error: function(error) {
                console.log('Error:', error); 
            }
        });
    });
    window.onunload= function(){
    logoutUser()
    }
});

$('#logoutButton').on('click', function() {
    localStorage.removeItem('jwtToken');
})
 
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    $('#loginButton').show();
    $('#logoutButton').hide();
    $('#nastavniPlan').hide();
    window.location.href="pocetna.html"
}

function saveUserToken(response)
{
    $.each(response, function(key, value){
        if (key == "data") {
            $.each(value, function(i, val){
                if (i == 'token') {
                    localStorage.setItem('jwtToken', val);
                }
            })
        }
    })
}

if(localStorage.getItem('jwtToken')==null){
    $('#loginButton').show();
    $('#logoutButton').hide();
  }
  else{
    $('#loginButton').hide();
    $('#logoutButton').show();
    $('#nastavniPlan').show();
}