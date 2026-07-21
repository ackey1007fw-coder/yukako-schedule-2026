import { getResponsiveImageProps } from "../lib/responsiveImage";

type ArchivePhotoFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  aspectRatio?: "3/4" | "9/16";
  /** 記事冒頭のメインビジュアルなどは eager を推奨 */
  loading?: "lazy" | "eager";
};

// 受賞写真など「絶対に切り抜かない」写真専用の表示枠。
// 通常は3:4、ストーリー画像は9:16の枠にobject-containで収め、内容を欠けさせない。
export function ArchivePhotoFrame({
  src,
  alt,
  sizes,
  className = "",
  aspectRatio = "3/4",
  loading = "lazy"
}: ArchivePhotoFrameProps) {
  return (
    <div
      className={`${
        aspectRatio === "9/16" ? "aspect-[9/16]" : "aspect-[3/4]"
      } w-full overflow-hidden bg-porcelain ${className}`}
    >
      <img
        {...getResponsiveImageProps(src, sizes)}
        alt={alt}
        loading={loading}
        decoding="async"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}
