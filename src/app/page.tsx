export default function Home() {
  return (
    <div className="min-h-screen bg-worker-neutral-50 p-8 pb-20 sm:p-20">
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-worker-primary-700">
            Worker 컬러 테마 구축 완료
          </h1>
          <p className="text-base text-worker-neutral-500">
            Figma Worker 섹션 기준으로 Tailwind CSS 커스텀 컬러 토큰을
            정의했습니다. 이제{" "}
            <code className="px-1.5 py-0.5 rounded bg-worker-neutral-100 text-worker-neutral-700 text-sm">
              bg-worker-primary-600
            </code>{" "}
            같은 유틸리티 클래스를 사용할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg bg-white border border-worker-neutral-200">
            <h2 className="text-sm font-medium text-worker-neutral-700 mb-2">
              Primary 컬러
            </h2>
            <div className="space-y-2">
              <div className="h-12 rounded bg-worker-primary-700 flex items-center justify-center text-white text-sm font-medium">
                primary-700 (#12436d)
              </div>
              <div className="h-12 rounded bg-worker-primary-600 flex items-center justify-center text-white text-sm font-medium">
                primary-600 (#1f70b7)
              </div>
              <div className="h-12 rounded bg-worker-primary-50 flex items-center justify-center text-worker-primary-700 text-sm font-medium">
                primary-50 (#eaf3fc)
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white border border-worker-neutral-200">
            <h2 className="text-sm font-medium text-worker-neutral-700 mb-2">
              Semantic 컬러
            </h2>
            <div className="space-y-2">
              <div className="h-12 rounded bg-worker-success flex items-center justify-center text-white text-sm font-medium">
                success (#10b981)
              </div>
              <div className="h-12 rounded bg-worker-warning flex items-center justify-center text-white text-sm font-medium">
                warning (#ff8400)
              </div>
              <div className="h-12 rounded bg-worker-danger flex items-center justify-center text-white text-sm font-medium">
                danger (#ef4444)
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <button className="rounded-lg bg-worker-primary-600 text-white px-6 h-12 text-sm font-medium hover:bg-worker-primary-700 transition-colors">
            Worker 홈으로 이동 (예시)
          </button>
          <button className="rounded-lg border border-worker-neutral-200 bg-white text-worker-neutral-700 px-6 h-12 text-sm font-medium hover:bg-worker-neutral-50 transition-colors">
            컬러 토큰 가이드 보기 (예시)
          </button>
        </div>
      </main>
    </div>
  );
}
