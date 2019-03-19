$(function () {
    $("#login").click(function () {
        let password = $("#password").val()
        let username= $("#username").val()
        
        
        $.post('../route/bvsdfgimeckgrtv/',
        {
            password:password,
            username:username
        },
        function (data) {
            if(data){
                alert("ADMIN CONTROLS GRANTED!")
                

            }
            else{
                alert("INCORRECT LOGIN CREDENTIALS!")
            }
        })
    })
})