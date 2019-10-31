FROM graphiteapp/graphite-statsd

# ----------------- #
#   Configuration   #
# ----------------- #

# Confiure Graphite and StatsD
ADD     ./local_settings.py /opt/graphite/webapp/graphite/local_settings.py
ADD     ./carbon.conf /opt/graphite/conf/carbon.conf
ADD     ./storage-schemas.conf /opt/graphite/conf/storage-schemas.conf
ADD     ./storage-aggregation.conf /opt/graphite/conf/storage-aggregation.conf