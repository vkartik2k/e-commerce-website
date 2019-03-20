$(function () {
    $("#login").click(function () {
        let password = $("#password").val()
        let mobileno = $("#phoneno").val()
        $.post('../route/ashevisdkedjiqac/',
        {
            password:password,
            mobileno:mobileno
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