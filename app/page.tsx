


import {LoginLogo} from "component/logo";
import {LoginForm } from "component/form";




export default function Login() {


  return (
    <main className="relative w-screen h-screen flex items-center justify-center text-white text-3xl">
      <div className="flex flex-col absolute top-0 left-0 w-full h-full bg-black opacity-75 -z-5 "></div>
      <div className="absolute top-10 left-10  flex">
        <LoginLogo/>
      </div>
      <div>
        <LoginForm/></div>
    </main>
  );
}
