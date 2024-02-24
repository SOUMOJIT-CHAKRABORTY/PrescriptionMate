const express = require("express");
const db = require("../db/connection");

exports.getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      // Error occurred, return 500 status code and error message
      return res.status(500).json({ error: err.message });
    }
    // Successful query execution, return data as JSON
    return res.status(200).json(data);
  });
};

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const sql = "INSERT INTO users (username, email,password) VALUES (?,?,?)";
  db.query(sql, [username, email, password], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "User created" });
  });
};
