// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar as CalendarIcon, UserPlus } from 'lucide-react';

import { useForm } from 'react-hook-form';
export default function EditMeeting(props) {
  const {
    $w
  } = props;
  const meetingId = $w.page.dataset.params.id;
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const {
    toast
  } = useToast();
  const form = useForm();
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
                  $eq: meetingId
                }
              }
            },
            select: {
              $master: true
            }
          }
        });
        setMeeting(result);
        form.reset({
          title: result.title,
          date: result.date,
          time: result.time,
          location: result.location,
          description: result.description
        });
        setParticipants(result.participants || []);
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
    fetchMeeting();
  }, [meetingId]);
  const onSubmit = async data => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'meetings',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            description: data.description,
            participants: participants
          },
          filter: {
            where: {
              _id: {
                $eq: meetingId
              }
            }
          }
        }
      });
      toast({
        title: '更新成功'
      });
      $w.utils.navigateTo({
        pageId: 'meetingDetail',
        params: {
          id: meetingId
        }
      });
    } catch (error) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleAddParticipant = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'users',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          pageSize: 10,
          pageNumber: 1
        }
      });
      // 这里可以添加选择参与者的UI逻辑
      // 简化示例：直接添加第一个用户
      if (result.records.length > 0) {
        setParticipants([...participants, {
          name: result.records[0].name,
          role: '参与者'
        }]);
      }
    } catch (error) {
      toast({
        title: '添加失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  if (loading) return <div className="p-6">加载中...</div>;
  if (!meeting) return <div className="p-6">会议不存在</div>;
  return <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">编辑会议</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="title" render={({
          field
        }) => <FormItem>
              <FormLabel>会议标题</FormLabel>
              <FormControl>
                <Input placeholder="请输入会议标题" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <FormField control={form.control} name="date" render={({
          field
        }) => <FormItem>
              <FormLabel>日期</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} />
                  <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <FormField control={form.control} name="time" render={({
          field
        }) => <FormItem>
              <FormLabel>时间</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <FormField control={form.control} name="location" render={({
          field
        }) => <FormItem>
              <FormLabel>地点</FormLabel>
              <FormControl>
                <Input placeholder="请输入会议地点" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <FormField control={form.control} name="description" render={({
          field
        }) => <FormItem>
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Input placeholder="请输入会议描述" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">参会人员</h3>
            <div className="grid gap-2 mb-4">
              {participants.map((p, i) => <div key={i} className="flex justify-between items-center">
                  <div>
                    <span>{p.name}</span>
                    <span className="text-gray-500 ml-2">{p.role}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setParticipants(participants.filter((_, index) => index !== i))}>
                    移除
                  </Button>
                </div>)}
            </div>
            <Button type="button" variant="outline" onClick={handleAddParticipant}>
              <UserPlus className="h-4 w-4 mr-2" />
              添加参与者
            </Button>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => $w.utils.navigateTo({
            pageId: 'meetingDetail',
            params: {
              id: meetingId
            }
          })}>
              取消
            </Button>
            <Button type="submit">保存更改</Button>
          </div>
        </form>
      </Form>
    </div>;
}