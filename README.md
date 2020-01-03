# Fluff

<div align="center" style="display:flex;">
	<img src="./readmeImg/FluffMainLogo.png" width="30%"/>
</div>

<div align="center">
세상에 옷은 충분합니다. 우리는 버려지는 옷의 숨겨진 가치를 발견하고 그 옷에 새 숨을 불어 넣습니다.
이것은 시작에 불과합니다. 합리적인 비용으로 더 많은 사람들이 자신만의 유니크한 스타일을 찾고 환경을 보호함으로써 슬로우 패션의 가치를 세상에 퍼트립니다.
바로 이것이 fluff가 그리는 미래입니다.
</div>

---

&nbsp;

## 우리가 일하는 방식
[Fluff Notin Link]( https://www.notion.so/74c4e53d65ff4312be05f55a601a8a95)

&nbsp;

### 우리가 모인 이유
```
🗣 목표 슬로우패션 문화를 대중화시키고 빠르게 변하는 세상 속 우리가 잊고 있는 가치를 일깨워준다.
```

&nbsp;

### 우리가 모여서 그리는 그림
```
🗣 소통을 중시하고 대화하는 시간을 가질 수 있는 팀
🗣  모든 팀원들이 낙오되지 않고 ‘내가 해냈다!’라는 성취감을 가질 수 있는 팀
```

&nbsp;

## Our mindset 우리의 믿음 
The real cooperation you've ever done before.
```
👍 존중과 솔직함 "Let’s Trevari!" 
   우리는 항상 존중하고 솔직합니다. 
   모두가 존중한다는 믿음이 있기에 반대 의견일지라도 적극적으로개진합니다.
```
&nbsp;

함께하는 성장 "Get ready with us!"
```
👍 우리는 우리의 가능성을 믿으며, 세상의 모든 것들은 더욱 나아질 수 있다고 믿습니다.
   서로 가진 능력을 나누고, 부족한 점을 채우며 함께 성장하는 팀워크 하모니를 만들어 낼 것입니다.
```
&nbsp;

상상을 현실로 "Make WOW!"
```
👍 우리는 직접 변화를 만들어 그 가치를 증명하고 영감과 새로운 시각을 전파하여
   그 꿈을 현실로 만듭니다. 우리는 여정을 함께 하며 시장을 뒤엎는 임팩트 있는 결과를 만듭니다.
```

&nbsp;

---

&nbsp;
## Architecture
> Microservices Architecture
<div align="center" style="display:flex;">
	<img src="./readmeImg/fluff_architecture.jpeg" width="70%"/>
</div>



**Repository Link**
* [Admin Page Link](https://github.com/Fluff-Project/Fluff_Admin)
* [Android](https://github.com/Fluff-Project/Fluff_Android)
* [iOS](https://github.com/Fluff-Project/Fluff_iOS)
* [Image Resizin Server](https://github.com/Fluff-Project/Fluff_Img_Resizing)

&nbsp;
## 📚 API Docs
* [Api Description Link](https://github.com/Fluff-Project/Fluff_Server/wiki)

&nbsp;

## 🛠 Core Tech
1. **추천 알고리즘**\
유저의 취향을 바탕으로 **contest based filtering** 추천 알고리즘을 적용하여 유저에게 맞춤형 상품을 제공한다.

<div align="center" style="display:flex;">
	<img src="./readmeImg/style_rec.png" width="80%"/>
</div>

2. **경매**\
socket을 이용하여 **실시간으로 경매에 참여할 수 있다.** 또한 server sent event로 클라이언트에게 1초에 한번씩 실시간으로 경매 마감시간을 전송함으로써 클라이언트에서 시간을 변경하여 서버에 접근하는 보안 사고를 사전에 차단하였다.

3. **멀티 컨테이너**
docker를 이용한 멀티 컨테이너 배포로 배포의 효율성을 늘리고, 마이크로 서비스들을 내부 통신망으로 묶어 아키텍처 관리를 하였다.

4. **이미지 리사이징 서버**\
쇼핑몰 특성상 이미지 업로드 양이 많기 때문에 AWS의 대표적인 serverless 서비스인 Lambda를 이용하여 이미지 리사이징 기능을 추가하였다.

5. **Mutl Processing**\
추천 알고리즘과 같은 딥러닝 기반 기능들로 인한 cpu 사용량 증가로 성능저하를 cluster를 사용하여 싱글 스레드인 Node.js의 한계를 multi processing으로 극복하였다.

<div align="center" style="display:flex;">
	<img src="./readmeImg/cluster.png" width="80%"/>
</div>



&nbsp;

## ⚙️ Dependencies
```json
"dependencies": {
    "aws-sdk": "^2.596.0",
    "content-based-recommender": "^1.4.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "~4.16.1",
    "http-errors": "^1.7.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.24.0",
    "mongoose": "^5.8.3",
    "morgan": "^1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.0.2",
    "nodemailer": "^6.4.2",
    "passport": "^0.4.1",
    "path": "^0.12.7",
    "rand-token": "^0.4.0",
    "redis": "^2.8.0",
    "request": "^2.88.0",
    "request-promise": "^4.2.5",
    "sequelize": "^5.21.3",
    "socket.io": "^2.3.0",
    "sse": "0.0.8"
  }
```

&nbsp;


