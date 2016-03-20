FROM connexiolabs/alpine-nginx:1.7.11
MAINTAINER Tim Douglas <neurotech@gmail.com>

# Set timezone
RUN echo "Australia/Sydney" > /etc/timezone
ENV TZ="Australia/Sydney"

COPY nginx.conf ./conf
