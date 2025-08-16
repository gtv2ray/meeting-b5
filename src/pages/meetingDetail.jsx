// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function MeetingDetail(props) {
  const {
    $w
  } = props;
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'meetings',
          methodName: 'wedaGetItemV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: $w.page.dataset.params.id
                }
              }
            },
            select: {
              $master: true
            }
          }
        });
        setMeeting(result);
      } catch (error) {
        toast({
          title: '获取会议详情失败',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [$w.page.dataset.params.id]);
  if (loading) {
    return <div className="p-6">加载中...</div>;
  }
  if (!meeting) {
    return <div className="p-6">未找到会议信息</div>;
  }
  return <div className="p-6">
      <Button onClick={() => $w.utils.navigateBack()} variant="outline" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> 返回
      </Button>
      
      <Card>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{meeting.title}</h1>
            <Badge variant="default">进行中</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>{meeting.date}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{meeting.time}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{meeting.location}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                参会人员
              </h3>
              <div className="space-y-2">
                {meeting.participants?.map((p, i) => <div key={i} className="flex justify-between">
                    <span>{p.name}</span>
                    <Badge variant="secondary">{p.role}</Badge>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">会议描述</h3>
            <p className="text-gray-600">{meeting.description}</p>
          </div>
        </div>
      </Card>
    </div>;
}