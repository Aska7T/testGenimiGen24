import { SolarTerm, MerchandiseItem, ContentArticle, CommunityPost, SoundTrack } from './types';

// Simplified data for the 24 terms.
export const SOLAR_TERMS: SolarTerm[] = [
  { id: 1, name: "立春", pinyin: "Lì Chūn", dateStr: "2024-02-04", description: "Spring begins. Nature wakes up.", color: "#86A697", poem: "东风解冻，蛰虫始振。", poet: "古谚", customs: ["咬春", "打春牛"], foods: ["春饼", "萝卜"], dos: ["早起", "梳头"], donts: ["动怒"] },
  { id: 2, name: "雨水", pinyin: "Yǔ Shuǐ", dateStr: "2024-02-19", description: "Rainfall increases.", color: "#8FB2C9", poem: "好雨知时节，当春乃发生。", poet: "杜甫", customs: ["回娘家"], foods: ["红枣", "粥"], dos: ["保暖", "去湿"], donts: ["吃生冷"] },
  { id: 3, name: "惊蛰", pinyin: "Jīng Zhé", dateStr: "2024-03-05", description: "Thunder wakes hibernating insects.", color: "#6C8C67", poem: "微雨众卉新，一雷惊蛰始。", poet: "韦应物", customs: ["打小人", "祭白虎"], foods: ["梨"], dos: ["运动", "舒展"], donts: ["熬夜"] },
  { id: 4, name: "春分", pinyin: "Chūn Fēn", dateStr: "2024-03-20", description: "Day and night are equal length.", color: "#93D5DC", poem: "春风雨脚落声微，柳岸斜风带客归。", poet: "徐铉", customs: ["立蛋", "踏青"], foods: ["春菜"], dos: ["平衡", "踏青"], donts: ["大热大寒"] },
  { id: 5, name: "清明", pinyin: "Qīng Míng", dateStr: "2024-04-04", description: "Bright and clear. Tomb sweeping.", color: "#A4C78E", poem: "清明时节雨纷纷，路上行人欲断魂。", poet: "杜牧", customs: ["扫墓", "踏青", "插柳"], foods: ["青团"], dos: ["祭祖", "郊游"], donts: ["过度悲伤"] },
  { id: 6, name: "谷雨", pinyin: "Gǔ Yǔ", dateStr: "2024-04-19", description: "Rain helps grain grow.", color: "#D6EC79", poem: "红紫妆林绿满池，游丝飞絮两依依。", poet: "韦庄", customs: ["赏牡丹", "喝谷雨茶"], foods: ["香椿"], dos: ["祛湿", "健脾"], donts: ["贪凉"] },
  { id: 7, name: "立夏", pinyin: "Lì Xià", dateStr: "2024-05-05", description: "Summer begins.", color: "#F28C8C", poem: "绿树阴浓夏日长，楼台倒影入池塘。", poet: "高骈", customs: ["斗蛋", "称人"], foods: ["立夏饭"], dos: ["养心", "午睡"], donts: ["贪凉"] },
  { id: 8, name: "小满", pinyin: "Xiǎo Mǎn", dateStr: "2024-05-20", description: "Grain buds are full.", color: "#F4CDA5", poem: "夜莺啼绿柳，皓月醒长空。", poet: "欧阳修", customs: ["祭车神"], foods: ["苦菜"], dos: ["清淡", "除湿"], donts: ["露宿"] },
  { id: 9, name: "芒种", pinyin: "Máng Zhòng", dateStr: "2024-06-05", description: "Grain in ear. Planting time.", color: "#E8C064", poem: "家家麦饭美，处处菱歌长。", poet: "陆游", customs: ["送花神", "煮梅"], foods: ["青梅"], dos: ["补水", "勤洗澡"], donts: ["懒散"] },
  { id: 10, name: "夏至", pinyin: "Xià Zhì", dateStr: "2024-06-21", description: "Longest day of the year.", color: "#E86F56", poem: "东边日出西边雨，道是无晴却有晴。", poet: "刘禹锡", customs: ["祭祖", "消夏"], foods: ["夏至面"], dos: ["静心", "避暑"], donts: ["暴晒"] },
  { id: 11, name: "小暑", pinyin: "Xiǎo Shǔ", dateStr: "2024-07-06", description: "Minor heat.", color: "#FF9F43", poem: "荷风送香气，竹露滴清响。", poet: "孟浩然", customs: ["晒书"], foods: ["黄鳝", "绿豆汤"], dos: ["静心", "喝粥"], donts: ["激动"] },
  { id: 12, name: "大暑", pinyin: "Dà Shǔ", dateStr: "2024-07-22", description: "Major heat.", color: "#FF6B6B", poem: "赤日几时过，清风无处寻。", poet: "曾几", customs: ["喝伏茶"], foods: ["姜茶", "羊肉"], dos: ["避暑", "补气"], donts: ["贪冷饮"] },
  { id: 13, name: "立秋", pinyin: "Lì Qiū", dateStr: "2024-08-07", description: "Autumn begins.", color: "#D4A373", poem: "空山新雨后，天气晚来秋。", poet: "王维", customs: ["贴秋膘", "晒秋"], foods: ["西瓜", "肉类"], dos: ["早卧早起"], donts: ["忧郁"] },
  { id: 14, name: "处暑", pinyin: "Chǔ Shǔ", dateStr: "2024-08-22", description: "Heat withdraws.", color: "#C69C6D", poem: "离离暑云散，袅袅凉风起。", poet: "白居易", customs: ["放河灯"], foods: ["鸭肉"], dos: ["润肺"], donts: ["贪凉"] },
  { id: 15, name: "白露", pinyin: "Bái Lù", dateStr: "2024-09-07", description: "White dew. Temperature drops.", color: "#E0E0E0", poem: "露从今夜白，月是故乡明。", poet: "杜甫", customs: ["收清露"], foods: ["龙眼", "白露茶"], dos: ["保暖"], donts: ["露背"] },
  { id: 16, name: "秋分", pinyin: "Qiū Fēn", dateStr: "2024-09-22", description: "Day and night equal again.", color: "#BCAAA4", poem: "一道残阳铺水中，半江瑟瑟半江红。", poet: "白居易", customs: ["祭月", "吃秋菜"], foods: ["螃蟹", "桂花"], dos: ["收敛神气"], donts: ["悲秋"] },
  { id: 17, name: "寒露", pinyin: "Hán Lù", dateStr: "2024-10-08", description: "Cold dew.", color: "#90A4AE", poem: "萧疏桐叶上，月白露初团。", poet: "戴叔伦", customs: ["登高"], foods: ["芝麻"], dos: ["润燥", "足浴"], donts: ["赤脚"] },
  { id: 18, name: "霜降", pinyin: "Shuāng Jiàng", dateStr: "2024-10-23", description: "Frost descends.", color: "#78909C", poem: "月落乌啼霜满天，江枫渔火对愁眠。", poet: "张继", customs: ["赏菊"], foods: ["柿子"], dos: ["补冬"], donts: ["暴食"] },
  { id: 19, name: "立冬", pinyin: "Lì Dōng", dateStr: "2024-11-07", description: "Winter begins.", color: "#546E7A", poem: "细雨生寒未死灰，状元红酒向人催。", poet: "陆游", customs: ["补冬"], foods: ["饺子", "羊肉"], dos: ["藏阳"], donts: ["过度运动"] },
  { id: 20, name: "小雪", pinyin: "Xiǎo Xuě", dateStr: "2024-11-22", description: "Minor snow.", color: "#CFD8DC", poem: "晚来天欲雪，能饮一杯无？", poet: "白居易", customs: ["腌菜"], foods: ["糍粑"], dos: ["温补"], donts: ["紧闭门窗"] },
  { id: 21, name: "大雪", pinyin: "Dà Xuě", dateStr: "2024-12-07", description: "Major snow.", color: "#B0BEC5", poem: "千山鸟飞绝，万径人踪灭。", poet: "柳宗元", customs: ["观雪"], foods: ["红薯粥"], dos: ["保暖头颈"], donts: ["熬夜"] },
  { id: 22, name: "冬至", pinyin: "Dōng Zhì", dateStr: "2024-12-21", description: "Winter Solstice. Longest night.", color: "#37474F", poem: "天时人事日相催，冬至阳生春又来。", poet: "杜甫", customs: ["祭祖"], foods: ["饺子", "汤圆"], dos: ["养藏"], donts: ["大汗"] },
  { id: 23, name: "小寒", pinyin: "Xiǎo Hán", dateStr: "2025-01-05", description: "Minor cold.", color: "#455A64", poem: "小寒连大吕，欢鹊垒新巢。", poet: "元稹", customs: ["喝腊八粥"], foods: ["菜饭"], dos: ["防寒"], donts: ["生冷"] },
  { id: 24, name: "大寒", pinyin: "Dà Hán", dateStr: "2025-01-20", description: "Major cold. End of cycle.", color: "#263238", poem: "寒夜客来茶当酒，竹炉汤沸火初红。", poet: "杜磊", customs: ["除尘", "贴年红"], foods: ["八宝饭"], dos: ["修身"], donts: ["过度劳累"] },
];

export const MOCK_PRODUCTS: MerchandiseItem[] = [
  { id: 1, name: "手绘二十四节气日历·2025珍藏版", price: 68, points: 200, image: "https://picsum.photos/seed/calendar/300/300", tag: "热销", category: 'wenchuang' },
  { id: 2, name: "景德镇手绘盖碗·春泥", price: 128, points: 500, image: "https://picsum.photos/seed/tea/300/300", tag: "新品", category: 'wenchuang' },
  { id: 3, name: "陕西富平柿饼·助农优选", price: 45, points: 50, image: "https://picsum.photos/seed/fruit/300/300", tag: "助农", category: 'agri' },
  { id: 4, name: "高山云雾绿茶·春茶预售", price: 198, points: 300, image: "https://picsum.photos/seed/greentea/300/300", tag: "助农", category: 'agri' },
  { id: 5, name: "节气限定·数字头像框", price: 0, points: 200, image: "https://picsum.photos/seed/frame/300/300", category: 'digital' },
];

export const MOCK_ARTICLES: ContentArticle[] = [
  { id: 1, title: "寻找消失的年味：为什么我们依然需要仪式感？", author: "文化研究所", summary: "从祭灶到守岁，每一个传统背后都是对生活的热爱。", image: "https://picsum.photos/seed/art1/400/200", reads: 1204, tag: "微刊" },
  { id: 2, title: "非遗传承：一把油纸伞里的江南烟雨", author: "非遗记录", summary: "探访老匠人，看如何用七十二道工序撑起一片天。", image: "https://picsum.photos/seed/art2/400/200", reads: 892, tag: "视频" },
];

export const MOCK_POSTS: CommunityPost[] = [
  { id: 1, user: "云游诗人", avatar: "https://i.pravatar.cc/150?u=1", image: "https://picsum.photos/seed/post1/400/300", content: "今日立春，去西湖边走了走，柳树已经发芽了。#我在节气", likes: 45, location: "杭州·西湖" },
  { id: 2, user: "养生达人", avatar: "https://i.pravatar.cc/150?u=2", image: "https://picsum.photos/seed/post2/400/300", content: "春季养肝正当时，煮了一壶菊花茶。#顺时生活", likes: 32, location: "北京" },
];

export const MOCK_SOUNDS: SoundTrack[] = [
  { id: 1, title: "春雨润物", duration: "03:21", type: "nature" },
  { id: 2, title: "古琴·流水", duration: "04:15", type: "music" },
  { id: 3, title: "立春·专家导读", duration: "02:30", type: "guide" },
];

// Helper to get current term
export const getCurrentTerm = (): SolarTerm => {
  const now = new Date();
  const year = now.getFullYear();
  
  let closest = SOLAR_TERMS[0];
  let minDiff = Infinity;

  SOLAR_TERMS.forEach(term => {
    const termDate = new Date(term.dateStr);
    const diff = Math.abs(now.getTime() - termDate.getTime());
    if (diff < minDiff) {
      minDiff = diff;
      closest = term;
    }
  });
  
  const sorted = [...SOLAR_TERMS].sort((a,b) => new Date(a.dateStr).getTime() - new Date(b.dateStr).getTime());
  let current = sorted[sorted.length - 1];
  
  for(let i=0; i<sorted.length; i++) {
     if (new Date(sorted[i].dateStr) > now) {
         current = sorted[i === 0 ? sorted.length - 1 : i - 1];
         break;
     }
  }
  
  return current;
};

export const getNextTerm = (currentId: number): SolarTerm => {
  const nextId = currentId === 24 ? 1 : currentId + 1;
  return SOLAR_TERMS.find(t => t.id === nextId) || SOLAR_TERMS[0];
}