// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar as CalendarIcon } from 'lucide-react';

import { useForm } from 'react-hook-form';
export default function CreateMeeting(props) {
  const {
    $w
  } = props;
  const form = useForm();
  const {
    toast
  } = useToast();
  const onSubmit = async data => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'meetings',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            description: data.description || '',
            participants: []
          }
        }
      });
      toast({
        title: '创建成功'
      });
      $w.utils.navigateTo({
        pageId: 'meetings'
      });
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  return <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">创建新会议</h1>
      
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

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => $w.utils.navigateTo({
            pageId: 'meetings'
          })}>
              取消
            </Button>
            <Button type="submit">创建会议</Button>
          </div>
        </form>
      </Form>
    </div>;
}