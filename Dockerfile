FROM node:20.11.1-slim

ARG DOWNLOAD_URL

WORKDIR /foundry

RUN mkdir foundryvtt foundrydata && \
    apt update && apt install wget curl unzip -y

RUN wget -O foundryvtt.zip "$DOWNLOAD_URL" && unzip foundryvtt.zip -d foundryvtt && rm foundryvtt.zip

ENTRYPOINT ["node"]
CMD ["/foundry/foundryvtt/resources/app/main.js", "--dataPath=foundrydata"]
