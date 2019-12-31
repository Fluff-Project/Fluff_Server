## 이메일 중복 확인
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auth/checkEmail | 이메일이 가입되어 있는 이메일인지 중복 확인 |

\
[]()
**Request**
> body
```json
{
    "email": "email"
}
```
\
[]()
**Response**
> Sucess: 이미 회원가입 된 이메일
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "${email}는 이미 회원가입한 email입니다..",
        "data": {
            "email": "입력받은 이메일"
        }
    }
}
```
> Sucess : 회원가입되지 않은 (사용할 수 있는 이메일)

```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "${email}는 이미 회원가입 가능한 email입니다.",
    }
}
```
\
[]()
> Fail : 로그인 실패

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
## 로컬 회원가입
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auth/signUp | 이메일 인증을 이용한 회원가입 |

\
[]()
**Request**
> body
```json
{
    "email": email,
    "username": username,
    "pwd": pwd,
    "gender": gender
}
```
\
[]()
**Response**
> Sucess
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "메일 전송을 성공하였습니다.",
        "data": {
            "message": "Send mail"
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
        "message": "이메일 전송을 실패했습니다.",
    }
}
```
> Fail : 로그인 실패

```json
{
    "code": 400,
    "json": {
        "success": false,
        "message": "로그인이 실패하였습니다.",
    }
}
```
---
\
\
[]()
## 로컬 이메일 인증
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auth/emailAuth | 유저가 이메일에서 '인증' 버튼을 누를 시 redirect되는 uri |

\
[]()
**Response**
> Sucess
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "회원가입에 성공하였습니다.",
        "data": {
            "username": "유저네임",
            "email": "이메일",
            "pwd": "비밀번호",
            "gender": "설명",
        }
    }
}
```
\
[]()
> Fail : cache memory -> Database store중 error 발생
```json
{
    "code": 500,
    "json": {
        "success": true,
        "message": "서버 내부 오류",
    }
}
```
---
\
\
[]()
## 로컬 로그인
> Context-type : application/json

| 메소드 | 경로   | 짧은 설명 |
| ------ | ------ | --------- |
| POST | /auth/login | 로컬 로그인 |

\
[]()
**Request**
> body
```json
{
    "email": "이메일",
    "pwd": "비밀번호"
}
```
\
[]()
**Resonse**
> Sucess
```json
{
    "code": 200,
    "json": {
        "success": true,
        "message": "로그인이 성공하였습니다.",
        "data": {
            "token": "토큰",
            "refresh": "리프레시 토큰"
        }
    }
}
```
\
[]()
> Fail : 가입되지 않은 사용자입니다.
```json
{
    "code": 400,
    "json": {
        "success": true,
        "message": "사용자가 이미 있습니다.",
    }
}
```



