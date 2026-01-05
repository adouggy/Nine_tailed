
import React from 'react';

const CarvingGuide: React.FC = () => {
  const guides = [
    { title: "选材", content: "建议选用陈年老油核，核质坚硬细腻，上色快且不易开裂。" },
    { title: "开脸", content: "美女九尾需注重‘三庭五眼’，追求清秀典雅；狐妖九尾需注重眼神的灵动与威严。" },
    { title: "层次", content: "利用橄榄核的厚度，进行高浮雕处理，九尾交错处建议采用掏空工艺（玲珑雕）。" },
    { title: "磨光", content: "精雕后需进行多次砂纸打磨，最后用鬃刷抛光，呈现如玉般的质感。" }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {guides.map((g, i) => (
        <div key={i} className="bg-white/50 border-l-4 border-amber-800 p-4 rounded shadow-sm">
          <h4 className="font-bold text-amber-900 mb-1">{g.title}</h4>
          <p className="text-sm text-stone-600 leading-relaxed">{g.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CarvingGuide;
