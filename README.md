# Hệ thống quản lý doanh thu (Revenue Dashboard Management System)

## 1. Giới thiệu

Revenue Dashboard Management System là hệ thống quản lý và theo dõi doanh thu theo ngày, cung cấp giao diện tổng quan doanh thu theo tuần và hỗ trợ so sánh kết quả kinh doanh với tuần trước.

Hệ thống cho phép quản trị viên quản lý dữ liệu doanh thu, theo dõi các chỉ số kinh doanh và xem biểu đồ trực quan. Dự án sử dụng kiến trúc frontend và backend riêng biệt, kết hợp PostgreSQL để lưu trữ dữ liệu.

## 2. Công nghệ sử dụng

### Frontend

- Next.js
- React
- Tailwind CSS
- Recharts
- Axios

### Backend

- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcrypt

### Cơ sở dữ liệu

- PostgreSQL
- Sequelize Migrations

### Công cụ triển khai

- Docker
- Docker Compose

## 3. Các chức năng chính

### Xác thực và phân quyền

- Đăng nhập bằng tài khoản người dùng.
- Xác thực bằng JWT access token và refresh token.
- Phân quyền giữa người dùng thông thường và quản trị viên.
- Bảo vệ các trang và API yêu cầu xác thực.

### Dashboard doanh thu

- Hiển thị tổng quan doanh thu theo tuần.
- Hiển thị biểu đồ cột so sánh dữ liệu của tuần hiện tại (thứ Hai đến Chủ nhật) với tuần liền trước đó.
- So sánh kết quả kinh doanh với tuần trước.
- Hiển thị biểu đồ cột trực quan bằng Recharts.
- Hiển thị mức thay đổi của các chỉ số kinh doanh.
- Hỗ trợ xuất biểu đồ doanh thu thành ảnh PNG.

### Quản lý doanh thu

- Xem dữ liệu doanh thu theo ngày.
- Thêm dữ liệu doanh thu cho ngày chưa có dữ liệu.
- Chỉnh sửa dữ liệu doanh thu đã tồn tại.
- Đồng bộ dữ liệu sau khi quản trị viên cập nhật thông tin.

### Quản lý cơ sở dữ liệu

- Khởi tạo cấu trúc bảng bằng Sequelize Migrations.
- Tự động kiểm tra và tạo tài khoản quản trị mặc định khi backend khởi động.
- Lưu trữ dữ liệu bằng PostgreSQL và Docker volume.

## 4. Yêu cầu cài đặt

Trước khi chạy dự án, cần cài đặt:

- Git.
- Docker Desktop trên Windows/macOS hoặc Docker Engine và Docker Compose trên Linux.

Không cần cài đặt riêng Node.js hoặc PostgreSQL trên máy tính nếu chạy toàn bộ hệ thống bằng Docker Compose.

## 5. Cấu trúc dự án

dashboard-management-system/
├── frontend/
│ ├── Dockerfile
│ ├── .dockerignore
│ ├── package.json
│ └── ...
├── backend/
│ ├── Dockerfile
│ ├── .dockerignore
│ ├── migrations/
│ ├── src/
│ ├── package.json
│ └── ...
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md

## 6. Cấu hình môi trường

Tại thư mục gốc của dự án, tạo file `.env` dựa trên file `.env.example`.

### Linux/macOS

```bash
cp .env.example .env
```

Mở file `.env` và cấu hình các biến môi trường phù hợp với `docker-compose.yml`.

Ví dụ:

```dotenv
# Frontend
FRONTEND_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Backend
PORT=5000

# Database
DB_HOST=db
DB_PORT=5432
DB_NAME=revenue_dashboard
DB_USER=postgres
DB_PASSWORD=your_database_password

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1m
JWT_REFRESH_EXPIRES_IN=7d
```

## 7. Cài đặt và khởi chạy

### Bước 1: Tải mã nguồn

git clone <repository-url>
cd dashboard-management-system

### Bước 2: Tạo file môi trường

Tạo file `.env` theo hướng dẫn tại mục 6 và kiểm tra lại các thông số kết nối.

### Bước 3: Khởi chạy toàn bộ hệ thống

Tại thư mục gốc dự án, chạy:

```bash
docker compose up --build -d
```

## 8. Truy cập ứng dụng

Sau khi các service khởi chạy thành công, truy cập:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

Các trang sử dụng

Trang Dashboard: http://localhost:3000

Trang đăng nhập: http://localhost:3000/login

Trang quản lý doanh thu: http://localhost:3000/admin

Hướng dẫn sử dụng

Truy cập /login để đăng nhập bằng tài khoản quản trị mặc định:

Username: admin

Password: admin

Sau khi đăng nhập thành công, truy cập /admin để xem và thao tác với dữ liệu doanh thu theo quyền được cấp.

Tại trang quản lý, thực hiện các thao tác xem, thêm hoặc chỉnh sửa dữ liệu doanh thu theo ngày.

## 9. Tài khoản quản trị mặc định

Khi backend khởi động, hệ thống tự động kiểm tra tài khoản có tên `admin` trong cơ sở dữ liệu.

Nếu tài khoản chưa tồn tại, hệ thống sẽ tạo tài khoản quản trị mặc định. Nếu tài khoản đã tồn tại, hệ thống giữ nguyên tài khoản hiện có và không tạo thêm tài khoản trùng lặp.

Thông tin đăng nhập mặc định:

| Trường   | Giá trị |
| -------- | ------- |
| Username | `admin` |
| Password | `admin` |
| Role     | `admin` |

Tài khoản này được sử dụng để đăng nhập và thực hiện các chức năng quản lý dữ liệu doanh thu theo quyền được cấp.

## 10. Quản lý cơ sở dữ liệu và migrations

Các migration của Sequelize được lưu trong thư mục: backend/migrations/

Migration được sử dụng để tạo và cập nhật cấu trúc cơ sở dữ liệu theo phiên bản, giúp khởi tạo database nhất quán trên các môi trường khác nhau.

## 11. Dừng và khởi động lại ứng dụng

### Dừng các container

```bash
docker compose stop
```

Lệnh này dừng các container nhưng giữ chúng để có thể khởi động lại.

### Dừng và xóa container

```bash
docker compose down
```

Lệnh này xóa các container và network do Compose tạo, nhưng không xóa named volume PostgreSQL theo mặc định.

### Khởi động lại

```bash
docker compose up -d
```

### Build lại khi có thay đổi code

Nếu cần build lại image sau khi thay đổi code:

```bash
docker compose up --build -d
```

Nếu chỉ sửa frontend:

```bash
docker compose build frontend
docker compose up -d
```

Nếu chỉ sửa backend:

```bash
docker compose build backend
docker compose up -d
```
