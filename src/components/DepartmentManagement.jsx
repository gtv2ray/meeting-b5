// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Table, Input, Modal, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash, Search } from 'lucide-react';

export default function DepartmentManagement({
  $w
}) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({
    name: '',
    manager: ''
  });
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadDepartments();
  }, []);
  const loadDepartments = async () => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'departments',
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
      setDepartments(result.records || []);
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
  const handleCreateDept = async () => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'departments',
        methodName: 'wedaCreateV2',
        params: {
          data: newDept
        }
      });
      toast({
        title: '部门创建成功'
      });
      setShowModal(false);
      loadDepartments();
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
        <Input placeholder="搜索部门..." className="w-64" icon={<Search className="h-4 w-4" />} />
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> 新增部门
        </Button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>部门名称</Table.Head>
            <Table.Head>负责人</Table.Head>
            <Table.Head>成员数</Table.Head>
            <Table.Head>状态</Table.Head>
            <Table.Head>操作</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {departments.map(dept => <Table.Row key={dept._id}>
              <Table.Cell>{dept.name}</Table.Cell>
              <Table.Cell>{dept.manager}</Table.Cell>
              <Table.Cell>{dept.memberCount || 0}</Table.Cell>
              <Table.Cell>
                <Badge variant={dept.status === 'active' ? 'default' : 'destructive'}>
                  {dept.status === 'active' ? '活跃' : '禁用'}
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
        <Modal.Header>创建新部门</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Input label="部门名称" value={newDept.name} onChange={e => setNewDept({
            ...newDept,
            name: e.target.value
          })} />
            <Input label="负责人" value={newDept.manager} onChange={e => setNewDept({
            ...newDept,
            manager: e.target.value
          })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            取消
          </Button>
          <Button onClick={handleCreateDept}>
            创建
          </Button>
        </Modal.Footer>
      </Modal>
    </div>;
}