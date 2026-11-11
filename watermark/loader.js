// loader.js 壳：解密base64并执行
(function () {
  // 这里放你的水印代码base64
  const b64Code = 'your codeKGZ1bmN0aW9uKCl7CmNvbnN0IHdtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CndtLmNsYXNzTmFtZSA9ICd3YXRlcm1hcmstZm9sbG93JzsKd20uaW5uZXJUZXh0ID0gJ01hZGUgYnkgbHV5YW54aShHaXRIdWI6IGx1eWFuY2kpJzsKT2JqZWN0LmFzc2lnbih3bS5zdHlsZSwgewogIHBvc2l0aW9uOiAnZml4ZWQnLAogIHBvaW50ZXJFdmVudHM6ICdub25lJywKICBmb250U2l6ZTogJzE2cHgnLAogIGNvbG9yOiAncmdiYSgwLDAsMCwwLjI1KScsCiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsCiAgdXNlclNlbGVjdDogJ25vbmUnLAogIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgxMnB4LCAxMnB4KScsCiAgbGVmdDogJzBweCcsCiAgdG9wOiAnMHB4JywKICB6SW5kZXg6ICc5OTk5Jwp9KTsKZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3bSk7CmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7CiAgd20uc3R5bGUubGVmdCA9IGUuY2xpZW50WCArICdweCc7CiAgd20uc3R5bGUudG9wID0gZS5jbGllbnRZICsgJ3B4JzsKfSk7Cn0pKCk7';

  function decodeB64(str) {
    // 中文兼容解码
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  const realCode = decodeB64(b64Code);
  eval(realCode);
})();
