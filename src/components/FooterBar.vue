<template>
    <footer class="footer">
      <p><slot></slot></p>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    /* position: fixed; */
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
    text-align: center;
    padding: 1%;
    margin-top: 5%;
  }
 
  </style>