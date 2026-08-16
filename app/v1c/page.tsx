import { LightsPage } from "../v1/lights-page";

// /v1b plus the appointment counter and the line that explains the lights.
export default function V1cPage() {
  return (
    <LightsPage
      scrubStart={0.4}
      poster="/assets/poster_lights_040.png"
      showCounter
      showAnchorLine
    />
  );
}
