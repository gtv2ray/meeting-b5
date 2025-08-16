// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, Tabs, TabsList, TabsTrigger, TabsContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, Building, Shield } from 'lucide-react';

import UserManagement from '@/components/UserManagement';
import DepartmentManagement from '@/components/DepartmentManagement';
import PermissionManagement from '@/components/PermissionManagement';
export default function AdminDashboard(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('users');
  const {
    toast
  } = useToast();
  return <div className="p-6">
      <Card className="mb-6">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">系统管理</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" /> 用户管理
            </TabsTrigger>
            <TabsTrigger value="departments">
              <Building className="h-4 w-4 mr-2" /> 部门管理
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Shield className="h-4 w-4 mr-2" /> 权限管理
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserManagement $w={$w} />
          </TabsContent>
          
          <TabsContent value="departments">
            <DepartmentManagement $w={$w} />
          </TabsContent>
          
          <TabsContent value="permissions">
            <PermissionManagement $w={$w} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>;
}