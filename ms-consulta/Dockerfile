FROM bellsoft/liberica-openjdk-alpine-musl:17
VOLUME /tmp
COPY target/ms-consulta.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
