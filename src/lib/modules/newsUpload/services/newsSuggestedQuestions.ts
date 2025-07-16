import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import Langfuse from 'langfuse';
import { z } from 'zod';
import { updateNewsWithSuggestedQuestions } from '../api/newsApi';

export const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL,
});

export async function generateSuggestedQuestions({
  answer,
  title,
  parentTraceId,
}: {
  answer: string;
  title: string;
  parentTraceId: string;
}): Promise<{ suggestedQuestions: string[] }> {
  const formattedAnswer = JSON.stringify(answer);

  const span = langfuse
    .trace({
      id: parentTraceId,
    })
    .span({
      name: 'suggestion-generation',
      input: {
        content: formattedAnswer,
        title,
      },
    });

  const suggesterAgentPrompt = await langfuse.getPrompt('suggesterAgentNews');

  const promptInput: Record<'content', string> = {
    content: `### title: ${title} ### Content: ${answer}`,
  };

  const a = suggesterAgentPrompt.compile(promptInput);
  console.log({ a });
  const generation = span.generation({
    name: 'suggest-news-questions',
    model: 'gpt-4.1',
    modelParameters: {
      temperature: 0.7,
    },
    input: {
      messages: [
        { role: 'system', content: suggesterAgentPrompt.prompt },
        { role: 'user', content: suggesterAgentPrompt.compile(promptInput) },
      ],
      metadata: promptInput,
    },
    metadata: {
      tags: ['news-question-suggestion'],
      pipelineStep: 'news-question-suggestion',
    },
  });

  const { object } = await generateObject({
    model: openai('gpt-4.1'),
    schema: z.object({
      question_1: z.string(),
      question_2: z.string(),
      question_3: z.string(),
    }),
    messages: [
      { role: 'system', content: suggesterAgentPrompt.prompt },
      { role: 'user', content: suggesterAgentPrompt.compile(promptInput) },
    ],
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'queryNewsSuggestion',
      metadata: {
        langfuseTraceId: parentTraceId,
        langfuseUpdateParent: false,
        tags: ['news-question-suggestion'],
        pipelineStep: 'news-question-suggestion',
      },
    },
  });

  generation.end({
    output: object,
    metadata: {
      success: true,
    },
  });

  span.end({
    output: object,
    metadata: { success: true },
  });

  return {
    suggestedQuestions: [
      object.question_1,
      object.question_2,
      object.question_3,
    ],
  };
}

export async function generateAndStoreSuggestedQuestions({
  newsId,
  answer,
  title,
  parentTraceId,
}: {
  newsId: string;
  answer: string;
  title: string;
  parentTraceId: string;
}): Promise<{ suggestedQuestions: string[] }> {
  try {
    console.log(`🤔 Generating suggested questions for news ${newsId}...`);

    // Generate suggested questions
    const { suggestedQuestions } = await generateSuggestedQuestions({
      answer,
      title,
      parentTraceId,
    });

    // Store in Supabase
    await updateNewsWithSuggestedQuestions(newsId, suggestedQuestions);

    console.log(
      `✅ Successfully generated and stored suggested questions for news ${newsId}:`,
      suggestedQuestions,
    );

    return { suggestedQuestions };
  } catch (error) {
    console.error(
      `❌ Failed to generate and store suggested questions for news ${newsId}:`,
      error,
    );
    throw error;
  }
}
