using backend.model;
using backend.Service;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace LaakAPI.Tests.Systems.Services;

public class AccountServiceTest
{
    [Fact]
    public async Task Registreer_service_geenPassWord()
    {
        // Arrange
        var mockUserManager = new Mock<UserManager<IdentityUser>>();
        var mockUser = new User { UserName = "String1!"};
        mockUserManager.Setup(x => x.CreateAsync(new User(), null)).ReturnsAsync(() => null);
        AccountService sut = new AccountService(mockUserManager.Object);
        var y = 1;
        // Act
        var result = await sut.Registreer(mockUser);
        
        // Assert
        result.Should().BeNull();

    }
}