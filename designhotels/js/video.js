function videoResizeFn(){
  let winW=window.innerWidth;
  let winH=window.innerHeight;
  let vidH=document.getElementById('mainVideo').clientHeight;
  let vidW=document.getElementById('mainVideo').clientWidth;

  document.querySelector('.m-video').style.width="100%";
  document.querySelector('.m-video').style.height=winH + 'px';

  if(winH > vidH){
    document.getElementById('mainVideo').style.width="auto";
    document.getElementById('mainVideo').style.height="winH+'px";
  }
  if(winW > vidW){
    document.getElementById('mainVideo').style.width=winW+'px';
    document.getElementById('mainVideo').style.height='auto';
}
}

window.addEventListener('resize', videoResizeFn);
videoResizeFn();

let videoPlay='on';
let soundMuted="off";


let mainVideo=document.getElementById('mainVideo');
mainVideo.autoplay=true;
mainVideo.loop=0;
mainVideo.muted=true;

//재생
document.querySelector('.pauseIcon').addEventListener('click', function(){
  if(videoPlay==='on'){
    mainVideo.pause();
    document.querySelector('.pauseIcon i').className = "fas fa-play";
    videoPlay='off'
  }else{
    mainVideo.play();
    document.querySelector('.pauseIcon i').className = "fas fa-pause";
    videoPlay='on'
  }
});

document.addEventListener('keypress', function(e){
  if(e.keyCode === 32){
    e.preventDefault();
    if(videoPlay === "on"){
videoPlay = "off";
mainVideo.pause();
document.querySelector('.pauseIcon i').className = "fas fa-play";
    }else{
      mainVideo.play();
      document.querySelector('.pauseIcon i').className = "fas fa-pause";
      videoPlay='on'
    }
  }
})

//음소거
document.querySelector('.mutedIcon').addEventListener('click', function(){
  if(soundMuted==='off'){
    mainVideo.muted=false;
    document.querySelector('.mutedIcon i').className = "fas fa-volume-up";
    soundMuted='on'
  }else{
    mainVideo.muted=true;
    document.querySelector('.mutedIcon i').className = "fas fa-volume-mute";
    soundMuted='off'
  }
})


document.addEventListener('keypress', function(e){
  if(e.keyCode === 13){
    if(soundMuted==='off'){
      mainVideo.muted=false;
      document.querySelector('.mutedIcon i').className = "fas fa-volume-up";
      soundMuted='on'
    }else{
      mainVideo.muted=true;
      document.querySelector('.mutedIcon i').className = "fas fa-volume-mute";
      soundMuted='off'
    }
  }
})

//어게인

let setId =setInterval(function(){
  if(mainVideo.ended){
    document.querySelector('.m-again').style.display='block';
    videoPlay='off';
  document.querySelector('.pauseIcon i').className = 'fas fa-play';
  clearInterval(setId);
  }
  },100);

  //리플레이
  document.querySelector('.m-again').addEventListener('click', function(){
    videoPlay='on';
    mainVideo.play();
    document.querySelector('.pauseIcon i').className = 'fas fa-pause';
    this.style.display='none';
  })


  //다음섹션이동
 
  let nextTop=document.querySelector('#section2').offsetTop;
  // console.log(nextTop);`

  document.querySelector('.nextIcon').addEventListener('click', function(){
    window.scrollTo({top:nextTop, behavior:'smooth'});
  })
