$(function () {
    $("#login").click(function () {
        let password = $("#password").val()
        let phoneno = $("#phoneno").val()
        $.post('../route/ashevisdkedjiqac/',
        {
            password:password,
            mobileno:phoneno,
        })
    })
})