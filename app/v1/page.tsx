import { LightsPage } from "./lights-page";

// Main version — same configuration as /v1c: scrub starts at 0.40 s,
// with the appointment counter and the line that explains the lights.
export default function V1Page() {
  return (
    <LightsPage
      scrubStart={0.4}
      poster="/assets/poster_lights_040.png"
      showCounter
      showAnchorLine
    />
  );
}
