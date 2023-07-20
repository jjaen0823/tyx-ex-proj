## Node.js를 기반으로 React 애플리케이션을 빌드합니다.
# 먼저 React 앱을 빌드합니다.
FROM node:16 as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Nginx를 사용하여 빌드된 React 앱을 호스팅합니다.
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]


# React 프로젝트에 맞는 Node 이미지 선택
#FROM node:16
#
## 작업 디렉토리 생성
#WORKDIR /app
#
## 패키지 의존성 설치
#COPY package.json package-lock.json ./
#RUN npm install
#
## 소스 코드 복사
#COPY . .
#
## 프로젝트 빌드
#RUN npm run build
#
## 개발 서버 실행
#CMD ["npm", "run", "start"]
