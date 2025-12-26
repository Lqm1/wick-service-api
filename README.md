# Wick Service API

Wick Service の非公式 API クライアントライブラリ（Deno/TypeScript）

## 概要

このライブラリは、Wick Service の API
に対する非公式のクライアント実装です。認証、ユーザー管理、SNS機能（投稿、検索、いいねなど）へのアクセスを提供します。

## 特徴

- 🔐 **認証機能**: ゲストサインアップ/サインイン、通常サインアップ/サインイン
- 👤 **ユーザー管理**: プロフィール取得・更新、フォロー機能、検索
- 📱 **SNS機能**: 投稿作成、投稿取得、検索、いいね、トレンド
- 🍪 **セッション管理**: Cookie の自動管理
- 🌐 **プロキシ対応**: オプションでプロキシサーバーを使用可能

## インストール

### JSR (Deno/Node.js)

```typescript
import { WickService } from "jsr:@lami/wick-service-api";
```

または、`deno.json` に追加：

```json
{
  "imports": {
    "wick-service-api": "jsr:@lami/wick-service-api"
  }
}
```

### NPM (Node.js/Bun)

```bash
npm install wick-service-api
```

```typescript
import { WickService } from "wick-service-api";
```

## 使い方

### 基本的な使用例

```typescript
import { WickService } from "wick-service-api";

// サービスインスタンスの作成
const service = new WickService();

// ゲストサインアップ
const signUpResponse = await service.auth.guestSignUp();
console.log("Access Token:", signUpResponse.data.accessToken);

// ユーザー情報の取得
const userDetail = await service.user.getUserDetail({ userId: "user-id" });
console.log("User:", userDetail.data);
```

### 認証

```typescript
// ゲストサインアップ
const guestResponse = await service.auth.guestSignUp();
const { accessToken, guestSecret, user } = guestResponse.data;

// ゲストサインイン
const signInResponse = await service.auth.guestSignIn({
  guestSecret: guestSecret,
  screenWidth: 1920,
  deviceId: null,
});

// 通常サインアップ
const signUpResponse = await service.auth.signUp({
  userId: user.id,
  email: "user@example.com",
  password: "password123",
  username: "username",
  nickname: "Nickname",
  // ...その他のフィールド
});

// 通常サインイン
const signInRes = await service.auth.signIn({
  email: "user@example.com",
  password: "password123",
  screenWidth: 1920,
  deviceId: null,
});
```

### SNS 機能

```typescript
// 投稿を作成
const post = await service.sns.createPost({
  userId: "user-id",
  body: "Hello, Wick!",
  hasPostMemory: false,
  isUseAI: false,
  isSensitive: false,
  needMonetization: false,
});

// タイムラインを取得
const posts = await service.sns.getPosts({
  userId: "user-id",
  limit: 20,
  offset: 0,
});

// 投稿を検索
const searchResults = await service.sns.search({
  keyword: "検索キーワード",
  limit: 20,
  offset: 0,
});

// いいね
const favorite = await service.sns.favorite({
  userId: "user-id",
  postId: "post-id",
});

// トレンド投稿を取得
const trendPosts = await service.sns.trendPosts({
  userId: "user-id",
  limit: 20,
  offset: 0,
});
```

### ユーザー管理

```typescript
// ユーザー詳細を取得
const userDetail = await service.user.getUserDetail({
  userId: "user-id",
});

// ユーザーを検索
const searchUsers = await service.user.searchUsers({
  keyword: "username",
  limit: 20,
  offset: 0,
});

// ユーザーをフォロー
const follow = await service.user.follow({
  userId: "your-user-id",
  targetUserId: "target-user-id",
});

// プロフィールを更新
const updateUser = await service.user.updateUser({
  userId: "user-id",
  nickname: "New Nickname",
  biography: "Bio",
  // ...その他のフィールド
});
```

### プロキシの使用

```typescript
// プロキシURLを指定してサービスを作成
const service = new WickService("http://proxy.example.com:8080");
```

## API 構造

### `WickService`

メインクラス。以下のサブサービスを提供：

- `auth`: 認証関連の API
- `user`: ユーザー管理関連の API
- `sns`: SNS機能関連の API

### `auth` メソッド

- `guestSignUp()` - ゲストとしてサインアップ
- `guestSignIn(request)` - ゲストとしてサインイン
- `signUp(request)` - 通常のサインアップ
- `signIn(request)` - 通常のサインイン
- `checkTerms(request)` - 利用規約の確認
- `confirm(request)` - 確認コードの送信

### `user` メソッド

- `versions()` - アプリバージョン情報の取得
- `getUserDetail(request)` - ユーザー詳細の取得
- `updateUser(request)` - ユーザー情報の更新
- `searchUsers(request)` - ユーザーの検索
- `follow(request)` - ユーザーをフォロー
- `unreadTabs()` - 未読タブの取得
- その他多数のメソッド

### `sns` メソッド

- `createPost(request)` - 投稿の作成
- `getPosts(request)` - 投稿一覧の取得
- `getPostDetail(request)` - 投稿詳細の取得
- `getUserPosts(request)` - 特定ユーザーの投稿取得
- `search(request)` - 投稿の検索
- `favorite(request)` - いいね
- `trendPosts(request)` - トレンド投稿の取得

## 開発

### テストの実行

```bash
deno test --allow-net
```

### 必要な権限

- `--allow-net`: API リクエストのため

## ライセンス

GNU General Public License v3.0 (GPL-3.0)

詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

## 削除リクエストへの対応

本プロジェクトまたは公開されたパッケージの削除を希望される場合は、以下の方法でご連絡ください：

- **GitHub Issues**: このリポジトリの Issues セクションで削除リクエストを作成
- **直接連絡**: プロジェクトメンテナーへ直接ご連絡

削除リクエストは速やかに対応いたします。正当な理由がある場合、24-48時間以内にリポジトリおよび公開パッケージを削除します。

## 免責事項

**重要: 本ライブラリは非公式なものであり、Wick Service
の公式なサポートや承認を受けていません。**

- 本ライブラリは教育および研究目的で開発されています
- Wick Service の利用規約に違反する使用は推奨しません
- 本ライブラリの使用によって生じたいかなる損害についても、開発者は一切の責任を負いません
- API
  の仕様は予告なく変更される可能性があり、本ライブラリが動作しなくなる場合があります
- 本ライブラリを使用する際は、Wick Service
  の利用規約およびプライバシーポリシーを遵守してください
- 過度なリクエストやスパム行為は避け、適切なレート制限を実装してください
- 本ライブラリの使用は自己責任でお願いします

**USE AT YOUR OWN RISK**
