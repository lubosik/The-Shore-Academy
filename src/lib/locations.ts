export interface LocationData {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroSubtitle: string;
  geoLat: number;
  geoLng: number;
  beaches: { name: string; description: string }[];
  neighborhoods: string[];
  testimonials: { initial: string; name: string; location: string; quote: string }[];
  faqs?: { q: string; a: string }[];
  prerequisites?: string[];
  uniqueAngle?: string;
}

export const locations: LocationData[] = [
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    title: "Ocean Safety School / West Palm Beach.",
    metaTitle: "Ocean Safety School West Palm Beach | Rip Current Training | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in West Palm Beach. Certified lifeguard instructors teaching rip current survival, wave navigation, and beach safety at Phipps Ocean Park, Singer Island, and Lake Worth Beach.",
    heroBadge: "Phipps Ocean Park • Singer Island • Lake Worth Beach • Palm Beach",
    heroSubtitle: "West Palm Beach families — your ocean safety school is here. Certified ocean lifeguard instructors. Strict 2:1 ratio. Sessions year-round on Palm Beach County's Atlantic coastline.",
    geoLat: 26.7153,
    geoLng: -80.0534,
    beaches: [
      { name: "Phipps Ocean Park & Palm Beach", description: "Phipps Ocean Park is a barrier island gem — natural dune system, consistent surf, and the kind of open Atlantic exposure that makes it ideal for rip current education. Palm Beach's world-famous shoreline offers pristine conditions and moderate surf perfect for building wave navigation skills." },
      { name: "Singer Island & Riviera Beach", description: "Singer Island sits at the mouth of Lake Worth Inlet, creating powerful tidal rip currents that form, shift, and dissipate throughout the day. Understanding inlet-driven rip currents here is advanced ocean education — skills that translate to every beach in South Florida." },
      { name: "Lake Worth Beach & Boynton Beach", description: "Lake Worth Beach and Boynton Beach Access offer more accessible surf with consistent wave patterns — ideal for newer ocean swimmers building confidence. The Lake Worth Inlet nearby creates excellent real-world rip current training scenarios." },
    ],
    neighborhoods: ["West Palm Beach", "Palm Beach", "Riviera Beach", "Singer Island", "Lake Worth", "Boynton Beach", "Delray Beach", "Wellington", "Royal Palm Beach", "Palm Beach Gardens", "Jupiter", "Loxahatchee", "Greenacres", "Lantana", "Manalapan"],
    testimonials: [
      { initial: "T", name: "Tom B.", location: "West Palm Beach", quote: "We've lived in West Palm Beach our whole lives and spent every summer at the beach. I was shocked how much our kids didn't know. After two Shore Academy sessions, they understand the ocean in a completely different way. Worth every penny." },
      { initial: "S", name: "Sarah M.", location: "West Palm Beach", quote: "Dominick and his team are exceptional. Professional, patient, and genuinely passionate about ocean safety. My 12-year-old came out of his first session talking about rip currents, sandbars, and wave reading like a junior lifeguard. I'm blown away." },
      { initial: "K", name: "Karen H.", location: "Palm Beach Gardens", quote: "We drive from Palm Beach Gardens every session and it is completely worth it. The 2:1 instructor ratio means our kids get real, individualized instruction in the Atlantic. No gimmicks — just real ocean safety taught by certified lifeguards." },
    ],
  },
  {
    slug: "boca-raton",
    name: "Boca Raton",
    title: "Ocean Safety School / Boca Raton.",
    metaTitle: "Ocean Safety School Boca Raton | Rip Current Training | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Boca Raton. Certified lifeguard instructors teaching rip current survival and wave navigation at Red Reef Park, South Beach Park, and Spanish River Park.",
    heroBadge: "Red Reef Park • South Beach Park • Spanish River Park • Highland Beach",
    heroSubtitle: "Boca Raton families — South Florida's only dedicated ocean safety school is serving your beaches. Certified ocean lifeguard instructors. 2:1 ratio. Year-round Atlantic sessions.",
    geoLat: 26.3683,
    geoLng: -80.1289,
    beaches: [
      { name: "Red Reef Park & South Beach Park", description: "Red Reef Park sits adjacent to an artificial reef system, creating uniquely complex current patterns as water moves over and around the reef structure. Understanding reef-adjacent rip currents is specialized knowledge — and exactly the type of real-world ocean education The Shore Academy provides." },
      { name: "Spanish River Park & Highland Beach", description: "Spanish River Park is one of Palm Beach County's most beloved beaches — wide, natural, and consistently active with South Atlantic swell. Sessions here emphasize wave navigation, bodysurfer positioning, and reading the full beach before entering." },
      { name: "Deerfield Beach & Boynton Beach Access", description: "Deerfield Beach offers Broward County's northernmost reef-adjacent surf — excellent for rip current education in mild to moderate conditions. Boynton Beach Access provides consistent Atlantic exposure perfect for building foundational ocean skills." },
    ],
    neighborhoods: ["Boca Raton", "Highland Beach", "Delray Beach", "Boynton Beach", "Deerfield Beach", "Parkland", "Coconut Creek", "Coral Springs", "Pompano Beach", "West Boca Raton", "Boca Del Mar", "Mission Bay", "Sandalfoot Cove", "Hillsboro Beach", "Lighthouse Point"],
    testimonials: [
      { initial: "D", name: "David R.", location: "Boca Raton", quote: "My son was already a strong pool swimmer but froze the first time waves hit him. After The Shore Academy's 3-session course, he's confident in the surf and understands exactly what to do if caught in a rip current. This program is genuinely life-changing." },
      { initial: "L", name: "Lisa T.", location: "Boca Del Mar", quote: "We signed up our 9-year-old after a scary moment at Red Reef Park last summer. The Shore Academy turned that fear into knowledge. She now walks into the ocean with confidence and the awareness to stay safe. Absolutely cannot recommend this enough." },
      { initial: "M", name: "Mark & Jennifer H.", location: "Parkland", quote: "Professional, certified, exceptional. The 2:1 instructor ratio is real — our two kids had instructors with them every single second in the water. And the photos Chris captures are incredible. An experience our whole family will never forget." },
    ],
    uniqueAngle: "Reef-adjacent beaches create uniquely complex rip current patterns — advanced real-world ocean education.",
  },
  {
    slug: "delray-beach",
    name: "Delray Beach",
    title: "Ocean Safety School / Delray Beach.",
    metaTitle: "Ocean Safety School Delray Beach | Rip Current Training | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Delray Beach. Certified lifeguard instructors teaching rip current survival and wave navigation at Delray Municipal Beach and Atlantic Dunes Park.",
    heroBadge: "Delray Municipal Beach • Atlantic Dunes Park • Gulf Stream • Highland Beach",
    heroSubtitle: "Delray Beach families — your ocean safety school is here. Certified ocean lifeguard instructors teaching rip current survival and wave navigation on one of Florida's most iconic beaches.",
    geoLat: 26.4615,
    geoLng: -80.0728,
    beaches: [
      { name: "Delray Beach Municipal Beach", description: "Award-winning Delray Municipal Beach is fully exposed to the Atlantic — no barrier island, no inlet protection. The open exposure creates consistent, textbook rip current activity, making this one of the best natural classrooms in South Florida for ocean safety education." },
      { name: "Atlantic Dunes Park & South Delray", description: "Atlantic Dunes Park, just south of Delray's main beach access, offers a more natural, less-crowded shoreline with excellent surf characteristics. Active sandbar systems here create real-world rip current scenarios that build advanced ocean reading skills." },
      { name: "Gulf Stream & Highland Beach Corridor", description: "The Gulf Stream to Highland Beach corridor offers quieter, reef-protected sections of Palm Beach County coastline — ideal for beginning ocean swimmers and younger students building their initial ocean confidence before progressing to more active surf." },
    ],
    neighborhoods: ["Delray Beach", "Boynton Beach", "Lake Worth", "Boca Raton", "Highland Beach", "Gulf Stream", "Greenacres", "Wellington", "Royal Palm Beach", "Lake Worth Beach", "Hypoluxo", "Lantana", "Manalapan", "South Palm Beach", "Ocean Ridge"],
    testimonials: [
      { initial: "J", name: "James W.", location: "Delray Beach", quote: "My daughter grew up swimming at Delray Beach. I always assumed she understood the ocean. The Shore Academy showed both of us how much we didn't know. After her 3-session course, she's ocean-literate in a way most adults never become." },
      { initial: "A", name: "Amanda C.", location: "Boynton Beach", quote: "Exceptional. The team is professional, warm, and genuinely expert. My nervous 10-year-old went from terrified of waves to confidently reading the surf. The transformation across three sessions was incredible to watch." },
      { initial: "R", name: "Robert & Claire N.", location: "Lake Worth", quote: "We were skeptical — our kids already swim well. But ocean swimming is completely different from pool swimming, and The Shore Academy made that crystal clear. By session two they were navigating waves and identifying rip currents like pros." },
    ],
    uniqueAngle: "Fully exposed Atlantic coast with no barrier island — consistent, textbook rip current activity.",
  },
  {
    slug: "miami",
    name: "Miami",
    title: "Ocean Safety School / Miami.",
    metaTitle: "Ocean Safety School Miami | Rip Current Training & Beach Safety | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Miami. Certified lifeguard instructors teaching rip current survival, wave navigation, and beach safety at Miami Beach, South Beach, Crandon Park, and Haulover Beach.",
    heroBadge: "Miami Beach • South Beach • Crandon Park • Haulover Beach",
    heroSubtitle: "Miami families — South Florida's only dedicated ocean safety school is here. Certified ocean lifeguard instructors. 2:1 ratio. Sessions year-round on Miami-Dade County's iconic Atlantic beaches.",
    geoLat: 25.7617,
    geoLng: -80.1918,
    beaches: [
      { name: "Miami Beach & South Beach", description: "Miami Beach's world-famous shoreline is one of the most heavily used ocean swimming areas in the United States — and one of the most dangerous for the unprepared. Persistent rip currents form between the jetties and along the numerous sand bars that run parallel to shore. The Shore Academy teaches students to read these conditions before entering the water." },
      { name: "Crandon Park Beach (Key Biscayne)", description: "Crandon Park Beach on Key Biscayne is widely considered one of the most beautiful beaches in the United States. The calm, barrier-island-protected north end transitions to active, open Atlantic surf on the south — providing ideal progression training from calm water fundamentals to active surf navigation." },
      { name: "Haulover Beach (North Miami)", description: "Haulover Beach, located between Bal Harbour and Aventura, is an open-Atlantic beach exposed to full South Florida swell. Haulover's beach cuts and inlets create strong, well-defined rip currents that are excellent for real-world identification and escape practice with certified instructors." },
    ],
    neighborhoods: ["Miami Beach", "South Beach", "Mid-Beach", "North Beach", "Surfside", "Bal Harbour", "Sunny Isles Beach", "Aventura", "North Miami Beach", "Biscayne Park", "Coral Gables", "Coconut Grove", "Brickell", "Wynwood", "Doral", "Hialeah", "Key Biscayne", "Pinecrest"],
    prerequisites: [
      "You must already know how to swim independently — no floaties, no assistance",
      "Comfortable swimming in deep water and treading water for extended periods",
      "Prior pool swim instruction completed",
      "Ages 6 and up (younger students by consultation only)",
      "Pre-session phone consultation required for all new students",
    ],
    testimonials: [
      { initial: "A", name: "Ana V.", location: "Brickell", quote: "We live in Brickell and take our kids to South Beach every weekend. After a scary moment in the surf last summer, I found The Shore Academy. Two sessions later, my 11-year-old understands the ocean better than most adults. I'm so grateful this program exists in Miami." },
      { initial: "C", name: "Carlos M.", location: "Coral Gables", quote: "Dominick and his team are the real deal. Certified ocean lifeguards, a 2:1 ratio, and professional media captured every session. My son finished his 6-session mastery course and is a completely different ocean swimmer. Highly recommend to every Miami family." },
      { initial: "L", name: "Laura F.", location: "Coconut Grove", quote: "The pre-session consultation was impressive — they genuinely wanted to make sure my daughter was ready. The instruction itself was expert-level. She can now identify rip currents, navigate waves, and signal for help. These are life skills. Worth every dollar." },
    ],
    faqs: [
      { q: "Do you serve Key Biscayne families?", a: "Yes — we operate sessions at Crandon Park Beach on Key Biscayne and are convenient for families throughout Key Biscayne, Coconut Grove, and Brickell." },
      { q: "What about North Miami and Aventura families?", a: "Haulover Beach is our primary north Miami location, convenient for families throughout North Miami Beach, Aventura, Sunny Isles Beach, and Bal Harbour." },
      { q: "Is South Beach safe for ocean instruction?", a: "Miami Beach and South Beach have excellent ocean conditions for instruction when properly assessed by certified lifeguards. Our team monitors conditions daily and confirms your exact beach location during the pre-session consultation." },
    ],
  },
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    title: "Ocean Safety School / Fort Lauderdale.",
    metaTitle: "Ocean Safety School Fort Lauderdale | Rip Current Training | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Fort Lauderdale. Certified lifeguard instructors teaching rip current survival and wave navigation at Fort Lauderdale Beach, Pompano Beach, and Deerfield Beach.",
    heroBadge: "Fort Lauderdale Beach • Pompano Beach • Deerfield Beach • Hollywood Beach",
    heroSubtitle: "Fort Lauderdale families — South Florida's only dedicated ocean safety school serves Broward County. Certified ocean lifeguard instructors. 2:1 ratio. Year-round Atlantic sessions.",
    geoLat: 26.1224,
    geoLng: -80.1373,
    beaches: [
      { name: "Fort Lauderdale Beach", description: "Fort Lauderdale Beach is Broward County's iconic oceanfront — wide, consistently active, and home to some of the most predictable rip current patterns in South Florida. The beach cuts between public access points create well-defined rip current channels that are ideal for real-world identification and escape practice." },
      { name: "Pompano Beach & Lauderdale-by-the-Sea (Reef)", description: "Pompano Beach and Lauderdale-by-the-Sea sit adjacent to Pompano Ledge — one of South Florida's most accessible natural reef systems. Reef-adjacent rip currents here behave differently from open-sand rips, providing students with advanced, specialized ocean education that applies to reef beaches throughout Florida and the Caribbean." },
      { name: "Deerfield Beach & Hollywood Beach", description: "Deerfield Beach at the north end of Broward County and Hollywood Beach at the south offer full Atlantic exposure with minimal inlet influence. Both beaches produce consistent, mid-size surf ideal for wave navigation training and foundational ocean skill building." },
    ],
    neighborhoods: ["Fort Lauderdale", "Pompano Beach", "Deerfield Beach", "Hollywood", "Hallandale Beach", "Lauderdale-by-the-Sea", "Lighthouse Point", "Coconut Creek", "Coral Springs", "Weston", "Plantation", "Davie", "Pembroke Pines", "Miramar", "Tamarac", "Oakland Park", "Wilton Manors"],
    prerequisites: [
      "You must already know how to swim independently — no floaties, no assistance",
      "Comfortable swimming in deep water and treading water for extended periods",
      "Prior pool swim instruction completed",
      "Ages 6 and up for group sessions",
      "Pre-session phone consultation required",
    ],
    testimonials: [
      { initial: "R", name: "Rachel T.", location: "Coral Springs", quote: "We drive from Coral Springs for every session and it's completely worth it. The Shore Academy is the real deal — certified instructors, a true 2:1 ratio, and professional ocean safety instruction that you simply cannot find anywhere else in South Florida." },
      { initial: "D", name: "David K.", location: "Weston", quote: "My teenage son thought he knew the ocean. The Shore Academy humbled him — in the best possible way. He now understands rip currents, wave dynamics, and rescue basics better than most adults. An exceptional program run by exceptional instructors." },
      { initial: "M", name: "Michelle B.", location: "Pembroke Pines", quote: "The professional photography Chris captures is stunning, but the real value is the instruction. Our kids are genuinely safer in the ocean now. They understand what they're looking at when they assess conditions. Life skills that will serve them forever." },
    ],
    faqs: [
      { q: "Do you serve Hollywood and Hallandale families?", a: "Yes — Hollywood Beach is one of our Broward County session locations. We regularly serve families from Hollywood, Hallandale Beach, Miramar, and Pembroke Pines." },
      { q: "What about Weston and Coral Springs families?", a: "Absolutely. Many of our Fort Lauderdale area students commute from western Broward County communities like Weston, Coral Springs, Plantation, and Davie. The drive to Fort Lauderdale Beach or Pompano Beach is worth it." },
      { q: "Do you offer sessions at Lauderdale-by-the-Sea?", a: "Yes — Lauderdale-by-the-Sea and its adjacent reef system is one of our primary Fort Lauderdale area locations, especially for students working on intermediate to advanced ocean skills." },
      { q: "Is the 2:1 student-to-instructor ratio maintained at Fort Lauderdale sessions?", a: "Yes, always. Our strict 2:1 student-to-instructor ratio is non-negotiable across every location, including all Fort Lauderdale and Broward County sessions." },
      { q: "What about private 1:1 sessions in Fort Lauderdale?", a: "Private 1:1 and private family group sessions are available at Fort Lauderdale area beaches. Contact us or book online — select the private session option and we'll discuss your preferred location during the pre-session consultation." },
      { q: "How do I escape a rip current at Fort Lauderdale Beach?", a: "The same principles apply everywhere: never fight the current by swimming directly against it. Swim parallel to shore until free, then angle back to the beach. Fort Lauderdale Beach's beach cuts create well-defined rip channels — we teach students to identify these before entering the water." },
      { q: "What age can kids start The Shore Academy?", a: "Group ocean safety sessions are open to ages 6 and up. Private 1:1 sessions can accommodate ages 5 and up after a pre-session consultation to assess readiness. All students — any age — must already be independent pool swimmers." },
    ],
  },
];

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}
