export interface MapMarker {
  lat: number;
  lng: number;
  type: "parking" | "meeting";
  label: string;
  description: string;
}

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
  mapCenter?: [number, number];
  mapZoom?: number;
  mapMarkers?: MapMarker[];
  mapWalkPath?: [number, number][];
}

export const locations: LocationData[] = [
  {
    slug: "miami",
    name: "Miami",
    title: "Ocean Safety School / Miami.",
    metaTitle: "Ocean Safety School Miami | Rip Current Training & Beach Safety | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Miami. Certified lifeguard instructors teaching rip current survival, wave navigation, and beach safety at Miami Beach, South Beach, Crandon Park, and Haulover Beach.",
    heroBadge: "Miami Beach • South Beach • Crandon Park • Haulover Beach",
    heroSubtitle: "Miami families - South Florida's only dedicated ocean safety school is here. Certified ocean lifeguard instructors. 2:1 ratio. Sessions year-round on Miami-Dade County's iconic Atlantic beaches.",
    geoLat: 25.7617,
    geoLng: -80.1918,
    mapCenter: [25.7784, -80.1303],
    mapZoom: 16,
    mapMarkers: [
      {
        lat: 25.7796,
        lng: -80.1323,
        type: "parking",
        label: "12th Street Parking Garage",
        description: "Multi-story public parking on 12th St & Collins Ave. $2–$4/hr. Closest garage to our South Beach meeting point.",
      },
      {
        lat: 25.7758,
        lng: -80.1310,
        type: "parking",
        label: "Lummus Park Surface Lot",
        description: "Open-air public lot on Ocean Drive near 10th St. Metered parking, $2.50/hr. Very close to the beach access.",
      },
      {
        lat: 25.7775,
        lng: -80.1297,
        type: "meeting",
        label: "South Beach Meeting Point — 11th St & Ocean Dr",
        description: "Meet your Shore Academy instructor at the 11th Street beach access, just past the lifeguard tower. Look for the blue Shore Academy flag.",
      },
    ],
    mapWalkPath: [
      [25.7796, -80.1323],
      [25.7796, -80.1305],
      [25.7783, -80.1297],
      [25.7775, -80.1297],
    ],
    beaches: [
      { name: "Miami Beach & South Beach", description: "Miami Beach's world-famous shoreline is one of the most heavily used ocean swimming areas in the United States - and one of the most dangerous for the unprepared. Persistent rip currents form between the jetties and along the numerous sand bars that run parallel to shore. The Shore Academy teaches students to read these conditions before entering the water." },
      { name: "Crandon Park Beach (Key Biscayne)", description: "Crandon Park Beach on Key Biscayne is widely considered one of the most beautiful beaches in the United States. The calm, barrier-island-protected north end transitions to active, open Atlantic surf on the south - providing ideal progression training from calm water fundamentals to active surf navigation." },
      { name: "Haulover Beach (North Miami)", description: "Haulover Beach, located between Bal Harbour and Aventura, is an open-Atlantic beach exposed to full South Florida swell. Haulover's beach cuts and inlets create strong, well-defined rip currents that are excellent for real-world identification and escape practice with certified instructors." },
    ],
    neighborhoods: ["Miami Beach", "South Beach", "Mid-Beach", "North Beach", "Surfside", "Bal Harbour", "Sunny Isles Beach", "Aventura", "North Miami Beach", "Biscayne Park", "Coral Gables", "Coconut Grove", "Brickell", "Wynwood", "Doral", "Hialeah", "Key Biscayne", "Pinecrest"],
    prerequisites: [
      "You must already know how to swim independently - no floaties, no assistance",
      "Comfortable swimming in deep water and treading water for extended periods",
      "Prior pool swim instruction completed",
      "Ages 6 and up (younger students by consultation only)",
      "Pre-session phone consultation required for all new students",
    ],
    testimonials: [
      { initial: "A", name: "Ana V.", location: "Brickell", quote: "We live in Brickell and take our kids to South Beach every weekend. After a scary moment in the surf last summer, I found The Shore Academy. Two sessions later, my 11-year-old understands the ocean better than most adults. I'm so grateful this program exists in Miami." },
      { initial: "C", name: "Carlos M.", location: "Coral Gables", quote: "Dominick and his team are the real deal. Certified ocean lifeguards, a 2:1 ratio, and professional media captured every session. My son finished his 6-session mastery course and is a completely different ocean swimmer. Highly recommend to every Miami family." },
      { initial: "L", name: "Laura F.", location: "Coconut Grove", quote: "The pre-session consultation was impressive - they genuinely wanted to make sure my daughter was ready. The instruction itself was expert-level. She can now identify rip currents, navigate waves, and signal for help. These are life skills. Worth every dollar." },
    ],
    faqs: [
      { q: "Where exactly do Miami sessions take place?", a: "Our primary Miami session location is South Beach (11th Street beach access, Lummus Park). We also run sessions at Crandon Park Beach (Key Biscayne) and Haulover Beach. Your exact beach is confirmed during the pre-session consultation based on conditions and your location in Miami." },
      { q: "Where do I park for Miami Beach sessions?", a: "The 12th Street Parking Garage (12th St & Collins Ave) and the Lummus Park surface lots on Ocean Drive are the closest options to our South Beach meeting point. Metered street parking is also available on Collins Ave and Ocean Drive." },
      { q: "Do you serve Key Biscayne families?", a: "Yes - we operate sessions at Crandon Park Beach on Key Biscayne and are convenient for families throughout Key Biscayne, Coconut Grove, and Brickell." },
      { q: "What about North Miami and Aventura families?", a: "Haulover Beach is our primary north Miami location, convenient for families throughout North Miami Beach, Aventura, Sunny Isles Beach, and Bal Harbour." },
      { q: "Is South Beach safe for ocean instruction?", a: "Miami Beach and South Beach have excellent ocean conditions for instruction when properly assessed by certified lifeguards. Our team monitors conditions daily and confirms your exact beach location during the pre-session consultation." },
    ],
  },
  {
    slug: "deerfield-beach",
    name: "Deerfield Beach",
    title: "Ocean Safety School / Deerfield Beach.",
    metaTitle: "Ocean Safety School Deerfield Beach | Rip Current Training & Beach Safety | The Shore Academy",
    metaDescription: "The Shore Academy's ocean safety school in Deerfield Beach. Certified lifeguard instructors teaching rip current survival, wave navigation, and open water safety at Deerfield Beach Pier, Hillsboro Beach, and Boca Raton.",
    heroBadge: "Deerfield Beach Pier • Hillsboro Beach • Pompano Beach • Boca Raton",
    heroSubtitle: "Deerfield Beach families - South Florida's only dedicated ocean safety school is here. Certified ocean lifeguard instructors. 2:1 ratio. Year-round Atlantic sessions on Broward County's best reef-adjacent beaches.",
    geoLat: 26.3185,
    geoLng: -80.0862,
    mapCenter: [26.3185, -80.0855],
    mapZoom: 17,
    mapMarkers: [
      {
        lat: 26.3194,
        lng: -80.0878,
        type: "parking",
        label: "Deerfield Beach Main Lot — Sullivan Rd",
        description: "Primary public beach parking lot on Sullivan Road. Paid parking, $2/hr. 2-minute walk to the pier and our meeting point.",
      },
      {
        lat: 26.3188,
        lng: -80.0866,
        type: "parking",
        label: "Pier Overflow Parking — NE 21st Ave",
        description: "Secondary paid lot just north of the pier on NE 21st Ave. Use when the main Sullivan Rd lot is full on weekends.",
      },
      {
        lat: 26.3178,
        lng: -80.0843,
        type: "meeting",
        label: "Shore Academy Meeting Point — Deerfield Beach Pier",
        description: "Meet your Shore Academy instructor at the south side of the Deerfield Beach International Fishing Pier. Look for the blue Shore Academy flag.",
      },
    ],
    mapWalkPath: [
      [26.3194, -80.0878],
      [26.3190, -80.0858],
      [26.3183, -80.0848],
      [26.3178, -80.0843],
    ],
    beaches: [
      { name: "Deerfield Beach International Fishing Pier", description: "Deerfield Beach Pier is one of Broward County's most iconic oceanfront landmarks. The pier creates well-defined rip current channels on both its north and south sides - ideal for real-world rip current identification, assessment, and escape training with certified instructors by your side. The open Atlantic exposure here produces consistent surf year-round." },
      { name: "Hillsboro Beach & Hillsboro Inlet", description: "Hillsboro Beach and the Hillsboro Inlet, located just north of Deerfield Beach, offer some of the most powerful and educational tidal rip current scenarios in all of South Florida. Inlet-driven currents form, shift, and reverse with the tides - providing advanced ocean students with rip current knowledge that transfers to every inlet beach in Florida and beyond." },
      { name: "Boca Raton & Pompano Beach Corridor", description: "The Deerfield Beach area sits at the crossroads of Palm Beach and Broward County's finest reef-adjacent beaches. Red Reef Park in Boca Raton and the Pompano Ledge reef in Pompano Beach are both within a short drive, giving Shore Academy students access to diverse ocean environments - from open Atlantic beach surf to complex reef-adjacent currents." },
    ],
    neighborhoods: ["Deerfield Beach", "Pompano Beach", "Lighthouse Point", "Hillsboro Beach", "Coconut Creek", "Margate", "Coral Springs", "North Lauderdale", "Tamarac", "Parkland", "Boca Raton", "Highland Beach", "Hillsboro Pines", "Quiet Waters", "West Deerfield Beach"],
    prerequisites: [
      "You must already know how to swim independently - no floaties, no assistance",
      "Comfortable swimming in deep water and treading water for extended periods",
      "Prior pool swim instruction completed",
      "Ages 6 and up (younger students by consultation only)",
      "Pre-session phone consultation required for all new students",
    ],
    testimonials: [
      { initial: "M", name: "Michelle R.", location: "Deerfield Beach", quote: "We live five minutes from the Deerfield Beach pier and never realized how dangerous rip currents can be right off our own beach. After two Shore Academy sessions, my kids know more about ocean safety than most adults. Genuinely life-changing instruction." },
      { initial: "J", name: "Jason & Paula K.", location: "Coconut Creek", quote: "The Hillsboro Beach sessions are incredible. My son learned to read the inlet rip currents - skills most adults never learn. Certified instructors, a real 2:1 ratio, and the professional photos Chris took are stunning. Cannot recommend this program enough." },
      { initial: "S", name: "Sandra L.", location: "Pompano Beach", quote: "We've spent every summer at Pompano Beach and Deerfield. I assumed my kids were ocean-safe because they swim well. The Shore Academy showed me the difference between pool swimming and real ocean awareness. This program is a must for every South Florida family." },
    ],
    faqs: [
      { q: "Where exactly do Deerfield Beach sessions take place?", a: "Our primary Deerfield Beach session location is the south side of the Deerfield Beach International Fishing Pier. We also run sessions along the Hillsboro Beach corridor and can arrange sessions in the Pompano Beach and Boca Raton area. Your exact location is confirmed during the pre-session consultation." },
      { q: "Where do I park for Deerfield Beach sessions?", a: "The main Sullivan Road public parking lot is the closest and easiest. On busy weekend mornings, the NE 21st Ave overflow lot just north of the pier is a reliable backup. Both are paid lots at $2/hr. The walk to our meeting point at the pier is under 3 minutes from either lot." },
      { q: "Do you serve Pompano Beach and Lighthouse Point families?", a: "Yes - Pompano Beach and Lighthouse Point are some of our most active Deerfield Beach area families. The Deerfield Beach Pier location is convenient for the entire northern Broward County coastline." },
      { q: "What makes Deerfield Beach special for ocean safety training?", a: "The Deerfield Beach Pier creates textbook, well-defined rip current channels that are ideal for teaching students to identify rip currents before entering the water. The Hillsboro Inlet just to the north provides advanced inlet-rip scenarios. The combination makes this one of the best natural classrooms for ocean safety in South Florida." },
      { q: "Do you serve Boca Raton families from the Deerfield Beach location?", a: "Many of our Deerfield Beach session students come from northern Boca Raton and Highland Beach. The Deerfield Beach Pier is a quick drive north on US-1 or A1A and is often more convenient than our other South Florida session locations." },
      { q: "What age can kids start at Deerfield Beach?", a: "Group ocean safety sessions are open to ages 6 and up. Private 1:1 sessions can accommodate ages 5 and up after a pre-session consultation. All students must already be independent pool swimmers before attending any Shore Academy session." },
    ],
    uniqueAngle: "Pier-adjacent rip currents and Hillsboro Inlet tidal flows create one of South Florida's best natural ocean safety classrooms.",
  },
];

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}
