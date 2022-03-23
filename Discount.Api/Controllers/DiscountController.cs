using Dapper;
using Discount.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Discount.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DiscountController : ControllerBase
{

    private readonly ILogger<DiscountController> _logger;
    private readonly IConfiguration _configuration;

    public DiscountController(ILogger<DiscountController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    [HttpGet("GetPrices/{productId}")]
    public async Task<List<Price>> GetPrices(int productId)
    {
        using var connection = new NpgsqlConnection
               (_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

        var prices = await connection.QueryAsync<Price>
            ("SELECT * FROM \"Price\" WHERE \"ProductId\" = @ProductId Order By \"CreatedDate\" Desc ", new { ProductId = productId });


        return prices.ToList();
    }

    [HttpPost("CreatePrice")]
    public async Task<bool> CreatePrice(Price price)
    {
        using var connection = new NpgsqlConnection
                 (_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

        var created =
            await connection.ExecuteAsync
                ("INSERT INTO \"Price\" (\"ProductName\", \"ProductId\", \"Amount\",\"CurrentAmount\",\"CreatedDate\") VALUES (@ProductName, @ProductId,@CurrentAmount, @Amount,@CreatedDate)",
                        new { ProductName = price.ProductName, ProductId = price.ProductId, Amount = price.Amount, CurrentAmount = price.CurrentAmount, CreatedDate = DateTime.Now });

        if (created == 0)
            return false;

        return true;

    }

    [HttpPut("UpdatePrice/{priceId}")]
    public async Task<bool> UpdatePrice(int priceId, Price price)
    {
        using var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

        var updated = await connection.ExecuteAsync
                ("UPDATE \"Price\" SET \"ProductName\"=@ProductName, \"ProductId\" = @ProductId, \"Amount\" = @Amount, \"CurrentAmount\" = @CurrentAmount WHERE \"Id\" = @Id",
                        new { ProductName = price.ProductName, ProductId = price.ProductId, Amount = price.Amount, CurrentAmount = price.CurrentAmount, Id = priceId });

        if (updated == 0)
            return false;

        return true;

    }

    [HttpDelete("DeletePrice/{priceId}")]
    public async Task<bool> DeletePrice(int priceId)
    {
        using var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

        var affected = await connection.ExecuteAsync("DELETE FROM \"Price\" WHERE \"Id\" = @PriceId",
            new { PriceId = priceId });

        if (affected == 0)
            return false;

        return true;
    }


     [HttpGet("test")]
    public async Task<bool> test()
    {
        
        return true;
    }

}
