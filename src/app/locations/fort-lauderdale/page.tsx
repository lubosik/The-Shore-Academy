import type { Metadata } from "next";
import LocationPage, { buildLocationMetadata } from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";
import { notFound } from "next/navigation";

export function generateMetadata(): Metadata {
  const loc = getLocation("fort-lauderdale");
  if (!loc) notFound();
  return buildLocationMetadata(loc);
}

export default function Page() {
  const loc = getLocation("fort-lauderdale");
  if (!loc) notFound();
  return <LocationPage loc={loc} />;
}
