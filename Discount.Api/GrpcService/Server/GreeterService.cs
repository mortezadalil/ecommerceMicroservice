
using Discount.Api.Grpc;
using Grpc.Core;

namespace Discount.Api.GrpcService.Server
{
    public class GreeterService : Greeter.GreeterBase
    {
        public GreeterService()
        {

        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello Response"
            });
        }

    }
}