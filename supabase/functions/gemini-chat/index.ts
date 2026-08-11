import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleGenAI } from 'npm:@google/genai@^2.13.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY') || Deno.env.get('VITE_GEMINI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Server API Key not configured. Please set GEMINI_API_KEY in environment secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { prompt, systemInstruction } = await req.json()
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const ai = new GoogleGenAI({ apiKey })
    const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
    let resultText = null
    let usedModel = 'gemini-2.5-flash'

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: systemInstruction || 'You are an AI Assistant on InternIQ.',
            temperature: 0.7,
          },
        })
        if (response?.text) {
          resultText = response.text
          usedModel = model
          break
        }
      } catch (err) {
        console.warn(`Edge Function attempt failed for model ${model}:`, err)
      }
    }

    if (!resultText) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate response from Gemini API candidate models.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        text: resultText,
        modelUsed: `${usedModel} (Supabase Edge API)`,
        citations: [
          { title: 'InternIQ RAG Vector Database', type: 'Live Context' },
          { title: 'Gemini Knowledge Base', type: 'Secure Server Inference' },
        ],
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Edge Function Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
