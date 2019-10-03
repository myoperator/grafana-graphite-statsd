FROM graphiteapp/graphite-statsd

# ----------------- #
#   Configuration   #
# ----------------- #

# Confiure Graphite and StatsD
ADD     ./statsd/udp.js /opt/statsd/config/udp.js
ADD     ./graphite/local_settings.py /opt/graphite/webapp/graphite/local_settings.py
ADD     ./graphite/carbon.conf /opt/graphite/conf/carbon.conf
ADD     ./graphite/storage-schemas.conf /opt/graphite/conf/storage-schemas.conf
ADD     ./graphite/storage-aggregation.conf /opt/graphite/conf/storage-aggregation.conf