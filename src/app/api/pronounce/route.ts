// src/app/api/pronounce/route.ts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextRequest, NextResponse } from "next/server";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const phoneticMap: Record<string, string> = {
  "phototropism": "photo troh pizim",
  "gravitropism": "grava trohpism",
  "hydrotropism": "hydro tropizm",
  "tropism": "trohpism",
  "tropisms": "trohpisms",
  "auxin": "Awkcen",
  "stomata": "stoh-MAH-tah",
  "chlorophyll": "KLOR-oh-fill",
  "photosynthesis": "photo tropsims",
  "xylem": "ZY-lum",
  "phloem": "FLOW-em",
  "petiole": "PET-ee-ole",
  "vascular": "VAS-kyoo-ler",
  "transpiration": "tran-spih-RAY-shun",
  "germination": "jer-mih-NAY-shun",
  "pollination": "pah-lih-NAY-shun",
};

export async function POST(req: NextRequest) {
  try {
    const { word } = await req.json();
    if (!word) return NextResponse.json({ error: "No word provided" }, { status: 400 });

    const spoken = phoneticMap[word.toLowerCase()] ?? word;

    const audio = await client.textToSpeech.convert("n7Wi4g1bhpw4Bs8HK5ph", {
      text: spoken,
      modelId: "eleven_turbo_v2_5",
      outputFormat: "mp3_44100_128",
    });

    const chunks: Uint8Array[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("ElevenLabs error:", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}