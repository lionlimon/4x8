import{d as b,L as q,o as c,a as d,h as w,s as S,l as D,u as f,V as k,e as g,g as h,M as x,b as m,t as u,_ as v,m as O,r as A,c as C,F as G,f as J}from"./index-1d7079c5.js";import{b as L,V as F,a as P}from"./VButton-a8fba843.js";const Q={class:"top-bar container"},X={class:"top-bar__info"},Y={class:"top-bar__screen-title"},Z={key:0,class:"top-bar__title"},ee=b({__name:"TopBar",props:{screenTitle:{type:String,default:""},title:{type:String,default:""},backLink:{type:[Object,String],default:null}},setup(n){return(r,p)=>{const o=q("RouterLink");return c(),d("div",Q,[n.backLink?(c(),w(o,{key:0,class:"top-bar__back",to:n.backLink},{default:S(()=>[D(f(k),{name:"arrow-left",width:"24px",height:"24px"})]),_:1},8,["to"])):g("",!0),h("div",X,[h("h1",Y,[x(r.$slots,"default",{},()=>[m(u(n.screenTitle),1)],!0)]),n.title?(c(),d("div",Z,u(n.title),1)):g("",!0)])])}}});const xe=v(ee,[["__scopeId","data-v-1e6d4fe2"]]),te=O("training-settings",()=>({settings:L("training-settings-state",{weightUnit:"kg"})})),V=()=>new Date().toISOString(),Se=O("training",()=>{const n=te(),r=L("training-record",{}),p=A(new Date),o=e=>{const t=new Date(e);return t.setHours(0,0,0,0),t.toISOString()},s=C(()=>{const e=o(p.value);return r.value[e]}),_=e=>p.value=e,i={reps:0,weight:0,weightUnit:n.settings.weightUnit,id:new Date().toISOString()},T={name:"",approaches:[],isBasedOnBodyWeight:!1},U=e=>{if(!s.value)return;const t=s.value.exercises[e],a=new Date().toISOString();t.approaches.length>0?t.approaches.push({...i,...t.approaches[t.approaches.length-1],id:a}):t.approaches.push({...i,id:a})},z=({approachIndex:e,exerciseIndex:t,approach:a})=>{if(!s.value)return;const l=s.value.exercises[t];!l||!l.approaches[e]||(l.approaches[e]=a)},M=({exerciseIndex:e,approachIndex:t})=>{if(!s.value)return;const a=s.value.exercises[e];a&&a.approaches.splice(t,1)},$=(e=new Date)=>{const t=e.toISOString(),a=o(e);r.value[a]||(r.value[a]={basedOnTraining:null,date:t,exercises:[],isSavedToServer:!1})},N=()=>{$()},I=e=>{_(e),$(e)},y=e=>r.value[o(e)],R=e=>delete r.value[o(e)],B=e=>{s.value&&s.value.exercises.push({...e??{...T,id:V()}})},K=e=>{const t=y(e);t&&(delete r.value[o(new Date)],I(new Date),t.exercises.forEach(({name:a,isBasedOnBodyWeight:l},E)=>{B({isBasedOnBodyWeight:l,name:a,id:V()+String(E),approaches:[]})}),s.value&&(s.value.basedOnTraining=t.date))},W=(e,t)=>{const a=y(e);a&&(a.exercises=a.exercises.filter(l=>l.id!==t))},j=(e,t)=>{if(!s.value)return;const a=y(e);a&&(a.exercises=a.exercises.map(l=>l.id===t.id?{...l,...t}:l))},H=C(()=>{var t;if(!s.value)return!0;const{exercises:e}=s.value;return e.length===0?!0:!!((t=e[e.length-1])!=null&&t.name)});return{startTraining:N,trainings:r,setSelectedDate:_,selectedDayTraining:s,deleteTraining:R,getTrainingByDate:y,startTrainingByDate:I,copyTraining:K,addExercise:B,canAddExercise:H,addApproach:U,setApproach:z,deleteApproach:M,trainingSettingsStore:n,editExercise:j,deleteExercise:W}}),se={lbs:"Фнт",kg:"Кг"},ne={class:"exercise-cart"},ae={class:"exercise-cart__title"},re={key:0,class:"exercise-cart__approaches-list"},ie={class:"exercise-cart__approach-reps"},oe={key:1,class:"exercise-cart__empty empty-message"},ce=b({__name:"ExerciseCart",props:{exercise:{},canEdit:{type:Boolean}},emits:["edit-click"],setup(n,{emit:r}){const p=r;return(o,s)=>(c(),d("li",ne,[h("div",ae,[m(u(o.exercise.name)+" ",1),o.canEdit?(c(),d("button",{key:0,type:"button",class:"exercise-cart__edit",onClick:s[0]||(s[0]=_=>p("edit-click"))},[D(f(k),{name:"edit",width:"18",height:"18"})])):g("",!0)]),o.exercise.approaches.length?(c(),d("ul",re,[(c(!0),d(G,null,J(o.exercise.approaches,(_,i)=>(c(),d("li",{key:i,class:"exercise-cart__approaches-list-item"},[m(u(i+1)+" подход ",1),h("div",ie,[o.exercise.isBasedOnBodyWeight?(c(),w(f(k),{key:0,class:"exercise-cart__body-icon",name:"body"})):g("",!0),m(" "+u(o.exercise.isBasedOnBodyWeight?"+":null)+" "+u(_.weight)+" "+u(f(se)[_.weightUnit])+" ",1),h("div",null," по "+u(_.reps)+" повторений ",1)])]))),128))])):(c(),d("p",oe," Подходы пока не добавлены "))]))}});const ke=v(ce,[["__scopeId","data-v-94b4042a"]]),be=n=>new Intl.DateTimeFormat("ru-RU",{dateStyle:"long"}).format(new Date(n));const le={},de={class:"screen-layout"},_e={key:0,class:"screen-layout__header"},ue={class:"screen-layout__content container"},pe={key:1,class:"screen-layout__footer"};function fe(n,r){return c(),d("div",de,[n.$slots.header?(c(),d("div",_e,[x(n.$slots,"header",{},void 0,!0)])):g("",!0),h("div",ue,[x(n.$slots,"default",{},void 0,!0)]),n.$slots.footer?(c(),d("div",pe,[x(n.$slots,"footer",{},void 0,!0)])):g("",!0)])}const we=v(le,[["render",fe],["__scopeId","data-v-608a6d2f"]]),he=b({__name:"VIconAction",props:{icon:{},variant:{default:"default"},size:{default:"s"},theme:{default:"default"}},setup(n){return(r,p)=>(c(),w(f(F),{variant:r.variant,size:r.size,theme:r.theme,class:"icon-action"},{default:S(()=>[D(f(k),{name:r.icon},null,8,["name"])]),_:1},8,["variant","size","theme"]))}});const De=v(he,[["__scopeId","data-v-ec2fd72c"]]),ge={class:"container"},me=b({__name:"DeletionConfirmModal",props:{text:{default:"Вы действительно хотите удалить?"},buttonText:{default:"Удалить"}},emits:["confirm"],setup(n,{expose:r,emit:p}){const o=p,s=A(),_=()=>{var i;(i=s.value)==null||i.close(),o("confirm")};return r({open:()=>{var i;return(i=s.value)==null?void 0:i.open()},close:()=>{var i;return(i=s.value)==null?void 0:i.close()}}),(i,T)=>(c(),w(f(P),{ref_key:"bottomSheet",ref:s,title:i.text,class:"deletion-confirm-modal"},{default:S(()=>[h("div",ge,[D(f(F),{class:"deletion-confirm-modal__button",theme:"dangerous",onClick:_,size:"m",wide:""},{default:S(()=>[m(u(i.buttonText),1)]),_:1})])]),_:1},8,["title"]))}});const Te=v(me,[["__scopeId","data-v-0c9d475a"]]);export{Te as D,ke as E,we as S,xe as T,De as V,te as a,be as f,Se as u,se as w};
