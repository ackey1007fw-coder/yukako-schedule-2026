import { useState } from "react";
import { Crown } from "lucide-react";
import { profile } from "../data/profile";
import { Photo } from "./Photo";

export function AvatarGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const animateAvatar = (index: number) => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActiveIndex(index));
    });
  };

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-champagne">Avatar Gallery</p>
          <h3 className="mt-1 font-display text-3xl text-ink">
            SHOWROOMアバター
          </h3>
        </div>
        <span className="border border-rosefog/30 bg-white px-3 py-2 text-xs font-bold text-ink/62">
          {profile.avatars.length}種
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {profile.avatars.map((avatar, index) => (
          <button
            type="button"
            key={avatar.name}
            onClick={() => animateAvatar(index)}
            onAnimationEnd={() => setActiveIndex(null)}
            aria-label={`${avatar.name}を動かす`}
            className={`avatar-card group relative overflow-hidden border bg-white p-3 text-left transition hover:-translate-y-1 hover:shadow-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
              avatar.featured ? "border-champagne/70" : "border-rosefog/25"
            } ${activeIndex === index ? "avatar-card-active" : ""}`}
          >
            <div className={activeIndex === index ? "avatar-character-active" : ""}>
              <Photo
                src={avatar.image}
                alt={avatar.name}
                className="aspect-square border border-rosefog/15"
                imageClassName="object-contain p-4"
                loading="eager"
              />
            </div>
            <div className="mt-3 flex min-h-10 items-center justify-between gap-2">
              <p className="text-sm font-bold leading-5 text-ink">{avatar.name}</p>
              {avatar.featured && (
                <Crown className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
