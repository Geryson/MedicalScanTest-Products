using Newtonsoft.Json;
using MedicalScan01.Models;

namespace MedicalScan01
{
    public class JsonFileDataService
    {
        private readonly string _filePath;
        private List<ProductItem> _productStore;
        private int _incrementId;

        private readonly object _lock = new object();

        public virtual List<ProductItem> ProductStore
        {
            get
            {
                if (_productStore == null || _productStore.Count == 0)
                {
                    lock (_lock)
                    {
                        if (_productStore == null || _productStore.Count == 0)
                            LoadData();
                    }
                }
                return _productStore;
            }
            set
            {
                _productStore =  new List<ProductItem>();
            }
        }

        public int IncrementId { get => _incrementId; set => _incrementId = value; }

        public JsonFileDataService(IWebHostEnvironment environment)
        {
            _filePath = Path.Combine(environment.ContentRootPath, "Data", "products.json");

            _productStore = new List<ProductItem>();
            _incrementId = 0;
        }

        public JsonFileDataService() {
            _filePath = "C:\\Users\\csava\\source\\repos\\MedicalScan01\\Data";

            _productStore = new List<ProductItem>();
            _incrementId = 0;

        }

        private void LoadData()
        {
            if (File.Exists(_filePath))
            {
                string jsonData = File.ReadAllText(_filePath);
                _productStore = JsonConvert.DeserializeObject<List<ProductItem>>(jsonData);
                if (_incrementId == 0 && _productStore != null && _productStore.Count > 0)
                {
                    _incrementId = _productStore.Max(i => i.Id) + 1;
                }
            }
        }

        public void SaveAllData()
        {
            string jsonData = JsonConvert.SerializeObject(_productStore);
            File.WriteAllText(_filePath, jsonData);
        }
    }
}