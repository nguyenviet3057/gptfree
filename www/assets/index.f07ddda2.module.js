var S=(m,o,r)=>new Promise((p,e)=>{var s=a=>{try{f(r.next(a))}catch(d){e(d)}},c=a=>{try{f(r.throw(a))}catch(d){e(d)}},f=a=>a.done?p(a.value):Promise.resolve(a.value).then(s,c);f((r=r.apply(m,o)).next())});import{R as t,C as F,a as b,r as u,P as O,I as T,F as z,B,b as I,c as _,d as J,A as G,S as H,Z as Q,e as Z,f as M,g as j}from"./vendor.ce21cdce.module.js";const D=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}};D();const v=m=>{const{quest:o,ans:r}=m;return t.createElement(F,{className:"card-quiz"},t.createElement(b,{className:"row-quiz"},o),t.createElement(b,{className:"answer row-quiz"},r))},K=()=>{const[m,o]=u.exports.useState(""),[r,p]=u.exports.useState([]),[e,s]=u.exports.useState(""),[c,f]=u.exports.useState([]),[a,d]=u.exports.useState(""),h=u.exports.useRef(null),x=u.exports.useRef(null),N=()=>{const n=x.current;n.scrollTop=n.scrollHeight};u.exports.useEffect(()=>{h.current&&(h.current.style.height="auto",h.current.style.height=h.current.scrollHeight+"px"),N()},[]);const P=n=>{n.target.style.height="auto",n.target.style.height=n.target.scrollHeight+"px",s(n.target.value)},R=n=>S(void 0,null,function*(){const l=n.body.getReader();let i="",y="";for(;;){const{done:L,value:A}=yield l.read();if(L)break;const k=/data: /g;i+=new TextDecoder().decode(A);const g=i.split(k);for(let E=0;E<g.length-1;E++){const C=g[E];C!==""&&(y+=JSON.parse(C).choices[0].delta.content,d(y),N())}i=g[g.length-1]}let w=c;w.push(y.trim()),f(w)}),q=()=>S(void 0,null,function*(){d(""),s(""),o(e);let n=r;n.push(e),p(n),console.log(r);var l=JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"user",content:e}],max_tokens:50,temperature:.5,stream:!0});fetch("https://free.churchless.tech/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:l}).then(i=>R(i)).catch(i=>console.log("error",i))});return t.createElement(O,{ref:x,className:"default"},t.createElement("div",{className:"row row-header"},t.createElement("div",{className:"col text-center"},"GPT Free")),t.createElement("div",{className:"container",style:{padding:"0px"}},t.createElement("div",{className:"container-fluid quiz-content"},r.map((n,l)=>{if(l!=r.length-1)return t.createElement(v,{key:l,quest:r[l],ans:c[l]})}),t.createElement(v,{quest:m,ans:a})),t.createElement("div",{className:"footer row"},t.createElement(T,{className:"p-0"},t.createElement(z.Control,{as:"textarea",rows:1,className:"input-textarea",placeholder:"...",value:e,onChange:P}),t.createElement(B,{className:"button-submit",onClick:q},t.createElement(I,null))))))};_({key:"user",default:{id:"12345678",name:"Zalo",avatar:"ZA"}});const $=()=>t.createElement(J,null,t.createElement(G,null,t.createElement(H,null,t.createElement(Q,null,t.createElement(Z,null,t.createElement(M,{path:"/",element:t.createElement(K,null)})))))),U={title:"GPT Free",headerColor:"#1843EF",textColor:"white",statusBarColor:"#1843EF",leftButton:"back"},V=!1,W=[],X=[],Y=[],ee=["/user","/form","/dynamic-route","/about","/404"];var te={app:U,debug:V,listCSS:W,listSyncJS:X,listAsyncJS:Y,pages:ee};window.APP_CONFIG||(window.APP_CONFIG=te);const se=j(document.getElementById("app"));se.render(t.createElement($));
