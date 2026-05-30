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
  { src: driveImage("1-tnOZvazIjzWiOBCrzVdUhaY9mFXCkNp"), alt: "夏凪里季さんのメイン写真", label: "Cover", tone: "hero", featured: true },
  { src: driveImage("1MhtYW0KPCOf0E4NITJwUZGlSgj4k3JDQ"), alt: "夏凪里季さんのポートレート", label: "Portrait", tone: "portrait" },
  { src: driveImage("1D9t__MTdyoBzSHyK9-gxTWetikuHYnZ7"), alt: "夏凪里季さんの写真", label: "Moment", tone: "casual" },
  { src: driveImage("1tX415Tt5YTCCh9gjnzThVU9djIKP0t-1"), alt: "夏凪里季さんの写真", label: "Scene", tone: "stage" },
  { src: driveImage("1AzWL5zxhUWd2l4_Clk6SfR-eNsjwuRmg"), alt: "夏凪里季さんの写真", label: "Style", tone: "portrait" },
  { src: driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"), alt: "夏凪里季さんの写真", label: "Smile", tone: "casual" },
  { src: driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16"), alt: "夏凪里季さんの写真", label: "Acting", tone: "stage" },
  { src: driveImage("1uaNFIH1HkefOjn06tXwSJZvq8eIGjLBA"), alt: "夏凪里季さんの写真", label: "Light", tone: "hero" },
  { src: driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"), alt: "夏凪里季さんの写真", label: "Zine", tone: "portrait" },
  { src: driveImage("1FM8cYikXk6Z2TtAoHCpBkq_XOT_AmqbS"), alt: "夏凪里季さんの写真", label: "Daily", tone: "casual" },
  { src: driveImage("1iAMrOBTgGraMgyLXibw93bA3knmDPnO6"), alt: "夏凪里季さんの写真", label: "Stage", tone: "stage" },
  { src: driveImage("1eIuhuqSpiFrztLnHS9vT3zFXYV-d6vn8"), alt: "夏凪里季さんの写真", label: "Archive", tone: "hero" }
];
