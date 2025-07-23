// functions/proxy.js
// 一个 Cloudflare Pages Functions 示例，用于将 /proxy/* 请求转发到已有的 Worker

export async function onRequest(context) {
    const { request, env } = context;
    const incomingUrl = new URL(request.url);

    // 去掉 /proxy 前缀，获取原始路径和查询参数
    const proxyPath = incomingUrl.pathname.replace(/^\/proxy/, "");
    const targetUrl = `https://node-crypt.shadowflux.workers.dev${proxyPath}${incomingUrl.search}`;

    // 将请求转发给原 Worker，并保留方法、头和 body
    const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
    });

    // 返回 Worker 的响应
    return new Response(response.body, {
        status: response.status,
        headers: response.headers
    });
}