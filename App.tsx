
import React, { useState, useCallback } from 'react';
import { DesignStyle, DesignBlueprint, GenerationResult } from './types';
import { generateDesignBlueprint, generateDesignImage } from './services/gemini';
import CarvingGuide from './components/CarvingGuide';

const App: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<DesignStyle | null>(null);
  const [result, setResult] = useState<GenerationResult>({ loading: false });

  const handleDesign = useCallback(async (style: DesignStyle) => {
    setActiveStyle(style);
    setResult({ loading: true });
    try {
      const [blueprint, imageUrl] = await Promise.all([
        generateDesignBlueprint(style),
        generateDesignImage(style)
      ]);
      setResult({ blueprint, imageUrl, loading: false });
    } catch (err) {
      console.error(err);
      setResult({ loading: false, error: "设计方案生成失败，请检查网络或稍后重试。" });
    }
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Area */}
      <header className="py-12 px-4 text-center bg-[#8e442c] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="w-full h-full border-[20px] border-white/20 rotate-45 scale-150"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-widest relative z-10">
          山海经 · 九尾天狐
        </h1>
        <p className="text-amber-100 max-w-2xl mx-auto italic font-light relative z-10">
          —— 橄榄核雕非遗艺术辅助设计方案 ——
        </p>
        <div className="mt-8 flex justify-center gap-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-12 h-px bg-white/40"></span>
            <span className="text-xs uppercase tracking-widest">Intangible Cultural Heritage</span>
            <span className="w-12 h-px bg-white/40"></span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12">
        {/* Style Selection */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <button 
            onClick={() => handleDesign(DesignStyle.BEAUTY)}
            disabled={result.loading}
            className={`flex-1 p-8 rounded-xl transition-all duration-500 border-2 flex flex-col items-center group
              ${activeStyle === DesignStyle.BEAUTY ? 'bg-amber-100 border-amber-800 scale-[1.02]' : 'bg-white border-stone-200 hover:border-amber-400'}
              ${result.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="w-20 h-20 mb-4 bg-amber-50 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <i className="fa-solid fa-venus text-3xl text-amber-800"></i>
            </div>
            <h3 className="text-xl font-bold text-stone-800">美女九尾 (仙气流)</h3>
            <p className="text-sm text-stone-500 mt-2 text-center">纤尘不染，化骨柔情；展示天狐在《山海经》中神圣而优雅的一面。</p>
          </button>

          <button 
            onClick={() => handleDesign(DesignStyle.DEMON)}
            disabled={result.loading}
            className={`flex-1 p-8 rounded-xl transition-all duration-500 border-2 flex flex-col items-center group
              ${activeStyle === DesignStyle.DEMON ? 'bg-amber-100 border-amber-800 scale-[1.02]' : 'bg-white border-stone-200 hover:border-amber-400'}
              ${result.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="w-20 h-20 mb-4 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 transition-colors">
              <i className="fa-solid fa-fire-flame-curved text-3xl text-stone-800"></i>
            </div>
            <h3 className="text-xl font-bold text-stone-800">狐妖九尾 (神威流)</h3>
            <p className="text-sm text-stone-500 mt-2 text-center">古拙大气，神性凛然；还原青丘神兽的原始野性与通天法力。</p>
          </button>
        </div>

        {/* Results Area */}
        {result.loading && (
          <div className="py-20 flex flex-col items-center justify-center text-stone-400">
            <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="animate-pulse">大师正在构思，请耐心等待方案生成...</p>
            <p className="text-xs mt-2">（AI 正在融合《山海经》文献与核雕技法）</p>
          </div>
        )}

        {result.error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {result.error}
          </div>
        )}

        {result.blueprint && !result.loading && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 animate-fade-in">
            {/* Visual Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="chinese-border bg-white rounded shadow-2xl p-2">
                <div className="aspect-square bg-stone-100 overflow-hidden relative group">
                  {result.imageUrl ? (
                    <img src={result.imageUrl} alt="Design Concept" className="w-full h-full object-cover rounded shadow-inner" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300 italic">概念图生成中...</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-white text-center text-xs">
                    该图为AI生成的橄榄核雕视觉概念，仅供刻手参考构图与光影。
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-900/5 rounded-lg border border-amber-900/10">
                <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-scroll"></i> 核心雕刻元素
                </h4>
                <ul className="text-sm text-stone-600 space-y-2">
                  {result.blueprint.elements.map((el, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-stone-800 mb-2 border-b-2 border-stone-800 inline-block pb-1">
                  {result.blueprint.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mt-4 text-lg">
                  {result.blueprint.description}
                </p>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-amber-900 mb-3">
                    <i className="fa-solid fa-hammer"></i> 建议雕刻技法
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.blueprint.carvingTechniques.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-stone-200 rounded-full text-sm text-stone-700 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                  <h4 className="flex items-center gap-2 text-lg font-bold text-stone-800 mb-3">
                    <i className="fa-solid fa-yin-yang"></i> 设计寓意 (Philosophy)
                  </h4>
                  <p className="text-stone-600 italic leading-relaxed">
                    “{result.blueprint.philosophy}”
                  </p>
                </section>

                <div className="p-6 bg-stone-800 text-stone-100 rounded-xl">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-lightbulb"></i> 大师建议
                  </h4>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    九尾狐题材的关键在于“尾”与“身”的虚实结合。橄榄核体积极小，建议在尾巴交汇处预留1-2mm的空间，以增加整体构图的灵动感。尤其是‘美女九尾’，其衣褶的线条感应当与尾巴的弧度呼应，形成旋转上升的视觉流。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Static Knowledge Section */}
        {!result.loading && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h3 className="text-2xl font-black text-center text-stone-800 mb-8 tracking-widest">—— 核雕技法深度解析 ——</h3>
            <CarvingGuide />
          </div>
        )}
      </main>

      <footer className="mt-20 text-center py-10 bg-stone-100 text-stone-400 text-sm">
        <p>© 2024 山海经九尾天狐核雕设计辅助系统 | 传承非遗 智创未来</p>
        <div className="mt-4 flex justify-center gap-4 text-lg">
          <i className="fa-brands fa-weixin hover:text-[#07c160] cursor-pointer"></i>
          <i className="fa-brands fa-weibo hover:text-[#e6162d] cursor-pointer"></i>
        </div>
      </footer>
    </div>
  );
};

export default App;
