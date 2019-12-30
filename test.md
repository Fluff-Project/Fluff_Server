## 경매 상품 등록
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | auction | 경매 상품 등록 |

\
[]()
**Request**
> body
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
            "color": "핑크",
            "category": "아우터",
            "hashtag": ["해시태그", "해시태그"],
            "size": "xxlg",
            "startCost": 20000, 
            "comment": "정민아 훨훨 날아라", 
            "condition": 10, 
            "style": "아메카지",
            "highestCost": 0,
            "mainImg": "imgURi",
            "img": ["imageUri", "imageUri"],
            "saleAuth": false,
            "bid": [],
            "createdAt": "2019-12-26T11:18:43.878+00:00",
        }
    }
}
```
\
[]()
> Fail : 경매 등록 실패
```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "경매 등록 실패",
    }
}
```
---
\
\
[]()
## 경매 상품 인가
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | auction/auth | 경매 상품 인가 |

\
[]()
**Request**
> body
```json
{
    "auth" true,
}
```
\
[]()
**Response**
> Success : 경매 상품 인가 승인
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매 상품을 인가하였습니다.",
        "data": {
            "auctionNmae": "경매 상품 이름",
            "mainImg": "메인 이미지",
            "img": ["이미지", "리스트"],
            "color": "핑크",
            "category": "아우터",
            "hashtag": ["해시태그", "해시태그"],
            "size": "xxlg",
            "startCost": 20000, 
            "comment": "정민아 훨훨 날아라", 
            "condition": 10, 
            "style": "아메카지",
            "highestCost": 0,
            "mainImg": "imgURi",
            "img": ["imageUri", "imageUri"],
            "saleAuth": true,
            "bid": [],
            "createdAt": "2019-12-26T11:18:43.878+00:00",
        }
    }
}
```
\
[]()
> Success : 경매 상품 인가 승인
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매 상품이 거부되었습니다.",
        "data": {
            "auctionNmae": "경매 상품 이름",
            "mainImg": "메인 이미지",
            "img": ["이미지", "리스트"],
            "color": "핑크",
            "category": "아우터",
            "hashtag": ["해시태그", "해시태그"],
            "size": "xxlg",
            "startCost": 20000, 
            "comment": "정민아 훨훨 날아라", 
            "condition": 10, 
            "style": "아메카지",
            "highestCost": 0,
            "mainImg": "imgURi",
            "img": ["imageUri", "imageUri"],
            "saleAuth": false,
            "bid": [],
            "createdAt": "2019-12-26T11:18:43.878+00:00",
        }
    }
}
```
\
[]()
> Fail : 상품 인가 서버 내부 에러
```json
{
    "code": 500,
    "json": {
        "success": true,
        "message": "경매 상품 인가 중 에러가 발생했습니다.",
    }
}
```
---
\
\
[]()
## 좋아요(찜) 여부 확인
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| GET | /auction?sort={정렬방식} | 경매 상품 리스트 조회 |

**Request**
> body
```http
{
    /auction
    /auction?sort=deadline
}
```
* sort=deadline : 경매시간이 남지않은 순으로 조회.

\
[]()
**Response**
> Success
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "경매 상품을 인가하였습니다.",
        "data": [{
            "auctionNmae": "경매 상품 이름",
            "mainImg": "메인 이미지",
            "img": ["이미지", "리스트"],
            "color": "핑크",
            "category": "아우터",
            "hashtag": ["해시태그", "해시태그"],
            "size": "xxlg",
            "startCost": 20000, 
            "comment": "정민아 훨훨 날아라", 
            "condition": 10, 
            "style": "아메카지",
            "highestCost": 0,
            "mainImg": "imgURi",
            "img": ["imageUri", "imageUri"],
            "saleAuth": true,
            "bid": [],
            "createdAt": "2019-12-26T11:18:43.878+00:00",
        },
        {
            "auctionNmae": "경매 상품 이름",
            "mainImg": "메인 이미지",
            "img": ["이미지", "리스트"],
            "color": "핑크",
            "category": "아우터",
            "hashtag": ["해시태그", "해시태그"],
            "size": "xxlg",
            "startCost": 20000, 
            "comment": "정민아 훨훨 날아라", 
            "condition": 10, 
            "style": "아메카지",
            "highestCost": 0,
            "mainImg": "imgURi",
            "img": ["imageUri", "imageUri"],
            "saleAuth": true,
            "bid": [],
            "createdAt": "2019-12-26T11:18:43.878+00:00",
        }]
    }
}
```

\
[]()
> Fail : 존재하지 않는 경매 상품
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "해당 조건에 일치하는 데이터가 없습니다.",
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
        "message": "경매 상품 리스트 조회 실패",
    }
}
```
---
\
\
[]()
## 경매 입찰하기
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auction/:id/bid | 경매 입찰 |

\
[]()
**Request**
> query string
```http
{
    id=auctionId
}
```
> socketIO
```http
{
    /socket
}
```
> body
```json
{
    "bid": 20000,
    "msg": "이건 내가 살꺼야"
}
```
\
[]()
**Response**
> Success : socket 답장하기
```json
{
    "bid": 20000,
    "msg": "이건 내가 살꺼야"
}
```
\
[]()
> Fail : 경매 상품 요청 파라미터가 잘못됨.
```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "파라미터 값이 잘못 되었습니다."
    }
}
```
> Fail : 서버 내부 에러
```json
{
    "code": 204,
    "json": {
        "success": false,
        "message": "요청에 일치하는 경매 상품이 없습니다.",
    }
}
```
> Fail : 경매가 종료됨.
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "경매가 이미 종료 되었습니다.",
    }
}
```
> Fail : 입찰 정보가 유효하지 않음.
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "입찰 정보가 유효하지 않습니다.",
    }
}
```
> Fail : 시작 가격보다 낮은 가격입찰.
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "시작 가격보다 높게 입찰해야 합니다.",
    }
}
```
> Fail : 시작 가격보다 낮은 가격입찰.
```json
{
    "code": 403,
    "json": {
        "success": false,
        "message": "이전 입찰가보다 높아야 합니다.",
    }
}
```
> Fail : 시작 가격보다 낮은 가격입찰.
```json
{
    "code": 500,
    "json": {
        "success": false,
        "message": "입찰 서버 내부 오류",
    }
}
```
---