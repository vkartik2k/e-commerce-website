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
            $("#headdynamic").html(`Hello, `+ capitalize(data.name) +`
            &nbsp;&nbsp;
            <a href="./"><button id="cart" class="btn btn-primary wishcart">HOME</button></a>
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
let billing = {
    total : 0,
    price : 0,
    discount : 0,
    tax : 0,
    delivery : 0,
    payable : 0
}
function loadpage() {
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
        <div class="removewish"><button class="btn btn-outline-danger btnpersonal" id="remove`,
        `">REMOVE</button></div>
        </div>`
    ]
    billing.total =0;
    billing.price =0;
    billing.delivery=0;
    billing.discount=0;
    billing.tax=0;
    billing.payable=0;
    
    login()
    $.post('../route/opuihjcvbnfgrtma/',
    {},
    function(data){
        
        
        for (i of data){
            billing.total += roundNumber(i.price,2);
            let dis = i.price * (i.discount/100.0);
            let newprice = roundNumber(i.price - dis,2);
            billing.price += roundNumber(newprice,2);
            billing.discount += roundNumber(dis,2);
            content += template[0] +i.id+template[1]+ i.name + template[2] + i.brand + template[3] + roundNumber(i.price,2)+template[4]+" ("+i.discount+template[5]+newprice + template[6]+i.id+ template[7];
        }
        billing.total = roundNumber(billing.total,2)
        billing.discount = roundNumber(billing.discount,2)
        billing.price= roundNumber(billing.price,2)
        billing.tax = roundNumber((5.0/100)*billing.price,2);
        billing.payable = roundNumber(billing.price + 2*billing.tax,2);
        billing.discount = roundNumber(billing.discount,2)
        

        $("#container").html(content);
        for(i of data){
            removeabc(i.id)
            console.log("called"+i.id)
        }
    })
    setTimeout(function(){
        $("#totalmrp").text(billing.total+'/-');
        $("#totaldis").text('-'+billing.discount+'/-');
        $("#netamount").text(billing.price+'/-');
        $("#tax").text("+"+billing.tax+'/-');
        $("#tax1").text("+"+billing.tax+'/-');
        $("#deliverycharges").text("+"+billing.delivery+'/-');
        $("#payable").text(billing.payable+'/-');

    },100)
}
function removeabc(id){
    console.log("clicked"+id)
    $("#remove"+id).click(function() {
        console.log("clicked"+id);
        $.post("/route/polkmuhrfguinbvg",{
            id : id
        },function(data){
            if(data){
                location.reload();
            }
            

        })
    })
}

$(function(){
    loadpage()
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

