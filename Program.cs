// See https://aka.ms/new-console-template for more information
using GithubTest;

var hello = new Hello();
Console.WriteLine("Hello, World!");
Console.WriteLine(hello.SayHello());
Console.WriteLine("Please enter you name here");
string? username = Console.ReadLine();
hello.printUsername(username ?? string.Empty);
hello.printUsername(username ?? string.Empty);