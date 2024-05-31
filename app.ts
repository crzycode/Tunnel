import express, { Request } from "express";
import RootRouter from "./src/RootRouter";
import http from "http";
import httpProxy from "http-proxy";
import { Server } from "socket.io";
import dns from "dns";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import net from 'net'
import url from 'url'
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Tunnel Server is running\n');
});

// Create a TCP server
const tcpServer = net.createServer(socket => {
  console.log('Client connected:', socket.remoteAddress, socket.remotePort);

  // Connect to the target server
  const target = net.createConnection({ host: 'localhost', port: 4200 }, () => {
      console.log('Connected to target server');
      socket.pipe(target);
      target.pipe(socket);
  });
  target.on('error', err => {
      console.error('Error connecting to target server:', err);
      socket.end();
  });

  socket.on('error', err => {
      console.error('Client socket error:', err);
      target.end();
  });
  socket.on('close', () => {
      console.log('Client disconnected:', socket.remoteAddress, socket.remotePort);
      target.end();
  });
});
httpServer.listen(8080, () => {
  console.log('HTTP Tunnel server listening on port 8080');
});
tcpServer.listen(8081, () => {
  console.log('TCP Tunnel server listening on port 8081');
});