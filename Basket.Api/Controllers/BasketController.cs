using Discount.Api.Grpc;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Basket.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class BasketController : ControllerBase
{
    private readonly ILogger<BasketController> _logger;
    private readonly IDistributedCache _rediscache;
    private readonly IConfiguration _configuration;
    public BasketController(ILogger<BasketController> logger, IDistributedCache rediscache, IConfiguration configuration)
    {
        _rediscache = rediscache;
        _logger = logger;
        _configuration = configuration;
    }

    [HttpGet("GetBasketItems/{userName}")]
    public async Task<Basket.Api.Models.Basket?> GetBasketItems(string userName)
    {

        var basket = await _rediscache.GetStringAsync(userName);
        if (string.IsNullOrEmpty(basket))
            return null;

        return JsonSerializer.Deserialize<Basket.Api.Models.Basket>(basket);

    }

    [HttpPost("UpdateBasketItems")]
    public async Task<Basket.Api.Models.Basket?> UpdateBasketItems(Basket.Api.Models.Basket basket)
    {

        using var channel = GrpcChannel.ForAddress(_configuration.GetValue<string>("DiscountGrpcServerUrl"));
        var client = new Price.PriceClient(channel);
        foreach (var item in basket.BasketItems)
        {
            var reply = await client.GetPriceAsync(new PriceRequest() { Id = item.ProductId });
            if (!string.IsNullOrEmpty(reply.ErrorMessage))
            {
                throw new Exception("Price Undefined");
            }
            item.Price = reply.CurrentAmount;
        }


        await _rediscache.SetStringAsync(basket.UserName, JsonSerializer.Serialize(basket));

        return JsonSerializer.Deserialize<Basket.Api.Models.Basket>(await _rediscache.GetStringAsync(basket.UserName));

    }

    [HttpDelete("DeleteBasketItems/{userName}")]
    public async Task DeleteBasketItems(string userName)
    {

        await _rediscache.RemoveAsync(userName);

    }

    [HttpPost("Checkout")]
    public async Task Checkout(string userName)
    {


    }
}
