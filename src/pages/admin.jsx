// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, Table, Input, Select, Modal, Badge, useToast, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash, Search, ArrowLeft, Lock, Shield } from 'lucide-react';

export default function AdminPage(props) {
  const {
    $w
  } = props;
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [newDeptUser, setNewDeptUser] = useState({
    name: '',
    dept: '',
    role: 'user',
    password: ''
  });
  const {
    toast
  } = useToast();

  // 初始化加载用户数据
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'sys_user',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {}
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
      }
    };
    loadUsers();
  }, []);
  const filteredUsers = users.filter(user => user.name.includes(searchText) || user.dept.includes(searchText));
  const handleDelete = async userId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: userId
              }
            }
          }
        }
      });
      setUsers(users.filter(user => user._id !== userId));
      toast({
        title: '删除成功',
        description: '用户已删除'
      });
    } catch (error) {
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  const handleCreateDeptUser = async () => {
    if (!newDeptUser.name || !newDeptUser.dept || !newDeptUser.password) {
      toast({
        title: '请填写完整信息',
        variant: 'destructive'
      });
      return;
    }
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            name: newDeptUser.name,
            dept: newDeptUser.dept,
            role: newDeptUser.role,
            password: newDeptUser.password,
            status: 'active'
          }
        }
      });
      setUsers([...users, {
        _id: result.id,
        ...newDeptUser,
        status: 'active'
      }]);
      setNewDeptUser({
        name: '',
        dept: '',
        role: 'user',
        password: ''
      });
      setShowDeptModal(false);
      toast({
        title: '部门账号创建成功',
        description: `已为${newDeptUser.dept}创建账号`
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
      <Button onClick={() => $w.utils.navigateBack()} variant="outline" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> 返回
      </Button>
      
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => setShowUserModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> 新增用户
        </Button>
        <Button onClick={() => setShowDeptModal(true)} variant="secondary">
          <Shield className="h-4 w-4 mr-2" /> 创建部门账号
        </Button>
      </div>
      
      <Card>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">用户管理</h2>
          <Input placeholder="搜索用户..." className="w-64" value={searchText} onChange={e => setSearchText(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>ID</Table.Head>
              <Table.Head>姓名</Table.Head>
              <Table.Head>部门</Table.Head>
              <Table.Head>角色</Table.Head>
              <Table.Head>状态</Table.Head>
              <Table.Head>操作</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredUsers.map(user => <Table.Row key={user._id}>
                <Table.Cell>{user._id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.dept}</Table.Cell>
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
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(user._id)}>
                      <Trash className="h-4 w-4 mr-1" /> 删除
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Card>

      {/* 创建部门账号模态框 */}
      <Modal open={showDeptModal} onClose={() => setShowDeptModal(false)}>
        <Modal.Header>
          <Shield className="h-5 w-5 mr-2" />
          创建部门账号
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="space-y-4">
              <FormField name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="输入用户名" {...field} value={newDeptUser.name} onChange={e => setNewDeptUser({
                  ...newDeptUser,
                  name: e.target.value
                })} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField name="dept" render={({
              field
            }) => <FormItem>
                    <FormLabel>部门</FormLabel>
                    <FormControl>
                      <Select value={newDeptUser.dept} onValueChange={value => setNewDeptUser({
                  ...newDeptUser,
                  dept: value
                })}>
                        <Select.Trigger>
                          <Select.Value placeholder="选择部门" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="技术部">技术部</Select.Item>
                          <Select.Item value="市场部">市场部</Select.Item>
                          <Select.Item value="人事部">人事部</Select.Item>
                        </Select.Content>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField name="role" render={({
              field
            }) => <FormItem>
                    <FormLabel>角色</FormLabel>
                    <FormControl>
                      <Select value={newDeptUser.role} onValueChange={value => setNewDeptUser({
                  ...newDeptUser,
                  role: value
                })}>
                        <Select.Trigger>
                          <Select.Value placeholder="选择角色" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="admin">管理员</Select.Item>
                          <Select.Item value="user">普通用户</Select.Item>
                        </Select.Content>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField name="password" render={({
              field
            }) => <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="设置密码" {...field} value={newDeptUser.password} onChange={e => setNewDeptUser({
                  ...newDeptUser,
                  password: e.target.value
                })} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowDeptModal(false)}>
            取消
          </Button>
          <Button onClick={handleCreateDeptUser}>
            <Lock className="h-4 w-4 mr-2" /> 创建账号
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* 原有用户创建模态框 */}
      <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
        <Modal.Header>新增用户</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Input label="用户名" placeholder="输入用户名" />
            <Input label="密码" type="password" placeholder="输入密码" />
            <Select label="部门">
              <Select.Item value="tech">技术部</Select.Item>
              <Select.Item value="market">市场部</Select.Item>
            </Select>
            <Select label="角色">
              <Select.Item value="admin">管理员</Select.Item>
              <Select.Item value="user">普通用户</Select.Item>
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowUserModal(false)}>
            取消
          </Button>
          <Button onClick={() => {
          toast({
            title: '用户创建成功'
          });
          setShowUserModal(false);
        }}>
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </div>;
}