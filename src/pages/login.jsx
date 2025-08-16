// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { Lock, User } from 'lucide-react';

export default function Login(props) {
  const {
    $w
  } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleLogin = async () => {
    try {
      setLoading(true);

      // 硬编码admin账号验证
      if (username === 'admin' && password === 'admin123') {
        toast({
          title: '登录成功',
          description: '欢迎管理员'
        });
        $w.utils.navigateTo({
          pageId: 'admin'
        });
        return;
      }
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              username: {
                $eq: username
              },
              password: {
                $eq: password
              }
            }
          }
        }
      });
      if (result.records.length > 0) {
        const user = result.records[0];
        toast({
          title: '登录成功'
        });
        if (user.role === 'admin') {
          $w.utils.navigateTo({
            pageId: 'admin'
          });
        } else {
          $w.utils.navigateTo({
            pageId: 'meetings'
          });
        }
      } else {
        toast({
          title: '登录失败',
          description: '用户名或密码错误',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">会议管理系统登录</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>用户名</span>
            </div>
            <Input placeholder="请输入用户名" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>密码</span>
            </div>
            <Input type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </CardContent>
      </Card>
    </div>;
}