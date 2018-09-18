var sequencerControlsOut = false;
var oldScroll = 0;
var scrollCounter = 4;

$(document).ready(function(){
    checkTagLine();

    

    $('body').on('click', '#opener', function(){
        if(!sequencerControlsOut){
            $('#sequencerControls > div:nth-of-type(2)').css('display', 'flex');
            $('#specificControls').css('display', 'flex');
            $('#sequencerControls').velocity({width:'6vw'});
            sequencerControlsOut = true;
        }
        else{
            $('#sequencerControls > div:nth-of-type(2)').css('display', 'none');
            $('#specificControls').css('display', 'none');
            $('#sequencerControls').velocity({width:'0'});
            sequencerControlsOut = false;
        }
    })
    $(window).on("mousewheel", function(event) {
        scrollCounter++;
        var leftEdge = $(window).scrollLeft();

        if(scrollCounter % 5 == 0){
            console.log('MOD 10');
            if(event.deltaY == 1 && leftEdge != oldScroll){
                console.log('Up');
                $('body').velocity('stop');
    
                $('body').velocity("scroll", { axis: "x", offset: leftEdge+300, duration:350 });
                oldScroll = $(window).scrollLeft();
            }
            else if(event.deltaY == -1 && leftEdge != 0){
                console.log('Down');
                $('body').velocity('stop');
                
                console.log(leftEdge);
                $('body').velocity("scroll", { axis: "x", offset: leftEdge-300, duration:350 });
                oldScroll = $(window).scrollLeft();
            }
        }
        
    })
    
    
})

$(window).on('resize', function(){
    setPlayerPos();
    checkTagLine();
})

function setPlayerPos(){
    var controlWidth = $('#control').outerWidth();
    var windowWidth = $(window).outerWidth()
    
    var calcWidth = (windowWidth/2) - (controlWidth/2);

    $('#control').css('left', calcWidth);
}
function checkTagLine(){
    var topTagLine = $('#tagLine').offset().top;
    var tagLineHeight = $('#tagLine').outerHeight();
    var sequencerTop = $('#sequenceContainer').offset().top;

    if((topTagLine+tagLineHeight) > sequencerTop){
        $('#tagLine').css('visibility', 'hidden');
    }else{
        $('#tagLine').css('visibility', 'visible');
    }
}
