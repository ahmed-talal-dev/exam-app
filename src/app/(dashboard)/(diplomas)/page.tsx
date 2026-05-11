'use client'
import useLogout from '@/app/(auth)/logout/_hooks/use-logout';
import { Button } from '@/components/ui/button'

export default function Home() {
  const { logout } = useLogout()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Home page original
      <Button variant="destructive" className="fixed z-50 top-4 right-4" onClick={logout}>
        Logout
      </Button>    </div>
  );
}