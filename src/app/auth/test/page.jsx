import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-bold text-blue-500">bisa<span className="text-orange-500">ekspor</span></h1>
            <div className="space-x-4">
              <a href="#" className="text-sm text-gray-500">Belum punya akun? <span className="text-blue-500">Daftar disini</span></a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="relative">
          {/* Replace with your image */}
          <img
            src="/images/cards/cards-03.png"
            alt="Background"
            className="object-cover w-full h-full sm:h-96"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full mx-auto sm:max-w-md">
              <h2 className="text-lg font-bold text-gray-700">Login Bisa Ekspor</h2>
              <form className="mt-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Masukkan email kamu"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Masukkan password kamu"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Selanjutnya
                </button>
              </form>
              <div className="mt-6 flex items-center justify-center">
                <span className="text-gray-500 text-sm">atau login dengan</span>
              </div>
              <button
                type="button"
                className="mt-2 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-100"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                Login dengan Google
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end">
          <a href="https://wa.me/your-number" className="text-green-500 text-2xl">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
