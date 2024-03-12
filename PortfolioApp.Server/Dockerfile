ARG API_PORT
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy everything from this folder to the image file structure
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/out .

ARG API_PORT
EXPOSE ${API_PORT}

ENTRYPOINT ["dotnet", "PortfolioApp.Server.dll"]