/* Intro overlay component - Rosendo De Los Rios Moreno */

function useTimeout(cb, ms, deps) {
  React.useEffect(function() {
    var id = setTimeout(cb, ms);
    return function() { clearTimeout(id); };
  }, deps);
}

/* Variant A: Liquid glass orb */
function IntroLiquid(props) {
  var accent      = props.accent;
  var name        = props.name;
  var role        = props.role;
  var enterLabel  = props.enterLabel;
  var onDone      = props.onDone;
  var photo       = props.photo;

  var es = React.useState(false);
  var expanding = es[0], setExpanding = es[1];

  function handleEnter() {
    if (expanding) return;
    setExpanding(true);
    setTimeout(onDone, 900);
  }

  return (
    <div className="intro-stage intro-liq-stage">

      {/* Ambient light blobs */}
      <div className="intro-liq-glow glow-1" />
      <div className="intro-liq-glow glow-2" />

      {/* ── Glass orb ── */}
      <div className="intro-orb-wrap">

        <div className={"intro-orb " + (expanding ? "expanding" : "")}>
          {/* Photo inside the blob — clipped by overflow:hidden + border-radius */}
          {photo
            ? <img src={photo} className="intro-orb-photo" alt={name} />
            : <div className="intro-orb-initials">{name.charAt(0)}</div>
          }
          {/* Glass gradient overlay on top of the photo */}
          <div className="intro-orb-glass" />
        </div>

        {/* Pulsing ring */}
        <div className="intro-orb-ping" />
        {/* Orbiting dot rings */}
        <div className="intro-orb-ring-1" />
        <div className="intro-orb-ring-2" />
      </div>

      {/* Name + role below the orb */}
      <div className="intro-liq-center show">
        <div className="intro-liq-name">{name}</div>
        <div className="intro-liq-role show">{role}</div>
      </div>

      {/* Enter button */}
      <button className="intro-enter show" onClick={handleEnter}
        style={{ position:"relative", bottom:"auto", left:"auto", transform:"none" }}>
        {enterLabel} →
      </button>

      <div className="intro-skip mono" onClick={handleEnter}>SKIP</div>
    </div>
  );
}

/* Variant B: Dot sphere */
function IntroSphere(props) {
  var accent=props.accent, name=props.name, role=props.role,
      enterLabel=props.enterLabel, onDone=props.onDone;
  var progressRef = React.useRef(0);
  var s = React.useState(0); var phase=s[0], setPhase=s[1];
  React.useEffect(function() {
    var t0=performance.now(), raf;
    function tick(now) {
      progressRef.current=Math.min(1,(now-t0)/1700);
      if(progressRef.current>=1){ setPhase(1); return; }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);
    return function(){ cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="intro-stage">
      <div className="intro-sphere-holder"><DotSphere mode="intro" accent={accent} progressRef={progressRef} /></div>
      <div className={"intro-center "+(phase?"show":"")}>
        <div className="intro-name">{name}</div>
        <div className={"intro-role mono "+(phase?"show":"")}>{role}</div>
      </div>
      <button className={"intro-enter "+(phase?"show":"")} onClick={onDone}>{enterLabel} →</button>
    </div>
  );
}

/* Variant C: Wave */
function IntroWave(props) {
  var accent=props.accent, name=props.name, role=props.role,
      enterLabel=props.enterLabel, onDone=props.onDone;
  var canvasRef=React.useRef(null);
  var s=React.useState(0); var phase=s[0],setPhase=s[1];
  React.useEffect(function() {
    var canvas=canvasRef.current, ctx=canvas.getContext("2d");
    var w,h,dpr=Math.min(window.devicePixelRatio||1,2),raf;
    var rgb=hexToRgb(accent); var ar=rgb[0],ag=rgb[1],ab=rgb[2];
    function resize(){ var r=canvas.parentElement.getBoundingClientRect();
      w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;
      canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);}
    resize(); window.addEventListener("resize",resize);
    var t0=performance.now();
    function frame(now){
      var t=(now-t0)/1000; ctx.clearRect(0,0,w,h);
      var grow=Math.min(1,t/1.4),ease=1-Math.pow(1-grow,3),cx=w/2,cy=h/2;
      for(var l=0;l<5;l++){
        var amp=(h*0.18)*ease*(1-l*0.13),ph=t*1.6+l*0.7,span=w*ease;
        ctx.beginPath();
        for(var x=-span/2;x<=span/2;x+=4){
          var k=x/w,env=Math.exp(-Math.pow(k*3.2,2)),y=cy+Math.sin(k*22+ph)*amp*env;
          if(x===-span/2) ctx.moveTo(cx+x,y); else ctx.lineTo(cx+x,y);
        }
        ctx.strokeStyle="rgba(180,200,255,"+(0.5-l*0.08)*ease+")";ctx.lineWidth=1.4;ctx.stroke();
      }
      ctx.beginPath();
      var hs=w*ease/2;
      for(var x2=-hs;x2<=hs;x2+=3){
        var k2=x2/w,env2=Math.exp(-Math.pow(k2*3,2)),y2=cy+Math.sin(k2*16+t*2.2)*(h*0.1)*ease*env2;
        if(x2===-hs) ctx.moveTo(cx+x2,y2); else ctx.lineTo(cx+x2,y2);
      }
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+","+(0.9*ease)+")";
      ctx.lineWidth=2;ctx.shadowColor=accent;ctx.shadowBlur=18;ctx.stroke();ctx.shadowBlur=0;
      raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    return function(){ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[]);
  useTimeout(function(){ setPhase(1); },1300,[]);
  return (
    <div className="intro-stage">
      <canvas ref={canvasRef} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} />
      <div className={"intro-center "+(phase?"show":"")}><div className="intro-name">{name}</div><div className={"intro-role mono "+(phase?"show":"")}>{role}</div></div>
      <button className={"intro-enter "+(phase?"show":"")} onClick={onDone}>{enterLabel} →</button>
    </div>
  );
}

/* Variant D: Robotic arm */
function RoboticArmCanvas(props) {
  var accent = props.accent;
  var canvasRef = React.useRef(null);
  React.useEffect(function() {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    var w=0, h=0, dpr=Math.min(window.devicePixelRatio||1,1.5), raf;
    var rgb=hexToRgb(accent); var ar=rgb[0],ag=rgb[1],ab=rgb[2];
    var mouseX=null, mouseY=null;
    var a1=-Math.PI*0.55, a2=Math.PI*0.5, gripOpen=0.3, scanY=0, clock=0;

    function resize(){
      var rect=canvas.getBoundingClientRect();
      w=rect.width; h=rect.height;
      canvas.width=w*dpr; canvas.height=h*dpr;
      canvas.style.width=w+"px"; canvas.style.height=h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function onMove(e){ var rect=canvas.getBoundingClientRect(); mouseX=e.clientX-rect.left; mouseY=e.clientY-rect.top; }
    function arm(){ var L1=Math.min(w,h)*0.27,L2=L1*0.74; return {L1:L1,L2:L2,bx:w*0.5,by:h*0.73}; }
    function solveIK(tx,ty,bx,by,L1,L2){
      var dx=tx-bx,dy=ty-by,D=Math.sqrt(dx*dx+dy*dy);
      if(D<1)return null;
      var s=Math.min(1,(L1+L2)*0.985/D); dx*=s;dy*=s;D*=s;
      var cos2=Math.max(-1,Math.min(1,(D*D-L1*L1-L2*L2)/(2*L1*L2)));
      var sign=(tx>=bx)?1:-1;
      var t2=sign*Math.acos(cos2);
      var t1=Math.atan2(dy,dx)-Math.atan2(L2*Math.sin(t2),L1+L2*Math.cos(t2));
      return {t1:t1,t2:t2};
    }
    function lerpA(a,b,k){ var d=b-a; while(d>Math.PI)d-=Math.PI*2; while(d<-Math.PI)d+=Math.PI*2; return a+d*k; }
    function rRect(x,y,rw,rh,r){
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+rw-r,y); ctx.arcTo(x+rw,y,x+rw,y+r,r);
      ctx.lineTo(x+rw,y+rh-r); ctx.arcTo(x+rw,y+rh,x+rw-r,y+rh,r);
      ctx.lineTo(x+r,y+rh); ctx.arcTo(x,y+rh,x,y+rh-r,r);
      ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
    }
    function drawBg(){
      var step=56;
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.05)"; ctx.lineWidth=1;
      for(var x=0;x<w;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
      for(var y=0;y<h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
      scanY=(scanY+0.5)%h;
      var sg=ctx.createLinearGradient(0,scanY-50,0,scanY+50);
      sg.addColorStop(0,"rgba("+ar+","+ag+","+ab+",0)");
      sg.addColorStop(0.5,"rgba("+ar+","+ag+","+ab+",0.025)");
      sg.addColorStop(1,"rgba("+ar+","+ag+","+ab+",0)");
      ctx.fillStyle=sg; ctx.fillRect(0,scanY-50,w,100);
    }
    function drawLink(x1,y1,x2,y2,thick){
      var dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy);
      if(len<1)return;
      var nx=-dy/len,ny=dx/len,hw=thick/2,tw=thick*0.32;
      ctx.shadowColor="rgba("+ar+","+ag+","+ab+",0.35)"; ctx.shadowBlur=16;
      ctx.beginPath();
      ctx.moveTo(x1+nx*hw,y1+ny*hw); ctx.lineTo(x2+nx*tw,y2+ny*tw);
      ctx.lineTo(x2-nx*tw,y2-ny*tw); ctx.lineTo(x1-nx*hw,y1-ny*hw); ctx.closePath();
      var g=ctx.createLinearGradient(x1+nx*hw,y1+ny*hw,x1-nx*hw,y1-ny*hw);
      g.addColorStop(0,"rgba(28,48,84,0.97)"); g.addColorStop(0.38,"rgba(48,82,138,0.93)");
      g.addColorStop(0.62,"rgba(34,62,108,0.93)"); g.addColorStop(1,"rgba(14,28,54,0.97)");
      ctx.fillStyle=g; ctx.fill();
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.38)"; ctx.lineWidth=1.2; ctx.stroke();
      ctx.shadowBlur=0;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.18)"; ctx.lineWidth=1.5; ctx.stroke();
      for(var s=1;s<=3;s++){
        var f=s/4,rx=x1+dx*f,ry=y1+dy*f;
        [0.38,-0.38].forEach(function(sd){
          ctx.beginPath(); ctx.arc(rx+nx*hw*sd,ry+ny*hw*sd,2.2,0,Math.PI*2);
          ctx.fillStyle="rgba("+ar+","+ag+","+ab+",0.5)"; ctx.fill();
        });
      }
    }
    function drawJoint(x,y,r){
      var glow=ctx.createRadialGradient(x,y,0,x,y,r*3.5);
      glow.addColorStop(0,"rgba("+ar+","+ag+","+ab+",0.3)");
      glow.addColorStop(1,"rgba("+ar+","+ag+","+ab+",0)");
      ctx.beginPath(); ctx.arc(x,y,r*3.5,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
      var jg=ctx.createRadialGradient(x-r*0.3,y-r*0.3,0,x,y,r);
      jg.addColorStop(0,"rgba(110,170,255,0.95)"); jg.addColorStop(0.5,"rgba("+ar+","+ag+","+ab+",0.9)"); jg.addColorStop(1,"rgba(10,28,66,0.95)");
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=jg; ctx.fill();
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.9)"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(x-r*0.22,y-r*0.22,r*0.32,0,Math.PI*2); ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.fill();
      ctx.beginPath(); ctx.arc(x,y,r+7,clock*1.8,clock*1.8+Math.PI*1.3);
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.35)"; ctx.lineWidth=1.5; ctx.setLineDash([4,5]); ctx.stroke(); ctx.setLineDash([]);
    }
    function drawBase(bx,by){
      ctx.fillStyle="rgba(16,30,55,0.98)"; ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.35)"; ctx.lineWidth=1;
      rRect(bx-22,by-26,44,26,4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx-22,by-26); ctx.lineTo(bx+22,by-26);
      ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.7)"; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle="rgba(10,20,40,0.98)"; ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.5)"; ctx.lineWidth=1.5;
      rRect(bx-44,by+2,88,18,4); ctx.fill(); ctx.stroke();
      [-30,30].forEach(function(ox){
        ctx.beginPath(); ctx.arc(bx+ox,by+2+9,4,0,Math.PI*2);
        ctx.fillStyle="rgba("+ar+","+ag+","+ab+",0.45)"; ctx.fill();
      });
      var led=0.5+0.5*Math.sin(clock*4);
      ctx.beginPath(); ctx.arc(bx,by+11,3.5,0,Math.PI*2);
      ctx.fillStyle="rgba("+ar+","+ag+","+ab+","+(0.5+led*0.5)+")";
      ctx.shadowColor=accent; ctx.shadowBlur=10*led; ctx.fill(); ctx.shadowBlur=0;
    }
    function drawGripper(x,y,angle,open){
      ctx.save(); ctx.translate(x,y); ctx.rotate(angle);
      var fLen=30,oa=open*0.38;
      ctx.fillStyle="rgba(18,38,68,0.97)"; ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.55)"; ctx.lineWidth=1;
      rRect(-16,-9,16,18,3); ctx.fill(); ctx.stroke();
      ctx.save(); ctx.rotate(-oa);
      ctx.beginPath(); ctx.moveTo(0,-4); ctx.lineTo(fLen,-5); ctx.lineTo(fLen+7,-2); ctx.lineTo(0,-1);
      ctx.fillStyle="rgba(28,54,94,0.97)"; ctx.fill(); ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.65)"; ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.rotate(oa);
      ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(fLen,5); ctx.lineTo(fLen+7,2); ctx.lineTo(0,1);
      ctx.fillStyle="rgba(28,54,94,0.97)"; ctx.fill(); ctx.strokeStyle="rgba("+ar+","+ag+","+ab+",0.65)"; ctx.stroke();
      ctx.restore();
      var tg=ctx.createRadialGradient(fLen,0,0,fLen,0,14);
      tg.addColorStop(0,"rgba("+ar+","+ag+","+ab+",0.8)"); tg.addColorStop(1,"rgba("+ar+","+ag+","+ab+",0)");
      ctx.beginPath(); ctx.arc(fLen,0,14,0,Math.PI*2); ctx.fillStyle=tg; ctx.fill();
      ctx.restore();
    }
    function drawHUD(a1,a2,j3x,j3y,bx,by){
      var d2=function(r){ return (r*180/Math.PI).toFixed(1)+"°"; };
      var pad=22;
      ctx.font='10px "JetBrains Mono",monospace'; ctx.fillStyle="rgba("+ar+","+ag+","+ab+",0.5)"; ctx.textAlign="left";
      ctx.fillText("J1: "+d2(a1),pad,h-56);
      ctx.fillText("J2: "+d2(a2),pad,h-40);
      ctx.fillText("EE ("+Math.round(j3x-bx)+", "+Math.round(-(j3y-by))+")",pad,h-22);
      var blink=Math.sin(clock*5)>0;
      ctx.textAlign="right"; ctx.font='9px "JetBrains Mono",monospace';
      ctx.fillStyle="rgba("+ar+","+ag+","+ab+","+(blink?0.8:0.3)+")";
      ctx.fillText("● IK ACTIVE",w-pad,28); ctx.textAlign="left";
    }
    function frame(now){
      clock=(now||0)/1000; ctx.clearRect(0,0,w,h); drawBg();
      var p=arm(),L1=p.L1,L2=p.L2,bx=p.bx,by=p.by;
      var tx=mouseX!==null?mouseX:bx+(L1*0.6)*Math.cos(clock*0.6);
      var ty=mouseY!==null?mouseY:by-(L1*0.55)+(L1*0.3)*Math.sin(clock*1.2);
      var ik=solveIK(tx,ty,bx,by,L1,L2);
      if(ik){ a1=lerpA(a1,ik.t1,0.08); a2=lerpA(a2,ik.t2,0.08); }
      var j2x=bx+L1*Math.cos(a1),j2y=by+L1*Math.sin(a1);
      var j3x=j2x+L2*Math.cos(a1+a2),j3y=j2y+L2*Math.sin(a1+a2);
      var dist=Math.sqrt((tx-j3x)*(tx-j3x)+(ty-j3y)*(ty-j3y));
      gripOpen+=(( dist<L1*0.18?0.85:0.25)-gripOpen)*0.06;
      drawLink(bx,by,j2x,j2y,32); drawLink(j2x,j2y,j3x,j3y,22);
      drawBase(bx,by);
      drawJoint(bx,by,18); drawJoint(j2x,j2y,13);
      drawGripper(j3x,j3y,a1+a2,gripOpen);
      drawHUD(a1,a2,j3x,j3y,bx,by);
      raf=requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("mousemove",onMove,{passive:true});
    raf=requestAnimationFrame(frame);
    return function(){ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); window.removeEventListener("mousemove",onMove); };
  }, [accent]);
  return <canvas ref={canvasRef} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} />;
}

function IntroRobot(props) {
  var accent=props.accent, name=props.name, role=props.role, enterLabel=props.enterLabel, onDone=props.onDone;
  return (
    <div className="intro-stage intro-robot-stage">
      <RoboticArmCanvas accent={accent} />
      <div className="intro-robot-title">
        <div className="intro-liq-name">{name}</div>
        <div className="intro-liq-role show">{role}</div>
      </div>
      <button className="intro-enter show" onClick={onDone}>{enterLabel} →</button>
      <div className="intro-skip mono" onClick={onDone}>SKIP</div>
    </div>
  );
}

/* Intro orchestrator */
function Intro(props) {
  var variant=props.variant, accent=props.accent, name=props.name,
      role=props.role, enterLabel=props.enterLabel, onDone=props.onDone,
      photo=props.photo;
  var ls=React.useState(false); var leaving=ls[0],setLeaving=ls[1];
  var finish=React.useCallback(function(){
    setLeaving(true); setTimeout(onDone,800);
  },[onDone]);
  var timeout = variant==="robot"?6000 : variant==="liquid"?5500 : 4000;
  useTimeout(function(){ if(!leaving) finish(); }, timeout, [variant]);
  var c={accent:accent,name:name,role:role,enterLabel:enterLabel,onDone:finish,photo:photo};
  return (
    <div className={"intro-overlay "+(leaving?"leaving":"")}>
      {variant==="liquid" && <IntroLiquid accent={c.accent} name={c.name} role={c.role} enterLabel={c.enterLabel} onDone={c.onDone} photo={c.photo} />}
      {variant==="robot"  && <IntroRobot  accent={c.accent} name={c.name} role={c.role} enterLabel={c.enterLabel} onDone={c.onDone} />}
      {variant==="sphere" && <IntroSphere accent={c.accent} name={c.name} role={c.role} enterLabel={c.enterLabel} onDone={c.onDone} />}
      {variant==="wave"   && <IntroWave   accent={c.accent} name={c.name} role={c.role} enterLabel={c.enterLabel} onDone={c.onDone} />}
      {variant!=="liquid" && <div className="intro-skip mono" onClick={finish}>SKIP</div>}
    </div>
  );
}

window.Intro=Intro;
