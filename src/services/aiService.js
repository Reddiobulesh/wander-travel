/**
 * AI Assistant & Itinerary Planner Service
 * Supports Google Gemini API with smart fallback intelligence engine.
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

/**
 * Ask AI Assistant a question about a destination.
 */
export async function askTravelAI(promptText, destinationName = "general") {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== "" && !apiKey.includes("your_")) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Wander AI, an expert, inspiring, and concise luxury travel concierge. 
The user is asking about ${destinationName}: "${promptText}". 
Provide a warm, structured, and helpful response with emoji bullet points. Keep it under 200 words.`,
                },
              ],
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (err) {
      console.warn("Gemini API call failed, using intelligent fallback:", err);
    }
  }

  // Fallback AI Concierge Engine
  return generateFallbackAnswer(promptText, destinationName);
}

/**
 * Generates a structured Day-by-Day Itinerary.
 */
export async function generateItineraryPlan(destinationObj, daysCount = 3, travelStyle = "Balanced") {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const name = destinationObj?.name || "Destination";

  if (apiKey && apiKey.trim() !== "" && !apiKey.includes("your_")) {
    try {
      const prompt = `Create a detailed ${daysCount}-day ${travelStyle} travel itinerary for ${name}.
Return ONLY valid JSON matching this exact structure (no markdown formatting, no code block backticks):
[
  {
    "day": 1,
    "title": "Day Title",
    "morning": "Morning activity description",
    "afternoon": "Afternoon highlight",
    "evening": "Evening dining or sunset experience",
    "tip": "Local insider tip",
    "food": "Recommended local dish to try"
  }
]`;

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Gemini Itinerary API failed, using fallback generator:", err);
    }
  }

  // Smart Fallback Itinerary Generator
  return createFallbackItinerary(destinationObj, daysCount, travelStyle);
}

/* ==========================================================================
   FALLBACK AI INTELLIGENCE concierges
   ========================================================================== */

function generateFallbackAnswer(queryText, destinationName) {
  const q = queryText.toLowerCase();

  if (q.includes("best time") || q.includes("when to go") || q.includes("season") || q.includes("weather")) {
    return `✨ **Best Time to Visit ${destinationName}**:\n\n• **Spring & Autumn**: Shoulder seasons offer ideal temperature, pleasant breezes, and fewer crowds.\n• **Weather Highlight**: Highs average 20°C–26°C with minimal rainfall.\n• **Pro Tip**: Pack light layers and comfortable walking shoes for evening strolls!`;
  }

  if (q.includes("days") || q.includes("how long") || q.includes("duration")) {
    return `⏳ **Recommended Stay in ${destinationName}**:\n\n• **Ideal Duration**: 4 to 5 full days to explore famous landmarks without rushing.\n• **Weekend Trip**: 2–3 days covers top iconic highlights.\n• **Extended Stay**: 7+ days allows day trips to surrounding countryside and hidden gems.`;
  }

  if (q.includes("budget") || q.includes("cost") || q.includes("expensive") || q.includes("money")) {
    return `💳 **Budget & Cost Guide for ${destinationName}**:\n\n• **Budget Traveler**: $60–$90 / day (hostels, street food, local transit).\n• **Mid-Range**: $150–$250 / day (3-star boutique hotels, cozy cafes, paid attractions).\n• **Luxury Concierge**: $500+ / day (fine dining, private tours, luxury suites).\n• **Currency Tip**: Always carry a small amount of local cash for street markets.`;
  }

  if (q.includes("food") || q.includes("eat") || q.includes("dish") || q.includes("restaurant")) {
    return `🍽️ **Culinary Highlights in ${destinationName}**:\n\n• **Must-Try Specialties**: Taste authentic local delicacies at neighborhood markets.\n• **Dining Culture**: Lunch is often the main meal; dinner starts later around 8:30 PM.\n• **Insider Spot**: Check out bustling night markets and family-run bistros off the main avenue.`;
  }

  return `🌿 **Wander AI Guide for ${destinationName}**:\n\n• **Top Experience**: Immerse yourself in historic neighborhoods and iconic architectural landmarks.\n• **Safety & Transport**: Very safe for solo and group travelers. Public metro and walking are recommended.\n• **Insider Secret**: Visit major monuments early in the morning right at sunrise for breathtaking photos without crowds!`;
}

function createFallbackItinerary(dest, daysCount, style) {
  const name = dest?.name || "Destination";
  const places = dest?.places || [];
  const p1 = places[0]?.name || "Historic City Center";
  const p2 = places[1]?.name || "Iconic Cultural Landmark";
  const p3 = places[2]?.name || "Scenic Waterfront & Gardens";

  const plans = [
    {
      day: 1,
      title: `Arrival & Iconic ${name} Landmarks`,
      morning: `Begin your journey exploring ${p1}. Take a leisurely walking tour around the vibrant square.`,
      afternoon: `Enjoy a relaxed lunch at a rooftop bistro overlooking the skyline, followed by visiting ${p2}.`,
      evening: `Sunset views over the city followed by a traditional welcome dinner.`,
      tip: `Buy tickets online in advance to bypass morning queues at ${p1}.`,
      food: `Authentic local specialty dish & fresh espresso`,
    },
    {
      day: 2,
      title: `Cultural Immersion & Hidden Gems`,
      morning: `Head early to ${p3} for morning photography and quiet garden walks.`,
      afternoon: `Explore local artisan boutiques, antique markets, and contemporary art galleries.`,
      evening: `Experience nightlife and live acoustic music in the historic district.`,
      tip: `Use public transit or bikeshare passes for easy navigation.`,
      food: `Artisanal street food delicacies`,
    },
    {
      day: 3,
      title: `Panoramas & Culinary Tasting`,
      morning: `Scenic morning hike or cable car ride to the highest viewpoint in ${name}.`,
      afternoon: `Take a guided food tasting tour sampling 5 local signature delicacies.`,
      evening: `Farewell dinner cruise or lounge cocktail with panoramic evening lights.`,
      tip: `Visit the central market around 11:00 AM for peak fresh produce tasting.`,
      food: `Signature chef dinner & local wine pairing`,
    },
  ];

  if (daysCount > 3) {
    plans.push({
      day: 4,
      title: `Day Trip & Nature Escape`,
      morning: `Day excursion to nearby coastal cliffs, mountain trails, or vineyard estates.`,
      afternoon: `Outdoor picnic and wine tasting surrounded by scenic landscapes.`,
      evening: `Return to ${name} for a relaxed late-night dessert and cafe walk.`,
      tip: `Rent a car or book an early morning regional express train.`,
      food: `Farm-to-table organic lunch`,
    });
  }

  if (daysCount > 4) {
    plans.push({
      day: 5,
      title: `Art, Shopping & Farewell Sunset`,
      morning: `Visit world-class museums and historic cathedral interiors.`,
      afternoon: `Souvenir shopping for local crafts, textiles, and handcrafted goods.`,
      evening: `Celebration dinner at a Michelin-recommended dining room.`,
      tip: `Keep your receipts for tax-free shopping rebates at the airport.`,
      food: `Gourmet multi-course tasting menu`,
    });
  }

  return plans.slice(0, daysCount);
}
