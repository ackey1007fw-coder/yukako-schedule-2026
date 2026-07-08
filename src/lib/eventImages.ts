// イベントごとの画像は event.image のみを使う。専用の写真が無い場合は
// 空文字を返し、呼び出し側（NowProducingSection / StructuredData）に
// 「画像なし」として扱わせる（他人物の写真を代用しない）。
export function resolveEventImage(image: string | undefined) {
  return image || "";
}
