var bingo_num = 0;
var selected = -1;

$('.cell').click(function () {
    for(var i=1;i<=25;i++){
        let el = $("#"+i.toString());
        if(!el.hasClass("checked")){
            el.css("background","url(img/"+i.toString()+"_0.png)")
            el.css("background-size","100%")
        }
    }
    if($(this).hasClass("checked")){

        selected = $(this).attr('id');
        $("#current")[0].src = "img/"+$(this).attr('id').toString()+"_2.png"
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_2.png)")
        $(this).css("background-size","100%")
    }else{
        selected = $(this).attr('id');
        $("#current")[0].src = "img/"+$(this).attr('id').toString()+"_1.png"
        $(this).css("background","url(img/"+$(this).attr('id').toString()+"_1.png)")
        $(this).css("background-size","100%")
        //$("#bingo_num")[0].innerHTML = "<div style='color:green;'>"+bingo_num.toString()+"/25</div>"
    }
})

$("#O").click(()=>{
    if(1<=selected && selected<=25 && !$("#"+selected.toString()).hasClass("checked")){
        let el = $("#"+selected.toString())
        el.css("background","url(img/"+selected.toString()+"_2.png)")
        el.css("background-size","100%")
        $("#current")[0].src = "img/"+selected.toString()+"_2.png"
        bingo_num += 1;
        $("#bingo_num")[0].innerHTML = "<div style='color:green;'>"+bingo_num.toString()+"/25</div>";
        el.addClass("checked");
        selected = -1;
    }
})

$("#X").click(()=>{
    if(1<=selected && selected<=25 && $("#"+selected.toString()).hasClass("checked")){
        let el = $("#"+selected.toString())
        el.css("background","url(img/"+selected.toString()+"_1.png)")
        el.css("background-size","100%")
        $("#current")[0].src = "img/"+selected.toString()+"_1.png"
        bingo_num -= 1;
        $("#bingo_num")[0].innerHTML = "<div style='color:green;'>"+bingo_num.toString()+"/25</div>";
        el.removeClass("checked");
        selected = -1;
    }
})

// $('.cell').hover(function (){
//     $(this).css("background","url(img/"+$(this).attr('id').toString()+"_1.png)")
//     $(this).css("background-size","100%")
// },function(){
//     if(!$(this).hasClass("checked")){
//         $(this).css("background","url(img/"+$(this).attr('id').toString()+"_0.png)")
//         $(this).css("background-size","100%")
//     }else{
//         $(this).css("background","url(img/"+$(this).attr('id').toString()+"_2.png)")
//         $(this).css("background-size","100%")
//     }
// })

function reset(){
    location.reload();
}

window.onload = function(){
    for(var i=1;i<=25;i++){
        let el = $("#"+i.toString())
        el.css("background","url(img/"+i.toString()+"_0.png)")
        el.css("background-size","100%")
    }
}