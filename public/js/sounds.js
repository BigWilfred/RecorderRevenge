var counter = 0;
var limit = 16;

var sample1 = new Howl({
    src: ['https://instaud.io/_/2GUL.wav'],
    onload:checkFullyDone()
});
var sample2 = new Howl({
    src: ['https://instaud.io/_/2GUL.wav'],
    onload:checkFullyDone()
});
var sample3 = new Howl({
    src: ['https://instaud.io/_/2GUL.wav'],
    onload:checkFullyDone()
});
var sample4 = new Howl({
    src: ['https://instaud.io/_/2GUL.wav'],
    onload:checkFullyDone()
});

var highSample1 = new Howl({
    src: ['sounds/h_sound1.wav'],
    preload:true,
    onload:checkFullyDone()
});
var highSample2 = new Howl({
    src: ['sounds/h_sound2.wav'],
    preload:true,
    onload:checkFullyDone()
});
var highSample3 = new Howl({
    src: ['sounds/h_sound3.wav'],
    preload:true,
    onload:checkFullyDone()
});
var highSample4 = new Howl({
    src: ['sounds/h_sound4.wav'],
    preload:true,
    onload:checkFullyDone()
});

var middleSample1 = new Howl({
    src: ['sounds/m_sound1.wav'],
    preload:true,
    onload:checkFullyDone()
});
var middleSample2 = new Howl({
    src: ['sounds/m_sound2.wav'],
    preload:true,
    onload:checkFullyDone()
});
var middleSample3 = new Howl({
    src: ['sounds/m_sound3.wav'],
    preload:true,
    onload:checkFullyDone()
});
var middleSample4 = new Howl({
    src: ['sounds/m_sound4.wav'],
    preload:true,
    onload:checkFullyDone()
});

var lowSample1 = new Howl({
    src: ['sounds/l_sound1.wav'],
    preload:true,
    onload:checkFullyDone()
});
var lowSample2 = new Howl({
    src: ['sounds/l_sound2.wav'],
    preload:true,
    onload:checkFullyDone()
});
var lowSample3 = new Howl({
    src: ['sounds/l_sound3.wav'],
    preload:true,
    onload:checkFullyDone()
});
var lowSample4 = new Howl({
    src: ['sounds/l_sound4.wav'],
    preload:true,
    onload:checkFullyDone()
});

function checkFullyDone(){
    console.log('.');
    counter++;
    if(counter == limit){
        console.log('all done');
    }
}