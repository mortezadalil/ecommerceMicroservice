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

    public BasketController(ILogger<BasketController> logger, IDistributedCache rediscache)
    {
        _rediscache = rediscache;
        _logger = logger;
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
