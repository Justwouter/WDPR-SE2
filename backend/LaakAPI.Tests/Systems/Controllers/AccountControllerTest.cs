using backend.Controllers;
using backend.model;
using backend.Service;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace LaakAPI.Tests.Systems.Controllers;

public class AccountControllerTest
{
    [Fact]
    public async Task Registeren_lukt()
    {
        // Arrange
        var mockAccountService = new Mock<IAccountService>();
        var user = new User();
        mockAccountService.Setup(service => service.Registreer(user)).ReturnsAsync(user);
        AccountController sut = new AccountController(mockAccountService.Object);
        
        // Act
        var result = (CreatedResult)await sut.Registreer(user);
        
        // Assert
        result.StatusCode.Should().Be(201);
    }

    [Fact]
    public async Task Registreren_faalt()
    {
        // Arrange
        var mockAccountService = new Mock<IAccountService>();
        var user = new User();
        mockAccountService.Setup(service => service.Registreer(user)).ReturnsAsync(() => null);
        AccountController sut = new AccountController(mockAccountService.Object);
        
        // Act
        var result = (BadRequestObjectResult)await sut.Registreer(user);
        
        // Assert
        result.StatusCode.Should().Be(400);
    }
}