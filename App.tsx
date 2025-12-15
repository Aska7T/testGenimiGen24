import React, { useState, useEffect } from 'react';
import { AppTab, UserState, WeatherData, CommunityPost } from './types';
import { getCurrentTerm, getNextTerm, MOCK_ARTICLES, MOCK_PRODUCTS, MOCK_POSTS, MOCK_SOUNDS } from './constants';
import TabBar from './components/TabBar';
import SolarWheel from './components/SolarWheel';
import { generateDailyPoem, generateHealthTip } from './services/gemini';
import QuizModal from './components/QuizModal';
import { MapPin, Share2, Award, User, Leaf, Soup, ScrollText, ShoppingBag, Newspaper, ChevronRight, Gift, Music, Heart, MessageCircle, PlayCircle, Sprout, Building, Download } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [currentTerm, setCurrentTerm] = useState(getCurrentTerm());
  const [nextTerm, setNextTerm] = useState(getNextTerm(currentTerm.id));
  const [dailyPoem, setDailyPoem] = useState<string>("");
  const [healthTip, setHealthTip] = useState<string>("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  // User State
  const [userState, setUserState] = useState<UserState>({
    points: 850, 
    badges: [1, 22, 23], 
    completedDailyQuiz: false,
    location: "杭州"
  });

  // Mock Weather
  const weather: WeatherData = {
    temp: 18,
    condition: "多云",
    location: userState.location
  };

  useEffect(() => {
    const term = getCurrentTerm();
    setCurrentTerm(term);
    setNextTerm(getNextTerm(term.id));

    const loadAIContent = async () => {
        const poem = await generateDailyPoem(term, weather.condition, userState.location);
        setDailyPoem(poem);
        const tips = await generateHealthTip(term);
        setHealthTip(tips);
    };
    loadAIContent();
  }, []);

  const handleQuizComplete = (success: boolean) => {
    if (success && !userState.completedDailyQuiz) {
        setUserState(prev => ({
            ...prev,
            points: prev.points + 10,
            completedDailyQuiz: true,
            badges: [...prev.badges, currentTerm.id]
        }));
        alert("回答正确！积分 +10，点亮当前节气徽章！");
    } else if (!success) {
        alert("回答错误，再接再厉！");
    }
    setIsQuizOpen(false);
  };

  // --- Sub-components for cleaner structure ---

  // Module 1: Home Carousel
  const HomeFocusCarousel = () => (
    <div className="px-6 mt-4 mb-6">
        <div className="flex space-x-3 overflow-x-auto no-scrollbar snap-x">
             {/* Quiz Card */}
             <div onClick={() => setIsQuizOpen(true)} className="min-w-[85%] snap-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 flex items-center justify-between border border-orange-200 shadow-sm active:scale-95 transition-transform">
                <div>
                    <h4 className="font-bold text-orange-900">今日节气挑战</h4>
                    <p className="text-xs text-orange-700 mt-1">答题赢积分，点亮勋章</p>
                    <span className="text-[10px] bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full mt-2 inline-block">积分 +10</span>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm"><Award className="text-orange-500" size={24}/></div>
             </div>
             
             {/* Wenchuang Mall Card */}
             <div onClick={() => setActiveTab(AppTab.MALL)} className="min-w-[85%] snap-center bg-gradient-to-r from-red-50 to-pink-100 rounded-xl p-4 flex items-center justify-between border border-red-200 shadow-sm active:scale-95 transition-transform">
                <div>
                    <h4 className="font-bold text-red-900">东方美学市集</h4>
                    <p className="text-xs text-red-700 mt-1">节气限定礼盒 上新中</p>
                    <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded-full mt-2 inline-block">积分抵扣</span>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm"><ShoppingBag className="text-red-500" size={24}/></div>
             </div>

             {/* Agri Live Card */}
             <div onClick={() => setActiveTab(AppTab.MALL)} className="min-w-[85%] snap-center bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-4 flex items-center justify-between border border-green-200 shadow-sm active:scale-95 transition-transform">
                <div>
                    <h4 className="font-bold text-green-900">跟着节气去寻味</h4>
                    <p className="text-xs text-green-700 mt-1">助农直播间正在热播</p>
                    <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full mt-2 inline-block flex items-center w-fit"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>LIVE</span>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm"><Sprout className="text-green-600" size={24}/></div>
             </div>
        </div>
    </div>
  );

  // Module 2: PGC Magazine Card
  const MagazineCard = ({ article }: { article: typeof MOCK_ARTICLES[0] }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 mb-4 group">
        <div className="h-40 relative overflow-hidden">
            <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="cover"/>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                {article.tag === '视频' && <PlayCircle className="text-white/90" size={40} />}
            </div>
            <span className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded">{article.tag}</span>
        </div>
        <div className="p-4">
            <h3 className="font-bold text-stone-800 mb-1">{article.title}</h3>
            <p className="text-xs text-stone-500 line-clamp-2 mb-3">{article.summary}</p>
            <div className="flex justify-between items-center">
                <span className="text-[10px] text-stone-400">{article.author} · {article.reads} 阅读</span>
                <button className="text-[10px] border border-stone-300 px-2 py-1 rounded hover:bg-stone-50">阅读全文</button>
            </div>
        </div>
    </div>
  );

  // Module 2: UGC Post
  const CommunityPostCard = ({ post }: { post: CommunityPost }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-4">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
                <img src={post.avatar} className="w-8 h-8 rounded-full border border-stone-100" alt="avatar"/>
                <div>
                    <p className="text-xs font-bold text-stone-800">{post.user}</p>
                    <p className="text-[10px] text-stone-400">{post.location}</p>
                </div>
            </div>
            <button className="text-stone-400"><Share2 size={16}/></button>
        </div>
        <p className="text-sm text-stone-700 mb-3 leading-relaxed">{post.content}</p>
        <img src={post.image} className="w-full h-48 object-cover rounded-lg mb-3" alt="post"/>
        <div className="flex space-x-4 text-stone-500">
            <button className="flex items-center space-x-1 hover:text-red-500"><Heart size={18}/> <span className="text-xs">{post.likes}</span></button>
            <button className="flex items-center space-x-1 hover:text-blue-500"><MessageCircle size={18}/> <span className="text-xs">评论</span></button>
        </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return (
          <div className="flex flex-col min-h-screen pb-24 animate-fadeIn">
            {/* 1. Header & Weather Linkage */}
            <div className="relative pt-12 px-6">
                <div className="flex justify-between items-start z-10 relative">
                    <div className="flex flex-col">
                         <div className="flex items-center text-stone-600 space-x-1 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                            <MapPin size={14} />
                            <span className="text-xs font-medium">{weather.location}</span>
                         </div>
                         <div className="mt-2 flex items-baseline space-x-2 text-stone-800">
                             <span className="text-4xl font-light">{weather.temp}°</span>
                             <span className="text-sm font-medium">{weather.condition}</span>
                         </div>
                         <p className="text-xs text-stone-500 mt-1 italic">今日宜：{currentTerm.dos[0]} · 今日忌：{currentTerm.donts[0]}</p>
                    </div>
                    {/* Day Sign Generator Button - Enhanced Visibility */}
                    <button className="bg-stone-800 text-white p-2 rounded-full shadow-lg hover:bg-stone-700 transition-colors flex items-center px-3" title="生成日签">
                        <Download size={16} className="mr-1"/> <span className="text-xs font-bold">日签</span>
                    </button>
                </div>
                
                {/* Poem Overlay */}
                <div className="mt-6 z-10 relative">
                    <div className="font-serif-sc text-stone-800 text-lg leading-relaxed whitespace-pre-line border-l-4 border-red-800/60 pl-4 py-1 italic">
                        {dailyPoem || currentTerm.poem}
                    </div>
                </div>
            </div>

            {/* 2. Solar Wheel */}
            <SolarWheel currentTerm={currentTerm} nextTerm={nextTerm} />

            {/* 3. Focus Carousel (Operational Entry) */}
            <HomeFocusCarousel />
            
            <div className="text-center text-stone-300 text-xs pb-4">下拉探索更多内容</div>
          </div>
        );

      case AppTab.CULTURE:
        return (
          <div className="min-h-screen pb-24 px-6 pt-12 animate-fadeIn bg-[#f4f1ea]">
             <div className="flex items-end justify-between mb-6">
                 <h2 className="text-3xl font-calligraphy text-stone-900">文化课堂</h2>
                 <span className="text-xs text-stone-500 font-serif-sc">第24期 · {currentTerm.name}刊</span>
             </div>
             
             {/* PGC: Solar Term Micro Magazine */}
             <div className="mb-8">
                 <div className="flex items-center space-x-2 mb-4">
                    <Newspaper size={18} className="text-stone-700"/>
                    <h3 className="font-bold text-stone-800">节气·中国</h3>
                    <span className="bg-red-600 text-white text-[10px] px-1.5 rounded">微刊</span>
                 </div>
                 {MOCK_ARTICLES.map(article => <MagazineCard key={article.id} article={article} />)}
                 <button className="w-full py-3 bg-stone-200 text-stone-600 rounded-xl text-xs font-bold mt-2">完成阅读 (积分+5)</button>
             </div>

             {/* UGC: Community Feed */}
             <div>
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <User size={18} className="text-stone-700"/>
                        <h3 className="font-bold text-stone-800">我在节气</h3>
                    </div>
                    <button className="text-xs bg-stone-800 text-white px-3 py-1 rounded-full">+ 发帖</button>
                 </div>
                 {MOCK_POSTS.map(post => <CommunityPostCard key={post.id} post={post} />)}
             </div>
          </div>
        );

      case AppTab.LIFESTYLE:
        return (
          <div className="min-h-screen pb-24 px-6 pt-12 animate-fadeIn">
            <h2 className="text-3xl font-calligraphy text-stone-900 mb-6">顺时生活</h2>
            
            {/* 1. Health Guide + Commerce Link */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm mb-6 border border-green-100">
               <div className="flex justify-between items-start mb-4">
                   <h3 className="text-lg font-bold text-emerald-800 flex items-center">
                       <Leaf size={18} className="mr-2"/> 今日养生
                   </h3>
               </div>
               <div className="text-sm text-emerald-900/80 leading-7 whitespace-pre-line mb-4">
                   {healthTip || "正在获取养生建议..."}
               </div>
               {/* Product Insertion */}
               <div className="bg-white/60 p-3 rounded-lg flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                       <img src="https://picsum.photos/seed/tea/50/50" className="w-10 h-10 rounded bg-stone-200" alt="tea"/>
                       <div>
                           <p className="text-xs font-bold text-emerald-900">推荐: 祛湿赤豆薏米茶</p>
                           <p className="text-[10px] text-emerald-700">顺应节气 调理脾胃</p>
                       </div>
                   </div>
                   <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full">去购买</button>
               </div>
            </div>

            {/* 2. Food Map + Agri Link */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-stone-100">
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
                    <Soup size={18} className="mr-2 text-orange-600"/> 不时不食
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {currentTerm.foods.map((food, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden h-24 bg-stone-100">
                             <img src={`https://picsum.photos/seed/${food}/200/200`} className="absolute inset-0 w-full h-full object-cover opacity-90" alt={food}/>
                             <span className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow-md">{food}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-orange-50 p-3 rounded-lg flex items-center justify-between cursor-pointer" onClick={() => setActiveTab(AppTab.MALL)}>
                    <div className="flex items-center space-x-2">
                        <Sprout size={16} className="text-orange-600"/>
                        <span className="text-xs font-bold text-orange-800">助农频道：购买正宗原产地食材</span>
                    </div>
                    <ChevronRight size={14} className="text-orange-400"/>
                </div>
            </div>

            {/* 3. Sound Library */}
            <div className="bg-stone-800 rounded-2xl p-6 shadow-md text-white">
                <h3 className="font-bold mb-4 flex items-center"><Music size={18} className="mr-2"/> 声音图书馆</h3>
                <div className="space-y-3">
                    {MOCK_SOUNDS.map(sound => (
                        <div key={sound.id} className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <PlayCircle size={16}/>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{sound.title}</p>
                                    <p className="text-[10px] opacity-60">{sound.type === 'nature' ? '自然白噪音' : '专家导读'}</p>
                                </div>
                            </div>
                            <span className="text-xs opacity-50">{sound.duration}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 text-xs text-center opacity-50 hover:opacity-100">分享此刻心情生成日签</button>
            </div>
          </div>
        );

      case AppTab.MALL:
        return (
          <div className="min-h-screen pb-24 px-6 pt-12 animate-fadeIn bg-stone-50">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-calligraphy text-stone-900">市集</h2>
                <div className="flex flex-col items-end">
                    <div className="bg-stone-800 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Award size={12} className="mr-1"/> 积分: {userState.points}
                    </div>
                </div>
             </div>

             {/* 1. Wenchuang Mall (Points + Cash) */}
             <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-stone-800 flex items-center">
                        <ShoppingBag size={18} className="mr-2 text-red-700"/> 节气文创
                    </h3>
                    <span className="text-xs text-stone-400">企业定制 ></span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {MOCK_PRODUCTS.filter(p => p.category === 'wenchuang').map(product => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100">
                            <div className="h-32 bg-stone-200 relative">
                                <img src={product.image} className="w-full h-full object-cover" alt={product.name}/>
                                {product.tag && <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-br">{product.tag}</span>}
                            </div>
                            <div className="p-3">
                                <h4 className="text-sm font-bold text-stone-800 line-clamp-1 mb-2">{product.name}</h4>
                                <div className="flex flex-col">
                                    <span className="text-red-600 font-bold text-sm">¥{product.price} <span className="text-[10px] text-stone-400 font-normal">+ {product.points}积分</span></span>
                                    <button className="mt-2 w-full bg-stone-800 text-white text-xs py-1.5 rounded-lg">立即兑换</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* 2. Agri Help (Live Stream & Products) */}
             <div className="mb-8">
                 <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-4 text-white mb-4 relative overflow-hidden">
                     <div className="relative z-10">
                         <h3 className="font-bold text-lg mb-1">跟着节气去寻味</h3>
                         <p className="text-xs opacity-80 mb-3">助农公益直播 | 陕西富平站</p>
                         <button className="bg-white text-green-700 text-xs font-bold px-4 py-1.5 rounded-full animate-pulse">进入直播间</button>
                     </div>
                     <Sprout className="absolute right-4 bottom-[-10px] text-white/20" size={80}/>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    {MOCK_PRODUCTS.filter(p => p.category === 'agri').map(product => (
                        <div key={product.id} className="bg-white rounded-xl p-3 flex items-center space-x-3 shadow-sm">
                             <img src={product.image} className="w-12 h-12 rounded bg-stone-200 object-cover" alt="agri"/>
                             <div>
                                 <h4 className="text-xs font-bold line-clamp-1">{product.name}</h4>
                                 <span className="text-green-700 text-xs font-bold">¥{product.price}</span>
                             </div>
                        </div>
                    ))}
                 </div>
             </div>

             {/* 3. Digital Rights Center */}
             <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-stone-800 mb-4 flex items-center">
                    <Gift size={18} className="mr-2 text-purple-500"/> 数字权益中心
                </h3>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                    {MOCK_PRODUCTS.filter(p => p.category === 'digital').map(product => (
                        <div key={product.id} className="min-w-[100px] text-center">
                            <div className="w-20 h-20 mx-auto rounded-full border-2 border-purple-100 p-1 mb-2 relative">
                                <img src={product.image} className="w-full h-full rounded-full object-cover" alt="digital"/>
                                <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-[10px] px-1.5 rounded-full">权益</div>
                            </div>
                            <p className="text-xs font-bold text-stone-700 line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-purple-600 mt-1">{product.points} 积分</p>
                        </div>
                    ))}
                    <div className="min-w-[100px] flex items-center justify-center">
                        <span className="text-xs text-stone-400">更多权益 ></span>
                    </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen text-stone-800 font-sans transition-colors duration-700`} style={{ backgroundColor: activeTab === AppTab.HOME ? '#fdfbf7' : '#fdfbf7' }}>
      
      {/* Dynamic Background Element for Home */}
      {activeTab === AppTab.HOME && (
         <div className="fixed inset-0 z-0 opacity-10 pointer-events-none ink-wash-bg" />
      )}

      <main className="relative z-10 max-w-md mx-auto bg-transparent min-h-screen shadow-2xl overflow-hidden">
        {renderContent()}
      </main>

      <TabBar currentTab={activeTab} onTabChange={setActiveTab} accentColor={currentTerm.color} />
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        currentTerm={currentTerm}
        onComplete={handleQuizComplete}
      />
    </div>
  );
};

export default App;