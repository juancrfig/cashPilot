import Link from "next/link";
export default function Login() {
  return (
    <div>
      <header>
        <div className="flex m-7 ml-[4.5vw] mb-2">
          <img src="./logo.png" alt="" /> 
          <h1 className="text-6xl pt-4 pl-7">Login</h1>
        </div>
        <hr className="w-[90vw] ml-22 text-[#0067FE] border-t-4 border-[#0067FE] rounded-full"/>
      </header>
      <section className="flex mt-[7vw] justify-center">
          <div className="text-center p-10 pl-20 pr-20 w-[50vw] rounded-[5rem] border-5 border-[#0067FE] shadow-[0_0_100px_#0067FE] justify-items-start">
            <h1 className="text-5xl mb-4 ml-5 ">Email</h1>
            <input placeholder="name@email.com" type="text" name="" id="EmailInput"  className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
            <h1 className="text-5xl ml-5 text-left mb-4">Password</h1>
            <input placeholder="**********" type="text" name="" id="PasswordInput"  className="mb-4 placeholder:opacity-40 text-5xl w-full py-3 px-6 bg-[#12193A] rounded-4xl"/>
            <h1 className="mt-5 mb-4 text-2xl ml-5">¿No tienes cuenta?, Registrate <Link href="/" className="text-[#0067FE] underline hover:text-[#3399FF]">Aquí</Link>.</h1>
            <button className="px-15 text-5xl border-[#0067FE] border-2 p-2 rounded-full bg-[#0067FE]">Login</button>
          </div>
      </section>
    </div>
  );
}