import { Studio } from "sanity";
import config from "../../sanity.config";

export default function SanityStudioPage() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden" }}>
      <Studio config={config} />
    </div>
  );
}
