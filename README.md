# Shoe Store — React + Redux Toolkit + React Router v6

## 1. Cài đặt và chạy
```bash
npm install
```
Sao chép `.env.example` thành `.env`, rồi đặt URL backend:
```env
VITE_API_URL=http://localhost:xxxx
```
Thay `xxxx` bằng port API thật. Sau đó:
```bash
npm run dev
```
Build kiểm tra:
```bash
npm run build
```

## 2. API đã tích hợp theo đề
| Trang | Method | Endpoint |
|---|---|---|
| Login | POST | `/api/Users/signin` |
| Facebook login | POST | `/api/Users/facebooklogin` |
| Profile | POST | `/api/Users/getProfile` |
| Update profile | POST | `/api/Users/updateProfile` |
| Search products | GET | `/api/Product` |
| Product category (tùy chọn) | GET | `/api/Product/getProductByCategory` |
| All categories (tùy chọn) | GET | `/api/Product/getAllCategory` |

## 3. Lưu ý cần đối chiếu với backend
- `VITE_API_URL` phải là URL gốc của backend, không phải endpoint cụ thể.
- `signin` và `facebooklogin` đang gửi JSON `{ email, password }` và `{ accessToken }` tương ứng. Nếu API của giảng viên yêu cầu tên field khác, sửa payload trong `src/pages/Login.jsx`.
- Facebook login thực sự cần tích hợp Facebook Login SDK để nhận access token; nút hiện tại yêu cầu nhập token để gọi endpoint, không tự đăng nhập Facebook.
- Profile đang gửi các field `email`, `name`, `phone`, `password` (nếu nhập), `gender`. Đối chiếu DTO/backend của bạn để dùng đúng tên field và kiểu dữ liệu.
- Hàm đọc response hỗ trợ một số dạng thường gặp (`content`, `data`, mảng trực tiếp). Nếu backend trả cấu trúc khác, chỉnh `unwrapList` trong `productSlice.js`.
- Ảnh sản phẩm được lấy từ các field phổ biến `image`, `img`, `imageUrl`, `imgUrl`; tên và giá cũng hỗ trợ nhiều tên field. Hãy chỉnh `ProductCard.jsx` nếu model của API dùng tên khác.
- Trang Profile chỉ gọi các endpoint được nêu trong đề. Order history và Favourite là giao diện mẫu vì ảnh không cung cấp API tương ứng.
- Cơ chế ProtectedRoute kiểm tra user/token đã lưu. Nếu backend có endpoint xác minh token hoặc refresh token, bổ sung vào flow auth.
