export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'inspetorbudganja.com.br';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
};
