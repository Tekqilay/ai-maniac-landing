import { LightsPage } from "./lights-page";

// Reference version: the scrub starts at the very first frame — the
// facade is fully dark before the visitor scrolls.
export default function V1Page() {
  return <LightsPage scrubStart={0} poster="/assets/poster_lights.png" />;
}
