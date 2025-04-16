import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();
  return ( 
    <div className="max-w-[600px] w-full mx-0">
      <UserInfo label="Server component" user={user}/>
    </div>
   );
}
 
export default ServerPage;