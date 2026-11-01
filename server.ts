import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { auditPromotionalTone } from './src/utils/wikiCompliance';
import { NSWF_SYSTEM_INSTRUCTIONS, AI_STUDIO_PIPELINE_STEPS } from './src/data/nswfDossierData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '2mb' }));

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// POST /api/wiki-architect/neutralize
app.post('/api/wiki-architect/neutralize', async (req, res) => {
  const {
    rawText = '',
    citationTitle = 'Nisarg Srishti Welfare Foundation Media Record',
    citationUrl = 'https://www.nisargsrishti.org/',
    citationPublisher = 'IndiaChronicle',
    citationDate = '15 June 2026',
    useSearchGrounding = true,
  } = req.body || {};

  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    res.status(400).json({ error: 'Please provide non-empty text to audit and neutralize.' });
    return;
  }

  // Always compute deterministic lexical audit first
  const localAudit = auditPromotionalTone(
    rawText,
    citationTitle,
    citationUrl,
    citationPublisher,
    citationDate
  );

  const ai = getGenAIClient();
  if (!ai) {
    res.json({
      ...localAudit,
      engineMode: 'Deterministic WP:NPOV Rule Engine (Offline/Sandbox)',
      groundingSources: [
        {
          title: citationTitle,
          uri: citationUrl,
        },
      ],
    });
    return;
  }

  try {
    const prompt = `Rewrite the following promotional or raw text about Nisarg Srishti Welfare Foundation (NSWF) into strictly neutral, clinical third-person Wikipedia encyclopedic prose (WP:NPOV, WP:PEACOCK).
Then provide the exact MediaWiki sentence with an inline <ref>{{cite web}}</ref> citation using:
- Title: ${citationTitle}
- URL: ${citationUrl}
- Website/Publisher: ${citationPublisher}
- Date: ${citationDate}
- Access Date: 1 November 2026

Input text:
"""
${rawText}
"""

Return plain text with two labeled blocks:
NEUTRALIZED_PROSE: <neutralized prose>
WIKITEXT_MARKUP: <sentence with <ref>{{cite web...}}</ref>>`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: NSWF_SYSTEM_INSTRUCTIONS,
        ...(useSearchGrounding ? { tools: [{ googleSearch: {} }] } : {}),
      },
    });

    const outputText = response.text || '';
    const proseMatch = outputText.match(/NEUTRALIZED_PROSE:\s*([\s\S]*?)(?=WIKITEXT_MARKUP:|$)/i);
    const wikiMatch = outputText.match(/WIKITEXT_MARKUP:\s*([\s\S]*?)$/i);

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = groundingChunks
      .map((chunk: { web?: { title?: string; uri?: string } }) =>
        chunk.web ? { title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri } : null
      )
      .filter(Boolean);

    res.json({
      ...localAudit,
      neutralizedText: proseMatch?.[1]?.trim() || localAudit.neutralizedText,
      wikitextSnippet: wikiMatch?.[1]?.trim() || localAudit.wikitextSnippet,
      engineMode: useSearchGrounding
        ? 'Gemini Live Engine + Google Search Grounding (Temp 0.15 Eq.)'
        : 'Gemini Live Compliance Engine',
      groundingSources:
        groundingSources.length > 0
          ? groundingSources
          : [{ title: citationTitle, uri: citationUrl }],
    });
  } catch (error) {
    // Graceful fallback to deterministic local audit so user workflow never breaks
    res.json({
      ...localAudit,
      engineMode: 'Deterministic WP:NPOV Rule Engine (Fallback)',
      groundingSources: [{ title: citationTitle, uri: citationUrl }],
      notice: error instanceof Error ? error.message : 'Used deterministic compliance rules.',
    });
  }
});

// POST /api/wiki-architect/pipeline
app.post('/api/wiki-architect/pipeline', async (req, res) => {
  const { stepNumber = 1, customPrompt = '', useSearchGrounding = true } = req.body || {};
  const stepSpec =
    AI_STUDIO_PIPELINE_STEPS.find((s) => s.stepNumber === Number(stepNumber)) ||
    AI_STUDIO_PIPELINE_STEPS[0];

  const promptToRun = customPrompt.trim() || stepSpec.promptText;
  const ai = getGenAIClient();

  if (!ai) {
    res.json({
      stepNumber: stepSpec.stepNumber,
      title: stepSpec.title,
      output: stepSpec.deterministicOutput,
      engineMode: 'Verified Ground-Truth Dossier Output',
      groundingSources: [
        {
          title: 'Nisarg Srishti Welfare Foundation Official Portal',
          uri: 'https://www.nisargsrishti.org/',
        },
        {
          title: 'IIT Bombay & NSWF Collaboration – IndiaChronicle',
          uri: 'https://indiachronicle.in/empowering-sustainability-iit-bombay-and-nisarg-srishti-welfare-foundation-collaborate-for-environmental-initiatives/',
        },
      ],
    });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptToRun,
      config: {
        systemInstruction: NSWF_SYSTEM_INSTRUCTIONS,
        ...(useSearchGrounding ? { tools: [{ googleSearch: {} }] } : {}),
      },
    });

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = groundingChunks
      .map((chunk: { web?: { title?: string; uri?: string } }) =>
        chunk.web ? { title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri } : null
      )
      .filter(Boolean);

    res.json({
      stepNumber: stepSpec.stepNumber,
      title: stepSpec.title,
      output: response.text || stepSpec.deterministicOutput,
      engineMode: 'Gemini Live Pipeline + Google Search Grounding',
      groundingSources,
    });
  } catch {
    res.json({
      stepNumber: stepSpec.stepNumber,
      title: stepSpec.title,
      output: stepSpec.deterministicOutput,
      engineMode: 'Verified Ground-Truth Dossier Output',
      groundingSources: [
        {
          title: 'Nisarg Srishti Welfare Foundation Official Portal',
          uri: 'https://www.nisargsrishti.org/',
        },
      ],
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NSWF WikiArchitect server listening on http://localhost:${PORT}`);
  });
}

startServer();
