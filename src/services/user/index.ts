import http from '@/utils/http';

export async function getCurrentUser() {
  return http.get('/api/currentUser');
}


export async function outLogin() {
  return http.post('/api/login/outLogin')
}

export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return http.post('/api/login/account', body, options)
}

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {

  return http.get('/api/login/captcha', params, options);
}