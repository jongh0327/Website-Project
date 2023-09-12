var bingo_num = 0;

$('.cell').click(function () {
    if($(this).hasClass("checked")){
        $(this).removeClass("checked");
        bingo_num = bingo_num - 1;
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_0.png)")
        //$(this).css("background","url(img/1_0.png)")
        $(this).css("background-size","100%")
        //$("#bingo_num")[0].innerHTML = "<div style='color:green;'>"+bingo_num.toString()+"/25</div>"
    }else{
        $(this).addClass("checked");
        bingo_num = bingo_num + 1;
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_1.png)")
        $(this).css("background-size","100%")
        //$("#bingo_num")[0].innerHTML = "<div style='color:green;'>"+bingo_num.toString()+"/25</div>"
    }
})
/*
$('.cell').hover(function (){
    $(this).css("background","url(img/"+$(this).attr('id').toString()+"_1.png)")
    $(this).css("background-size","100%")
},function(){
    if(!$(this).hasClass("checked")){
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_0.png)")
        $(this).css("background-size","100%")
    }else{
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_2.png)")
        $(this).css("background-size","100%")
    }
})*/

function reset(){
    location.reload();
}

window.onload = function(){
    for(var i=1;i<=36;i++){
        /*if(i==15||i==16||i==21||i==22){
            continue;
        }*/
        let el = $("#"+i.toString())
        el.css("background","url(img/"+i.toString()+"_0.png)")
        //el.css("background","url(img/1_0.png)")
        el.css("background-size","100%")
    }
}