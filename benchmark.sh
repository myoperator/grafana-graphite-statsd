./benchmark \
  -statsd="statsd://127.0.0.1:9125/firehose."\
  -packetsize=512\
  -countcount=50000\
  -countinterval=1\
  -gaugecount=50000\
  -gaugeinterval=1\
