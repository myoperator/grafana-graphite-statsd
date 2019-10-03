{
  percentThreshold: [ 50, 75, 90, 95, 98, 99, 99.9, 99.99, 99.999],
  "graphiteHost": "127.0.0.1",
  "graphitePort": 2003,
  "port": 8125,
  "flushInterval": 10000,
  "servers": [
    { server: "./servers/udp", address: "0.0.0.0", port: 8125 }
  ],
  "graphite": {
    "legacyNamespace": false
  },
  backends: ['./backends/graphite', './backends/console'],
}