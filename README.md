# OSS12-backend
2022 오픈소스SW개발 프로젝트 12조 backend

## About the Project
- Description
    - 경희대학교 선후배 멘토링 서비스 어플리케이션
    - 채팅 서비스 제공
---
## Getting Started / Installation
- Spring (자바 11, gradle)
- MySQL 8.0
- nodejs WebSocket
- AWS EC2
0. EC2 인스턴스 생성 및 설정<br>
    강의 자료를 따라 EC2 인스턴스를 생성<br>
    탄력적 IP를 할당 받은 후 8080 port를 열어줌 (REST API Server)
    ![image](https://user-images.githubusercontent.com/83760210/205205614-3f25cfe6-54cc-4be9-ae32-a87a850b62b0.png)

1. MySQL 설치<br>
    #01. rpm 설치
    ```
    sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
    ```
    #02. GPG Key 설정
    ```
    rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
    ```
    #03. MySQL 설치 (using yum)
    ```
    sudo yum install mysql-community-server
    ```
    #04. MySQL 실행 및 구동확인
    ```
    sudo systemctl start mysqld
    sudo systemctl status mysqld
    ```
    #05. characterset 설정
    ```
    sudo vim /etc/my.cnf
    [mysqld]
    ...(중략)
    character-set-server=utf8mb4
    collation-server=utf8mb4_unicode_ci
    skip-character-set-client-handshake
    ```
    #06. MySQL 재시작
    ```
    sudo systemctl restart mysqld
    ```
    #07. root 비밀번호 재설정
    ```
    sudo grep 'temporary password' /var/log/mysqld.log
    # 실행 결과로 임시 비밀번호를 알 수 있음
    sudo mysql_secure_installation -p '임시 비밀 번호'
    ```
    #08. MySQL 접속
    ```
    mysql -u root -p '비밀번호'
    ```
2. DB 구축
```
mysql> create database db_khu;
mysql> create user 'user01'@'%' identified by 'Oss2022-12';
mysql> grant all on db_khu.* to 'user01'@'%';
```
3. Server source code clone
```
sudo yum install git
git clone https://github.com/JeongJiAn/OSS12-back.git
```
4. JDK 설치
```
# aws coreetto 다운로드
sudo curl -L https://corretto.aws/downloads/latest/amazon-corretto-11-x64-linux-jdk.rpm -o jdk11.rpm
# jdk11 설치
sudo yum localinstall jdk11.rpm -y
# jdk version 선택
sudo /usr/sbin/alternatives --config java
# jdava 버전 확인
java --version
# 설치 키트 삭제
rm -rf jdk11.rpm
```
5. Server 실행
```
java -jar ./OSS12-back/khu/khu/build/libs/khu-0.0.1-SNAPSHOT.jar
```
6. 과목 리스트 저장 (최초 실행 한 번만)<br>
OSS12-back/make_subject_list 폴더 내의<br>
save_subject_info_into_DB.py 파일 실행
7. nodejs 설치 및 webSocket server 실행<br>
강의노트를 참고하여 nodejs와 npm, nvm 설치
./OSS12-back/chat 폴더로 이동
```
npm install
node app.js
```

## Software architecture
![image](https://user-images.githubusercontent.com/94419510/205898707-309e3ed1-0e78-4bac-834b-ad9e129e83c2.png) <br>
## E-R Diagram
![image](https://user-images.githubusercontent.com/56192209/186586905-ba191f88-b1a7-4fb9-8d86-39c5089b1e58.png)
## Flow Chart
![flow chart](https://user-images.githubusercontent.com/113916318/205890469-9020d47a-9438-4be1-ab39-e4a7b7a641f1.png)


---
