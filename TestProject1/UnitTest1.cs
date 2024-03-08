using MedicalScan01;
using MedicalScan01.Controllers;
using MedicalScan01.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace TestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void PassingTest()
        {
            Assert.Equal(4, Add(2, 2));
        }

        [Fact]
        public void FailingTest()
        {
            Assert.Equal(5, Add(2, 2));
        }

        [Fact]
        public void Get_Returns_OkResult_With_Products ()
        {
            var dataService = new Mock<JsonFileDataService>();
            var productController = new ProductController(dataService.Object);

            var mockProductItems = new List<ProductItem>
            {
                new ProductItem {Id = 1, Name = "Laptop", Price = 1.23},
                new ProductItem {Id = 2, Name = "PC", Price = 1.23}
            };

            dataService.Setup(x => x.ProductStore).Returns(mockProductItems);

            var result = productController.Get() as ActionResult<IEnumerable<ProductItem>>;

            Assert.NotNull(result);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var productItems = Assert.IsAssignableFrom<IEnumerable<ProductItem>>(okResult.Value);
            Assert.Equal(2, productItems?.Count());
        }

        int Add(int x, int y)
        {
            return x + y;
        }
    }
}