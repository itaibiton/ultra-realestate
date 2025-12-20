import Anthropic from "@anthropic-ai/sdk";
import { getCountryByCode, getCurrencySymbol } from "@/lib/countries";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface OnboardingContext {
  currentCountry?: string;
  citizenship?: string;
  budget?: number;
  budgetCurrency?: string;
  investmentPurpose?: string;
  targetLocations?: string[];
  propertyTypes?: string[];
  timeline?: string;
  riskTolerance?: string;
  experienceLevel?: string;
  specialRequirements?: string;
}

export interface AIResponse {
  message: string;
  followUp?: string;
  insights?: string[];
}

const SYSTEM_PROMPT = `You are a friendly and knowledgeable real estate investment advisor assistant for GlobalNest, a platform that helps international investors find properties worldwide.

Your role during onboarding is to:
1. Make the user feel welcome and understood
2. Provide brief, helpful responses to their answers
3. Give relevant insights based on their investment profile
4. Keep responses concise (2-3 sentences max)
5. Be encouraging and professional

Key guidelines:
- Acknowledge the user's answer positively
- Provide a relevant insight or tip when appropriate
- Keep the conversation flowing naturally
- Don't ask questions - that's handled by the structured flow
- Use the user's name if available
- Reference their previous answers to show personalization

Important context:
- This is a global real estate platform
- Users are typically looking for investment properties or homes abroad
- Common markets include USA, Israel, UAE, Europe, and more
`;

export async function generateAIResponse(
  questionId: string,
  userAnswer: string | string[],
  context: OnboardingContext,
  locale: string = "en"
): Promise<AIResponse> {
  const answerText = Array.isArray(userAnswer)
    ? userAnswer.join(", ")
    : userAnswer;

  // Build context summary
  const contextSummary = buildContextSummary(context);

  const prompt = `
Current question: ${questionId}
User's answer: ${answerText}

User's profile so far:
${contextSummary}

Language: ${locale === "he" ? "Hebrew" : "English"}

Generate a brief, personalized response acknowledging their answer. Include a relevant insight if appropriate.
${locale === "he" ? "Respond in Hebrew." : "Respond in English."}
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return {
      message: text.trim(),
    };
  } catch (error) {
    console.error("AI response generation failed:", error);
    // Fallback to static responses
    return getFallbackResponse(questionId, answerText, locale);
  }
}

function buildContextSummary(context: OnboardingContext): string {
  const parts: string[] = [];

  if (context.currentCountry) {
    const country = getCountryByCode(context.currentCountry);
    parts.push(`- Currently in: ${country?.name || context.currentCountry}`);
  }

  if (context.citizenship) {
    const country = getCountryByCode(context.citizenship);
    parts.push(`- Citizenship: ${country?.name || context.citizenship}`);
  }

  if (context.budget && context.budgetCurrency) {
    const symbol = getCurrencySymbol(context.budgetCurrency);
    parts.push(
      `- Budget: ${symbol}${context.budget.toLocaleString()} ${context.budgetCurrency}`
    );
  }

  if (context.investmentPurpose) {
    parts.push(`- Purpose: ${context.investmentPurpose}`);
  }

  if (context.targetLocations?.length) {
    const locations = context.targetLocations
      .map((code) => getCountryByCode(code)?.name || code)
      .join(", ");
    parts.push(`- Interested in: ${locations}`);
  }

  if (context.propertyTypes?.length) {
    parts.push(`- Property types: ${context.propertyTypes.join(", ")}`);
  }

  if (context.timeline) {
    parts.push(`- Timeline: ${context.timeline}`);
  }

  if (context.riskTolerance) {
    parts.push(`- Risk tolerance: ${context.riskTolerance}`);
  }

  if (context.experienceLevel) {
    parts.push(`- Experience: ${context.experienceLevel}`);
  }

  return parts.length > 0 ? parts.join("\n") : "No information collected yet.";
}

function getFallbackResponse(
  questionId: string,
  answer: string,
  locale: string
): AIResponse {
  const responses: Record<string, Record<string, string>> = {
    en: {
      current_country:
        "Great! Understanding where you're based helps us tailor our recommendations for you.",
      citizenship:
        "Thanks for sharing. Your citizenship can affect tax implications and property ownership options in different countries.",
      budget:
        "Excellent budget range! This opens up many interesting opportunities across different markets.",
      purpose:
        "Perfect, this helps us understand your priorities and find the right properties for your goals.",
      location:
        "Great choices! These markets offer diverse investment opportunities.",
      property_type:
        "Good selection! We'll focus on finding the best options in these categories.",
      timeline:
        "Thanks for letting us know your timeline. This helps us prioritize the most relevant listings.",
      risk_tolerance:
        "Understanding your risk comfort level helps us match you with appropriate investment opportunities.",
      experience:
        "Noted! We'll tailor our recommendations and resources based on your experience level.",
      special_requirements:
        "Thank you for sharing your specific needs. We'll keep these in mind when matching you with properties and professionals.",
      contact_preference:
        "Perfect! We'll make sure to reach out through your preferred channel.",
    },
    he: {
      current_country:
        "מעולה! הבנת המיקום שלך עוזרת לנו להתאים את ההמלצות עבורך.",
      citizenship:
        "תודה ששיתפת. האזרחות שלך יכולה להשפיע על השלכות מס ואפשרויות בעלות בנכסים במדינות שונות.",
      budget:
        "טווח תקציב מצוין! זה פותח הזדמנויות מעניינות רבות בשווקים שונים.",
      purpose:
        "מושלם, זה עוזר לנו להבין את העדיפויות שלך ולמצוא את הנכסים הנכונים למטרותיך.",
      location: "בחירות נהדרות! שווקים אלה מציעים הזדמנויות השקעה מגוונות.",
      property_type:
        "בחירה טובה! נתמקד במציאת האפשרויות הטובות ביותר בקטגוריות אלה.",
      timeline:
        "תודה שנתת לנו לדעת את לוח הזמנים שלך. זה עוזר לנו לתעדף את הרישומים הרלוונטיים ביותר.",
      risk_tolerance:
        "הבנת רמת הנוחות שלך עם סיכון עוזרת לנו להתאים לך הזדמנויות השקעה מתאימות.",
      experience:
        "נרשם! נתאים את ההמלצות והמשאבים שלנו בהתאם לרמת הניסיון שלך.",
      special_requirements:
        "תודה ששיתפת את הצרכים הספציפיים שלך. נזכור אותם בעת ההתאמה לנכסים ואנשי מקצוע.",
      contact_preference:
        "מושלם! נדאג ליצור קשר דרך הערוץ המועדף עליך.",
    },
  };

  const fallbackLocale = locale === "he" ? "he" : "en";
  const message =
    responses[fallbackLocale][questionId] ||
    (fallbackLocale === "he"
      ? "תודה על התשובה שלך!"
      : "Thank you for your answer!");

  return { message };
}

export async function generateSpecialRequirementsInsights(
  requirements: string,
  context: OnboardingContext,
  locale: string = "en"
): Promise<AIResponse> {
  const contextSummary = buildContextSummary(context);

  const prompt = `
The user is looking for real estate and has shared these special requirements or preferences:
"${requirements}"

Their profile:
${contextSummary}

Language: ${locale === "he" ? "Hebrew" : "English"}

Provide a brief, helpful response (2-3 sentences) that:
1. Acknowledges their requirements
2. Offers a relevant insight or suggestion based on their needs
3. Mentions how GlobalNest can help with these specific requirements

${locale === "he" ? "Respond in Hebrew." : "Respond in English."}
`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return {
      message: text.trim(),
    };
  } catch (error) {
    console.error("AI insights generation failed:", error);
    return getFallbackResponse("special_requirements", requirements, locale);
  }
}
