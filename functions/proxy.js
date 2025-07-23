// functions/[...all].js

export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    // 原始路径 + 查询
    const pathAndQuery = url.pathname + url.search;
    // 目标 Worker 地址
    const target = `https://node-crypt.shadowflux.workers.dev${pathAndQuery}`;

    // 发起代理请求
    const resp = await fetch(target, {
        method: request.method,
        headers: request.headers,
        body: request.body,            // GET/HEAD 时 body 会自动忽略
        redirect: "manual",
    });

    // 原样返回 Worker 的响应
    return new Response(resp.body, {
        status: resp.status,
        headers: resp.headers,
    });
}
