## Node.js를 기반으로 React 애플리케이션을 빌드합니다.
#FROM node:16 AS build
#WORKDIR /app
#COPY ./frontend /app
#RUN npm install
#RUN npm run build
#
## 빌드된 정적 파일들을 웹 서버에 올립니다.
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]

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
