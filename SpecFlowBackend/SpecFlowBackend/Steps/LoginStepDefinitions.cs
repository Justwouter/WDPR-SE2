using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;
using backend.model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;
using Microsoft.AspNetCore.Http;

[Binding]
public sealed class LoginStepDefinitions
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;
    private User user;

    public LoginStepDefinitions(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
        IConfiguration configuration, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _roleManager = roleManager;
    }

    [Given(@"I send the following details")]
    public void GivenIEnterTheFollowingDetails(Table table)
    {
        user = new User()
        {
            UserName = table.Rows[0]["userName"],
            Email = table.Rows[0]["email"],
            Password = table.Rows[0]["password"],
            Type = "Bezoeker"
        };
    }

    [When(@"I click register button")]
    public async Task GivenIClickRegisterButton()
    {
        var result = await _userManager.CreateAsync(user, user.Password);
        result = await _userManager.AddToRoleAsync(user, "Bezoeker");
    }

    [Then(@"I should receive succes alert")]
    public async Task ThenIShouldReceiveSuccesAlert()
    {
        var _user = await _userManager.FindByNameAsync(user.UserName);
        Assert.NotNull(_user);
    }
}