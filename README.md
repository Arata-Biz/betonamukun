# 🤖 LINE Translation Bot (Vietnamese - Japanese)

Bot dịch thuật tự động Việt - Nhật sử dụng **Next.js 15**, **LINE Messaging API** và trí tuệ nhân tạo **Gemini 2.0 Flash**.

## 🚀 Tính năng
- **Dịch thuật 2 chiều**: Tự động nhận diện và dịch Nhật -> Việt hoặc Việt -> Nhật.
- **Tối ưu xí nghiệp**: Ngôn từ ngắn gọn, dễ hiểu, phù hợp cho thực tập sinh và kỹ sư tại Nhật.
- **Tốc độ cao**: Sử dụng Gemini 2.0 Flash mới nhất cho phản hồi gần như tức thì.
- **Xử lý thông minh**: Chỉ dịch tin nhắn văn bản, tự động bỏ qua sticker, ảnh và các sự kiện rác.

## 🛠️ Cài đặt & Cấu hình

### 1. Biến môi trường
Tạo file `.env.local` (hoặc cấu hình trên Vercel) với các biến sau:
- `LINE_CHANNEL_SECRET`: Lấy từ LINE Developers Console.
- `LINE_CHANNEL_ACCESS_TOKEN`: Lấy từ LINE Developers Console (Long-lived token).
- `GEMINI_API_KEY`: Lấy từ [Google AI Studio](https://aistudio.google.com/).

### 2. Triển khai (Deploy)
Dự án được tối ưu hóa để chạy trên **Vercel**:
1. Kết nối Repository này với Vercel.
2. Thêm các Biến môi trường trên.
3. Deploy!

### 3. Cấu hình Webhook
Sau khi deploy, truy cập vào LINE Developers Console:
- **Webhook URL**: `https://your-domain.vercel.app/api/webhook`
- **Allow Webhook**: Bật (Enabled).
- **Auto-reply messages**: Tắt (Disabled) để tránh phản hồi mặc định của LINE.

## 💻 Phát triển Local
```bash
npm install
npm run dev
```
Sử dụng `ngrok` để test webhook local:
```bash
ngrok http 3000
```

## 📝 License
MIT
