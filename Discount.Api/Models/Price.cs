namespace Discount.Api.Models
{
    public class Price
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public long Amount { get; set; }
        public long CurrentAmount { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
