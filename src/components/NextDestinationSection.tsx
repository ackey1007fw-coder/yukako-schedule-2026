import { SectionHeader } from "./SectionHeader";

export function NextDestinationSection() {
  return (
    <section id="next-destination" className="scroll-mt-32 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Short Drama / 主演作品" title="次の目的地｜前編・後編" copy="吉井優花子さん主演。ふたりドライブ。produced by NEXTAGE のショートドラマを前後編で。" />
        <article className="yukako-card overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex min-w-0 justify-center bg-ink p-4 sm:p-6">
            <iframe
              src="https://www.tiktok.com/player/v1/7688935643463912725?autoplay=0"
              title="吉井優花子さん主演『次の目的地｜前編』TikTok動画"
              loading="lazy"
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-[9/16] w-full max-w-[390px] border-0 bg-black"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9">
            <p className="text-sm font-bold text-champagneInk">吉井優花子さん 主演</p>
            <h3 className="mt-3 font-display text-2xl text-ink">約90秒のショートドラマを、ここで。</h3>
            <p className="mt-5 text-sm leading-7 text-ink/70">『次の目的地｜前編』をTikTokの元投稿から。画面をタップして、優花子さんのお芝居をぜひ。</p>
            <p className="mt-4 text-sm leading-7 text-ink/70">投稿元：ふたりドライブ。produced by NEXTAGE（@short_drama00）</p>
            <a href="https://www.tiktok.com/@short_drama00/video/7688935643463912725" target="_blank" rel="noopener noreferrer" className="yukako-button yukako-button-gold mt-6 min-h-12 px-5 py-3 text-sm">TikTokで元投稿を見る →</a>
            <p className="mt-4 text-xs leading-6 text-ink/55">再生できない場合は、TikTokの元投稿からご覧ください。掲載：2026.9.28</p>
          </div>
        </article>
        <article className="yukako-card mt-6 overflow-hidden border-rosefog/25 bg-porcelain shadow-paper lg:grid lg:grid-cols-2">
          <div className="flex min-w-0 justify-center bg-ink p-4 sm:p-6">
            <iframe
              src="https://www.tiktok.com/player/v1/7689265805757893909?autoplay=0"
              title="吉井優花子さん主演『次の目的地｜後編』TikTok動画"
              loading="lazy"
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-[9/16] w-full max-w-[390px] border-0 bg-black"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9">
            <p className="text-sm font-bold text-champagneInk">吉井優花子さん 主演</p>
            <h3 className="mt-3 font-display text-2xl text-ink">次の目的地｜後編</h3>
            <p className="mt-5 text-sm leading-7 text-ink/70">前編の続き、約2分半の後編もここで。TikTokの元投稿から再生できます。</p>
            <p className="mt-4 text-sm leading-7 text-ink/70">投稿元：ふたりドライブ。produced by NEXTAGE（@short_drama00）</p>
            <a href="https://www.tiktok.com/@short_drama00/video/7689265805757893909" target="_blank" rel="noopener noreferrer" className="yukako-button yukako-button-gold mt-6 min-h-12 px-5 py-3 text-sm">TikTokで後編の元投稿を見る →</a>
            <p className="mt-4 text-xs leading-6 text-ink/55">再生できない場合は、TikTokの元投稿からご覧ください。掲載：2026.9.28</p>
          </div>
        </article>
      </div>
    </section>
  );
}
