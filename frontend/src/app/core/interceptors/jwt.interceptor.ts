import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Simulamos la recuperación del token desde el local storage o un servicio de auth
  const token = localStorage.getItem('token');
  
  if (token) {
    // Si existe el token, clonamos la petición y agregamos el header Authorization
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  // Si no hay token, dejamos pasar la petición tal cual
  return next(req);
};
