const showroomAsset = (url: string) =>
  `/api/showroom-image?url=${encodeURIComponent(url)}`;

const driveImage = (id: string, size = "w1600") =>
  `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;

const showroomAvatar = (id: string, version = "110") =>
  showroomAsset(`https://static.showroom-live.com/image/avatar/${id}.png?v=${version}`);

export const profile = {
  theme: "Riri Schedule 2026",
  name: "å¤åª éå­£",
  kana: "ãªã¤ãªã ãã",
  romaji: "Natsunagi Riri",
  fanScheduleLabel: "Fan Schedule",
  catchCopy: "éææã®ããç¬é¡ã¨ã¾ã£ãããªè¡¨ç¾åã§ãæ¬¡ã®èå°ã¸ã",
  intro:
    "åºæ¼äºå®ãéä¿¡ãSNSããã­ãã£ã¼ã«ãã²ã¨ã¤ã«ã¾ã¨ããå¿æ´ã¹ã±ã¸ã¥ã¼ã«ã§ãã",
  heroImage: driveImage("1-tnOZvazIjzWiOBCrzVdUhaY9mFXCkNp", "w2200"),
  portraitImage: driveImage("15cmlhmXNpJRzztleLn_Q_97ft1Gffr4j", "w1800"),
  birthday: "2006-06-24",
  birthdayMonthDay: "06-24",
  birthdayLabel: "6æ24æ¥",
  fanName: "ãã®ã¤ããµãã¼",
  facts: [
    { label: "å¤§å­¦", value: "éå±±å­¦é¢å¤§å­¦ 2å¹´ç" },
    { label: "åºèº«", value: "ä¸éççã¾ããç¥å¥å·çè²ã¡" },
    { label: "èº«é·", value: "163cm" },
    { label: "å¤¢", value: "ä¸çä¸­ã®äººã®å¿ãåããå½¹èã«ãªããã¨" },
    { label: "é¨æ´»", value: "é¸ä¸é¨ï¼ãã¼ãã«ï¼ããã³ã¹é¨" },
    { label: "è¶£å³", value: "æ°ç¬ãæ ç»éè³ãã¹ãã¼ãããèå­ä½ã" },
    { label: "ç¹æ", value: "è¡¨æç­ãåãããã¨" },
    { label: "æ§æ ¼", value: "ESFJï¼é äºå®ï¼" }
  ],
  gallery: [
    "/images/riri-zine-01.jpg",
    "/images/riri-zine-02.jpg",
    "/images/riri-zine-03.jpg",
    "/images/riri-zine-04.jpg"
  ],
  showroom: {
    roomName: "å¤åªéå­£",
    tagline: "#ãã¬ã­ã£ã³2025 | Entry No.306",
    image: showroomAsset(
      "https://static.showroom-live.com/image/room/cover/79fff63b1c4bdbb2fa1bf0507b410abbc3ce07d36111ac3ff3867633fb0d3c80_s.jpeg?v=1779283160"
    ),
    url: "https://www.showroom-live.com/room/profile?room_id=550336",
    stats: [
      { label: "ã¾ãã«ã¡éä¿¡", value: "377æ¥ç®" },
      { label: "æ¬¡åéä¿¡", value: "æªå®" },
      { label: "ãã©ã­ã¯ã¼", value: "905" },
      { label: "ã«ã¼ã Lv", value: "157" },
      { label: "SHOWã©ã³ã¯", value: "B" }
    ],
    message:
      "æã®éä¿¡ãã¤ãã³ãåã®è¿æ³ããã§ãã¯ãã³ã¡ã³ãããã©ã­ã¼ãã®ããã§æ¥ãã®æ´»åãå¿æ´ã§ãã¾ãã"
  },
  avatars: [
    { name: "ããã¢ãã¿ã¼ 01", image: showroomAvatar("1141864"), featured: true },
    { name: "ããã¢ãã¿ã¼ 02", image: showroomAvatar("1139413") },
    { name: "ããã¢ãã¿ã¼ 03", image: showroomAvatar("1139155") },
    { name: "ããã¢ãã¿ã¼ 04", image: showroomAvatar("1137154") },
    { name: "ããã¢ãã¿ã¼ 05", image: showroomAvatar("1136628") },
    { name: "ããã¢ãã¿ã¼ 06", image: showroomAvatar("1135709") },
    { name: "ããã¢ãã¿ã¼ 07", image: showroomAvatar("1135202") },
    { name: "ããã¢ãã¿ã¼ 08", image: showroomAvatar("1133559") },
    { name: "ããã¢ãã¿ã¼ 09", image: showroomAvatar("1133436") },
    { name: "ããã¢ãã¿ã¼ 10", image: showroomAvatar("1132347") },
    { name: "ããã¢ãã¿ã¼ 11", image: showroomAvatar("1131522") },
    { name: "ããã¢ãã¿ã¼ 12", image: showroomAvatar("1130485") }
  ]
};
