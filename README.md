# 使用手册
## 运行步骤
* npm install
* npm start

## 说明
基于nestjs的简易服务端，用来演示electron崩溃日志上报功能
基于electron官方提供的node-minidump模块实现崩溃日志文件内容的读取
不同平台客户端产生的崩溃日志文件需要使用对应平台rebuild编译出的node-minidump来读取
