// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Bell } from 'lucide-react';

export function MeetingReminder({
  meetingId,
  $w
}) {
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSendReminder = async () => {
    try {
      setLoading(true);
      // 获取会议详情
      const meeting = await $w.cloud.callDataSource({
        dataSourceName: 'meetings',
        methodName: 'wedaGetItemV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: meetingId
              }
            }
          },
          select: {
            $master: true
          }
        }
      });

      // 发送提醒给所有参与者
      await Promise.all(meeting.participants.map(async participant => {
        // 这里可以调用邮件服务或其他通知服务
        console.log(`发送提醒给 ${participant.name}: ${meeting.title} 会议将在 ${meeting.date} ${meeting.time} 举行`);
      }));
      toast({
        title: '提醒发送成功'
      });
    } catch (error) {
      toast({
        title: '发送失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  return <Button variant="outline" onClick={handleSendReminder} disabled={loading}>
      <Bell className="h-4 w-4 mr-2" />
      {loading ? '发送中...' : '发送提醒'}
    </Button>;
}