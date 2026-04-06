// src/app/api/pronounce/route.ts
import { NextRequest, NextResponse } from "next/server";

const phoneticMap: Record<string, string> = {
  "phototropism": "photo troh pizim",
  "gravitropism": "grava trohpism",
  "hydrotropism": "hydro tropizm",
  "tropism": "trohpism",
  "tropisms": "trohpisms",
  "auxin": "Awkcen",
  "stomata": "stoh-MAH-tah",
  "chlorophyll": "KLOR-oh-fill",
  "photosynthesis": "photo synthesis",
  "xylem": "ZY-lum",
  "phloem": "FLOW-em",
  "petiole": "PET-ee-ole",
  "vascular": "VAS-kyoo-ler",
  "transpiration": "tran-spih-RAY-shun",
  "germination": "jer-mih-NAY-shun",
  "pollination": "pah-lih-NAY-shun",
  "translocation": "trans-loh-KAY-shun",
  "chloroplast": "KLOR-oh-plast",
  "chloroplasts": "KLOR-oh-plasts",
  "vacuole": "VAK-yoo-ole",
};

export async function POST(req: NextRequest) {
  try {
    const { word } = await req.json();
    if (!word) return NextResponse.json({ error: "No word provided" }, { status: 400 });

    const spoken = phoneticMap[word.toLowerCase()] ?? word;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/n7Wi4g1bhpw4Bs8HK5ph`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text: spoken,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", err);
      return NextResponse.json({ error: "TTS failed" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();

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