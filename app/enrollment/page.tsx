"use client";
import { useEffect, useState } from "react";
import Mpesa from "../payment/components/Mpesa";
import { addEnrollment, getEnrollmentCountries, getEnrollmentIntakes, getEnrollmentPrograms } from "../lib/enrollment";



const ADMISSION_FEE = 2000;
type Step = "enrollment" | "review" | "payment" | "success";
interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  idNumber: string; dob: string; gender: string;
  country: string; county: string;
  program: string; intake: string; studyMode: string;
  previousSchool: string; grade: string;
}

export default function EnrollmentPage() {
  const [step, setStep] = useState<Step>("enrollment");
  const [form, setForm] = useState<FormData>({
    firstName:"",lastName:"",email:"",phone:"",idNumber:"",
    dob:"",gender:"",country:"",county:"",
    program:"",intake:"",studyMode:"",previousSchool:"",grade:"",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [payMethod, setPayMethod] = useState<"mpesa"|"card">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [cardData, setCardData] = useState({ number:"",expiry:"",cvv:"",name:"" });
  const [paying, setPaying] = useState(false);
  const [refNumber] = useState(`SQ-${Date.now().toString().slice(-8)}`);

  const [programs,setPrograms] = useState([]);
    const [intakes,setIntakes] = useState([]);
  const [programsOpen, setProgramsOpen] = useState(true);
  const [enrollmentID, setEnrollmentID] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState('');
   const [countries, setCountries] = useState<Record<string, string[]>>({});



useEffect(()=>{
  getEnrollmentPrograms().then((res)=>setPrograms(res));
  getEnrollmentCountries().then((res)=>setCountries(res));
  getEnrollmentIntakes().then((res)=>setIntakes(res));

},[]);

  const prog = programs?.find(p => p?.id === form.program);

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim())                            e.firstName = "Required";
    if (!form.lastName.trim())                             e.lastName  = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email     = "Valid email required";
    if (!form.phone.match(/^(\+254|0)[17]\d{8}$/))        e.phone     = "Valid Kenyan number required";
    // if (!form.idNumber.trim())                             e.idNumber  = "Required";
    // if (!form.dob)                                         e.dob       = "Required";
    // if (!form.gender)                                      e.gender    = "Required";
    if (!form.country)                                     e.country   = "Required";
    // if (!form.county)                                      e.county    = "Required";
    if (!form.program)                                     e.program   = "Please select a program";
    if (!form.intake)                                      e.intake    = "Required";
    if (!form.studyMode)                                   e.studyMode = "Required";
    setErrors(e);
    if (e.program) setProgramsOpen(true);



    return Object.keys(e).length === 0;

  }

  function set(field: keyof FormData, val: string) {
    setForm(f => ({...f, [field]: val}));
    setErrors(e => ({...e, [field]: undefined}));
  }

  async function pay() {
    setPaying(true);
    await new Promise(r => setTimeout(r, 2800));
    setPaying(false);
    setStep("success");
  }

  function reset() {
    setStep("enrollment");
    setForm({firstName:"",lastName:"",email:"",phone:"",idNumber:"",dob:"",gender:"",country:"",county:"",program:"",intake:"",studyMode:"",previousSchool:"",grade:""});
    setMpesaPhone(""); setCardData({number:"",expiry:"",cvv:"",name:""});
    setProgramsOpen(true);
  }

  const inp = (f: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all bg-white
     ${errors[f] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#16a34a] focus:shadow-[0_0_0_3px_rgba(22,163,74,0.12)]"}`;
  const lbl = "block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  const STEPS = [
    {key:"enrollment",label:"Details",  n:1},
    {key:"review",    label:"Review",   n:2},
    {key:"payment",   label:"Payment",  n:3},
    {key:"success",   label:"Confirm",  n:4},
  ];
  const si = STEPS.findIndex(s => s.key === step);





const submit = async()=>{
                  
                    console.log(form);

addEnrollment({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          idNumber: form.idNumber,
          dob: form.dob,
          gender: form.gender,
          country: form.country,
          county: form.county,
          subProgramId: form.program,
          intake: form.intake,
          studyMode: form.studyMode,
          previousSchool: form.previousSchool,
          grade: form.grade,
          subjectIds: []
      })
      .then((res) => {
        console.log(res);
          setEnrollmentID(res?.enrollmentId);
          setReferenceNumber(res?.referenceNumber);
            setStep("payment")
      })
      .catch((err) => {
          console.error("Enrollment failed:", err);
      });

              
}




  return (
    <div className="min-h-screen" style={{fontFamily:"'Plus Jakarta Sans','Nunito',sans-serif",background:"#f8fafc"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box} body{margin:0}

        :root {
          --sq-green:    #2b7bb9;
          --sq-green-d:  #2b7bb9;
          --sq-green-l:  #dcfce7;
          --sq-green-m:  #bbf7d0;
          --sq-orange:   #f97316;
          --sq-orange-l: #fff7ed;
          --sq-navy:     #2b7bb9;
          --sq-text:     #1e293b;
          --sq-muted:    #64748b;
          --sq-border:   #e2e8f0;
          --sq-surface:  #ffffff;
          --sq-bg:       #f8fafc;
        }

        .sq-pill { background:var(--sq-green); color:#fff; border-radius:999px; padding:2px 10px; font-size:11px; font-weight:700; }
        .sq-badge-orange { background:var(--sq-orange-l); color:var(--sq-orange); border-radius:6px; padding:2px 8px; font-size:11px; font-weight:700; }

        select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px !important; }
        select:disabled { opacity:0.5; cursor:not-allowed; }

        @keyframes spin { to{transform:rotate(360deg)} }
        .spin { animation:spin 0.75s linear infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation:fadeUp 0.32s ease forwards; }

        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .slide-down { animation:slideDown 0.22s ease forwards; }

        .prog-tile { cursor:pointer; border:2px solid var(--sq-border); border-radius:14px; padding:14px; transition:all 0.15s; background:#fff; }
        .prog-tile:hover { border-color:#86efac; transform:translateY(-2px); box-shadow:0 6px 18px rgba(22,163,74,0.1); }
        .prog-tile.on  { border-color:var(--sq-green); background:var(--sq-green-l); box-shadow:0 0 0 3px rgba(22,163,74,0.15); }

        .btn { display:flex; align-items:center; justify-content:center; gap:8px; font-weight:700; border-radius:12px; padding:14px 24px; font-size:15px; cursor:pointer; border:none; transition:all 0.18s; }
        .btn-g { background:#2b7bb9; color:#fff; }
        .btn-g:hover { background:#2b7bb9; transform:translateY(-1px); box-shadow:0 8px 24px rgba(22,163,74,0.28); }
        .btn-g:disabled { opacity:0.55; cursor:not-allowed; transform:none; box-shadow:none; }
        .btn-out { background:#fff; color:var(--sq-text); border:2px solid var(--sq-border); }
        .btn-out:hover { background:#f1f5f9; }

        .card { background:#fff; border:1.5px solid var(--sq-border); border-radius:18px; overflow:hidden; }
        .card-head { background:var(--sq-navy); padding:16px 22px; display:flex; align-items:center; gap:10px; }
        .card-body { padding:22px; }

        .tag { background:var(--sq-green-l); color:var(--sq-green-d); font-size:10px; font-weight:700; padding:3px 8px; border-radius:6px; }

        .step-dot { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; transition:all 0.25s; }
        .step-dot.done { background:var(--sq-green); color:#fff; }
        .step-dot.active { background:var(--sq-green); color:#fff; box-shadow:0 0 0 5px var(--sq-green-m); }
        .step-dot.idle { background:#e2e8f0; color:#94a3b8; }
        .step-line { flex:1; height:3px; border-radius:2px; background:#e2e8f0; margin:0 6px; overflow:hidden; }
        .step-line-fill { height:100%; background:var(--sq-green); transition:width 0.4s ease; }

        .collapse-head { cursor:pointer; user-select:none; }
        .collapse-head:hover { opacity:0.92; }
        .chevron { transition:transform 0.22s ease; }
        .chevron.open { transform:rotate(180deg); }
      `}</style>

      {/* ───── NAVBAR ───── */}
      <header style={{background:"#ffff",borderBottom:"0.5px solid #2b7bb9"}} className="sticky top-0 z-50">
        <div className="mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Sqooli Logo" className="" />
          </div>
          <div className="flex items-center gap-3">
            <div style={{background:"#2b7bb9",border:"1px solid #2b7bb9",borderRadius:8,padding:"6px 14px",fontSize:13,color:"#94a3b8"}}>
              📞 <span style={{color:"#fff",fontWeight:600}}>+254 723 86 86 77</span>
            </div>
            <div style={{background:"var(--sq-orange)",color:"#fff",borderRadius:8,padding:"6px 14px",fontSize:13,fontWeight:700}}>
              KES {ADMISSION_FEE.toLocaleString()} Fee
            </div>
          </div>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <div style={{background:"#2b7bb9",padding:"36px 20px 32px"}}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{background:"var(--sq-orange)",color:"#fff",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999}}>2025 / 2026 INTAKE</span>
            </div>
            <h1 style={{color:"#fff",fontWeight:900,fontSize:28,lineHeight:1.2,margin:"0 0 6px"}}>
              Begin Your Academic Journey
            </h1>
            <p style={{color:"#fff",fontSize:14,margin:0}}>
              Innovative Learning Solutions · Enroll in minutes, learn for life
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[["🎓","Programs","10+"],["👩‍🎓","Students","500+"],["🏆","Completion","94%"]].map(([emoji,label,val])=>(
              <div key={label} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 16px",textAlign:"center",minWidth:80}}>
                <div style={{fontSize:20}}>{emoji}</div>
                <div style={{color:"#fff",fontWeight:800,fontSize:16}}>{val}</div>
                <div style={{color:"#fff",fontSize:11}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───── STEP INDICATOR ───── */}
      <div style={{background:"#fff",borderBottom:"1.5px solid var(--sq-border)"}}>
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center">
            {STEPS.map((s,i)=>(
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div className={`step-dot ${si>i?"done":si===i?"active":"idle"}`}>
                    {si>i ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : s.n}
                  </div>
                  <span style={{fontSize:13,fontWeight:600,color:si>=i?"var(--sq-green-d)":"#94a3b8"}} className="hidden sm:block">{s.label}</span>
                </div>
                {i<STEPS.length-1&&<div className="step-line"><div className="step-line-fill" style={{width:si>i?"100%":"0%"}}/></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8">

        {/* ══════════════ STEP 1: ENROLLMENT ══════════════ */}
        {step==="enrollment"&&(
          <div className="fu">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-5">

                {/* Personal Info */}
                <div className="card">
                  <div className="card-head">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span style={{color:"#fff",fontWeight:700,fontSize:15}}>Personal Information</span>
                  </div>
                  <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(["firstName","lastName"] as const).map(f=>(
                      <div key={f}>
                        <label className={lbl}>{f==="firstName"?"First Name":"Last Name"} <span style={{color:"#f97316"}}>*</span></label>
                        <input className={inp(f)} value={form[f]} onChange={e=>set(f,e.target.value)} placeholder={f==="firstName"?"e.g. Jane":"e.g. Kamau"} />
                        {errors[f]&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors[f]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className={lbl}>Email <span style={{color:"#f97316"}}>*</span></label>
                      <input type="email" className={inp("email")} value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jane@email.com"/>
                      {errors.email&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.email}</p>}
                    </div>
                    <div>
                      <label className={lbl}>Phone Number <span style={{color:"#f97316"}}>*</span></label>
                      <input className={inp("phone")} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="07XX XXX XXX"/>
                      {errors.phone&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.phone}</p>}
                    </div>
                    {/* <div>
                      <label className={lbl}>ID / Passport <span style={{color:"#f97316"}}>*</span></label>
                      <input className={inp("idNumber")} value={form.idNumber} onChange={e=>set("idNumber",e.target.value)} placeholder="National ID or Passport"/>
                      {errors.idNumber&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.idNumber}</p>}
                    </div>
                    <div>
                      <label className={lbl}>Date of Birth <span style={{color:"#f97316"}}>*</span></label>
                      <input type="date" className={inp("dob")} value={form.dob} onChange={e=>set("dob",e.target.value)}/>
                      {errors.dob&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.dob}</p>}
                    </div> */}
                    {/* <div>
                      <label className={lbl}>Gender <span style={{color:"#f97316"}}>*</span></label>
                      <select className={inp("gender")} value={form.gender} onChange={e=>set("gender",e.target.value)}>
                        <option value="">Select gender</option>
                        <option>Male</option><option>Female</option><option>Prefer not to say</option>
                      </select>
                      {errors.gender&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.gender}</p>}
                    </div> */}

                    {/* Country */}
                    <div>
                      <label className={lbl}>Country <span style={{color:"#f97316"}}>*</span></label>
                      <select className={inp("country")} value={form.country}
                        onChange={e=>{ set("country", e.target.value); set("county",""); }}>
                        <option value="">Select country</option>
{Object.keys(countries).map(c => <option key={c}>{c}</option>)}
                      </select>
                      {errors.country&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.country}</p>}
                    </div>

                    {/* County / District — dynamic based on country */}
                    <div>
                      <label className={lbl}>County / Mkoa <span style={{color:"#f97316"}}>*</span></label>
                      <select className={inp("county")} value={form.county}
                        onChange={e=>set("county",e.target.value)}
                        disabled={!form.country}>
                        <option value="">{form.country ? "Select county / district" : "Select a country first"}</option>
                        {(countries[form.country]||[])?.map(c=><option key={c}>{c}</option>)}
                      </select>
                      {errors.county&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.county}</p>}
                    </div>
                  </div>
                </div>

                {/* Program Selection — collapsible */}
                <div className="card">
                  <div
                    className="card-head collapse-head"
                    onClick={()=>setProgramsOpen(o=>!o)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <span style={{color:"#fff",fontWeight:700,fontSize:15,flex:1}}>Choose Your Program</span>

                    {/* Selected program pill when collapsed */}
                    {!programsOpen && form.program && (
                      <span style={{background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:12,fontWeight:600,
                        padding:"2px 10px",borderRadius:999,marginRight:8,whiteSpace:"nowrap"}}>
                        {programs.find(p=>p.id===form.program)?.emoji} {programs.find(p=>p.id===form.program)?.name}
                      </span>
                    )}
                    {!programsOpen && !form.program && (
                      <span style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginRight:8}}>None selected</span>
                    )}

                    {/* Chevron */}
                    <svg className={`chevron${programsOpen?" open":""}`}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>

                  {(programsOpen || errors.program) && (
                    <div className="card-body slide-down">
                      {errors.program&&<div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"8px 12px",color:"#dc2626",fontSize:12,marginBottom:14}}>{errors.program}</div>}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                        {programs.map(p=>(
                          <div key={p.id} onClick={()=>set("program",p.id)} className={`prog-tile${form.program===p.id?" on":""}`}>
                            <div className="flex items-start gap-3">
                              <div style={{fontSize:24,lineHeight:1}}>{p?.emoji} 📚</div>
                              <div style={{flex:1}}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span style={{fontWeight:700,fontSize:13,color:"var(--sq-text)"}}>{p?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="tag">{p?.level}</span>
                                  <span style={{fontSize:11,color:"var(--sq-muted)"}}>{p?.duration}</span>
                                </div>
                              </div>
                              <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${form.program===p.id?"var(--sq-green)":"#cbd5e1"}`,background:form.program===p.id?"var(--sq-green)":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                                {form.program===p.id&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{borderTop:"1.5px solid var(--sq-border)",paddingTop:18}} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={lbl}>Intake <span style={{color:"#f97316"}}>*</span></label>
                          <select className={inp("intake")} value={form.intake} onChange={e=>set("intake",e.target.value)}>
                            <option value="">Select intake</option>
                            {intakes?.map(c=><option key={c?.id}>{c?.name}</option>)}
                          </select>
                          {errors.intake&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.intake}</p>}
                        </div>
                        <div>
                          <label className={lbl}>Study Mode <span style={{color:"#f97316"}}>*</span></label>
                          <select className={inp("studyMode")} value={form.studyMode} onChange={e=>set("studyMode",e.target.value)}>
                            <option value="">Select mode</option>
                            <option>Full-time</option><option>Part-time</option><option>Distance Learning</option>
                          </select>
                          {errors.studyMode&&<p style={{color:"#ef4444",fontSize:11,marginTop:4}}>{errors.studyMode}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Academic Background */}
                {/* <div className="card">
                  <div className="card-head">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    <span style={{color:"#e2e8f0",fontWeight:700,fontSize:15}}>Academic Background</span>
                    <span style={{color:"#64748b",fontSize:12,marginLeft:4}}>(Optional)</span>
                  </div>
                  <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Previous School</label>
                      <input className={inp("previousSchool")} value={form.previousSchool} onChange={e=>set("previousSchool",e.target.value)} placeholder="Name of institution"/>
                    </div>
                    <div>
                      <label className={lbl}>KCSE Grade / Equivalent</label>
                      <select className={inp("grade")} value={form.grade} onChange={e=>set("grade",e.target.value)}>
                        <option value="">Select grade</option>
                        {["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E","Diploma","Degree"].map(g=><option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                </div> */}

                <button className="btn btn-g w-full" onClick={()=>{if(validate())setStep("review")}}>
                  Review Application
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="card sticky top-24">
                  <div style={{background:"#2b7bb9",padding:"16px 20px",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:32,height:32,background:"var(--sq-green)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    </div>
                    <span style={{color:"#fff",fontWeight:700,fontSize:14}}>Application Summary</span>
                  </div>
                  <div style={{padding:"16px 20px"}}>
                    {[
                      ["Program",  prog?.name],
                      ["Level",    prog?.level],
                      ["Duration", prog?.duration],
                      ["Country",  form.country],
                      ["County",   form.county],
                      ["Intake",   form.intake],
                      ["Mode",     form.studyMode],
                    ].map(([l,v])=>(
                      <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"8px 0",borderBottom:"1px solid #f1f5f9"}}>
                        <span style={{color:"var(--sq-muted)"}}>{l}</span>
                        <span style={{fontWeight:600,color:"var(--sq-text)",maxWidth:150,textAlign:"right"}}>{v||<span style={{color:"#cbd5e1"}}>—</span>}</span>
                      </div>
                    ))}
                    <div style={{marginTop:12,paddingTop:12,borderTop:"2px solid var(--sq-green-m)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontWeight:700,color:"var(--sq-text)",fontSize:14}}>Admission Fee</span>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:900,color:"var(--sq-green)",fontSize:22}}>
                          FREE
                          {/* KES {ADMISSION_FEE.toLocaleString()} */}
                          </div>
                        {/* <div style={{fontSize:10,color:"var(--sq-muted)"}}>Non-refundable</div> */}
                         <div style={{fontSize:10,color:"var(--sq-muted)"}}>Enroll for free</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{background:"var(--sq-orange-l)",border:"1.5px solid #fed7aa",borderRadius:14,padding:16}}>
                  <p style={{fontWeight:700,color:"#c2410c",fontSize:13,margin:"0 0 8px",display:"flex",alignItems:"center",gap:6}}>
                    <span>⚠️</span> Important Notice
                  </p>
                  <p style={{fontSize:12,color:"#9a3412",margin:"0 0 6px",lineHeight:1.5}}>The admission fee of <strong>KES {ADMISSION_FEE.toLocaleString()}</strong> is non-refundable and must be paid to confirm your place.</p>
                  <p style={{fontSize:12,color:"#9a3412",margin:0,lineHeight:1.5}}>A confirmation email will be sent upon successful payment.</p>
                </div>

                <div style={{background:"#fff",border:"1.5px solid var(--sq-border)",borderRadius:14,padding:16}}>
                  <p style={{fontSize:11,fontWeight:700,color:"var(--sq-muted)",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 10px"}}>Why Sqooli?</p>
                  {["✅ Accredited programs","🌍 Online & in-person options","📱 Mobile-friendly learning","🏆 Industry-recognized certificates"].map(i=>(
                    <p key={i} style={{fontSize:12,color:"var(--sq-text)",margin:"0 0 6px"}}>{i}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2: REVIEW ══════════════ */}
        {step==="review"&&(
          <div className="fu" style={{maxWidth:680,margin:"0 auto"}}>
            <div className="card mb-5">
              <div className="card-head">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <div>
                  <div style={{color:"#fff",fontWeight:700,fontSize:15}}>Review Your Application</div>
                  <div style={{color:"#86efac",fontSize:12}}>Confirm details before completing</div>
                </div>
              </div>
              {[
                {section:"Personal Details",rows:[
                  ["Full Name",`${form.firstName} ${form.lastName}`],
                  ["Email",form.email],
                  ["Phone",form.phone],
                  // ["ID / Passport",form.idNumber],
                  // ["Date of Birth",form.dob],
                  // ["Gender",form.gender],
                  ["Country",form.country],
                  ["County / District",form.county],
                ]},
                {section:"Program Details",rows:[
                  ["Program",prog?`${prog.name} (${prog.level})`:"—"],
                  ["Duration",prog?.duration||"—"],
                  ["Intake",form.intake],
                  ["Study Mode",form.studyMode],
                ]},
                ...(form.previousSchool||form.grade?[{section:"Academic Background",rows:[["Previous School",form.previousSchool||"—"],["Grade",form.grade||"—"]]}]:[]),
              ].map(({section,rows})=>(
                <div key={section}>
                  <div style={{padding:"8px 22px",background:"#f8fafc",borderTop:"1px solid var(--sq-border)",borderBottom:"1px solid var(--sq-border)"}}>
                    <span style={{fontWeight:700,fontSize:12,color:"var(--sq-green-d)",textTransform:"uppercase",letterSpacing:"0.07em"}}>{section}</span>
                  </div>
                  {rows.map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"12px 22px",borderBottom:"1px solid #f1f5f9",fontSize:14}}>
                      <span style={{color:"var(--sq-muted)"}}>{l}</span>
                      <span style={{fontWeight:600,color:"var(--sq-text)",textAlign:"right",maxWidth:280}}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* <div style={{background:"var(--sq-green-l)",border:"2px solid var(--sq-green)",borderRadius:14,padding:"16px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"var(--sq-green-d)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:2}}>Amount Due</div>
                <div style={{fontWeight:900,color:"var(--sq-green-d)",fontSize:30}}>KES {ADMISSION_FEE.toLocaleString()}</div>
              </div>
              <div style={{textAlign:"right",fontSize:12,color:"var(--sq-green-d)"}}>
                <div style={{fontWeight:700}}>Admission Fee</div>
                <div style={{opacity:0.7}}>One-time · Non-refundable</div>
              </div>
            </div> */}

            <div style={{display:"flex",gap:12}}>
              <button className="btn btn-out" style={{flex:1}} onClick={()=>setStep("enrollment")}>← Edit Details</button>
              <button className="btn btn-g" style={{flex:2}} onClick={()=>submit()}>Proceed to Payment →</button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3: PAYMENT ══════════════ */}
        {step==="payment"&&(
        <Mpesa referenceNumber={referenceNumber} step={step} setStep={setStep} enrollmentID={enrollmentID}  setEnrollmentID={setEnrollmentID} phone={form.phone}  />
        )}

        {/* ══════════════ STEP 4: SUCCESS ══════════════ */}
        {step==="success"&&(
          <div className="fu" style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
            <div className="card" style={{marginBottom:20}}>
              <div style={{background:"linear-gradient(135deg,#15803d,#16a34a)",padding:"36px 24px 28px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:72,height:72,background:"rgba(255,255,255,0.2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h2 style={{color:"#fff",fontWeight:900,fontSize:24,margin:"0 0 6px"}}>You're Enrolled! 🎉</h2>
                <p style={{color:"#bbf7d0",fontSize:14,margin:0}}>Welcome to Sqooli — your future starts now</p>
              </div>
              <div style={{padding:"20px 24px"}}>
                <div style={{background:"var(--sq-green-l)",border:"1px solid var(--sq-green-m)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"var(--sq-green-d)",marginBottom:18}}>
                  Confirmation sent to <strong>{form.email}</strong>
                </div>
                {[
                  ["Reference", refNumber],
                  ["Student Name", `${form.firstName} ${form.lastName}`],
                  ["Program", prog?`${prog.name} (${prog.level})`:""],
                  ["Country", form.country],
                  ["County / Mkoa", form.county],
                  ["Intake", form.intake],
                  ["Study Mode", form.studyMode],
                  ["Amount Paid", `KES ${ADMISSION_FEE.toLocaleString()}`],
                  ["Status", "✅ Confirmed"],
                ].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f1f5f9",fontSize:14,textAlign:"left"}}>
                    <span style={{color:"var(--sq-muted)"}}>{l}</span>
                    <span style={{fontWeight:700,color:"var(--sq-text)"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:"#fff",border:"1.5px solid var(--sq-border)",borderRadius:14,padding:"16px 20px",textAlign:"left",marginBottom:20}}>
              <p style={{fontWeight:700,color:"var(--sq-text)",fontSize:14,margin:"0 0 12px"}}>🎓 What Happens Next?</p>
              {[
                "Our admissions team reviews your application within 3–5 business days.",
                `Keep your reference number ${refNumber} for tracking.`,
                "You'll receive your student ID and orientation schedule via email.",
                "Visit sqooli.org to explore your upcoming courses.",
              ].map(t=>(
                <div key={t} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,fontSize:13,color:"#475569"}}>
                  <span style={{color:"var(--sq-green)",fontWeight:700,flexShrink:0}}>→</span>{t}
                </div>
              ))}
            </div>

            <button className="btn btn-g w-full" onClick={reset}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
              Start New Application
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{background:"#2b7bb9",borderTop:"1px solid #2b7bb9",marginTop:48,padding:"24px 20px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}>
          <img src="/logo.svg" alt="Sqooli Logo" className="max-w-[100px]" />
        </div>
        <p style={{color:"#ffff",fontSize:12,margin:"0 0 4px"}}>hello@sqooli.africa · +254 723 86 86 77</p>
        <p style={{color:"#ffff",fontSize:12,margin:0}}>© {new Date().getFullYear()} Sqooli. All rights reserved. · Innovative Learning Solutions</p>
      </footer>
    </div>
  );
}