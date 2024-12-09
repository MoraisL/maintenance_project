// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Pegue o token dos cookies

  // Verifica se a página acessada é pública
  const publicPaths = ['/login', '/register']; // Adicione outras páginas públicas, se necessário
  const isPublic = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // Se não tiver token e não estiver em uma página pública, redireciona para /login
  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url); // Redireciona para login
    return NextResponse.redirect(loginUrl);
  }

  // Prossegue normalmente para páginas públicas ou com token
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Aplica o middleware para todas as rotas
};
