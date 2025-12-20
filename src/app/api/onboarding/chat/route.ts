import { NextRequest, NextResponse } from "next/server";
import {
  generateAIResponse,
  generateSpecialRequirementsInsights,
  type OnboardingContext,
} from "@/lib/onboarding/ai-chat";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      questionId,
      answer,
      context,
      locale = "en",
      type = "response",
    } = body as {
      questionId: string;
      answer: string | string[];
      context: OnboardingContext;
      locale?: string;
      type?: "response" | "insights";
    };

    if (!questionId || answer === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: questionId and answer" },
        { status: 400 }
      );
    }

    let result;

    if (type === "insights" && typeof answer === "string") {
      // Generate detailed insights for open-text special requirements
      result = await generateSpecialRequirementsInsights(
        answer,
        context || {},
        locale
      );
    } else {
      // Generate standard AI response
      result = await generateAIResponse(
        questionId,
        answer,
        context || {},
        locale
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Onboarding chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
