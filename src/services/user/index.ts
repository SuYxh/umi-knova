import http from '@/utils/http';

export async function getCurrentUser() {
  return http.get('/api/currentUser');
}
