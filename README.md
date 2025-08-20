# monVoca 📘
👨‍💻 **개발 인원**: 2명  
🗓️ **개발 기간**: 2024.10 ~ 2024.11

## 📌 프로젝트 개요
**monVoca**는 단어장 학습 애플리케이션으로, 사용자가 직접 단어를 등록하고 다양한 방식의 퀴즈를 통해 학습할 수 있는 웹 애플리케이션입니다.

### 🫧 기능
- **단어장 관리**
    - 단어장 생성, 단어 추가/수정/삭제
    - 단어장별 영단어 관리
- **학습 모드**
    - **플래시카드** : 한 단어씩 영어 ↔ 뜻 학습
    - **O/X 자가진단** : 영어/뜻별 학습 확인
    - **예문 빈칸 학습** : 빈칸이 있는 예문에서 단어 유추
    - **단어 선택 퀴즈** : 영단어를 보고 뜻 선택
- **이미지 인식**
    - 이미지 업로드 시 단어 자동 추출 및 번역
- **음성 지원**
    - Web Speech API 기반 TTS(Text-to-Speech) 기능


## 🛠️ 기술 스택

**Frontend**  
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

**Style**  
<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">

**State Management**  
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">

**Data Fetching**  
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">


## ⚙️ 기술 선택 이유
- **Tailwind CSS**
    - 모바일 우선 반응형 UI에 최적화
    - 짧은 개발 기간(1개월) 내 빠른 개발 가능

- **Redux vs Context API -> Redux**
    - 프로젝트 규모는 Context API로도 충분했으나, 명확한 전역 상태 관리 패턴을 학습하고 적용하기 위해 Redux 선택

- **Axios vs Fetch -> Axios**
    - axios 인스턴스를 사용하여 기본 설정 및 헤더 관리, 기능별 모듈 분리 -> 재사용성과 유지보수성 향상
    - fetch 대비 반복 코드 감소, 응답 처리나 에러 처리 등 개발 효율성 향상


## 📂 프로젝트 구조
```
src/
├── api/          # API 통신 모듈
├── assets/       # 이미지, 아이콘 등
├── components/   # 재사용 가능한 UI 컴포넌트
├── pages/        # 페이지 단위 컴포넌트
└── store/        # Redux 상태 관리
```


## 🔧 향후 개선사항

#### 1. 상태 관리 단순화
- **현재**: Redux Toolkit 사용
- **문제점**: 단순한 전역 상태라 규모에 적합하지 않은 라이브러리 사용
- **개선안**: Context API + useReducer로 마이그레이션

#### 2. API 캐싱 도입
- **현재**: 모든 페이지에서 동일한 데이터 반복 호출 → 불필요한 네트워크 비용 발생
- **문제점**: 로딩 지연, 서버 부하 증가
- **개선안**: React Query 기반 캐싱 전략 적용


## 🎥 시연 영상

https://github.com/user-attachments/assets/2300d228-fa23-4309-81e1-4985730568cf
