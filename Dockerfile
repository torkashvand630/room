#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
RUN apt-get update && apt-get install -y libgdiplus
RUN apt-get install -y poppler-utils
RUN cd /usr/lib && ln -s libgdiplus.so gdiplus.dll
RUN apt-get install -y --no-install-recommends libc6-dev
WORKDIR /app
EXPOSE 5000
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:5000
ENV mediaServer=meet.salampnu.com
ENV mediaServerPass=MY_SECRET
ENV env=docker

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["pRoom.csproj", ""]
RUN dotnet restore "./pRoom.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "pRoom.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pRoom.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "pRoom.dll"]