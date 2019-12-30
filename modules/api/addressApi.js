const request = require('request');

exports.module = async (keyword) => {


request.get('http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do?resultType=json&currentPage=1&countPerPage=5&keyword=%ED%95%9C%EA%B5%AD%EC%A7%80%EC%97%AD%EC%A0%95%EB%B3%B4%EA%B0%9C%EB%B0%9C%EC%9B%90++&currentPageRoad=1&countPerPageRoad=5&resultTypeRoad=json&keywordRoad=%ED%95%9C%EA%B5%AD%EC%A7%80%EC%97%AD%EC%A0%95%EB%B3%B4%EA%B0%9C%EB%B0%9C%EC%9B%90++&roadAddr=&bdNm=&roadAddrPart1=&bdKdcd=&roadAddrPart2=&siNm=&engAddr=&sggNm=&jibunAddr=&emdNm=&zipNo=&liNm=&admCd=&rn=&rnMgtSn=&udrtYn=&bdMgtSn=&buldMnnm=&buldSlno=&detBdNmList=&mtYn=&emdNo=&lnbrMnnm=&lnbrSlno=&_=1577689446469&confmKey=devU01TX0FVVEgyMDE5MTIzMDE2MjM1MTEwOTM1OTQ=', (err, res, body) => {
  console.log(body);
});


  // const options = {
  //   uri:'http://www.juso.go.kr/addrlink/addrLinkApi.do',
  //   method: 'POST',
  //   body: {
  //     confmKey:	'devU01TX0FVVEgyMDE5MTIzMDE2MjM1MTEwOTM1OTQ=',
  //     currentPage: 1,
  //     countPerPage: 10,
  //     keyword: keyword,
  //     resultType: 'json',
  //   },
  //   json:true
  // };
  
  // const result = request.post(options, (err, httpResponse, body) => {
  //   console.log(body);
    
  // });
  console.log(result);
  return result;
};

