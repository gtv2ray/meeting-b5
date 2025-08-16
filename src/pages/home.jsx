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
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">会议管理系统</h1>
        <p className="text-xl text-gray-600">欢迎使用会议管理系统</p>
      </div>
      
      <div className="text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => $w.utils.navigateTo({
        pageId: 'login'
      })}>
          <Calendar className="h-5 w-5 mr-2" />
          开始使用
        </Button>
      </div>
    </div>;
}