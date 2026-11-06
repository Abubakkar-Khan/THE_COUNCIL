// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Bit Cat Aesthetics & Modular Dress-Up Engine
// ─────────────────────────────────────────────────────────────────────────────

export type EarType =
  | "stepped"
  | "sharp"
  | "antenna"
  | "folded"
  | "tufted"
  | "fin"
  | "serene";

export type EyeType =
  | "pixel"
  | "glasses"
  | "monocle"
  | "visor"
  | "shades"
  | "stars"
  | "smirk"
  | "spiral"
  | "warrior"
  | "zen"
  | "sleepy"
  | "laser"
  | "hype"
  | "goggles";

export type AccessoryType =
  | "none"
  | "crown"
  | "bandana"
  | "headset"
  | "beret"
  | "halo"
  | "spark"
  | "nightcap"
  | "tophat"
  | "shades"
  | "cyberplate"
  | "tag";

export type AccentColor =
  | "#FF6E26" // Warm Orange (Founder / Default)
  | "#00E5FF" // Cyber Cyan (Scientist / Future)
  | "#22C55E" // Matrix Lime (Hacker / Cypherpunk)
  | "#EF4444" // Crimson Fury (Warrior / EGO)
  | "#A855F7" // Ultraviolet (Anomaly / Visionary)
  | "#F59E0B" // Amber Gold (Comedian / Entertainer)
  | "#10B981" // Celestial Jade (Spiritual / Believer)
  | "#F43F5E" // Rose Velvet (Poet / Philosopher)
  | "#EAB308" // High-Voltage Gold (Jock / CFO)
  | "#38BDF8" // Ice Blue (Logical / Rational)
  | "#EC4899" // Neon Pink (Creative / Artistic)
  | "#64748B"; // Steel Gray (Lazy / Stoic)

export interface BitCatDress {
  ears: EarType;
  eyes: EyeType;
  accessory: AccessoryType;
  accentColor: AccentColor;
  mouth?: "straight" | "smirk" | "fang" | "open" | "sleepy" | "cat-w";
}

export const AVAILABLE_EARS: { id: EarType; label: string; desc: string }[] = [
  { id: "stepped", label: "8-Bit Stepped", desc: "Classic chunky arcade pixel ears" },
  { id: "sharp", label: "Sharp Alert", desc: "Aggressive, high-angle alert ears" },
  { id: "antenna", label: "Cyber Sensor", desc: "Antenna with blinking digital diode" },
  { id: "fin", label: "Robotic Fin", desc: "Aerodynamic sensory cyber-fin" },
  { id: "folded", label: "Folded Droop", desc: "Relaxed, stoic droop ear" },
  { id: "tufted", label: "Lynx Tuft", desc: "Fluffy tipped lynx ears" },
  { id: "serene", label: "Soft Zen", desc: "Curved peaceful spiritual ears" },
];

export const AVAILABLE_EYES: { id: EyeType; label: string; desc: string }[] = [
  { id: "pixel", label: "Pixel Dots", desc: "Clean 2x2 square pixel gaze" },
  { id: "shades", label: "Pixel Shades", desc: "8-bit cool dark sunglasses" },
  { id: "glasses", label: "CRT Hacker", desc: "Green matrix terminal nerd frames" },
  { id: "monocle", label: "HUD Target", desc: "Cyan crosshair targeting monocle" },
  { id: "visor", label: "Cyber Visor", desc: "Horizontal glowing neon scan visor" },
  { id: "stars", label: "Astral Stars", desc: "✦ ✦ glowing sparkle eyes" },
  { id: "smirk", label: "Winking Smirk", desc: "One wink, one wide with sly grin" },
  { id: "spiral", label: "Hypno Spiral", desc: "Mad visionary hypnotic spiral rings" },
  { id: "warrior", label: "Eyepatch", desc: "Cross-strap battle eyepatch + angled brow" },
  { id: "zen", label: "Serene Lashes", desc: "Curved peaceful zen closed eyes" },
  { id: "sleepy", label: "Half-Closed", desc: "Sleepy, bored, unimpressed slits" },
  { id: "laser", label: "Laser Pupils", desc: "Intense red targeting laser slits" },
  { id: "hype", label: "Wide Hype", desc: "Excited wide eyes with highlight" },
  { id: "goggles", label: "Aviator Goggles", desc: "Brass goggles propped on brow" },
];

export const AVAILABLE_ACCESSORIES: { id: AccessoryType; label: string; desc: string }[] = [
  { id: "none", label: "None", desc: "Pure unadorned bit cat" },
  { id: "crown", label: "Founder Crown", desc: "Stepped pixel gold/orange crown" },
  { id: "bandana", label: "Samurai Bandana", desc: "Warrior headband with flying knot tails" },
  { id: "headset", label: "Hacker Headset", desc: "Over-ear headphones with boom mic" },
  { id: "beret", label: "Poet Beret", desc: "Artistic tilted philosopher beret" },
  { id: "halo", label: "Celestial Halo", desc: "Floating luminous halo ring" },
  { id: "spark", label: "Electric Spark", desc: "8-bit lightning bolt arc" },
  { id: "nightcap", label: "Sleepy Cap", desc: "Striped nightcap with droop pompom" },
  { id: "tophat", label: "Banker Top Hat", desc: "Tall 8-bit gentleman top hat" },
  { id: "cyberplate", label: "PCB Cyberplate", desc: "Exposed metallic circuit skull grid" },
  { id: "tag", label: "Minimal Tag", desc: "Orange pixel collar pendant" },
];

export const AVAILABLE_COLORS: { color: AccentColor; name: string }[] = [
  { color: "#FF6E26", name: "Warm Orange" },
  { color: "#00E5FF", name: "Cyber Cyan" },
  { color: "#22C55E", name: "Matrix Lime" },
  { color: "#EF4444", name: "Crimson Fury" },
  { color: "#A855F7", name: "Ultraviolet" },
  { color: "#F59E0B", name: "Amber Gold" },
  { color: "#10B981", name: "Celestial Jade" },
  { color: "#F43F5E", name: "Rose Velvet" },
  { color: "#EAB308", name: "Solar Gold" },
  { color: "#38BDF8", name: "Ice Blue" },
  { color: "#EC4899", name: "Neon Pink" },
  { color: "#64748B", name: "Steel Gray" },
];

/**
 * Automatically deciphers the character's aesthetic archetype based on their
 * lore, name, personality traits, and perspective.
 */
export function inferCatAesthetics(persona: {
  name?: string;
  description?: string;
  personality?: string;
  perspective?: string;
  beliefs?: string;
  debateStyle?: string;
}): BitCatDress {
  const text = [
    persona.name || "",
    persona.description || "",
    persona.personality || "",
    persona.perspective || "",
    persona.beliefs || "",
    persona.debateStyle || "",
  ]
    .join(" ")
    .toLowerCase();

  // 1. Founder / Initiative / Executive / Leader / Royalty
  if (
    text.includes("founder") ||
    text.includes("initiative") ||
    text.includes("leader") ||
    text.includes("empire") ||
    text.includes("ambitious") ||
    text.includes("charisma") ||
    text.includes("king") ||
    text.includes("boss")
  ) {
    return {
      ears: "sharp",
      eyes: "pixel",
      accessory: "crown",
      accentColor: "#FF6E26",
      mouth: "smirk",
    };
  }

  // 2. Scientist / Logic / Vector / Skeptical / Mathematical / Cold
  if (
    text.includes("vector") ||
    text.includes("scientist") ||
    text.includes("dissect") ||
    text.includes("analytical") ||
    text.includes("truth") ||
    text.includes("skeptic") ||
    text.includes("cold") ||
    text.includes("quantum")
  ) {
    return {
      ears: "antenna",
      eyes: "monocle",
      accessory: "none",
      accentColor: "#00E5FF",
      mouth: "straight",
    };
  }

  // 3. Hacker / Nerd / 1337 / Code / Cyber / Matrix / Linux / Terminal
  if (
    text.includes("nerd") ||
    text.includes("hacker") ||
    text.includes("1337") ||
    text.includes("code") ||
    text.includes("latency") ||
    text.includes("terminal") ||
    text.includes("gate") ||
    text.includes("debug")
  ) {
    return {
      ears: "stepped",
      eyes: "glasses",
      accessory: "headset",
      accentColor: "#22C55E",
      mouth: "cat-w",
    };
  }

  // 4. Warrior / EGO / Combat / Fierce / Fight / Relentless
  if (
    text.includes("warrior") ||
    text.includes("ego") ||
    text.includes("fight") ||
    text.includes("conquest") ||
    text.includes("relentless") ||
    text.includes("battle") ||
    text.includes("fierce")
  ) {
    return {
      ears: "sharp",
      eyes: "warrior",
      accessory: "bandana",
      accentColor: "#EF4444",
      mouth: "fang",
    };
  }

  // 5. Mad Visionary / Anomaly / Chaos / Unpredictable / Transcendence
  if (
    text.includes("anomaly") ||
    text.includes("mad") ||
    text.includes("chaos") ||
    text.includes("chaotic") ||
    text.includes("obsession") ||
    text.includes("transcendence") ||
    text.includes("theatrical")
  ) {
    return {
      ears: "antenna",
      eyes: "spiral",
      accessory: "spark",
      accentColor: "#A855F7",
      mouth: "fang",
    };
  }

  // 6. Comedian / Humor / Entertainer / Joke / Witty / Sarcastic / Daddy BKR
  if (
    text.includes("comedian") ||
    text.includes("humor") ||
    text.includes("entertainer") ||
    text.includes("witty") ||
    text.includes("sarcastic") ||
    text.includes("joke") ||
    text.includes("daddy bkr") ||
    text.includes("playful")
  ) {
    return {
      ears: "sharp",
      eyes: "smirk",
      accessory: "shades",
      accentColor: "#F59E0B",
      mouth: "smirk",
    };
  }

  // 7. Religious / Believer / Spiritual / Faith / Holy / Sacred / Principles
  if (
    text.includes("believer") ||
    text.includes("faith") ||
    text.includes("spiritually") ||
    text.includes("spiritual") ||
    text.includes("muhammad") ||
    text.includes("divine") ||
    text.includes("moral")
  ) {
    return {
      ears: "serene",
      eyes: "zen",
      accessory: "halo",
      accentColor: "#10B981",
      mouth: "straight",
    };
  }

  // 8. Poet / Philosopher / Deep / Soul / Literature / Reflective
  if (
    text.includes("poet") ||
    text.includes("philosopher") ||
    text.includes("philosophy") ||
    text.includes("سوال") ||
    text.includes("lyrical") ||
    text.includes("reflective") ||
    text.includes("wisdom")
  ) {
    return {
      ears: "tufted",
      eyes: "zen",
      accessory: "beret",
      accentColor: "#F43F5E",
      mouth: "straight",
    };
  }

  // 9. Jock / Hype / Athletic / Gym / Brother / High Energy
  if (
    text.includes("jock") ||
    text.includes("athletic") ||
    text.includes("khan") ||
    text.includes("momentum") ||
    text.includes("sports") ||
    text.includes("brotherhood") ||
    text.includes("hype")
  ) {
    return {
      ears: "sharp",
      eyes: "hype",
      accessory: "bandana",
      accentColor: "#EAB308",
      mouth: "open",
    };
  }

  // 10. Lazy / Sloth / Sleep / Minimum / Effort / Relax
  if (
    text.includes("lazy") ||
    text.includes("sloth") ||
    text.includes("minimum") ||
    text.includes("sleep") ||
    text.includes("rest") ||
    text.includes("tired")
  ) {
    return {
      ears: "folded",
      eyes: "sleepy",
      accessory: "nightcap",
      accentColor: "#64748B",
      mouth: "sleepy",
    };
  }

  // 11. Creative / Art / Splash / Lateral / Dream
  if (
    text.includes("creative") ||
    text.includes("art") ||
    text.includes("design") ||
    text.includes("dream") ||
    text.includes("sparkle") ||
    text.includes("lateral")
  ) {
    return {
      ears: "tufted",
      eyes: "stars",
      accessory: "spark",
      accentColor: "#EC4899",
      mouth: "cat-w",
    };
  }

  // 12. Risk-Taking / Bold / Adventurer / Goggles
  if (
    text.includes("risk") ||
    text.includes("gamble") ||
    text.includes("bold") ||
    text.includes("dare") ||
    text.includes("adventurer")
  ) {
    return {
      ears: "sharp",
      eyes: "goggles",
      accessory: "none",
      accentColor: "#FF6E26",
      mouth: "fang",
    };
  }

  // 13. Financial / CFO / Money / Capital / Wallstreet
  if (
    text.includes("financ") ||
    text.includes("money") ||
    text.includes("capital") ||
    text.includes("cfo") ||
    text.includes("runway") ||
    text.includes("wealth")
  ) {
    return {
      ears: "stepped",
      eyes: "monocle",
      accessory: "tophat",
      accentColor: "#EAB308",
      mouth: "smirk",
    };
  }

  // 14. Brutally Honest / Laser / Fierce Truth
  if (
    text.includes("honest") ||
    text.includes("brutal") ||
    text.includes("savage") ||
    text.includes("raw") ||
    text.includes("unfiltered")
  ) {
    return {
      ears: "sharp",
      eyes: "laser",
      accessory: "none",
      accentColor: "#EF4444",
      mouth: "fang",
    };
  }

  // 15. Future / Robot / Machine / Sci-Fi
  if (
    text.includes("future") ||
    text.includes("robot") ||
    text.includes("cyborg") ||
    text.includes("machine") ||
    text.includes("synthetic")
  ) {
    return {
      ears: "fin",
      eyes: "visor",
      accessory: "cyberplate",
      accentColor: "#00E5FF",
      mouth: "straight",
    };
  }

  // Fallback: Deterministic hash on name so each unique custom persona gets a stable cool palette
  const nameHash = (persona.name || "Abubakar")
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const earChoices: EarType[] = ["stepped", "sharp", "antenna", "fin", "tufted"];
  const eyeChoices: EyeType[] = ["pixel", "shades", "glasses", "monocle", "visor"];
  const accChoices: AccessoryType[] = ["tag", "bandana", "crown", "spark", "none"];
  const colChoices: AccentColor[] = ["#FF6E26", "#00E5FF", "#22C55E", "#EAB308", "#A855F7"];

  return {
    ears: earChoices[nameHash % earChoices.length],
    eyes: eyeChoices[(nameHash >> 2) % eyeChoices.length],
    accessory: accChoices[(nameHash >> 4) % accChoices.length],
    accentColor: colChoices[(nameHash >> 1) % colChoices.length],
    mouth: "straight",
  };
}

/**
 * Parses persona dress data from either explicit metadata tag or automatic lore inference.
 */
export function getPersonaDress(persona?: {
  name?: string;
  description?: string;
  personality?: string;
  perspective?: string;
  beliefs?: string;
  customInstructions?: string;
  debateStyle?: string;
}): BitCatDress {
  if (!persona) {
    return {
      ears: "stepped",
      eyes: "pixel",
      accessory: "tag",
      accentColor: "#FF6E26",
      mouth: "straight",
    };
  }

  // Check if custom instructions or description holds a serialized dress override:
  // Format: [AVATAR:{"ears":"...","eyes":"...","accessory":"...","color":"..."}]
  const source = `${persona.customInstructions || ""} ${persona.description || ""}`;
  const match = source.match(/\[AVATAR:(\{.*?\})\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed.ears && parsed.eyes && parsed.accessory && parsed.accentColor) {
        return {
          ears: parsed.ears,
          eyes: parsed.eyes,
          accessory: parsed.accessory,
          accentColor: parsed.accentColor,
          mouth: parsed.mouth || "straight",
        };
      }
    } catch {
      // Ignore JSON error and fall through to inference
    }
  }

  // Automatic inference based on personality & lore
  return inferCatAesthetics(persona);
}

/**
 * Injects or updates the serialized avatar tag inside customInstructions.
 */
export function embedDressInInstructions(
  dress: BitCatDress,
  instructions: string = ""
): string {
  const serialized = `[AVATAR:${JSON.stringify(dress)}]`;
  const clean = instructions.replace(/\s*\[AVATAR:\{.*?\}\]\s*/g, " ").trim();
  return clean ? `${clean}\n\n${serialized}` : serialized;
}
