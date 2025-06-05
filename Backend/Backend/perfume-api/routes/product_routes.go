// routes/ProductRoutes.go

package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/yourusername/perfume-api/controllers"
)

func ProductRoutes(rg *gin.RouterGroup) {
	// GET    /api/products        -> trả về mảng tất cả sản phẩm
	rg.GET("/", controllers.GetProducts)

	// POST   /api/products        -> tạo mới một sản phẩm
	rg.POST("/", controllers.CreateProduct)

	// GET    /api/products/:id    -> lấy chi tiết sản phẩm theo ID
	rg.GET("/:id", controllers.GetProductByID)
	// GetProductByID và GetProductDetail đang làm tương đương nhau.

	// PUT    /api/products/:id    -> cập nhật một sản phẩm
	rg.PUT("/:id", controllers.UpdateProduct)

	// DELETE /api/products/:id    -> xóa một sản phẩm
	rg.DELETE("/:id", controllers.DeleteProduct)
}
