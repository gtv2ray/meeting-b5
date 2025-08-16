// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function AuthWrapper({
  children,
  $w,
  requiredRoles = ['user']
}) {
  const {
    toast
  } = useToast();
  if (!$w.auth.currentUser) {
    toast({
      title: '请先登录',
      variant: 'destructive'
    });
    $w.utils.redirectTo({
      pageId: 'login'
    });
    return null;
  }
  if (!requiredRoles.includes($w.auth.currentUser.type)) {
    toast({
      title: '权限不足',
      description: '您没有访问此页面的权限',
      variant: 'destructive'
    });
    $w.utils.redirectTo({
      pageId: 'meetings'
    });
    return null;
  }
  return children;
}