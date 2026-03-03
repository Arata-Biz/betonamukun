import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-32">
        <nav className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              B
            </div>
            <span className="text-xl font-bold tracking-tight text-white">BetonamuKun</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#setup" className="hover:text-white transition-colors">Setup</Link>
            <Link href="https://github.com/Arata-Biz/betonamukun" className="hover:text-white transition-colors">Github</Link>
          </div>
        </nav>

        <header className="max-w-3xl mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
            Dịch thuật <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">Việt - Nhật</span> thông minh.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            Giải pháp thông dịch viên AI chuyên dụng cho xí nghiệp Nhật Bản. Ngôn từ ngắn gọn, dễ hiểu, tối ưu cho thực tập sinh và kỹ sư.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://github.com/Arata-Biz/betonamukun"
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all transform hover:-translate-y-1"
            >
              Xem Repository
            </Link>
            <Link
              href="#setup"
              className="px-8 py-4 bg-slate-900 text-white font-bold border border-slate-800 rounded-xl hover:bg-slate-800 transition-all"
            >
              Hướng dẫn cài đặt
            </Link>
          </div>
        </header>

        <section id="features" className="grid sm:grid-cols-3 gap-8 mb-32">
          {[
            {
              title: "Dịch thuật 2 chiều",
              desc: "Tự động nhận diện ngôn ngữ Việt <-> Nhật để dịch phản hồi ngay lập tức.",
              icon: "🔄"
            },
            {
              title: "Tối ưu xí nghiệp",
              desc: "Bỏ qua kính ngữ rườm rà, ưu tiên ngôn từ ngắn gọn phù hợp môi trường lao động.",
              icon: "🏭"
            },
            {
              title: "Tích hợp Gemini 2.5",
              desc: "Sử dụng trí tuệ nhân tạo thế hệ mới nhất cho độ chính xác và tốc độ vượt trội. (Gemini 2.5)",
              icon: "⚡"
            }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors group">
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        <section id="setup" className="p-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.67,8.33L11.5,14.5a.5.5,0,0,1-.71,0l-2.46-2.46a.5.5,0,0,1,0-.71l.71-.71a.5.5,0,0,1,.71,0L11.15,12l4.91-4.91a.5.5,0,0,1,.71,0l.71.71A.5.5,0,0,1,17.67,10.33Z" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng triển khai?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg text-lg">
            Chỉ cần cài đặt URL Webhook trên LINE Developers Console và cấu hình API Key trong Environment Variables.
          </p>
          <div className="bg-slate-950/30 backdrop-blur-md border border-white/10 p-6 rounded-2xl font-mono text-sm mb-8 text-indigo-50 underline-offset-4">
            <p className="mb-2"># Sử dụng ký tự '@' trước câu cần dịch:</p>
            <p className="text-white italic">@Hôm nay trời đẹp quá</p>
          </div>
          <p className="text-xs text-indigo-200">
            © 2026 Arata-Biz. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  );
}
