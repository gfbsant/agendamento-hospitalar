import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (!token) {
    console.log('Token não encontrado, redirecionando para login');
    router.navigate(['/login']);
    return false;
  }
  try {
    const isValid = authService.isTokenValid(token);
    if (!isValid) {
      console.log('Token inválido, redirecionando para login');
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }

}
