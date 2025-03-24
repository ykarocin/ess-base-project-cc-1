"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import AuthFooter from "@/components/AuthFooter";

interface LoginProps {
    onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const router = useRouter();

    const handleLogin = () => {
      onLoginSuccess();
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <AuthContainer>
          <div className="flex flex-col items-center space-y-4">
            <Logo />
            <Input type="text" placeholder="Usuário/Email" />
            <Input type="password" placeholder="Senha" />
            <Button onClick={handleLogin}>Login</Button>
          </div>
          <AuthFooter />
        </AuthContainer>
      </div>
    );
  }