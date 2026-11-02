# THƯƠNG AI

Website chat tiếng Việt, phong cách vui vẻ/hài hước, dùng Node.js + Express + OpenAI Responses API.

## Chạy trên máy tính

1. Cài Node.js bản LTS: https://nodejs.org/
2. Mở Terminal/CMD trong thư mục dự án.
3. Chạy `npm install`.
4. Sao chép `.env.example` thành `.env`.
5. Thêm API key vào `OPENAI_API_KEY` trong `.env`. Không chia sẻ file này.
6. Chạy `npm start` và mở http://localhost:3000.

## Đưa website lên Internet bằng Render

1. Tạo tài khoản GitHub và Render.
2. Tạo một repository GitHub mới tên `thuong-ai`, tải toàn bộ nội dung thư mục này lên (không tải file `.env`).
3. Trên Render chọn **New > Web Service**, kết nối repository `thuong-ai`.
4. Điền: Runtime `Node`; Build Command `npm install`; Start Command `npm start`; Plan `Free` (nếu còn được cung cấp).
5. Trong phần **Environment**, thêm `OPENAI_API_KEY` với API key của bạn. Có thể thêm `OPENAI_MODEL` = `gpt-6-luna` nếu muốn chỉ định model.
6. Chọn **Create Web Service** và đợi trạng thái Live. Render sẽ cấp URL dạng `https://ten-dich-vu.onrender.com`.

Render có thể cho dịch vụ miễn phí ngủ khi không có truy cập; lần mở lại đầu tiên có thể phải chờ khởi động. Phí sử dụng OpenAI API tính riêng, không nằm trong gói ChatGPT.

## Bảo mật

- Không đưa API key vào `public/`, HTML hoặc JavaScript phía trình duyệt.
- Không commit file `.env` lên GitHub.
- Đặt giới hạn chi tiêu/thông báo ngân sách trong trang quản lý API của OpenAI.
