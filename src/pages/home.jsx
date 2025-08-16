// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Calendar } from 'lucide-react';

export default function HomePage(props) {
  const {
    $w
  } = props;
  const features = [{
    title: "会议管理",
    description: "创建、安排和管理您的会议",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }, {
    title: "参会人员管理",
    description: "管理会议参与者和权限",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }, {
    title: "会议统计分析",
    description: "会议数据和参与度分析",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }];
  return <div className="min-h-screen bg-gray-50 p-6">
      {/* 头部标题 */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">山金期货会议管理系统</h1>
      </header>

      {/* 功能展示区 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-1">
            <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>)}
      </div>

      {/* 入口按钮 */}
      <div className="text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300" onClick={() => $w.utils.navigateTo({
        pageId: 'login'
      })}>
          <Calendar className="h-5 w-5 mr-2" />
          进入会议系统
        </Button>
      </div>
    </div>;
}