(self.webpackChunk=self.webpackChunk||[]).push([[572],{53613:function(P,C,t){"use strict";t.r(C),t.d(C,{default:function(){return A}});var a=t(26068),L=t.n(a),i=t(48305),s=t.n(i),d=t(67825),c=t.n(d),u=t(93236),m=t(53531),f=t(97629),l=t.n(f),e=t(62086),x=["src","stageWidth","stageHeight"],r="https://qn.huat.xyz/mac/202406051057150.jpeg",j=function(n){var g=n.src,o=n.stageWidth,v=n.stageHeight,I=c()(n,x),R=l()(g),D=s()(R,1),h=D[0],K=(0,u.useState)({width:0,height:0,x:0,y:0}),y=s()(K,2),U=y[0],w=y[1];return(0,u.useEffect)(function(){if(h){var H=Math.min(o/h.width,v/h.height),M=h.width*H,T=h.height*H,B=(o-M)/2,F=(v-T)/2;w({width:M,height:T,x:B,y:F})}},[h,o,v]),(0,e.jsx)(m.Ee,L()(L()({image:h},U),I))},E=function(n){var g=n.width,o=n.height,v=n.src,I=g,R=o;return(0,e.jsx)("div",{style:{width:"600px",height:"500px",border:"1px solid black"},children:(0,e.jsx)(m.Hf,{width:I,height:R,children:(0,e.jsx)(m.mh,{children:(0,e.jsx)(j,{src:v,stageWidth:I,stageHeight:R})})})})},S=E,z=function(){var n="https://qn.huat.xyz/mac/202406051057150.jpeg",g=700,o=500;return(0,e.jsx)("div",{children:(0,e.jsx)(S,{width:g,height:o,src:n})})},A=z},97629:function(P,C,t){var a=t(93236);P.exports=function(i,s,d){const c=a.useRef("loading"),u=a.useRef(),[m,f]=a.useState(0),l=a.useRef(),e=a.useRef(),x=a.useRef();return(l.current!==i||e.current!==s||x.current!==d)&&(c.current="loading",u.current=void 0,l.current=i,e.current=s,x.current=d),a.useLayoutEffect(function(){if(!i)return;var r=document.createElement("img");function j(){c.current="loaded",u.current=r,f(Math.random())}function E(){c.current="failed",u.current=void 0,f(Math.random())}return r.addEventListener("load",j),r.addEventListener("error",E),s&&(r.crossOrigin=s),d&&(r.referrerPolicy=d),r.src=i,function(){r.removeEventListener("load",j),r.removeEventListener("error",E)}},[i,s,d]),[u.current,c.current]}}}]);