<template>
    <footer class="footer">
      <p><slot></slot></p>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffb000;
    text-align: center;
    padding: 8px;
  }
  </style>