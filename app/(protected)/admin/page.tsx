"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSucess } from "@/components/form-sucess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

  const onServerActionClick = () => {
    admin().then(data => {
      if(data.error){
        toast.error(data.error)
      }
      if(data.success){
        toast.success(data.success)
      }
    })
  }

  const onAPIRouteClick = () => {
    fetch('/api/admin').then(res => {
      if(res.ok){
        toast.success("Allowed API Route!")
      } else {
        toast.error("Forbidden API Route!")
      }
    })
  }

  return ( 
    <Card className="w-full max-w-[600px] mx-auto">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">ADMIN</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSucess message="You are an admin" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onAPIRouteClick}>
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server action</p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
   );
}
 
export default AdminPage;