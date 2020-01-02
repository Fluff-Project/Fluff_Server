## 스타일 조사 결과를 DB에 넣기
> Context-type : application/json

| 메소드 |  경로  | 짧은설명 |
--------|--------|--------
| POST | recommend/keyDB | 클라에서 준 스타일 카운트 값을 DB에 저장하기 |

\
[]()
**Request**
> Body
```json
{
   "style": ["simple", "unique", "amekaji"]
}
```
\
[]()
**Response**
> Success : 데이터베이스에 스타일 업데이트 성공 
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "스타일 업데이트가 성공했습니다"
    }
}
```

\
[]()
> Fail: 데이터베이스에 스타일 업데이트 실패
```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "해당 조건에 일치하는 데이터가 없습니다."
    }
}
```
> Fail : 서버 내부 에러
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "서버 내부 오류"
    }
}
```
\
[]()

---
\
\
[]()
## 유저 취향에 따른 추천 상품 조회
> Context-type : application/json

| 메소드 |  경로  | 짧은설명 |
--------|--------|--------
| GET | recommend/style | 설문조사를 바탕으로 한 content based filtering 추천 알고리즘 적용 |

\
[]()
**Request**
> Uri
```http
recommend/style?page=7
```
\
[]()
**Response**
> Success : 데이터베이스에 스타일 업데이트 성공 
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "스타일 추천 success",
        "data": [
            {
                "goodsName": "아가일 루즈 니트",
                "mainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577905492787.jpg",
                "sellerName": "체르니치는채린어린이",
                "price": 27000,
                "_id": "5e0ced57e055d50011a1d654"
            },
            {
                "goodsName": "mcm데님",
                "mainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577920717044.jpg",
                "sellerName": "냠냐미~",
                "price": 35000,
                "_id": "5e0d28cfe055d50011a1d695"
            },
            {
                "goodsName": "해보자 확인을 ",
                "mainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577883390676.png",
                "sellerName": "체르니치는채린어린이",
                "price": 20000,
                "_id": "5e0c96ff2eb162a9f3e77e51"
            },
            {
                "goodsName": "test_7",
                "mainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577884585995.png",
                "sellerName": "wefewfe",
                "price": 20000,
                "_id": "5e0c9baaf683ecaad9a83371"
            }
        ]
    }
}
```

\
[]()
> Fail: 추천 알고리즘 실패
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "스타일 추천 fail"
    }
}
```
\
[]()

---
\
\
[]()
## 유저가 좋아할만한 판매자 리스트 조회
> Context-type : application/json

| 메소드 |  경로  | 짧은설명 |
--------|--------|--------
| GET | recommend/seller | 유저와 취향이 비슷한 판매자 리스트 조회 |

\
[]()
**Request**
> Uri
```http
/recommend/seller?page{7}
```
\
[]()
**Response**
> Success : 데이터베이스에 스타일 업데이트 성공 
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "내가 좋아할 만한 seller list 조회 성공",
        "data": [
            {
                "sellerId": "5e0a416f217f2200119b6037",
                "sellerName": "자일동생신일",
                "sellerImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577900004905.png",
                "goodsMainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577903085757.jpg"
            },
            {
                "sellerId": "5e0a4352217f2200119b603c",
                "sellerName": "12345연서",
                "sellerImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577900363506.png",
                "goodsMainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577903488469.jpg"
            },
            {
                "sellerId": "5e0a4459217f2200119b6041",
                "sellerName": "최다예뻐",
                "sellerImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577900752556.png",
                "goodsMainImg": "https://fluff-s3.s3.ap-northeast-2.amazonaws.com/1577908269402.jpg"
            }
        ]
    }
}
```

\
[]()
> Fail: 판매자를 찾지 못할 경우
```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "잘못된 요청"
    }
}
```
> Fail: 서버 내부오류
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "서버 내부오류"
    }
}
```
\
[]()

---