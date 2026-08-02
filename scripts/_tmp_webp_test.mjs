const res = await fetch("https://images.weserv.nl/?url=pinnacle-ai-two.vercel.app/landing/scan-color.png&output=webp&q=82");
console.log(res.status, res.headers.get("content-type"), res.headers.get("content-length"));
