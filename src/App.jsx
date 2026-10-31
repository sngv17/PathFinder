import React, { useMemo, useState } from "react";
import class10Questions from "./data/class10Questions.json";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const stageData = {
  class10: {
    label: "Class 10",
    intro: "Explore what you can do after Class 10, which routes open up later, and how to compare learning, work and exam options.",
    categories: [
      ["Government & entrance exams", "Understand what is available after Class 10 and which exams require further study first.", "Explore eligible 10th-pass roles, ITI/polytechnic entry, and exams that require Class 12 or a degree. Check age and current rules."],
      ["Private-sector careers", "Explore practical skills, apprenticeships and entry-level work while checking training and safety requirements.", "Compare skill-based training, apprenticeships and entry-level work. For minors, involve a parent or trusted adult and verify applicable rules."],
      ["Professional & skill courses", "Compare vocational, technical and creative training by recognition, fees, duration and next-step options.", "Explore ITI trades, diplomas, computer skills, healthcare support and creative courses; verify recognition before enrolling."],
      ["Further study & streams", "See how different subject choices can connect to science, commerce, humanities and other routes.", "Compare science, commerce, humanities and vocational options by subjects, interests and the opportunities each may keep open."],
    ],
  },
  class12: {
    label: "Class 12",
    intro: "Compare entrance exams, further study, government routes and early career options that may fit your subjects and goals.",
    categories: [
      ["Government & entrance exams", "Explore post-Class 12 exams, entrance routes and later government careers with eligibility in view.", "Research undergraduate entrance tests, defence routes and government exams. Many public-sector roles require a degree; verify each notice."],
      ["Private-sector careers", "See degree-linked roles, practical skills and entry points across different industries.", "Compare internships, apprenticeships and entry roles in technology, business, healthcare, media and operations."],
      ["Professional courses", "Compare qualifications and focused training by cost, recognition, duration and career outcomes.", "Explore professional qualifications and vocational courses; verify accreditation, total fees and placement evidence."],
      ["Further study & college", "Compare courses and colleges by subjects, entrance requirements, location, cost and fit.", "Shortlist courses, entrance dates, scholarships and college costs. Confirm details with official institutions."],
    ],
  },
  graduation: {
    label: "Graduation",
    intro: "Explore government and private-sector routes, relevant qualifications and career changes that make use of your degree.",
    categories: [
      ["Government & public exams", "Compare degree-eligible government, banking, regulator and public-sector exams.", "Explore UPSC/state services, SSC, banking and regulator/PSU notices where your degree qualifies. Check age, subject and exam rules."],
      ["Private-sector careers", "Find adjacent roles and skills-led entry points that may build on your degree.", "Research roles across technology, analytics, finance, operations, sales, consulting and research; compare actual job requirements."],
      ["Professional courses", "Compare certifications and qualifications by recognition, fees and value for your target role.", "Explore role-specific qualifications such as accounting, finance, data, teaching or project credentials; check employer demand."],
      ["Further study & career switch", "Assess postgraduate study, entrance tests and transitions into a different field.", "Compare a master’s, professional course or portfolio-led transition against fees, time away from work and expected outcomes."],
    ],
  },
  postgraduation: {
    label: "Post graduation",
    intro: "Look at specialist roles, public-sector exams and career transitions that build on your degree and experience.",
    categories: [
      ["Government & specialist exams", "Review public-sector and specialist recruitment that matches your qualification.", "Research specialist government, regulator, PSU and research recruitment. Eligibility often depends on discipline and current vacancies."],
      ["Private-sector growth", "Compare specialist, leadership and cross-industry roles using your experience.", "Explore specialist, product, research, analytics, consulting and leadership roles; compare skills and experience requirements."],
      ["Professional credentials", "Consider advanced credentials when they have a clear connection to your target role.", "Check whether a professional qualification is required or valued for your target role before investing."],
      ["Further study & transitions", "Weigh advanced study or a career shift against opportunity cost and your existing experience.", "Compare doctoral study, a specialist programme or an industry switch by cost, time, recognition and realistic outcomes."],
    ],
  },
};

const icons = ["◎", "⌘", "✳", "↗"];
const streamInfo = [
  { id: "PCM", name: "Science with Mathematics (PCM)", short: "Physics, chemistry, maths, engineering and technology", detail: "Explore engineering, computing, architecture and other maths-based routes. Check subject requirements for each course." },
  { id: "PCB", name: "Science with Biology (PCB)", short: "Biology, health, life sciences and care", detail: "Explore medicine, allied health, biological research and life-science routes. Many require specific subjects, exams or training." },
  { id: "COMMERCE", name: "Commerce", short: "Business, accounting, economics and finance", detail: "Explore accounting, finance, business, economics and entrepreneurship through different degrees and professional qualifications." },
  { id: "ARTS_LAW", name: "Humanities, social sciences & law", short: "Society, policy, communication, history and law", detail: "Explore law, public service, social sciences, education, media and policy. Entry routes and subject choices vary." },
  { id: "CREATIVE_FASHION", name: "Creative, design & media", short: "Visual communication, fashion, design and making", detail: "Explore design, fashion, media and creative practice. Portfolios, entrance tests and practical skills may matter." },
];

function Logo({ light = false }) {
  return <a className={`brand${light ? " brand-light" : ""}`} href="#" aria-label="Disharo home"><span className="brand-mark">↗</span> disharo</a>;
}

function AuthScreen({ onContinue }) {
  const [mode, setMode] = useState("signup");
  const [method, setMethod] = useState("mobile");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", identifier: "", password: "" });

  function submit(event) {
    event.preventDefault();
    const identifier = form.identifier.trim();
    const validMobile = /^[6-9]\d{9}$/.test(identifier);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    if (method === "mobile" ? !validMobile : !validEmail) {
      setError(method === "mobile" ? "Enter a valid 10-digit Indian mobile number." : "Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (mode === "signup" && !form.name.trim()) {
      setError("Enter your name to create your account.");
      return;
    }
    setError("");
    onContinue({ name: form.name.trim(), identifier, method });
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand"><Logo /></div>
        <div className="auth-content">
          <div className="auth-copy">
            <span className="eyebrow">Career clarity starts with you</span>
            <h1>Your next step has more than one possibility.</h1>
            <p>Create an account or sign in to explore career paths, exams, and study options shaped around your journey.</p>
            <div className="auth-art" aria-hidden="true">
              <div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" />
              <div className="art-route route-one"><span>◎</span><div><b>Explore a direction</b><small>There’s more than one route</small></div><i>↗</i></div>
              <div className="art-route route-two"><span>✳</span><div><b>Make your next move</b><small>At your own pace</small></div><i>↗</i></div>
              <div className="art-sticker">Your background<br />is a beginning.</div>
            </div>
            <p className="auth-trust">Guidance to help you decide—not a promise of a job or exam result.</p>
          </div>
          <div className="auth-card">
            <div className="auth-card-heading">
              <span className="eyebrow">{mode === "signup" ? "Your next chapter" : "Welcome back"}</span>
              <h2>{mode === "signup" ? "Create your account" : "Sign in to Disharo"}</h2>
              <p>{mode === "signup" ? "A few details, then we’ll tailor your dashboard." : "Continue exploring your next step."}</p>
            </div>
            <div className="auth-tabs" role="tablist" aria-label="Sign-up method">
              <button type="button" className={method === "mobile" ? "active" : ""} onClick={() => { setMethod("mobile"); setError(""); }}>Mobile number</button>
              <button type="button" className={method === "email" ? "active" : ""} onClick={() => { setMethod("email"); setError(""); }}>Email address</button>
            </div>
            <form className="auth-form" onSubmit={submit}>
              {mode === "signup" && <label className="field"><span>Full name</span><input autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="e.g. Aanya Sharma" required /></label>}
              <label className="field"><span>{method === "mobile" ? "Mobile number" : "Email address"}</span>
                <input autoComplete={method === "mobile" ? "tel-national" : "email"} inputMode={method === "mobile" ? "numeric" : "email"} type={method === "email" ? "email" : "tel"} value={form.identifier} onChange={event => setForm({ ...form, identifier: event.target.value })} placeholder={method === "mobile" ? "10-digit Indian mobile number" : "you@example.com"} required />
              </label>
              <label className="field"><span>Password</span><input type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="At least 6 characters" required /></label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <p className="demo-notice">Demo sign-in only. No account is created, password saved, or verification message sent.</p>
              <button className="button auth-submit" type="submit">{mode === "signup" ? "Create account" : "Sign in"} <span className="arrow">→</span></button>
            </form>
            <p className="switch-mode">{mode === "signup" ? "Already have an account?" : "New to Disharo?"} <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}>{mode === "signup" ? "Sign in" : "Create an account"}</button></p>
            <p className="terms-note">By continuing, you agree to use this demo responsibly. Real authentication requires a secure identity provider.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileScreen({ account, onComplete, onBack }) {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({ gender: "", city: "", state: "", stage: "", alerts: false });
  function submit(event) {
    event.preventDefault();
    if (!profile.gender || !profile.city.trim() || !profile.state || !profile.stage) {
      setError("Complete each required field to personalize your dashboard.");
      return;
    }
    onComplete({ ...profile, city: profile.city.trim(), ...account });
  }
  return (
    <main className="entry-screen">
      <section className="entry-card">
        <div className="entry-top"><Logo /><button type="button" className="text-button" onClick={onBack}>← Back</button></div>
        <span className="eyebrow">One more step</span>
        <h1>Tell us where you are today.</h1>
        <p className="entry-intro">We’ll use your education stage and location to tailor the opportunities you see.</p>
        <form className="profile-form" onSubmit={submit}>
          <label className="field"><span>Name</span><input value={account.name} readOnly /></label>
          <label className="field"><span>{account.method === "email" ? "Email address" : "Mobile number"}</span><input value={account.identifier} readOnly /></label>
          <label className="field"><span>Gender</span><select value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })} required><option value="">Select</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
          <label className="field"><span>City</span><input value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} placeholder="Your city" maxLength={70} required /></label>
          <label className="field"><span>State / union territory</span><select value={profile.state} onChange={e => setProfile({ ...profile, state: e.target.value })} required><option value="">Choose your state / UT</option>{states.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className="field"><span>Education stage</span><select value={profile.stage} onChange={e => setProfile({ ...profile, stage: e.target.value })} required><option value="">Choose your current stage</option><option value="class10">Class 10</option><option value="class12">Class 12</option><option value="graduation">Graduation</option><option value="postgraduation">Post graduation</option></select></label>
          <label className="form-consent"><input type="checkbox" checked={profile.alerts} onChange={e => setProfile({ ...profile, alerts: e.target.checked })} /><span>Send me relevant exam and opportunity alerts if this feature launches. Optional.</span></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button form-submit">Show my dashboard <span className="arrow">→</span></button>
        </form>
        <p className="privacy-note">Demo only: profile details stay in this page session. Alerts are not sent.</p>
      </section>
    </main>
  );
}

function CareerTest() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState(() => Array(class10Questions.length).fill(null));
  const [error, setError] = useState("");
  const isResult = step >= class10Questions.length;
  const question = class10Questions[step];
  const scores = useMemo(() => streamInfo.map(stream => ({
    ...stream,
    count: answers.reduce((total, answer, index) => total + (answer !== null && class10Questions[index].options[answer].stream === stream.id ? 1 : 0), 0),
  })), [answers]);
  const highestScore = Math.max(...scores.map(stream => stream.count));
  const nearTopMargin = Math.max(1, Math.ceil(highestScore * 0.1));
  const pathsToExplore = scores.filter(stream => stream.count > 0 && stream.count >= highestScore - nearTopMargin);
  const rankedScores = [...scores].sort((a, b) => b.count - a.count);
  const selectedAnswer = step >= 0 && !isResult ? answers[step] : null;

  function next() {
    if (step === -1) { setStep(0); return; }
    if (isResult) { setStep(-1); setAnswers(Array(class10Questions.length).fill(null)); setError(""); return; }
    if (step === class10Questions.length - 1) {
      if (selectedAnswer === null) { setError("Choose the option that feels closest to continue."); return; }
      setError("");
      setStep(class10Questions.length);
      return;
    }
    if (selectedAnswer === null) { setError("Choose the option that feels closest to continue."); return; }
    setError("");
    setStep(current => current + 1);
  }

  function goBack() {
    if (isResult) return;
    if (step === 0) { setStep(-1); return; }
    setStep(current => current - 1);
  }

  return (
    <div className="mini-test-box" aria-live="polite">
      <div className="quiz-progress"><span className="quiz-step">{step < 0 ? "READY WHEN YOU ARE" : isResult ? "YOUR REFLECTION" : `QUESTION ${step + 1}`}</span><div className="progress-track"><div className="progress-fill" style={{ width: `${isResult ? 100 : Math.max(0, ((step + 1) / class10Questions.length) * 100)}%` }} /></div><span>{step < 0 ? `${class10Questions.length} questions` : isResult ? "A starting point" : `${step + 1} of ${class10Questions.length}`}</span></div>
      <h3 className="quiz-question">{step < 0 ? "Explore what interests you across five different directions." : isResult ? pathsToExplore.length > 1 ? "Several paths can fit the way you think." : "Your answers point to a direction worth exploring." : question.scenario}</h3>
      {step < 0 ? <p className="quiz-instruction">Answer all {class10Questions.length} questions. Each option represents a different interest area—there are no right or wrong answers.</p> : isResult ? <div className="quiz-result">
        <span className="result-tag">Your Class 10 interest map</span>
        <h3>{pathsToExplore.length > 1 ? "More than one path may be worth exploring." : `Start by exploring ${pathsToExplore[0]?.name || "your leading interest"}.`}</h3>
        <p>These are interest signals from your answers, not a stream recommendation or a measure of ability. Paths within 10% of your highest answer count (at least one answer) are grouped together. Compare subjects, talk with a teacher or counsellor, and try a small project before choosing.</p>
        <div className="stream-results">
          {rankedScores.map((stream, index) => (
            <article className={`stream-result${pathsToExplore.some(path => path.id === stream.id) ? " top-match" : ""}`} key={stream.id}>
              <div className="stream-result-head"><div><span className="stream-rank">{index + 1}</span><strong>{stream.name}</strong>{pathsToExplore.some(path => path.id === stream.id) && <span className="match-tag">Explore this</span>}</div><span className="stream-count">{stream.count}/50 answers</span></div>
              <div className="score-track" aria-label={`${stream.name}: ${stream.count} out of 50 answers`}><span style={{ width: `${stream.count / class10Questions.length * 100}%` }} /></div>
              <p>{stream.short}</p>
              {pathsToExplore.some(path => path.id === stream.id) && <p className="stream-detail">{stream.detail}</p>}
            </article>
          ))}
        </div>
      </div> : <div className="answers">{question.options.map((option, index) => <button key={option.text} type="button" aria-pressed={selectedAnswer === index} className={`answer${selectedAnswer === index ? " selected" : ""}`} onClick={() => { setAnswers(current => current.map((answer, answerIndex) => answerIndex === step ? index : answer)); setError(""); }}>{option.text}</button>)}</div>}
      {error && !isResult && <p className="form-error" role="alert">{error}</p>}
      <div className="quiz-footer"><span className="quiz-disclaimer">{step < 0 ? "A game-style reflection only. It does not assess ability or predict success." : isResult ? "Interest scores are not probabilities, validated psychometrics or promises of outcomes." : "Pick what feels closest to you today."}</span><div className="quiz-buttons">{step > 0 && !isResult && <button type="button" className="button back-button" onClick={goBack}>← Back</button>}<button type="button" className="button" onClick={next}>{step < 0 ? "Start free test" : isResult ? "Play again" : step === class10Questions.length - 1 ? "See my results" : "Continue"} <span className="arrow">{isResult ? "↺" : "→"}</span></button></div></div>
    </div>
  );
}

function Dashboard({ profile, onLogout }) {
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState("");
  const data = stageData[profile.stage];
  const isClass10 = profile.stage === "class10";
  const categories = useMemo(() => data.categories, [data]);
  function demoMessage(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 4200);
  }
  return (
    <div className="dashboard">
      <header className="site-header"><nav className="site-nav wrap" aria-label="Main navigation">
        <Logo />
        <div className="site-links"><a href="#career-categories">Opportunities</a>{isClass10 && <a href="#class10-test">Free mini-test</a>}<a href="#decision-call">1:1 decision call</a></div>
        <div className="welcome"><span>Welcome, <b>{profile.name}</b></span><span className="avatar">{profile.name.charAt(0).toUpperCase()}</span><button type="button" className="logout-button" onClick={onLogout} aria-label="Sign out">↗</button></div>
      </nav></header>
      <main>
        <section className="dash-hero"><div className="dash-grid wrap">
          <div className="dash-copy"><span className="eyebrow">Your next step, made clearer</span><h1>There’s more than one way <em>forward.</em></h1><p>{data.intro}</p><div className="profile-context"><span>{data.label}</span><span>{profile.city}, {profile.state}</span></div><p className="hero-note">Guidance to help you decide—not a promise of admission, a job or an exam result.</p></div>
          <article className="unlock-card"><div className="unlock-top"><span className="unlock-tag">Your opportunity map</span><span className="unlock-price">₹200 <small>one-time</small></span></div><h2>See the opportunities still open to you.</h2><p>A focused map of next steps based on your education stage, with routes to research rather than a one-size-fits-all answer.</p><ul className="unlock-list"><li>Relevant entrance and government exam routes</li><li>Private-sector, professional and study options</li><li>Eligibility and preparation steps to verify</li><li>Optional alerts for relevant exam notifications</li></ul><label className="payment-confirm"><input type="checkbox" defaultChecked={profile.alerts} /><span>Include relevant exam and opportunity alerts (optional)</span></label><button type="button" className="button light" onClick={() => demoMessage("Demo only: checkout is not connected, so no payment was taken.")}>View my opportunity map — ₹200 <span className="arrow">→</span></button><p className="unlock-foot">Payments and SMS/WhatsApp notifications are not connected in this demo.</p></article>
        </div></section>
        <section className="dash-section" id="career-categories"><div className="wrap"><div className="dash-heading"><div><span className="eyebrow">Explore four directions</span><h2>Which kind of opportunity do you want to look at?</h2></div><p>Preview a category below. The ₹200 map is designed to bring the relevant routes together for your stage.</p></div><div className="category-grid">{categories.map((category, index) => <article className="category-card" key={category[0]}><span className="route-icon">{icons[index]}</span><span className="locked-label">Inside the ₹200 opportunity map</span><h3>{category[0]}</h3><p>{category[1]}</p><button type="button" onClick={() => setDialog(category)}>Preview this category →</button></article>)}</div><p className="demo-disclaimer">Verify current eligibility, dates and requirements on official exam or institution websites. Opportunities and outcomes vary by person.</p></div></section>
        {isClass10 && <section className="dash-section mini-test-section" id="class10-test"><div className="mini-test-grid wrap"><div className="mini-test-intro"><span className="eyebrow">A free starting point</span><h2>A little game to explore what interests you.</h2><p>For Class 10 students: answer 50 everyday-choice questions and see fields you may want to explore. It’s a conversation starter, not a psychological test or a stream recommendation.</p><span className="free-label">FREE · CLASS 10 MINI-TEST</span></div><CareerTest /></div></section>}
        <section className="callout-section" id="decision-call"><div className="wrap"><article className="callout-card"><div><span className="eyebrow">Need a person to talk it through?</span><h2>Confused between two courses, colleges or career routes?</h2><p>Book a one-to-one decision conversation to compare your options and leave with a practical next step.</p></div><div><div className="call-price">₹499 <small>/ one-to-one call</small></div><button type="button" className="button" onClick={() => demoMessage("Demo only: call booking and payment are not connected. No payment was taken.")}>Request a decision call <span className="arrow">↗</span></button></div></article><p className="demo-disclaimer">Booking, online payments and alerts are demo placeholders. Connect secure providers before accepting real payments or personal data.</p></div></section>
      </main>
      <footer className="dash-footer"><div className="dash-footer-inner wrap"><Logo light /><span>Thoughtful guidance. Your decision.</span><span>Profile details are not saved in this demo.</span></div></footer>
      {dialog && <div className="dialog-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setDialog(null); }}><section className="category-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="dialog-close" type="button" onClick={() => setDialog(null)} aria-label="Close">×</button><span className="eyebrow">Opportunity category</span><h2 id="dialog-title">{dialog[0]}</h2><p>{dialog[1]}</p><div className="dialog-sample">{dialog[2]}</div><button type="button" className="button" onClick={() => { setDialog(null); demoMessage("Demo only: checkout is not connected, so no payment was taken."); }}>Explore all options — ₹200 <span className="arrow">→</span></button></section></div>}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("auth");
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState(null);
  function continueToProfile(value) {
    setAccount({ ...value, name: value.name || value.identifier.split("@")[0] });
    setStep("profile");
  }
  if (step === "auth") return <AuthScreen onContinue={continueToProfile} />;
  if (step === "profile") return <ProfileScreen account={account} onBack={() => setStep("auth")} onComplete={value => { setProfile(value); setStep("dashboard"); }} />;
  return <Dashboard profile={profile} onLogout={() => { setProfile(null); setAccount(null); setStep("auth"); }} />;
}
