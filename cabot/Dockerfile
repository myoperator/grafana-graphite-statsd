ARG CABOT_VERSION=latest

FROM cabotapp/cabot:${CABOT_VERSION}

ENV CABOT_VERSION=${CABOT_VERSION}

RUN echo ${CABOT_VERSION}

RUN pip install cabot-alert-slack