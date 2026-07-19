import { getResponsiveImageProps } from "../lib/responsiveImage";

type ArchivePhotoFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** 記事冒頭のメインビジュアルなどは eager を推奨 */
  loading?: "lazy" | "eager";
};

// 受賞写真など「絶対に切り抜かない」写真専用の表示枠。
// aspect-[3/4] の枠に object-contain で収めるので、どの画面幅でも全身が欠けない。
export function ArchivePhotoFrame({
  src,
  alt,
  sizes,
  className = "",
  loading = "lazy"
}: ArchivePhotoFrameProps) {
  return (
    <div className={`aspect-[3/4] w-full overflow-hidden bg-porcelain ${className}`}>
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
