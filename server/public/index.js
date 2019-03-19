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
        if(data.name==""){
            $("#headdynamic").html(`<a href="../login/index.html"><button id="signin" class="btn btn-primary signinout">SIGN IN</button></a>
            <a href="../login/signup.html"><button id ="signup"class="btn btn-outline-primary signinout">SIGN UP</button></a>`);
            signin();
        }
        else{
            $("#headdynamic").html(`Hello, `+ capitalize(data.name) +`
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
let filtercount = {}
function displayfilter(filtera){
    let filtercontent = ``;
    let filtertemp = [
        `<div class="kfilter">
        <div class="kfilterhead">`+filtera+
        `</div>`,
    `<input type="checkbox" checked="true" id="`,
    `"  name="`,
    `"><spam> `,
    `</spam><br>`,
    `</div>`
    ]; 
    let count =0;
    $.post('../route/qwdfghyubndsiose/',
    {filter : filtera},
    function (data) {
        filtercontent += filtertemp[0];
        if(filtera =="Discount"){
            data.sort();
            count = 1;
            for(i of data){
                filtercontent += filtertemp[1] +filtera+count + filtertemp[2]+i+filtertemp[3] +capitalize(i) + "% " + filtertemp[4];
                count++;
            }
            filtercount[filtera] = --count;
        }
        else{
            count = 1;
            for(i of data){
                filtercontent += filtertemp[1] +filtera+count + filtertemp[2]+i+filtertemp[3]+ i + filtertemp[4];
                count++;
            }
            filtercount[filtera] = --count;
        }
        filtercontent += filtertemp[5];
        $(".categorya").append(filtercontent);
    })
}

function addtolist(id){
    $("#wish"+id).click(function(){
        
        $.post("/route/uiythjrefkrtvbna",{
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
    $("#cart"+id).click(function(){
        $.post("/route/uiythjrefkrtvbnp",{
            id : id
        },function(data){
            if(data){
                $("#publicnotify").text("Added to cart!")
                $("#publicnotify").fadeIn(1000).css("display","block")
                setTimeout(function() {
                    $("#publicnotify").fadeOut(1000).css("display","none")
                }, 2000);
            }
            else{
                $("#publicnotify").text("Login to add to cart!")
                $("#publicnotify").fadeIn(1000).css("display","block")
                setTimeout(function() {
                    $("#publicnotify").fadeOut(1000).css("display","none")
                }, 2000);

            }
        })
    }) 
    $("#product"+id).click(function(){
        window.location.href= "../product/"+id;
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
         `<div class="product"><div class="innerproduct" id="product`,
         `">
        <div class="image"><img class="imgproduct" src="./image/`,
        `.png" width="214px"></div>
        <div class="productname">`,
        `</div>
        <div class="producer">`,
        `</div>
        <div class="price">&#8377;<div class="price1">`,
        '</div>',
        `% )<div class="newprice">`,
         `/-</div></div></div>
        <div class="buy"><button id="cart`,
        `"class="btn btn-primary btnpersonal">ADD TO CART</button></div>
        <div class="wishlist"><button id="wish`,
        `" class="btn btn-outline-primary btnpersonal">&#9825; WISHLIST</button></div>
        </div>`,
        `"class="btn btn-danger btnpersonal" disabled>OUT OF STOCK</button></div>
        <div class="wishlist"><button id="wish`
    ]
    login()
    $.post('../route/qwdfghyubndsiosd/',
    {},
    function(data){
        for (let j=0;j<data.length;j++){
            let i = data[j];
            noofproducts++;
            let dis = i.price * (i.discount/100.0);
            let newprice = roundNumber(i.price - dis,2);
            console.log(i.qty)
            if(i.qty){
                content += template[0]+i.id+template[1] +i.id+template[2]+ i.name + template[3] + i.brand + template[4] + roundNumber(i.price,2)+template[5]+" ("+i.discount+template[6]+newprice + template[7]+i.id+template[8]+i.id+template[9];
            }
            else{
                content += template[0]+i.id+template[1] +i.id+template[2]+ i.name + template[3] + i.brand + template[4] + roundNumber(i.price,2)+template[5]+" ("+i.discount+template[6]+newprice + template[7]+i.id+template[10]+i.id+template[9];

            }

        }
        $("#container").html(content);
        for (i of data){
            addtolist(i.id);
        }
        for (let j=0;j<data.length;j++){
            let i = data[j];
            
            dict.add(i.name)
            dict.add(i.brand)
            
            

        }
    })
    displayfilter("Brand");
    displayfilter("Size");
    displayfilter("Gender");
    displayfilter("Retailer");
    displayfilter("Discount");
    autocomplete();

    $("#applyfilter").click(function (){
        noofproducts = 0;
        let passingobject = {
            brand: {
                arr : []
            },
            size :{
                arr :[]
            },
            gender: {
                arr : []
            },
            retailer :{
                arr :[]
            },
            discount: {
                arr : []
            }
          };
        for(let jk=1;jk<= filtercount.Brand;jk++){
            if($('#Brand'+jk).is(":checked")){
                passingobject.brand.arr.push($('#Brand'+jk).prop("name"));
            }
        }
        for(let jk=1;jk<= filtercount.Size;jk++){
            if($('#Size'+jk).is(":checked")){
                passingobject.size.arr.push($('#Size'+jk).prop("name"));
            }
        }
        for(let jk=1;jk<= filtercount.Gender;jk++){
            if($('#Gender'+jk).is(":checked")){
                passingobject.gender.arr.push($('#Gender'+jk).prop("name"));
            }
        }
        for(let jk=1;jk<= filtercount.Retailer;jk++){
            if($('#Retailer'+jk).is(":checked")){
                passingobject.retailer.arr.push($('#Retailer'+jk).prop("name"));
            }
        }
        for(let jk=1;jk<= filtercount.Discount;jk++){
            if($('#Discount'+jk).is(":checked")){
                passingobject.discount.arr.push($('#Discount'+jk).prop("name"));
            }
        }
        content = ``;
        $.post('../route/sdjkoplmnjiuhbwe',
        passingobject,
        function(data){
            $("#publicnotify").text("Filters Applied!")
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
    });

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