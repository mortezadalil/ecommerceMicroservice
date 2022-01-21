namespace Basket.Api.Models
{
    public class Basket
    {
        public Basket(string userName)
        {
            this.UserName = userName;
        }

        public string UserName { get; set; }

        public List<BasketItem> BasketItems
        {
            get; set;
        } = new List<BasketItem>();

        public long TotalPrice
        {
            get
            {
                return BasketItems.Sum(x => x.Price * x.Count);
            }
        }
    }

    public class BasketItem
    {
        public int Count { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public long Price { get; set; }
    }
}
