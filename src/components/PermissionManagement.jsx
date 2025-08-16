// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Table, Select, Badge, useToast } from '@/components/ui';

export default function PermissionManagement({
  $w
}) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadRoles();
  }, []);
  const loadRoles = async () => {
    try {
      // 这里假设有一个roles数据模型
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'roles',
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
      setRoles(result.records || []);
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
  const handleRoleChange = async (userId, newRole) => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            role: newRole
          },
          filter: {
            where: {
              _id: {
                $eq: userId
              }
            }
          }
        }
      });
      toast({
        title: '权限更新成功'
      });
      loadRoles();
    } catch (error) {
      toast({
        title: '更新失败',
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
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>角色名称</Table.Head>
            <Table.Head>权限描述</Table.Head>
            <Table.Head>状态</Table.Head>
            <Table.Head>操作</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {roles.map(role => <Table.Row key={role._id}>
              <Table.Cell>{role.name}</Table.Cell>
              <Table.Cell>{role.description}</Table.Cell>
              <Table.Cell>
                <Badge variant={role.status === 'active' ? 'default' : 'destructive'}>
                  {role.status === 'active' ? '活跃' : '禁用'}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Select value={role.level} onValueChange={value => handleRoleChange(role._id, value)}>
                  <Select.Item value="admin">管理员</Select.Item>
                  <Select.Item value="manager">部门经理</Select.Item>
                  <Select.Item value="user">普通用户</Select.Item>
                </Select>
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>;
}