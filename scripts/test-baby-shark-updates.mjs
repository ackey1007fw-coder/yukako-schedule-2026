import { validateBabySharkUpdates } from "./lib/loadArchiveData.mjs";

// 本物の活動記録は増やさず、検証ロジックだけを一時データで確認する。
const base = {
  date: "2024-03-01",
  dateLabel: "2024年3月1日",
  title: "テスト",
  body: ["本文"]
};

function expectSuccess(name, updates) {
  validateBabySharkUpdates(updates);
  console.log(`OK: ${name}`);
}

function expectFailure(name, updates, messageIncludes) {
  try {
    validateBabySharkUpdates(updates);
    throw new Error(`expected failure: ${name}`);
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes(messageIncludes)) {
      throw new Error(
        `unexpected error for ${name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    console.log(`OK: ${name} -> ${error.message}`);
  }
}

expectSuccess("異なるidで同じdateの2件", [
  { ...base, id: "a", sourceUrl: "https://example.com/a" },
  { ...base, id: "b", sourceUrl: "https://example.com/b" }
]);

expectFailure(
  "同じidの2件",
  [
    { ...base, id: "same", sourceUrl: "https://example.com/a" },
    { ...base, id: "same", sourceUrl: "https://example.com/b" }
  ],
  'duplicate update id "same"'
);

expectFailure(
  "同じsourceUrlの2件",
  [
    { ...base, id: "a", sourceUrl: "https://example.com/shared" },
    { ...base, id: "b", date: "2024-03-02", sourceUrl: "https://example.com/shared" }
  ],
  "duplicate update sourceUrl"
);

expectSuccess("sourceUrl未設定同士は重複扱いしない", [
  { ...base, id: "a" },
  { ...base, id: "b", date: "2024-03-02" }
]);

expectFailure(
  "不正なdate",
  [{ ...base, id: "bad-date", date: "2024/03/01" }],
  "YYYY-MM-DD"
);

expectFailure(
  "空のbody",
  [{ ...base, id: "empty-body", body: [] }],
  "body must not be empty"
);

expectFailure(
  "httpのsourceUrl",
  [{ ...base, id: "http-url", sourceUrl: "http://example.com/x" }],
  "https://"
);

console.log("baby-shark-updates validation tests OK");
