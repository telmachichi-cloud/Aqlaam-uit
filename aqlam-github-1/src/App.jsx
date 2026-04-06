import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { getTextForSession, getRandomText, FIELD_MAP } from "./texts";
import { getEAPQuestions, getEAPText, scoreEAP, FIELD_TO_EAP } from "./eapTests";
import { IBN_TOFAIL_LOGO } from "./logo";



const supabase = createClient(
  "https://twohshcybxgmercjdwbm.supabase.co",
  "sb_publishable_9jQKiBFseyjQd6PCryELXA_Oof2FiGf"
);

/* ─── NETLIFY FORM HELPER ─────────────────────────────────────────────────── */
const submitToNetlify = async (formName, data) => {
  try {
    const body = new URLSearchParams({ "form-name": formName, ...Object.fromEntries(Object.entries(data).map(([k,v])=>[k,String(v??"")] ))});
    await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: body.toString() });
  } catch(e) { /* silent */ }
};

/* ─── THEMES ─────────────────────────────────────────────────────────────── */
const THEMES = {
  teal:   { name:"Teal Scholar",  bg:"#0D1117",surface:"#141E2D",surfaceUp:"#1C2D42",border:"rgba(46,63,88,0.7)",accent:"#2E7D6B",accentDim:"rgba(46,125,107,0.13)",accentBorder:"rgba(46,125,107,0.4)",ochre:"#C17E4A",ochreDim:"rgba(193,126,74,0.13)",ochreBorder:"rgba(193,126,74,0.38)",coral:"#C0582A",coralDim:"rgba(192,88,42,0.13)",coralBorder:"rgba(192,88,42,0.38)",text:"#F0EDE8",muted:"#8B95A3",dim:"#4A5568",danger:"#B83232" },
  indigo: { name:"Indigo Night",  bg:"#0E0F1A",surface:"#171830",surfaceUp:"#1F2040",border:"rgba(60,55,110,0.7)",accent:"#6C63FF",accentDim:"rgba(108,99,255,0.13)",accentBorder:"rgba(108,99,255,0.4)",ochre:"#E8A838",ochreDim:"rgba(232,168,56,0.13)",ochreBorder:"rgba(232,168,56,0.38)",coral:"#E05C5C",coralDim:"rgba(224,92,92,0.13)",coralBorder:"rgba(224,92,92,0.38)",text:"#EEEDF8",muted:"#8B8FAD",dim:"#4A4D6A",danger:"#E05C5C" },
  rose:   { name:"Rose & Slate",  bg:"#110D10",surface:"#1D1520",surfaceUp:"#271C2A",border:"rgba(80,50,70,0.7)",accent:"#C2547A",accentDim:"rgba(194,84,122,0.13)",accentBorder:"rgba(194,84,122,0.4)",ochre:"#D4A03A",ochreDim:"rgba(212,160,58,0.13)",ochreBorder:"rgba(212,160,58,0.38)",coral:"#D97A3A",coralDim:"rgba(217,122,58,0.13)",coralBorder:"rgba(217,122,58,0.38)",text:"#F0EAF0",muted:"#9A8FA0",dim:"#50445A",danger:"#D95050" },
  sand:   { name:"Desert Sand",   bg:"#13120F",surface:"#1E1C16",surfaceUp:"#28261C",border:"rgba(80,70,40,0.7)",accent:"#B8943A",accentDim:"rgba(184,148,58,0.13)",accentBorder:"rgba(184,148,58,0.4)",ochre:"#C17E4A",ochreDim:"rgba(193,126,74,0.13)",ochreBorder:"rgba(193,126,74,0.38)",coral:"#A85438",coralDim:"rgba(168,84,56,0.13)",coralBorder:"rgba(168,84,56,0.38)",text:"#F4F0E4",muted:"#9A9280",dim:"#524E40",danger:"#B84040" },
  forest: { name:"Forest Night",  bg:"#0A0F0C",surface:"#111A13",surfaceUp:"#182218",border:"rgba(30,70,35,0.7)",accent:"#4A9B5A",accentDim:"rgba(74,155,90,0.13)",accentBorder:"rgba(74,155,90,0.4)",ochre:"#C8A44A",ochreDim:"rgba(200,164,74,0.13)",ochreBorder:"rgba(200,164,74,0.38)",coral:"#B86040",coralDim:"rgba(184,96,64,0.13)",coralBorder:"rgba(184,96,64,0.38)",text:"#EEF2EC",muted:"#7A9A80",dim:"#3A5040",danger:"#B84040" },
};
let _tid = "teal";
let _tlisteners = [];
const getT = () => THEMES[_tid] || THEMES.teal;
const setGlobalTheme = (id) => { _tid = id; _tlisteners.forEach(fn => fn(id)); };
const useTheme = () => {
  const [tid, setTid] = useState(_tid);
  useEffect(() => { _tlisteners.push(setTid); return () => { _tlisteners = _tlisteners.filter(f => f !== setTid); }; }, []);
  return THEMES[tid] || THEMES.teal;
};
// T — convenience object, always returns current theme values
const T = {
  get bg(){return getT().bg;}, get surface(){return getT().surface;}, get surfaceUp(){return getT().surfaceUp;},
  get border(){return getT().border;}, get accent(){return getT().accent;}, get accentDim(){return getT().accentDim;},
  get accentBorder(){return getT().accentBorder;}, get ochre(){return getT().ochre;}, get ochreDim(){return getT().ochreDim;},
  get ochreBorder(){return getT().ochreBorder;}, get coral(){return getT().coral;}, get coralDim(){return getT().coralDim;},
  get coralBorder(){return getT().coralBorder;}, get text(){return getT().text;}, get muted(){return getT().muted;},
  get dim(){return getT().dim;}, get danger(){return getT().danger;},
  serif:"'Crimson Pro',Georgia,serif", sans:"'DM Sans',system-ui,sans-serif",
};

/* ─── SESSION TYPES ──────────────────────────────────────────────────────── */
const SESSION_TYPES = {
  reconstruction: { id:"reconstruction", label:"Read & Reconstruct", tier:1, desc:"Read a text, then reconstruct it from memory." },
  gist:           { id:"gist",           label:"GIST Summary",        tier:2, desc:"Capture the core idea in exactly 20 words." },
  wordInference:  { id:"wordInference",  label:"Word Inference",      tier:2, desc:"Guess three unknown academic words from context." },
  dictogloss:     { id:"dictogloss",     label:"Dictogloss",          tier:3, desc:"Read twice then reconstruct in full from memory." },
  circumlocution: { id:"circumlocution", label:"Circumlocution",      tier:3, desc:"Explain a concept without using its name." },
};
const getSessionType = (n) => { if(n<3)return"reconstruction"; if(n<6)return n%2===0?"gist":"reconstruction"; if(n<10){return["reconstruction","gist","wordInference"][n%3];} return["reconstruction","gist","wordInference","dictogloss","circumlocution"][n%5]; };
const getTier = (n) => n<3?1:n<7?2:3;
const getLevel = (n) => n<6?"B1":n<13?"B2":"C1";
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

/* ─── DB ─────────────────────────────────────────────────────────────────── */
const db = {
  saveProfile: async(uid,d) => {
    try {
      // Only send known safe columns to avoid 400 errors from missing columns
      const safe = {};
      const allowed = ['name','email','university','city','level','native_language','field','goal','exposure'];
      Object.keys(d).forEach(k => { if(allowed.includes(k)) safe[k] = d[k]; });
      console.log('AQLAM: saving profile', JSON.stringify({id:uid,...safe}));
      const {error} = await supabase.from('profiles').upsert({id:uid,...safe},{onConflict:'id'});
      if(error) console.error('AQLAM: save error:', error.message, error.details);
      else console.log('AQLAM: save OK');
    } catch(e) { console.warn('AQLAM: Profile save catch:', e.message); }
  },
  saveSession: async(uid,s) => {
    try {
      const safe = {
        user_id: uid,
        text_title: s.text_title || s.textTitle || '',
        strategy: s.strategy || s.session_type || '',
        self_rating: s.self_rating || s.selfRating || 0,
        date: s.date || new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'}),
      };
      console.log('AQLAM saveSession:', JSON.stringify(safe));
      const {error} = await supabase.from('sessions').insert(safe);
      if(error) console.error('AQLAM saveSession error:', error.message, error.details, error.hint);
      else console.log('AQLAM saveSession OK');
    } catch(e) { console.warn('saveSession catch:', e.message); }
  },
  saveCheckin: async(uid,c) => { await supabase.from("checkins").insert({user_id:uid,...c}); },
  saveTestScore: async(uid,score) => { await supabase.from("profiles").upsert({id:uid,...score}); },
  loadProfile: async(uid) => {
    try {
      const cols = 'id,name,email,university,city,level,native_language,field,goal,exposure';
      const{data,error}=await supabase.from('profiles').select(cols).eq('id',uid).maybeSingle();
      if(error) console.warn('loadProfile error:', error.message);
      return data||null;
    } catch(e) { console.warn('loadProfile catch:', e.message); return null; }
  },
  loadSessions: async(uid) => {
    try {
      const{data,error}=await supabase.from('sessions').select('*').eq('user_id',uid).order('created_at');
      if(error) console.error('AQLAM loadSessions error:', error.message);
      console.log('AQLAM loadSessions:', data?.length, 'rows for uid', uid);
      return data||[];
    } catch(e){ console.error('AQLAM loadSessions catch:', e.message); return []; }
  },
  loadCheckins: async(uid) => {
    try {
      const{data,error}=await supabase.from('checkins').select('*').eq('user_id',uid).order('created_at');
      if(error) console.error('AQLAM loadCheckins error:', error.message);
      return data||[];
    } catch(e){ console.error('AQLAM loadCheckins catch:', e.message); return []; }
  },
};

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const G = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.textContent = `*{box-sizing:border-box;margin:0;padding:0;}html,body{height:100%;background:#0D1117;}body{font-family:'DM Sans',system-ui,sans-serif;color:#F0EDE8;-webkit-font-smoothing:antialiased;}::selection{background:rgba(46,125,107,0.35);}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#2E3F58;border-radius:2px;}textarea,input{outline:none;}button{cursor:pointer;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(46,125,107,0.2)}50%{box-shadow:0 0 40px rgba(46,125,107,0.45)}}.fade-up{animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;}.fade-up-1{animation-delay:0.07s}.fade-up-2{animation-delay:0.14s}.fade-up-3{animation-delay:0.21s}.fade-up-4{animation-delay:0.28s}`;
    document.head.appendChild(s);
  }, []);
  return null;
};

/* ─── SHARED UI ──────────────────────────────────────────────────────────── */
const Btn=({children,onClick,variant="primary",disabled,full,sx={}})=>{
  const t=getT();
  const base={border:"none",borderRadius:10,fontFamily:T.sans,fontWeight:600,cursor:disabled?"not-allowed":"pointer",transition:"all 0.18s",opacity:disabled?0.4:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,width:full?"100%":undefined};
  const v={primary:{background:t.accent,color:"#fff",padding:"13px 30px",fontSize:15},secondary:{background:t.surfaceUp,color:t.text,padding:"11px 22px",fontSize:14,border:`1px solid ${t.border}`},ghost:{background:"transparent",color:t.muted,padding:"9px 18px",fontSize:14},ochre:{background:t.ochre,color:"#fff",padding:"12px 26px",fontSize:14},danger:{background:t.danger,color:"#fff",padding:"11px 22px",fontSize:14}};
  const[over,setOver]=useState(false);
  return <button onClick={disabled?undefined:onClick} style={{...base,...v[variant],...(over&&!disabled?{filter:"brightness(1.12)"}:{}),...sx}} onMouseEnter={()=>setOver(true)} onMouseLeave={()=>setOver(false)}>{children}</button>;
};
const Tag=({children,color})=>{const c=color||getT().accent;return <span style={{background:`${c}1A`,color:c,border:`1px solid ${c}44`,borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase"}}>{children}</span>;};
const Lbl=({children,color})=>{const c=color||getT().accent;return <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:c,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>{children}</div>;};
const Serif=({children,size=17,color,sx={}})=><p style={{fontFamily:T.serif,fontSize:size,color:color||getT().text,lineHeight:1.85,...sx}}>{children}</p>;
const Screen=({children,sx={}})=><div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.5rem",...sx}}>{children}</div>;
const Card=({children,glow,sx={}})=>{const t=getT();return <div style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,padding:"1.6rem",boxShadow:glow?`0 0 48px ${t.accentDim}`:`0 2px 24px rgba(0,0,0,0.32)`,...sx}}>{children}</div>;};
const ProgressBar=({current,total})=>{const t=getT();return <div style={{width:"100%",maxWidth:420,margin:"0 auto 1.8rem"}}><div style={{height:2,background:t.border,borderRadius:2}}><div style={{height:"100%",width:`${(current/total)*100}%`,background:t.accent,borderRadius:2,transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)"}}/></div><div style={{fontSize:11,color:t.dim,marginTop:6,textAlign:"right"}}>{current} / {total}</div></div>;};
const Spinner=({size=32})=>{const t=getT();return <div style={{width:size,height:size,border:`2.5px solid ${t.border}`,borderTopColor:t.accent,borderRadius:"50%",animation:"spin 0.75s linear infinite"}}/>;};
const ErrMsg=({msg})=>{const t=getT();return msg?<div style={{background:`${t.danger}1A`,border:`1px solid ${t.danger}44`,borderRadius:9,padding:"10px 14px",fontSize:13,color:t.danger,marginTop:8}}>{msg}</div>:null;};
const TierBadge=({n})=>{const t=getT();const c=[t.accent,t.ochre,t.coral][n-1]||t.accent;return <span style={{background:`${c}1A`,color:c,border:`1px solid ${c}44`,borderRadius:6,padding:"2px 9px",fontSize:11,fontWeight:700,fontFamily:T.sans}}>T{n}</span>;};
const PhaseBar=({phases,current})=>{
  const t=getT();
  const idx=phases.indexOf(current);
  return <div style={{display:"flex",gap:6,marginBottom:"1.6rem",width:"100%"}}>{phases.map((p,i)=>{
    const isActive=i===idx;
    const isPast=i<idx;
    const col=isActive?t.accent:(isPast?t.muted:t.dim);
    const bg=(isActive||isPast)?t.accent:t.border;
    return <div key={p} style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
      <div style={{height:3,borderRadius:2,background:bg,transition:"background 0.4s"}}/>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:col}}>{p}</div>
    </div>;
  })}</div>;
};
const UnivLogo=({size=36,style={}})=><img src={IBN_TOFAIL_LOGO} alt="Ibn Tofail University" style={{width:size,height:size,objectFit:"contain",borderRadius:4,...style}}/>;
const IbnTofailMark=({size=40,inNav=false})=>{const t=getT();return(<div style={{display:"flex",alignItems:"center",gap:inNav?6:10,opacity:inNav?0.75:1}}><img src={IBN_TOFAIL_LOGO} alt="Ibn Tofail University" style={{width:size,height:size,objectFit:"contain",borderRadius:4,background:"#fff",padding:2}}/>{!inNav&&<div style={{fontFamily:T.sans,fontSize:10,color:t.muted,lineHeight:1.4}}><div style={{fontWeight:600,color:t.text,fontSize:11}}>Ibn Tofail University</div><div>Kénitra · Morocco</div></div>}</div>);};

const Timer=({seconds,onEnd,running})=>{
  const[left,setLeft]=useState(seconds);const t=getT();
  useEffect(()=>{if(!running)return;if(left<=0){onEnd();return;}const tm=setTimeout(()=>setLeft(l=>l-1),1000);return()=>clearTimeout(tm);},[left,running]);
  const pct=left/seconds;const col=pct>0.5?t.accent:pct>0.25?t.ochre:t.danger;
  const r=16,circ=2*Math.PI*r;
  return <div style={{display:"flex",alignItems:"center",gap:10}}>
    <svg width="40" height="40" style={{transform:"rotate(-90deg)"}}>
      <circle cx="20" cy="20" r={r} fill="none" stroke={t.border} strokeWidth="2.5"/>
      <circle cx="20" cy="20" r={r} fill="none" stroke={col} strokeWidth="2.5" strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} style={{transition:"stroke-dashoffset 1s linear"}}/>
    </svg>
    <span style={{fontFamily:T.sans,fontSize:19,fontWeight:700,color:col}}>{String(Math.floor(left/60)).padStart(2,"0")}:{String(left%60).padStart(2,"0")}</span>
  </div>;
};

const ThemePicker=({current,onSelect})=>{
  const t=getT();
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    <Lbl>Interface theme</Lbl>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
      {Object.entries(THEMES).map(([id,theme])=>(
        <button key={id} onClick={()=>onSelect(id)} style={{background:theme.surface,border:`2px solid ${current===id?theme.accent:theme.border}`,borderRadius:10,padding:"10px 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.15s"}}>
          <div style={{display:"flex",gap:3}}>{[theme.accent,theme.ochre,theme.coral].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}</div>
          <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",fontSize:9,fontWeight:600,color:current===id?theme.accent:theme.muted,letterSpacing:"0.04em",textAlign:"center",lineHeight:1.3}}>{theme.name}</div>
        </button>
      ))}
    </div>
  </div>;
};

/* ══════════════════════════════════════════════════════════════════════════
   CONSENT FORM
══════════════════════════════════════════════════════════════════════════ */
const ConsentForm=({onAccept,userEmail,userName})=>{
  const t=getT();
  const[checked,setChecked]=useState(false);
  const[loading,setLoading]=useState(false);
  const handleAccept=async()=>{
    setLoading(true);
    await submitToNetlify("aqlam-consent",{email:userEmail,name:userName,consent_date:new Date().toISOString(),version:"1.0"});
    onAccept();
  };
  return <Screen sx={{justifyContent:"flex-start",paddingTop:"1.5rem"}}>
    <div style={{width:"100%",maxWidth:620}}>
      <div className="fade-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.6rem"}}>
        <UnivLogo size={48}/>
        <div>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.14em",textTransform:"uppercase"}}>AQLAM Research Study</div>
          <div style={{fontFamily:T.serif,fontSize:18,color:t.text,fontWeight:600}}>Informed Consent</div>
        </div>
      </div>
      <Card sx={{marginBottom:"1rem"}}>
        <Lbl>Researcher</Lbl>
        <div style={{fontFamily:T.sans,fontSize:14,color:t.text,fontWeight:600,marginBottom:4}}>{CONSENT.researcher}</div>
        {CONSENT.affiliations.map((a,i)=><div key={i} style={{fontFamily:T.sans,fontSize:13,color:t.muted}}>{a}</div>)}
        <div style={{borderTop:`1px solid ${t.border}`,marginTop:"1rem",paddingTop:"1rem",display:"flex",flexDirection:"column",gap:3}}>
          {Object.entries(CONSENT.emails).map(([k,v])=><div key={k} style={{fontFamily:T.sans,fontSize:12,color:t.dim}}>{v}</div>)}
        </div>
      </Card>
      <Card sx={{marginBottom:"1rem"}}>
        <Lbl>What this study involves</Lbl>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            ["Purpose","This research investigates English language learning strategies among Moroccan STEM university students. The study forms part of doctoral research and may contribute to academic publications."],
            ["What data we collect","Your name, email address, university, study level, field, city, language background, EAP test scores (pre and post), learning session activity, daily check-in responses, and self-rated strategy application."],
            ["How data is stored","Your data is stored on secure, encrypted servers accessible only to the researcher. It will be anonymised before any academic publication — your name and email will never appear in published work."],
            ["Your right to withdraw","Participation is entirely voluntary. You may withdraw at any time without consequence by contacting the researcher. Your data will be deleted within 30 days of your request."],
            ["Future use","Anonymised data may be used in future research on English for Academic Purposes and language learning strategies in Moroccan higher education contexts."],
          ].map(([title,text])=><div key={title} style={{padding:"0.8rem 0",borderBottom:`1px solid ${t.border}`}}>
            <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:t.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{title}</div>
            <Serif size={14} color={t.muted}>{text}</Serif>
          </div>)}
        </div>
      </Card>
      <div style={{background:t.accentDim,border:`1px solid ${t.accentBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1.4rem",display:"flex",gap:12,alignItems:"flex-start"}}>
        <input type="checkbox" id="consent-check" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{width:18,height:18,marginTop:2,accentColor:t.accent,flexShrink:0}}/>
        <label htmlFor="consent-check" style={{fontFamily:T.sans,fontSize:14,color:t.text,lineHeight:1.6,cursor:"pointer"}}>
          I have read and understood the information above. I consent to participate in this research study and to the collection and processing of my data as described. I understand I may withdraw at any time.
        </label>
      </div>
      <Btn onClick={handleAccept} disabled={!checked||loading} full sx={{fontSize:16,padding:"15px"}}>
        {loading?<Spinner size={20}/>:"I agree — begin →"}
      </Btn>
      <div style={{textAlign:"center",fontSize:11,color:t.dim,marginTop:12}}>This consent is recorded with a timestamp and linked to your account.</div>
    </div>
  </Screen>;
};

const ConsentScreen=({userName,onAccept,onDecline})=>{
  const[checked,setChecked]=useState(false);
  const[scrolled,setScrolled]=useState(false);
  const handleScroll=(e)=>{if(e.target.scrollTop+e.target.clientHeight>=e.target.scrollHeight-40)setScrolled(true);};
  return <Screen sx={{justifyContent:"flex-start",paddingTop:"2rem"}}>
    <div style={{width:"100%",maxWidth:620}}>
      <div className="fade-up" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.4rem"}}>
        <div><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:8}}>أقلام · AQLAM — Informed Consent</div><h2 style={{fontFamily:T.serif,fontSize:"clamp(1.5rem,3.5vw,2rem)",color:T.text,lineHeight:1.3}}>Before you begin, {userName?.split(" ")[0]||"please"} read this carefully.</h2></div>
        <IbnTofailMark size={48}/>
      </div>
      <Card sx={{marginBottom:"1rem"}}>
        <div onScroll={handleScroll} style={{maxHeight:340,overflowY:"auto",paddingRight:8}}>
          <Lbl>Informed Consent for Research Participation</Lbl>
          <div style={{fontFamily:T.sans,fontSize:13,color:T.muted,lineHeight:1.9}}>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Principal Researcher:</strong> Mohamed El Machichi<br/>Ibn Tofail University, Kénitra · Art'ComSup — École de Design, Rabat<br/>Contact: <span style={{color:T.accent}}>mohamed.el-machichi@uit.ac.ma</span> · <span style={{color:T.accent}}>mohamed.elmachichi@ecole-artcom.com</span></p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Purpose of this research:</strong> AQLAM is a research tool studying English language learning strategies among Moroccan STEM students. This study investigates the relationship between strategy use, academic English proficiency, and student background. Findings will be published in academic journals and may be used in future post-doctoral research.</p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Data collected:</strong> Name, email, university, city, field of study, study level. Responses to English language assessments (pre-test and post-test). Learning session activity: session types, strategies, and self-ratings. Daily check-in responses about English exposure.</p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>How data will be used:</strong> Solely for academic research. Before any publication, all data will be anonymised — your name and email will never appear in any published work. Aggregated, anonymised data may be used in future research by the principal researcher.</p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Data storage and security:</strong> Data is stored on secure servers (Supabase). Access is restricted to the principal researcher only. Data will be retained for a maximum of five years following the conclusion of the study.</p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Your rights:</strong> Participation is entirely voluntary. You may withdraw at any time by contacting the researcher. Upon withdrawal, all your personal data will be deleted within 14 days. You have the right to request access to, correction of, or deletion of your data at any time.</p>
            <p style={{marginBottom:"1rem"}}><strong style={{color:T.text}}>Confidentiality:</strong> Your individual responses will never be shared with your professors, institution, or any third party. Only aggregated, anonymised data will appear in published research.</p>
            <p><strong style={{color:T.text}}>Questions?</strong> Contact Mohamed El Machichi at <span style={{color:T.accent}}>telmachichi@gmail.com</span> or either institutional address above.</p>
          </div>
        </div>
        {!scrolled&&<div style={{textAlign:"center",fontSize:11,color:T.dim,marginTop:8,animation:"pulse 2s ease infinite"}}>↓ Scroll to read the full consent form</div>}
      </Card>
      <Card sx={{marginBottom:"1rem"}}>
        <label style={{display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer"}}>
          <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{marginTop:3,width:16,height:16,accentColor:T.accent}}/>
          <span style={{fontFamily:T.sans,fontSize:14,color:T.text,lineHeight:1.6}}>I have read and understood the information above. I voluntarily agree to participate in this research study and consent to the collection and use of my data as described. I understand I may withdraw at any time.</span>
        </label>
      </Card>
      <div style={{display:"flex",gap:12}}>
        <Btn onClick={onDecline} variant="secondary" sx={{flex:1}}>I do not agree</Btn>
        <Btn onClick={onAccept} disabled={!checked||!scrolled} sx={{flex:2}}>I agree — Continue →</Btn>
      </div>
      <div style={{textAlign:"center",fontSize:11,color:T.dim,marginTop:10}}>If you do not agree, your account will not be activated and no data will be stored.</div>
    </div>
  </Screen>;
};

/* ─── EAP TEST ───────────────────────────────────────────────────────────── */
const EAPTest=({field,isRetest=false,onDone,userName,userEmail})=>{
  const questions=getEAPQuestions(field);
  const eapText=getEAPText(field);
  const[phase,setPhase]=useState("intro");
  const[current,setCurrent]=useState(0);
  const[answers,setAnswers]=useState({});
  const startTime=useRef(Date.now());
  const ordered=[...questions.filter(q=>q.type==="calibration_pre"),...questions.filter(q=>q.type==="reading"),...questions.filter(q=>q.type==="vocabulary"),...questions.filter(q=>q.type==="structure"),...questions.filter(q=>q.type==="calibration_post")];
  const q=ordered[current];
  const answered=answers[q?.id]!==undefined;
  const typeLabel={reading:"Reading Comprehension",vocabulary:"Vocabulary in Context",structure:"Text Structure",calibration_pre:"Before You Begin",calibration_post:"Reflection"};
  const typeColor={reading:T.accent,vocabulary:T.ochre,structure:T.coral,calibration_pre:T.muted,calibration_post:T.muted};

  const submitToNetlify=async(scores)=>{
    const elapsed=Math.floor((Date.now()-startTime.current)/1000);
    const body=new URLSearchParams({"form-name":"aqlam-eap-test","participant_name":userName||"","participant_email":userEmail||"","field":field||"","test_type":isRetest?"post-test":"pre-test","test_date":new Date().toISOString(),"total_score":scores.total,"total_possible":scores.totalPossible,"percentage":scores.percentage,"reading_score":`${scores.reading}/${scores.readingTotal}`,"vocabulary_score":`${scores.vocabulary}/${scores.vocabularyTotal}`,"structure_score":`${scores.structure}/${scores.structureTotal}`,"pre_calibration":scores.preCalib,"post_calibration":scores.postCalib,"calibration_gap":scores.calibrationGap,"duration_seconds":elapsed,"individual_responses":JSON.stringify(answers)}).toString();
    try{await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body});}catch(e){console.log("Netlify form:",e);}
  };

  const finish=async()=>{const scores=scoreEAP(ordered,answers);await submitToNetlify(scores);onDone(scores);};
  const next=()=>{if(current<ordered.length-1)setCurrent(c=>c+1);else finish();};

  if(phase==="intro")return <Screen><div style={{width:"100%",maxWidth:560}} className="fade-up">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.4rem"}}>
      <div><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.accent,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:6}}>{isRetest?"Progress Test — 2 Week Check":"EAP Placement Test"}</div><h2 style={{fontFamily:T.serif,fontSize:"clamp(1.6rem,3.5vw,2.1rem)",color:T.text,lineHeight:1.3}}>{isRetest?"Let's see how far you've come.":"Let's establish your starting point."}</h2></div>
      <IbnTofailMark size={44}/>
    </div>
    <Serif size={16} color={T.muted} sx={{marginBottom:"1.6rem"}}>{isRetest?"The same format as your pre-test — a text from your field, 13 questions, approximately 10 minutes. Your results will be compared directly with your first attempt.":"A short academic English assessment tailored to your field. One passage, 13 questions, approximately 10 minutes."}</Serif>
    <Card sx={{marginBottom:"1.2rem"}}>
      {[["Reading comprehension","5 questions — understanding academic argument",T.accent],["Vocabulary in context","5 questions — academic word inference",T.ochre],["Text structure","3 questions — how academic texts are organised",T.coral]].map(([title,desc,col])=><div key={title} style={{display:"flex",gap:12,alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}><div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/><div style={{flex:1}}><div style={{fontFamily:T.sans,fontWeight:600,fontSize:13}}>{title}</div><div style={{fontFamily:T.sans,fontSize:11,color:T.muted}}>{desc}</div></div></div>)}
      <div style={{padding:"8px 0",fontFamily:T.sans,fontSize:12,color:T.muted}}>Field: <strong style={{color:T.text}}>{field}</strong> · {eapText.level} · ~10 minutes</div>
    </Card>
    <Btn onClick={()=>setPhase("reading")} full sx={{fontSize:15}}>Read the passage first →</Btn>
  </div></Screen>;

  if(phase==="reading")return <Screen sx={{justifyContent:"flex-start",paddingTop:"2rem"}}><div style={{width:"100%",maxWidth:680}} className="fade-up">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.2rem"}}>
      <div><Lbl>{eapText.level}</Lbl><div style={{fontFamily:T.serif,fontSize:20,fontWeight:600,color:T.text}}>{eapText.title}</div></div>
      <IbnTofailMark size={36} inNav/>
    </div>
    <Card glow sx={{marginBottom:"1.2rem"}}><Serif size={17} sx={{lineHeight:2}}>{eapText.passage}</Serif></Card>
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"0.8rem 1rem",marginBottom:"1.2rem"}}><Serif size={13} color={T.muted}>Read carefully. You may refer back to this passage during the questions — it will remain visible.</Serif></div>
    <Btn onClick={()=>setPhase("questions")} full>Begin the questions →</Btn>
  </div></Screen>;

  return <Screen sx={{justifyContent:"flex-start",paddingTop:"2rem"}}><div style={{width:"100%",maxWidth:640}}>
    <div style={{marginBottom:"1.2rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:typeColor[q?.type]||T.accent,letterSpacing:"0.1em",textTransform:"uppercase"}}>{typeLabel[q?.type]||""}</div>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.muted}}>{current+1} / {ordered.length}</div>
      </div>
      <div style={{height:3,background:T.border,borderRadius:2}}><div style={{height:"100%",width:`${(current/ordered.length)*100}%`,background:typeColor[q?.type]||T.accent,borderRadius:2,transition:"width 0.4s"}}/></div>
    </div>
    {q?.type==="reading"&&<div style={{background:T.surfaceUp,border:`1px solid ${T.border}`,borderRadius:10,padding:"1.2rem 1.4rem",marginBottom:"1.2rem",maxHeight:220,overflowY:"auto"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Passage reference</div><Serif size={15} color={T.muted} sx={{lineHeight:1.85}}>{eapText.passage}</Serif></div>}
    <Card sx={{marginBottom:"1rem"}}>
      <h3 style={{fontFamily:T.serif,fontSize:"1.35rem",color:T.text,marginBottom:"1.4rem",lineHeight:1.5}}>{q?.q}</h3>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {(q?.opts||[]).map((opt,i)=>{const sel=answers[q?.id]===i;const c=typeColor[q?.type]||T.accent;return <button key={i} onClick={()=>setAnswers(a=>({...a,[q.id]:i}))} style={{background:sel?`${c}15`:T.surface,border:`1.5px solid ${sel?c:T.border}`,borderRadius:9,padding:"11px 15px",fontFamily:T.sans,fontSize:14,color:sel?c:T.text,textAlign:"left",cursor:"pointer",transition:"all 0.15s",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontWeight:700,minWidth:22,color:sel?c:T.dim}}>{String.fromCharCode(65+i)}.</span><span>{opt}</span></button>;})}
      </div>
    </Card>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div>{current>0&&<button onClick={()=>setCurrent(c=>c-1)} style={{background:"none",border:"none",color:T.muted,fontFamily:T.sans,fontSize:12,cursor:"pointer"}}>← Previous</button>}</div>
      <Btn onClick={next} disabled={!answered}>{current===ordered.length-1?"Submit test →":"Next →"}</Btn>
    </div>
  </div></Screen>;
};

/* ─── EAP RESULTS ────────────────────────────────────────────────────────── */
const EAPResults=({scores,field,isRetest=false,preScores=null,onContinue})=>{
  const pct=scores.percentage;
  const level=pct>=80?"Strong":pct>=60?"Developing":pct>=40?"Emerging":"Foundation";
  const levelColor=pct>=80?T.accent:pct>=60?T.ochre:T.coral;
  const levelDesc={Strong:"Your academic English is at an advanced level for this field. You engage confidently with complex academic argument and vocabulary.",Developing:"You have solid foundational comprehension and are developing more sophisticated reading strategies — exactly what AQLAM accelerates.",Emerging:"You understand main ideas in academic texts but are building your ability to engage with complex argument and vocabulary. Every session makes a measurable difference.",Foundation:"Academic English presents real challenges at this stage — which is precisely why AQLAM exists. Every session builds your capacity directly and systematically."}[level];
  return <Screen sx={{justifyContent:"flex-start",paddingTop:"2rem"}}><div style={{width:"100%",maxWidth:600}} className="fade-up">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.4rem"}}>
      <div><Tag color={levelColor}>{isRetest?"Progress Test":"Placement Test"} Complete</Tag><h2 style={{fontFamily:T.serif,fontSize:"clamp(1.6rem,3.5vw,2.1rem)",color:T.text,margin:"0.8rem 0 0.3rem"}}>{isRetest?"Here's your progress.":"Here's your starting point."}</h2></div>
      <IbnTofailMark size={44}/>
    </div>
    <Card glow sx={{marginBottom:"1rem",textAlign:"center",padding:"1.8rem"}}>
      <div style={{fontFamily:T.sans,fontSize:64,fontWeight:700,color:levelColor,lineHeight:1}}>{scores.total}<span style={{fontSize:24,color:T.muted}}>/{scores.totalPossible}</span></div>
      <div style={{fontFamily:T.sans,fontSize:14,color:T.muted,marginTop:4}}>{pct}% · {level}</div>
      {isRetest&&preScores&&<div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:`1px solid ${T.border}`}}>
        <div style={{fontFamily:T.sans,fontSize:13,color:T.muted,marginBottom:4}}>Pre-test: {preScores.total}/{preScores.totalPossible} ({preScores.percentage}%)</div>
        <div style={{fontFamily:T.sans,fontSize:16,fontWeight:700,color:scores.total>preScores.total?T.accent:scores.total<preScores.total?T.coral:T.muted}}>{scores.total>preScores.total?`▲ +${scores.total-preScores.total} points`:(scores.total<preScores.total?`▼ ${Math.abs(scores.total-preScores.total)} points`:"No change")}</div>
      </div>}
    </Card>
    <Card sx={{marginBottom:"1rem"}}>
      <Lbl>Score by skill area</Lbl>
      {[{label:"Reading",score:scores.reading,total:scores.readingTotal,color:T.accent},{label:"Vocabulary",score:scores.vocabulary,total:scores.vocabularyTotal,color:T.ochre},{label:"Text Structure",score:scores.structure,total:scores.structureTotal,color:T.coral}].map(({label,score,total,color})=><div key={label} style={{marginBottom:"0.9rem"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><div style={{fontFamily:T.sans,fontSize:13,fontWeight:600}}>{label}</div><div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color}}>{score}/{total}</div></div><div style={{height:5,background:T.border,borderRadius:3}}><div style={{height:"100%",width:`${(score/total)*100}%`,background:color,borderRadius:3,transition:"width 1s cubic-bezier(0.22,1,0.36,1)"}}/></div></div>)}
    </Card>
    <div style={{background:T.surface,border:`1px solid ${T.accentBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1.4rem"}}><Lbl>What this means for you</Lbl><Serif size={15}>{levelDesc}</Serif>{!isRetest&&<Serif size={13} color={T.muted} sx={{marginTop:"0.6rem"}}>AQLAM will remind you to take your progress test in 14 days. Complete your sessions regularly to see measurable change.</Serif>}</div>
    <Btn onClick={onContinue} full sx={{fontSize:15}}>{isRetest?"Return to home →":"Start learning →"}</Btn>
  </div></Screen>;
};


/* ─── DATA CONSTANTS ─────────────────────────────────────────────────────── */
const PREFS=[
  {id:"field",n:"01",q:"What are you studying?",sub:"We'll tailor every text to your discipline.",type:"single",opts:["Biology","Physics","Computer Science","Mathematics","Chemistry","Engineering","Architecture & Design","Other STEM"]},
  {id:"background",n:"02",q:"How did you learn most of your English?",sub:"Choose everything that applies.",type:"multi",opts:["School classes only","Private language centre","Self-study online","Living or studying abroad","English media — films, YouTube, music","Starting essentially from scratch"]},
  {id:"interests",n:"03",q:"What genuinely interests you beyond your studies?",sub:"This shapes content recommendations.",type:"multi",opts:["Technology","Science news","Sport","Music","Cinema & documentaries","World affairs","Philosophy","Architecture","Art","Entrepreneurship","Gaming","Nature & environment"]},
  {id:"exposure",n:"04",q:"Outside class, how much English do you encounter each week?",sub:null,type:"single",opts:["Almost none","A little — occasional video or social media","Moderate — regular English content","A lot — mostly English in my digital life"]},
  {id:"goal",n:"05",q:"What matters most to you right now?",sub:null,type:"single",opts:["Reading academic English for my studies","Understanding lectures and presentations","Writing in English","Speaking with confidence","All of the above","Not sure yet"]},
];
const CHECKINS=[
  {id:"read",q:"Did you read anything in English today?",sub:"Article, caption, subtitle, social post.",follow:"How long?",opts:["Under 5 mins","5–15 mins","More than 15 mins"]},
  {id:"watch",q:"Did you watch or listen to anything in English?",sub:"YouTube, podcast, documentary, lecture.",follow:"How long?",opts:["Short (< 15 min)","Medium (15–30 min)","Long (> 30 min)"]},
  {id:"speak",q:"Did you speak any English today?",sub:"Even thinking aloud counts.",follow:"With whom?",opts:["A classmate","A professor","Online","Myself","Other"]},
  {id:"strategy",q:"Did you try a strategy from your last session?",sub:null,follow:null,opts:null},
];

/* ─── DIAGNOSTIC COMPONENTS ──────────────────────────────────────────────── */
const DiagIntro=({onStart})=>{const t=getT();return <Screen><div style={{maxWidth:520}}>
  <div className="fade-up"><Tag color={t.ochre}>Diagnostic</Tag>
    <h2 style={{fontFamily:T.serif,fontSize:"clamp(1.7rem,4vw,2.3rem)",color:t.text,margin:"1rem 0",lineHeight:1.3}}>Three quick tasks before we build your profile.</h2>
    <Serif size={16} color={t.muted} sx={{marginBottom:"2rem"}}>No right or wrong answers — just do what you naturally would.</Serif></div>
  <div className="fade-up fade-up-1" style={{display:"flex",flexDirection:"column",gap:10,marginBottom:"2.2rem"}}>
    {[["01","Read & Reconstruct","A paragraph disappears. Write what you understood."],["02","Unknown Words","Three unfamiliar words. Make your best guess."],["03","Prediction Check","Rate your comprehension before and after."]].map(([n,title,desc])=><div key={n} style={{display:"flex",gap:14,background:t.surface,border:`1px solid ${t.border}`,borderRadius:11,padding:"0.9rem 1.1rem"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.1em",minWidth:22}}>{n}</div><div><div style={{fontWeight:600,fontSize:14,color:t.text,marginBottom:2}}>{title}</div><div style={{fontSize:13,color:t.muted}}>{desc}</div></div></div>)}
  </div>
  <Btn onClick={onStart} sx={{fontSize:16,padding:"14px 38px"}}>Begin →</Btn>
</div></Screen>;};

const DiagA=({field,onDone})=>{
  const textRef=useRef(null);
  if(!textRef.current)textRef.current=getTextForSession(FIELD_MAP[field]||"biology",[],0);
  const text=textRef.current;
  const[phase,setPhase]=useState("read");const[answer,setAnswer]=useState("");const[timerOn,setTimerOn]=useState(true);
  const t=getT();const end=()=>{setTimerOn(false);setPhase("write");};
  return <Screen sx={{justifyContent:"flex-start",paddingTop:"2.5rem"}}><div style={{width:"100%",maxWidth:640}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.4rem"}}>
      <div><Lbl>Task 01 — Read & Reconstruct</Lbl><div style={{fontSize:13,color:t.muted}}>{text?.title} · {text?.level}</div></div>
      {phase==="read"&&<Timer seconds={90} onEnd={end} running={timerOn}/>}
    </div>
    {phase==="read"?<Card glow>
      <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1rem"}}>{text?.title}</div>
      <Serif size={17} sx={{lineHeight:1.88}}>{text?.text}</Serif>
      <div style={{borderTop:`1px solid ${t.border}`,marginTop:"1.2rem",paddingTop:"1rem"}}><Btn variant="secondary" onClick={end} sx={{fontSize:13}}>I'm done reading →</Btn></div>
    </Card>:<Card>
      <Lbl color={t.muted}>Reconstruct from memory</Lbl>
      <Serif size={15} color={t.muted} sx={{marginBottom:"1rem"}}>Write what you understood. English, French, or any mix.</Serif>
      <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Write what you understood..." style={{width:"100%",minHeight:150,background:t.surfaceUp,border:`1px solid ${answer.length>20?t.accentBorder:t.border}`,borderRadius:9,padding:"1rem",color:t.text,fontFamily:T.serif,fontSize:16,lineHeight:1.75,transition:"border-color 0.2s"}}/>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:"1rem"}}><Btn onClick={()=>onDone(answer)} disabled={answer.trim().length<8}>Submit →</Btn></div>
    </Card>}
  </div></Screen>;
};

const DiagB=({field,onDone})=>{
  const textRef=useRef(null);
  if(!textRef.current)textRef.current=getTextForSession(FIELD_MAP[field]||"biology",[],1);
  const text=textRef.current;
  const[guesses,setGuesses]=useState(["","",""]);const ok=guesses.every(g=>g.trim().length>0);
  const t=getT();
  const renderHL=()=>{if(!text)return null;let parts=[text.text];(text.unknown||[]).forEach((w,i)=>{parts=parts.flatMap(part=>{if(typeof part!=="string")return[part];const idx=part.toLowerCase().indexOf(w.toLowerCase());if(idx===-1)return[part];return[part.slice(0,idx),<mark key={`${w}${i}`} style={{background:`${t.ochre}22`,color:t.ochre,borderBottom:`2px solid ${t.ochre}`,borderRadius:2,padding:"0 2px",fontStyle:"normal"}}>{part.slice(idx,idx+w.length)}</mark>,part.slice(idx+w.length)];});});return parts;};
  return <Screen sx={{justifyContent:"flex-start",paddingTop:"2.5rem"}}><div style={{width:"100%",maxWidth:640}}>
    <Lbl>Task 02 — Unknown Words</Lbl>
    <Serif size={15} color={t.muted} sx={{marginBottom:"1.4rem"}}>Three words are highlighted. Write your best guess for each.</Serif>
    <Card sx={{marginBottom:"1.2rem"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1rem"}}>{text?.title}</div><Serif size={17} sx={{lineHeight:1.88}}>{renderHL()}</Serif></Card>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:"1.4rem"}}>
      {(text?.unknown||[]).map((w,i)=><div key={w} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:10,padding:"0.9rem 1.1rem"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span style={{background:`${t.ochre}1A`,color:t.ochre,borderRadius:4,padding:"2px 9px",fontSize:14,fontFamily:T.serif,fontStyle:"italic",fontWeight:600}}>{w}</span><span style={{fontSize:12,color:t.dim}}>means…</span></div>
        <input value={guesses[i]} onChange={e=>{const g=[...guesses];g[i]=e.target.value;setGuesses(g);}} placeholder="Your best guess" style={{width:"100%",background:t.surfaceUp,border:`1px solid ${t.border}`,borderRadius:8,padding:"9px 13px",color:t.text,fontFamily:T.sans,fontSize:14}}/>
      </div>)}
    </div>
    <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>onDone(guesses)} disabled={!ok}>Continue →</Btn></div>
  </div></Screen>;
};

const DiagC=({onDone})=>{
  const[ph,setPh]=useState("before");const[before,setBefore]=useState(null);const[after,setAfter]=useState(null);
  const t=getT();
  const sent="The mechanism by which CRISPR-Cas9 achieves its remarkable target specificity relies on Watson-Crick base pairing between the guide RNA spacer sequence and the complementary protospacer in genomic DNA, a process that is both highly efficient and inherently susceptible to off-target effects at regions of partial sequence homology.";
  const RatingRow=({val,setVal,onPick})=><div style={{display:"flex",gap:10,justifyContent:"center"}}>{[1,2,3,4,5].map(n=><button key={n} onClick={()=>{setVal(n);if(onPick)setTimeout(()=>onPick(n),320);}} style={{width:54,height:54,borderRadius:9,background:val===n?t.accentDim:t.surface,border:`1.5px solid ${val===n?t.accent:t.border}`,color:val===n?t.accent:t.text,fontFamily:T.sans,fontSize:20,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}>{n}</button>)}</div>;
  return <Screen><div style={{width:"100%",maxWidth:540}}>
    <Lbl>Task 03 — Prediction & Calibration</Lbl>
    {ph==="before"&&<div className="fade-up"><h2 style={{fontFamily:T.serif,fontSize:"1.65rem",color:t.text,marginBottom:"0.8rem",lineHeight:1.35}}>Before you read a complex genetics sentence —</h2><Serif size={15} color={t.muted} sx={{marginBottom:"1.8rem"}}>How much do you think you'll understand? (1–5)</Serif><RatingRow val={before} setVal={setBefore} onPick={()=>setPh("read")}/><div style={{textAlign:"center",fontSize:12,color:t.dim,marginTop:10}}>1 = very little · 5 = almost everything</div></div>}
    {ph==="read"&&<div className="fade-up"><Card glow sx={{marginBottom:"1.4rem"}}><Lbl color={t.muted}>Read carefully</Lbl><Serif size={17} sx={{lineHeight:1.9}}>{sent}</Serif></Card><Btn onClick={()=>setPh("after")}>I've read it →</Btn></div>}
    {ph==="after"&&<div className="fade-up"><h2 style={{fontFamily:T.serif,fontSize:"1.65rem",color:t.text,marginBottom:"0.6rem",lineHeight:1.35}}>Now that you've read it —</h2><Serif size={15} color={t.muted} sx={{marginBottom:"1.6rem"}}>How much did you actually understand? (You predicted: {before}/5)</Serif><RatingRow val={after} setVal={setAfter} onPick={v=>onDone({before,after:v})}/></div>}
  </div></Screen>;
};

const Auth=({onAuth})=>{
  const t=getT();
  const[mode,setMode]=useState("signup");
  const[form,setForm]=useState({name:"",email:"",password:"",university:"",city:""});
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState("");
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  const inp=(key,ph,type="text")=><input type={type} value={form[key]} placeholder={ph} onChange={e=>f(key,e.target.value)} style={{width:"100%",background:t.surfaceUp,border:`1px solid ${form[key]?t.accentBorder:t.border}`,borderRadius:9,padding:"11px 14px",color:t.text,fontFamily:T.sans,fontSize:14,marginBottom:10}}/>;
  const go=async()=>{
    setErr("");setLoading(true);
    if(mode==="signup"){
      if(!form.name||!form.email||!form.password){setErr("Please fill in all required fields.");setLoading(false);return;}
      if(form.password.length<6){setErr("Password must be at least 6 characters.");setLoading(false);return;}
      const{data,error}=await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{name:form.name}}});
      if(error){setErr(error.message);setLoading(false);return;}
      if(data.user){await db.saveProfile(data.user.id,{name:form.name,email:form.email,university:form.university||"",city:form.city||""});onAuth(data.user);}
    }else{
      if(!form.email||!form.password){setErr("Please enter your email and password.");setLoading(false);return;}
      const{data,error}=await supabase.auth.signInWithPassword({email:form.email,password:form.password});
      if(error){setErr(error.message);setLoading(false);return;}
      if(data.user)onAuth(data.user);
    }
    setLoading(false);
  };
  return <Screen>
    <div style={{width:"100%",maxWidth:440}}>
      <div className="fade-up" style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:16}}>
          <UnivLogo size={44}/>
          <div style={{textAlign:"left"}}>
            <div style={{fontFamily:T.sans,fontSize:10,color:t.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Ibn Tofail University</div>
            <div style={{fontFamily:T.sans,fontSize:16,fontWeight:700,color:t.accent,letterSpacing:"0.14em"}}>أقلام · AQLAM</div>
          </div>
        </div>
        <h1 style={{fontFamily:T.serif,fontSize:"clamp(1.8rem,5vw,2.4rem)",fontWeight:600,color:t.text,lineHeight:1.2,marginBottom:8}}>{mode==="signup"?"Create your account":"Welcome back"}</h1>
        <Serif size={14} color={t.muted}>{mode==="signup"?"Your progress and test scores save across all devices.":"Sign in to continue your journey."}</Serif>
      </div>
      <Card>
        <div style={{display:"flex",marginBottom:"1.4rem",background:t.surfaceUp,borderRadius:9,padding:3}}>
          {[["signup","Sign Up"],["signin","Sign In"]].map(([id,label])=><button key={id} onClick={()=>{setMode(id);setErr("");}} style={{flex:1,padding:"8px",borderRadius:7,border:"none",background:mode===id?t.surface:"transparent",color:mode===id?t.text:t.muted,fontFamily:T.sans,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.17s"}}>{label}</button>)}
        </div>
        {mode==="signup"&&<>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Full Name *</div>
          {inp("name","e.g. Fatima Zahra El Idrissi")}
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Email Address *</div>
          {inp("email","your@email.com","email")}
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Password * (min 6 characters)</div>
          {inp("password","Create a password","password")}
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>University</div>
          {inp("university","e.g. Ibn Tofail University")}
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>City</div>
          {inp("city","e.g. Kénitra")}
        </>}
        {mode==="signin"&&<>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Email</div>
          {inp("email","your@email.com","email")}
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Password</div>
          {inp("password","Your password","password")}
        </>}
        <ErrMsg msg={err}/>
        <div style={{marginTop:14}}><Btn onClick={go} disabled={loading} full>{loading?<Spinner size={20}/>:mode==="signup"?"Create Account →":"Sign In →"}</Btn></div>
      </Card>
      <div style={{textAlign:"center",marginTop:14,fontSize:11,color:t.dim}}>A research tool · Ibn Tofail University & Art'ComSup</div>
    </div>
  </Screen>;
};

const Welcome=({onStart})=>{
  const t=getT();
  return <Screen>
    <div style={{maxWidth:580,textAlign:"center"}}>
      <div className="fade-up" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:24}}>
        <UnivLogo size={40}/>
        <div style={{textAlign:"left"}}>
          <div style={{fontFamily:T.sans,fontSize:10,color:t.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Ibn Tofail University · Art'ComSup</div>
          <div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:t.accent,letterSpacing:"0.12em"}}>أقلام · AQLAM</div>
        </div>
      </div>
      <h1 className="fade-up fade-up-1" style={{fontFamily:T.serif,fontSize:"clamp(2.6rem,6vw,3.8rem)",fontWeight:600,color:t.text,lineHeight:1.12,marginBottom:"1rem"}}>The tools of<br/><span style={{color:t.accent}}>knowledge</span> await.</h1>
      <Serif size={17} color={t.muted} sx={{maxWidth:440,margin:"0 auto 2rem"}}>A daily English companion for Moroccan STEM students — 100 academic texts, 5 strategy types, field-specific EAP assessment.</Serif>
      <div className="fade-up fade-up-2" style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:"2.5rem"}}>{["Cognitive","Metacognitive","Compensation","Adaptive","EAP Assessment"].map(t=><Tag key={t}>{t}</Tag>)}</div>
      <div className="fade-up fade-up-3"><Btn onClick={onStart} sx={{fontSize:16,padding:"15px 48px"}}>Begin →</Btn><div style={{fontSize:12,color:t.dim,marginTop:10}}>Placement test · preferences · your learning profile</div></div>
    </div>
  </Screen>;
};

const Prefs=({step,answers,setAnswers,onNext,onBack})=>{
  const t=getT();
  const q=PREFS[step];const cur=answers[q.id]||(q.type==="multi"?[]:null);
  const toggle=(opt)=>{if(q.type==="single")setAnswers(a=>({...a,[q.id]:opt}));else{const arr=Array.isArray(cur)?cur:[];setAnswers(a=>({...a,[q.id]:arr.includes(opt)?arr.filter(x=>x!==opt):[...arr,opt]}));}};
  const ok=q.type==="single"?!!cur:(Array.isArray(cur)&&cur.length>0);
  return <Screen><div style={{width:"100%",maxWidth:560}}>
    <ProgressBar current={step+1} total={5}/>
    <div className="fade-up">
      <Lbl>{q.n} / 05 — Preferences</Lbl>
      <h2 style={{fontFamily:T.serif,fontSize:"clamp(1.6rem,3.5vw,2.1rem)",color:t.text,marginBottom:8,lineHeight:1.3}}>{q.q}</h2>
      {q.sub&&<Serif size={15} color={t.muted} sx={{marginBottom:"1.4rem"}}>{q.sub}</Serif>}
      <div style={{display:"flex",flexWrap:"wrap",gap:9,margin:"1.2rem 0 2rem"}}>
        {q.opts.map(opt=>{const sel=q.type==="single"?cur===opt:(Array.isArray(cur)&&cur.includes(opt));return <button key={opt} onClick={()=>toggle(opt)} style={{background:sel?t.accentDim:t.surface,border:`1.5px solid ${sel?t.accent:t.border}`,color:sel?t.accent:t.text,borderRadius:9,padding:"9px 15px",fontSize:14,fontFamily:T.sans,fontWeight:sel?600:400,cursor:"pointer",transition:"all 0.15s"}}>{opt}</button>;})}
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        {step>0?<Btn variant="ghost" onClick={onBack}>← Back</Btn>:<div/>}
        <Btn onClick={()=>{
          if(step<4){onNext();}
          else{
            const finalA={...answers};
            if(q.type==="single"&&cur)finalA[q.id]=cur;
            else if(q.type==="multi"&&Array.isArray(cur)&&cur.length>0)finalA[q.id]=cur;
            console.log('PREFS FINAL ANSWERS:', JSON.stringify(finalA));
            console.log('PREFS answers prop:', JSON.stringify(answers));
            console.log('PREFS cur:', JSON.stringify(cur));
            onNext(finalA);
          }
        }} disabled={!ok}>{step<4?"Continue →":"Start Placement Test →"}</Btn>
      </div>
    </div>
  </div></Screen>;
};

const Home=({profile,userInfo,sessions,checkinDone,streak,showPostTest,onLoop,onCheckin,onProfile,onPostTest})=>{
  const t=getT();
  const h=new Date().getHours();const greet=h<12?"Good morning":h<18?"Good afternoon":"Good evening";
  const name=userInfo?.name?`, ${userInfo.name.split(" ")[0]}`:"";
  const n=sessions.length;const tier=getTier(n);const nextType=SESSION_TYPES[getSessionType(n)];const level=getLevel(n);
  const nudges=["Before your next academic text: predict its structural pattern — argue, explain, compare, or describe?","When you encounter an unknown English word, try the French cognate first — then context.","Try a GIST: read one paragraph, close it, write its central idea in exactly 20 words.","Set a micro-goal before your next 15 minutes of study. Check whether you achieved it.","When something is hard to express in English, describe it without the key term. That is circumlocution.","Pay attention to signal words today: however, therefore, consequently — they carry the argument.","Before reading anything in English today, predict what type of text it is. Check after."];
  const nudge=nudges[new Date().getDay()%nudges.length];
  return <div style={{minHeight:"100vh",background:t.bg}}>
    <div style={{background:t.surface,borderBottom:`1px solid ${t.border}`,padding:"0.8rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <UnivLogo size={28}/>
        <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:t.accent,letterSpacing:"0.14em"}}>أقلام · AQLAM</div>
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        {streak>0&&<div style={{display:"flex",alignItems:"center",gap:5,background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:20,padding:"3px 11px"}}><span style={{fontSize:13}}>◆</span><span style={{fontSize:12,fontWeight:700,color:t.ochre}}>{streak}</span></div>}
        <button onClick={onProfile} style={{background:t.surfaceUp,border:`1px solid ${t.border}`,borderRadius:7,padding:"5px 13px",fontSize:12,color:t.muted,fontFamily:T.sans,cursor:"pointer"}}>Profile</button>
      </div>
    </div>
    <div style={{maxWidth:640,margin:"0 auto",padding:"2rem 1.5rem"}}>
      <div className="fade-up" style={{marginBottom:"1.6rem"}}>
        <h1 style={{fontFamily:T.serif,fontSize:"clamp(1.7rem,4vw,2.3rem)",color:t.text,marginBottom:6}}>{greet}{name}.</h1>
        <Serif size={16} color={t.muted}>{checkinDone?"You have checked in today. Your learning loop is ready.":"Start with today's check-in — two minutes, honest answers."}</Serif>
      </div>

      {showPostTest&&<div className="fade-up" style={{background:`${t.ochre}0D`,border:`1.5px solid ${t.ochreBorder}`,borderRadius:14,padding:"1.1rem 1.3rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <Lbl color={t.ochre}>Progress test available</Lbl>
          <Serif size={14} color={t.muted}>Two weeks have passed. Take your progress test to see how far you have come.</Serif>
        </div>
        <Btn variant="ochre" onClick={onPostTest} sx={{whiteSpace:"nowrap",marginLeft:12}}>Take test →</Btn>
      </div>}

      <div className="fade-up fade-up-1" style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <TierBadge n={tier}/>
          <div><div style={{fontFamily:T.sans,fontWeight:600,fontSize:13}}>{n} sessions completed</div><div style={{fontFamily:T.sans,fontSize:11,color:t.muted}}>Level: {level} · Next: {nextType.label}</div></div>
        </div>
        <div style={{fontSize:11,color:t.dim,textAlign:"right",maxWidth:140}}>
          {n<3&&`${3-n} until GIST unlocks`}{n>=3&&n<6&&`${6-n} until Word Inference`}{n>=6&&n<10&&`${10-n} until Dictogloss`}{n>=10&&n<14&&`${14-n} until Circumlocution`}{n>=14&&"All types unlocked ✓"}
        </div>
      </div>

      <div className="fade-up fade-up-1" style={{background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1.4rem"}}><Lbl color={t.ochre}>Today's strategy nudge</Lbl><Serif size={15}>{nudge}</Serif></div>

      <div className="fade-up fade-up-2" style={{display:"grid",gap:"1rem",gridTemplateColumns:"1fr 1fr",marginBottom:"1.4rem"}}>
        {[{icon:"◉",title:"Daily Check-In",desc:checkinDone?"Done today ✓":"2 min · Reflect on your exposure",accent:t.ochre,action:onCheckin,done:checkinDone},{icon:"▶",title:"Learning Loop",desc:`${nextType.label} · ${level}`,accent:t.accent,action:onLoop,done:false}].map(({icon,title,desc,accent,action,done})=>(
          <button key={title} onClick={action} style={{background:done?`${accent}0A`:t.surface,border:`1px solid ${done?`${accent}40`:t.border}`,borderRadius:13,padding:"1.2rem",textAlign:"left",cursor:"pointer",transition:"all 0.18s",width:"100%"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=`${accent}60`;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=done?`${accent}40`:t.border;e.currentTarget.style.transform="";}}>
            <div style={{fontSize:20,color:accent,marginBottom:8}}>{icon}</div>
            <div style={{fontFamily:T.sans,fontWeight:600,fontSize:14,marginBottom:3,color:done?t.muted:t.text}}>{title}</div>
            <div style={{fontFamily:T.sans,fontSize:12,color:t.muted}}>{desc}</div>
          </button>
        ))}
      </div>

      {showPostTest&&<div className="fade-up fade-up-2" style={{background:T.coralDim,border:`1px solid ${T.coralBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><Lbl color={T.coral}>Progress test available</Lbl><Serif size={14}>14 days have passed. Take your progress test to measure your improvement.</Serif></div><Btn variant="coral" onClick={onPostTest} sx={{fontSize:13,padding:"10px 18px",whiteSpace:"nowrap"}}>Take test →</Btn></div>}
      {sessions.length>0?<div className="fade-up fade-up-3"><Card><Lbl>Recent sessions</Lbl>{sessions.slice(-5).reverse().map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.6rem 0",borderBottom:i<Math.min(sessions.length,5)-1?`1px solid ${t.border}`:"none"}}><div><div style={{fontSize:13,fontWeight:600}}>{s.text_title||s.textTitle}</div><div style={{fontSize:11,color:t.muted}}>{s.session_type||s.strategy} · {s.date}</div></div><Tag color={(s.self_rating||s.selfRating)>=4?t.accent:t.ochre}>{(s.self_rating||s.selfRating)>=4?"Applied":"Learning"}</Tag></div>)}</Card></div>:<div style={{textAlign:"center",padding:"2.5rem 0",color:t.dim,fontSize:13}}>Your session history will appear here after your first learning loop.</div>}
    </div>
  </div>;
};

const CheckIn=({onDone})=>{
  const t=getT();
  const[step,setStep]=useState(0);const[answers,setAnswers]=useState({});const[followup,setFollowup]=useState(false);
  const q=CHECKINS[step];
  const pick=(val)=>{const ans={...answers,[q.id]:{main:val}};setAnswers(ans);if(val==="Yes"&&q.follow)setFollowup(true);else advance(ans);};
  const pickFollow=(val)=>{const ans={...answers,[q.id]:{main:"Yes",detail:val}};setAnswers(ans);setFollowup(false);advance(ans);};
  const advance=(ans)=>{setFollowup(false);if(step<CHECKINS.length-1)setStep(s=>s+1);else{const yeses=Object.values(ans).filter(a=>a?.main==="Yes").length;const ack=yeses===0?"No exposure logged — honest answer. The check-in itself is the habit.":yeses>=3?"Solid exposure across multiple modalities. That kind of varied daily contact is exactly what the research supports.":"Good. Consistent daily exposure compounds over weeks.";onDone({answers:ans,acknowledgement:ack});}};
  return <Screen><div style={{width:"100%",maxWidth:480}}>
    <ProgressBar current={step+1} total={CHECKINS.length}/>
    <Lbl color={t.ochre}>Daily Check-In</Lbl>
    {!followup?<div className="fade-up"><h2 style={{fontFamily:T.serif,fontSize:"1.7rem",color:t.text,marginBottom:8,lineHeight:1.4}}>{q.q}</h2>{q.sub&&<Serif size={15} color={t.muted} sx={{marginBottom:"1.4rem"}}>{q.sub}</Serif>}<div style={{display:"flex",gap:12,marginTop:q.sub?0:"1.4rem"}}>{["Yes","No"].map(opt=><button key={opt} onClick={()=>pick(opt)} style={{flex:1,background:t.surface,border:`1.5px solid ${t.border}`,color:t.text,borderRadius:11,padding:"13px",fontFamily:T.sans,fontSize:16,fontWeight:600,cursor:"pointer",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=opt==="Yes"?t.accent:t.muted;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;}}>{opt}</button>)}</div></div>:<div className="fade-up"><Serif size={16} color={t.muted} sx={{marginBottom:"1.2rem"}}>{q.follow}</Serif><div style={{display:"flex",flexDirection:"column",gap:9}}>{q.opts.map(opt=><button key={opt} onClick={()=>pickFollow(opt)} style={{background:t.surface,border:`1px solid ${t.border}`,color:t.text,borderRadius:11,padding:"11px 15px",fontFamily:T.sans,fontSize:14,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;}}>{opt}</button>)}</div></div>}
  </div></Screen>;
};

const CheckInAck=({ack,onBack})=>{const t=getT();return <Screen><div style={{maxWidth:480,textAlign:"center"}} className="fade-up"><div style={{fontSize:28,marginBottom:"1rem",color:t.ochre}}>◆</div><h2 style={{fontFamily:T.serif,fontSize:"1.7rem",color:t.text,marginBottom:"1rem"}}>Noted.</h2><div style={{background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:12,padding:"1.2rem 1.4rem",marginBottom:"2rem",textAlign:"left"}}><Serif size={16}>{ack}</Serif></div><Btn onClick={onBack}>Return home →</Btn></div></Screen>;};


/* ─── SMART ANNOTATION ENGINE ────────────────────────────────────────────── */
const generateAnnotation = (sessionType, text, answer, planAnswers) => {
  if (!text || !answer) return "No response detected. Try writing what you understood before submitting.";

  const orig = text.text || "";
  const resp = answer.replace(/\|\|\|/g, " ").trim();

  // ── Gibberish / effort detection ──────────────────────────────────────────
  const words = resp.split(/\s+/).filter(w => w.length > 0);
  const realWords = words.filter(w => /^[a-zA-ZÀ-ÿ؀-ۿ]{2,}$/.test(w));
  const avgLen = realWords.reduce((s, w) => s + w.length, 0) / (realWords.length || 1);
  const uniqueChars = new Set(resp.toLowerCase().replace(/\s/g, "")).size;

  if (realWords.length < 3 || uniqueChars < 6 || avgLen < 2.5) {
    return "This response does not appear to contain meaningful language. AQLAM requires a genuine attempt — write what you understood in English, French, Darija, or any mix. The reconstruction task only works if you engage honestly with the text.";
  }

  // ── Word overlap analysis ──────────────────────────────────────────────────
  const origWords = new Set(orig.toLowerCase().match(/[a-zA-ZÀ-ÿ]{4,}/g) || []);
  const respWords = new Set(resp.toLowerCase().match(/[a-zA-ZÀ-ÿ]{4,}/g) || []);
  const overlap = [...respWords].filter(w => origWords.has(w));
  const overlapPct = overlap.length / (origWords.size || 1);

  // ── Key concept detection ──────────────────────────────────────────────────
  const sentences = orig.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const firstSent = sentences[0] || "";
  const lastSent = sentences[sentences.length - 1] || "";

  // Detect causal/contrast signal words in original
  const signalWords = ["however","therefore","consequently","although","whereas","despite","because","thus","hence","moreover","furthermore","nevertheless"];
  const origSignals = signalWords.filter(w => orig.toLowerCase().includes(w));
  const respSignals = signalWords.filter(w => resp.toLowerCase().includes(w));
  const missedSignals = origSignals.filter(w => !respSignals.includes(w));

  // ── Session-type specific feedback ────────────────────────────────────────
  if (sessionType === "gist") {
    const wc = words.length;
    if (wc < 15 || wc > 25) {
      return `Your GIST has ${wc} words — the target is exactly 20. ${wc < 15 ? "Expand to include the main claim and one key supporting idea." : "Compress to remove secondary details and keep only the central argument."} The 20-word constraint forces you to identify what the text is fundamentally arguing, not just describing.`;
    }
    if (overlapPct < 0.15) {
      return `Your 20-word summary captures some ideas but drifts from the text's central claim. The original argues specifically about ${firstSent.slice(0, 60).trim()}... — your GIST should name this claim explicitly. Metacognitive check: re-read the first and last sentences before writing your GIST.`;
    }
    return `Good GIST attempt — ${wc} words, engaging with the core content. ${missedSignals.length > 0 ? `The logical connector "${missedSignals[0]}" in the original signals a key turn in the argument that your summary missed.` : "Your compression of the main idea is on target."} For the Redo, predict the text structure before reading — does it argue, explain, compare, or describe?`;
  }

  if (sessionType === "wordInference") {
    const guesses = answer.split("|||").map(g => g.trim()).filter(Boolean);
    const blanks = guesses.filter(g => g.length < 3).length;
    if (blanks > 0) {
      return `${blanks} of your word guesses are missing or too brief. Even an uncertain guess activates compensation strategy — write something, even if it is a French cognate or a description of the word's role. Attempting is the move.`;
    }
    const shortGuesses = guesses.filter(g => g.split(/\s+/).length < 2).length;
    if (shortGuesses >= 2) {
      return `Your guesses are single words — try expanding to a short definition. For example, instead of "change", write "a change in how something is organised". The French cognate bridge is powerful here: check if any unknown word resembles a French term you know.`;
    }
    return `You attempted all three words — that is the compensation move your dissertation identifies as strongly correlated with proficiency (r=.546). ${overlap.length > 2 ? "Your guesses show good contextual reasoning." : "For the Redo, look for word structure clues: prefixes like 'de-', 'un-', 'inter-' and suffixes like '-tion', '-ity', '-al' often have direct French equivalents."} Check the actual definitions above and note where your reasoning was accurate.`;
  }

  if (sessionType === "circumlocution") {
    if (overlapPct > 0.3) {
      return "Your circumlocution uses several terms from the concept's standard definition — check that you are not using the concept name or its direct translations. The strategy works by forcing you to activate vocabulary you already own, not to recall specialised terminology.";
    }
    if (words.length < 20) {
      return "Your circumlocution is too brief to communicate the concept clearly. Aim for at least 3-4 sentences: start with the domain it belongs to, describe what it does or produces, give an example or analogy, and state why it matters. The goal is that someone with no prior knowledge could understand what you mean.";
    }
    return `Good circumlocution attempt — you described the concept without using its name. ${missedSignals.length > 0 ? "Strengthen your explanation by adding a cause-effect or contrast relationship." : "Your description captures the functional essence of the concept."} For the Redo, lead with the most important property first, then elaborate.`;
  }

  // ── Default: reconstruction / dictogloss ──────────────────────────────────
  if (overlapPct < 0.08) {
    return `Your reconstruction shares very few words or concepts with the original text — it appears to be responding to a different idea than what the text argues. The original opens with: "${firstSent.slice(0, 70).trim()}..." Before the Redo, use the signal phase: read the title and predict the structural pattern (argue / explain / compare / describe) before the text appears. This gives your memory a framework to attach meaning to.`;
  }

  if (overlapPct < 0.25) {
    const missingConcept = [...origWords].find(w => w.length > 6 && !respWords.has(w));
    return `Your reconstruction captures some ideas from the passage but misses core concepts${missingConcept ? ` — notably the concept of "${missingConcept}"` : ""}. ${missedSignals.length > 0 ? `The signal word "${missedSignals[0]}" marks a key logical turn you did not reconstruct — these words carry the argument's architecture.` : "Focus on the causal relationships, not just the isolated facts."} For the Redo, identify the text's main claim in the first sentence before reading further.`;
  }

  if (missedSignals.length >= 2) {
    return `Your reconstruction recovers the main ideas well but loses the logical structure. The original uses "${missedSignals[0]}" and "${missedSignals[1]}" to connect its claims — your reconstruction flattens these into a list. Text-structure mapping means noticing not just what the text says, but how it argues: cause-effect, contrast, claim-evidence. For the Redo, read for the connectors first.`;
  }

  const predicted = planAnswers?.predict || "";
  const predictionAccurate = predicted.length > 10 && overlap.length > 3;
  return `Strong reconstruction — you recovered the central argument with good accuracy. ${predictionAccurate ? "Your pre-reading prediction aligned well with the actual content, showing active metacognitive preparation." : "For the Redo, make your pre-reading prediction more specific: name the structural pattern before reading."} ${origSignals.length > 0 && respSignals.length === origSignals.length ? "You preserved the logical connectors — that is the mark of text-structure mapping applied well." : "One refinement: preserve the original's causal language in your reconstruction."}`;
};

const Loop=({profile,sessions,onSessionDone,onExit})=>{
  const t=getT();
  const sessionCount=sessions.length;
  const sessionType=getSessionType(sessionCount);
  const seenIds=sessions.map(s=>s.text_id||s.textId).filter(Boolean);
  const field=FIELD_MAP[profile?.field]||"biology";
  const textRef=useRef(null);
  const altTextRef=useRef(null);
  if(!textRef.current)textRef.current=getTextForSession(field,seenIds,sessionCount);
  if(!altTextRef.current)altTextRef.current=getRandomText(field,[...seenIds,textRef.current?.id].filter(Boolean));
  const text=textRef.current;const altText=altTextRef.current;
  const typeInfo=SESSION_TYPES[sessionType];
  const phases=["plan","do","see","redo","rate"];

  const[phase,setPhase]=useState("signal");
  const[planStep,setPlanStep]=useState(0);const[planAnswers,setPlanAnswers]=useState({});
  const[mainAnswer,setMainAnswer]=useState("");const[redoAnswer,setRedoAnswer]=useState("");
  const[textVisible,setTextVisible]=useState(true);const[timerOn,setTimerOn]=useState(false);
  const[annotation,setAnnotation]=useState("");const[loading,setLoading]=useState(false);
  const[selfRating,setSelfRating]=useState(null);const[sessionsDone,setSessionsDone]=useState(0);

  const planQs=[{id:"predict",q:"What do you predict this text will argue or explain?",ph:"Arguing a claim? Explaining a process? Describing findings?"},{id:"hard",q:"What do you think will be hardest about it?",ph:"Vocabulary? Dense structure? Causal reasoning?"},{id:"focus",q:"Where will you focus your attention first?",ph:"Opening claim? Signal words? Technical terms?"}];
  const getStratName=()=>({reconstruction:"Text-structure mapping",gist:"GIST summarisation",wordInference:"Contextual word inference",dictogloss:"Dictogloss reconstruction",circumlocution:"Circumlocution"}[sessionType]);
  const getStratExp=()=>({reconstruction:"Text-structure mapping — predicting whether a text argues, explains, compares, or describes before reading — gives your memory a framework to attach meaning to, dramatically improving recall.",gist:"GIST forces you to identify the single most important idea in exactly 20 words. The constraint trains precise comprehension. Proficient academic readers do this automatically before taking notes.",wordInference:"Contextual inference — using surrounding text and word structure to deduce meaning — is the compensation strategy most strongly correlated with reading proficiency. Your French knowledge is a systematic advantage.",dictogloss:"Dictogloss builds the habit of holding meaning, not words, in working memory. Reconstruction forces active processing that creates much stronger memory traces than passive reading.",circumlocution:"Circumlocution — explaining a concept without its name — develops communicative compensation, correlated with proficiency at r=.546 in El Machichi (2026)."}[sessionType]);
  const getDoInstr=()=>({reconstruction:"Read. Then it disappears. Write what you understood from memory.",gist:"Read the text. Write its central idea in exactly 20 words — no more, no less.",wordInference:"Read the text. Then write your best guess for each highlighted word.",dictogloss:"Read twice. Then reconstruct the full text from memory in your own words.",circumlocution:`Explain what "${text?.title}" means without using that term or its translations.`}[sessionType]);

  const submitDo=async()=>{
    setPhase("see");
    setAnnotation(generateAnnotation(sessionType,text,mainAnswer,planAnswers));
  };

  const complete=async()=>{
    const s={text_id:text?.id,text_title:text?.title,session_type:sessionType,strategy:getStratName(),level:getLevel(sessionCount),self_rating:selfRating,date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"})};
    await onSessionDone(s);setSessionsDone(n=>n+1);setPhase("between");
  };

  const startAnother=()=>{
    textRef.current=null;altTextRef.current=null;
    setPlanStep(0);setPlanAnswers({});setMainAnswer("");setRedoAnswer("");
    setTextVisible(true);setTimerOn(false);setAnnotation("");setSelfRating(null);setPhase("signal");
  };

  const renderHL=()=>{if(!text)return null;let parts=[text.text];(text.unknown||[]).forEach((w,i)=>{parts=parts.flatMap(part=>{if(typeof part!=="string")return[part];const idx=part.toLowerCase().indexOf(w.toLowerCase());if(idx===-1)return[part];return[part.slice(0,idx),<mark key={`${w}${i}`} style={{background:`${t.ochre}22`,color:t.ochre,borderBottom:`2px solid ${t.ochre}`,borderRadius:2,padding:"0 2px",fontStyle:"normal"}}>{part.slice(idx,idx+w.length)}</mark>,part.slice(idx+w.length)];});});return parts;};

  if(phase==="between"){
    const newCount=sessionCount+sessionsDone;const nxt=SESSION_TYPES[getSessionType(newCount)];
    const unlocked=(newCount===3?"GIST Summary":newCount===6?"Word Inference":newCount===10?"Dictogloss":newCount===14?"Circumlocution":null);
    return <Screen><div style={{maxWidth:480,textAlign:"center"}} className="fade-up">
      <div style={{fontSize:26,color:t.accent,marginBottom:"1rem"}}>◎</div>
      <h2 style={{fontFamily:T.serif,fontSize:"1.8rem",color:t.text,marginBottom:"0.6rem"}}>Session {sessionsDone} complete.</h2>
      {unlocked&&<div style={{background:t.accentDim,border:`1px solid ${t.accentBorder}`,borderRadius:12,padding:"1rem 1.2rem",margin:"1rem 0",textAlign:"left"}}><Lbl>New session type unlocked</Lbl><Serif size={15}>{unlocked} is now available.</Serif></div>}
      <Serif size={15} color={t.muted} sx={{margin:"0.8rem 0 1.8rem"}}>{selfRating>=4?"Applied deliberately — the habit is forming.":"Building the pattern. Consistency beats perfection."}{sessionsDone>1?` ${sessionsDone} sessions this sitting.`:""}</Serif>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <Btn onClick={startAnother} full>Another session → {nxt.label}</Btn>
        <Btn variant="secondary" onClick={onExit} full>Return home</Btn>
      </div>
      <div style={{fontSize:11,color:t.dim,marginTop:12}}>Next: {nxt.label} · {getLevel(newCount)} · {profile?.field}</div>
    </div></Screen>;
  }

  if(phase==="signal"){return <Screen><div style={{width:"100%",maxWidth:500}} className="fade-up">
    <PhaseBar phases={phases} current="plan"/>
    <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:"1rem"}}><Tag color={typeInfo.id==="reconstruction"?t.accent:typeInfo.id==="gist"||typeInfo.id==="wordInference"?t.ochre:t.coral}>{typeInfo.label}</Tag><TierBadge n={getTier(sessionCount)}/></div>
    <h2 style={{fontFamily:T.serif,fontSize:"1.8rem",color:t.text,margin:"0.5rem 0",lineHeight:1.3}}>Before the text appears — look at what you are about to read.</h2>
    <Serif size={15} color={t.muted} sx={{marginBottom:"1.6rem"}}>Activate what you already know before a single word appears.</Serif>
    <div style={{background:t.surfaceUp,border:`1.5px solid ${t.accentBorder}`,borderRadius:14,padding:"1.4rem 1.6rem",marginBottom:"1.8rem"}}>
      {[{label:"Field",value:profile?.field||"Biology"},{label:"Text type",value:text?.type==="textbook"?"Textbook excerpt":text?.type==="abstract"?"Journal abstract":"Science journalism"},{label:"Title",value:text?.title},{label:"Level",value:(text?.level||"B1")+" academic English"},{label:"Task",value:typeInfo.desc}].map(({label,value})=><div key={label} style={{display:"flex",gap:"1rem",alignItems:"baseline",marginBottom:"0.7rem"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.1em",textTransform:"uppercase",minWidth:72}}>{label}</div><div style={{fontFamily:T.serif,fontSize:16,color:t.text}}>{value}</div></div>)}
      <div style={{borderTop:`1px solid ${t.border}`,marginTop:"0.8rem",paddingTop:"0.8rem"}}><Serif size={14} color={t.dim}>The full text has not appeared yet. Answer three questions based only on what you see above.</Serif></div>
    </div>
    <Btn onClick={()=>setPhase("plan")} full>I am ready to predict →</Btn>
  </div></Screen>;}

  if(phase==="plan"){const pq=planQs[planStep];const cur=planAnswers[pq.id]||"";
    return <Screen><div style={{width:"100%",maxWidth:540}}>
      <PhaseBar phases={phases} current="plan"/>
      <h2 style={{fontFamily:T.serif,fontSize:"1.7rem",color:t.text,margin:"0.9rem 0 0.5rem",lineHeight:1.35}}>{pq.q}</h2>
      <Serif size={14} color={t.muted} sx={{marginBottom:"1.2rem"}}>{planStep===0?"You have seen the title and field. What do you expect this text to do — argue, explain, describe, or compare?":planStep===1?"What specifically will challenge you — vocabulary, structure, or reasoning?":"Where will your attention go first — main claim, key terms, or sentence structure?"}</Serif>
      <textarea value={cur} onChange={e=>setPlanAnswers(a=>({...a,[pq.id]:e.target.value}))} placeholder={pq.ph} rows={4} style={{width:"100%",background:t.surface,border:`1px solid ${cur?t.accentBorder:t.border}`,borderRadius:11,padding:"1rem",color:t.text,fontFamily:T.serif,fontSize:16,lineHeight:1.75,marginBottom:"1.2rem",transition:"border-color 0.2s"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:12,color:t.dim}}>{planStep+1} of {planQs.length}</div><Btn onClick={()=>{if(planStep<planQs.length-1)setPlanStep(s=>s+1);else{setPhase("do");setTimerOn(true);}}} disabled={cur.trim().length<3}>{planStep<planQs.length-1?"Next →":"Begin reading →"}</Btn></div>
    </div></Screen>;}

  if(phase==="do"){const isWI=sessionType==="wordInference";const isCirc=sessionType==="circumlocution";
    return <Screen sx={{justifyContent:"flex-start",paddingTop:"2.5rem"}}><div style={{width:"100%",maxWidth:640}}>
      <PhaseBar phases={phases} current="do"/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.2rem"}}>
        <div><div style={{fontFamily:T.sans,fontSize:13,color:t.muted,marginTop:4}}>{getDoInstr()}</div></div>
        {textVisible&&!isCirc&&<Timer seconds={sessionType==="dictogloss"?180:120} onEnd={()=>{setTimerOn(false);if(!isWI)setTextVisible(false);}} running={timerOn}/>}
      </div>
      {isCirc?<Card><div style={{background:t.accentDim,border:`1px solid ${t.accentBorder}`,borderRadius:10,padding:"1rem 1.2rem",marginBottom:"1rem"}}><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.accent,marginBottom:4}}>Explain this concept without using its name:</div><div style={{fontFamily:T.serif,fontSize:22,fontWeight:600,color:t.text}}>{text?.title}</div></div><textarea value={mainAnswer} onChange={e=>setMainAnswer(e.target.value)} placeholder="Describe the concept using only words you know well..." rows={6} style={{width:"100%",background:t.surfaceUp,border:`1px solid ${mainAnswer.length>20?t.accentBorder:t.border}`,borderRadius:9,padding:"1rem",color:t.text,fontFamily:T.serif,fontSize:16,lineHeight:1.75,marginBottom:"1rem",transition:"border-color 0.2s"}}/><div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={submitDo} disabled={mainAnswer.trim().length<20}>Submit →</Btn></div></Card>
      :textVisible?<Card glow>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.08em",textTransform:"uppercase"}}>{text?.title}</div><Tag>{text?.level}</Tag></div>
        <Serif size={17} sx={{lineHeight:1.92}}>{isWI?renderHL():text?.text}</Serif>
        <div style={{borderTop:`1px solid ${t.border}`,marginTop:"1.2rem",paddingTop:"1rem"}}><Btn variant="secondary" onClick={()=>{setTimerOn(false);if(!isWI)setTextVisible(false);}} sx={{fontSize:13}}>I am done reading →</Btn></div>
      </Card>:<Card>
        <Lbl color={t.muted}>{isWI?"Now guess each highlighted word:":"Reconstruct from memory"}</Lbl>
        {isWI?<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {(text?.unknown||[]).map((w,i)=><div key={w} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:10,padding:"0.9rem 1.1rem"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}><span style={{background:`${t.ochre}1A`,color:t.ochre,borderRadius:4,padding:"2px 9px",fontSize:14,fontFamily:T.serif,fontStyle:"italic",fontWeight:600}}>{w}</span><span style={{fontSize:11,color:t.dim,flex:1}}>{text?.hints?.[i]}</span></div>
            <input value={(mainAnswer||"").split("|||")[i]||""} onChange={e=>{const parts=(mainAnswer||"").split("|||");while(parts.length<3)parts.push("");parts[i]=e.target.value;setMainAnswer(parts.join("|||"));}} placeholder="Your best guess" style={{width:"100%",background:t.surfaceUp,border:`1px solid ${t.border}`,borderRadius:8,padding:"9px 13px",color:t.text,fontFamily:T.sans,fontSize:14}}/>
          </div>)}
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:4}}><Btn onClick={submitDo} disabled={(mainAnswer||"").split("|||").some(g=>!g.trim())}>Submit →</Btn></div>
        </div>:<>
          <textarea value={mainAnswer} onChange={e=>setMainAnswer(e.target.value)} placeholder={sessionType==="gist"?"Write exactly 20 words capturing the central idea...":"Write what you understood..."} rows={6} style={{width:"100%",background:t.surfaceUp,border:`1px solid ${mainAnswer.length>20?t.accentBorder:t.border}`,borderRadius:9,padding:"1rem",color:t.text,fontFamily:T.serif,fontSize:16,lineHeight:1.75,marginBottom:"1rem",transition:"border-color 0.2s"}}/>
          {sessionType==="gist"&&<div style={{fontSize:12,color:mainAnswer.trim().split(/\s+/).filter(Boolean).length===20?t.accent:t.muted,marginBottom:8}}>{mainAnswer.trim().split(/\s+/).filter(Boolean).length} / 20 words</div>}
          <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={submitDo} disabled={mainAnswer.trim().length<10}>Submit →</Btn></div>
        </>}
      </Card>}
    </div></Screen>;}

  if(phase==="see"){return <Screen sx={{justifyContent:"flex-start",paddingTop:"2.5rem"}}><div style={{width:"100%",maxWidth:760}}>
    <PhaseBar phases={phases} current="see"/>
    {loading?<div style={{textAlign:"center",padding:"5rem 0"}}><Spinner/><div style={{fontSize:13,color:t.muted,marginTop:"1rem"}}>Analysing your response…</div></div>:
    <div className="fade-up">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.2rem"}}>
        <Card><Lbl color={t.muted}>What you wrote</Lbl><Serif size={14} color={t.muted} sx={{lineHeight:1.8}}>{(mainAnswer||"").replace(/\|\|\|/g," · ")||"No response."}</Serif></Card>
        <Card><Lbl color={t.accent}>Original text</Lbl><Serif size={14} sx={{lineHeight:1.8}}>{text?.text}</Serif></Card>
      </div>
      {sessionType==="wordInference"&&<div style={{background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1rem"}}>
        <Lbl color={t.ochre}>Actual meanings + French bridges</Lbl>
        {(text?.unknown||[]).map((w,i)=><div key={w} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:i<2?`1px solid ${t.border}`:"none",flexWrap:"wrap"}}><span style={{fontFamily:T.serif,fontStyle:"italic",color:t.ochre,minWidth:120}}>{w}</span><span style={{fontSize:13,color:t.text,flex:1}}>{text?.defs?.[i]}</span><span style={{fontSize:11,color:t.dim}}>{text?.hints?.[i]}</span></div>)}
      </div>}
      <div style={{background:t.accentDim,border:`1px solid ${t.accentBorder}`,borderLeft:`4px solid ${t.accent}`,borderRadius:"0 12px 12px 0",padding:"1.1rem 1.4rem",marginBottom:"1rem"}}><Lbl>Precise observation</Lbl><Serif size={16} sx={{lineHeight:1.8}}>{annotation}</Serif></div>
      <div style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1.4rem",display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{background:t.accentDim,borderRadius:7,padding:"5px 9px",fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>STRATEGY</div>
        <div><div style={{fontWeight:600,fontSize:14,marginBottom:3}}>{getStratName()}</div><Serif size={14} color={t.muted}>{getStratExp()}</Serif></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>setPhase("redo")}>Apply it now →</Btn></div>
    </div>}
  </div></Screen>;}

  if(phase==="redo"){return <Screen sx={{justifyContent:"flex-start",paddingTop:"2.5rem"}}><div style={{width:"100%",maxWidth:640}}>
    <PhaseBar phases={phases} current="redo"/>
    <Serif size={15} color={t.muted} sx={{margin:"0.8rem 0 1.4rem"}}>A different text. Same strategy. Apply {getStratName()} deliberately.</Serif>
    <Card sx={{marginBottom:"1rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.08em",textTransform:"uppercase"}}>{altText?.title}</div><Tag>{altText?.level}</Tag></div>
      <Serif size={17} sx={{lineHeight:1.92}}>{altText?.text}</Serif>
    </Card>
    <Card><Lbl color={t.muted}>Your response</Lbl><textarea value={redoAnswer} onChange={e=>setRedoAnswer(e.target.value)} placeholder={sessionType==="gist"?"Write exactly 20 words...":"Write what you understood. Did the strategy help?"} rows={5} style={{width:"100%",background:t.surfaceUp,border:`1px solid ${redoAnswer.length>20?t.accentBorder:t.border}`,borderRadius:9,padding:"1rem",color:t.text,fontFamily:T.serif,fontSize:16,lineHeight:1.75,marginBottom:"1rem",transition:"border-color 0.2s"}}/><div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>setPhase("rate")} disabled={redoAnswer.trim().length<10}>Done →</Btn></div></Card>
  </div></Screen>;}

  if(phase==="rate"){return <Screen><div style={{maxWidth:480,textAlign:"center"}} className="fade-up">
    <div style={{fontSize:26,color:t.accent,marginBottom:"1rem"}}>◎</div>
    <h2 style={{fontFamily:T.serif,fontSize:"1.8rem",color:t.text,marginBottom:"0.6rem"}}>Session complete.</h2>
    <Serif size={15} color={t.muted} sx={{marginBottom:"1.8rem"}}>Did you use {getStratName()} deliberately in the Redo phase?</Serif>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:"1.8rem"}}>
      {[{v:5,l:"Yes — I applied it before starting"},{v:3,l:"Somewhat — I tried but forgot midway"},{v:1,l:"Not this time — I will be more deliberate next session"}].map(({v,l})=><button key={v} onClick={()=>setSelfRating(v)} style={{background:selfRating===v?t.accentDim:t.surface,border:`1.5px solid ${selfRating===v?t.accent:t.border}`,color:selfRating===v?t.accent:t.text,borderRadius:10,padding:"12px 16px",fontFamily:T.sans,fontSize:14,fontWeight:selfRating===v?600:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>{l}</button>)}
    </div>
    {selfRating&&<div style={{background:t.accentDim,border:`1px solid ${t.accentBorder}`,borderRadius:12,padding:"1rem 1.2rem",marginBottom:"1.6rem",textAlign:"left"}}><Serif size={15}>{selfRating>=4?"Conscious application is the first step toward automatisation.":selfRating>=3?"Partial application still builds the pathway.":"Honest reflection is itself metacognitive."}</Serif></div>}
    <Btn onClick={complete} disabled={!selfRating} full>Continue →</Btn>
  </div></Screen>;}
  return null;
};

const ProfileScreen=({user,profile,sessions,checkins,userInfo,preScore,postScore,onSaveInfo,onBack,onSignOut,themeId,onThemeChange})=>{
  const t=getT();
  const tier=getTier(sessions.length);const applied=sessions.filter(s=>(s.self_rating||s.selfRating)>=4).length;
  const[tab,setTab]=useState("progress");
  const[form,setForm]=useState({name:userInfo?.name||"",university:userInfo?.university||"",level:userInfo?.level||"",city:userInfo?.city||"",native_language:userInfo?.native_language||""});
  const[saved,setSaved]=useState(false);const[saving,setSaving]=useState(false);
  const fv=(k,v)=>setForm(f=>({...f,[k]:v}));
  const handleSave=async()=>{setSaving(true);await onSaveInfo(form);setSaved(true);setSaving(false);setTimeout(()=>setSaved(false),2500);};
  const stratRows=[{name:"Cognitive",r:".599",t:1,on:true},{name:"Metacognitive",r:".494",t:1,on:true},{name:"Compensation",r:".546",t:2,on:tier>=2},{name:"Memory",r:".417",t:2,on:tier>=2},{name:"Social",r:".361",t:3,on:tier>=3},{name:"Affective",r:".239",t:3,on:tier>=3}];
  const last7=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.toDateString();}).reverse();
  const expByDay=last7.map(day=>{const dc=checkins.filter(c=>c.date===day);const yeses=dc.reduce((n,c)=>n+Object.values(c.answers||{}).filter(a=>a?.main==="Yes").length,0);return{day:new Date(day).toLocaleDateString("en-GB",{weekday:"short"}),count:yeses};});
  const maxC=Math.max(...expByDay.map(d=>d.count),1);
  const byType=Object.keys(SESSION_TYPES).reduce((acc,k)=>({...acc,[k]:sessions.filter(s=>s.session_type===k).length}),{});
  const inp=(key,ph,type="text")=><input type={type} value={form[key]||""} placeholder={ph} onChange={e=>fv(key,e.target.value)} style={{width:"100%",background:t.surfaceUp,border:`1px solid ${form[key]?t.accentBorder:t.border}`,borderRadius:9,padding:"11px 14px",color:t.text,fontFamily:T.sans,fontSize:14,transition:"border-color 0.2s"}}/>;

  return <div style={{minHeight:"100vh",background:t.bg}}>
    <div style={{background:t.surface,borderBottom:`1px solid ${t.border}`,padding:"0.9rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
      <Btn variant="ghost" onClick={onBack} sx={{padding:"6px 0"}}>← Home</Btn>
      <div style={{display:"flex",alignItems:"center",gap:8}}><UnivLogo size={24}/><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:t.accent,letterSpacing:"0.12em"}}>MY PROFILE</div></div>
      <Btn variant="ghost" onClick={onSignOut} sx={{padding:"6px 0",fontSize:12}}>Sign out</Btn>
    </div>
    <div style={{maxWidth:640,margin:"0 auto",padding:"2rem 1.5rem"}}>
      <div className="fade-up" style={{display:"flex",gap:"1.2rem",alignItems:"center",marginBottom:"1.6rem"}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:t.accentDim,border:`2px solid ${t.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:t.accent,fontWeight:700,fontFamily:T.sans,flexShrink:0}}>{form.name?form.name.trim()[0].toUpperCase():"أ"}</div>
        <div><div style={{fontFamily:T.sans,fontWeight:700,fontSize:18,color:t.text}}>{form.name||"Your Name"}</div><div style={{fontFamily:T.sans,fontSize:13,color:t.muted}}>{userInfo?.email||user?.email} · {profile?.field||"STEM"} · <span style={{color:t.accent}}>Tier {tier}</span></div></div>
      </div>
      <div className="fade-up fade-up-1" style={{display:"flex",gap:6,marginBottom:"1.4rem",flexWrap:"wrap"}}>
        {[["progress","Progress"],["test","EAP Test"],["sessions","Sessions"],["theme","Theme"]].map(([id,label])=><button key={id} onClick={()=>setTab(id)} style={{background:tab===id?t.accent:"transparent",color:tab===id?"#fff":t.muted,border:`1.5px solid ${tab===id?t.accent:t.border}`,borderRadius:8,padding:"7px 16px",fontFamily:T.sans,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.17s"}}>{label}</button>)}
      </div>

      {tab==="progress"&&<div className="fade-up">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.8rem",marginBottom:"1rem"}}>
          {[{l:"Sessions",v:sessions.length,c:t.accent},{l:"Applied",v:applied,c:t.accent},{l:"Check-ins",v:checkins.length,c:t.ochre}].map(({l,v,c})=><Card key={l} sx={{textAlign:"center",padding:"1rem"}}><div style={{fontFamily:T.sans,fontSize:28,fontWeight:700,color:c,marginBottom:3}}>{v}</div><div style={{fontSize:11,color:t.muted}}>{l}</div></Card>)}
        </div>
        <Card sx={{marginBottom:"1rem"}}><Lbl>Weekly Exposure</Lbl><div style={{display:"flex",gap:6,alignItems:"flex-end",height:80,marginTop:8}}>{expByDay.map(({day,count},i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}><div style={{width:"100%",borderRadius:"4px 4px 0 0",background:count>0?t.accent:t.border,height:`${Math.max((count/maxC)*64,count>0?8:3)}px`,transition:"height 0.5s"}}/><div style={{fontSize:10,color:t.dim}}>{day}</div></div>)}</div></Card>
        <Card sx={{marginBottom:"1rem"}}><Lbl>Strategy Sequence</Lbl><Serif size={13} color={t.dim} sx={{marginBottom:"1rem"}}>r-values · El Machichi (2026) · N=176</Serif>{stratRows.map((s,i)=><div key={s.name} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:i<5?`1px solid ${t.border}`:"none",opacity:s.on?1:0.32}}><TierBadge n={s.t}/><div style={{flex:1,fontFamily:T.sans,fontWeight:600,fontSize:13}}>{s.name}</div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:s.on?t.accent:t.dim}}>r={s.r}</div><div style={{width:52,height:3,borderRadius:2,background:t.border,overflow:"hidden"}}><div style={{height:"100%",width:`${parseFloat(s.r)*100}%`,background:s.on?t.accent:t.dim,borderRadius:2}}/></div></div>)}</Card>
        <div style={{background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:12,padding:"1rem 1.2rem"}}><Lbl color={t.ochre}>AQLAM observes</Lbl><Serif size={15}>{sessions.length===0?"Your first learning session will establish your strategy baseline.":applied>=sessions.length*0.6?"You are applying strategies consciously — the pattern that predicts sustained proficiency gains.":"Strategy application is developing. Consistency matters more than perfection."}</Serif></div>
      </div>}

      {tab==="test"&&<div className="fade-up">
        {preScore?<>
          <Card sx={{marginBottom:"1rem"}}>
            <Lbl>Placement Test (Pre)</Lbl>
            <div style={{fontFamily:T.sans,fontSize:36,fontWeight:700,color:t.accent,marginBottom:4}}>{preScore.total}<span style={{fontSize:16,color:t.muted}}>/15</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.6rem",marginTop:"0.8rem"}}>
              {[{l:"Reading",v:preScore.reading,c:t.accent},{l:"Vocabulary",v:preScore.vocabulary,c:t.ochre},{l:"Structure",v:preScore.structure,c:t.coral}].map(({l,v,c})=><div key={l} style={{textAlign:"center",background:t.surfaceUp,borderRadius:9,padding:"0.6rem"}}><div style={{fontFamily:T.sans,fontSize:20,fontWeight:700,color:c}}>{v}<span style={{fontSize:11,color:t.muted}}>/5</span></div><div style={{fontSize:10,color:t.muted}}>{l}</div></div>)}
            </div>
          </Card>
          {postScore?<Card sx={{marginBottom:"1rem"}}>
            <Lbl color={t.ochre}>Progress Test (Post)</Lbl>
            <div style={{fontFamily:T.sans,fontSize:36,fontWeight:700,color:t.ochre,marginBottom:4}}>{postScore.total}<span style={{fontSize:16,color:t.muted}}>/15</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.6rem",marginTop:"0.8rem"}}>
              {[{l:"Reading",v:postScore.reading,pre:preScore.reading,c:t.accent},{l:"Vocabulary",v:postScore.vocabulary,pre:preScore.vocabulary,c:t.ochre},{l:"Structure",v:postScore.structure,pre:preScore.structure,c:t.coral}].map(({l,v,pre,c})=>{const diff=v-pre;return <div key={l} style={{textAlign:"center",background:t.surfaceUp,borderRadius:9,padding:"0.6rem"}}><div style={{fontFamily:T.sans,fontSize:20,fontWeight:700,color:c}}>{v}<span style={{fontSize:11,color:t.muted}}>/5</span></div><div style={{fontSize:11,color:diff>0?t.accent:diff<0?t.danger:t.muted,fontWeight:600}}>{diff>0?`+${diff}`:diff===0?"—":diff}</div><div style={{fontSize:10,color:t.muted}}>{l}</div></div>;})}
            </div>
            <div style={{borderTop:`1px solid ${t.border}`,marginTop:"1rem",paddingTop:"1rem"}}>
              <div style={{fontFamily:T.sans,fontSize:12,color:t.muted}}>Overall change</div>
              <div style={{fontFamily:T.sans,fontSize:24,fontWeight:700,color:postScore.total-preScore.total>0?t.accent:t.danger}}>{postScore.total-preScore.total>0?"+":""}{postScore.total-preScore.total} points</div>
            </div>
          </Card>:<Card sx={{marginBottom:"1rem"}}>
            <Lbl color={t.muted}>Progress Test</Lbl>
            <Serif size={14} color={t.muted}>{sessions.length<5?"Complete at least 5 learning sessions before taking your progress test.":"Your progress test becomes available 2 weeks after your placement test."}</Serif>
          </Card>}
        </>:<Card><Lbl color={t.muted}>No test data yet</Lbl><Serif size={14} color={t.muted}>Your EAP placement test scores will appear here after you complete the test.</Serif></Card>}
      </div>}

      {tab==="sessions"&&<div className="fade-up">
        <Card sx={{marginBottom:"1rem"}}><Lbl>Session Types</Lbl>{Object.entries(SESSION_TYPES).map(([key,type])=><div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${t.border}`}}><div style={{display:"flex",gap:10,alignItems:"center"}}><Tag color={key==="reconstruction"?t.accent:key==="gist"||key==="wordInference"?t.ochre:t.coral}>{type.label}</Tag><TierBadge n={type.tier}/></div><div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:t.muted}}>{byType[key]||0}</div></div>)}</Card>
        {sessions.length>0&&<Card><Lbl>Full Session Log</Lbl>{sessions.slice().reverse().map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<sessions.length-1?`1px solid ${t.border}`:"none"}}><div><div style={{fontSize:13,fontWeight:600}}>{s.text_title}</div><div style={{fontSize:11,color:t.muted}}>{s.session_type} · {s.level} · {s.date}</div></div><Tag color={s.self_rating>=4?t.accent:t.ochre}>{s.self_rating>=4?"Applied":"Learning"}</Tag></div>)}</Card>}
      </div>}

      {tab==="info"&&<div className="fade-up">
        <Card sx={{marginBottom:"1rem"}}><Lbl>Personal Information</Lbl><Serif size={14} color={t.muted} sx={{marginBottom:"1.4rem"}}>Saved to your account · accessible from any device.</Serif>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Full Name</div>{inp("name","e.g. Fatima Zahra El Idrissi")}</div>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Email</div><div style={{fontFamily:T.sans,fontSize:14,color:t.muted,padding:"11px 14px",background:t.surfaceUp,borderRadius:9,border:`1px solid ${t.border}`}}>{userInfo?.email||user?.email}</div></div>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>University</div>{inp("university","e.g. Ibn Tofail University")}</div>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Study Level</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{["Licence 1","Licence 2","Licence 3","Master 1","Master 2","Doctorat"].map(lv=><button key={lv} onClick={()=>fv("level",lv)} style={{background:form.level===lv?t.accentDim:t.surface,border:`1.5px solid ${form.level===lv?t.accent:t.border}`,color:form.level===lv?t.accent:t.muted,borderRadius:8,padding:"7px 14px",fontFamily:T.sans,fontSize:13,fontWeight:form.level===lv?600:400,cursor:"pointer",transition:"all 0.15s"}}>{lv}</button>)}</div></div>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>City</div>{inp("city","e.g. Kénitra, Rabat…")}</div>
            <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,marginBottom:6}}>Dominant Language at Home</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{["Darija","Arabic (MSA)","French","Amazigh","Other"].map(lang=><button key={lang} onClick={()=>fv("native_language",lang)} style={{background:form.native_language===lang?t.accentDim:t.surface,border:`1.5px solid ${form.native_language===lang?t.accent:t.border}`,color:form.native_language===lang?t.accent:t.muted,borderRadius:8,padding:"7px 14px",fontFamily:T.sans,fontSize:13,fontWeight:form.native_language===lang?600:400,cursor:"pointer",transition:"all 0.15s"}}>{lang}</button>)}</div></div>
          </div>
        </Card>
        <Card sx={{marginBottom:"1.4rem"}}><Lbl>Learning Preferences</Lbl>{[["Field",profile?.field||"Not set"],["Goal",profile?.goal||"Not set"],["Exposure",profile?.exposure||"Not set"]].map(([label,value])=><div key={label} style={{display:"flex",gap:"1rem",padding:"6px 0",borderBottom:`1px solid ${t.border}`}}><div style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:t.muted,minWidth:70}}>{label}</div><div style={{fontFamily:T.serif,fontSize:15,color:t.text}}>{value}</div></div>)}</Card>
        <Card sx={{marginBottom:"1rem"}}><Lbl>Consent & Data</Lbl><Serif size={14} color={t.muted} sx={{marginBottom:"0.8rem"}}>Researcher: {CONSENT.researcher}</Serif>{CONSENT.affiliations.map((a,i)=><div key={i} style={{fontFamily:T.sans,fontSize:12,color:t.dim}}>{a}</div>)}<div style={{borderTop:`1px solid ${t.border}`,marginTop:"0.8rem",paddingTop:"0.8rem"}}>{Object.values(CONSENT.emails).map((e,i)=><div key={i} style={{fontFamily:T.sans,fontSize:11,color:t.dim}}>{e}</div>)}</div></Card>
        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"1rem"}}>
          {saved&&<div style={{fontFamily:T.sans,fontSize:13,color:t.accent,fontWeight:600}}>✓ Saved</div>}
          <Btn onClick={handleSave} disabled={saving}>{saving?<Spinner size={20}/>:"Save →"}</Btn>
        </div>
      </div>}

      {tab==="theme"&&<div className="fade-up">
        <Card sx={{marginBottom:"1rem"}}><ThemePicker current={themeId} onSelect={onThemeChange}/></Card>
        <div style={{background:t.ochreDim,border:`1px solid ${t.ochreBorder}`,borderRadius:12,padding:"1rem 1.2rem"}}><Lbl color={t.ochre}>About themes</Lbl><Serif size={14} color={t.muted}>Your theme saves to your account and applies across all devices. Each theme uses the same three-tier colour logic — Tier 1, 2, and 3 sessions remain visually distinct.</Serif></div>
      </div>}

    </div>
  </div>;
};

/* ══════════════════════════════════════════════════════════════════════════
   APP CONTROLLER
══════════════════════════════════════════════════════════════════════════ */
export default function App(){
  const[screen,setScreen]=useState("loading");
  const[user,setUser]=useState(null);
  const[prefStep,setPrefStep]=useState(0);
  const[prefAnswers,setPrefAnswers]=useState({});
  const[profile,setProfile]=useState(null);
  const[userInfo,setUserInfo]=useState({});
  const[sessions,setSessions]=useState([]);
  const[checkins,setCheckins]=useState([]);
  const[checkinDone,setCheckinDone]=useState(false);
  const[streak,setStreak]=useState(0);
  const[ack,setAck]=useState("");
  const[themeId,setThemeId]=useState("teal");
  const[preScore,setPreScore]=useState(null);
  const[diag,setDiag]=useState({});
  const[postScore,setPostScore]=useState(null);

  const showPostTest=useMemo(()=>{
    if(!preScore||postScore)return false;
    if(!userInfo?.pre_test_date)return false;
    return(Date.now()-new Date(userInfo.pre_test_date).getTime())>=TWO_WEEKS_MS;
  },[preScore,postScore,userInfo]);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session?.user)loadUserData(session.user);else setScreen("auth");
    });
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{
      if(!session){setUser(null);setScreen("auth");}
    });
    return()=>subscription.unsubscribe();
  },[]);

  const loadUserData=async(u)=>{
    setUser(u);
    console.log('AQLAM: loadUserData for', u.email);
    const[prof,sess,chks]=await Promise.all([db.loadProfile(u.id),db.loadSessions(u.id),db.loadCheckins(u.id)]);
    console.log('AQLAM: profile loaded:', JSON.stringify(prof));
    setUserInfo(prof||{});setSessions(sess||[]);setCheckins(chks||[]);
    const today=new Date().toDateString();
    setCheckinDone((chks||[]).some(c=>c.date===today));
    let s=0;const dates=[...new Set((chks||[]).map(c=>c.date))].reverse();
    for(let i=0;i<dates.length;i++){const d=new Date(dates[i]);const exp=new Date();exp.setDate(exp.getDate()-i);if(d.toDateString()===exp.toDateString())s++;else break;}
    setStreak(s);
    if(prof?.theme){setThemeId(prof.theme);setGlobalTheme(prof.theme);}
    if(prof?.pre_score!=null){setPreScore({total:prof.pre_score,reading:prof.pre_reading||0,vocabulary:prof.pre_vocabulary||0,structure:prof.pre_structure||0,totalPossible:13,percentage:Math.round((prof.pre_score/13)*100)});}
    if(prof?.post_score!=null){setPostScore({total:prof.post_score,reading:prof.post_reading||0,vocabulary:prof.post_vocabulary||0,structure:prof.post_structure||0,totalPossible:13,percentage:Math.round((prof.post_score/13)*100)});}
    // Returning user: has a field = completed onboarding → go straight to home
    if(prof?.field){
      setProfile(prof);
      setScreen("home");
      return;
    }
    // New user with profile but no consent yet → show consent
    if(prof && !prof?.consent_given){
      setProfile(prof||null);
      setScreen("consent");
      return;
    }
    // Brand new user: no profile yet → start onboarding (consent comes after auth signup)
    setProfile(null);
    setScreen("welcome");
  };

  const handleAuth=async(u)=>{await loadUserData(u);};
  const handleConsentAccept=async()=>{if(user){await db.saveProfile(user.id,{consent_given:true,consent_date:new Date().toISOString()});setScreen("preTest");}};
  const handleConsentDecline=async()=>{await supabase.auth.signOut();setUser(null);setScreen("auth");};
  const handleSignOut=async()=>{await supabase.auth.signOut();setUser(null);setProfile(null);setUserInfo({});setSessions([]);setCheckins([]);setScreen("auth");};
  const handleThemeChange=(id)=>{setThemeId(id);setGlobalTheme(id);if(user)db.saveProfile(user.id,{theme:id});};
  const saveProfile=async(p)=>{
    setProfile(p);
    const{data:{session}}=await supabase.auth.getSession();
    const uid=user?.id||session?.user?.id;
    if(!uid){console.warn('AQLAM: saveProfile no uid');return;}
    // Save directly - only columns that exist in DB
    const row={id:uid};
    if(p.field)row.field=p.field;
    if(p.goal)row.goal=p.goal;
    if(p.exposure)row.exposure=p.exposure;
    if(p.name)row.name=p.name;
    if(p.university)row.university=p.university;
    if(p.city)row.city=p.city;
    if(p.level)row.level=p.level;
    if(p.native_language)row.native_language=p.native_language;
    console.log('AQLAM saveProfile row:', JSON.stringify(row));
    const{error}=await supabase.from('profiles').upsert(row,{onConflict:'id'});
    if(error)console.error('AQLAM saveProfile error:',error.message);
    else console.log('AQLAM saveProfile OK');
  };
  const saveSession=async(s)=>{const u=[...sessions,s];setSessions(u);if(user)await db.saveSession(user.id,s);};
  const saveUserInfo=async(info)=>{setUserInfo(info);if(user)await db.saveProfile(user.id,{...info,field:profile?.field,goal:profile?.goal,exposure:profile?.exposure});};
  const saveCheckin=async(c)=>{const entry={...c,date:new Date().toDateString()};const u=[...checkins,entry];setCheckins(u);setCheckinDone(true);setStreak(k=>k+1);if(user)await db.saveCheckin(user.id,entry);};

  const handlePreTestDone=async(result)=>{
    setPreScore(result);
    const scoreData={pre_score:result.total,pre_reading:result.reading,pre_vocabulary:result.vocabulary,pre_structure:result.structure,pre_test_date:new Date().toISOString()};
    if(user)await db.saveProfile(user.id,scoreData);
    setUserInfo(u=>({...u,...scoreData}));
    setScreen("home");
  };

  const handlePostTestDone=async(result)=>{
    setPostScore(result);
    const scoreData={post_score:result.total,post_reading:result.reading,post_vocabulary:result.vocabulary,post_structure:result.structure,post_test_date:new Date().toISOString()};
    if(user)await db.saveProfile(user.id,scoreData);
    setUserInfo(u=>({...u,...scoreData}));
    setScreen("home");
  };

  if(screen==="loading")return(
    <div style={{minHeight:"100vh",background:"#0D1117",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <G/><Spinner/>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:T.bg}}>
      <G/>
      <form name="aqlam-consent" data-netlify="true" hidden><input name="email"/><input name="name"/><input name="consent_date"/><input name="version"/></form>
      <form name="aqlam-eap-test" data-netlify="true" hidden><input name="participant_name"/><input name="participant_email"/><input name="field"/><input name="test_type"/><input name="test_date"/><input name="total_score"/><input name="total_possible"/><input name="percentage"/><input name="reading_score"/><input name="vocabulary_score"/><input name="structure_score"/><input name="pre_calibration"/><input name="post_calibration"/><input name="calibration_gap"/><input name="duration_seconds"/><input name="individual_responses"/></form>

      {screen==="auth"       &&<Auth onAuth={handleAuth}/>}
      {screen==="consent"    &&<ConsentScreen userName={userInfo?.name} onAccept={handleConsentAccept} onDecline={handleConsentDecline}/>}
      {screen==="welcome"    &&<Welcome onStart={()=>setScreen("prefs")}/>}
      {screen==="prefs"&&<Prefs step={prefStep} answers={prefAnswers} setAnswers={setPrefAnswers} onNext={async(fa)=>{
        if(prefStep<4){setPrefStep(s=>s+1);return;}
        const data=fa||prefAnswers;
        console.log('PREFS SAVE data=',JSON.stringify(data));
        setProfile(data);
        const sess=await supabase.auth.getSession();
        const uid=user?.id||sess?.data?.session?.user?.id;
        console.log('PREFS SAVE uid=',uid,'field=',data.field);
        if(uid&&data.field){
          const{error}=await supabase.from('profiles').upsert(
            {id:uid,field:data.field,goal:data.goal||null,exposure:data.exposure||null},
            {onConflict:'id'}
          );
          if(error)console.error('PREFS SAVE error:',error.message);
          else console.log('PREFS SAVE OK');
        }
        setScreen('consent');
      }} onBack={()=>setPrefStep(s=>s-1)}/>}
      {screen==="diagIntro"  &&<DiagIntro onStart={()=>setScreen("diagA")}/>}
      {screen==="diagA"      &&<DiagA field={prefAnswers.field} onDone={r=>{setDiag(d=>({...d,reconstruction:r}));setScreen("diagB");}}/>}
      {screen==="diagB"      &&<DiagB field={prefAnswers.field} onDone={r=>{setDiag(d=>({...d,wordGuesses:r}));setScreen("diagC");}}/>}
      {screen==="diagC"      &&<DiagC onDone={r=>{const fd={...diag,prediction:r};setDiag(fd);saveProfile({...prefAnswers});setScreen("preTest");}}/>}
      {screen==="preTest"    &&<EAPTest field={(profile||prefAnswers)?.field||"Biology"} isRetest={false} onDone={handlePreTestDone} userName={userInfo?.name} userEmail={userInfo?.email||user?.email}/>}
      {screen==="postTest"   &&<EAPTest field={profile?.field||"Biology"} isRetest={true} onDone={handlePostTestDone} userName={userInfo?.name} userEmail={userInfo?.email||user?.email}/>}
      {screen==="home"       &&<Home profile={profile} userInfo={userInfo} sessions={sessions} checkinDone={checkinDone} streak={streak} showPostTest={showPostTest} onLoop={()=>setScreen("loop")} onCheckin={()=>setScreen("checkin")} onProfile={()=>setScreen("profile")} onPostTest={()=>setScreen("postTest")}/>}
      {screen==="checkin"    &&<CheckIn onDone={({answers,acknowledgement})=>{saveCheckin({answers});setAck(acknowledgement);setScreen("checkinAck");}}/>}
      {screen==="checkinAck" &&<CheckInAck ack={ack} onBack={()=>setScreen("home")}/>}
      {screen==="loop"       &&<Loop profile={profile} sessions={sessions} onSessionDone={async s=>{await saveSession(s);}} onExit={()=>setScreen("home")}/>}
      {screen==="profile"    &&<ProfileScreen user={user} profile={profile} sessions={sessions} checkins={checkins} userInfo={userInfo} preScore={preScore} postScore={postScore} onSaveInfo={saveUserInfo} onBack={()=>setScreen("home")} onSignOut={handleSignOut} themeId={themeId} onThemeChange={handleThemeChange}/>}
    </div>
  );
}
