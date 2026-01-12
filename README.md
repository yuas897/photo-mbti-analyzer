# Photo MBTI Analyzer 📸

写真をアップロードするだけで、AIがあなたのMBTIタイプを診断するWebアプリケーションです。

## 機能

- 📷 写真のドラッグ&ドロップアップロード
- 🤖 Gemini AIによるMBTI診断
- 🎨 タイプ別カラーで結果表示
- 🐦 X（Twitter）へのワンクリックシェア

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **AI**: Google Gemini API
- **デプロイ**: Vercel

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/photo-mbti-analyzer.git
cd photo-mbti-analyzer
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. Gemini APIキーを取得

1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. 「Get API key」をクリック
3. 新しいAPIキーを作成してコピー

### 4. 環境変数を設定

```bash
# .env.local ファイルを作成
cp .env.example .env.local

# .env.local を編集してAPIキーを設定
GEMINI_API_KEY=your_actual_api_key_here
```

### 5. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリを確認できます。

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### 方法2: GitHubと連携

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com) にログイン
3. 「New Project」→ GitHubリポジトリを選択
4. 環境変数を設定:
   - `GEMINI_API_KEY`: 取得したAPIキー
5. 「Deploy」をクリック

## 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini APIのキー | ✅ |

## プロジェクト構造

```
photo-mbti-analyzer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts    # API Route (サーバーサイド)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # メインページ
│   ├── components/
│   │   ├── ImageUploader.tsx
│   │   ├── Loading.tsx
│   │   ├── ResultCard.tsx
│   │   └── ShareButton.tsx
│   └── lib/
│       └── mbti-types.ts       # MBTI型定義
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## セキュリティ

- APIキーはサーバーサイド（API Routes）でのみ使用
- クライアントにAPIキーは露出しません
- 画像データはサーバーに保存されません

## カスタマイズ

### 診断プロンプトの変更

`src/app/api/analyze/route.ts` の `PROMPT` 変数を編集することで、
診断の観点や出力形式をカスタマイズできます。

### デザインのカスタマイズ

`tailwind.config.ts` でカラーやアニメーションを調整できます。

## ライセンス

MIT

## 注意事項

- この診断はエンターテイメント目的です
- AIの判定は参考程度にお楽しみください
- Gemini APIの利用規約を遵守してください
