import { ArrowDown, Images, Ticket, Video } from "lucide-react";
import type { ScheduleEvent, SocialLink } from "../types";

type ActionStripProps = {
  nextEvent?: ScheduleEvent;
  socialLinks: SocialLink[];
};

export function ActionStrip({ nextEvent, socialLinks }: ActionStripProps) {
  const ticketLink =
    nextEvent?.links.find((link) => link.kind === "ticket") ??
    nextEvent?.links[0];
  const instagram = socialLinks.find((link) => link.kind === "instagram");

  const items = [
    {
      label: "次の出演",
      title: nextEvent?.shortTitle ?? "スケジュールを確認",
      copy: nextEvent?.displayDate ?? "新しい予定をカードとカレンダーで確認できます。",
      href: "#next",
      Icon: ArrowDown,
      external: false
    },
    {
      label: "チケット予約",
      title: ticketLink?.label ?? "予約リンクを確認",
      copy: "重要イベントは早めに席を押さえる導線を前面に出しています。",
      href: ticketLink?.url ?? "#schedule",
      Icon: Ticket,
      external: Boolean(ticketLink)
    },
    {
      label: "SNSを見る",
      title: instagram?.handle ?? "更新をチェック",
      copy: "写真、告知、配信のお知らせをまとめて追えます。",
      href: instagram?.url ?? "#links",
      Icon: instagram ? Images : Video,
      external: Boolean(instagram)
    }
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-px border-x border-rosefog/20 bg-rosefog/20 sm:grid-cols-3">
        {items.map((item) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-champagne/50 bg-porcelain text-champagne">
                <item.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase text-champagne">
                  {item.label}
                </span>
                <span className="mt-1 block font-display text-xl leading-tight text-ink">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-ink/62">
                  {item.copy}
                </span>
              </span>
            </>
          );

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-32 gap-4 bg-white p-5 transition hover:bg-porcelain"
            >
              {content}
            </a>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="flex min-h-32 gap-4 bg-white p-5 transition hover:bg-porcelain"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
