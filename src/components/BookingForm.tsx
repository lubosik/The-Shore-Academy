"use client";

import { useState, useEffect } from "react";

const PACKAGES = [
  "1 Session - $175/student",
  "3-Session Course - $450/student ($150/session)",
  "6-Session Mastery - $750/student ($125/session)",
  "Private 1:1 Session - $275/session",
  "Private Family Group - $400/session",
  "Junior Lifeguard Program - $1,499/cohort (4 weeks)",
  "Not sure yet - discuss on call",
];

const TIMES = [
  "No preference / discuss on call",
  "9:00 AM - 10:00 AM",
  "10:30 AM - 11:30 AM",
  "12:00 PM - 1:00 PM",
  "1:30 PM - 2:30 PM",
];

function getUpcomingWeekends(): string[] {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const options: string[] = [];
  for (let i = 0; i < 16; i++) {
    const sat = new Date(today);
    sat.setDate(today.getDate() + daysUntilSat + i * 7);
    const sun = new Date(sat);
    sun.setDate(sat.getDate() + 1);
    options.push(`${months[sat.getMonth()]} ${sat.getDate()} (Sat) or ${months[sun.getMonth()]} ${sun.getDate()} (Sun)`);
  }
  return options;
}

interface StudentInfo {
  firstName: string;
  lastName: string;
  age: string;
  swimLevel: string;
  email: string;
  phone: string;
  medical: string;
  allergies: string;
  emergencyContact: string;
  emergencyPhone: string;
}

function defaultStudent(): StudentInfo {
  return {
    firstName: "",
    lastName: "",
    age: "",
    swimLevel: "",
    email: "",
    phone: "",
    medical: "",
    allergies: "",
    emergencyContact: "",
    emergencyPhone: "",
  };
}

export default function BookingForm() {
  const [weekends, setWeekends] = useState<string[]>([]);
  const [numStudents, setNumStudents] = useState(1);
  const [students, setStudents] = useState<StudentInfo[]>([defaultStudent()]);
  const [form, setForm] = useState({
    preferredDate: "",
    preferredTime: TIMES[0],
    package: "",
    location: "",
    additionalNotes: "",
    parentFirst: "",
    parentLast: "",
    parentEmail: "",
    parentPhone: "",
    parentRelationship: "",
    waiverAgreed: false,
    prereqConfirmed: false,
    photoConsent: true,
    callConsent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setWeekends(getUpcomingWeekends()); }, []);

  useEffect(() => {
    const count = numStudents;
    setStudents((prev) => {
      const next = [...prev];
      while (next.length < count) next.push(defaultStudent());
      return next.slice(0, count);
    });
  }, [numStudents]);

  const allAdult = students.every((s) => parseInt(s.age) >= 18);
  const showParent = !allAdult || students.some((s) => !s.age);

  function updateStudent(idx: number, field: keyof StudentInfo, value: string) {
    setStudents((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const sessionInfo = {
      package: form.package,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      preferredLocation: form.location,
      numStudents,
    };

    const consentInfo = {
      consentWaiver: form.waiverAgreed,
      consentPrereqs: form.prereqConfirmed,
      consentPhoto: form.photoConsent,
      consentCall: form.callConsent,
    };

    const consentText = [
      `Liability Waiver: ${form.waiverAgreed ? "AGREED" : "NO"}`,
      `Prerequisites Confirmed: ${form.prereqConfirmed ? "YES" : "NO"}`,
      `Photo/Video Consent: ${form.photoConsent ? "YES" : "OPT OUT"}`,
      `Call Consultation Acknowledged: ${form.callConsent ? "YES" : "NO"}`,
    ].join(" | ");

    const parentName = showParent ? `${form.parentFirst} ${form.parentLast}` : "";
    const studentListSummary = students.map((s) => `${s.firstName} ${s.lastName} (Age ${s.age})`).join(", ");

    // Build one webhook payload per contact - each creates exactly one GHL contact in Make.com
    const webhookPayloads: object[] = [];

    // One payload per student
    students.forEach((s, i) => {
      const isAdult = parseInt(s.age) >= 18;
      const studentNotes = [
        `=== STUDENT PROFILE ===`,
        `Name: ${s.firstName} ${s.lastName}`,
        `Age: ${s.age}`,
        `Swim Level: ${s.swimLevel}`,
        s.medical ? `Medical Conditions: ${s.medical}` : "Medical Conditions: None",
        s.allergies ? `Allergies: ${s.allergies}` : "Allergies: None",
        s.emergencyContact ? `Emergency Contact: ${s.emergencyContact} (${s.emergencyPhone})` : "",
        "",
        `=== SESSION ===`,
        `Package: ${form.package}`,
        `Preferred Date: ${form.preferredDate}`,
        `Preferred Time: ${form.preferredTime}`,
        form.location ? `Preferred Location: ${form.location}` : "",
        numStudents > 1 ? `Group Booking: ${numStudents} students total` : "",
        "",
        showParent ? `=== PARENT/GUARDIAN ===\nName: ${parentName}\nRelationship: ${form.parentRelationship || "Parent/Guardian"}\nEmail: ${form.parentEmail}\nPhone: ${form.parentPhone}` : "",
        "",
        `=== CONSENTS ===`,
        consentText,
        form.additionalNotes ? `\n=== ADDITIONAL NOTES ===\n${form.additionalNotes}` : "",
      ].filter(Boolean).join("\n").trim();

      webhookPayloads.push({
        // - GHL Create Contact fields -
        contactType: "student",
        firstName: s.firstName,
        lastName: s.lastName,
        email: isAdult ? s.email : "",
        phone: isAdult ? s.phone : "",
        source: "Website Booking Form",
        timezone: "America/New_York",
        tags: ["Shore Academy", "Student", "Booking Requested", form.package].filter(Boolean),
        notes: studentNotes,
        // - Flat fields for easy Make.com mapping -
        studentIndex: i + 1,
        age: s.age,
        swimLevel: s.swimLevel,
        medical: s.medical || "None",
        allergies: s.allergies || "None",
        emergencyContactName: s.emergencyContact,
        emergencyContactPhone: s.emergencyPhone,
        parentGuardianName: showParent ? parentName : "",
        parentGuardianEmail: showParent ? form.parentEmail : "",
        parentGuardianPhone: showParent ? form.parentPhone : "",
        parentRelationship: showParent ? form.parentRelationship : "",
        ...sessionInfo,
        ...consentInfo,
        additionalNotes: form.additionalNotes,
      });
    });

    // One payload for parent/guardian (only if any student is under 18)
    if (showParent) {
      const parentNotes = [
        `=== PARENT / GUARDIAN ===`,
        `Name: ${parentName}`,
        `Relationship: ${form.parentRelationship || "Parent/Guardian"}`,
        "",
        `=== STUDENTS IN THIS BOOKING ===`,
        students.map((s, i) => [
          `Student ${i + 1}: ${s.firstName} ${s.lastName} | Age: ${s.age} | Level: ${s.swimLevel}`,
          s.medical ? `  Medical: ${s.medical}` : "",
          s.allergies ? `  Allergies: ${s.allergies}` : "",
        ].filter(Boolean).join("\n")).join("\n"),
        "",
        `=== SESSION ===`,
        `Package: ${form.package}`,
        `Preferred Date: ${form.preferredDate}`,
        `Preferred Time: ${form.preferredTime}`,
        form.location ? `Preferred Location: ${form.location}` : "",
        "",
        `=== CONSENTS ===`,
        consentText,
        form.additionalNotes ? `\n=== ADDITIONAL NOTES ===\n${form.additionalNotes}` : "",
      ].filter(Boolean).join("\n").trim();

      webhookPayloads.push({
        // - GHL Create Contact fields -
        contactType: "parent_guardian",
        firstName: form.parentFirst,
        lastName: form.parentLast,
        email: form.parentEmail,
        phone: form.parentPhone,
        source: "Website Booking Form",
        timezone: "America/New_York",
        tags: ["Shore Academy", "Parent/Guardian", "Booking Requested", form.package].filter(Boolean),
        notes: parentNotes,
        // - Flat fields for easy Make.com mapping -
        relationship: form.parentRelationship,
        studentsInBooking: studentListSummary,
        ...sessionInfo,
        ...consentInfo,
        additionalNotes: form.additionalNotes,
      });
    }

    try {
      // 1. Web3Forms - one summary email to info@theshoreacademy.com
      const emailBody = webhookPayloads.map((p: any) =>
        p.contactType === "student"
          ? `STUDENT ${p.studentIndex}: ${p.firstName} ${p.lastName} | Age ${p.age} | ${p.swimLevel}${p.medical !== "None" ? ` | Medical: ${p.medical}` : ""}${p.allergies !== "None" ? ` | Allergies: ${p.allergies}` : ""}`
          : `PARENT/GUARDIAN: ${p.firstName} ${p.lastName} | ${p.email} | ${p.phone} | ${p.relationship}`
      ).join("\n");

      const primaryContact = showParent
        ? `${form.parentFirst} ${form.parentLast}`
        : `${students[0].firstName} ${students[0].lastName}`;

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "dad22fec-f7dc-4d42-978f-bcc6fcaad397",
          subject: `New Shore Academy Enrollment - ${primaryContact} (${numStudents} student${numStudents > 1 ? "s" : ""})`,
          from_name: "Shore Academy Website",
          name: primaryContact,
          email: showParent ? form.parentEmail : students[0].email,
          phone: showParent ? form.parentPhone : students[0].phone,
          package: form.package,
          preferred_date: form.preferredDate,
          preferred_time: form.preferredTime,
          preferred_location: form.location,
          num_students: numStudents,
          message: emailBody,
        }),
      });

      // 2. Make.com - one webhook per contact (fires sequentially, each creates one GHL contact)
      for (const payload of webhookPayloads) {
        await fetch("https://hook.us2.make.com/jpmo5faxu2nugc0n83nharapyyoestox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email info@theshoreacademy.com");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", background: "var(--white)", borderRadius: "var(--radius)", padding: 40, textAlign: "center", boxShadow: "var(--shadow)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>Enrollment Received!</h3>
        <p style={{ fontSize: 16, color: "var(--text-light)", lineHeight: 1.7 }}>Thank you! A member of The Shore Academy team will call you shortly to discuss your session and confirm readiness. Check your email for next steps.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = { padding: "12px 16px", border: "1px solid #ddd", borderRadius: "var(--radius-sm)", fontSize: 16, fontFamily: "inherit", width: "100%", background: "var(--white)", transition: "border-color 0.2s" };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 6, display: "block" };

  return (
    <>
      {/* Steps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }} className="booking-steps">
        {[
          { num: 1, title: "Fill In This Form", desc: "Session preference, your details, student info, and liability waiver. All in one place." },
          { num: 2, title: "We Call to Consult", desc: "A member of our team calls to discuss each student's swim level, confirm the location, and make sure they are a good fit." },
          { num: 3, title: "Pay Your Deposit", desc: "A $50 deposit reserves your spot immediately. Remaining balance is due before your first session." },
          { num: 4, title: "Show Up & Learn", desc: "Arrive 15 minutes early with swimwear, reef-safe sunscreen, and water. We handle everything else." },
        ].map((step) => (
          <div key={step.num} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 20, background: "var(--white)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--ocean)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{step.num}</div>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{step.title}</h4>
              <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: "0 auto", background: "var(--white)", borderRadius: "var(--radius)", padding: 40, boxShadow: "var(--shadow)" }} noValidate>

        {/* Session Preferences */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid var(--ocean)" }}>Session Preferences</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
            <div>
              <label style={labelStyle} htmlFor="preferred-date">Preferred Weekend Date <span style={{ color: "var(--coral)" }}>*</span></label>
              <select id="preferred-date" required value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} style={inputStyle}>
                <option value="">Select a weekend...</option>
                {weekends.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="preferred-time">Preferred Session Time</label>
              <select id="preferred-time" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} style={inputStyle}>
                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
            <div>
              <label style={labelStyle} htmlFor="package">Package <span style={{ color: "var(--coral)" }}>*</span></label>
              <select id="package" required value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} style={inputStyle}>
                <option value="">Select package...</option>
                {PACKAGES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="num-students">Number of Students</label>
              <select id="num-students" value={numStudents} onChange={(e) => setNumStudents(parseInt(e.target.value))} style={inputStyle}>
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Student{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="location">Preferred Location</label>
            <select id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle}>
              <option value="">No preference / discuss on call</option>
              <option>West Palm Beach</option>
              <option>Boca Raton</option>
              <option>Delray Beach</option>
              <option>Fort Lauderdale</option>
              <option>Miami</option>
            </select>
          </div>
        </div>

        {/* Student Information */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 4, paddingBottom: 8, borderBottom: "2px solid var(--ocean)" }}>Student Information</div>
          <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>Please complete all fields for each student. This helps us tailor instruction and ensure safety.</p>

          {students.map((student, idx) => (
            <div key={idx} style={{ ...(idx > 0 ? { marginTop: 28, paddingTop: 28, borderTop: "1px dashed #dde2e9" } : {}) }}>
              {numStudents > 1 && (
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ocean)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ocean)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{idx + 1}</div>
                  Student {idx + 1}
                </div>
              )}

              {/* Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                <div>
                  <label style={labelStyle}>First Name <span style={{ color: "var(--coral)" }}>*</span></label>
                  <input type="text" required placeholder="First name" value={student.firstName} onChange={(e) => updateStudent(idx, "firstName", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name <span style={{ color: "var(--coral)" }}>*</span></label>
                  <input type="text" required placeholder="Last name" value={student.lastName} onChange={(e) => updateStudent(idx, "lastName", e.target.value)} style={inputStyle} />
                </div>
              </div>

              {/* Age + Level */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                <div>
                  <label style={labelStyle}>Age <span style={{ color: "var(--coral)" }}>*</span></label>
                  <input type="number" required placeholder="Age" min="5" max="99" value={student.age} onChange={(e) => updateStudent(idx, "age", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Swimming Level <span style={{ color: "var(--coral)" }}>*</span></label>
                  <select required value={student.swimLevel} onChange={(e) => updateStudent(idx, "swimLevel", e.target.value)} style={inputStyle}>
                    <option value="">Select level...</option>
                    <option>Advanced - Competitive / team swimmer</option>
                    <option>Intermediate-Advanced - Strong pool swimmer</option>
                    <option>Intermediate - Can swim laps unassisted</option>
                    <option>Other (describe in notes)</option>
                  </select>
                </div>
              </div>

              {/* Adult contact fields */}
              {parseInt(student.age) >= 18 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                  <div>
                    <label style={labelStyle}>Your Email <span style={{ color: "var(--coral)" }}>*</span></label>
                    <input type="email" required placeholder="your@email.com" value={student.email} onChange={(e) => updateStudent(idx, "email", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Your Phone <span style={{ color: "var(--coral)" }}>*</span></label>
                    <input type="tel" required placeholder="(555) 000-0000" value={student.phone} onChange={(e) => updateStudent(idx, "phone", e.target.value)} style={inputStyle} />
                  </div>
                </div>
              )}

              {/* Medical history */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Medical Conditions <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-light)" }}>(heart conditions, seizures, asthma, etc.)</span></label>
                <input type="text" placeholder="List any medical conditions, or write 'None'" value={student.medical} onChange={(e) => updateStudent(idx, "medical", e.target.value)} style={inputStyle} />
              </div>

              {/* Allergies */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Allergies <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-light)" }}>(food, marine life, sunscreen, bee stings, etc.)</span></label>
                <input type="text" placeholder="List any allergies, or write 'None'" value={student.allergies} onChange={(e) => updateStudent(idx, "allergies", e.target.value)} style={inputStyle} />
              </div>

              {/* Emergency contact */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                <div>
                  <label style={labelStyle}>Emergency Contact Name</label>
                  <input type="text" placeholder="Full name" value={student.emergencyContact} onChange={(e) => updateStudent(idx, "emergencyContact", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Emergency Contact Phone</label>
                  <input type="tel" placeholder="(555) 000-0000" value={student.emergencyPhone} onChange={(e) => updateStudent(idx, "emergencyPhone", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle} htmlFor="notes">Additional Notes</label>
            <textarea id="notes" rows={3} placeholder="Anything else about swimming ability, personality, comfort in water, fears, etc." value={form.additionalNotes} onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
        </div>

        {/* Parent/Guardian */}
        {showParent && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid var(--ocean)", display: "flex", alignItems: "center", gap: 10 }}>
              Parent / Guardian Information
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ocean)", background: "rgba(26,111,160,0.08)", borderRadius: 20, padding: "2px 10px" }}>Required - student(s) under 18</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle} htmlFor="parent-first">First Name <span style={{ color: "var(--coral)" }}>*</span></label>
                <input type="text" id="parent-first" required placeholder="First name" autoComplete="given-name" value={form.parentFirst} onChange={(e) => setForm({ ...form, parentFirst: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="parent-last">Last Name <span style={{ color: "var(--coral)" }}>*</span></label>
                <input type="text" id="parent-last" required placeholder="Last name" autoComplete="family-name" value={form.parentLast} onChange={(e) => setForm({ ...form, parentLast: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle} htmlFor="parent-email">Email <span style={{ color: "var(--coral)" }}>*</span></label>
                <input type="email" id="parent-email" required placeholder="you@email.com" autoComplete="email" value={form.parentEmail} onChange={(e) => setForm({ ...form, parentEmail: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="parent-phone">Phone <span style={{ color: "var(--coral)" }}>*</span></label>
                <input type="tel" id="parent-phone" required placeholder="(555) 000-0000" autoComplete="tel" value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle} htmlFor="parent-relationship">Relationship to Student(s)</label>
              <select id="parent-relationship" value={form.parentRelationship} onChange={(e) => setForm({ ...form, parentRelationship: e.target.value })} style={inputStyle}>
                <option value="">Select relationship...</option>
                <option>Parent / Legal Guardian</option>
                <option>Grandparent</option>
                <option>Other Guardian</option>
              </select>
            </div>
          </div>
        )}

        {/* Liability Waiver */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid var(--ocean)" }}>Liability Waiver & Release</div>
          <div style={{ maxHeight: 200, overflowY: "auto", padding: 20, background: "var(--white)", border: "1px solid #ddd", borderRadius: "var(--radius-sm)", marginBottom: 16, fontSize: 12, color: "var(--text-light)", lineHeight: 1.7 }}>
            <h4 style={{ color: "var(--navy)", fontSize: 13, marginBottom: 6, fontWeight: 700 }}>ASSUMPTION OF RISK AND WAIVER OF LIABILITY</h4>
            <p>I, the undersigned parent/guardian, acknowledge that ocean-based aquatic activities carry inherent risks including but not limited to: drowning, near-drowning, strong currents, marine life encounters, sun exposure, physical injury, and other hazards associated with open water environments.</p>
            <h4 style={{ color: "var(--navy)", fontSize: 13, margin: "12px 0 6px", fontWeight: 700 }}>ACKNOWLEDGMENT OF RISK</h4>
            <p>I understand that The Shore Academy conducts instruction in open ocean waters where conditions are variable and unpredictable. I acknowledge that even with qualified instruction and safety protocols, risks cannot be entirely eliminated.</p>
            <h4 style={{ color: "var(--navy)", fontSize: 13, margin: "12px 0 6px", fontWeight: 700 }}>WAIVER AND RELEASE</h4>
            <p>In consideration of being permitted to participate in The Shore Academy&apos;s programs, I hereby waive, release, and forever discharge The Shore Academy, its owners, instructors, employees, and agents from any and all liability, claims, demands, and causes of action arising out of or related to any injury, loss, or damage that may occur during participation.</p>
            <h4 style={{ color: "var(--navy)", fontSize: 13, margin: "12px 0 6px", fontWeight: 700 }}>MEDICAL AUTHORIZATION</h4>
            <p>I authorize The Shore Academy instructors to seek emergency medical treatment for my child if necessary during sessions. I confirm my child is in good physical health and capable of participating in strenuous aquatic activities.</p>
            <h4 style={{ color: "var(--navy)", fontSize: 13, margin: "12px 0 6px", fontWeight: 700 }}>SWIMMING PREREQUISITE ACKNOWLEDGMENT</h4>
            <p>I confirm that my child is a proficient pool swimmer, is comfortable in deep water, and has completed prior swimming instruction. I understand The Shore Academy is an ocean navigation program, not a learn-to-swim program.</p>
            <h4 style={{ color: "var(--navy)", fontSize: 13, margin: "12px 0 6px", fontWeight: 700 }}>PHOTOGRAPHY & VIDEO CONSENT</h4>
            <p>I grant The Shore Academy permission to photograph and video record my child during sessions for the purposes of providing session media to families and for marketing/promotional use, unless I opt out below.</p>
          </div>

          {[
            { id: "waiver-agree", field: "waiverAgreed", required: true, label: <><strong>I have read, understand, and agree to the Liability Waiver & Release above.</strong> I acknowledge the inherent risks of open water activities and confirm all participants meet the prerequisites listed. <span style={{ color: "var(--coral)" }}>*</span></> },
            { id: "prereq-confirm", field: "prereqConfirmed", required: true, label: <><strong>I confirm all participants are proficient pool swimmers</strong> who can swim unassisted, are comfortable in deep water, and have completed prior swim instruction. <span style={{ color: "var(--coral)" }}>*</span></> },
            { id: "photo-consent", field: "photoConsent", required: false, label: <><strong>I consent to photography and video</strong> of the participant(s) during sessions for family media and promotional use. (Uncheck to opt out.)</> },
            { id: "call-consent", field: "callConsent", required: true, label: <><strong>I understand a team member will call</strong> before the scheduled session to discuss each participant&apos;s swimming ability, readiness, and session logistics. <span style={{ color: "var(--coral)" }}>*</span></> },
          ].map((checkbox) => (
            <div key={checkbox.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", background: "var(--white)", borderRadius: "var(--radius-sm)", marginBottom: 12, border: "1px solid #e8ecf0" }}>
              <input
                type="checkbox"
                id={checkbox.id}
                required={checkbox.required}
                checked={form[checkbox.field as keyof typeof form] as boolean}
                onChange={(e) => setForm({ ...form, [checkbox.field]: e.target.checked })}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: "var(--ocean)", cursor: "pointer" }}
              />
              <label htmlFor={checkbox.id} style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5, cursor: "pointer" }}>{checkbox.label}</label>
            </div>
          ))}
        </div>

        {error && <p style={{ color: "var(--coral)", fontSize: 14, marginBottom: 16 }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ width: "100%", padding: "16px", fontSize: 16, fontWeight: 700, background: submitting ? "#aaa" : "var(--coral)", color: "#fff", border: "none", borderRadius: "var(--radius-sm)", cursor: submitting ? "not-allowed" : "pointer", transition: "var(--transition)", letterSpacing: "0.5px", minHeight: 52 }}>
          {submitting ? "Submitting..." : "Submit Enrollment Request →"}
        </button>
        <p style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "var(--text-light)" }}>
          After submitting, our team will call to consult and confirm readiness. A $50 deposit will then secure your spot. Full refund if we determine the session is not the right fit.
        </p>
      </form>

      <style>{`
        .booking-steps { }
        @media (max-width: 768px) {
          .booking-steps { grid-template-columns: 1fr 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .booking-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
