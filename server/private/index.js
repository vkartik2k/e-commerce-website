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
function signin(){
    $("#signin").click(function () {
        $.get("../login/",{},function (data){
        })
    })
    
}
let noofproducts = 0;
function login(){
    $.post('../route/qwdfjhsdxcbvdfre',{},
    function(data){
        console.log(data.mobileno);
        if(data.mobileno==null){
            $("#headdynamic").html(`<a href="../login/index.html"><button id="signin" class="btn btn-primary signinout">SIGN IN</button></a>
            <a href="../login/signup.html"><button id ="signup"class="btn btn-outline-primary signinout">SIGN UP</button></a>`);
            signin();
        }
        else{
            $("#headdynamic").html(`Hello, `+ capitalize(data.mobileno) +`
            &nbsp;&nbsp;
            <a href="./cart.html"><button id="cart" class="btn btn-primary wishcart">GO TO CART</button></a>
            <a href="./wishlist.html"><button id="wish" class="btn btn-primary wishcart">&#9825; WISHLIST</button></a>
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
    login()
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
        let searchvar = $("#hsearch").val();
        noofproducts = 0;
        let passingobject = {
            name :{
                arr : [searchvar]
            },
            brand: {
                arr : [searchvar]
            },
            size :{
                arr :[searchvar]
            },
            gender: {
                arr : [searchvar]
            },
            retailer :{
                arr :[searchvar]
            },
            discount: {
                arr : [searchvar]
            }
          };
        content = ``;
        $.post('../route/sdjkoplmnjiuhbwf',
        passingobject,
        function(data){
            $("#publicnotify").text("Searching")
            $("#publicnotify").fadeIn(1000).css("display","block")
            setTimeout(function() {
                $("#publicnotify").fadeOut(1000).css("display","none")
            }, 2000);
            for (ik of data){
                noofproducts++;
                let dis = ik.price * (ik.discount/100.0);
                let newprice = roundNumber(ik.price - dis,2);
                if(ik.qty){
                    content += template[0]+ik.id+template[1] +ik.id+template[2]+ ik.name + template[3] + ik.brand + template[4] + roundNumber(ik.price,2)+template[5]+" ("+ik.discount+template[6]+newprice + template[7]+ik.id+template[8]+ik.id+template[9];
                }
                else{
                    content += template[0]+ik.id+template[1] +ik.id+template[2]+ ik.name + template[3] + ik.brand + template[4] + roundNumber(ik.price,2)+template[5]+" ("+ik.discount+template[6]+newprice + template[7]+ik.id+template[10]+ik.id+template[9];
    
                }
            }
            $("#container").empty();
            $("#container").html(content);
            for (ik of data){
                addtolist(ik.id);
            }
        })


    })
})