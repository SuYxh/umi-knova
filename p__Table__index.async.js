"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[311],{67041:function(j,m,a){a.r(m),a.d(m,{waitTime:function(){return v},waitTimePromise:function(){return f}});var h=a(26068),c=a.n(h),E=a(90228),s=a.n(E),P=a(87999),d=a.n(P),T=a(6579),g=a(68106),D=a(38367),M=a(69294),O=a(60432),b=a(67873),p=a(48063),C=a(14138),y=a(96529),I=a(93236),o=a(62086),f=function(){var _=d()(s()().mark(function t(){var e,r=arguments;return s()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=r.length>0&&r[0]!==void 0?r[0]:100,n.abrupt("return",new Promise(function(l){setTimeout(function(){l(!0)},e)}));case 2:case"end":return n.stop()}},t)}));return function(){return _.apply(this,arguments)}}(),v=function(){var _=d()(s()().mark(function t(){var e,r=arguments;return s()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=r.length>0&&r[0]!==void 0?r[0]:100,n.next=3,f(e);case 3:case"end":return n.stop()}},t)}));return function(){return _.apply(this,arguments)}}(),R=[{dataIndex:"index",valueType:"indexBorder",width:48},{title:"\u6807\u9898",dataIndex:"title",copyable:!0,ellipsis:!0,tip:"\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29",formItemProps:{rules:[{required:!0,message:"\u6B64\u9879\u4E3A\u5FC5\u586B\u9879"}]}},{disable:!0,title:"\u72B6\u6001",dataIndex:"state",filters:!0,onFilter:!0,ellipsis:!0,valueType:"select",valueEnum:{all:{text:"\u8D85\u957F".repeat(50)},open:{text:"\u672A\u89E3\u51B3",status:"Error"},closed:{text:"\u5DF2\u89E3\u51B3",status:"Success",disabled:!0},processing:{text:"\u89E3\u51B3\u4E2D",status:"Processing"}}},{disable:!0,title:"\u6807\u7B7E",dataIndex:"labels",search:!1,renderFormItem:function(t,e){var r=e.defaultRender;return r(t)},render:function(t,e){return(0,o.jsx)(O.Z,{children:e.labels.map(function(r){var u=r.name,n=r.color;return(0,o.jsx)(b.Z,{color:n,children:u},u)})})}},{title:"\u521B\u5EFA\u65F6\u95F4",key:"showTime",dataIndex:"created_at",valueType:"date",sorter:!0,hideInSearch:!0},{title:"\u521B\u5EFA\u65F6\u95F4",dataIndex:"created_at",valueType:"dateRange",hideInTable:!0,search:{transform:function(t){return{startTime:t[0],endTime:t[1]}}}},{title:"\u64CD\u4F5C",valueType:"option",key:"option",render:function(t,e,r,u){return[(0,o.jsx)("a",{onClick:function(){var l;u==null||(l=u.startEditable)===null||l===void 0||l.call(u,e.id)},children:"\u7F16\u8F91"},"editable"),(0,o.jsx)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",children:"\u67E5\u770B"},"view"),(0,o.jsx)(D.Z,{onSelect:function(){return u==null?void 0:u.reload()},menus:[{key:"copy",name:"\u590D\u5236"},{key:"delete",name:"\u5220\u9664"}]},"actionGroup")]}}],B=function(){var _=d()(s()().mark(function t(e){var r;return s()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,y.Z)("https://proapi.azurewebsites.net/github/issues",{params:e});case 3:return r=n.sent,n.abrupt("return",r.data);case 7:return n.prev=7,n.t0=n.catch(0),n.abrupt("return",{data:[],page:1,success:!1,total:0});case 10:case"end":return n.stop()}},t,null,[[0,7]])}));return function(e){return _.apply(this,arguments)}}();m.default=function(){var _=(0,I.useRef)();return(0,o.jsx)(M.Z,{columns:R,actionRef:_,cardBordered:!0,request:function(){var t=d()(s()().mark(function e(r,u,n){return s()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return console.log(u,n),i.next=3,v(1e3);case 3:return i.abrupt("return",B(r));case 4:case"end":return i.stop()}},e)}));return function(e,r,u){return t.apply(this,arguments)}}(),editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange:function(e){console.log("\u{1F680} ~ file: index.tsx:185 ~ onChange ~ value:",e)}},rowKey:"id",search:{labelWidth:"auto"},options:{setting:{listsHeight:400}},form:{syncToUrl:function(e,r){return r==="get"?c()(c()({},e),{},{created_at:[e.startTime,e.endTime]}):e}},pagination:{pageSize:5,onChange:function(e){return console.log(e)}},dateFormatter:"string",headerTitle:"\u9AD8\u7EA7\u8868\u683C",toolBarRender:function(){return[(0,o.jsx)(p.ZP,{icon:(0,o.jsx)(T.Z,{}),onClick:function(){var r;(r=_.current)===null||r===void 0||r.reload()},type:"primary",children:"\u65B0\u5EFA"},"button"),(0,o.jsx)(C.Z,{menu:{items:[{label:"1st item",key:"1"},{label:"2nd item",key:"1"},{label:"3rd item",key:"1"}]},children:(0,o.jsx)(p.ZP,{children:(0,o.jsx)(g.Z,{})})},"menu")]}})}}}]);
