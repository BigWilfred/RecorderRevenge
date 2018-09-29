var counter = 0;
var limit = 16;
var ready = false;
var sample1;
var sample2;
var sample3
var sample4;

var highSample1;
var highSample2;
var highSample3;
var highSample4;

var middleSample1;
var middleSample2;
var middleSample3;
var middleSample4;

var lowSample1;
var lowSample2;
var lowSample3;
var lowSample4;

$(document).ready(function(){
    sample1 = new Howl({
        src: ['https://instaud.io/_/2GUL.wav'],
        onload:checkFullyDone()
    });
    sample2 = new Howl({
        src: ['https://instaud.io/_/2JOb.wav'],
        onload:checkFullyDone()
    });
    sample3 = new Howl({
        src: ['https://instaud.io/_/2JOc.wav'],
        onload:checkFullyDone()
    });
    sample4 = new Howl({
        src: ['https://instaud.io/_/2JOf.wav'],
        onload:checkFullyDone()
    });
    
    highSample1 = new Howl({
        src: ['https://instaud.io/_/2GUL.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    highSample2 = new Howl({
        src: ['https://instaud.io/_/2JOb.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    highSample3 = new Howl({
        src: ['https://instaud.io/_/2JOc.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    highSample4 = new Howl({
        src: ['https://instaud.io/_/2JOf.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    
    middleSample1 = new Howl({
        src: ['https://instaud.io/_/2JOg.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    middleSample2 = new Howl({
        src: ['https://instaud.io/_/2JOh.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    middleSample3 = new Howl({
        src: ['https://instaud.io/_/2JOi.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    middleSample4 = new Howl({
        src: ['https://instaud.io/_/2JOj.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    
    lowSample1 = new Howl({
        src: ['https://instaud.io/_/2JOl.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    lowSample2 = new Howl({
        src: ['https://instaud.io/_/2JOn.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    lowSample3 = new Howl({
        src: ['https://instaud.io/_/2JOo.wav'],
        preload:true,
        onload:checkFullyDone()
    });
    lowSample4 = new Howl({
        src: ['https://instaud.io/_/2JOq.wav'],
        preload:true,
        onload:checkFullyDone()
    });

    $('body').on('click', '#ready', function(){
        if(ready){
            
            
            $('#ready').velocity({opacity:0}, {duration:500,complete:function(){
                $('#titleContainer').velocity({height:'33vh'});
                $('.verticalCentre').css('display','flex');
                barSet();
                $('#titleContainer > div').velocity({top:'0vh'},{
                    complete:function(){

                        $('.verticalCentre').velocity({opacity:1},{duration:800,
                            complete:function(){
                                $('#topControls').velocity({right:'1vh'});
                                $('#time').velocity({right:'15.5vh'});
                                $("#control").velocity({bottom:'2.5%'});
                                checkTagLine();
                                $('#tagLine').velocity({opacity:1});
                                
                            }
                        });
                    }
                });
            }});
            
           

            
        }
        
    })
})


function checkFullyDone(){
    counter++;
    if(counter == limit){
        $('#ready').velocity({opacity:1}, {duration:1500});
        ready = true;
    }
}

