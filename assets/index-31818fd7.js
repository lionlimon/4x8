import{T as O,u as I,B as q,M as A,f as U}from"./formatDate-e7a96c16.js";import{d as Y,r as L,t as R,c as j,a as k,o as l,b as d,w as E,v as G,u as r,e as w,i as J,f as V,g as h,h as m,j as C,k as x,l as D,m as T,n as K,F as $,p as B,q as F,s as Q}from"./index-3075ffc7.js";import{u as W,V as N,_ as M,a as P}from"./VButton-3667a150.js";import{V as X}from"./VModal-33e27686.js";const z=Y("calendar",()=>{const _=L({currentMonth:new Date().toISOString().slice(0,7)}),p=a=>_.currentMonth=a;return{...R(_),setMonth:p}}),Z=_=>j(new Intl.DateTimeFormat("ru",{month:"long"}).format(_)),ee={class:"month-picker"},te=k({__name:"VMonthPicker",props:{modelValue:{default:new Date().toISOString().slice(0,7)}},emits:["update:modelValue"],setup(_,{emit:p}){const s=W(_,"modelValue",p);return(t,c)=>(l(),d("label",ee,[E(w("input",{class:"month-picker__input","onUpdate:modelValue":c[0]||(c[0]=u=>J(s)?s.value=u:null),type:"month",id:"start",name:"start"},null,512),[[G,r(s)]]),V(" "+h(r(Z)(new Date(r(s))))+" ",1),m(N,{class:"month-picker__icon",name:"arrow-down",width:"24",height:"24"})]))}});const ae=M(te,[["__scopeId","data-v-96a3d977"]]),ne={class:"home-top-bar"},se=k({__name:"HomeTopBar",setup(_,{emit:p}){const a=z(),s=C(a.currentMonth);return x(s,()=>a.setMonth(s.value)),(t,c)=>(l(),d("div",ne,[m(r(O),null,{default:D(()=>[m(r(ae),{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=u=>s.value=u)},null,8,["modelValue"])]),_:1})]))}});const oe=M(se,[["__scopeId","data-v-77a001d4"]]),re={class:"calendar-day__badge"},ce=k({__name:"VCalendarDay",props:{day:{},month:{},hasTraining:{type:Boolean}},setup(_,{emit:p}){const a=_,s=new Date,t=T(()=>({"calendar-day--active":a.day===s.getDate()&&a.month===s.getMonth(),"calendar-day--has-training":a.hasTraining}));return(c,u)=>(l(),d("button",{class:K(["calendar-day",t.value])},[V(h(c.day)+" ",1),w("span",re,[m(N,{class:"calendar-day__badge-icon",name:"dumb",width:"19",height:"11"})])],2))}});const le=M(ce,[["__scopeId","data-v-85ec8539"]]),_e={class:"calendar"},ie=k({__name:"VCalendar",props:{currentDate:{},isTrainingDayChecker:{type:Function}},emits:["day-click"],setup(_,{emit:p}){const a=_,s=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],t=C(a.currentDate);x(()=>a.currentDate,e=>{t.value=e});const c=(e,o)=>{const n=new Date(e,o,1),g=new Date(e,o+1,1);return Math.round((Number(g)-Number(n))/1e3/3600/24)},u=T(()=>{const e=t.value.getFullYear(),o=t.value.getMonth();return c(e,o)}),y=T(()=>{const e=[],o=(i,f)=>({day:f,month:i.getMonth(),year:i.getFullYear()});for(let i=1;i<=u.value;i++)e.push(o(t.value,i));const n=new Date(t.value);n.setDate(1);const g=n.getDay()===0?n.getDay()+7-1:n.getDay()-1,v=c(n.getFullYear(),n.getMonth()-1),b=[];for(let i=v+1-g;i<=v;i++){const f=new Date(t.value);f.setMonth(t.value.getMonth()-1),b.push(o(f,i))}n.setDate(u.value);const H=n.getDay()>0?7-n.getDay():0,S=[];for(let i=1;i<=H;i++){const f=new Date(t.value);f.setMonth(t.value.getMonth()+1),S.push(o(f,i))}return[...b,...e,...S]});return(e,o)=>(l(),d("div",_e,[(l(),d($,null,B(s,n=>w("div",{key:n,class:"calendar__day-name"},h(n),1)),64)),(l(!0),d($,null,B(y.value,({day:n,month:g,year:v})=>(l(),F(r(le),{key:`${n}${g}${v}`,day:n,month:g,class:"calendar__day","has-training":e.isTrainingDayChecker(new Date(`${g+1}/${n}/${v}`)),onClick:b=>p("day-click",new Date(`${g+1}/${n}/${v}`))},null,8,["day","month","has-training","onClick"]))),128))]))}});const de=M(ie,[["__scopeId","data-v-0418e738"]]),ue={class:"day-info-popup"},pe={key:0,class:"day-info-popup__list"},me={class:"day-info-popup__exercise-title"},he={key:0,class:"day-info-popup__approaches-list"},ye={class:"day-info-popup__approach-reps"},ge={key:1,class:"day-info-popup__empty"},De={class:"day-info-popup__actions"},fe=k({__name:"DayInfoPopup",props:{date:{}},setup(_){const p=_,a=I(),s=T(()=>a.getTrainingByDate(p.date)?"Изменть":"Заполнить день");return(t,c)=>{var u;return l(),d("div",ue,[t.date&&r(a).getTrainingByDate(t.date)?(l(),d("ul",pe,[(l(!0),d($,null,B(r(a).getTrainingByDate(t.date).exercises,y=>(l(),d("li",{key:y.name,class:"day-info-popup__item"},[w("div",me,h(y.name),1),y.approaches?(l(),d("ul",he,[(l(!0),d($,null,B(y.approaches,(e,o)=>(l(),d("li",{key:o,class:"day-info-popup__approaches-list-item"},[V(h(o+1)+" подход ",1),w("span",ye,h(e.weight)+" "+h(e.weightUnit)+" x "+h(e.reps),1)]))),128))])):Q("",!0)]))),128))])):(l(),d("p",ge,"Тренировок в этот день не было, но вы можете заполнить этот день")),w("div",De,[m(r(P),{wide:"",size:"m",to:{name:"training",query:{date:(u=t.date)==null?void 0:u.toISOString()}}},{default:D(()=>[V(h(s.value),1)]),_:1},8,["to"])])])}}});const ve=M(fe,[["__scopeId","data-v-1794e0d5"]]),we=k({__name:"home",setup(_){const p=z(),a=I(),s=T(()=>{var e;return(e=a.todayTraining)!=null&&e.isFinished?"Изменить тренировку":a.todayTraining?"К тренировке":"Начать тренировку"}),t=C(),c=C(new Date),u=async e=>{var o;(o=t.value)==null||o.open(),c.value=e},y=e=>!!a.getTrainingByDate(e);return(e,o)=>(l(),F(r(q),{class:"home"},{header:D(()=>[m(r(oe))]),footer:D(()=>[m(r(A),null,{default:D(()=>[m(r(P),{to:{name:"training",query:{mode:"new-training"}},size:"m",wide:""},{default:D(()=>[V(h(s.value),1)]),_:1})]),_:1})]),default:D(()=>[m(r(de),{"current-date":new Date(r(p).currentMonth),onDayClick:u,class:"home__calendar","is-training-day-checker":y},null,8,["current-date"]),m(r(X),{ref_key:"bottomSheet",ref:t,"sub-title":r(U)(c.value),title:"Тренировка",onOnClose:o[0]||(o[0]=n=>c.value=new Date)},{default:D(()=>[m(r(ve),{date:c.value},null,8,["date"])]),_:1},8,["sub-title"])]),_:1}))}});const Ce=M(we,[["__scopeId","data-v-a0b79926"]]);export{Ce as Home};