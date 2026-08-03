import { ExternalLink } from "lucide-react";
import { XPostEmbed } from "./XPostEmbed";

type RootItem = {
  emoji: string;
  title: string;
  copy: string;
};

// 確認済みの事実のみ掲載（未確認の秋田エピソードは書かない）。
const roots: RootItem[] = [
  {
    emoji: "🌾",
    title: "秋田から、上京",
    copy: "秋田県秋田市出身。秋田で公務員として働きながら、2021年にミス浴衣コンテストで準グランプリを受賞。これをきっかけに上京し、俳優の道へ。"
  },
  {
    emoji: "📺",
    title: "AKT秋田テレビ",
    copy: "「東京こまち」コーナーに出演し、東京の話題を秋田へ届けたほか、2024年にはAKTアプリアンバサダーを務めました。"
  },
  {
    emoji: "👹",
    title: "SHOWROOM",
    copy: "ルーム名は「秋田の優花子(ゆかこ)」。上京した今も、秋田の名前を背負って配信を続けています。"
  }
];

export function AkitaRootsSection() {
  return (
    <section
      id="akita-roots"
      className="scroll-mt-32 border-t border-champagne/20 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🌾
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-champagneInk">
              Akita Roots
            </p>
            <h2 className="font-display text-3xl text-ink">秋田との絆</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {roots.map((item) => (
            <div key={item.title} className="yukako-card border-rosefog/20 bg-porcelain p-5">
              <span className="text-xl" aria-hidden="true">
                {item.emoji}
              </span>
              <h4 className="mt-3 font-display text-xl leading-tight text-ink">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-ink/70">{item.copy}</p>
            </div>
          ))}
        </div>

        <article
          id="akita-kanto-festival-2026"
          className="mt-8 scroll-mt-32 overflow-hidden border border-champagne/35 bg-porcelain"
        >
          <div className="border-b border-champagne/25 bg-ink px-5 py-6 text-white sm:px-7 sm:py-8">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-champagne">
              Akita Kanto Festival · 2026.8.3–6
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
              今年も、秋田竿燈まつりへ
            </h3>
            <p className="mt-3 max-w-3xl text-base font-bold leading-7 text-white/90">
              「行きたい&amp;参加したい🥹✨」
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/70">
              公務員時代にお囃子の太鼓で参加した、大好きな秋田の夏祭り。2025年に自ら編集した紹介動画を重ね、今年の4日間と来場する方の安全を願っています。
            </p>
          </div>

          <div className="grid min-w-0 gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-champagneInk">
                Yukako's Kanto Guide
              </p>
              <h4 className="mt-2 font-display text-xl leading-tight text-ink">
                23秒で巡る、竿燈まつり
              </h4>
              <p className="mt-3 text-sm leading-7 text-ink/70">
                重さ50kgの大若、倒れる瞬間の迫力、お囃子とふれあい竿燈、お気に入りの男鹿しょっつる焼きそばまで。優花子さん自身の現地映像と案内で楽しめます。
              </p>
              <div className="mx-auto mt-5 max-w-[320px] overflow-hidden border border-champagne/30 bg-black">
                <iframe
                  src="https://drive.google.com/file/d/1t9FwJTIS212vdffF3N-cgCqSo7ZAEeiv/preview"
                  title="吉井優花子さんが制作した秋田竿燈まつり紹介動画"
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="block aspect-[9/16] h-auto w-full object-contain"
                />
              </div>
              <a
                href="https://x.com/mokoopy/status/1951921944946737468"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-champagneInk underline underline-offset-4 transition hover:text-rosefog"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                紹介動画の元投稿を見る
              </a>
            </div>

            <div className="min-w-0 border-t border-champagne/20 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="mb-4 text-center text-xs font-bold leading-6 text-ink/55">
                2026年のメッセージと、過去に参加した夜の写真2枚
              </p>
              <XPostEmbed
                url="https://x.com/mokoopy/status/2084193500275597652"
                label="吉井優花子さんの2026年8月3日の秋田竿燈まつり投稿"
              />
              <p className="mt-4 text-center text-xs leading-6 text-ink/55">
                2026年の開催日程・会場案内は
                <a
                  href="https://www.kantou.gr.jp/kanran/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-bold text-champagneInk underline underline-offset-2 hover:text-rosefog"
                >
                  秋田竿燈まつり公式サイト
                </a>
                へ。
              </p>
            </div>
          </div>
        </article>

        <aside className="mt-8 border border-champagne/35 bg-porcelain p-5 sm:p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-champagneInk">
            Origin
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
            俳優への道を歩み始めた日
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/70">
            2022年10月1日。公務員を退職し、初舞台へ向けて秋田から東京へ。家族と故郷への思いを胸に、夢への一歩を記した原点の記録です。
          </p>
          <p className="mt-2 text-xs font-bold text-ink/45" aria-hidden="true">
            秋田 👹🌾 → 東京 🗼✨
          </p>
          <a
            href="/archive/2022-10-01-akita-to-tokyo"
            className="yukako-button yukako-button-gold mt-5 inline-flex min-h-11 px-4 py-2.5 text-sm"
          >
            原点となった一日を読む
          </a>
        </aside>
      </div>
    </section>
  );
}
