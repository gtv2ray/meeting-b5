// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Mail, AlertCircle } from 'lucide-react';

export default function Register(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  React.useEffect(() => {
    toast({
      title: '注册功能已关闭',
      description: '请联系管理员创建账号',
      variant: 'destructive'
    });
  }, []);
  return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">账号注册</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium">注册功能已关闭</h3>
            <p className="text-gray-600">请联系管理员创建账号</p>
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" onClick={() => $w.utils.navigateBack()}>
                返回
              </Button>
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'login'
            })}>
                前往登录
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}