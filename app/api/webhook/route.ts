import { NextRequest, NextResponse } from 'next/server';
import { messagingApi, WebhookEvent } from '@line/bot-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const { MessagingApiClient } = messagingApi;

// Khởi tạo LINE client
const client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
});

// Khởi tạo Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'Bạn là thông dịch viên tại xí nghiệp Nhật Bản. Nếu input là tiếng Việt, dịch sang tiếng Nhật. Nếu input là tiếng Nhật, dịch sang tiếng Việt. Ưu tiên ngôn từ ngắn gọn, dễ hiểu cho thực tập sinh, bỏ qua kính ngữ rườm rà. Chỉ trả về text kết quả dịch, tuyệt đối không giải thích.',
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const events: WebhookEvent[] = body.events;

        // Xử lý từng sự kiện trong webhook
        for (const event of events) {
            // 1. Chỉ nhận sự kiện message.type === 'text'
            // 2. Bỏ qua các loại khác như sticker, image, video...
            if (event.type !== 'message' || event.message.type !== 'text') {
                continue;
            }

            // 3. Bỏ qua tin nhắn do Bot gửi đi (tránh lặp vô hạn)
            // Lưu ý: Trong LINE, sự kiện thường từ 'user', 'group', 'room'.
            // Nếu có hệ thống phức tạp hoặc bot khác, ta kiểm tra source.
            if (!event.source || !event.source.userId) {
                continue;
            }

            const { text } = event.message;
            const { replyToken } = event;

            try {
                // 4. Tích hợp Gemini để dịch thuật
                const result = await model.generateContent(text);
                const translatedText = result.response.text().trim();

                // 5. Dùng replyToken để phản hồi ngay lập tức
                await client.replyMessage({
                    replyToken: replyToken,
                    messages: [{
                        type: 'text',
                        text: translatedText
                    }],
                });
            } catch (geminiError) {
                console.error('Gemini error:', geminiError);
                // Có thể gửi tin nhắn lỗi cho người dùng nếu cần
            }
        }

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
