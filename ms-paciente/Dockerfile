FROM openjdk:21-jdk-alpine
VOLUME /tmp
COPY target/ms-paciente.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
