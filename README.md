# WrongBook 错题管理系统 MVP

第一版功能：
- 新增错题
- 记录科目 / 年级 / 章节 / 知识点
- 保存错误答案、正确答案、解析和错误原因
- 错题列表和详情
- 记录每次复习结果
- 自动更新掌握状态

## 启动

需要安装 Docker 和 Docker Compose。

```bash
cd wrongbook
docker compose up --build
```

打开：
- Web: http://localhost:3000
- API 文档: http://localhost:8000/docs

## 停止

```bash
docker compose down
```

如果要连数据库：
- Host: localhost
- Port: 5432
- Database: wrongbook
- User: wrongbook
- Password: wrongbook

## 下一步建议
1. 题目图片拍照/上传
2. OCR 自动识别题目
3. AI 自动识别知识点与错因
4. 间隔复习算法
5. 家长/学生账号
6. 学习统计 Dashboard
