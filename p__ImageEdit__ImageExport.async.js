(self.webpackChunk=self.webpackChunk||[]).push([[682],{56526:function(K,U,t){"use strict";t.r(U);var d=t(26068),F=t.n(d),p=t(48305),l=t.n(p),E=t(67825),M=t.n(E),b=t(15558),y=t.n(b),v=t(93236),x=t(53531),j=t(97629),k=t.n(j),n=t(62086),A=["src","stageWidth","stageHeight","rotation","setImgRef","onDimensionsChange"],L="https://qn.huat.xyz/mac/202406051057150.jpeg";function S(_,a,D){var m=D*Math.PI/180,g=[{x:-_/2,y:-a/2},{x:_/2,y:-a/2},{x:_/2,y:a/2},{x:-_/2,y:a/2}],u=g.map(function(e){return{x:e.x*Math.cos(m)-e.y*Math.sin(m),y:e.x*Math.sin(m)+e.y*Math.cos(m)}}),P=Math.min.apply(Math,y()(u.map(function(e){return e.x}))),h=Math.max.apply(Math,y()(u.map(function(e){return e.x}))),I=Math.min.apply(Math,y()(u.map(function(e){return e.y}))),B=Math.max.apply(Math,y()(u.map(function(e){return e.y}))),R=h-P,r=B-I;return{newWidth:R,newHeight:r}}var H=function(a){var D=a.src,m=a.stageWidth,g=a.stageHeight,u=a.rotation,P=a.setImgRef,h=a.onDimensionsChange,I=M()(a,A),B=k()(D,"anonymous"),R=l()(B,1),r=R[0],e=(0,v.useRef)(null),o=(0,v.useState)({width:0,height:0,x:0,y:0}),s=l()(o,2),i=s[0],c=s[1];return(0,v.useEffect)(function(){if(r){var f=Math.min(m,g),w=Math.max(r.width,r.height),C=f/w*.8,W=r.width*C,T=r.height*C;c({width:W,height:T,x:m/2,y:g/2}),h({width:W,height:T,ratio:C})}P(e)},[r,m,g,P]),(0,n.jsx)(x.Ee,F()(F()({ref:e,image:r,rotation:u,offsetX:i.width/2,offsetY:i.height/2},i),I))};function z(){var _={},a=600,D=500,m=(0,v.useState)(0),g=l()(m,2),u=g[0],P=g[1],h=(0,v.useRef)(null),I=function(o){h.current=o.current},B=function(o){console.log("Updated dimensions:",o),_=o},R=function(o,s,i){var c=document.createElement("canvas");c.width=s,c.height=i;var f=c.getContext("2d");return f.translate(s/2,i/2),f.rotate(u*Math.PI/180),f.drawImage(o,-s/2,-i/2),c.toDataURL()},r=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;if(h.current){var s;if(o===3){var i=h.current.attrs.image,c=i.width,f=i.height;console.log("originalWidth",c),console.log("originalHeight",f),s=R(i,c,f)}else if(o===2){console.log("rotationPic",_,u);var w=h.current.attrs.image,C=S(_.width,_.height,u);console.log("size",C);var W=C.newWidth*(1+_.ratio),T=C.newHeight*(1+_.ratio);s=R(w,W,T)}else s=h.current.toDataURL();var X={3:"rotated-original-size-image.png",2:"rotated-original-size-ratio.png",1:"rotated-image.png"},O=document.createElement("a");O.download=X[o],O.href=s,document.body.appendChild(O),O.click(),document.body.removeChild(O)}};return(0,n.jsxs)("div",{style:{width:"600px",height:"auto",border:"1px solid black"},children:[(0,n.jsx)("input",{type:"range",min:"0",max:"360",value:u,onChange:function(o){return P(o.target.value)},style:{marginBottom:"10px"}}),(0,n.jsx)("button",{type:"button",onClick:function(){return r()},style:{marginBottom:"10px"},children:"\u5BFC\u51FA\u56FE\u7247"}),(0,n.jsx)("button",{type:"button",onClick:function(){return r(3)},style:{marginBottom:"10px"},children:"\u5BFC\u51FA\u539F\u5C3A\u5BF8\u65CB\u8F6C\u56FE"}),(0,n.jsx)("button",{type:"button",onClick:function(){return r(2)},style:{marginBottom:"10px"},children:"\u5BFC\u51FA\u539F\u6BD4\u4F8B\u65CB\u8F6C\u56FE"}),(0,n.jsx)(x.Hf,{width:a,height:D,children:(0,n.jsx)(x.mh,{children:(0,n.jsx)(H,{src:L,stageWidth:a,stageHeight:D,rotation:Number(u),setImgRef:I,onDimensionsChange:B})})})]})}U.default=z},97629:function(K,U,t){var d=t(93236);K.exports=function(p,l,E){const M=d.useRef("loading"),b=d.useRef(),[y,v]=d.useState(0),x=d.useRef(),j=d.useRef(),k=d.useRef();return(x.current!==p||j.current!==l||k.current!==E)&&(M.current="loading",b.current=void 0,x.current=p,j.current=l,k.current=E),d.useLayoutEffect(function(){if(!p)return;var n=document.createElement("img");function A(){M.current="loaded",b.current=n,v(Math.random())}function L(){M.current="failed",b.current=void 0,v(Math.random())}return n.addEventListener("load",A),n.addEventListener("error",L),l&&(n.crossOrigin=l),E&&(n.referrerPolicy=E),n.src=p,function(){n.removeEventListener("load",A),n.removeEventListener("error",L)}},[p,l,E]),[b.current,M.current]}}}]);
