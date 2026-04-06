// src/app/api/speak/route.ts
import { NextRequest, NextResponse } from "next/server";

const VOICE_IDS: Record<string, string> = {
  fangsley: "M9UAxraM2w5tCjpOaIB0",
  gloople:  "mHX7OoPk2G45VMAuinIt",
  bloop:    "wSqOdjeNqDrHcoK0zorF",
};

export async function POST(req: NextRequest) {
  try {
    const { text, character } = await req.json();

    if (!text || !character) {
      return NextResponse.json({ error: "Missing text or character" }, { status: 400 });
    }

    const voiceId = VOICE_IDS[character];
    if (!voiceId) {
      return NextResponse.json({ error: "Unknown character" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ElevenLabs API key not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", err);
      return NextResponse.json({ error: "TTS failed" }, { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400", // cache audio 24hr — saves credits on replays
      },
    });
  } catch (err) {
    console.error("Speak route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}