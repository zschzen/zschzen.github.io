import{Interactive as e}from"https://vectorjs.org/index.js";let margin=32,interactive=new e("interactive");interactive.border=!1;let PorM=1,radio=interactive.radioControl(-275,-125,["a + b","a - b"]);radio.onchange=()=>{PorM=0==radio.index?1:-1,console.log(lineDLabel),lineDLabel.contents=1==PorM?"+b":"-b",updateResultingLinePos()},interactive.originX=interactive.width/2+margin,interactive.originY=interactive.height/2+margin,interactive.width+=2*margin,interactive.height+=2*margin,interactive.style.overflow="hidden";let point=interactive.control(0,0),pointB=interactive.control(0,0),xAxis=interactive.line(-interactive.width/2+margin,0,interactive.width/2-margin,0),yAxis=interactive.line(0,-interactive.height/2+margin,0,interactive.height/2-margin);xAxis.style.stroke="red",yAxis.style.stroke="green";let rectangle=interactive.rectangle(xAxis.x1,yAxis.y1,xAxis.x2-xAxis.x1,yAxis.y2-yAxis.y1);rectangle.classList.add("default"),point.constrainWithinBox(xAxis.x1,yAxis.y1,xAxis.x2,yAxis.y2),pointB.constrainWithinBox(xAxis.x1,yAxis.y1,xAxis.x2,yAxis.y2);let line=interactive.line(0,0,0,0),lineB=interactive.line(0,0,0,0),lineC=interactive.line(0,0,0,0),lineD=interactive.line(0,0,0,0),lineLabel=interactive.text(0,0,"a"),lineBLabel=interactive.text(0,0,"b"),lineCLabel=interactive.text(0,0,"c"),lineDLabel=interactive.text(0,0,"+b");lineC.style.stroke="blue",lineD.style.stroke=lineB.style.stroke,lineD.style.strokeOpacity=".6",lineDLabel.style.strokeWidth=.25,lineCLabel.style.strokeWidth=.25;let updateResultingLinePos=()=>{lineC.x2=line.x2+lineB.x2*PorM,lineC.y2=line.y2+lineB.y2*PorM,lineD.x1=line.x2,lineD.y1=line.y2,lineD.x2=lineC.x2,lineD.y2=lineC.y2,lineCLabel.x=lineC.x2/2-5,lineCLabel.y=lineC.y2/2-5,lineDLabel.x=(lineC.x2+line.x2)/2+5,lineDLabel.y=(lineC.y2+line.y2)/2+5},boxConstraint=point.constrain,updatePointXY=e=>{let t;return[50*Math.round(e.x/50),50*Math.round(e.y/50)]};point.constrain=(e,t)=>{let[n,r]=updatePointXY(t),l=boxConstraint({x:n,y:r},{x:n,y:r}),a=xAxis.x1,x=yAxis.y1,s=xAxis.x2,y=yAxis.y2;return l.x=Math.min(Math.max(l.x,a),s),l.y=Math.min(Math.max(l.y,x),y),line.x2=l.x,line.y2=l.y,lineLabel.x=l.x/2-5,lineLabel.y=l.y/2-5,updateResultingLinePos(),{x:l.x,y:l.y}},pointB.constrain=(e,t)=>{let[n,r]=updatePointXY(t),l=boxConstraint({x:n,y:r},{x:n,y:r});return lineB.x2=n,lineB.y2=r,lineBLabel.x=n/2-5,lineBLabel.y=r/2-5,updateResultingLinePos(),{x:l.x,y:l.y}};let marker=interactive.marker(10,5,10,10);marker.path("M 0 0 L 10 5 L 0 10 z").style.fill="#404040",marker.setAttribute("orient","auto-start-reverse"),line.setAttribute("marker-end",`url(#${marker.id})`),lineB.setAttribute("marker-end",`url(#${marker.id})`),lineC.setAttribute("marker-end",`url(#${marker.id})`),xAxis.setAttribute("marker-end",`url(#${marker.id})`),xAxis.setAttribute("marker-start",`url(#${marker.id})`),yAxis.setAttribute("marker-end",`url(#${marker.id})`),yAxis.setAttribute("marker-start",`url(#${marker.id})`);let xAxisLabel=interactive.text(xAxis.x2+16,xAxis.y2,"X");xAxisLabel.setAttribute("alignment-baseline","middle"),xAxisLabel.style.stroke="red";let yAxisLabel=interactive.text(yAxis.x1,yAxis.y1-16,"Y");yAxisLabel.setAttribute("text-anchor","middle"),yAxisLabel.style.stroke="green";let w=50,h=50;for(let i=-6;i<=6;i++){let t=i*w,n=interactive.text(t,150+margin/2,i.toString());n.style.textAnchor="middle",n.style.alignmentBaseline="middle";let r=interactive.line(t,-150,t,150);r.style.stroke="red",r.style.strokeOpacity=".2"}for(let i=-3;i<=3;i++){let l=i*h,a=interactive.text(-315,l,(-i).toString());a.style.textAnchor="middle",a.style.alignmentBaseline="middle";let x=interactive.line(-300,l,300,l);x.style.stroke="green",x.style.strokeOpacity=".2"}point.translate(100,-50),pointB.translate(-50,-50),interactive.circle(0,0,3).style.fill="#404040";