export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const spotlightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.6,
    },
  },
};
export const trimmedContent = (content, maxLength = 20) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
};
export const cardVariants = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const infoVariants = {
  initial: {
    y: 300,
    opacity: 0,
  },
  hover: {
    y: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const textVariants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
};

export const characterFieldIcons = {
  // Age variations
  Age: "FaBirthdayCake",
  Ages: "FaBirthdayCake",
  
  // Birthday variations
  Birthday: "FaCalendarAlt",
  Birthdate: "FaCalendarAlt",
  "Birth date": "FaCalendarAlt",
  "Date of birth": "FaCalendarAlt",
  
  // Height variations
  Height: "FaRulerVertical",
  "Height:": "FaRulerVertical",
  
  // Weight variations
  Weight: "FaWeight",
  "Weight:": "FaWeight",
  
  // Blood type variations
  "Blood type": "FaHeart",
  "Blood Type": "FaHeart",
  Bloodtype: "FaHeart",
  
  // Gender variations
  Gender: "IoPersonCircleOutline",
  Sex: "IoPersonCircleOutline",
  
  // Status variations
  Status: "FaInfo",
  State: "FaInfo",
  Condition: "FaInfo",
  
  // Hair variations
  Hair: "PiHairDryerFill",
  "Hair color": "PiHairDryerFill",
  "Hair Color": "PiHairDryerFill",
  "Hair colour": "PiHairDryerFill",
  "Hair Colour": "PiHairDryerFill",
  
  // Eye variations
  Eyes: "PiEyeBold",
  Eye: "PiEyeBold",
  "Eye color": "PiEyeBold",
  "Eye Color": "PiEyeBold",
  "Eye colour": "PiEyeBold",
  "Eye Colour": "PiEyeBold",
  
  // Japanese name variations
  "Japanese name": "FaLanguage",
  "Japanese Name": "FaLanguage",
  "Kanji name": "FaLanguage",
  "Kanji Name": "FaLanguage",
  Kanji: "FaLanguage",
  "Japanese:": "FaLanguage",
  "Name in Japanese": "FaLanguage",
  
  // Affiliation variations
  Affiliation: "GiNinjaHeroicStance",
  Affiliations: "GiNinjaHeroicStance",
  Group: "GiNinjaHeroicStance",
  Groups: "GiNinjaHeroicStance",
  Organization: "GiNinjaHeroicStance",
  Organizations: "GiNinjaHeroicStance",
  
  // Devil Fruit variations
  "Devil fruit": "GiPowerLightning",
  "Devil Fruit": "GiPowerLightning",
  "Devil's Fruit": "GiPowerLightning",
  "Devils Fruit": "GiPowerLightning",
  "Devil's fruit": "GiPowerLightning",
  "Devils fruit": "GiPowerLightning",
  
  // Position variations
  Position: "GiArmorDowngrade",
  Occupation: "GiArmorDowngrade",
  Role: "GiArmorDowngrade",
  Roles: "GiArmorDowngrade",
  Job: "GiArmorDowngrade",
  
  // Type variations
  Type: "FaInfo",
  "Fruit type": "FaInfo",
  "Fruit Type": "FaInfo",
  Category: "FaInfo",
  
  // Bounty variations
  Bounty: "FaQuoteLeft",
  "Bounty:": "FaQuoteLeft",
  Reward: "FaQuoteLeft",
  
  // Race/Species variations
  Race: "IoPersonCircleOutline",
  Species: "IoPersonCircleOutline",
  Kind: "IoPersonCircleOutline",
  
  // Alias variations
  Alias: "FaMask",
  Aliases: "FaMask",
  "Also known as": "FaMask",
  AKA: "FaMask",
  Nickname: "FaMask",
  Nicknames: "FaMask",
  "Other names": "FaMask"
};

export function parseAnimeCharacterData(data) {
  if (!data) {
    return {};
  }

  const normalizeFieldName = (field) => {
    return field.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const fieldGroups = {
    age: ["age", "ages"],
    birthday: ["birthday", "birthdate", "birthdate", "dateofbirth"],
    height: ["height"],
    weight: ["weight"],
    bloodtype: ["bloodtype", "blood"],
    gender: ["gender", "sex"],
    status: ["status", "state", "condition"],
    hair: ["hair", "haircolor", "haircolour"],
    eyes: ["eyes", "eye", "eyecolor", "eyecolour"],
    japanesename: ["japanesename", "kanji", "japanese", "namejapanese", "nameinjapanesee"],
    affiliation: ["affiliation", "affiliations", "group", "groups", "organization", "organizations"],
    devilfruit: ["devilfruit", "devilsfruit", "devilpower"],
    position: ["position", "occupation", "role", "roles", "job"],
    type: ["type", "fruittype", "category"],
    bounty: ["bounty", "reward"],
    race: ["race", "species", "kind"],
    alias: ["alias", "aliases", "alsoknownas", "aka", "nickname", "nicknames", "othernames"]
  };

  // Create a map of normalized fields to their original form and group
  const fieldMap = new Map();
  Object.entries(characterFieldIcons).forEach(([field]) => {
    const normalized = normalizeFieldName(field);
    fieldMap.set(normalized, field);
  });

  // Helper function to find the correct field group
  const findFieldGroup = (normalizedField) => {
    for (const [group, variations] of Object.entries(fieldGroups)) {
      if (variations.includes(normalizedField)) {
        return group;
      }
    }
    return null;
  };

  // Helper function to clean and format field values
  const cleanFieldValue = (value) => {
    return value.replace(/^\s*[:：]\s*/, "").trim();
  };

  // Split the text into lines and process each line
  const lines = data.split("\n");
  let currentField = null;
  let storyLines = [];
  const characterData = {};

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Check if line starts with a field using regex (support for both : and ：)
    const fieldMatch = line.match(/^([^:：]+)[：:]/);
    if (fieldMatch) {
      const potentialField = fieldMatch[1].trim();
      const normalizedField = normalizeFieldName(potentialField);
      const originalField = fieldMap.get(normalizedField);
      const fieldGroup = findFieldGroup(normalizedField);

      if (originalField || fieldGroup) {
        currentField = originalField || fieldGroup;
        const value = cleanFieldValue(line.substring(fieldMatch[0].length));
        characterData[currentField] = value;
        continue;
      }
    }

    // If we're not in a field definition, add to story
    if (!currentField || !line.startsWith(currentField)) {
      storyLines.push(line);
    }
  }

  // Join story lines and clean up
  if (storyLines.length > 0) {
    const story = storyLines
      .join("\n")
      .replace(/^\s+|\s+$/g, "") // Trim start and end whitespace
      .replace(/\n{3,}/g, "\n\n"); // Replace multiple newlines with double newline
    characterData["Story"] = story;
  }

  return characterData;
}
