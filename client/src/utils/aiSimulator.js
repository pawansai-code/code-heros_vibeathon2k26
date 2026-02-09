/**
 * AI Simulator for Emergency Response App
 * Simulates analyzing text/media to classify emergencies and determine severity.
 */

const KEYWORDS = {
  FIRE: ['fire', 'smoke', 'burn', 'flame', 'explosion', 'gas leak', 'spark'],
  MEDICAL: ['blood', 'hurt', 'pain', 'unconscious', 'breathing', 'heart', 'stroke', 'collapsed', 'bleeding', 'injury', 'broken', 'ambulance', 'medic'],
  POLICE: ['fight', 'gun', 'robbery', 'thief', 'steal', 'assault', 'attack', 'weapon', 'shoot', 'danger', 'threat', 'intruder', 'police', 'cop', 'crime'],
  CRITICAL: ['explosion', 'unconscious', 'gun', 'shooting', 'massive', 'severe', 'dying', 'dead', 'trap', 'burning']
};

export const analyzeIncident = async (description, files) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = description.toLowerCase();
      let severityScore = 0;
      let types = new Set();
      
      // Keyword Analysis
      KEYWORDS.FIRE.forEach(w => { if(text.includes(w)) { types.add('Fire Station'); severityScore += 2; }});
      KEYWORDS.MEDICAL.forEach(w => { if(text.includes(w)) { types.add('Ambulance'); severityScore += 2; }});
      KEYWORDS.POLICE.forEach(w => { if(text.includes(w)) { types.add('Police'); severityScore += 2; }});
      
      KEYWORDS.CRITICAL.forEach(w => { if(text.includes(w)) severityScore += 5; });

      // Default if no keywords found
      if (types.size === 0) types.add('Police'); 

      // Input Length & Files influence severity
      if (files && files.length > 0) severityScore += 1;
      if (description.length > 50) severityScore += 1;

      // Determine Severity Level
      let severity = 'Low';
      if (severityScore >= 8) severity = 'Critical';
      else if (severityScore >= 5) severity = 'High';
      else if (severityScore >= 3) severity = 'Medium';

      resolve({
        id: Date.now().toString(),
        type: Array.from(types),
        severity,
        summary: `AI Analysis: Detected ${Array.from(types).join(' + ')} emergency. Severity rated as ${severity}. Dispatched teams accordingly.`,
        timestamp: new Date().toISOString(),
        originalRequest: { description, fileCount: files ? files.length : 0 }
      });
    }, 2500); // Simulate 2.5s processing delay
  });
};
