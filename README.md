# Perfume API

Một **RESTful API** cho ứng dụng bán nước hoa, xây dựng bằng Golang với Gin-Gonic và GORM. Dự án đã triển khai các tính năng CRUD cơ bản, xác thực JWT, tài liệu API tự động bằng Swaggo, and Docker hoá để dễ dàng chạy thử và triển khai.

---


## Giới thiệu

`Perfume API` là một dự án ví dụ cho phép bạn quản lý sản phẩm (nước hoa), người dùng, đơn hàng, giỏ hàng và các tính năng liên quan. Mục đích chính của dự án:

- Thực hành **Golang** với **Gin-Gonic** để xây dựng RESTful API.  
- Sử dụng **GORM** để thao tác cơ sở dữ liệu PostgreSQL.  
- Tạo tài liệu API tự động bằng **Swaggo** (Swagger).  
- Hỗ trợ reload server tự động khi code thay đổi bằng **Air**.  
- Đóng gói ứng dụng với **Docker** và **Docker Compose**.  
- Tích hợp xác thực **JWT** để bảo vệ các route cần quyền.  

---

## Tính năng chính

1. **Quản lý sản phẩm (Product)**  
   - _Create_, _Read_, _Update_, _Delete_ (CRUD) sản phẩm nước hoa.  
   - Mỗi sản phẩm có các thông tin: `ID`, `Name`, `Description`, `Price`, `ImageURL`, `Category`, `CreatedAt`, `UpdatedAt`.  

2. **Quản lý danh mục (Category)**  
   - Tạo / liệt kê danh mục sản phẩm.  

3. **Quản lý người dùng (User)**  
   - Đăng ký, đăng nhập (JWT).  
   - Phân quyền: `user` / `admin`.  

4. **Xác thực & Phân quyền (Authentication & Authorization)**  
   - Sử dụng **golang-jwt** để phát sinh và kiểm tra JWT token.  
   - Middleware `JWTAuthMiddleware` để bảo vệ route.  
   - Middleware `RequireAdmin` để chỉ admin mới thực hiện một số hành động (ví dụ tạo danh mục, xoá người dùng).  

5. **Giỏ hàng (Cart)**  
   - Thêm / xoá / xem các sản phẩm trong giỏ hàng của user.  

6. **Đơn hàng (Order)**  
   - Tạo đơn hàng từ giỏ hàng.  
   - Quản lý trạng thái đơn (`pending`, `confirmed`, `shipped`, v.v.).  

7. **Đánh giá (Review)**  
   - Người dùng được tạo review (rating + comment) cho từng sản phẩm.  
   - Xem review theo `BookID` (nếu dự án mẫu dùng “Book” làm ví dụ).  

8. **Gửi Email thông báo (Notification)**  
   - Ví dụ: gửi email khi sách sắp hết hàng (sử dụng gomail và SMTP config).  

---

## Công nghệ & Công cụ

- **Ngôn ngữ**: Go (>= 1.20)  
- **Framework Web**: [Gin-Gonic](https://github.com/gin-gonic/gin)  
- **ORM**: [GORM](https://gorm.io)  
- **Tài liệu API**: [Swaggo](https://github.com/swaggo/swag) (Swagger 2.0)  
- **Reload tự động**: [Air](https://github.com/cosmtrek/air)  
- **Logging**: Go `log` (sẽ update sang Logrus/Zerolog trong tương lai)  
- **JWT**: [github.com/golang-jwt/jwt/v4](https://github.com/golang-jwt/jwt)  
- **Cơ sở dữ liệu**: PostgreSQL  
- **Docker / Docker Compose**  
- **Môi trường**: Linux / macOS / Windows (có Docker)  

---


