import SignInForm from "@/components/SignInForm";


export default function SignIn() {

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2.5">Sign in</h1>
      <main className="flex justify-center h-[80vh] items-center">
        <SignInForm />
      </main>
    </>
  )
}

