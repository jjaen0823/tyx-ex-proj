# React 프로젝트에 맞는 Node 이미지 선택
FROM node:18

# 작업 디렉토리 생성
WORKDIR /app

# 패키지 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 프로젝트 빌드
RUN npm run build

# 개발 서버 실행
CMD ["npm", "run", "start"]
