using backend.Controllers;
using backend.model;
using backend.Service;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NuGet.Protocol;

namespace backendTests.Tests;

public class AccountControllerTest
{
    [Fact]
    public async Task RegistreerTest()
    {
        // Arrange
        var mockAccountService = new Mock<IAccountService>();
        var user = new User { UserName = "testgebruiker", Password = "String1!" };
        mockAccountService.Setup(x => x.Registreer(user))
            .ReturnsAsync(new StatusCodeResult(201));
        AccountController accountController = new AccountController(mockAccountService.Object);

        // Act
        var result = await accountController.Registreer(user);
        var json = result.ToJson().Split(":").Last().Trim('}');
        
        // Assert
        Assert.Equal(201, int.Parse(json));
    }
}