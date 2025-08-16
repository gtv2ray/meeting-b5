// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, Table, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft } from 'lucide-react';

export default function UsersPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();

  // 模拟用户数据
  const users = [{
    id: 1,
    name: '张三',
    role: 'admin'
  }, {
    id: 2,
    name: '李四',
    role: 'user'
  }];
  return <div className="p-6">
      <Button onClick={() => $w.utils.navigateBack()} variant="outline" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> 返回
      </Button>
      
      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>ID</Table.Head>
              <Table.Head>姓名</Table.Head>
              <Table.Head>角色</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Card>
    </div>;
}