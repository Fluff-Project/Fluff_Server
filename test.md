<div align="center" style="display:flex;">
	<img src="https://user-images.githubusercontent.com/39257919/71553942-423e6f80-2a5b-11ea-972f-364c5b896b60.png">
</div>
<div align="center">
🗣 CUSE ME_SERVER  💻
<br>발달장애인을 위한 카드형 의사소통도구, 큐즈미
</div>

---
발달장애인들에게 세상은 넓고 깊은 바다와 같습니다.<br> 
말이 통하지 않는 사람들로 가득한 세상은 그들에겐 함부로 나아가기 어렵고, 무서운 곳이니까요.<br> 
 **우리는 발달장애인들도 넓은 세상을 자유롭게 헤엄칠 수 있기를 바랍니다.** 
<br> 우리와 최소한의 의사소통이 가능하다면, 발달장애인의 세상도 조금은 넓어지지 않을까요?

&nbsp;
&nbsp;

```
💕	약자가 배제되지 않는 세상을 꿈꿉니다.
	일상에서 말이 통하지 않는다는 이유로 세상을 포기하지 않았으면 좋겠습니다.
```
```
💕	이 앱을 마주할 모든 사용자를 생각했습니다.
	발달장애인 뿐만 아니라 보호자, 이 앱을 마주할 비장애인들을 모두 고려한 UX
```
```
💕	기존 앱보다 사용성을 높였습니다.
	TTS(Text To Speach), 음성 녹음, 카드 공유 기능
```

------
&nbsp;

###  SOPT 25th APPJAM 💫

- 개발 기간 : 2019년 12월 24일 ~ 2020년 1월 4일

&nbsp;


## 🐳 Main Functions 

   1. 회원가입 없이 장치 고유의 아이디인 UUID로 사용자 생성/식별
   2. 카드 각각의 시리얼번호를 중복되지 않는 랜덤값으로 생성하여 다운로드 기능 구현
   3. 카드 조회 시 클라이언트에서 변경된 순서대로 / 많이 클릭 된 순서대로 / 이름 순으로 정렬하여 보여줌
   
&nbsp;

## ⚙️ Dependencies
```
"dependencies": {
	"aws-sdk": "^2.596.0",
	"cookie-parser": "~1.4.4",
	"debug": "~2.6.9",
	"express": "~4.16.1",
	"http-errors": "~1.6.3",
	"jade": "~1.11.0",
	"jsonwebtoken": "^8.5.1",
	"moment": "^2.24.0",
	"morgan": "~1.9.1",
	"multer": "^1.4.2",
	"multer-s3": "^2.9.0",
	"pm2": "^4.2.1",
	"promise-mysql": "^4.1.1",
	"rand-token": "^0.4.0"
}
```

&nbsp;

## :memo: ERD
![ERD](https://user-images.githubusercontent.com/52127966/71724507-da7d8f80-2e73-11ea-852b-703cd5457a04.png)
&nbsp;
&nbsp;



## 💻 Architecture 

![01_AWS_Architecture](https://user-images.githubusercontent.com/35549653/68077714-0ba5f900-fe0c-11e9-89a3-3941a3329238.png)

&nbsp;

## 📚 API Docs
[Wiki For CuseMe Server](https://github.com/CuseMe/CuseMe-Server/wiki)


&nbsp;

## 🛠 Tech Stack

- Node.js + Express
- PM2
- MySQL

&nbsp;

## 😁 Our team

- 김강희 ([ganghee](https://github.com/ganghee)) :  카드 생성api,카드 수정 api, 데이터 스키마 작성,에러 처리 
- 김해리 ([khl6235](https://github.com/khl6235)) : 카드 카운트 증가 api, 카드 삭제 api, 카드 상세조회 api, 카드 조회 api, 사용자 생성 api, readMe작성,에러 처리
- 이시연 ([siyeons](https://github.com/siyeons)) : 서버배포, 통신체크, 비밀번호 수정api ,사용자 생성 api, jwt미들웨어 적용, api문서 작성, 
- 황채연 ([funnkiddo](https://github.com/funnkiddo)) :  타임스탬프&로그 api, 장애인 화면 api, 보호자 비밀번호 입력api , 카드 다운로드 api, 로그인 쿼리 수정, 통신 체크,에러 처리



