'use client'

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { firebaseAuth, googleAuthProvider } from "../../firebase/clientApp"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { apiEndpoints } from "@/lib/shared/apiEndpoints"

async function handleAssignRole(uid: string | undefined) {
    fetch(apiEndpoints.v1.user.assignRole + uid, { method: 'POST' })
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signInWithGoogle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider)
      await handleAssignRole(firebaseAuth.currentUser?.uid)
      toast("Bem vindo " + (firebaseAuth.currentUser?.displayName || ''))
    } catch (err) {
      console.error(err)
      toast("Erro ao fazer login, tente de novo")
    }
  }
  async function signUp() {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      await handleAssignRole(firebaseAuth.currentUser?.uid)
      toast("Bem vindo " + (firebaseAuth.currentUser?.displayName || ''))
    } catch (err) {
      console.error(err)
      toast("Erro ao fazer cadastrar, tente de novo")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Entre com sua conta Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button onClick={signInWithGoogle} variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Entrar com Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  ou cadastre-se
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@examplo.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input id="password" type="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button onClick={signUp} type="submit" className="w-full">
                  Cadastrar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Ao clicar em cadastrar você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}

