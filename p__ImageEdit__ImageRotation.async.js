(self.webpackChunk=self.webpackChunk||[]).push([[401],{12097:function(k,j,e){"use strict";e.r(j);var a=e(97857),R=e.n(a),i=e(5574),o=e.n(i),d=e(13769),m=e.n(d),r=e(62435),c=e(79566),v=e(84420),g=e.n(v),n=e(86074),f=["src","stageWidth","stageHeight","rotation"],_="https://qn.huat.xyz/mac/202406051057150.jpeg",E=function(u){var D=u.src,l=u.stageWidth,h=u.stageHeight,C=u.rotation,M=m()(u,f),L=g()(D,"anonymous"),O=o()(L,1),t=O[0],x=(0,r.useState)({width:0,height:0,x:0,y:0}),s=o()(x,2),I=s[0],B=s[1];return(0,r.useEffect)(function(){if(t){var p=Math.min(l,h),A=Math.max(t.width,t.height),W=p/A*.8,T=t.width*W,U=t.height*W;B({width:T,height:U,x:l/2,y:h/2})}},[t,l,h]),(0,n.jsx)(c.Ee,R()(R()({image:t,rotation:C,offsetX:I.width/2,offsetY:I.height/2},I),M))};function P(){var b=600,u=500,D=(0,r.useState)(0),l=o()(D,2),h=l[0],C=l[1],M=(0,r.useRef)(null),L=function(){var t=M.current,x=t.toDataURL(),s=document.createElement("a");s.download="rotated-image.png",s.href=x,document.body.appendChild(s),s.click(),document.body.removeChild(s)};return(0,n.jsxs)("div",{style:{width:"600px",height:"auto",border:"1px solid black"},children:[(0,n.jsx)("input",{type:"range",min:"0",max:"360",value:h,onChange:function(t){return C(t.target.value)},style:{marginBottom:"10px"}}),(0,n.jsx)("button",{type:"button",onClick:L,style:{marginBottom:"10px"},children:"\u5BFC\u51FA\u753B\u5E03"}),(0,n.jsx)(c.Hf,{ref:M,width:b,height:u,children:(0,n.jsx)(c.mh,{children:(0,n.jsx)(E,{src:_,stageWidth:b,stageHeight:u,rotation:Number(h)})})})]})}j.default=P},84420:function(k,j,e){var a=e(62435);k.exports=function(i,o,d){const m=a.useRef("loading"),r=a.useRef(),[c,v]=a.useState(0),g=a.useRef(),n=a.useRef(),f=a.useRef();return(g.current!==i||n.current!==o||f.current!==d)&&(m.current="loading",r.current=void 0,g.current=i,n.current=o,f.current=d),a.useLayoutEffect(function(){if(!i)return;var _=document.createElement("img");function E(){m.current="loaded",r.current=_,v(Math.random())}function P(){m.current="failed",r.current=void 0,v(Math.random())}return _.addEventListener("load",E),_.addEventListener("error",P),o&&(_.crossOrigin=o),d&&(_.referrerPolicy=d),_.src=i,function(){_.removeEventListener("load",E),_.removeEventListener("error",P)}},[i,o,d]),[r.current,m.current]}}}]);
