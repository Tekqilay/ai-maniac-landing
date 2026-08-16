import { LightsPage } from "../v1/lights-page";

// Comparison version: the scrub starts at 0.40 s, so a few windows are
// already lit on arrival. Poster is the matching frame at 0.40 s.
export default function V1bPage() {
  return <LightsPage scrubStart={0.4} poster="/assets/poster_lights_040.png" />;
}
