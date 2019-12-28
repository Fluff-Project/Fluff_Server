## 경매 상품 등록
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | goods/:goodsId/like | 경매 상품 등록(관리자 승인 후 업로드됨) |

\
[]()
**Request**
```json
{
  "auctionNmae": "경매 상품 이름",
  "mainImg": "메인 이미지",
  "img": ["이미지", "리스트"],

  "color": "상품 색상",
  "category": "상품 카테고리",
  "hashtag": "상품 해시태그",
  "size": "사이즈",

  "startCost": "시작 가격",
  "comment": "판매자 한줄 평",
  "condition": "상품 상태",
  "style": "스타일",
}
```
\
[]()
**Response**
> Success
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매 작성 성공",
        "data": {
          "auctionNmae": "경매 상품 이름",
          "mainImg": "메인 이미지",
          "img": ["이미지", "리스트"],

          "color": "상품 색상",
          "category": "상품 카테고리",
          "hashtag": "상품 해시태그",
          "size": "사이즈",

          "startCost": "시작 가격",
          "comment": "판매자 한줄 평",
          "condition": "상품 상태",
          "style": "스타일",
          "bid": [],
          "authorization": false,
        }
    }
}
```
\
[]()
> Fail : 인증 이메일 전송 실패

```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "경매 작성 실패",
    }
}
```
---
\
\
[]()
## 경매상품 인가
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auction/auth | 등록 요청된 상품을 경매 등록(관리자 권한) |

\
[]()
**Request**
```json
{
  "auth": true
}
```
\
[]()
**Response**
> Successn : 경매 물품 인가
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매물품을 인가하였습니다.",
        "data": {
          "auctionNmae": "경매 상품 이름",
          "mainImg": "메인 이미지",
          "img": ["이미지", "리스트"],

          "color": "상품 색상",
          "category": "상품 카테고리",
          "hashtag": "상품 해시태그",
          "size": "사이즈",

          "startCost": "시작 가격",
          "comment": "판매자 한줄 평",
          "condition": "상품 상태",
          "style": "스타일",
          "bid": [],
          "authorization": true,
        }
    }
}
```
> Successn : 경매 물품 인가
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매물품이 거부되었습니다.",
        "data": {
          "auctionNmae": "경매 상품 이름",
          "mainImg": "메인 이미지",
          "img": ["이미지", "리스트"],

          "color": "상품 색상",
          "category": "상품 카테고리",
          "hashtag": "상품 해시태그",
          "size": "사이즈",

          "startCost": "시작 가격",
          "comment": "판매자 한줄 평",
          "condition": "상품 상태",
          "style": "스타일",
          "bid": [],
          "authorization": false,
        }
    }
}
```
\
[]()
> Fail : 서버 내부 에러
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "서버 내부 오류",
    }
}
```
---
\
\
[]()
## 경매 상품 리스트 조회
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| GET | /auction?sort={정렬방식} | 인가된 경매상품 리스트 조회 |

\
[]()
**Request**
> default: recently
```http
/auction?sort=deadline
```

\
[]()
**Response**
> Success
```json
{
    "code": 200,
    "json": [{
        "success": true,
        "message": "경매 상품 조회 성공",
        "data": {
          "auctionNmae": "경매 상품 이름",
          "mainImg": "메인 이미지",
          "img": ["이미지", "리스트"],

          "color": "상품 색상",
          "category": "상품 카테고리",
          "hashtag": "상품 해시태그",
          "size": "사이즈",

          "startCost": "시작 가격",
          "comment": "판매자 한줄 평",
          "condition": "상품 상태",
          "style": "스타일",
          "bid": [],
          "authorization": true,
        },
        {
          "auctionNmae": "경매 상품 이름",
          "mainImg": "메인 이미지",
          "img": ["이미지", "리스트"],

          "color": "상품 색상",
          "category": "상품 카테고리",
          "hashtag": "상품 해시태그",
          "size": "사이즈",

          "startCost": "시작 가격",
          "comment": "판매자 한줄 평",
          "condition": "상품 상태",
          "style": "스타일",
          "bid": [],
          "authorization": true,
        }
    }

    ]
}
```
\
[]()
> Fail : 경매 상품 리스트 없음.
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "해당 조건에 일치하는 데이터가 없습니다.",
    }
}
```
> Fail : 서버 내부 에러
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "경매 전체 조회 실패",
    }
}
```
---
