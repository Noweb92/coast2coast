/**
 * Icon — server-rendered registry lookup.
 *
 * Data files (lib/site.config.js) reference icons by name (string) so the
 * frozen content stays serialisable. This resolves those names to
 * lucide-react components at render time, on the server — no client JS.
 */

import {
  Wrench, Droplets, Home, Sparkles, Shield, Calculator, Award,
  BadgeCheck, FileCheck, Users, Star, Clock,
} from "lucide-react";

const ICONS = { Wrench, Droplets, Home, Sparkles, Shield, Calculator, Award, BadgeCheck, FileCheck, Users, Star, Clock };

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Home;
  return <Cmp {...props} />;
}

export { Icon };
