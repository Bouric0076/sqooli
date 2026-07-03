import { getEnrollmentStatus, payEnrollment } from '@/app/lib/enrollment';
import React, { useState, useEffect } from 'react';

const ADMISSION_FEE = 2000;
type Step = "enrollment" | "review" | "payment" | "success";
interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  idNumber: string; dob: string; gender: string;
  country: string; county: string;
  program: string; intake: string; studyMode: string;
  previousSchool: string; grade: string;
}

interface MpesaProps{
  step:string,
  setStep: (val: string) => void,
  enrollmentID:number,
  referenceNumber:string,
  setEnrollmentID: (val: number) => void,
  phone:string
}

function Mpesa({step,setStep,enrollmentID,referenceNumber,setEnrollmentID,phone}:MpesaProps) {

  const [form, setForm] = useState<FormData>({
    firstName:"",lastName:"",email:"",phone:"",idNumber:"",
    dob:"",gender:"",country:"",county:"",
    program:"",intake:"",studyMode:"",previousSchool:"",grade:"",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [payMethod, setPayMethod] = useState<"Mpesa"|"Paystack">("Mpesa");
  const [MpesaPhone, setMpesaPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [refNumber] = useState(`SQ-${Date.now().toString().slice(-8)}`);
  const [enrollment,setEnrollment] = useState(null);
  const [PaystackUrl,setPaystackUrl] = useState<string | null>(null);

  function set(field: keyof FormData, val: string) {
    setForm(f => ({...f, [field]: val}));
    setErrors(e => ({...e, [field]: undefined}));
  }

  // Poll for payment status if M-Pesa is selected and payment is processing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (paying && payMethod === "Mpesa") {
      // Check status every 4 seconds
      interval = setInterval(() => {
        getEnrollmentStatus(enrollmentID)
          .then((res) => {
            if (res?.paymentStatus === "Paid" || res?.paymentStatus === "paid") {
              setPaying(false);
              setStep("success");
            }
          })
          .catch((err) => {
            console.error("Error checking enrollment status:", err);
          });
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paying, payMethod, enrollmentID, setStep]);

  async function pay() {
    setPaying(true);

    await payEnrollment({
      enrollmentId: enrollmentID,
      phone: payMethod === "Mpesa" ? MpesaPhone : phone,
      paymentMethod: payMethod 
    }).then((res)=>{
      if (payMethod === "Paystack" && res?.url) {
        window.location.href = res.url;
      } else {
        setPaystackUrl(res?.url);
      }
    }).catch((err) => {
      console.error("Enrollment payment failed:", err);
      setPaying(false); // Stop loading state if the request itself failed
    });
  }

  function reset() {
    setStep("enrollment");
    setForm({firstName:"",lastName:"",email:"",phone:"",idNumber:"",dob:"",gender:"",country:"",county:"",program:"",intake:"",studyMode:"",previousSchool:"",grade:""});
    setMpesaPhone(""); 
  }

  const inp = (f: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all bg-white
     ${errors[f] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#16a34a] focus:shadow-[0_0_0_3px_rgba(22,163,74,0.12)]"}`;
  const lbl = "block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <div>
                      
      <div className="fu" style={{maxWidth:520,margin:"0 auto"}}>
        <div className="card mb-4">
          <div className="card-head">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15}}>Complete Payment</div>
              <div style={{color:"#86efac",fontSize:12}}>Secure · KES {ADMISSION_FEE.toLocaleString()}</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{display:"flex",background:"#f1f5f9",borderRadius:12,padding:4,marginBottom:20}}>
              {[{k:"Mpesa",l:"📱 M-Pesa"},{k:"Paystack",l:"💳 Paystack"}].map(m=>(
                <button key={m.k} onClick={()=>setPayMethod(m.k as any)}
                  style={{flex:1,padding:"10px",borderRadius:9,fontWeight:700,fontSize:13,border:"none",cursor:"pointer",transition:"all 0.15s",
                    background:payMethod===m.k?"#fff":"transparent",
                    color:payMethod===m.k?"var(--sq-text)":"#64748b",
                    boxShadow:payMethod===m.k?"0 1px 6px rgba(0,0,0,0.1)":"none"}}>
                  {m.l}
                </button>
              ))}
            </div>

            {payMethod==="Mpesa"&&(
              <div>
                <div style={{background:"#f0fdf4",border:"1.5px solid #86efac",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                  <div style={{width:44,height:44,background:"#16a34a",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{color:"#fff",fontWeight:900,fontSize:18}}>M</span>
                  </div>
                  <div>
                    <div style={{fontWeight:700,color:"#15803d",fontSize:14}}>Lipa na M-Pesa</div>
                    <div style={{fontSize:12,color:"#16a34a"}}>STK Push sent to your Safaricom line</div>
                  </div>
                </div>
                <div style={{marginBottom:14}}>
                  <label className={lbl}>M-Pesa Phone Number</label>
                  <input style={{width:"100%",padding:"12px 16px",border:"2px solid #e2e8f0",borderRadius:12,fontSize:14,outline:"none",transition:"border 0.15s"}}
                    onFocus={e=>(e.target.style.borderColor="var(--sq-green)")} onBlur={e=>(e.target.style.borderColor="#e2e8f0")}
                    value={MpesaPhone} onChange={e=>setMpesaPhone(e.target.value)} placeholder="07XX XXX XXX"/>
                </div>
                <div style={{background:"#f8fafc",borderRadius:10,padding:12,fontSize:12,color:"#475569",marginBottom:16,lineHeight:1.6}}>
                  <strong style={{color:"var(--sq-text)"}}>How it works:</strong><br/>
                  1. Enter your Safaricom number<br/>
                  2. Tap "Pay Now" to receive STK Push<br/>
                  3. Enter your M-Pesa PIN to confirm <strong>KES {ADMISSION_FEE.toLocaleString()}</strong>
                </div>
                      <div style={{background:"#f8fafc",borderRadius:10,padding:12,fontSize:12,color:"#475569",marginBottom:16,lineHeight:1.6}}>
                  <strong style={{color:"var(--sq-text)"}}>OR:</strong><br/>
                  1. Go to Lipa na Mpesa<br/>
                  2. Enter Paybill <b>5694730</b><br/>
                  3. Enter Account <b>{referenceNumber}</b><br/>
                  3. Enter Amount <b>2000</b><br/>
                  3. Enter your M-Pesa PIN to confirm <strong>KES {ADMISSION_FEE.toLocaleString()}</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--sq-green-l)",borderRadius:12,padding:"12px 16px",marginBottom:16}}>
                  <span style={{fontWeight:700,color:"var(--sq-text)"}}>Total</span>
                  <span style={{fontWeight:900,color:"var(--sq-green-d)",fontSize:22}}>KES {ADMISSION_FEE.toLocaleString()}</span>
                </div>
                <button className="btn btn-g w-full" onClick={pay} disabled={paying||!MpesaPhone}>
                  {paying?<><svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity=".3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>Waiting for Payment...</>
                    :<>Pay KES {ADMISSION_FEE.toLocaleString()} via M-Pesa</>}
                </button>
              </div>
            )}

            {payMethod==="Paystack"&&(
              <div>
                <div style={{borderRadius:16,padding:20,marginBottom:18,position:"relative",overflow:"hidden",background:"#0ba4db"}}>
                  <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.15)"}}/>
                  <div style={{position:"absolute",bottom:-30,left:-30,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.12)"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,position:"relative"}}>
                    <span style={{fontSize:10,color:"#e0f2fe",fontWeight:700,letterSpacing:"0.1em"}}>SECURE CHECKOUT</span>
                    <span style={{color:"#fff",fontWeight:900,fontSize:14,letterSpacing:"1px"}}>Paystack</span>
                  </div>
                  <div style={{fontSize:15,color:"#fff",marginBottom:16,position:"relative",lineHeight:1.5}}>
                    You will be securely redirected to Paystack to complete your payment.
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#e0f2fe",position:"relative"}}>
                    <span>SQOOLI ENROLLMENT</span>
                  </div>
                </div>
                
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--sq-green-l)",borderRadius:12,padding:"12px 16px",marginBottom:16}}>
                  <span style={{fontWeight:700,color:"var(--sq-text)"}}>Total</span>
                  <span style={{fontWeight:900,color:"var(--sq-green-d)",fontSize:22}}>KES {ADMISSION_FEE.toLocaleString()}</span>
                </div>
                <button className="btn btn-g w-full" onClick={pay} disabled={paying}>
                  {paying?<><svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity=".3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>Redirecting...</>
                    :<>Proceed to Paystack</>}
                </button>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:10,fontSize:11,color:"#94a3b8"}}>
                  🔒 Secured by Paystack
                </div>
              </div>
            )}
          </div>
        </div>
        <button style={{width:"100%",background:"none",border:"none",color:"#64748b",fontSize:13,cursor:"pointer",padding:"8px 0"}} onClick={()=>setStep("review")}>← Back to Review</button>
      </div>

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
            //   ["Program", prog?`${prog?.name} (${prog?.level})`:""],
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
  );
}

export default Mpesa;