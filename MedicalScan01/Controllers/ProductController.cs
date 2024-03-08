using MedicalScan01.Models;
using Microsoft.AspNetCore.Mvc;

namespace MedicalScan01.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly JsonFileDataService _dataService;

        public ProductController(JsonFileDataService dataService)
        {
            _dataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductItem>> Get()
        {
            try
            {
                List<ProductItem> productItems = _dataService.ProductStore;
                return Ok(productItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ProductItem> Get(int id)
        {
            try
            {
                var productItem = _dataService.ProductStore.FirstOrDefault(x => x.Id == id);
                if (productItem == null)
                    return NotFound($"Product with id {id} not found");

                return Ok(productItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductItem value)
        {
            try
            {
                if (value == null)
                    return BadRequest("Product data is null");

                value.Id = _dataService.IncrementId;
                _dataService.ProductStore.Add(value);
                _dataService.SaveAllData();
                _dataService.IncrementId = _dataService.IncrementId + 1;

                var result = Ok(value);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] ProductItem value)
        {
            try
            {
                if (value == null)
                    return BadRequest("Product data is null");

                int index = _dataService.ProductStore.FindIndex(x => x.Id == id);
                if (index == -1)
                    return NotFound($"Product with id {id} not found");

                _dataService.ProductStore[index] = value;
                _dataService.SaveAllData();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                ProductItem item = _dataService.ProductStore.FirstOrDefault(x => x.Id == id);
                if (item == null)
                    return NotFound($"Product with id {id} not found");

                _dataService.ProductStore.Remove(item);
                _dataService.SaveAllData();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
