"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[680],{3479:function(j,i,e){e.r(i);var M=e(15558),E=e.n(M),g=e(48305),d=e.n(g),s=e(93236),a=e(53531),n=e(62086),P=function(){var D=s.useState("pen"),m=d()(D,2),v=m[0],f=m[1],b=s.useState([]),h=d()(b,2),o=h[0],c=h[1],u=s.useRef(!1),x=function(_){u.current=!0;var r=_.target.getStage().getPointerPosition();c([].concat(E()(o),[{tool:v,points:[r.x,r.y]}]))},C=function(_){if(u.current){var r=_.target.getStage(),p=r.getPointerPosition(),l=o[o.length-1];l.points=l.points.concat([p.x,p.y]),o.splice(o.length-1,1,l),c(o.concat())}},O=function(){u.current=!1};return(0,n.jsxs)("div",{style:{width:"700px",height:"auto",border:"1px solid black"},children:[(0,n.jsxs)("select",{value:v,onChange:function(_){f(_.target.value)},children:[(0,n.jsx)("option",{value:"pen",children:"Pen"}),(0,n.jsx)("option",{value:"eraser",children:"Eraser"})]}),(0,n.jsx)(a.Hf,{width:700,height:500,onMouseDown:x,onMousemove:C,onMouseup:O,children:(0,n.jsxs)(a.mh,{children:[(0,n.jsx)(a.xv,{text:"Just start drawing",x:5,y:30}),o.map(function(t,_){return(0,n.jsx)(a.x1,{points:t.points,stroke:"#df4b26",strokeWidth:5,tension:.5,lineCap:"round",lineJoin:"round",globalCompositeOperation:t.tool==="eraser"?"destination-out":"source-over"},_)})]})})]})};i.default=P}}]);
