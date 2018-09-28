
var playingSamples = [];
var loop = [];

var testTimer;
var timeCounter=0;


//number of bars
var fullBar = 4;
var bpm = 120;
var Ibpm; //interval timing
var bpmStep =1;

var currentOctive = 1;

var positionInBar = 0;
var positionInLoop = 0;
var targetCounter = 1;

var currentlyPlaying = false;
var currentlyMuted = false;
var sliderMute = false;
var playOnPress = true;

var barHtml = "<div class='bar'><div class='beat'><div class='note'></div><div class='note'></div><div class='note'></div><div class='note'></div><div class='position'><div class='dot'></div></div></div><div class='beat'><div class='note'></div><div class='note'></div><div class='note'></div><div class='note'></div><div class='position'><div class='dot'></div></div></div><div class='beat'><div class='note'></div><div class='note'></div><div class='note'></div><div class='note'></div><div class='position'><div class='dot'></div></div></div><div class='beat'><div class='note'></div><div class='note'></div><div class='note'></div><div class='note'></div><div class='position'><div class='dot'></div></div></div></div>"

var beatHtml = "<div class='beat' id='channelVolume'></div>";
var addBarHtml = "<div id='addBar'><div><img src='img/plus.svg'></div></div>";

$(document).ready(function(){
    
    Ibpm = 60000/bpm;

    //sets the starting value of the volume sliders
    $('#volume_slider').val(1.0);
    $('.individualVolume input').val(1.0);

    $('body').on('click','#head', function(){
        if($('#head img').attr('src') == 'img/head.svg'){
            $('#head img').attr('src', 'img/head2.svg');
            playOnPress = false;
        }
        else{
            $('#head img').attr('src', 'img/head.svg');
            playOnPress = true;
        }
    })
    $('body').on('click','#addBar', function(){

        
        $('#sequenceContainer .bar:last-of-type').css('padding-right','0');
        fullBar++;
        console.log(fullBar);
        calculateLoop(fullBar);
        $('#sequenceContainer').append(barHtml);

        

        $('#sequenceContainer').css('justify-content', 'left');
        $('#sequenceContainer .bar:last-of-type').css('padding-right','3vw');
        
        
        var newWidth = $('#sequenceContainer .bar:last-of-type').offset().left+$('#sequenceContainer .bar:last-of-type').outerWidth();
        $('#titleContainer').css('width', newWidth);
        
        if(!currentlyPlaying){
            //scroll to the new bar
            console.log('trying to scroll in add bar');
            
            
            $('#sequenceContainer .bar:last-of-type').velocity("scroll", { axis: "x" });
        }
        else{
            //timeCounter = timeCounter +4*ammountAdded;
        }
        
    })

    $('body').on("click",'.note', function(){
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');

        }
        else{
            $(this).addClass('selected');
            if(!currentlyPlaying && playOnPress){
                playSample(getClickedNote(this));
            }
            
        }
        if(currentlyPlaying){
            calculateLoop(fullBar);
        }
        
    });

    $('#play').on("click", function(){
        $('#play img').attr('src','img/pause.svg');
        if(!currentlyPlaying){
            playLoop();
        }
        else{
            $('#play img').attr('src','img/play.svg');
            stopSamples();
            clearInterval(testTimer);
            currentlyPlaying=false;
        }
    })

    $('#stop').on('click',function(){
        $('div#time').html('0:0:0');
        $('#play img').attr('src','img/play.svg');
        currentlyPlaying = false;
        loop=[];
        positionInBar = 0;
        positionInLoop = 0;
        $('.dot').removeClass('active');
        stopSamples();
        clearInterval(testTimer);
        timeCounter = 0;
        $('#hours').html('0');
        $('#minutes').html(':0:');
        $('#seconds').html('0');
        $('#sequenceContainer').velocity("scroll", { axis: "x" });
    })

    $('body').on('click', '#clear', function(){
        $('.selected').removeClass('selected');
        calculateLoop(fullBar);
    })

    $('body').on('click', '#mute', function(){
        if(!sliderMute){
            if(!currentlyMuted){
                $('#mute img').attr('src','img/mute.svg');
                Howler.mute(true);
                currentlyMuted = true;
            }
            else{
                $('#mute img').attr('src','img/speaker.svg');
                Howler.mute(false);
                currentlyMuted = false;
            }
        }
        
    })

    $('#bpm').on('click', function(){
        bpmStep++;
        bpmImage();
        
        if(currentlyPlaying){
            clearInterval(testTimer);
            playLoop();
        }
        
    })
    $('#volume_slider').on('change', function(){
        var sliderValue = $(this).val();

        Howler.volume(sliderValue);
        if(sliderValue == 0){
            $('#mute img').attr('src','img/mute.svg')
            currentlyMuted = true;
            sliderMute =true;
        }
        else{
            if(currentlyMuted){
                currentlyMuted= false;
                Howler.mute(false);
            }
            sliderMute = false;
            if(sliderValue < 0.5){
                $('#mute img').attr('src','img/speaker2.svg')
            }
            else{
                $('#mute img').attr('src','img/speaker.svg')
            }
            
        }
    })
    $('body').on('change', '.individualVolume', function(){
        var controlId = $(this).attr('id');
        var volumeValue = $('#sequencerControls #'+controlId+' input').val();
        var sampleId = controlId.split('indiv')[1];

        console.log(volumeValue);
        sampleFromIndivId(sampleId).volume(volumeValue);
    })
    $('body').on('click', '#octive', function(){
        changeOctive();
    })
});

function playLoop(){
    calculateLoop(fullBar);
    console.log(loop);
    currentlyPlaying = true;
    console.log('----- interval started -----');
    testTimer = setInterval(function(){
        
        //check to see if window 
        scrollScreen();
        //represents total number of intervals
        timeCounter++;
        $('div#time').html(secondsToHms(elapsedTime()));
        stopSamples();

        for(j=0; j < loop[positionInLoop][positionInBar].length; j++){
            playSample(loop[positionInLoop][positionInBar][j]);
        }
        var currentBeat = parseInt(positionInBar)+1;
        var currentBar = parseInt(positionInLoop)+1;
        if(positionInBar ==0 && positionInLoop == 0){
            $('.dot').removeClass('active');
        }
        $('div.bar:nth-child('+ currentBar +') > div:nth-child('+ currentBeat+') > div:nth-child(5) > div:nth-child(1)').addClass('active');
        determinePosition();
 
    }, Ibpm);
    
}

function calculateBarNotes(barNumber){
    var bar =[];
    for(j=1;j<=4;j++){
        var beatSound =[];
        for(i=1; i<=4; i++){
            if($('div.bar:nth-child('+ barNumber +') > div.beat:nth-child('+ j +') > div:nth-child('+ i +')').hasClass('selected')){
                beatSound.push(i);
            }
        }
        bar.push(beatSound);
    }

    loop.push(bar);
}

function calculateLoop(totalBars){
    loop = [];

    for(k=1; k <= totalBars; k++){  
        calculateBarNotes(k.toString());
    }
}
function playSample(noteCode){
    
    if(noteCode == 1){
        sample1.play();
    }
    if(noteCode == 2){
        sample2.play();
    }
    if(noteCode == 3){
        sample3.play();
    }
    if(noteCode == 4){
        sample4.play();
    }
    
}
function getClickedNote(selector){
    if($(selector).is(':first-child')) return 1;
    if($(selector).is(':nth-child(2)')) return 2;
    if($(selector).is(':nth-child(3)')) return 3;
    if($(selector).is(':nth-child(4)')) return 4;
}
function stopSamples(){
    sample1.stop();
    sample2.stop();
    sample3.stop();
    sample4.stop();
}
function determinePosition(){
    //still within the same bar
    if(positionInBar !=3){
        positionInBar++;
    }
    //about to go to next bar
    else{
        positionInBar=0;
        if(positionInLoop != (fullBar-1)){
            positionInLoop++;
        }
        else{
            console.log(positionInLoop);
            
            positionInLoop=0;
            targetCounter++;
        }
        
    }
}



//returns the total amount of seconds that have elapsed since starting.
function elapsedTime(){
    var totalElapsedTimer = timeCounter*Ibpm/1000;
    return totalElapsedTimer;
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    //return hDisplay + mDisplay + sDisplay; 
    var display = h+":"+m+":"+s;
    return display;
}

function sampleFromIndivId(id){
    if(id ==1) return sample1;
    if(id ==2) return sample2;
    if(id ==3) return sample3;
    if(id ==4) return sample4;
}
function bpmImage(){
    if(bpmStep == 1){
        $('#bpm img').attr('src', 'img/bpm1.svg');
        bpm=120;
        Ibpm = 60000/bpm;
    }
    if(bpmStep == 2){
        $('#bpm img').attr('src', 'img/bpm2.svg');
        bpm=240;
        Ibpm = 60000/bpm;
    }
    if(bpmStep == 3){
        $('#bpm img').attr('src', 'img/bpm3.svg');
        bpmStep =0;
        bpm=480;
        Ibpm = 60000/bpm;
    }
}

function changeOctive(){
    if(currentOctive ==1){
        currentOctive =2;
        $('#octive img').attr('src','img/note_m.svg');
        sample1 = middleSample1;
        sample2 = middleSample2;
        sample3 = middleSample3;
        sample4 = middleSample4;
    }
    else if(currentOctive == 2){
        currentOctive =3;
        $('#octive img').attr('src','img/note_l.svg');
        sample1 = lowSample1;
        sample2 = lowSample2;
        sample3 = lowSample3;
        sample4 = lowSample4;
    }
    else{
        currentOctive = 1;
        $('#octive img').attr('src','img/note_h.svg');
        sample1 = highSample1;
        sample2 = highSample2;
        sample3 = highSample3;
        sample4 = highSample4;
    }
}
function calculateMiddleBar(){
    var windowWidth = $(window).outerWidth();
    console.log('window width =  '+ windowWidth);
    for(i=1; i <= fullBar; i++){
        console.log($('#sequenceContainer .bar:nth-of-type('+ (i) +')').offset().left);
    }
}
