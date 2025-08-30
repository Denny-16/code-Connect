// utils/problemUtility.js

const languageMap = {
  "cpp": 105,         // C++ (GCC 14.1.0)
  "c": 103,           // C (GCC 14.1.0)
  "python": 100,      // Python (3.12.5)
  "java": 91,         // Java (JDK 17.0.6)
  "javascript": 97,   // Node.js 20.17.0
  "typescript": 101,  // TypeScript (5.6.2)
  "go": 106,          // Go (1.22.0)
  "csharp": 51,       // C# (Mono 6.6.0.161)
  "php": 98,          // PHP (8.3.11)
  "ruby": 72          // Ruby (2.7.0)
  // add more if needed
};

// ✅ Utility function
const languageById = (lang) => {
  if (!lang) return null;
  const key = lang.toLowerCase();
  return languageMap[key] || null;
};

module.exports = { languageById };
