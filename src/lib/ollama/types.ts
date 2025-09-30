import { z } from 'zod';

// Schema for a single model from the Ollama API
export const OllamaModelSchema = z.object({
  name: z.string(),
  model: z.string(),
  modified_at: z.string(),
  size: z.number(),
  digest: z.string(),
  details: z.object({
    parent_model: z.string(),
    format: z.string(),
    family: z.string(),
    families: z.array(z.string()).nullable(),
    parameter_size: z.string(),
    quantization_level: z.string(),
  }),
});

// Schema for the API response containing a list of models
export const OllamaTagsResponseSchema = z.object({
  models: z.array(OllamaModelSchema),
});

// Schema for a single chat response chunk from the streaming API
export const OllamaGenerateChatCompletionResponseSchema = z.object({
  model: z.string(),
  created_at: z.string(),
  message: z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  }),
  done: z.boolean(),
  total_duration: z.number().optional(),
  load_duration: z.number().optional(),
  prompt_eval_count: z.number().optional(),
  prompt_eval_duration: z.number().optional(),
  eval_count: z.number().optional(),
  eval_duration: z.number().optional(),
});


// Type definitions inferred from the schemas
export type OllamaModel = z.infer<typeof OllamaModelSchema>;
export type OllamaTagsResponse = z.infer<typeof OllamaTagsResponseSchema>;
export type OllamaGenerateChatCompletionResponse = z.infer<typeof OllamaGenerateChatCompletionResponseSchema>;
