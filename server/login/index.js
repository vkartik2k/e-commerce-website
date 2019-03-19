$(function () {
    $("#login").click(function () {
        let password = $("#password").val()
        let phoneno = $("#phoneno").val()
        $.post('../route/ashevisdkedjiqac/',
        {
            password:password,
            mobileno:phoneno,
        },
        function(data){
            console.log(data)
            if(data){
                window.location.href = '/';
            }
            else{
                alert("Incorrect!")
            }
        })
    })
})