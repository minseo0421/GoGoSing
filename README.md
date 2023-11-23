# 🎤 Go Go Sing - 사용자 목소리 기반 노래 추천 서비스

# 📌목차
- [프로젝트 진행 기간](#🎞-프로젝트-진행-기간)
- [개요](#✨-개요)
- [주요 기능](#💻-주요-기능)
- [서비스 화면](#🖼-서비스-화면)
- [주요 기술](#🛠-주요-기술)
- [프로젝트 파일 구조](#🗂-프로젝트-파일-구조)
- [프로젝트 산출물](#📋-프로젝트-산출물)
- [팀원 소개](#👩‍💻-팀원-소개)

<br>

# 🎞 프로젝트 진행 기간

#### - 2023.08.21(월) ~ 2023.10.06(금) (약 7주)

#### - SSAFY 9기 2학기 특화프로젝트

# ✨ 개요

#### - 노래가 너무 높거나 낮아서 부르지 못하겠는 사람 
#### - 내 목소리랑 어울리는 노래를 고르지 못하겠는 사람
#### - 노래방에서의 내 목소리가 어떻게 들릴지 궁금한 사람
#### 저희 서비스는 위와 같은 사람들을 위해 사용자의 목소리를 기반으로 맞춤 노래를 추천해주는 서비스 입니다.

<br>

# 💻 주요 기능

### 1️⃣ 음역대 기반 추천
#### - 사용자는 낼 수 있는 가장 낮은 음부터 가장 높은 음까지 녹음하여 분석하기를 누르면 자신이 낼 수 있는 가낭 높은 음과 낮은 음을 알 수 있다.
#### - 분석된 결과를 기반으로 사용자와 가장 잘 맞는 음역대의 노래 100개를 추천해준다.

<br>

### 2️⃣ 목소리 기반 추천
#### - 사용자는 자신이 가지고 있는 음성파일을 업로드 하여 자신의 목소리 파형을 분석할 수 있다.
#### - 사용자는 노래방 기능을 이용하여 녹음한 목소리로도 자신의 목소리 파형을 분석할 수 있다.
#### - 분석된 결과를 기반으로 사용자와 가장 잘 맞는 음색의 노래 100개를 추천해준다.

<br>

### 3️⃣ 노래 상세보기
#### - 사용자는 듣고 싶은 노래를 들어볼 수 있다.
#### - 사용자는 노래에 좋아요를 누를 수 있고 해당 좋아요를 기반한 노래를 추천받을 수 있다.
#### - 사용자는 노래방 기능을 이용하여 노래를 들으며 녹음을 진행할 수 있고 자신의 목소리에 MR을 입혀볼 수 있다.

<br>

### 4️⃣ 노래 검색
#### - 사용자는 제목, 가수, 가사를 기반으로 검색을 할 수 있다.
#### - 검색 페이지에서 실시간으로 가장 많이 검색된 검색어 top 10을 볼 수 있다.

<br>


# 🖼 서비스 화면

**회원가입 & 로그인**

<img src="exec/시연영상/회원가입.gif" height="700px" >
<!-- <img src="exec/시연영상/첫자체로그인.gif" height="700px" > -->
<img src="exec/시연영상/네이버로그인_탈퇴하기.gif" height="700px" >
<img src="exec/시연영상/메일인증, 임시비밀번호 발급.gif" height="700px" >

- 회원가입과 로그인은 고고씽 자체, 카카오, 네이버, 구글 4가지로 진행할 수 있습니다.
- 자체 회원가입 시 입력한 이메일로 인증번호를 보내고 메일에서 받은 인증번호를 입력하여야 회원가입을 할 수 있습니다.
- 카카오, 네이버, 구글 3가지의 소셜 회원가입도 진행할 수 있습니다.
- 자체 회원가입과 소셜 회원가입 모두 사용자의 정보를 입력하고 가입하기를 누르면 회원가입이 완료 됩니다.
- 첫 로그인일 시 좋아하는 장르를 선택할 수 있습니다.
- 마이페이지에서 회원 탈퇴를 누르면 탈퇴할 수 있습니다.
- 이메일 인증하기와 비밀번호 찾기를 할 시 메일로 인증번호 혹은 임시 비밀번호를 발급받을 수 있습니다.


**메인페이지**

<img src="exec/시연영상/메인페이지.gif" height="700px" >

- 메인페이지는 로그인 유무와 상관없이 이용할 수 있습니다.
- 다양한 인기 차트를 확인해 볼 수 있습니다.
- 로그인 후 이용 시 수집된 좋아하는 장르를 기반으로 노래를 추천해줍니다.
- 로그인 후 이용 시 사용자의 목소리, 음역대, 좋아요 리스트에 기반한 노래를 추천해줍니다.


**목소리 & 음역대 기반 추천**

<img src="exec/시연영상/녹음으로음역대분석.gif" height="700px" >
<img src="exec/시연영상/음성파일로목소리분석.gif" height="700px" >

- 녹음을 통하여 자신의 가장 높은 음역대와 낮은 음역대를 측정할 수 있고 자신의 음역대와 유사한 노래를 추천받을 수 있습니다.
- 음성 파일을 업로드 하여 자신의 목소리 파형과 유사한 노래를 추천받을 수 있습니다.
- 음역대 분석 혹은 목소리 분석을 진행하면 차트에서 자신의 음역대 혹은 음색과 어울리는 노래의 top 100 리스트를 확인해 볼 수 있습니다.


**차트**

<img src="exec/시연영상/차트.gif" height="700px" >

- 차트 페이지에서 노래방 인기차트와 자신의 목소리, 음역대에 기반한 추천 차트, 자신이 누른 좋아요 목록 기반한 추천 차트를 확인해 볼 수 있습니다.
- 좋아요 페이지에서는 자신이 누른 좋아요 목록을 확인해 볼 수 있습니다.


**노래 상세보기**

<img src="exec/시연영상/노래상세보기.gif" height="700px" >

- 원하는 노래를 들어볼 수 있고 좋아요를 눌러 보관할 수 있습니다.
- 노래방 기능을 이용하여 노래를 들으며 녹음을 진행할 수 있고 자신의 목소리에 MR을 입혀볼 수 있습니다.


**검색**

<img src="exec/시연영상/검색.gif" height="700px" >

- 검색 페이지에서 제목, 가수, 가사를 중 하나를 선택하여 노래 검색을 할 수 있습니다.
- 실시간으로 가장 많이 검색된 검색어 top 10을 볼 수 있습니다. (검색어는 매주 월요일 00시에 초기화 됩니다.)


**마이페이지**

<img src="exec/시연영상/마이페이지.gif" height="700px" >

- 프로필 사진을 등록할 수 있습니다.
- 닉네임, 비밀번호, 좋아하는 장르를 변경할 수 있습니다.
- 로그아웃, 회원탈퇴를 진행할 수 있습니다.
- 자신의 음역대와 목소리 데이터를 관리 할 수 있습니다.

<br/>

# 🛠 주요 기술


**Backend**
<br>

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/InteliJ-000000?style=for-the-badge&logo=IntelliJ IDEA&logoColor=white"/> &nbsp;<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"/> &nbsp;<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/> &nbsp;<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
- Java : Oracle OpenJDK 11
- SpringBoot 2.7.15
- Spring Security
- Spring Data Jpa 
- queryDSL
- Gradle 
- MariaDB
- MongoDB
- Redis 

<br>

**FrontEnd**
<br>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;


- React.js 18.2.0
- Node.js 16.16.0
- Typescript 4.9.5
- redux 4.2.1
- axios 1.5.0
- expo 49.0.11
- react-native-webview 13.6.0
- Visual Stuido Code

<br>

**Data**
<br>

- Google Colab
- Pandas 2.0.2
- librosa 0.10.1
- BeautifulSoup 4.12.2
- selenium 4.12.0
- pydub 0.25.1
- scikit-learn 1.3.0
- pytube 15.0.0

<br>

**CI/CD**
<br>

<img src="https://img.shields.io/badge/aws ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">&nbsp;


- AWS EC2
- Ubuntu 20.04 LTS
- Jenkins 2.414.3
- Docker Engine 24.0.5
- Nginx 1.18.0

<br>

**협업 툴**
<br>

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/figma-EA4335?style=for-the-badge&logo=figma&logoColor=white">&nbsp;
- 형상 관리 : Git
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Notion
- 디자인 : Figma


<br>
<br>

# 🗂 프로젝트 파일 구조



<br>
<br>


# 📋 프로젝트 산출물

- [API 명세서](https://www.notion.so/API-f61ac549c9e14ca7b4b71ea1e8089e87)
- [ERD](https://www.erdcloud.com/d/tZQNs5mkgtbwHLhyy)
- [발표자료](exec/발표자료/발표자료.pdf)
- 서비스 아키텍쳐
![서비스 아키텍쳐](exec/발표자료/서비스%20아키텍쳐.PNG)




<br>
<br>

# 👩‍💻 팀원 소개

|                                                                    [김은서](https://github.com/EunSeo119)                                                                    |                        [이도형](https://github.com/DobroL33)                         |                           [이성민](https://github.com/seongminll04)                           |                           [주영인](https://lab.ssafy.com/jyi8714)                            |                        [한민서](https://github.com/minseo0421)                         |                            [허다은](https://github.com/qor4)                            |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/64001133?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/138988255?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/122436545?v=4" width="100" height="100"> | <img src="https://secure.gravatar.com/avatar/0c6f90fbda5664408eb016d27c9b74bd?s=800&d=identicon" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/58363224?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/58421346?v=4" width="100" height="100"> |
|                                                                               **Backend**                                                                                |                                        **Frontend**                                        |                                        **FE / BE**                                        |                                       **Frontend**                                        |                                      **Infra**                                       |                                        **Infra**                                         |


<br>
<br>

