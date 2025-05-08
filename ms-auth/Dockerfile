FROM openjdk:21-jdk-alpine
VOLUME /tmp
COPY target/ms-auth.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
