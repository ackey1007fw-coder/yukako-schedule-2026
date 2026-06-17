import { Heart } from "lucide-react";
import { supporters, supportersMessage } from "../data/supporters";
import { SectionHeader } from "./SectionHeader";

export function SupportersSection() {
  if (supporters.length === 0) {
    return null;
  }

  return (
    <section className="bg-porcelain py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Supporters"
          title="応援してくれているみんな"
          copy={supportersMessage}
        />
        <div className="flex flex-wrap gap-2.5">
          {supporters.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 border border-rosefog/30 bg-white px-3 py-2 text-sm font-bold text-ink/75"
            >
              <Heart className="h-3.5 w-3.5 text-rosefog" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
