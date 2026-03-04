import { NextRequest, NextResponse } from 'next/server';
import { messagingApi, WebhookEvent } from '@line/bot-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';

const { MessagingApiClient } = messagingApi;

// Khởi tạo LINE client
const client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
});

// Khởi tạo Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: 'Bạn là thông dịch viên tại xí nghiệp Nhật Bản. Nếu input là tiếng Việt, dịch sang tiếng Nhật. Nếu input là tiếng Nhật, dịch sang tiếng Việt. Ưu tiên ngôn từ ngắn gọn, dễ hiểu cho thực tập sinh, bỏ qua kính ngữ rườm rà. Chỉ trả về text kết quả dịch, tuyệt đối không giải thích.',
});

const GEMINI_TIMEOUT_MS = 10000; // 10 giây

// Hàm gọi Gemini có timeout
async function translateWithTimeout(text: string): Promise<string> {
    const translatePromise = model.generateContent(text).then(r => r.response.text().trim());
    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini timeout')), GEMINI_TIMEOUT_MS)
    );
    return Promise.race([translatePromise, timeoutPromise]);
}

// Hàm xác minh chữ ký từ LINE
function verifySignature(rawBody: string, signature: string): boolean {
    const secret = process.env.LINE_CHANNEL_SECRET || '';
    const hash = crypto.createHmac('SHA256', secret).update(rawBody).digest('base64');
    return hash === signature;
}

// Hàm xử lý từng event
async function handleEvent(event: WebhookEvent): Promise<void> {
    // Chỉ nhận sự kiện message text
    if (event.type !== 'message' || event.message.type !== 'text') return;
    // Bỏ qua nếu không có userId (tránh lặp vô hạn)
    if (!event.source || !event.source.userId) return;

    const { text } = event.message;
    const { replyToken } = event;

    // Chỉ dịch nếu tin nhắn bắt đầu bằng '@'
    if (!text.startsWith('@')) return;

    const contentToTranslate = text.substring(1).trim();
    if (!contentToTranslate) return;

    try {
        const translatedText = await translateWithTimeout(contentToTranslate);
        await client.replyMessage({
            replyToken,
            messages: [{ type: 'text', text: `🤖 [AI]: ${translatedText}` }],
        });
    } catch (geminiError) {
        console.error('Gemini error:', geminiError);
        // Thông báo lỗi cho người dùng thay vì im lặng
        await client.replyMessage({
            replyToken,
            messages: [{ type: 'text', text: '⚠️ Dịch thất bại, vui lòng thử lại sau.' }],
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        // FIX 1: Xác minh chữ ký từ LINE để chặn request giả mạo
        const rawBody = await req.text();
        const signature = req.headers.get('x-line-signature') || '';
        if (!verifySignature(rawBody, signature)) {
            console.warn('Invalid LINE signature — request rejected');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = JSON.parse(rawBody);
        const events: WebhookEvent[] = body.events || [];

        // FIX 2: Xử lý tất cả events song song thay vì tuần tự
        await Promise.all(events.map(event => handleEvent(event)));

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
