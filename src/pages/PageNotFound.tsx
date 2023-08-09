import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <main className="grid min-h-full bg-slate-300 place-items-center px-6 lg:px-8">
        <img src="./lookingfor.png" alt="" className="object-cover" />
        <div className="text-center">
          {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Opps
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay lại trang chủ
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold text-gray-900"
            >
              Liên hệ hỗ trợ <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
