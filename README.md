# RAG Pipeline GUI

<div align="center">

![RAG Pipeline GUI](https://img.shields.io/badge/RAG-Pipeline%20GUI-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.7-38B2AC?style=for-the-badge&logo=tailwind-css)

**Retrieval-Augmented Generation (RAG) 파이프라인을 위한 시각적 GUI 도구**

[개요](#개요) • [목적](#목적) • [사용법](#사용법) • [기술 스택](#기술-스택) • [설치](#설치) • [개발](#개발)

</div>

---

## 개요

RAG Pipeline GUI는 복잡한 RAG (Retrieval-Augmented Generation) 파이프라인을 직관적이고 시각적으로 구축하고 관리할 수 있는 웹 기반 도구입니다. 드래그 앤 드롭 인터페이스를 통해 데이터 소스, 임베딩 모델, 벡터 데이터베이스, LLM 통합을 쉽게 연결하고 모니터링할 수 있습니다.

### 주요 기능

- 🎯 **시각적 파이프라인 빌더**: 드래그 앤 드롭으로 RAG 컴포넌트 연결
- 🤖 **다중 LLM 지원**: OpenAI, Anthropic, Google, Ollama, Local 모델 통합
- 📊 **실시간 모니터링**: 성능 지표 및 비용 추적 대시보드
- 🔐 **보안 인증**: OAuth2/JWT 기반 사용자 인증 및 권한 관리
- 📈 **분석 도구**: 차트와 그래프를 통한 파이프라인 성능 분석
- 🔄 **실시간 실행**: 파이프라인 실행 및 결과 실시간 확인

## 목적

### 문제 해결
- **복잡성 감소**: RAG 파이프라인 구축의 기술적 복잡성 완화
- **접근성 향상**: 비개발자도 쉽게 RAG 시스템 구축 가능
- **표준화**: 일관된 RAG 파이프라인 아키텍처 제공
- **모니터링**: 파이프라인 성능 및 비용 실시간 추적

### 대상 사용자
- **AI/ML 엔지니어**: RAG 시스템 프로토타이핑 및 테스트
- **데이터 사이언티스트**: 실험적 RAG 파이프라인 구축
- **제품 매니저**: RAG 기능 시연 및 검증
- **연구원**: 다양한 RAG 구성 실험 및 비교

## 사용법

### 1. 파이프라인 빌더

```bash
# 프론트엔드 실행
cd frontend
npm run dev

# 브라우저에서 http://localhost:5173 접속
# "Pipeline Builder" 탭에서 드래그 앤 드롭으로 컴포넌트 연결
```

**사용 가능한 컴포넌트:**
- 📄 **Data Source**: 문서, 웹페이지, 데이터베이스 연결
- 🧠 **Embedding Model**: 텍스트 벡터화 모델 선택
- 🗄️ **Vector Database**: Pinecone, Weaviate, Chroma 등
- 🤖 **LLM Integration**: 다양한 LLM 제공자 연결
- 📤 **Response Generator**: 최종 응답 생성 및 포맷팅

### 2. 인증 및 보안

```bash
# 백엔드 실행
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload

# 기본 테스트 계정
Username: admin    Password: admin123
Username: user     Password: user123
Username: guest    Password: guest123
```

### 3. API 사용 예제

```python
import requests

# 로그인
response = requests.post("http://localhost:8000/api/v1/auth/login", json={
    "username": "admin",
    "password": "admin123"
})
token = response.json()["access_token"]

# 보호된 엔드포인트 접근
headers = {"Authorization": f"Bearer {token}"}
user_info = requests.get("http://localhost:8000/api/v1/auth/me", headers=headers)
```

### 4. 분석 대시보드

- **정확도 추적**: 모델 응답 정확도 시계열 차트
- **지연시간 모니터링**: 응답 시간 분석
- **비용 추적**: API 사용량 및 비용 통계
- **리소스 분포**: 컴포넌트별 리소스 사용량

## 기술 스택

### Backend
- **FastAPI**: 고성능 Python 웹 프레임워크
- **Pydantic**: 데이터 검증 및 직렬화
- **SQLAlchemy**: 데이터베이스 ORM
- **JWT/OAuth2**: 인증 및 권한 관리
- **Uvicorn**: ASGI 서버

### Frontend
- **React 18**: 사용자 인터페이스
- **TypeScript**: 타입 안전성
- **TailwindCSS**: 스타일링
- **DnD Kit**: 드래그 앤 드롭 기능
- **Recharts**: 데이터 시각화
- **Vite**: 빌드 도구

### AI/ML
- **OpenAI API**: GPT 모델 통합
- **Anthropic API**: Claude 모델 통합
- **Google AI**: Gemini 모델 통합
- **Ollama**: 로컬 LLM 실행
- **Sentence Transformers**: 임베딩 생성

## 설치

### 사전 요구사항
- Python 3.10+
- Node.js 18+
- Git

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/rag-pipe-line-gui.git
cd rag-pipe-line-gui
```

### 2. 백엔드 설정

```bash
# Python 가상환경 생성
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일에서 API 키 및 설정 수정

# 서버 실행
python -m uvicorn app.main:app --reload
```

### 3. 프론트엔드 설정

```bash
# 의존성 설치
cd frontend
npm install

# 개발 서버 실행
npm run dev
```

### 4. 환경변수 설정

```bash
# backend/.env
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key
SECRET_KEY=your-secret-key-here
```

## 개발

### 프로젝트 구조

```
rag-pipe-line-gui/
├── backend/                 # FastAPI 백엔드
│   ├── app/
│   │   ├── api/            # API 엔드포인트
│   │   ├── core/           # 핵심 설정 및 유틸리티
│   │   ├── models/         # 데이터 모델
│   │   └── services/       # 비즈니스 로직
│   ├── requirements.txt
│   └── .env
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── services/       # API 서비스
│   │   └── utils/          # 유틸리티 함수
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

### 개발 명령어

```bash
# 백엔드 개발
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000

# 프론트엔드 개발
cd frontend
npm run dev

# 코드 포맷팅
cd frontend
npm run format
npm run lint

# 백엔드 테스트
cd backend
pytest
```

### API 문서

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/rag-pipe-line-gui/issues)
- **문서**: [Wiki](https://github.com/your-username/rag-pipe-line-gui/wiki)
- **토론**: [GitHub Discussions](https://github.com/your-username/rag-pipe-line-gui/discussions)

---

<div align="center">

**RAG Pipeline GUI** - RAG 시스템 구축을 쉽고 시각적으로 만들어보세요! 🚀

</div>
