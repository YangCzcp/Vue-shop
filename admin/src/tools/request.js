import axios from 'axios'
import { Loading, Notification } from 'element-ui';

let loading;
// 请求拦截
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading = Loading.service({ background: 'rgba(0, 0, 0, 0.8)' });
	console.log(config.url)
    if(config.url=='/admins/login' || config.url=='/admins/register'){
        return config;
    }
    let token = localStorage.getItem('token')
    // token  是登录后接口会给我们返回token
    // 除了不需要登录的接口以外，其他接口都需要携带token
    config.headers.Authorization = 'Bearer '+token

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function ({ status, data, response }) {
	//在这里你可以判断后台返回数据携带的请求码
	loading.close();
	switch (status) {
		case 200:
			return data;
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: '请查看network信息',
			});
			break;
	}
}, function ({ response: { status, data, statusText } }) {
	switch (status) {
		case 401:
			// 提示用户
			let expiredTime = new Date(data.inner.expiredAt).toLocaleString();
			Notification.error({
				title: `错误：${status}`,
				message: `token已过期，有效期至${expiredTime}，请重新登录！`,
			});
			// 获取当前路由，跳转登录
			let { fullPath } = router.history.current;
			router.replace({ path: '/', query: { redirect: fullPath } });
			break;
		case 404:
			Notification.error({
				title: `错误：${status}`,
				message: 'api接口地址错误，请重新检查！',
			});
			break;
		case 500:
			Notification.error({
				title: `错误：${status}`,
				message: '后台接口错误，请联系后台开发！',
			});
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: statusText,
			});
			break;
	}
});