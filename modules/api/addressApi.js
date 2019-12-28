const request = require('request-promise');

exports.module = async (keyword) => {
  option = {
    uri: 'http://www.juso.go.kr/addrlink/addrLinkApi.do',
    method: 'POST',
    confmKey: 'devU01TX0FVVEgyMDE5MTIyODE4NTIwMzEwOTM1NjQ=',
    currentPage: 1,
    countPerPage: 10,
    keyword: keyword,
    resultType: json,
  }

  let result = null;
  await request.post(option, (err, res, body) => {
    try {
      if (err) {
          console.log(`err: ${err}`)
      }
      result = body;
      console.log(body);  // api내역 조회
    } catch (err) {
      console.log(`err: ${err}`);
    }
  });
  return result;
}


