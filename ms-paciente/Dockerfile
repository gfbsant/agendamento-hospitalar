FROM bellsoft/liberica-openjdk-alpine-musl:21
VOLUME /tmp
COPY target/ms-paciente-1.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
