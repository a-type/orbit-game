(this["webpackJsonporbit-game"]=this["webpackJsonporbit-game"]||[]).push([[0],{62:function(e,t,n){"use strict";(function(e){function r(t){var n=new Worker(e,{name:"NoiseWorker",type:void 0});return new Promise((function(e,r){n.addEventListener("message",(function(t){var n=t.data;e(n)})),n.postMessage(t)}))}n.d(t,"a",(function(){return r}))}).call(this,n(85))},63:function(e,t,n){"use strict";(function(e){var r=n(0);function a(e,t,n){var r=new Float32Array(e.length+n);return r.set(e,0),r.set(t.slice(0,n),e.length),r}t.a=function(t){var n=new Worker(e,{name:"CubeWorker",type:void 0});return new Promise((function(e,o){n.addEventListener("message",(function(t){var n=t.data,o=new r.BufferGeometry,i=new Float32Array,c=new Float32Array,s=new Float32Array,u=new Float32Array;n.hasPositions&&(i=a(i,n.positionArray,3*n.count),o.setAttribute("position",new r.BufferAttribute(i,3))),n.hasNormals?(c=a(c,n.normalArray,3*n.count),o.setAttribute("normal",new r.BufferAttribute(c,3))):o.computeVertexNormals(),n.hasColors&&(s=a(s,n.colorArray,3*n.count),o.setAttribute("color",new r.BufferAttribute(s,3))),n.hasUvs&&(u=a(u,n.uvArray,2*n.count),o.setAttribute("uv",new r.BufferAttribute(u,2))),e({geometry:o})})),n.postMessage(t)}))}}).call(this,n(86))},64:function(e,t,n){e.exports={scene:"Scene_scene__3qFsF"}},65:function(e,t,n){e.exports={app:"App_app__1kX79"}},72:function(e,t,n){e.exports=n(87)},76:function(e,t,n){},85:function(e,t,n){e.exports=n.p+"static/js/NoiseWorker.af6f2b86.chunk.worker.js"},86:function(e,t,n){e.exports=n.p+"static/js/CubeWorker.8771c507.chunk.worker.js"},87:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(29),i=n.n(o),c=(n(76),n(37)),s=n(8),u=n(0),l=n(66),f=n(35),h=n(52),m=n(67),p=n(53);function w(){var e=Object(r.useRef)(),t=Object(s.h)(),n=t.scene,o=t.gl,i=t.size,c=t.camera;return Object(r.useEffect)((function(){e.current.setSize(i.width,i.height)}),[i]),Object(s.f)((function(){return e.current.render()}),1),a.a.createElement("effectComposer",{ref:e,args:[o]},a.a.createElement("renderPass",{attachArray:"passes",scene:n,camera:c}))}Object(s.e)({EffectComposer:l.a,ShaderPass:f.a,RenderPass:h.a,UnrealBloomPass:m.a,OutlinePass:p.a});var d=new u.Euler(1.5*Math.PI,0,0);function v(e){var t=e.height,n=r.useMemo((function(){return new u.Vector3(0,t,0)}),[t]);return r.createElement(c.c,{position:n,args:[1e3,1e3],rotation:d},r.createElement("meshPhongMaterial",{attach:"material",color:"blue",transparent:!0,opacity:.8}))}var b=n(17),g=n.n(b),y=n(22),E=n(62),k=n(9),z=n(3),j=n(7),A=n(68),x=n(63),O=n(43),P=n.n(O);function M(e){return a.a.createElement(r.Suspense,{fallback:null},a.a.createElement(S,e))}function C(e){return new u.Vector3(e.x*e.size,e.y*e.size,e.z*e.size)}function S(e){var t=e.coordinate,n=e.generate,o=Object(A.a)(e,["coordinate","generate"]),i=P()(function(){var e=Object(y.a)(g.a.mark((function e(t,n){var r,a,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:return r=e.sent,e.next=5,Object(x.a)({field:r});case 5:return a=e.sent,o=a.geometry,e.abrupt("return",o);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[t,n]),c=t.size,s=Object(r.useMemo)((function(){return new u.Vector3(.5+c/2,.5+c/2,.5+c/2)}),[c]);return a.a.createElement("mesh",Object.assign({geometry:i,position:C(t),castShadow:!0,receiveShadow:!0,scale:s},o))}var B=function(){function e(t,n,r,a){Object(z.a)(this,e),this.x=t,this.y=n,this.z=r,this.size=a}return Object(j.a)(e,[{key:"key",get:function(){return"".concat(this.x,".").concat(this.y,".").concat(this.z,".").concat(this.size)}},{key:"volume",get:function(){return this.size*this.size*this.size}},{key:"worldCoordinate",get:function(){return new u.Vector3(this.x*this.size,this.y*this.size,this.z*this.size)}}]),e}();function W(e,t,n){var a,o,i=(a=e,o=t,[Math.round(a.x/o),Math.round(a.y/o),Math.round(a.z/o)]),c=Object(k.a)(i,3),s=c[0],u=c[1],l=c[2];return Object(r.useMemo)((function(){for(var e=[],r=s-n;r<=s+n;r++)for(var a=u-n;a<=u+n;a++)for(var o=l-n;o<=l+n;o++)e.push(new B(r,a,o,t));return e}),[n,s,u,l,t])}function F(e){var t=W(e.viewPosition,e.chunkSize,e.renderDistance);return a.a.createElement("group",null,e.children(t))}function N(e){return V.apply(this,arguments)}function V(){return(V=Object(y.a)(g.a.mark((function e(t){var n,r,a,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.size+1,r=[t.worldCoordinate.x,t.worldCoordinate.y,t.worldCoordinate.z],e.next=4,Object(E.a)({size:n,offset:r});case 4:return a=e.sent,o=a.field,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var _=new u.MeshToonMaterial({color:"brown",wireframe:!1});function D(e){return r.createElement(F,{chunkSize:32,viewPosition:e.viewPosition,renderDistance:e.renderDistance},(function(e){return e.map((function(e){return r.createElement(M,{key:e.key,coordinate:e,generate:N,material:_})}))}))}var L=n(64),I=n.n(L),J=new u.Vector3(0,0,0),R=function(){return a.a.createElement(s.a,{className:I.a.scene},a.a.createElement(D,{viewPosition:J,renderDistance:2}),a.a.createElement(v,{height:-20}),a.a.createElement("pointLight",{position:[10,10,10]}),a.a.createElement("pointLight",{position:[0,100,0]}),a.a.createElement("ambientLight",{color:"#eee"}),a.a.createElement(c.b,{makeDefault:!0,position:[0,0,10]}),a.a.createElement(c.a,null),a.a.createElement(w,null))},U=n(65),q=n.n(U);var G=function(){return a.a.createElement("div",{className:q.a.app},a.a.createElement(R,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[72,1,2]]]);
//# sourceMappingURL=main.4411c679.chunk.js.map