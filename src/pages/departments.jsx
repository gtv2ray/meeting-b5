// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, Table, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft } from 'lucide-react';

export default function DepartmentsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();

  // 模拟部门数据
  const departments = [{
    id: 1,
    name: '技术部',
    count: 15
  }, {
    id: 2,
    name: '市场部',
    count: 8
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
              <Table.Head>部门名称</Table.Head>
              <Table.Head>人数</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {departments.map(dept => <Table.Row key={dept.id}>
                <Table.Cell>{dept.id}</Table.Cell>
                <Table.Cell>{dept.name}</Table.Cell>
                <Table.Cell>{dept.count}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Card>
    </div>;
}