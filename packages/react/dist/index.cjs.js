"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var o=require("react"),te=require("react-codemirror6"),D=require("@codemirror/view"),I=require("@codemirror/state"),oe=require("@codemirror/lang-javascript"),n=require("@codemirror/highlight"),ae=require("react-hook-inview"),re=require("@strudel.cycles/eval"),ne=require("@strudel.cycles/core/util.mjs"),p=require("@strudel.cycles/tone"),z=require("@strudel.cycles/core"),v=require("@strudel.cycles/midi");function ce(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var f=ce(o);const se="#abb2bf",le="#7d8799",ie="#ffffff",ue="#21252b",P="rgba(0, 0, 0, 0.5)",de="transparent",W="#353a42",fe="rgba(128, 203, 196, 0.2)",F="#ffcc00",ge=D.EditorView.theme({"&":{color:"#ffffff",backgroundColor:de,fontSize:"15px","z-index":11},".cm-content":{caretColor:F,lineHeight:"22px"},".cm-line":{background:"#2C323699"},"&.cm-focused .cm-cursor":{borderLeftColor:F},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":{backgroundColor:fe},".cm-panels":{backgroundColor:ue,color:"#ffffff"},".cm-panels.cm-panels-top":{borderBottom:"2px solid black"},".cm-panels.cm-panels-bottom":{borderTop:"2px solid black"},".cm-searchMatch":{backgroundColor:"#72a1ff59",outline:"1px solid #457dff"},".cm-searchMatch.cm-searchMatch-selected":{backgroundColor:"#6199ff2f"},".cm-activeLine":{backgroundColor:P},".cm-selectionMatch":{backgroundColor:"#aafe661a"},"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bad0f847",outline:"1px solid #515a6b"},".cm-gutters":{background:"#2C323699",color:"#676e95",border:"none"},".cm-activeLineGutter":{backgroundColor:P},".cm-foldPlaceholder":{backgroundColor:"transparent",border:"none",color:"#ddd"},".cm-tooltip":{border:"none",backgroundColor:W},".cm-tooltip .cm-tooltip-arrow:before":{borderTopColor:"transparent",borderBottomColor:"transparent"},".cm-tooltip .cm-tooltip-arrow:after":{borderTopColor:W,borderBottomColor:W},".cm-tooltip-autocomplete":{"& > ul > li[aria-selected]":{backgroundColor:P,color:se}}},{dark:!0}),me=n.HighlightStyle.define([{tag:n.tags.keyword,color:"#c792ea"},{tag:n.tags.operator,color:"#89ddff"},{tag:n.tags.special(n.tags.variableName),color:"#eeffff"},{tag:n.tags.typeName,color:"#f07178"},{tag:n.tags.atom,color:"#f78c6c"},{tag:n.tags.number,color:"#ff5370"},{tag:n.tags.definition(n.tags.variableName),color:"#82aaff"},{tag:n.tags.string,color:"#c3e88d"},{tag:n.tags.special(n.tags.string),color:"#f07178"},{tag:n.tags.comment,color:le},{tag:n.tags.variableName,color:"#f07178"},{tag:n.tags.tagName,color:"#ff5370"},{tag:n.tags.bracket,color:"#a2a1a4"},{tag:n.tags.meta,color:"#ffcb6b"},{tag:n.tags.attributeName,color:"#c792ea"},{tag:n.tags.propertyName,color:"#c792ea"},{tag:n.tags.className,color:"#decb6b"},{tag:n.tags.invalid,color:ie}]),be=[ge,me],B=I.StateEffect.define(),pe=I.StateField.define({create(){return D.Decoration.none},update(e,a){try{for(let c of a.effects)c.is(B)&&(e=D.Decoration.set(c.value.flatMap(u=>(u.context.locations||[]).map(({start:g,end:s})=>{const i=u.context.color||"#FFCA28";let m=a.newDoc.line(g.line).from+g.column,r=a.newDoc.line(s.line).from+s.column;const l=a.newDoc.length;return m>l||r>l?void 0:D.Decoration.mark({attributes:{style:`outline: 1px solid ${i}`}}).range(m,r)})).filter(Boolean),!0));return e}catch{return e}},provide:e=>D.EditorView.decorations.from(e)});function $({value:e,onChange:a,onViewChanged:c,onCursor:u,options:g,editorDidMount:s}){return f.default.createElement(f.default.Fragment,null,f.default.createElement(te.CodeMirror,{onViewChange:c,style:{display:"flex",flexDirection:"column",flex:"1 0 auto"},value:e,onChange:a,extensions:[oe.javascript(),be,pe]}))}function Q(e){const{onEvent:a,onQuery:c,onSchedule:u,ready:g=!0,onDraw:s}=e,[i,m]=o.useState(!1),r=1,l=()=>Math.floor(p.Tone.getTransport().seconds/r),y=(b=l())=>{const w=new z.TimeSpan(b,b+1),S=c?.(new z.State(w))||[];u?.(S,b);const H=w.begin.valueOf();p.Tone.getTransport().cancel(H);const N=(b+1)*r-.5,R=Math.max(p.Tone.getTransport().seconds,N)+.1;p.Tone.getTransport().schedule(()=>{y(b+1)},R),S?.filter(h=>h.part.begin.equals(h.whole?.begin)).forEach(h=>{p.Tone.getTransport().schedule(k=>{a(k,h,p.Tone.getContext().currentTime),p.Tone.Draw.schedule(()=>{s?.(k,h)},k)},h.part.begin.valueOf())})};o.useEffect(()=>{g&&y()},[a,u,c,s,g]);const x=async()=>{m(!0),await p.Tone.start(),p.Tone.getTransport().start("+0.1")},C=()=>{p.Tone.getTransport().pause(),m(!1)};return{start:x,stop:C,onEvent:a,started:i,setStarted:m,toggle:()=>i?C():x(),query:y,activeCycle:l}}function U(e){return o.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),o.useCallback(a=>window.postMessage(a,"*"),[])}let he=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const ve=e=>encodeURIComponent(btoa(e));function G({tune:e,defaultSynth:a,autolink:c=!0,onEvent:u,onDraw:g}){const s=o.useMemo(()=>he(),[]),[i,m]=o.useState(e),[r,l]=o.useState(),[y,x]=o.useState(""),[C,E]=o.useState(),[b,w]=o.useState(!1),[S,H]=o.useState(""),[N,R]=o.useState(),h=o.useMemo(()=>i!==r||C,[i,r,C]),k=o.useCallback(d=>x(t=>t+`${t?`

`:""}${d}`),[]),K=o.useMemo(()=>{if(r&&!r.includes("strudel disable-highlighting"))return(d,t)=>g?.(d,t,r)},[r,g]),T=Q({onDraw:K,onEvent:o.useCallback((d,t,Y)=>{try{u?.(t),t.context.logs?.length&&t.context.logs.forEach(k);const{onTrigger:_,velocity:Z}=t.context;if(_)_(d,t,Y,1,t.wholeOrPart().begin.valueOf(),t.duration.valueOf());else if(a){const ee=ne.getPlayableNoteValue(t);a.triggerAttackRelease(ee,t.duration.valueOf(),d,Z)}else throw new Error("no defaultSynth passed to useRepl.")}catch(_){console.warn(_),_.message="unplayable event: "+_?.message,k(_.message)}},[u,k,a]),onQuery:o.useCallback(d=>{try{return N?.query(d)||[]}catch(t){return console.warn(t),t.message="query error: "+t.message,E(t),[]}},[N]),onSchedule:o.useCallback((d,t)=>X(d,t),[]),ready:!!N&&!!r}),V=U(({data:{from:d,type:t}})=>{t==="start"&&d!==s&&(T.setStarted(!1),l(void 0))}),A=o.useCallback(async(d=i)=>{if(r&&!h){E(void 0),T.start();return}try{w(!0);const t=await re.evaluate(d);T.start(),V({type:"start",from:s}),R(()=>t.pattern),c&&(window.location.hash="#"+encodeURIComponent(btoa(i))),H(ve(i)),E(void 0),l(d),w(!1)}catch(t){t.message="evaluation error: "+t.message,console.warn(t),E(t)}},[r,h,i,T,c,s,V]),X=(d,t)=>{d.length};return{pending:b,code:i,setCode:m,pattern:N,error:C,cycle:T,setPattern:R,dirty:h,log:y,togglePlay:()=>{T.started?T.stop():A()},setActiveCode:l,activateCode:A,activeCode:r,pushLog:k,hash:S}}function L(...e){return e.filter(Boolean).join(" ")}let q=[],O;function J({view:e,pattern:a,active:c}){o.useEffect(()=>{if(e)if(a&&c){let g=function(){try{const s=p.Tone.getTransport().seconds,i=[O||s,s+1/60];O=s+1/60,q=q.filter(r=>r.whole.end>s);const m=a.queryArc(...i).filter(r=>r.hasOnset());q=q.concat(m),e.dispatch({effects:B.of(q)})}catch{e.dispatch({effects:B.of([])})}u=requestAnimationFrame(g)},u=requestAnimationFrame(g);return()=>{cancelAnimationFrame(u)}}else q=[],e.dispatch({effects:B.of([])})},[a,c,e])}const ye="_container_10e1g_1",Ce="_header_10e1g_5",we="_buttons_10e1g_9",ke="_button_10e1g_9",Me="_buttonDisabled_10e1g_17",Ee="_error_10e1g_21",Te="_body_10e1g_25";var M={container:ye,header:Ce,buttons:we,button:ke,buttonDisabled:Me,error:Ee,body:Te};function j({type:e}){return f.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:f.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:f.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:f.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}[e])}function _e({tune:e,defaultSynth:a,hideOutsideView:c=!1}){const{code:u,setCode:g,pattern:s,activateCode:i,error:m,cycle:r,dirty:l,togglePlay:y}=G({tune:e,defaultSynth:a,autolink:!1}),[x,C]=o.useState(),[E,b]=ae.useInView({threshold:.01}),w=o.useRef(),S=o.useMemo(()=>((b||!c)&&(w.current=!0),b||w.current),[b,c]);return J({view:x,pattern:s,active:r.started}),f.default.createElement("div",{className:M.container,ref:E},f.default.createElement("div",{className:M.header},f.default.createElement("div",{className:M.buttons},f.default.createElement("button",{className:L(M.button,r.started?"sc-animate-pulse":""),onClick:()=>y()},f.default.createElement(j,{type:r.started?"pause":"play"})),f.default.createElement("button",{className:L(l?M.button:M.buttonDisabled),onClick:()=>i()},f.default.createElement(j,{type:"refresh"}))),m&&f.default.createElement("div",{className:M.error},m.message)),f.default.createElement("div",{className:M.body},S&&f.default.createElement($,{value:u,onChange:g,onViewChanged:C})))}function xe(e){const{ready:a,connected:c,disconnected:u}=e,[g,s]=o.useState(!0),[i,m]=o.useState(v.WebMidi?.outputs||[]);return o.useEffect(()=>{v.enableWebMidi().then(()=>{v.WebMidi.addListener("connected",l=>{m([...v.WebMidi.outputs]),c?.(v.WebMidi,l)}),v.WebMidi.addListener("disconnected",l=>{m([...v.WebMidi.outputs]),u?.(v.WebMidi,l)}),a?.(v.WebMidi),s(!1)}).catch(l=>{if(l){console.error(l),console.warn("Web Midi could not be enabled..");return}})},[a,c,u,i]),{loading:g,outputs:i,outputByName:l=>v.WebMidi.getOutputByName(l)}}exports.CodeMirror=$;exports.MiniRepl=_e;exports.cx=L;exports.useCycle=Q;exports.useHighlighting=J;exports.usePostMessage=U;exports.useRepl=G;exports.useWebMidi=xe;