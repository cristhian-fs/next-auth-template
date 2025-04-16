import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <p className="font-semibold text-2xl text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary">{user?.id}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border">
          <p className="text-sm font-medium">
            Username
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary">{user?.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border">
          <p className="text-sm font-medium">
            User email
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary">{user?.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border">
          <p className="text-sm font-medium">
            User Role
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary">{user?.role}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border">
          <p className="text-sm font-medium">
            Two Factor Enabled
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary">{user?.isTwoFactorEnabled ? "ON" : "OFF"}</p>
        </div>
      </CardContent>
    </Card>
  )
}