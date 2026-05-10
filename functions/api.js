// Cloudflare Pages Function — 处理数据读写
// 路径：/functions/api.js → 对应 URL：/api

export async function onRequestGet(ctx) {
  try {
    const data = await ctx.env.SHOPPING_DATA.get('data');
    return Response.json({
      ok: true,
      data: data ? JSON.parse(data) : null
    });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function onRequestPost(ctx) {
  try {
    const body = await ctx.request.json();
    await ctx.env.SHOPPING_DATA.put('data', JSON.stringify(body));
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}
