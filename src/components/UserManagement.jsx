// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Table, Input, Select, Modal, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash, Search } from 'lucide-react';

const UserManagement = ({
  $w
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: '',
    role: 'user'
  });
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadUsers();
  }, []);
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
  const handleCreateUser = async () => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaCreateV2',
        params: {
          data: newUser
        }
      });
      toast({
        title: '用户创建成功'
      });
      setShowModal(false);
      loadUsers();
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  if (loading) {
    return <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  return <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input placeholder="搜索用户..." className="w-64" icon={<Search className="h-4 w-4" />} />
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> 新增用户
        </Button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>姓名</Table.Head>
            <Table.Head>邮箱</Table.Head>
            <Table.Head>部门</Table.Head>
            <Table.Head>角色</Table.Head>
            <Table.Head>状态</Table.Head>
            <Table.Head>操作</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => <Table.Row key={user._id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.department}</Table.Cell>
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

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>创建新用户</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Input label="姓名" value={newUser.name} onChange={e => setNewUser({
            ...newUser,
            name: e.target.value
          })} />
            <Input label="邮箱" type="email" value={newUser.email} onChange={e => setNewUser({
            ...newUser,
            email: e.target.value
          })} />
            <Select label="部门" value={newUser.department} onValueChange={value => setNewUser({
            ...newUser,
            department: value
          })}>
              <Select.Item value="tech">技术部</Select.Item>
              <Select.Item value="market">市场部</Select.Item>
            </Select>
            <Select label="角色" value={newUser.role} onValueChange={value => setNewUser({
            ...newUser,
            role: value
          })}>
              <Select.Item value="admin">管理员</Select.Item>
              <Select.Item value="user">普通用户</Select.Item>
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            取消
          </Button>
          <Button onClick={handleCreateUser}>
            创建
          </Button>
        </Modal.Footer>
      </Modal>
    </div>;
};
export default UserManagement;