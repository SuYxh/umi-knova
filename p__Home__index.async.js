(self.webpackChunk=self.webpackChunk||[]).push([[371],{76145:function(E,y,n){"use strict";n.r(y),n.d(y,{default:function(){return M}});var a=n(90930),C=n(35312),r=n(21612),o=n(71230),u=n(35001),i=n(62435),s={title:"title___xIGPY"},e=n(86074),v=function(c){var m=c.name;return(0,e.jsx)(r.Z,{children:(0,e.jsx)(o.Z,{children:(0,e.jsxs)(u.Z.Title,{level:3,className:s.title,children:["\u6B22\u8FCE\u4F7F\u7528 ",(0,e.jsx)("strong",{children:m})," \uFF01"]})})})},f=v,h=f;function g(R){return R.trim()}var t={container:"container___ulS8A"},x=n(5574),d=n.n(x),j=n(79566),I=n(84420),P=n.n(I),S=function(){var c=P()("https://qn.huat.xyz/mac/202405301124678.png","anonymous"),m=d()(c,1),l=m[0],T=(0,i.useState)(0),G=d()(T,2),H=G[0],A=G[1];return(0,e.jsxs)("div",{children:[(0,e.jsx)(j.Hf,{width:window.innerWidth,height:window.innerHeight,children:(0,e.jsx)(j.mh,{children:(0,e.jsx)(j.Ee,{x:window.innerWidth/2,y:window.innerHeight/2,offsetX:l?l.width/2:0,offsetY:l?l.height/2:0,image:l,rotation:H})})}),(0,e.jsx)("input",{type:"range",min:"0",max:"360",value:H,onChange:function(N){return A(Number(N.target.value))},style:{width:300}})]})},F=S,L=function(){var c=(0,C.useModel)("global"),m=c.name;return(0,e.jsx)(a._z,{ghost:!0,children:(0,e.jsxs)("div",{className:t.container,children:[(0,e.jsx)(h,{name:g(m)}),(0,e.jsx)(F,{})]})})},M=L},84420:function(E,y,n){var a=n(62435);E.exports=function(r,o,u){const i=a.useRef("loading"),s=a.useRef(),[e,v]=a.useState(0),f=a.useRef(),h=a.useRef(),g=a.useRef();return(f.current!==r||h.current!==o||g.current!==u)&&(i.current="loading",s.current=void 0,f.current=r,h.current=o,g.current=u),a.useLayoutEffect(function(){if(!r)return;var t=document.createElement("img");function x(){i.current="loaded",s.current=t,v(Math.random())}function d(){i.current="failed",s.current=void 0,v(Math.random())}return t.addEventListener("load",x),t.addEventListener("error",d),o&&(t.crossOrigin=o),u&&(t.referrerPolicy=u),t.src=r,function(){t.removeEventListener("load",x),t.removeEventListener("error",d)}},[r,o,u]),[s.current,i.current]}}}]);
