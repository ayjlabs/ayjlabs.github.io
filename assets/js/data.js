/*
 * AYJ Labs site content.
 * Videos, stats and parts lists come from youtube.com/@ayjlabs;
 * circuit diagrams come from the "Circuit Diagrams" album on facebook.com/ayjgauravyashjain.
 * To add a project or a Short, add an entry to `projects` or `shorts` (newest first) — the page builds itself from this file.
 *
 * Part fields: q = quantity, n = name as listed, k = parts-bin key (groups the same part across projects).
 */
window.AYJ = {
  channel: {
    name: "AYJ Labs",
    formerly: "Gaurav Yash Jain - AYJ",
    handle: "@ayjlabs",
    tagline: "Build. Test. Learn.",
    description:
      "We are obsessed with the world of electronics and remain intrigued by the mystery involved in it. We created this channel to help others understand how to make interesting electronic projects at home, easily, using inexpensive electronic components.",
    youtube: "https://www.youtube.com/@ayjlabs",
    subscribe: "https://www.youtube.com/@ayjlabs?sub_confirmation=1",
    shortsUrl: "https://www.youtube.com/@ayjlabs/shorts",
    instagram: "https://www.instagram.com/ayjlabs/",
    facebook: "https://www.facebook.com/ayjgauravyashjain",
    diagramsAlbum: "https://www.facebook.com/media/set/?set=a.337503066371509&type=3",
    joined: "2012-10-15",
    stats: {
      subscribers: 20200,
      views: 4368343,
      videos: 16,
      facebookFollowers: 1200,
      asOf: "October 2026"
    }
  },

  categories: [
    { id: "sensors", label: "Sensors" },
    { id: "switching", label: "Switching" },
    { id: "ics", label: "ICs & Timers" },
    { id: "security", label: "Security" },
    { id: "basics", label: "Basics" },
    { id: "workshop", label: "Workshop" }
  ],

  // YouTube Shorts, newest first. `project` (optional) is the slug of a related project to link to.
  shorts: [
    {
      id: "T2efxTN2M5E",
      title: "This Tiny Box Controls Your AC 🤯",
      topic: "How a Relay Works",
      date: "2026-10-03",
      length: "0:33",
      project: "simple-relay-circuit"
    }
  ],

  // Parts-bin groups, in display order. `sym` picks the schematic symbol drawn next to the part.
  parts: {
    NE555: { label: "NE555 Timer", group: "ICs", sym: "ic" },
    CA3130: { label: "CA3130 Op-Amp", group: "ICs", sym: "ic" },
    "4017": { label: "4017 Decade Counter", group: "ICs", sym: "ic" },
    BC547: { label: "BC547 NPN", group: "Transistors", sym: "npn" },
    BC548: { label: "BC548 NPN", group: "Transistors", sym: "npn" },
    "2N3904": { label: "2N3904 NPN", group: "Transistors", sym: "npn" },
    BC557: { label: "BC557 PNP", group: "Transistors", sym: "pnp" },
    LDR: { label: "LDR", group: "Sensors & outputs", sym: "ldr" },
    MIC: { label: "Electret Mic", group: "Sensors & outputs", sym: "mic" },
    TSOP1738: { label: "TSOP1738 IR Rx", group: "Sensors & outputs", sym: "ir" },
    LED: { label: "LED", group: "Sensors & outputs", sym: "led" },
    BUZZER: { label: "Buzzer / Siren", group: "Sensors & outputs", sym: "buzzer" },
    LASER: { label: "Laser", group: "Sensors & outputs", sym: "laser" },
    RELAY: { label: "6V Relay", group: "Sensors & outputs", sym: "relay" },
    RESISTOR: { label: "Resistors", group: "Passives", sym: "resistor" },
    POT: { label: "Variable Resistor", group: "Passives", sym: "pot" },
    CAPACITOR: { label: "Capacitors", group: "Passives", sym: "capacitor" },
    DIODE: { label: "1N4007 Diode", group: "Passives", sym: "diode" },
    SWITCH: { label: "SPST Switch", group: "Passives", sym: "switch" },
    BATTERY: { label: "9V Battery", group: "Power & build", sym: "battery" },
    SUPPLY: { label: "6V Supply", group: "Power & build", sym: "battery" },
    BREADBOARD: { label: "Breadboard", group: "Power & build", sym: "breadboard" },
    WIRE: { label: "Wires", group: "Power & build", sym: "wire" }
  },

  projects: [
    {
      slug: "mobile-phone-detector",
      id: "xW-hXU7MWnM",
      title: "Mobile Phone Detector",
      date: "2015-09-20",
      length: "4:33",
      views: 1182062,
      likes: 16369,
      cats: ["sensors", "ics", "security"],
      summary:
        "Senses the burst of radio energy from a phone making or receiving a call and lights an LED. A CA3130 op-amp amplifies the tiny signal picked up by a capacitor, and a BC548 drives the LED.",
      parts: [
        { q: 1, n: "CA3130 IC", k: "CA3130" },
        { q: 1, n: "BC548 Transistor", k: "BC548" },
        { q: 2, n: "2.2MΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "100KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "1KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "100µF Capacitor (50V)", k: "CAPACITOR" },
        { q: 1, n: "0.22µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "47pF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ],
      diagram: {
        src: "assets/diagrams/mobile-phone-detector.jpg",
        w: 2048, h: 1151,
        caption: "Mobile Phone Detector",
        fb: "https://www.facebook.com/photo.php?fbid=747263678728777",
        posted: "2015-09-20"
      }
    },
    {
      slug: "electronic-dice",
      id: "1GSe0vIzplw",
      title: "Electronic Dice",
      date: "2015-05-12",
      length: "4:02",
      views: 241093,
      likes: 3665,
      cats: ["ics"],
      summary:
        "Playing board games is now even more fun. A 4017 decade counter and six LEDs replace the plastic die, built in very easy steps on a breadboard.",
      parts: [
        { q: 1, n: "4017 IC", k: "4017" },
        { q: 6, n: "LEDs", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ]
    },
    {
      slug: "clap-switch-with-audio",
      id: "XhUx1aOaloE",
      title: "Clap Switch (With Audio)",
      date: "2014-11-25",
      length: "10:09",
      views: 250150,
      likes: 1642,
      cats: ["switching", "ics", "sensors"],
      summary:
        "Clap and the LED turns on. An electret microphone picks up the sound, two BC547 transistors amplify it and trigger an NE555 timer, which keeps the LED lit for a while before it switches off by itself.",
      parts: [
        { q: 2, n: "BC547 Transistor", k: "BC547" },
        { q: 1, n: "NE555 IC", k: "NE555" },
        { q: 1, n: "Electret Condenser Microphone", k: "MIC" },
        { q: 2, n: "0.1µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "100µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "1K Resistor", k: "RESISTOR" },
        { q: 1, n: "4.7K Resistor", k: "RESISTOR" },
        { q: 1, n: "47K Resistor", k: "RESISTOR" },
        { q: 1, n: "330Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "470Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" }
      ],
      notes: [
        "The LED only switches on with a clap — it turns off automatically after a delay, and the delay depends on the timing capacitor's value."
      ],
      diagram: {
        src: "assets/diagrams/clap-switch.jpg",
        w: 960, h: 400,
        caption: "Clap Switch Circuit Diagram",
        fb: "https://www.facebook.com/photo.php?fbid=631982486923564",
        posted: "2015-01-17"
      }
    },
    {
      slug: "remote-tester",
      id: "BEitfXpKPgQ",
      title: "Remote Tester (IR Receiver)",
      date: "2014-02-04",
      length: "6:02",
      views: 119189,
      likes: 456,
      cats: ["sensors", "workshop"],
      summary:
        "Is your TV remote dead, or just the batteries? Point any infrared remote at this TSOP1738 receiver and press a button — a BC557 transistor blinks the LED when it sees the IR signal.",
      parts: [
        { q: 1, n: "BC557 Transistor", k: "BC557" },
        { q: 1, n: "TSOP1738 IR Receiver", k: "TSOP1738" },
        { q: 1, n: "1N4007 Diode", k: "DIODE" },
        { q: 1, n: "120Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "330Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "1KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "A remote to test :D" }
      ],
      notes: [
        "The circuit diagram labels these two resistors 120K and 330K, while the video description lists 120Ω and 330Ω."
      ],
      diagram: {
        src: "assets/diagrams/remote-tester.jpg",
        w: 1024, h: 577,
        caption: "Remote Tester (IR Receiver) Circuit Diagram",
        fb: "https://www.facebook.com/photo.php?fbid=464198577035290",
        posted: "2014-02-05"
      }
    },
    {
      slug: "water-level-indicator",
      id: "PkqEAMVBx_0",
      title: "Water Level Indicator",
      date: "2013-11-16",
      length: "7:53",
      views: 337138,
      likes: 2174,
      cats: ["sensors"],
      summary:
        "Probes at three heights in a tank switch three BC547 transistors. As the water rises the green, white and red LEDs light up in turn, and a buzzer sounds when the tank is full.",
      parts: [
        { q: 3, n: "BC547 Transistor", k: "BC547" },
        { q: 3, n: "LED", k: "LED" },
        { q: 3, n: "330Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "Buzzer (3–12V)", k: "BUZZER" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "Wires", k: "WIRE" }
      ],
      diagram: {
        src: "assets/diagrams/water-level-indicator.jpg",
        w: 1354, h: 991,
        caption: "Water Level Indicator",
        fb: "https://www.facebook.com/photo.php?fbid=427535987368216",
        posted: "2013-11-17"
      }
    },
    {
      slug: "simple-light-sensor",
      id: "v9L0Ly2rrEo",
      title: "Simple Light Sensor",
      date: "2013-08-15",
      length: "4:55",
      views: 108425,
      likes: 356,
      cats: ["sensors", "basics"],
      summary:
        "The simplest light sensor there is: an LDR in series with an LED and a resistor. More light means less resistance, so the LED glows brighter.",
      parts: [
        { q: 1, n: "LDR (Light Dependent Resistor)", k: "LDR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "1KΩ Resistor (or 330Ω)", k: "RESISTOR" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ],
      diagram: {
        src: "assets/diagrams/simple-light-sensor.jpg",
        w: 955, h: 541,
        caption: "Simple Light Sensor",
        fb: "https://www.facebook.com/photo.php?fbid=386158841505931",
        posted: "2013-08-15"
      }
    },
    {
      slug: "simple-relay-circuit",
      id: "BgLQucEzqHg",
      title: "Simple Relay Circuit",
      date: "2013-08-13",
      length: "7:40",
      views: 1089900,
      likes: 4619,
      cats: ["switching", "basics"],
      summary:
        "What is a relay, and what is it used for? A switch powers the relay coil from a 6V supply, and the relay's contacts flip which of two LEDs is lit by a completely separate 9V circuit.",
      parts: [
        { q: 1, n: "6V Relay", k: "RELAY" },
        { q: 1, n: "10KΩ Resistor", k: "RESISTOR" },
        { q: 2, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "6V Power Supply (or a 9V battery with a 7806 regulator)", k: "SUPPLY" },
        { q: 1, n: "Switch (Single Pole Single Throw)", k: "SWITCH" }
      ],
      diagram: {
        src: "assets/diagrams/relay-circuit.jpg",
        w: 2021, h: 1102,
        caption: "Simple Relay Circuit Diagram",
        fb: "https://www.facebook.com/photo.php?fbid=384641571657658",
        posted: "2013-08-12"
      }
    },
    {
      slug: "dark-sensor-two-transistors",
      id: "5OG6luUSY3Q",
      title: "Dark Sensor Using Two Transistors",
      date: "2013-05-20",
      length: "9:00",
      views: 55198,
      likes: 239,
      cats: ["sensors"],
      summary:
        "A two-transistor take on the dark sensor. A pair of BC548s and an LDR switch the LED on when the light around it fades.",
      parts: [
        { q: 2, n: "BC548 Transistor", k: "BC548" },
        { q: 1, n: "LDR (Light Dependent Resistor)", k: "LDR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 2, n: "1.2K Resistor", k: "RESISTOR" },
        { q: 1, n: "10KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "6V Power Supply (or a 9V battery with a 7806 regulator)", k: "SUPPLY" }
      ]
    },
    {
      slug: "fume-extractor",
      id: "aI23IDezT5o",
      title: "Fume Extractor",
      date: "2013-03-14",
      length: "3:38",
      views: 2742,
      likes: 36,
      cats: ["workshop"],
      summary: "A homemade fume extractor for the electronics workbench."
    },
    {
      slug: "led-basics",
      id: "EPWiF5Er2Rw",
      title: "LED Basics",
      date: "2013-03-14",
      length: "4:22",
      views: 2412,
      likes: 39,
      cats: ["basics"],
      summary:
        "Getting to know the light-emitting diode — the part that turns up in almost every AYJ Labs project."
    },
    {
      slug: "water-sensor",
      id: "ZaTMvOyUzyo",
      title: "Water Sensor",
      date: "2013-03-13",
      length: "3:07",
      views: 168664,
      likes: 725,
      cats: ["sensors", "basics"],
      summary:
        "Dip two wires into a glass of water and the LED lights up. The water completes the circuit — a water sensor in very easy steps.",
      parts: [
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "100KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "A glass (of water)" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ]
    },
    {
      slug: "flashing-led-ne555",
      id: "zT5aBK_AYhE",
      title: "Flashing LED Using NE555 IC",
      date: "2013-03-08",
      length: "7:13",
      views: 86969,
      likes: 296,
      cats: ["ics", "basics"],
      summary:
        "Make an LED blink on its own using the legendary NE555 timer IC, a couple of resistors and a big 1000µF capacitor.",
      parts: [
        { q: 1, n: "NE555 IC (Timer)", k: "NE555" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "330Ω Resistor", k: "RESISTOR" },
        { q: 2, n: "1KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "1000µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Some wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ],
      notes: [
        "Correction from AYJ Labs: in the video's audio, LED is mistakenly expanded as “Light Dependent Resistor”. It stands for Light Emitting Diode."
      ]
    },
    {
      slug: "laser-security-system",
      id: "Ua0xwC-Iu5k",
      title: "Laser Security System",
      date: "2013-01-02",
      length: "6:24",
      views: 157719,
      likes: 460,
      cats: ["security", "sensors"],
      summary:
        "Aim a laser at an LDR and guard a doorway: break the beam and the siren goes off. A 2N3904 transistor does the switching, with a 5K variable resistor to tune it.",
      parts: [
        { q: 1, n: "2N3904 NPN Transistor", k: "2N3904" },
        { q: 1, n: "5K Variable Resistor", k: "POT" },
        { q: 1, n: "1000µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "LDR (Light Dependent Resistor)", k: "LDR" },
        { q: 1, n: "3–12V Siren", k: "BUZZER" },
        { q: 1, n: "Laser", k: "LASER" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" }
      ]
    },
    {
      slug: "light-sensor",
      id: "0N9rUYEsx0c",
      title: "Light Sensor",
      date: "2012-12-24",
      length: "4:11",
      views: 295006,
      likes: 723,
      cats: ["sensors"],
      summary:
        "A transistor-switched light sensor: shine light on the LDR and a BC547 turns the LED on.",
      parts: [
        { q: 1, n: "BC547 Transistor", k: "BC547" },
        { q: 2, n: "270Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "LDR (Light Dependent Resistor)", k: "LDR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "6V Power Source", k: "SUPPLY" }
      ]
    },
    {
      slug: "dark-sensor",
      id: "L6avdu2OmgU",
      title: "Dark Sensor",
      date: "2012-12-24",
      length: "4:45",
      views: 81175,
      likes: 244,
      cats: ["sensors"],
      summary:
        "The light sensor's opposite: when it gets dark, a BC547 and an LDR switch the LED on.",
      parts: [
        { q: 1, n: "BC547 Transistor", k: "BC547" },
        { q: 1, n: "100KΩ Resistor", k: "RESISTOR" },
        { q: 1, n: "470Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "LDR (Light Dependent Resistor)", k: "LDR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "6V Power Source", k: "SUPPLY" }
      ]
    },
    {
      slug: "clap-switch",
      id: "lwoAJHVZVGA",
      title: "Clap Switch",
      date: "2012-12-22",
      length: "11:22",
      views: 189754,
      likes: 501,
      cats: ["switching", "ics", "sensors"],
      summary:
        "Where it all started — the channel's first video. An electret mic, two BC547s and an NE555 timer turn an LED on with a clap.",
      parts: [
        { q: 2, n: "BC547 Transistor", k: "BC547" },
        { q: 1, n: "NE555 Chip", k: "NE555" },
        { q: 1, n: "Electret Condenser Microphone", k: "MIC" },
        { q: 2, n: "0.1µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "100µF Capacitor", k: "CAPACITOR" },
        { q: 1, n: "1K Resistor", k: "RESISTOR" },
        { q: 1, n: "4.7K Resistor", k: "RESISTOR" },
        { q: 1, n: "47K Resistor", k: "RESISTOR" },
        { q: 1, n: "330Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "470Ω Resistor", k: "RESISTOR" },
        { q: 1, n: "LED (Light Emitting Diode)", k: "LED" },
        { q: 1, n: "Wires", k: "WIRE" },
        { q: 1, n: "Breadboard", k: "BREADBOARD" },
        { q: 1, n: "9V Battery", k: "BATTERY" },
        { q: 1, n: "9V Battery Clip", k: "BATTERY" }
      ],
      notes: [
        "There's a newer, clearer tutorial of this same project: <a href=\"#project/clap-switch-with-audio\">Clap Switch (With Audio)</a>."
      ],
      diagram: {
        src: "assets/diagrams/clap-switch-2013.jpg",
        w: 928, h: 388,
        caption: "Clap Switch",
        fb: "https://www.facebook.com/photo.php?fbid=337503076371508",
        posted: "2013-04-21"
      }
    }
  ]
};
