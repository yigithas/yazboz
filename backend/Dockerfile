# 1. Aşama: Uygulamayı Derleme (Build)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Bağımlılıkların önbelleğe (cache) alınması için önce sadece pom.xml kopyalanır
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Kaynak kodları kopyala ve testleri atlayarak .jar üret
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Aşama: Uygulamayı Çalıştırma (Run - Hafif JRE İmajı)
FROM eclipse-temurin:17-jre
WORKDIR /app

# İlk aşamada üretilen jar dosyasını kopyala
COPY --from=build /app/target/*.jar app.jar

# Render ortamındaki port değişkenini ve bellek optimizasyonunu ayarla
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx380m", "-Xms256m", "-jar", "app.jar"]