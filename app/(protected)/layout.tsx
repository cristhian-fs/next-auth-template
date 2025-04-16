import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-10">
      <Navbar />
      {children}
    </div>
   );
}
 
export default ProtectedLayout;