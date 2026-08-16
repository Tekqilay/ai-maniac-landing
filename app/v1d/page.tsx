import { LightsPage } from "../v1/lights-page";

// /v1b plus the appointment counter, without the explaining line.
export default function V1dPage() {
  return (
    <LightsPage
      scrubStart={0.4}
      poster="/assets/poster_lights_040.png"
      showCounter
    />
  );
}
