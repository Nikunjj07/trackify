import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value
  
  if(token){
    redirect("/dashboard")
  }else{
    redirect("/landing")
  }
}