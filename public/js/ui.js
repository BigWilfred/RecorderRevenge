var sequencerControlsOut = false;
var oldScroll = 0;
var scrollCounter = 4;
var tagLineVisible = false;

$(document).ready(function(){
    checkTagLine();
    setPlayerPos();
    topResposive();
    barSet();
    calculateMiddleBar();


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
    topResposive();
    barSet();
    if(fullBar > 4){
        var newWidth = $('#sequenceContainer .bar:last-of-type').offset().left+$('#sequenceContainer .bar:last-of-type').outerWidth();
        $('.verticalCentre').css('width', newWidth);
    }
})

function setPlayerPos(){
    console.log('-----');
    var controlWidth = $('#control').outerWidth();
    var windowWidth = $(window).outerWidth()
    
    var calcWidth = (windowWidth/2) - (controlWidth/2);

    $('#control').css('left', calcWidth);
}
function checkTagLine(){
    var topTagLine = $('#tagLine').offset().top;
    var tagLineHeight = $('#tagLine').outerHeight();
    var sequencerTop = $('#sequenceContainer').offset().top -5;

    if((topTagLine+tagLineHeight) > sequencerTop){
        $('#tagLine').css('visibility', 'hidden');
    }else{
        $('#tagLine').css('visibility', 'visible');
    }
}
function scrollScreen(){

    /* this is the current beat being played!
    $('#sequenceContainer .bar:nth-of-type('+ (positionInLoop+1) +') .beat:nth-of-type('+(positionInBar+1)+')').css('background-color','blue');
    */
   
    //last note has been played on last bar > go to start of sequence container
    if(positionInLoop ==0 ){
        $('#sequenceContainer .bar:nth-of-type(1)').velocity("scroll", { axis: "x" });
    }
    //move towards the right as the loop is playing
    if(positionInLoop > 0){
        //stops all animations to help when bpm is very fast
        $(".velocity-animating").velocity("stop", true);
        $('#sequenceContainer .bar:nth-of-type('+ (positionInLoop) +') .beat:nth-of-type('+(positionInBar+1)+')').velocity("scroll", { axis: "x", easing:'easeInOutCubic' });
    }
}
function topResposive(){
    var topContainerWidth = $('#titleContainer > div').outerWidth();

    if(topContainerWidth <= 500){
        
        $('#titleContainer > div').css('width','100vw');
        $('#tagLine').css('visibility', 'hidden');
        //$('#title').html('Recorder<br>Revenge');
        $('#title').css('font-size','12.5vw');
        $('#title').css('margin-top','20%');
    }
    else{
        //reset
        $('#title').css('font-size','64pt');
        $('#title').css('margin-top','0');
        //$('#tagLine').css('visibility', 'visible');
    }
}

function barSet(){
    var leftBarPos = $('div.bar:nth-child(1)').offset().left;
    var rightBarPos = $('div.bar:nth-child(4)').outerWidth() + $('div.bar:nth-child(4)').offset().left;
    console.log($(window).outerWidth());
    console.log(rightBarPos);

    if($(window).outerWidth() > rightBarPos && fullBar ==4){
        
        $('#sequenceContainer').css('justify-content','center');
    }else{
        $('#sequenceContainer').css('justify-content','left');
    }
}