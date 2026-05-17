const CONFIG = {
  eventsSheetName: "予定管理",
  linksSheetName: "SNSリンク",
  profileSheetName: "プロフィール",
  siteName: "Riri Schedule 2026",
  label: "Fan Schedule"
};

const CATEGORY_MAP = {
  "舞台": "stage",
  "ラジオ": "radio",
  "テレビ": "tv",
  "イベント": "event",
  "WEB": "web",
  "特別": "birthday"
};

const LINK_KIND_MAP = {
  "SNS": "x",
  "配信": "showroom",
  "まとめ": "link",
  "コンテンツ": "note",
  "掲載": "web",
  "動画": "youtube"
};

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventsSheet = ss.getSheetByName(CONFIG.eventsSheetName);
  const linksSheet = ss.getSheetByName(CONFIG.linksSheetName);
  const profileSheet = ss.getSheetByName(CONFIG.profileSheetName);

  const events = sheetToObjects(eventsSheet)
    .filter(row => isOn(row["表示"]))
    .filter(row => row["event_id"])
    .map(normalizeEvent);

  const links = linksSheet
    ? sheetToObjects(linksSheet)
        .filter(row => isOn(row["表示"]))
        .map(normalizeLink)
    : [];

  const profile = profileSheet ? profileToObject(profileSheet) : {};

  return jsonOutput({
    siteName: CONFIG.siteName,
    label: CONFIG.label,
    updatedAt: new Date().toISOString(),
    events,
    links,
    profile
  });
}

function normalizeEvent(row) {
  return {
    id: row["event_id"],
    visible: isOn(row["表示"]),
    status: row["ステータス"] === "終了済み" ? "past" : "upcoming",
    important: isOn(row["重要"]),
    category: CATEGORY_MAP[row["種別"]] || "event",
    title: String(row["タイトル"] || ""),
    shortTitle: String(row["短縮名"] || row["タイトル"] || ""),
    startAt: toIsoLike(row["開始日時"]),
    endAt: toIsoLike(row["終了日時"]),
    displayDate: String(row["表示日"] || ""),
    venue: String(row["会場"] || ""),
    summary: String(row["説明"] || ""),
    badges: splitBadges(row["バッジ"]),
    image: String(row["画像パス"] || ""),
    ticketUrl: String(row["チケットURL"] || ""),
    streamingUrl: String(row["配信URL"] || ""),
    detailUrl: String(row["詳細URL"] || ""),
    snsUrl: String(row["SNS URL"] || ""),
    memo: String(row["メモ"] || ""),
    updatedAt: toIsoLike(row["最終更新"])
  };
}

function normalizeLink(row) {
  return {
    label: String(row["ラベル"] || ""),
    type: String(row["種別"] || ""),
    handle: String(row["ハンドル"] || ""),
    url: String(row["URL"] || ""),
    description: String(row["説明"] || ""),
    kind: LINK_KIND_MAP[row["種別"]] || guessLinkKind(row["ラベル"], row["URL"])
  };
}

function sheetToObjects(sheet) {
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  const headers = values.shift();

  return values.map(row => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item;
  });
}

function profileToObject(sheet) {
  return sheetToObjects(sheet).reduce((profile, row) => {
    if (row["項目"]) profile[row["項目"]] = row["内容"];
    return profile;
  }, {});
}

function splitBadges(value) {
  return String(value || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function isOn(value) {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function toIsoLike(value) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function guessLinkKind(label, url) {
  const text = `${label || ""} ${url || ""}`.toLowerCase();
  if (text.includes("instagram")) return "instagram";
  if (text.includes("tiktok")) return "tiktok";
  if (text.includes("showroom")) return "showroom";
  if (text.includes("youtube")) return "youtube";
  if (text.includes("note")) return "note";
  if (text.includes("lit.link")) return "link";
  if (text.includes("x.com") || text.includes("twitter")) return "x";
  return "web";
}

function jsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
