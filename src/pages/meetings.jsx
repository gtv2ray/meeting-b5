// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Users } from 'lucide-react';

export default function Meetings(props) {
  const {
    $w
  } = props;
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const currentUser = $w.auth.currentUser;
        const isAdmin = currentUser?.role === 'admin';
        let filter = {};
        if (!isAdmin && currentUser?.department) {
          filter = {
            where: {
              'participants.department': {
                $eq: currentUser.department
              }
            }
          };
        }
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'meetings',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            filter: filter,
            pageSize: 10,
            pageNumber: 1
          }
        });
        setMeetings(result.records);
      } catch (error) {
        toast({
          title: '加载失败',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);
  if (loading) return <div className="p-6">加载中...</div>;
  return <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">会议列表</h1>
        <Button onClick={() => $w.utils.navigateTo({
        pageId: 'createMeeting'
      })}>
          创建会议
        </Button>
      </div>

      <div className="grid gap-4">
        {meetings.map(meeting => <Card key={meeting._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{meeting.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{meeting.participants?.length || 0}人</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => $w.utils.navigateTo({
              pageId: 'meetingDetail',
              params: {
                id: meeting._id
              }
            })}>
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
}