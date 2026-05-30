export type GalleryPhoto = {
  src: string;
  alt: string;
  label: string;
  tone: "hero" | "portrait" | "stage" | "casual";
  featured?: boolean;
};

const driveImage = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: driveImage("1AzWL5zxhUWd2l4_Clk6SfR-eNsjwuRmg"),
    alt: "夏凪里季さんのギャラリー写真",
    label: "Cover",
    tone: "hero",
    featured: true
  },
  {
    src: driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"),
    alt: "夏凪里季さんの笑顔の写真",
    label: "Portrait",
    tone: "portrait"
  },
  {
    src: driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16"),
    alt: "夏凪里季さんの舞台写真",
    label: "Moment",
    tone: "casual"
  },
  {
    src: driveImage("1uaNFIH1HkefOjn06tXwSJZvq8eIGjLBA"),
    alt: "夏凪里季さんのポートレート",
    label: "Scene",
    tone: "stage"
  },
  {
    src: driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"),
    alt: "夏凪里季さんの日常の写真",
    label: "Style",
    tone: "portrait"
  },
  {
    src: driveImage("1FM8cYikXk6Z2TtAoHCpBkq_XOT_AmqbS"),
    alt: "夏凪里季さんの自然な表情の写真",
    label: "Smile",
    tone: "casual"
  }
];
