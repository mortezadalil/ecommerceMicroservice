using Dapper;
using Discount.Api.Grpc;
using Grpc.Core;
using Npgsql;

namespace Discount.Api.GrpcService.Server
{
    public class GetPriceService : Price.PriceBase
    {
        private readonly IConfiguration _configuration;

        public GetPriceService(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public override async Task<PriceReply> GetPrice(PriceRequest request, ServerCallContext context)
        {
            using var connection = new NpgsqlConnection
                           (_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var prices = await connection.QueryAsync<Discount.Api.Models.Price>
                ("SELECT * FROM \"Price\" WHERE \"ProductId\" = @ProductId Order By \"CreatedDate\" Desc ", new { ProductId = request.Id });

            if (prices.Count() == 0)
            {
                return await Task.FromResult(new PriceReply
                {
                    Id = request.Id,
                    ErrorMessage = "Price Not Found"

                });

            }
            return await Task.FromResult(new PriceReply
            {
                Id = request.Id,
                Amount = prices.FirstOrDefault().Amount,
                CurrentAmount = prices.FirstOrDefault().CurrentAmount,

            });
        }

    }
}