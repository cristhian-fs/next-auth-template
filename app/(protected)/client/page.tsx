"use client"

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();
  return ( 
    <div className="max-w-[600px] w-full mx-0">
      <UserInfo label="Client component" user={user}/>
    </div>
   );
}
 
export default ClientPage;