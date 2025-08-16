// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, Table, Input, Select, Modal, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash, Search, ArrowLeft, Lock, Shield } from 'lucide-react';

export default function AdminPage(props) {
  const {
    $w
  } = props;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'sys_user',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {}
            },
            select: {
              $master: true
            }
          }
        });
        setUsers(result.records || []);
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
    loadUsers();
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  return <div className="p-6">
      <Card>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">用户管理</h2>
        </div>
        <div className="p-4">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>用户名</Table.Head>
                <Table.Head>角色</Table.Head>
                <Table.Head>状态</Table.Head>
                <Table.Head>操作</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => <Table.Row key={user._id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status === 'active' ? '活跃' : '禁用'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" /> 编辑
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash className="h-4 w-4 mr-1" /> 删除
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>;
}