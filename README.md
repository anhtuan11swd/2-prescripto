# Prescripto - Hệ thống đặt lịch hẹn khám bệnh

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4.svg)](https://tailwindcss.com/)

## Live Demo

- **Khách hàng (Frontend):** [https://2-prescripto.vercel.app/](https://2-prescripto.vercel.app/)
- **Quản trị (Admin):** [https://2-prescripto-admin.vercel.app/](https://2-prescripto-admin.vercel.app/)
- **API Documentation (Swagger):** [http://localhost:4000/api-docs](http://localhost:4000/api-docs) (khi chạy local)

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Cách sử dụng](#cách-sử-dụng)
- [API Endpoints](#api-endpoints)
- [Đóng góp](#đóng-contributing)
- [Tác giả](#tác-giả)
- [Giấy phép](#giấy-phép)

---

## Giới thiệu

**Prescripto** là ứng dụng web quản lý phòng khám và đặt lịch hẹn khám bệnh trực tuyến. Hệ thống cho phép bệnh nhân tìm kiếm bác sĩ theo chuyên khoa, xem thông tin chi tiết, đặt lịch hẹn và thanh toán trực tuyến qua Stripe. Bên cạnh đó, hệ thống cung cấp trang quản trị (Admin Dashboard) để quản lý bác sĩ, bệnh nhân và lịch hẹn, cùng với giao diện riêng cho bác sĩ để theo dõi lịch hẹn và quản lý hồ sơ cá nhân.

---

## Tính năng

### Bệnh nhân (Frontend)

- Đăng ký/đăng nhập tài khoản
- Xem danh sách bác sĩ theo chuyên khoa
- Đặt lịch hẹn khám bệnh với khung giờ cụ thể
- Thanh toán trực tuyến qua Stripe Checkout
- Xem và quản lý lịch hẹn cá nhân
- Hủy lịch hẹn
- Cập nhật hồ sơ cá nhân (ảnh, tên, SĐT, địa chỉ, ngày sinh, giới tính)

### Quản trị viên (Admin)

- Đăng nhập quản trị
- Dashboard tổng quan (số lượng bác sĩ, bệnh nhân, lịch hẹn)
- Thêm bác sĩ mới (upload ảnh qua Cloudinary)
- Quản lý danh sách bác sĩ
- Bật/tắt trạng thái nhận lịch của bác sĩ
- Xem và quản lý tất cả lịch hẹn
- Hủy lịch hẹn

### Bác sĩ (Doctor)

- Đăng nhập bác sĩ
- Dashboard cá nhân (lịch hẹn, thu nhập, bệnh nhân)
- Xem danh sách lịch hẹn
- Đánh dấu lịch hẹn hoàn thành
- Hủy lịch hẹn
- Quản lý hồ sơ cá nhân

---

## Công nghệ sử dụng

### Frontend & Admin

| Công nghệ                                       | Phiên bản | Mục đích              |
| ----------------------------------------------- | --------- | --------------------- |
| [React](https://react.dev/)                     | 19        | Framework UI          |
| [Vite](https://vitejs.dev/)                     | 8         | Build tool            |
| [Tailwind CSS](https://tailwindcss.com/)        | 4         | Utility-first CSS     |
| [React Router](https://reactrouter.com/)        | 7         | Routing               |
| [Axios](https://axios-http.com/)                | 1.19      | HTTP client           |
| [Stripe.js](https://stripe.com/docs/js)         | 9         | Thanh toán trực tuyến |
| [React Hot Toast](https://react-hot-toast.com/) | 2.6       | Thông báo             |
| [Lucide React](https://lucide.dev/)             | 1.28      | Icon library          |
| [Zod](https://zod.dev/)                         | 4         | Schema validation     |
| [Biome](https://biomejs.dev/)                   | 2.4       | Linter & Formatter    |

### Backend

| Công nghệ                                                                 | Phiên bản | Mục đích                  |
| ------------------------------------------------------------------------- | --------- | ------------------------- |
| [Express](https://expressjs.com/)                                         | 5         | Web framework             |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | 9         | Database & ODM            |
| [JWT](https://jwt.io/)                                                    | 9         | Xác thực (JSON Web Token) |
| [Bcrypt](https://www.npmjs.com/package/bcrypt)                            | 6         | Mã hóa mật khẩu           |
| [Stripe](https://stripe.com/)                                             | 22        | Xử lý thanh toán          |
| [Cloudinary](https://cloudinary.com/)                                     | 2.10      | Quản lý ảnh               |
| [Multer](https://github.com/expressjs/multer)                             | 2         | Upload file               |
| [Swagger](https://swagger.io/)                                            | 6         | API documentation         |
| [Validator](https://github.com/validatorjs/validator.js)                  | 13        | Validate input            |
| [Zod](https://zod.dev/)                                                   | 4         | Schema validation         |
| [Nodemon](https://nodemon.io/)                                            | 3         | Auto-restart server       |

---

## Cấu trúc dự án

```
2-prescripto/
├── admin/                    # Admin Dashboard (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar
│   │   ├── context/          # AdminContext, DoctorContext
│   │   ├── Pages/            # Dashboard, Appointments, Login, ...
│   │   ├── utils/            # Helpers, axios config
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/                  # REST API (Express.js)
│   ├── src/
│   │   ├── config/           # MongoDB, Cloudinary, Swagger
│   │   ├── controllers/      # adminController, doctorController, userController
│   │   ├── middleware/       # Auth (JWT), Multer
│   │   ├── models/           # User, Doctor, Appointment
│   │   ├── routes/           # adminRoute, doctorRoute, userRoute
│   │   ├── seed/             # Doctor seed data
│   │   ├── services/         # Business logic
│   │   ├── types/
│   │   ├── utils/            # Validation (Zod)
│   │   └── server.js
│   ├── scripts/
│   ├── .env.example
│   └── package.json
│
├── frontend/                 # Client App (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images, data
│   │   ├── components/       # Banner, Footer, Header, Navbar, ...
│   │   ├── context/          # AppContext
│   │   ├── Pages/            # Home, Doctors, Login, MyAppointments, ...
│   │   ├── utils/            # Helpers, axios config
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Hướng dẫn cài đặt

### Yêu cầu trước khi cài đặt (Prerequisites)

- [Node.js](https://nodejs.org/) phiên bản 18 trở lên
- [MongoDB](https://www.mongodb.com/) (local hoặc MongoDB Atlas)
- Tài khoản [Cloudinary](https://cloudinary.com/) (cho upload ảnh)
- Tài khoản [Stripe](https://stripe.com/) (cho thanh toán)

### 1. Clone dự án

```bash
git clone https://github.com/your-username/2-prescripto.git
cd 2-prescripto
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong file `.env`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CURRENCY=vnd
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### 3. Cài đặt Frontend

```bash
cd ../frontend
npm install
```

Tạo file `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

### 4. Cài đặt Admin

```bash
cd ../admin
npm install
```

Tạo file `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## Cách sử dụng

### Chạy Backend

```bash
cd backend
npm run dev
```

Server sẽ khởi động tại `http://localhost:4000`. Swagger docs có tại `http://localhost:4000/api-docs`.

Khi chạy lần đầu, hệ thống tự động seed dữ liệu bác sĩ mẫu vào database.

### Chạy Frontend

```bash
cd frontend
npm run dev
```

Trang khách hàng sẽ hiển thị tại `http://localhost:5173`.

### Chạy Admin Dashboard

```bash
cd admin
npm run dev
```

Trang quản trị sẽ hiển thị tại `http://localhost:5174`.

### Tài khoản mặc định

| Vai trò | Email                | Mật khẩu |
| ------- | -------------------- | -------- |
| Admin   | admin@prescripto.com | admin123 |

> Lưu ý: Bác sĩ được tạo tự động từ seed data. Mật khẩu mặc định: `Prescripto@123`

---

## API Endpoints

### User (`/api/v1/user`)

| Method | Endpoint              | Mô tả                       | Auth |
| ------ | --------------------- | --------------------------- | ---- |
| POST   | `/register`           | Đăng ký tài khoản           | -    |
| POST   | `/login`              | Đăng nhập                   | -    |
| GET    | `/profile`            | Lấy thông tin hồ sơ         | User |
| POST   | `/update-profile`     | Cập nhật hồ sơ              | User |
| GET    | `/doctors`            | Danh sách bác sĩ            | -    |
| POST   | `/book-appointment`   | Đặt lịch hẹn                | User |
| GET    | `/appointments`       | Danh sách lịch hẹn          | User |
| POST   | `/cancel-appointment` | Hủy lịch hẹn                | User |
| POST   | `/payment-stripe`     | Tạo Stripe checkout session | User |
| POST   | `/verify-stripe`      | Xác nhận thanh toán         | User |

### Doctor (`/api/v1/doctor`)

| Method | Endpoint                | Mô tả               | Auth   |
| ------ | ----------------------- | ------------------- | ------ |
| POST   | `/login`                | Đăng nhập bác sĩ    | -      |
| GET    | `/appointments`         | Danh sách lịch hẹn  | Doctor |
| POST   | `/complete-appointment` | Đánh dấu hoàn thành | Doctor |
| POST   | `/cancel-appointment`   | Hủy lịch hẹn        | Doctor |
| GET    | `/dashboard`            | Dashboard cá nhân   | Doctor |
| GET    | `/profile`              | Lấy hồ sơ           | Doctor |
| POST   | `/update-profile`       | Cập nhật hồ sơ      | Doctor |

### Admin (`/api/v1/admin`)

| Method | Endpoint               | Mô tả                     | Auth  |
| ------ | ---------------------- | ------------------------- | ----- |
| POST   | `/login`               | Đăng nhập admin           | -     |
| POST   | `/add-doctor`          | Thêm bác sĩ mới           | Admin |
| GET    | `/doctors`             | Danh sách bác sĩ          | Admin |
| POST   | `/change-availability` | Bật/tắt trạng thái bác sĩ | Admin |
| GET    | `/appointments`        | Tất cả lịch hẹn           | Admin |
| POST   | `/cancel-appointment`  | Hủy lịch hẹn              | Admin |
| GET    | `/dashboard`           | Dashboard tổng quan       | Admin |

---

## Scripts hữu ích

```bash
# Backend
npm run dev          # Chạy development server
npm run start        # Chạy production
npm run seed         # Seed dữ liệu bác sĩ
npm run biome:check  # Format + lint code

# Frontend / Admin
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Xem production build
npm run biome:check  # Format + lint code
```

---

## Đóng góp

Mọi đóng góp đều được chào đón! Để đóng góp:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/ten-tinh-nang`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng mới'`)
4. Push lên branch (`git push origin feature/ten-tinh-nang`)
5. Mở Pull Request

Vui lòng sử dụng `npm run biome:check` để kiểm tra code trước khi submit PR.

---

## Tác giả

**Trần Anh Tuấn** - Tác giả dự án

---

## Giấy phép

Dự án sử dụng giấy phép [ISC License](https://opensource.org/licenses/ISC).

Bạn có thể tự do sử dụng, sửa đổi và phân phối mã nguồn này với điều kiện giữ nguyên thông tin bản quyền.
