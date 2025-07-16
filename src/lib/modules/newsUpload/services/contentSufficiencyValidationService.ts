import OpenAI from 'openai';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ContentValidationResult {
  has_sufficient_content: boolean;
  reason?: string;
}

export async function validateContentSufficiency(
  content: string,
): Promise<ContentValidationResult> {
  try {
    const response = await openaiClient.responses.create({
      model: 'gpt-4.1',
      prompt: {
        id: 'pmpt_687737ea802481938b6d2f5ecc9d87e90a7b61da29bb82ee',
      },
      input: [
        {
          role: 'user',
          content: content,
        },
      ],
      reasoning: {},
      max_output_tokens: 2048,
    });

    // Try to parse as JSON first, if that fails, try to extract values from the string
    let result;
    try {
      result = JSON.parse(response.output_text);
    } catch {
      // If JSON parsing fails, try to extract values from the string manually
      const hasContentMatch = response.output_text.match(
        /has_sufficient_content:\s*(true|false)/i,
      );
      const reasonMatch = response.output_text.match(/reason:\s*"([^"]+)"/);

      result = {
        has_sufficient_content: hasContentMatch
          ? hasContentMatch[1].toLowerCase() === 'true'
          : false,
        reason: reasonMatch ? reasonMatch[1] : 'parsing_failed',
      };
    }

    return {
      has_sufficient_content: result.has_sufficient_content === true,
      reason: result.reason,
    };
  } catch (error) {
    console.error('Content validation error:', error);
    // Default to allowing content if validation fails
    return {
      has_sufficient_content: true,
      reason: 'validation_failed',
    };
  }
}
