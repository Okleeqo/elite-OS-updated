import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    'OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file'
  );
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export interface GeneratedGoal {
  id: string;
  goal: string;
  metrics: string[];
  timeline: string;
}

export interface GeneratedAction {
  id: string;
  action: string;
  description: string;
  expectedOutcome: string;
}

export interface Strategy {
  id: string;
  strategy: string;
  description: string;
  metrics: string[];
  tools: string[];
  implementation: string[];
}

export interface DeliveryParameters {
  frequency: 'weekly' | 'monthly' | 'quarterly';
  deliveryMethod: 'video-call' | 'recorded-video' | 'email-report';
  tools: string[];
}

export class OpenAIError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

async function handleOpenAIError(error: any): Promise<never> {
  if (error.error?.type === 'insufficient_quota') {
    throw new OpenAIError(
      'API quota exceeded. Please check your OpenAI API key and billing status.',
      'QUOTA_EXCEEDED',
      429
    );
  }
  
  throw new OpenAIError(
    error.message || 'An error occurred while processing your request.',
    error.error?.type || 'UNKNOWN_ERROR',
    error.status
  );
}

export async function generateGoal(gaps: string): Promise<GeneratedGoal[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Fortune 500 CFO with extensive experience in strategic financial advisory and implementation. Provide sophisticated, measurable goals with clear success metrics."
        },
        {
          role: "user",
          content: `Generate SMART financial goals for these gaps: "${gaps}"`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content generated");

    const parsedContent = JSON.parse(content);
    if (!Array.isArray(parsedContent)) {
      throw new Error("Generated content is not an array");
    }

    return parsedContent.map(goal => ({
      id: Math.random().toString(36).substr(2, 9),
      ...goal
    }));
  } catch (error) {
    return handleOpenAIError(error);
  }
}

export async function generateActions(goals: string): Promise<GeneratedAction[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Fortune 500 CFO with extensive experience in strategic financial advisory and implementation. Provide sophisticated, actionable strategies with measurable outcomes."
        },
        {
          role: "user",
          content: `Generate strategic actions for these goals: "${goals}"`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content generated");

    const parsedContent = JSON.parse(content);
    if (!Array.isArray(parsedContent)) {
      throw new Error("Generated content is not an array");
    }

    return parsedContent.map(action => ({
      id: Math.random().toString(36).substr(2, 9),
      ...action
    }));
  } catch (error) {
    return handleOpenAIError(error);
  }
}

export async function generateStrategies(
  action: string,
  parameters: DeliveryParameters
): Promise<Strategy[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Fortune 500 CFO with extensive experience in strategic financial advisory and implementation. Provide sophisticated, detailed strategies with specific tool implementations."
        },
        {
          role: "user",
          content: `Generate implementation strategies for this action: "${action}" with frequency: ${parameters.frequency}, delivery: ${parameters.deliveryMethod}, and tools: ${parameters.tools.join(', ')}`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content generated");

    const parsedContent = JSON.parse(content);
    if (!Array.isArray(parsedContent)) {
      throw new Error("Generated content is not an array");
    }

    return parsedContent.map(strategy => ({
      id: Math.random().toString(36).substr(2, 9),
      ...strategy
    }));
  } catch (error) {
    return handleOpenAIError(error);
  }
}

export async function analyzeGap(gap: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Fortune 500 CFO with extensive experience in strategic financial advisory and implementation. Analyze the provided business gap and provide detailed insights."
        },
        {
          role: "user",
          content: `Analyze this business gap and provide insights: "${gap}"`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content generated");

    return JSON.parse(content);
  } catch (error) {
    return handleOpenAIError(error);
  }
}

export async function generateGoals(gaps: string[]): Promise<any[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Fortune 500 CFO with extensive experience in strategic financial advisory and implementation. Generate specific, measurable goals for the provided business gaps."
        },
        {
          role: "user",
          content: `Generate SMART goals for these business gaps: "${gaps.join(', ')}"`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content generated");

    return JSON.parse(content);
  } catch (error) {
    return handleOpenAIError(error);
  }
}