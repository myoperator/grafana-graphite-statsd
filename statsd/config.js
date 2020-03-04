(function() {
  return {
      percentThreshold: [ 50, 75, 90, 95, 98, 99, 99.9, 99.99, 99.999],
      graphitePort: parseInt(process.env.GRAPHITE_PORT_2003_TCP_PORT || 2003),
      graphiteHost: process.env.GRAPHITE_PORT_2003_TCP_ADDR || "127.0.0.1",
      port: parseInt(process.env.STATSD_PORT || 8125),
      dumpMessages: process.env.STATSD_DUMP_MSG == "true",
      debug: process.env.STATSD_DEBUG == "true",
      flushInterval: parseInt(process.env.STATSD_FLUSH_INTERVAL|| 10000),

      graphite: {
        //  globalPrefix: process.env.GRAPHITE_GLOBAL_PREFIX,
          legacyNamespace: (process.env.GRAPHITE_LEGACY_NAMESPACE || false) == 'true'
      },

      servers: [
        {server: "./servers/udp", address: "0.0.0.0", port: 8125}
      ],

      repeater: [
        {
          host: (process.env.STATSD_EXPORTER_HOST || 'statsd-exporter'),
          port: parseInt(process.env.STATSD_EXPORTER_PORT || 9125) }
      ],

      backends: [
        './backends/graphite', './backends/repeater'
      ]
  };
})()
