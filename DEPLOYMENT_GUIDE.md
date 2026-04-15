# 나누리아이티 홈페이지 배포 가이드

## 1. 전체 구조

```
개발자 PC          GitHub             GitHub Pages          nanuriit.kr
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 코드 수정  │───→│  main 브랜치   │───→│ 정적 파일 호스팅│───→│ 사용자 브라우저 │
│ git push  │    │              │    │ (무료)        │    │   접속       │
└──────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                  GitHub Actions가        ↑                    ↑
                  자동으로 빌드 실행     배포 완료            도메인 연결 (DNS)
```

---

## 2. 핵심 개념 정리

### 도메인이란?
- `nanuriit.kr`처럼 사람이 읽을 수 있는 인터넷 주소
- 실제로는 IP 주소(예: 185.199.108.153)로 연결됨

### 후이즈(Whois)란?
- 도메인을 구매하고 관리하는 **도메인 등록 업체**
- `nanuriit.kr` 도메인을 후이즈에서 구매하여 소유 중
- 도메인이 어떤 서버를 가리킬지(DNS 설정)를 관리하는 곳

### DNS(Domain Name System)란?
- 도메인 이름을 IP 주소로 변환해주는 시스템
- 브라우저에 `nanuriit.kr`을 입력하면 DNS가 해당 IP를 알려줌

### DNS 레코드 종류

| 레코드 | 역할 | 예시 |
|--------|------|------|
| **A 레코드** | 도메인 → IP 주소 연결 | `nanuriit.kr` → `185.199.108.153` |
| **CNAME 레코드** | 도메인 → 다른 도메인으로 연결 (별명) | `www.nanuriit.kr` → `NANURI-IT.github.io` |
| **MX 레코드** | 메일 서버 지정 | 네이버웍스 메일용 |
| **TXT 레코드** | 도메인 소유 인증 등 | 네이버웍스 인증용 |

### GitHub Pages란?
- GitHub에서 제공하는 **무료 정적 웹사이트 호스팅** 서비스
- HTML/CSS/JS 파일만 서빙 (서버 사이드 코드 실행 불가)
- Next.js의 `output: "export"` 옵션으로 정적 파일 생성 후 배포

### GitHub Actions란?
- GitHub에서 제공하는 **자동화 도구** (CI/CD)
- `main` 브랜치에 push하면 자동으로 빌드 & 배포 실행
- 설정 파일: `.github/workflows/deploy.yml`

---

## 3. 배포 흐름 (자동)

### 트리거
`main` 브랜치에 push하면 자동 실행

### 빌드 과정 (GitHub Actions)

```
① actions/checkout        ── 코드를 GitHub 서버로 가져옴
       │
       ▼
② actions/setup-node      ── Node.js 22 설치
       │
       ▼
③ npm ci                  ── 의존성 설치 (node_modules)
       │
       ▼
④ npm run build           ── Next.js 빌드 실행
       │                      정적 HTML/CSS/JS 파일을 /out 폴더에 생성
       ▼
⑤ upload-pages-artifact   ── /out 폴더를 GitHub Pages에 업로드
       │
       ▼
⑥ deploy-pages            ── GitHub Pages에 실제 배포 완료
```

### 소요 시간
- 빌드 + 배포: 약 **1~2분**
- push 후 바로 사이트에 반영됨

---

## 4. 도메인 연결 (DNS 설정)

### 이전 구조 (Wix)
```
nanuriit.kr → Wix 서버 (185.230.63.xxx) → Wix 홈페이지
```

### 현재 구조 (GitHub Pages)
```
nanuriit.kr → GitHub Pages 서버 (185.199.xxx.xxx) → 새 홈페이지
```

### 후이즈 DNS 설정 내용

#### A 레코드 (변경)

| 호스트명 | IP | 용도 |
|---------|-----|------|
| nanuriit.kr | 185.199.110.153 | GitHub Pages |
| nanuriit.kr | 185.199.108.153 | GitHub Pages |

#### A 레코드 (기존 유지)

| 호스트명 | IP | 용도 |
|---------|-----|------|
| biz.nanuriit.kr | 175.197.129.207 | 사내 시스템 |
| rps.nanuriit.kr | 175.197.129.207 | 사내 시스템 |
| rps-pr.nanuriit.kr | 175.197.129.207 | 사내 시스템 |

#### CNAME 레코드 (신규)

| 호스트명 | 값 | 용도 |
|---------|-----|------|
| www.nanuriit.kr | NANURI-IT.github.io | www 접속용 |

#### 유지 필수

- 네이버웍스 관련 MX, TXT 레코드 (메일 서비스)

### GitHub Pages 설정

1. GitHub 레포 → **Settings** → **Pages**
2. **Custom domain**에 `nanuriit.kr` 입력 → Save
3. DNS 전파 완료 후 **Enforce HTTPS** 체크

### DNS 전파 확인 방법

```bash
# Linux/Mac
dig nanuriit.kr +nostats +nocomments +nocmd

# Windows
nslookup nanuriit.kr

# Google DNS로 직접 확인
nslookup nanuriit.kr 8.8.8.8
```

GitHub Pages IP(`185.199.xxx.xxx`)가 나오면 전파 완료.

---

## 5. 프로젝트 주요 파일

| 파일 | 역할 |
|------|------|
| `.github/workflows/deploy.yml` | GitHub Actions 배포 워크플로우 |
| `next.config.ts` | Next.js 설정 (정적 빌드 옵션) |
| `public/CNAME` | GitHub Pages 커스텀 도메인 지정 파일 |
| `package.json` | 프로젝트 의존성 및 스크립트 |

---

## 6. 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3300)
npm run dev

# 프로덕션 빌드 테스트
npm run build
```

---

## 7. 문제 해결

### 사이트 접속 시 Wix 페이지가 뜨는 경우
- **원인**: DNS 캐시가 남아있음
- **해결**: `ipconfig /flushdns` 실행 후 브라우저 캐시 삭제
- DNS 서버를 Google DNS(8.8.8.8)로 변경하면 빠르게 확인 가능

### 리다이렉션 루프 (ERR_TOO_MANY_REDIRECTS)
- **원인**: HTTPS 인증서 발급 전에 Enforce HTTPS가 켜져 있음
- **해결**: GitHub Pages 설정에서 Enforce HTTPS 해제 → 인증서 발급 완료 후 재활성화

### DNS check unsuccessful (GitHub Pages 설정)
- **원인**: DNS 전파가 아직 완료되지 않음
- **해결**: 최대 24~48시간 대기 후 Check again 클릭

### www.nanuriit.kr 접속 불가
- **원인**: CNAME 레코드 미설정 또는 전파 미완료
- **해결**: 후이즈에서 CNAME 레코드 확인 (www → NANURI-IT.github.io)

---

## 8. 참고 사항

- GitHub Pages는 **무료** 서비스 (비용 없음)
- 도메인 유지 비용만 후이즈에 연간 결제
- `biz`, `rps`, `rps-pr` 서브도메인은 별도 서버(175.197.129.207)로 운영 중이므로 절대 변경 금지
- 네이버웍스 메일 관련 DNS 레코드(MX, TXT) 변경 금지
