function capitalize(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}
function uniquea(list) {
    var result = [];
    $.each(list, function(i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
  }
function signin(){
    console.log("inside sigin")
    $("#signin").click(function () {
        $.get("../login/",{},function (data){
            console.log(data)
        })
    })
    
}

function login(){
    $.post('../route/qwdfjhsdxcbvdfre',{},
    function(data){
        if(data.name==""){
            $("#headdynamic").html(`<a href="../login/index.html"><button id="signin" class="btn btn-primary signinout">SIGN IN</button></a>
            <a href="../login/signup.html"><button id ="signup"class="btn btn-outline-primary signinout">SIGN UP</button></a>`);
            signin();
        }
        else{
            $("#headdynamic").html(`Hello, `+ capitalize(data.name) +`
            &nbsp;&nbsp;
            <a href="./"><button id="cart" class="btn btn-primary wishcart">HOME</button></a>
            <a href="./cart.html"><button id="wish" class="btn btn-primary wishcart">GO TO CART</button></a>
            <button id="logout" class="btn btn-outline-primary signinout">LOG OUT</button>
            `)
            $("#logout").click(function () {
                console.log("logout")
                $.post('../route/ghfdrtyujhweqwmn',{},
                function(data){
                    if(data){
                        $("#headdynamic").html(`<a href="../login/index.html"><button id="signin" class="btn btn-primary signinout">SIGN IN</button></a>
                        <a href="../login/signup.html"><button id ="signup"class="btn btn-outline-primary signinout">SIGN UP</button></a>`);

                        signin();
                    }
                })
            })
        }
    })
}

function node(){
    this.arr = [];
    for(let i=0;i<256;i++){
        this.arr[i]=0;
    }
    this.isend=false;
}
function dictionary() {
    this.main = new node();

    this.add = function(str){
        str = str.toUpperCase();
        let temp = this.main;
        for(i of str){
            if(temp.arr[i.charCodeAt(0)]===0){
                let temp2 = new node();
                temp.arr[i.charCodeAt(0)] = temp2;
            }
            temp = temp.arr[i.charCodeAt(0)];
        }
        temp.isend = true;
    }

    function all(root,arr,str){
        if(root.isend){
            arr.push(str);
        }
        for(let i=0;i<256;i++){
            if(root.arr[i]){
                all(root.arr[i],arr,str+String.fromCharCode(i));
            }
        }
    }
    this.search = function(str){
        let arr = [];
        str = str.toUpperCase();
        let temp = this.main;
        for(i of str){
            if(temp.arr[i.charCodeAt(0)]===0){
                let temp2 = new node();
                temp.arr[i.charCodeAt(0)] = temp2;
            }
            temp = temp.arr[i.charCodeAt(0)];
        }
        all(temp,arr,str);
        return arr;
        

    }
}
let dict = new dictionary();

function addtolist(id){ 
    $("#cart"+id).click(function(){

        $.post("/route/uiythjrefkrtvbnp",{
            id : id
        },function(data){
            if(data){
                $("#publicnotify").text("Added to wishlist!")
                $("#publicnotify").fadeIn(1000).css("display","block")
                setTimeout(function() {
                    $("#publicnotify").fadeOut(1000).css("display","none")
                }, 2000);
            }
            else{
                $("#publicnotify").text("Login to add to wishlist!")
                $("#publicnotify").fadeIn(1000).css("display","block")
                setTimeout(function() {
                    $("#publicnotify").fadeOut(1000).css("display","none")
                }, 2000);

            }
        })
    }) 
}
function autocomplete(){
    var hsearch = $('#hsearch');

    hsearch.on('keyup', function () {
        setTimeout(function(){let data = hsearch.val();
            let a = data.length;
            let c = dict.search(data);
            str=``;
            for(i of c){
                str += '<div class="ddinner" id='+i+'>'+data+'<b>'+i.toLowerCase().substr(a)+'</b></div>';
                
            }
            
            
            $("#dropdown").html(str);

        },100)

        setTimeout(function(){
            let data = hsearch.val();
            let c = dict.search(data);
            for(let i=0;i< c.length;i++){
                $('#'+c[i]).click(function(){
                    let temp = c[i];
                    hsearch.val(temp.toLowerCase());
                    
                })
            }
        },200)
    });
}


$(function () {
    
    $('#container').empty()
    let content = ``;
    let template = [
         `<div class="product">
        <div class="image"><img src="./image/`,
        `.png" width="214px"></div>
        <div class="productname">`,
        `</div>
        <div class="producer">`,
        `</div>
        <div class="price">&#8377;<div class="price1">`,
        '</div>',
        `% )<div class="newprice">`,
         `/-</div></div>
        <div class="buy"><button class="btn btn-primary btnpersonal" id="cart`,`">ADD TO CART</button></div>
        <div class="removewish"><button class="btn btn-outline-danger btnpersonal" id="remove`,
        `">REMOVE</button></div>
        </div>`
    ]
    
    login()
    $.post('../route/opuihjcvbnfgrtmb/',
    {},
    function(data){
        
        // productname + producer + price
        
        for (i of data){
            let dis = i.price * (i.discount/100.0);
            let newprice = roundNumber(i.price - dis,2);
            content += template[0] +i.id+template[1]+ i.name + template[2] + i.brand + template[3] + roundNumber(i.price,2)+template[4]+" ("+i.discount+template[5]+newprice + template[6]+i.id+template[7]+i.id+template[8];
        }
        $("#container").html(content);
        for(i of data){
            removeabc(i.id);
            addtolist(i.id);
            console.log("called"+i.id)
        }
    })
    $.post('../route/qwdfghyubndsiosd/',
    {},
    function(data){
        for (let j=0;j<data.length;j++){
            let i = data[j];
            
            dict.add(i.name)
            dict.add(i.brand)
        }
    })
    autocomplete();
    $("#hsearchbutton").click(function(){
        window.location.href = "./";
    })

})

function removeabc(id){
    console.log("clicked"+id)
    $("#remove"+id).click(function() {
        console.log("clicked"+id);
        $.post("/route/polkmuhrfguinbvk",{
            id : id
        },function(data){
            if(data){
                location.reload();
            }
            

        })
    })
}

