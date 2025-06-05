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

## Phần Chưa Hoàn Thành (Part 2)

Dưới đây liệt kê những tiêu chí trong Part 2 mà dự án hiện tại chưa thực hiện, cùng với mô tả ngắn gọn để bạn có kế hoạch hoàn thiện:

1. **Redis Caching**  
   - Hiện trạng: Chưa có bất kỳ kết nối hay logic nào liên quan đến Redis.  
   - Mô tả cần làm: Kết nối đến một Redis server, sử dụng Redis để cache các dữ liệu thường xuyên truy vấn (ví dụ: danh sách sản phẩm, thông tin người dùng, hoặc token). Khi một request đến, nếu có dữ liệu lưu sẵn trong cache thì sẽ trả về luôn, giúp giảm tải cho cơ sở dữ liệu. Đồng thời đảm bảo cơ chế xoá hoặc làm mới dữ liệu khi có thay đổi (ví dụ khi một sản phẩm được cập nhật, cache cần được invalidate).

2. **Dependency Injection (fx hoặc wire)**  
   - Hiện trạng: Toàn bộ cấu hình khởi tạo (database, router, middleware, v.v.) đều viết trực tiếp trong `main.go`; chưa có DI framework.  
   - Mô tả cần làm: Tách riêng phần khởi tạo các thành phần (database, Redis, RabbitMQ, logger, tracer, v.v.) thành các module độc lập và cấu hình để DI framework (Uber Fx hoặc Google Wire) tự động inject. Khi đó, `main.go` chỉ cần gọi một hàm duy nhất để khởi động ứng dụng, và mọi phụ thuộc được cung cấp sẵn.

3. **RabbitMQ (Message Queue)**  
   - Hiện trạng: Chưa tích hợp RabbitMQ, không có producer/consumer.  
   - Mô tả cần làm: Thiết lập kết nối đến RabbitMQ server, xây dựng producer để gửi message (ví dụ mỗi khi có đơn hàng mới, gửi thông tin đơn hàng vào một queue), và consumer chạy ngầm (hoặc chạy ở worker riêng) để nhận message và thực hiện các công việc xử lý bất đồng bộ (ví dụ: gửi email xác nhận, cập nhật kho, hoặc ghi log cho nghiệp vụ background). Cần định nghĩa cách cấu hình, cơ chế retry khi gửi/nhận thất bại và cách đóng gói chúng trong Docker Compose nếu triển khai.

4. **Logging tập trung (ELK Stack hoặc Grafana Loki)**  
   - Hiện trạng: Mới chỉ dùng thư viện `log` mặc định của Go để in message ra console.  
   - Mô tả cần làm: Chọn một giải pháp logging tập trung (ELK hoặc Grafana Loki).  
     - Với ELK Stack: cần cấu hình Logstash hoặc Beats để thu nhận log từ ứng dụng, đẩy lên Elasticsearch, và hiển thị trên Kibana. Ứng dụng cần gửi log ở định dạng phù hợp (thường là JSON) để dễ parse.  
     - Với Grafana Loki: ứng dụng sẽ đẩy log lên một endpoint của Loki qua HTTP hoặc UDP, sau đó có thể truy vấn và hiển thị log trong Grafana.  
   - Kết quả mong muốn: Khi chạy demo, bạn có thể dễ dàng truy cập dashboard Kibana hoặc Grafana để xem log ứng dụng theo thời gian thực.

5. **Tích hợp OpenTelemetry (Observability)**  
   - Hiện trạng: Chưa cài đặt hay instrument bất kỳ thành phần nào với OpenTelemetry.  
   - Mô tả cần làm:  
     - Khởi tạo một Tracer Provider (ví dụ OTLP/Jaeger) để thu thập trace.  
     - Tạo middleware cho Gin để tạo span cho mỗi request HTTP, bao gồm trace context, để dễ dàng theo dõi đường đi của một request xuyên qua các thành phần.  
     - Instrument GORM để thu thập thời gian thực thi các truy vấn cơ sở dữ liệu.  
     - Triển khai backend collector (OTLP Collector hoặc Jaeger) để lưu trữ và hiển thị trace.  
   - Kết quả mong muốn: Khi có một request, bạn có thể truy cập trang UI (Jaeger hoặc Grafana Tempo) để xem chi tiết khoảng thời gian xử lý, các span con (truy vấn DB, gửi mail, v.v.) và dễ dàng xác định điểm nghẽn hiệu năng.

6. **Logrus hoặc Zerolog (Logging nâng cao)**  
   - Hiện trạng: Dự án đang sử dụng `log.Println` để ghi log cơ bản.  
   - Mô tả cần làm: Chọn một thư viện logging nâng cao (Logrus hoặc Zerolog) để thay thế `log` mặc định, nhằm có khả năng:  
     - Thiết lập các cấp độ log (Info, Warn, Error, Debug).  
     - Xuất log dưới định dạng JSON hoặc format dễ parse để dùng chung với ELK/Loki.  
     - Hỗ trợ hook hoặc sink để đẩy log đến các hệ thống bên ngoài (Elasticsearch, Loki, v.v.).  
   - Kết quả mong muốn: Mọi log từ ứng dụng được ghi theo một chuẩn thống nhất, có thể gắn thông tin trace ID (từ OpenTelemetry) và xuất sang hệ thống logging tập trung.

---




