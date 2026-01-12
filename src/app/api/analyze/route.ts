import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `あなたは写真から性格を分析する専門家です。
この写真に写っている人物の以下の要素を総合的に分析してください：

- 表情（笑顔、真剣、リラックスなど）
- 姿勢やボディランゲージ
- 服装のスタイル（フォーマル、カジュアル、個性的など）
- 背景や環境（自然、都会、室内など）
- 全体的な雰囲気

これらの要素から性格特性を推測し、MBTIの16タイプの中から最も適合するタイプを1つ選んでください。

【重要】必ず以下のJSON形式のみで回答してください。他の文章は一切含めないでください。

{
  "type": "XXXX",
  "typeName": "タイプの日本語名（例：建築家、論理学者など）",
  "description": "この人の性格についての説明を100-150文字程度で",
  "traits": ["特性1", "特性2", "特性3", "特性4", "特性5"],
  "reasoning": "写真のどの要素からこの判定に至ったかの説明を80文字程度で"
}

MBTIタイプ一覧：
- INTJ（建築家）, INTP（論理学者）, ENTJ（指揮官）, ENTP（討論者）
- INFJ（提唱者）, INFP（仲介者）, ENFJ（主人公）, ENFP（広報運動家）
- ISTJ（管理者）, ISFJ（擁護者）, ESTJ（幹部）, ESFJ（領事官）
- ISTP（巨匠）, ISFP（冒険家）, ESTP（起業家）, ESFP（エンターテイナー）`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "APIキーが設定されていません。環境変数 GEMINI_API_KEY を設定してください。" },
        { status: 500 }
      );
    }

    const { image, mimeType } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "画像データが必要です" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      PROMPT,
      {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // JSONを抽出（マークダウンのコードブロックがある場合も対応）
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    } else {
      // コードブロックがない場合、最初の { から最後の } までを抽出
      const startIndex = text.indexOf("{");
      const endIndex = text.lastIndexOf("}");
      if (startIndex !== -1 && endIndex !== -1) {
        jsonStr = text.slice(startIndex, endIndex + 1);
      }
    }

    try {
      const analysisResult = JSON.parse(jsonStr);
      
      // バリデーション
      if (!analysisResult.type || !analysisResult.typeName || !analysisResult.description) {
        throw new Error("必須フィールドが不足しています");
      }

      return NextResponse.json(analysisResult);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw text:", text);
      return NextResponse.json(
        { error: "AIからの応答を解析できませんでした。別の写真でお試しください。" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Analysis error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("SAFETY")) {
        return NextResponse.json(
          { error: "この画像は分析できませんでした。別の写真をお試しください。" },
          { status: 400 }
        );
      }
      if (error.message.includes("Could not find person") || error.message.includes("人物")) {
        return NextResponse.json(
          { error: "写真から人物を検出できませんでした。人物が写っている写真をアップロードしてください。" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "分析中にエラーが発生しました。しばらく待ってから再度お試しください。" },
      { status: 500 }
    );
  }
}
